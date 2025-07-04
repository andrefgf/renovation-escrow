import { type NextRequest, NextResponse } from "next/server"
import { getSMSService } from "@/lib/sms-service"
import { serverRateLimiter, RATE_LIMITS } from "@/lib/rate-limiter-server"
import { verificationStore } from "@/lib/verification-store"
import { validatePhoneNumber } from "@/lib/validation"
import { getCountryByPhoneCode } from "@/lib/countries"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { phoneNumber, email, sessionId, language = "pt" } = body

    // Validate required fields
    if (!phoneNumber || !email || !sessionId) {
      return NextResponse.json({ success: false, error: "Missing required fields" }, { status: 400 })
    }

    // Get client IP for rate limiting
    const clientIP = request.headers.get("x-forwarded-for") || request.headers.get("x-real-ip") || "unknown"

    // Rate limiting by phone number
    const phoneRateKey = `sms_phone_${phoneNumber}`
    const phoneRateCheck = serverRateLimiter.isAllowed(
      phoneRateKey,
      RATE_LIMITS.SMS_SEND.maxAttempts,
      RATE_LIMITS.SMS_SEND.windowMs,
      clientIP,
    )

    if (!phoneRateCheck.allowed) {
      const remainingMinutes = Math.ceil((phoneRateCheck.remainingTime || 0) / 1000 / 60)
      return NextResponse.json(
        {
          success: false,
          error: `Too many SMS attempts. Try again in ${remainingMinutes} minute(s).`,
          remainingTime: phoneRateCheck.remainingTime,
        },
        { status: 429 },
      )
    }

    // Rate limiting by IP
    const ipRateKey = `sms_ip_${clientIP}`
    const ipRateCheck = serverRateLimiter.isAllowed(
      ipRateKey,
      RATE_LIMITS.SMS_SEND.maxAttempts * 2, // Allow more per IP for multiple users
      RATE_LIMITS.SMS_SEND.windowMs,
      clientIP,
    )

    if (!ipRateCheck.allowed) {
      return NextResponse.json(
        {
          success: false,
          error: "Too many requests from this IP address.",
        },
        { status: 429 },
      )
    }

    // Validate phone number format
    const phoneCode = phoneNumber.match(/^\+\d{1,4}/)?.[0]
    if (!phoneCode) {
      return NextResponse.json({ success: false, error: "Invalid phone number format" }, { status: 400 })
    }

    const country = getCountryByPhoneCode(phoneCode)
    if (country) {
      const phoneOnly = phoneNumber.replace(phoneCode, "")
      if (!validatePhoneNumber(phoneOnly, country)) {
        return NextResponse.json(
          { success: false, error: "Invalid phone number for selected country" },
          { status: 400 },
        )
      }
    }

    // Generate and store verification code
    const code = verificationStore.storeVerification(sessionId, phoneNumber, email, 5)

    // Send SMS
    const smsService = getSMSService()
    const result = await smsService.sendVerificationSMS(phoneNumber, code, language as "pt" | "en")

    if (!result.success) {
      console.error("SMS sending failed:", result.error)
      return NextResponse.json(
        {
          success: false,
          error: "Failed to send SMS. Please try again.",
        },
        { status: 500 },
      )
    }

    // Log successful SMS send (without the code)
    console.log(`SMS sent successfully via ${result.provider} to ${phoneNumber.replace(/\d(?=\d{4})/g, "*")}`)

    return NextResponse.json({
      success: true,
      provider: result.provider,
      messageId: result.messageId,
      attemptsLeft: phoneRateCheck.attemptsLeft,
    })
  } catch (error) {
    console.error("SMS send API error:", error)
    return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 })
  }
}
