// In-memory store for verification codes
// In production, use Redis or a database
interface VerificationEntry {
  code: string
  phoneNumber: string
  email: string
  expiresAt: number
  attempts: number
  createdAt: number
  verified: boolean
}

class VerificationStore {
  private store: Map<string, VerificationEntry> = new Map()
  private cleanupInterval: NodeJS.Timeout

  constructor() {
    // Clean up expired entries every 2 minutes
    this.cleanupInterval = setInterval(
      () => {
        this.cleanup()
      },
      2 * 60 * 1000,
    )
  }

  generateCode(): string {
    return Math.floor(100000 + Math.random() * 900000).toString()
  }

  storeVerification(sessionId: string, phoneNumber: string, email: string, expiryMinutes = 5): string {
    const code = this.generateCode()
    const now = Date.now()

    this.store.set(sessionId, {
      code,
      phoneNumber,
      email,
      expiresAt: now + expiryMinutes * 60 * 1000,
      attempts: 0,
      createdAt: now,
      verified: false,
    })

    return code
  }

  verifyCode(
    sessionId: string,
    inputCode: string,
  ): {
    success: boolean
    error?: string
    attemptsLeft?: number
  } {
    const entry = this.store.get(sessionId)

    if (!entry) {
      return { success: false, error: "Verification session not found" }
    }

    if (Date.now() > entry.expiresAt) {
      this.store.delete(sessionId)
      return { success: false, error: "Verification code expired" }
    }

    if (entry.verified) {
      return { success: false, error: "Code already used" }
    }

    entry.attempts++

    if (entry.attempts > 5) {
      this.store.delete(sessionId)
      return { success: false, error: "Too many attempts" }
    }

    if (entry.code !== inputCode) {
      return {
        success: false,
        error: "Invalid code",
        attemptsLeft: 5 - entry.attempts,
      }
    }

    // Mark as verified
    entry.verified = true
    return { success: true }
  }

  getVerification(sessionId: string): VerificationEntry | null {
    const entry = this.store.get(sessionId)
    if (!entry || Date.now() > entry.expiresAt) {
      return null
    }
    return entry
  }

  deleteVerification(sessionId: string): void {
    this.store.delete(sessionId)
  }

  private cleanup(): void {
    const now = Date.now()
    for (const [key, entry] of this.store.entries()) {
      if (now > entry.expiresAt) {
        this.store.delete(key)
      }
    }
  }

  destroy(): void {
    if (this.cleanupInterval) {
      clearInterval(this.cleanupInterval)
    }
  }
}

export const verificationStore = new VerificationStore()
