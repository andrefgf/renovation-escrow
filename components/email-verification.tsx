"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Mail, CheckCircle, Clock, RefreshCw } from "lucide-react"
import { rateLimiter } from "@/lib/rate-limiter"

interface EmailVerificationProps {
  email: string
  onVerified: () => void
  onBack: () => void
}

export function EmailVerification({ email, onVerified, onBack }: EmailVerificationProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [emailSent, setEmailSent] = useState(false)
  const [error, setError] = useState("")
  const [canResend, setCanResend] = useState(false)
  const [timeLeft, setTimeLeft] = useState(60) // 1 minute before resend

  // Simulate sending email
  const sendVerificationEmail = async (isResend = false) => {
    const rateLimitKey = `email_${email}`

    if (!rateLimiter.isAllowed(rateLimitKey, 3, 300000)) {
      // 3 attempts per 5 minutes
      const remainingTime = Math.ceil(rateLimiter.getRemainingTime(rateLimitKey) / 1000)
      setError(`Muitas tentativas. Tente novamente em ${Math.ceil(remainingTime / 60)} minutos.`)
      return false
    }

    setIsLoading(true)
    setError("")

    try {
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // Generate verification token and link
      const token = crypto.getRandomValues(new Uint8Array(32))
      const tokenString = Array.from(token, (byte) => byte.toString(16).padStart(2, "0")).join("")
      const verificationLink = `${window.location.origin}/verify-email?token=${tokenString}`

      // In production, this would send actual email
      console.log(`Email verification link for ${email}: ${verificationLink}`)

      setEmailSent(true)
      setTimeLeft(60)
      setCanResend(false)

      return true
    } catch (err) {
      setError("Erro ao enviar email. Tente novamente.")
      return false
    } finally {
      setIsLoading(false)
    }
  }

  // Timer countdown for resend
  useEffect(() => {
    if (emailSent && timeLeft > 0) {
      const timer = setTimeout(() => {
        setTimeLeft(timeLeft - 1)
      }, 1000)
      return () => clearTimeout(timer)
    } else if (emailSent && timeLeft === 0) {
      setCanResend(true)
    }
  }, [emailSent, timeLeft])

  // Send initial email
  useEffect(() => {
    sendVerificationEmail()
  }, [])

  // Simulate checking for email verification (in production, this would be real-time)
  const checkVerificationStatus = async () => {
    setIsLoading(true)
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // For demo purposes, randomly succeed after a few attempts
      const isVerified = Math.random() > 0.7

      if (isVerified) {
        onVerified()
      } else {
        setError("Email ainda não verificado. Clique no link no seu email.")
      }
    } catch (err) {
      setError("Erro ao verificar status. Tente novamente.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleResend = () => {
    sendVerificationEmail(true)
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Mail className="h-6 w-6 text-primary" />
          <span>Verificação de Email</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {emailSent ? (
          <>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="h-8 w-8 text-green-600 dark:text-green-400" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Email Enviado!</h3>
              <p className="text-muted-foreground mb-2">Enviámos um link de verificação para:</p>
              <p className="font-medium text-lg break-all">{email}</p>
            </div>

            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <div className="space-y-4">
              <div className="bg-blue-50 dark:bg-blue-950 p-4 rounded-lg">
                <h4 className="font-medium mb-2">Instruções:</h4>
                <ol className="text-sm text-muted-foreground space-y-1 list-decimal list-inside">
                  <li>Verifique a sua caixa de entrada</li>
                  <li>Procure um email da EscrowReno</li>
                  <li>Clique no link "Verificar Email"</li>
                  <li>Volte aqui e clique em "Verificar Status"</li>
                </ol>
              </div>

              <Button onClick={checkVerificationStatus} disabled={isLoading} className="w-full">
                {isLoading ? "A verificar..." : "Verificar Status"}
              </Button>
            </div>

            <div className="text-center">
              <p className="text-sm text-muted-foreground mb-2">Não recebeu o email?</p>
              {canResend ? (
                <Button
                  variant="ghost"
                  onClick={handleResend}
                  disabled={isLoading}
                  className="flex items-center space-x-2"
                >
                  <RefreshCw className="h-4 w-4" />
                  <span>Reenviar Email</span>
                </Button>
              ) : (
                <div className="flex items-center justify-center space-x-2 text-muted-foreground">
                  <Clock className="h-4 w-4" />
                  <span>Reenviar em {timeLeft}s</span>
                </div>
              )}
            </div>
          </>
        ) : (
          <div className="text-center">
            <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
            <p>A enviar email de verificação...</p>
          </div>
        )}

        <div className="flex space-x-3">
          <Button variant="outline" onClick={onBack} className="flex-1 bg-transparent">
            Voltar
          </Button>
        </div>

        <div className="text-xs text-muted-foreground text-center space-y-1">
          <p>Verifique também a pasta de spam/lixo.</p>
          <p>O link de verificação expira em 24 horas.</p>
          <p>Se continuar com problemas, contacte o suporte.</p>
        </div>
      </CardContent>
    </Card>
  )
}
