import twilio from "twilio"
import { Vonage } from "@vonage/server-sdk"

export interface SMSProvider {
  name: string
  sendSMS: (to: string, message: string) => Promise<{ success: boolean; messageId?: string; error?: string }>
  isConfigured: () => boolean
}

// Twilio SMS Provider
class TwilioProvider implements SMSProvider {
  name = "Twilio"
  private client: twilio.Twilio | null = null

  constructor() {
    if (process.env.TWILIO_ACCOUNT_SID && process.env.TWILIO_AUTH_TOKEN) {
      this.client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN)
    }
  }

  isConfigured(): boolean {
    return !!(process.env.TWILIO_ACCOUNT_SID && process.env.TWILIO_AUTH_TOKEN && process.env.TWILIO_PHONE_NUMBER)
  }

  async sendSMS(to: string, message: string): Promise<{ success: boolean; messageId?: string; error?: string }> {
    if (!this.client || !this.isConfigured()) {
      return { success: false, error: "Twilio not configured" }
    }

    try {
      const result = await this.client.messages.create({
        body: message,
        from: process.env.TWILIO_PHONE_NUMBER!,
        to: to,
      })

      return {
        success: true,
        messageId: result.sid,
      }
    } catch (error: any) {
      console.error("Twilio SMS Error:", error)
      return {
        success: false,
        error: error.message || "Failed to send SMS via Twilio",
      }
    }
  }
}

// Vonage SMS Provider
class VonageProvider implements SMSProvider {
  name = "Vonage"
  private client: Vonage | null = null

  constructor() {
    if (process.env.VONAGE_API_KEY && process.env.VONAGE_API_SECRET) {
      this.client = new Vonage({
        apiKey: process.env.VONAGE_API_KEY,
        apiSecret: process.env.VONAGE_API_SECRET,
      })
    }
  }

  isConfigured(): boolean {
    return !!(process.env.VONAGE_API_KEY && process.env.VONAGE_API_SECRET && process.env.VONAGE_FROM_NUMBER)
  }

  async sendSMS(to: string, message: string): Promise<{ success: boolean; messageId?: string; error?: string }> {
    if (!this.client || !this.isConfigured()) {
      return { success: false, error: "Vonage not configured" }
    }

    try {
      const result = await this.client.sms.send({
        to: to,
        from: process.env.VONAGE_FROM_NUMBER!,
        text: message,
      })

      if (result.messages && result.messages[0] && result.messages[0].status === "0") {
        return {
          success: true,
          messageId: result.messages[0]["message-id"],
        }
      } else {
        const errorText = result.messages?.[0]?.["error-text"] || "Unknown error"
        return {
          success: false,
          error: `Vonage error: ${errorText}`,
        }
      }
    } catch (error: any) {
      console.error("Vonage SMS Error:", error)
      return {
        success: false,
        error: error.message || "Failed to send SMS via Vonage",
      }
    }
  }
}

// SMS Service with fallback support
export class SMSService {
  private providers: SMSProvider[]
  private primaryProvider: SMSProvider
  private fallbackProvider: SMSProvider | null

  constructor() {
    const twilio = new TwilioProvider()
    const vonage = new VonageProvider()

    this.providers = [twilio, vonage].filter((provider) => provider.isConfigured())

    if (this.providers.length === 0) {
      throw new Error("No SMS providers configured. Please set up Twilio or Vonage credentials.")
    }

    // Use Twilio as primary if available, otherwise use first configured provider
    this.primaryProvider = this.providers.find((p) => p.name === "Twilio") || this.providers[0]
    this.fallbackProvider = this.providers.find((p) => p !== this.primaryProvider) || null

    console.log(
      `SMS Service initialized with primary: ${this.primaryProvider.name}${
        this.fallbackProvider ? `, fallback: ${this.fallbackProvider.name}` : ""
      }`,
    )
  }

  async sendVerificationSMS(
    to: string,
    code: string,
    language: "pt" | "en" = "pt",
  ): Promise<{
    success: boolean
    provider?: string
    messageId?: string
    error?: string
  }> {
    // Format phone number for international delivery
    const formattedPhone = this.formatPhoneNumber(to)

    // Create message based on language
    const message = this.createVerificationMessage(code, language)

    // Try primary provider first
    let result = await this.primaryProvider.sendSMS(formattedPhone, message)

    if (result.success) {
      return {
        success: true,
        provider: this.primaryProvider.name,
        messageId: result.messageId,
      }
    }

    console.warn(`Primary provider ${this.primaryProvider.name} failed:`, result.error)

    // Try fallback provider if available
    if (this.fallbackProvider) {
      console.log(`Trying fallback provider: ${this.fallbackProvider.name}`)
      result = await this.fallbackProvider.sendSMS(formattedPhone, message)

      if (result.success) {
        return {
          success: true,
          provider: this.fallbackProvider.name,
          messageId: result.messageId,
        }
      }

      console.error(`Fallback provider ${this.fallbackProvider.name} also failed:`, result.error)
    }

    return {
      success: false,
      error: "All SMS providers failed",
    }
  }

  private formatPhoneNumber(phone: string): string {
    // Remove all non-digit characters except +
    let formatted = phone.replace(/[^\d+]/g, "")

    // Ensure it starts with +
    if (!formatted.startsWith("+")) {
      formatted = "+" + formatted
    }

    return formatted
  }

  private createVerificationMessage(code: string, language: "pt" | "en"): string {
    const messages = {
      pt: `EscrowReno: O seu código de verificação é ${code}. Válido por 5 minutos. Não partilhe este código.`,
      en: `EscrowReno: Your verification code is ${code}. Valid for 5 minutes. Do not share this code.`,
    }

    return messages[language]
  }

  getAvailableProviders(): string[] {
    return this.providers.map((p) => p.name)
  }

  isConfigured(): boolean {
    return this.providers.length > 0
  }
}

// Singleton instance
let smsService: SMSService | null = null

export function getSMSService(): SMSService {
  if (!smsService) {
    smsService = new SMSService()
  }
  return smsService
}
