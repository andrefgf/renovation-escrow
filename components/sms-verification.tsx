"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Smartphone, Clock, RefreshCw, Shield, CheckCircle, AlertTriangle } from "lucide-react"

interface SmsVerificationProps {
  phoneNumber: string
  email: string
  sessionId: string
  language?: "pt" | "en"
  onVerified: (success: boolean) => void
  onBack: () => void
}

export function SmsVerification({
  phoneNumber,
  email,
  sessionId,
  language = "pt",
  onVerified,
  onBack,
}: SmsVerificationProps) {
  const [verificationCode, setVerificationCode] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const [timeLeft, setTimeLeft] = useState(300) // 5 minutes
  const [canResend, setCanResend] = useState(false)
  const [attempts, setAttempts] = useState(0)
  const [maxAttempts] = useState(5)
  const [smsProvider, setSmsProvider] = useState<string>("")
  const [attemptsLeft, setAttemptsLeft] = useState<number | null>(null)

  // Send SMS via API
  const sendSMS = async (isResend = false) => {
    setIsLoading(true)
    setError("")
    setSuccess("")

    try {
      const response = await fetch("/api/sms/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          phoneNumber,
          email,
          sessionId,
          language,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        if (response.status === 429) {
          const remainingTime = data.remainingTime
          if (remainingTime) {
            const minutes = Math.ceil(remainingTime / 1000 / 60)
            setError(`Muitas tentativas. Tente novamente em ${minutes} minuto(s).`)
          } else {
            setError(data.error || "Muitas tentativas. Tente mais tarde.")
          }
        } else {
          setError(data.error || "Erro ao enviar SMS")
        }
        return false
      }

      if (data.success) {
        setSmsProvider(data.provider)
        setAttemptsLeft(data.attemptsLeft)
        setTimeLeft(300) // Reset timer
        setCanResend(false)
        setAttempts(0)

        if (isResend) {
          setSuccess("Novo código enviado com sucesso!")
        } else {
          setSuccess(`SMS enviado via ${data.provider}`)
        }

        return true
      } else {
        setError(data.error || "Falha ao enviar SMS")
        return false
      }
    } catch (err) {
      console.error("SMS send error:", err)
      setError("Erro de conexão. Verifique sua internet.")
      return false
    } finally {
      setIsLoading(false)
    }
  }

  // Verify SMS code via API
  const verifyCode = async () => {
    if (verificationCode.length !== 6) {
      setError("O código deve ter 6 dígitos.")
      return
    }

    setIsLoading(true)
    setError("")

    try {
      const response = await fetch("/api/sms/verify", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          sessionId,
          code: verificationCode,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        if (response.status === 429) {
          const remainingTime = data.remainingTime
          if (remainingTime) {
            const minutes = Math.ceil(remainingTime / 1000 / 60)
            setError(`Muitas tentativas de verificação. Tente novamente em ${minutes} minuto(s).`)
          } else {
            setError("Muitas tentativas. Contacte o suporte.")
          }
        } else {
          setError(data.error || "Código incorreto")
          if (data.attemptsLeft !== undefined) {
            setAttemptsLeft(data.attemptsLeft)
            setAttempts(maxAttempts - data.attemptsLeft)
          }
        }
        setVerificationCode("")
        return
      }

      if (data.success) {
        setSuccess("Número verificado com sucesso!")
        setTimeout(() => {
          onVerified(true)
        }, 1000)
      } else {
        setError(data.error || "Falha na verificação")
      }
    } catch (err) {
      console.error("SMS verify error:", err)
      setError("Erro de conexão. Verifique sua internet.")
    } finally {
      setIsLoading(false)
    }
  }

  // Timer countdown
  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => {
        setTimeLeft(timeLeft - 1)
      }, 1000)
      return () => clearTimeout(timer)
    } else {
      setCanResend(true)
    }
  }, [timeLeft])

  // Send initial SMS
  useEffect(() => {
    sendSMS()
  }, [])

  const handleResend = () => {
    sendSMS(true)
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  const formatPhoneNumber = (phone: string) => {
    // Mask middle digits for privacy
    if (phone.length > 8) {
      const start = phone.slice(0, 4)
      const end = phone.slice(-4)
      const middle = "*".repeat(phone.length - 8)
      return start + middle + end
    }
    return phone
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Smartphone className="h-6 w-6 text-primary" />
          <span>Verificação por SMS</span>
          {smsProvider && (
            <Badge variant="secondary" className="ml-auto">
              {smsProvider}
            </Badge>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="text-center">
          <p className="text-muted-foreground mb-2">Enviámos um código de 6 dígitos para:</p>
          <p className="font-medium text-lg">{formatPhoneNumber(phoneNumber)}</p>
          {attemptsLeft !== null && (
            <p className="text-sm text-muted-foreground mt-1">{attemptsLeft} tentativas de envio restantes</p>
          )}
        </div>

        {error && (
          <Alert variant="destructive">
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {success && (
          <Alert className="border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-950">
            <CheckCircle className="h-4 w-4 text-green-600 dark:text-green-400" />
            <AlertDescription className="text-green-600 dark:text-green-400">{success}</AlertDescription>
          </Alert>
        )}

        <div className="space-y-4">
          <div>
            <Label htmlFor="verification-code">Código de Verificação</Label>
            <Input
              id="verification-code"
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              maxLength={6}
              value={verificationCode}
              onChange={(e) => {
                const value = e.target.value.replace(/\D/g, "")
                setVerificationCode(value)
                setError("")
              }}
              placeholder="000000"
              className="text-center text-lg tracking-widest"
              disabled={isLoading}
            />
            {attempts > 0 && (
              <p className="text-sm text-muted-foreground mt-1">
                Tentativas: {attempts}/{maxAttempts}
              </p>
            )}
          </div>

          <Button onClick={verifyCode} disabled={verificationCode.length !== 6 || isLoading} className="w-full">
            {isLoading ? (
              <div className="flex items-center space-x-2">
                <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full" />
                <span>A verificar...</span>
              </div>
            ) : (
              "Verificar Código"
            )}
          </Button>
        </div>

        <div className="text-center space-y-2">
          {timeLeft > 0 ? (
            <div className="flex items-center justify-center space-x-2 text-muted-foreground">
              <Clock className="h-4 w-4" />
              <span>Reenviar em {formatTime(timeLeft)}</span>
            </div>
          ) : (
            <Button
              variant="ghost"
              onClick={handleResend}
              disabled={isLoading || !canResend}
              className="flex items-center space-x-2"
            >
              <RefreshCw className="h-4 w-4" />
              <span>Reenviar Código</span>
            </Button>
          )}
        </div>

        <div className="flex space-x-3">
          <Button variant="outline" onClick={onBack} className="flex-1 bg-transparent">
            Voltar
          </Button>
        </div>

        <div className="text-xs text-muted-foreground text-center space-y-1">
          <div className="flex items-center justify-center space-x-1">
            <Shield className="h-3 w-3" />
            <span>Entrega segura via {smsProvider || "SMS"}</span>
          </div>
          <p>Não recebeu o SMS? Verifique se o número está correto.</p>
          <p>O código expira em 5 minutos.</p>
          <p>Problemas? Contacte o suporte técnico.</p>
        </div>
      </CardContent>
    </Card>
  )
}
