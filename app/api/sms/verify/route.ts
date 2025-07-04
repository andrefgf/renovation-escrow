import { type NextRequest, NextResponse } from "next/server"
import { serverRateLimiter, RATE_LIMITS } from "@/lib/rate-limiter-server"
import { verificationStore } from "@/lib/verification-store"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { sessionId, code } = body

    // Validate required fields
    if (!sessionId || !code) {
      return NextResponse.json({ success: false, error: "Missing required fields" }, { status: 400 })
    }

    // Get client IP for rate limiting
    const clientIP = request.headers.get("x-forwarded-for") || request.headers.get("x-real-ip") || "unknown"

    // Rate limiting by session
    const sessionRateKey = `sms_verify_${sessionId}`
    const rateCheck = serverRateLimiter.isAllowed(
      sessionRateKey,
      RATE_LIMITS.SMS_VERIFY.maxAttempts,
      RATE_LIMITS.SMS_VERIFY.windowMs,
      clientIP,
    )

    if (!rateCheck.allowed) {
      const remainingMinutes = Math.ceil((rateCheck.remainingTime || 0) / 1000 / 60)
      return NextResponse.json(
        {
          success: false,
          error: `Too many verification attempts. Try again in ${remainingMinutes} minute(s).`,
          remainingTime: rateCheck.remainingTime,
        },
        { status: 429 },
      )
    }

    // Verify the code
    const result = verificationStore.verifyCode(sessionId, code)

    if (!result.success) {
      return NextResponse.json(
        {
          success: false,
          error: result.error,
          attemptsLeft: result.attemptsLeft,
        },
        { status: 400 },
      )
    }

    // Log successful verification (without sensitive data)
    const verification = verificationStore.getVerification(sessionId)
    if (verification) {
      console.log(`SMS verification successful for ${verification.phoneNumber.replace(/\d(?=\d{4})/g, "*")}`)
    }

    return NextResponse.json({
      success: true,
      message: "Phone number verified successfully",
    })
  } catch (error) {
    console.error("SMS verify API error:", error)
    return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 })
  }
}
