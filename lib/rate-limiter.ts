// Simple rate limiting for client-side (in production, this should be server-side)
interface RateLimitEntry {
  count: number
  resetTime: number
}

class RateLimiter {
  private limits: Map<string, RateLimitEntry> = new Map()

  isAllowed(key: string, maxAttempts: number, windowMs: number): boolean {
    const now = Date.now()
    const entry = this.limits.get(key)

    if (!entry || now > entry.resetTime) {
      this.limits.set(key, { count: 1, resetTime: now + windowMs })
      return true
    }

    if (entry.count >= maxAttempts) {
      return false
    }

    entry.count++
    return true
  }

  getRemainingTime(key: string): number {
    const entry = this.limits.get(key)
    if (!entry) return 0
    return Math.max(0, entry.resetTime - Date.now())
  }

  reset(key: string): void {
    this.limits.delete(key)
  }
}

export const rateLimiter = new RateLimiter()
