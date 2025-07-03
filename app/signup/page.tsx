"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Checkbox } from "@/components/ui/checkbox"
import { Shield, ArrowLeft } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"

export default function SignupPage() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    company: "",
    acceptTerms: false,
  })
  const { t } = useLanguage()

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSignup = (userType: string) => {
    console.log(`Signing up ${userType} with:`, formData)
  }

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

        <Tabs defaultValue="homeowner" className="w-full">
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
                    <Label htmlFor="firstName">{t("firstName")}</Label>
                    <Input
                      id="firstName"
                      value={formData.firstName}
                      onChange={(e) => handleInputChange("firstName", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">{t("lastName")}</Label>
                    <Input
                      id="lastName"
                      value={formData.lastName}
                      onChange={(e) => handleInputChange("lastName", e.target.value)}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">{t("email")}</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">{t("phoneNumber")}</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">{t("password")}</Label>
                  <Input
                    id="password"
                    type="password"
                    value={formData.password}
                    onChange={(e) => handleInputChange("password", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">{t("confirmPassword")}</Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    value={formData.confirmPassword}
                    onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="terms"
                    checked={formData.acceptTerms}
                    onCheckedChange={(checked) => handleInputChange("acceptTerms", checked as boolean)}
                  />
                  <Label htmlFor="terms" className="text-sm">
                    {t("agreeToTerms")}{" "}
                    <Link href="/terms" className="text-primary hover:underline">
                      {t("termsOfService")}
                    </Link>{" "}
                    {t("and")}{" "}
                    <Link href="/privacy" className="text-primary hover:underline">
                      {t("privacyPolicy")}
                    </Link>
                  </Label>
                </div>
                <Button className="w-full" onClick={() => handleSignup("homeowner")} disabled={!formData.acceptTerms}>
                  {t("createHomeownerAccount")}
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
                    <Label htmlFor="firstName-contractor">{t("firstName")}</Label>
                    <Input
                      id="firstName-contractor"
                      value={formData.firstName}
                      onChange={(e) => handleInputChange("firstName", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName-contractor">{t("lastName")}</Label>
                    <Input
                      id="lastName-contractor"
                      value={formData.lastName}
                      onChange={(e) => handleInputChange("lastName", e.target.value)}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="company">{t("companyName")}</Label>
                  <Input
                    id="company"
                    value={formData.company}
                    onChange={(e) => handleInputChange("company", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email-contractor">{t("email")}</Label>
                  <Input
                    id="email-contractor"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone-contractor">{t("phoneNumber")}</Label>
                  <Input
                    id="phone-contractor"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password-contractor">{t("password")}</Label>
                  <Input
                    id="password-contractor"
                    type="password"
                    value={formData.password}
                    onChange={(e) => handleInputChange("password", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword-contractor">{t("confirmPassword")}</Label>
                  <Input
                    id="confirmPassword-contractor"
                    type="password"
                    value={formData.confirmPassword}
                    onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="terms-contractor"
                    checked={formData.acceptTerms}
                    onCheckedChange={(checked) => handleInputChange("acceptTerms", checked as boolean)}
                  />
                  <Label htmlFor="terms-contractor" className="text-sm">
                    {t("agreeToTerms")}{" "}
                    <Link href="/terms" className="text-primary hover:underline">
                      {t("termsOfService")}
                    </Link>{" "}
                    {t("and")}{" "}
                    <Link href="/privacy" className="text-primary hover:underline">
                      {t("privacyPolicy")}
                    </Link>
                  </Label>
                </div>
                <Button className="w-full" onClick={() => handleSignup("contractor")} disabled={!formData.acceptTerms}>
                  {t("createContractorAccount")}
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
      </div>
    </div>
  )
}
