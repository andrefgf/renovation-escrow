"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Checkbox } from "@/components/ui/checkbox"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Shield, ArrowLeft, CheckCircle, AlertTriangle } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"
import { CaptchaMock } from "@/components/captcha-mock"
import { SmsVerification } from "@/components/sms-verification"
import { EmailVerification } from "@/components/email-verification"
import { CountrySelector } from "@/components/country-selector"
import { validateEmail, validatePhoneNumber, validatePassword, sanitizeInput } from "@/lib/validation"
import { sortedCountries, type Country } from "@/lib/countries"

type SignupStep = "form" | "sms" | "email" | "success"
type UserType = "homeowner" | "contractor"

interface FormData {
  firstName: string
  lastName: string
  email: string
  password: string
  confirmPassword: string
  phone: string
  company: string
  acceptTerms: boolean
  acceptPrivacy: boolean
  acceptMarketing: boolean
}

export default function SignupPage() {
  const [currentStep, setCurrentStep] = useState<SignupStep>("form")
  const [userType, setUserType] = useState<UserType>("homeowner")
  const [selectedCountry, setSelectedCountry] = useState<Country>(sortedCountries[0]) // Portugal default
  const [sessionId] = useState(() => crypto.randomUUID()) // Generate unique session ID
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    company: "",
    acceptTerms: false,
    acceptPrivacy: false,
    acceptMarketing: false,
  })
  const [errors, setErrors] = useState<Partial<FormData>>({})
  const [isLoading, setIsLoading] = useState(false)
  const [captchaVerified, setCaptchaVerified] = useState(false)
  const [generalError, setGeneralError] = useState("")
  const { t, language } = useLanguage()

  const handleInputChange = (field: keyof FormData, value: string | boolean) => {
    // Sanitize string inputs
    const sanitizedValue = typeof value === "string" ? sanitizeInput(value) : value

    setFormData((prev) => ({ ...prev, [field]: sanitizedValue }))

    // Clear field-specific error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }))
    }
    setGeneralError("")
  }

  const handlePhoneChange = (value: string) => {
    // Remove country code and format
    const phoneWithoutCode = value.replace(selectedCountry.phoneCode, "").replace(/\D/g, "")
    handleInputChange("phone", phoneWithoutCode)
  }

  const validateForm = (): boolean => {
    const newErrors: Partial<FormData> = {}

    // Required fields validation
    if (!formData.firstName.trim()) newErrors.firstName = "Nome é obrigatório"
    if (!formData.lastName.trim()) newErrors.lastName = "Apelido é obrigatório"

    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = "Email é obrigatório"
    } else if (!validateEmail(formData.email)) {
      newErrors.email = "Email inválido"
    }

    // Phone validation
    if (!formData.phone.trim()) {
      newErrors.phone = "Número de telefone é obrigatório"
    } else if (!validatePhoneNumber(formData.phone, selectedCountry)) {
      newErrors.phone = `Número inválido para ${selectedCountry.name}`
    }

    // Password validation
    const passwordValidation = validatePassword(formData.password)
    if (!passwordValidation.isValid) {
      newErrors.password = passwordValidation.errors.join(", ")
    }

    // Confirm password
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Palavras-passe não coincidem"
    }

    // Company name for contractors
    if (userType === "contractor" && !formData.company.trim()) {
      newErrors.company = "Nome da empresa é obrigatório"
    }

    // Terms and privacy acceptance
    if (!formData.acceptTerms) {
      setGeneralError("Deve aceitar os Termos de Serviço")
    }
    if (!formData.acceptPrivacy) {
      setGeneralError("Deve aceitar a Política de Privacidade")
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0 && formData.acceptTerms && formData.acceptPrivacy
  }

  const handleFormSubmit = async () => {
    if (!validateForm()) return
    if (!captchaVerified) {
      setGeneralError("Complete a verificação anti-spam")
      return
    }

    setIsLoading(true)
    setGeneralError("")

    try {
      // Simulate API call for user creation
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // In production, this would create the user account
      console.log("Creating user account:", {
        ...formData,
        password: "[REDACTED]",
        country: selectedCountry.name,
        fullPhoneNumber: `${selectedCountry.phoneCode}${formData.phone}`,
      })

      // Move to SMS verification
      setCurrentStep("sms")
    } catch (error) {
      setGeneralError("Erro ao criar conta. Tente novamente.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleSmsVerified = (success: boolean) => {
    if (success) {
      setCurrentStep("email")
    } else {
      setGeneralError("Falha na verificação SMS")
    }
  }

  const handleEmailVerified = () => {
    setCurrentStep("success")
  }

  const handleBackToForm = () => {
    setCurrentStep("form")
  }

  const handleBackToSms = () => {
    setCurrentStep("sms")
  }

  const getFullPhoneNumber = () => {
    return `${selectedCountry.phoneCode}${formData.phone}`
  }

  // Render different steps
  if (currentStep === "sms") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <Link
              href="/"
              className="inline-flex items-center space-x-2 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100 mb-4"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>{t("backToHome")}</span>
            </Link>
            <div className="flex items-center justify-center space-x-2 mb-4">
              <Shield className="h-8 w-8 text-primary" />
              <span className="text-2xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
                EscrowReno
              </span>
            </div>
          </div>
          <SmsVerification
            phoneNumber={getFullPhoneNumber()}
            email={formData.email}
            sessionId={sessionId}
            language={language === "pt-PT" ? "pt" : "en"}
            onVerified={handleSmsVerified}
            onBack={handleBackToForm}
          />
        </div>
      </div>
    )
  }

  if (currentStep === "email") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <Link
              href="/"
              className="inline-flex items-center space-x-2 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100 mb-4"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>{t("backToHome")}</span>
            </Link>
            <div className="flex items-center justify-center space-x-2 mb-4">
              <Shield className="h-8 w-8 text-primary" />
              <span className="text-2xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
                EscrowReno
              </span>
            </div>
          </div>
          <EmailVerification email={formData.email} onVerified={handleEmailVerified} onBack={handleBackToSms} />
        </div>
      </div>
    )
  }

  if (currentStep === "success") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <Card className="border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-950">
            <CardHeader className="text-center">
              <div className="w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="h-8 w-8 text-green-600 dark:text-green-400" />
              </div>
              <CardTitle className="text-green-800 dark:text-green-200">Conta Criada com Sucesso!</CardTitle>
              <CardDescription className="text-green-600 dark:text-green-400">
                Bem-vindo à EscrowReno, {formData.firstName}!
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center text-sm text-green-700 dark:text-green-300">
                <p>A sua conta foi verificada e está pronta a usar.</p>
                <p>Número verificado: {getFullPhoneNumber().replace(/\d(?=\d{4})/g, "*")}</p>
                <p>Email verificado: {formData.email}</p>
              </div>
              <div className="space-y-3">
                <Button asChild className="w-full">
                  <Link href="/login">Iniciar Sessão</Link>
                </Button>
                <Button variant="outline" asChild className="w-full bg-transparent">
                  <Link href="/">Voltar ao Início</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  // Main signup form
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link
            href="/"
            className="inline-flex items-center space-x-2 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100 mb-4"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>{t("backToHome")}</span>
          </Link>
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Shield className="h-8 w-8 text-primary" />
            <span className="text-2xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
              EscrowReno
            </span>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{t("createAccount")}</h1>
          <p className="text-gray-600 dark:text-gray-400">{t("startProtecting")}</p>
        </div>

        {generalError && (
          <Alert variant="destructive" className="mb-6">
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>{generalError}</AlertDescription>
          </Alert>
        )}

        <Tabs value={userType} onValueChange={(value) => setUserType(value as UserType)} className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="homeowner">{t("homeowner")}</TabsTrigger>
            <TabsTrigger value="contractor">{t("contractor")}</TabsTrigger>
          </TabsList>

          <TabsContent value="homeowner">
            <Card>
              <CardHeader>
                <CardTitle>{t("homeownerRegistration")}</CardTitle>
                <CardDescription>{t("homeownerRegDesc")}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">{t("firstName")} *</Label>
                    <Input
                      id="firstName"
                      value={formData.firstName}
                      onChange={(e) => handleInputChange("firstName", e.target.value)}
                      className={errors.firstName ? "border-red-500" : ""}
                    />
                    {errors.firstName && <p className="text-sm text-red-500">{errors.firstName}</p>}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">{t("lastName")} *</Label>
                    <Input
                      id="lastName"
                      value={formData.lastName}
                      onChange={(e) => handleInputChange("lastName", e.target.value)}
                      className={errors.lastName ? "border-red-500" : ""}
                    />
                    {errors.lastName && <p className="text-sm text-red-500">{errors.lastName}</p>}
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">{t("email")} *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    className={errors.email ? "border-red-500" : ""}
                  />
                  {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">{t("phoneNumber")} *</Label>
                  <div className="flex space-x-2">
                    <CountrySelector value={selectedCountry} onValueChange={setSelectedCountry} disabled={isLoading} />
                    <Input
                      id="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => handlePhoneChange(e.target.value)}
                      className={`flex-1 ${errors.phone ? "border-red-500" : ""}`}
                      placeholder={selectedCountry.format?.replace(/X/g, "0") || "Phone number"}
                    />
                  </div>
                  {errors.phone && <p className="text-sm text-red-500">{errors.phone}</p>}
                  {selectedCountry.format && (
                    <p className="text-xs text-muted-foreground">Formato: {selectedCountry.format}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">{t("password")} *</Label>
                  <Input
                    id="password"
                    type="password"
                    value={formData.password}
                    onChange={(e) => handleInputChange("password", e.target.value)}
                    className={errors.password ? "border-red-500" : ""}
                  />
                  {errors.password && <p className="text-sm text-red-500">{errors.password}</p>}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">{t("confirmPassword")} *</Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    value={formData.confirmPassword}
                    onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
                    className={errors.confirmPassword ? "border-red-500" : ""}
                  />
                  {errors.confirmPassword && <p className="text-sm text-red-500">{errors.confirmPassword}</p>}
                </div>

                <CaptchaMock onVerify={setCaptchaVerified} isLoading={isLoading} />

                <div className="space-y-3">
                  <div className="flex items-start space-x-2">
                    <Checkbox
                      id="terms"
                      checked={formData.acceptTerms}
                      onCheckedChange={(checked) => handleInputChange("acceptTerms", checked as boolean)}
                    />
                    <Label htmlFor="terms" className="text-sm leading-5">
                      {t("agreeToTerms")}{" "}
                      <Link href="/terms" className="text-primary hover:underline" target="_blank">
                        {t("termsOfService")}
                      </Link>{" "}
                      * (obrigatório)
                    </Label>
                  </div>
                  <div className="flex items-start space-x-2">
                    <Checkbox
                      id="privacy"
                      checked={formData.acceptPrivacy}
                      onCheckedChange={(checked) => handleInputChange("acceptPrivacy", checked as boolean)}
                    />
                    <Label htmlFor="privacy" className="text-sm leading-5">
                      Aceito a{" "}
                      <Link href="/privacy" className="text-primary hover:underline" target="_blank">
                        {t("privacyPolicy")}
                      </Link>{" "}
                      * (obrigatório)
                    </Label>
                  </div>
                  <div className="flex items-start space-x-2">
                    <Checkbox
                      id="marketing"
                      checked={formData.acceptMarketing}
                      onCheckedChange={(checked) => handleInputChange("acceptMarketing", checked as boolean)}
                    />
                    <Label htmlFor="marketing" className="text-sm leading-5">
                      Aceito receber comunicações de marketing (opcional)
                    </Label>
                  </div>
                </div>

                <Button
                  className="w-full"
                  onClick={handleFormSubmit}
                  disabled={!formData.acceptTerms || !formData.acceptPrivacy || !captchaVerified || isLoading}
                >
                  {isLoading ? "A criar conta..." : t("createHomeownerAccount")}
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="contractor">
            <Card>
              <CardHeader>
                <CardTitle>{t("contractorRegistration")}</CardTitle>
                <CardDescription>{t("contractorRegDesc")}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName-contractor">{t("firstName")} *</Label>
                    <Input
                      id="firstName-contractor"
                      value={formData.firstName}
                      onChange={(e) => handleInputChange("firstName", e.target.value)}
                      className={errors.firstName ? "border-red-500" : ""}
                    />
                    {errors.firstName && <p className="text-sm text-red-500">{errors.firstName}</p>}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName-contractor">{t("lastName")} *</Label>
                    <Input
                      id="lastName-contractor"
                      value={formData.lastName}
                      onChange={(e) => handleInputChange("lastName", e.target.value)}
                      className={errors.lastName ? "border-red-500" : ""}
                    />
                    {errors.lastName && <p className="text-sm text-red-500">{errors.lastName}</p>}
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="company">{t("companyName")} *</Label>
                  <Input
                    id="company"
                    value={formData.company}
                    onChange={(e) => handleInputChange("company", e.target.value)}
                    className={errors.company ? "border-red-500" : ""}
                  />
                  {errors.company && <p className="text-sm text-red-500">{errors.company}</p>}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email-contractor">{t("email")} *</Label>
                  <Input
                    id="email-contractor"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    className={errors.email ? "border-red-500" : ""}
                  />
                  {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone-contractor">{t("phoneNumber")} *</Label>
                  <div className="flex space-x-2">
                    <CountrySelector value={selectedCountry} onValueChange={setSelectedCountry} disabled={isLoading} />
                    <Input
                      id="phone-contractor"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => handlePhoneChange(e.target.value)}
                      className={`flex-1 ${errors.phone ? "border-red-500" : ""}`}
                      placeholder={selectedCountry.format?.replace(/X/g, "0") || "Phone number"}
                    />
                  </div>
                  {errors.phone && <p className="text-sm text-red-500">{errors.phone}</p>}
                  {selectedCountry.format && (
                    <p className="text-xs text-muted-foreground">Formato: {selectedCountry.format}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password-contractor">{t("password")} *</Label>
                  <Input
                    id="password-contractor"
                    type="password"
                    value={formData.password}
                    onChange={(e) => handleInputChange("password", e.target.value)}
                    className={errors.password ? "border-red-500" : ""}
                  />
                  {errors.password && <p className="text-sm text-red-500">{errors.password}</p>}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword-contractor">{t("confirmPassword")} *</Label>
                  <Input
                    id="confirmPassword-contractor"
                    type="password"
                    value={formData.confirmPassword}
                    onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
                    className={errors.confirmPassword ? "border-red-500" : ""}
                  />
                  {errors.confirmPassword && <p className="text-sm text-red-500">{errors.confirmPassword}</p>}
                </div>

                <CaptchaMock onVerify={setCaptchaVerified} isLoading={isLoading} />

                <div className="space-y-3">
                  <div className="flex items-start space-x-2">
                    <Checkbox
                      id="terms-contractor"
                      checked={formData.acceptTerms}
                      onCheckedChange={(checked) => handleInputChange("acceptTerms", checked as boolean)}
                    />
                    <Label htmlFor="terms-contractor" className="text-sm leading-5">
                      {t("agreeToTerms")}{" "}
                      <Link href="/terms" className="text-primary hover:underline" target="_blank">
                        {t("termsOfService")}
                      </Link>{" "}
                      * (obrigatório)
                    </Label>
                  </div>
                  <div className="flex items-start space-x-2">
                    <Checkbox
                      id="privacy-contractor"
                      checked={formData.acceptPrivacy}
                      onCheckedChange={(checked) => handleInputChange("acceptPrivacy", checked as boolean)}
                    />
                    <Label htmlFor="privacy-contractor" className="text-sm leading-5">
                      Aceito a{" "}
                      <Link href="/privacy" className="text-primary hover:underline" target="_blank">
                        {t("privacyPolicy")}
                      </Link>{" "}
                      * (obrigatório)
                    </Label>
                  </div>
                  <div className="flex items-start space-x-2">
                    <Checkbox
                      id="marketing-contractor"
                      checked={formData.acceptMarketing}
                      onCheckedChange={(checked) => handleInputChange("acceptMarketing", checked as boolean)}
                    />
                    <Label htmlFor="marketing-contractor" className="text-sm leading-5">
                      Aceito receber comunicações de marketing (opcional)
                    </Label>
                  </div>
                </div>

                <Button
                  className="w-full"
                  onClick={handleFormSubmit}
                  disabled={!formData.acceptTerms || !formData.acceptPrivacy || !captchaVerified || isLoading}
                >
                  {isLoading ? "A criar conta..." : t("createContractorAccount")}
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="text-center mt-6">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {t("alreadyHaveAccountLogin")}{" "}
            <Link href="/login" className="text-primary hover:underline">
              {t("signInHereLogin")}
            </Link>
          </p>
        </div>

        <div className="text-xs text-muted-foreground text-center mt-4 space-y-1">
          <p>🔒 Os seus dados estão protegidos com encriptação SSL</p>
          <p>📱 Verificação por SMS internacional via Twilio/Vonage</p>
          <p>✉️ Confirmação por email obrigatória</p>
          <p>🇪🇺 Conforme RGPD - os seus dados nunca são partilhados</p>
          <p>🌍 Suporte para mais de 60 países</p>
        </div>
      </div>
    </div>
  )
}
