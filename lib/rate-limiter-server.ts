// Server-side rate limiting with Redis-like functionality
// In production, use Redis or a proper database
interface RateLimitEntry {
  count: number
  resetTime: number
  attempts: { timestamp: number; ip: string }[]
}

class ServerRateLimiter {
  private limits: Map<string, RateLimitEntry> = new Map()
  private cleanupInterval: NodeJS.Timeout

  constructor() {
    // Clean up expired entries every 5 minutes
    this.cleanupInterval = setInterval(
      () => {
        this.cleanup()
      },
      5 * 60 * 1000,
    )
  }

  isAllowed(
    key: string,
    maxAttempts: number,
    windowMs: number,
    ip?: string,
  ): { allowed: boolean; remainingTime?: number; attemptsLeft?: number } {
    const now = Date.now()
    const entry = this.limits.get(key)

    if (!entry || now > entry.resetTime) {
      // Create new entry or reset expired one
      this.limits.set(key, {
        count: 1,
        resetTime: now + windowMs,
        attempts: ip ? [{ timestamp: now, ip }] : [],
      })
      return { allowed: true, attemptsLeft: maxAttempts - 1 }
    }

    if (entry.count >= maxAttempts) {
      return {
        allowed: false,
        remainingTime: entry.resetTime - now,
        attemptsLeft: 0,
      }
    }

    // Increment count and add attempt
    entry.count++
    if (ip) {
      entry.attempts.push({ timestamp: now, ip })
    }

    return {
      allowed: true,
      attemptsLeft: maxAttempts - entry.count,
    }
  }

  getAttempts(key: string): { timestamp: number; ip: string }[] {
    const entry = this.limits.get(key)
    return entry?.attempts || []
  }

  reset(key: string): void {
    this.limits.delete(key)
  }

  private cleanup(): void {
    const now = Date.now()
    for (const [key, entry] of this.limits.entries()) {
      if (now > entry.resetTime) {
        this.limits.delete(key)
      }
    }
  }

  destroy(): void {
    if (this.cleanupInterval) {
      clearInterval(this.cleanupInterval)
    }
  }
}

export const serverRateLimiter = new ServerRateLimiter()

// Rate limiting configurations
export const RATE_LIMITS = {
  SMS_SEND: { maxAttempts: 3, windowMs: 60 * 1000 }, // 3 per minute
  SMS_VERIFY: { maxAttempts: 5, windowMs: 15 * 60 * 1000 }, // 5 per 15 minutes
  SIGNUP: { maxAttempts: 5, windowMs: 60 * 60 * 1000 }, // 5 per hour
  EMAIL_SEND: { maxAttempts: 3, windowMs: 5 * 60 * 1000 }, // 3 per 5 minutes
}
