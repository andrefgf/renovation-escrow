"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Shield, ArrowLeft } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const { t } = useLanguage()

  const handleLogin = (userType: string) => {
    console.log(`Logging in ${userType} with:`, { email, password })
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
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{t("welcomeBack")}</h1>
          <p className="text-gray-600 dark:text-gray-400">{t("signInToAccount")}</p>
        </div>

        <Tabs defaultValue="homeowner" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="homeowner">{t("homeowner")}</TabsTrigger>
            <TabsTrigger value="contractor">{t("contractor")}</TabsTrigger>
          </TabsList>

          <TabsContent value="homeowner">
            <Card>
              <CardHeader>
                <CardTitle>{t("homeownerLogin")}</CardTitle>
                <CardDescription>{t("homeownerLoginDesc")}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email-homeowner">{t("email")}</Label>
                  <Input
                    id="email-homeowner"
                    type="email"
                    placeholder={t("emailPlaceholder")}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password-homeowner">{t("password")}</Label>
                  <Input
                    id="password-homeowner"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <Button className="w-full" onClick={() => handleLogin("homeowner")}>
                  {t("signInAsHomeowner")}
                </Button>
                <div className="text-center">
                  <Link href="/forgot-password" className="text-sm text-primary hover:underline">
                    {t("forgotPassword")}
                  </Link>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="contractor">
            <Card>
              <CardHeader>
                <CardTitle>{t("contractorLogin")}</CardTitle>
                <CardDescription>{t("contractorLoginDesc")}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email-contractor">{t("email")}</Label>
                  <Input
                    id="email-contractor"
                    type="email"
                    placeholder={t("emailPlaceholder")}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password-contractor">{t("password")}</Label>
                  <Input
                    id="password-contractor"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <Button className="w-full" onClick={() => handleLogin("contractor")}>
                  {t("signInAsContractor")}
                </Button>
                <div className="text-center">
                  <Link href="/forgot-password" className="text-sm text-primary hover:underline">
                    {t("forgotPassword")}
                  </Link>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="text-center mt-6">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {t("dontHaveAccount")}{" "}
            <Link href="/signup" className="text-primary hover:underline">
              {t("signUpHere")}
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
