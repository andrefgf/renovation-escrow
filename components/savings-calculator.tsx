"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Calculator, TrendingUp, Shield, AlertTriangle, Sparkles } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"

export function SavingsCalculator() {
  const [projectValue, setProjectValue] = useState([25000])
  const [contractorRisk, setContractorRisk] = useState([3])
  const [email, setEmail] = useState("")
  const [isVisible, setIsVisible] = useState(false)
  const { t } = useLanguage()

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 },
    )

    const element = document.getElementById("calculator")
    if (element) observer.observe(element)

    return () => observer.disconnect()
  }, [])

  const calculateSavings = () => {
    const baseRisk = projectValue[0] * 0.15
    const riskMultiplier = contractorRisk[0] / 5
    const potentialLoss = baseRisk * riskMultiplier
    const escrowFee = projectValue[0] * 0.025
    const netSavings = potentialLoss - escrowFee

    return {
      potentialLoss: Math.round(potentialLoss),
      escrowFee: Math.round(escrowFee),
      netSavings: Math.round(netSavings),
      riskReduction: Math.round(85),
    }
  }

  const savings = calculateSavings()

  const handleGetReport = () => {
    if (email) {
      alert(`${t("sendReport")} ${email}!`)
    }
  }

  return (
    <section
      id="calculator"
      className="py-24 relative overflow-hidden surface-0 section-fade transition-colors duration-150"
    >
      {/* Background elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-purple-500/5 dark:from-primary/8 dark:to-purple-500/8 transition-all duration-150" />
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-gradient-to-l from-primary/10 dark:from-primary/15 to-transparent rounded-full blur-3xl transition-all duration-150" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div
          className={`text-center mb-16 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="inline-flex items-center space-x-2 px-4 py-2 bg-primary/10 dark:bg-primary/20 border border-primary/20 dark:border-primary/30 rounded-full mb-6 backdrop-blur-sm">
            <Calculator className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium text-primary">{t("freeTool")}</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-foreground to-primary dark:from-foreground dark:to-primary bg-clip-text text-transparent">
              {t("calculateYourSavings")}
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">{t("calculatorSubtitle")}</p>
        </div>

        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Input Card */}
            <Card
              className={`border-0 bg-gradient-to-br from-background to-accent/20 dark:from-card dark:to-accent/10 shadow-2xl dark:shadow-primary/5 transition-all duration-700 delay-200 backdrop-blur-sm ${
                isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"
              }`}
            >
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-2xl">
                  <TrendingUp className="h-6 w-6 text-primary" />
                  <span>{t("projectDetails")}</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-8">
                <div>
                  <Label className="text-lg font-medium mb-4 block">
                    {t("projectValue")}: €{projectValue[0].toLocaleString()}
                  </Label>
                  <div className="relative">
                    <Slider
                      min={5000}
                      max={100000}
                      step={1000}
                      value={projectValue}
                      onValueChange={setProjectValue}
                      className="w-full"
                    />
                    <div className="flex justify-between text-sm text-muted-foreground mt-2">
                      <span>€5k</span>
                      <span>€100k</span>
                    </div>
                  </div>
                </div>

                <div>
                  <Label className="text-lg font-medium mb-4 block">
                    {t("contractorRiskLevel")}: {contractorRisk[0]}/5
                  </Label>
                  <div className="relative">
                    <Slider
                      min={1}
                      max={5}
                      step={1}
                      value={contractorRisk}
                      onValueChange={setContractorRisk}
                      className="w-full"
                    />
                    <div className="flex justify-between text-sm text-muted-foreground mt-2">
                      <span>{t("lowRisk")}</span>
                      <span>{t("highRisk")}</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-4 pt-4 border-t border-border/50 dark:border-border/30">
                  <Label className="text-lg font-medium">{t("getDetailedReport")}</Label>
                  <div className="flex space-x-3">
                    <Input
                      type="email"
                      placeholder={t("emailPlaceholder")}
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="flex-1 bg-background/50 dark:bg-background/30 border-border/50 dark:border-border/30"
                    />
                    <Button
                      onClick={handleGetReport}
                      disabled={!email}
                      className="bg-gradient-to-r from-primary to-purple-600 dark:from-primary dark:to-purple-500 hover:from-primary/90 hover:to-purple-600/90 dark:hover:from-primary/90 dark:hover:to-purple-500/90"
                    >
                      {t("sendReport")}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Results Card */}
            <Card
              className={`border-0 bg-gradient-to-br from-background to-accent/20 dark:from-card dark:to-accent/10 shadow-2xl dark:shadow-primary/5 transition-all duration-700 delay-400 backdrop-blur-sm ${
                isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"
              }`}
            >
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-2xl">
                  <Shield className="h-6 w-6 text-green-500" />
                  <span>{t("yourProtection")}</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-6 bg-gradient-to-br from-red-500/10 to-red-600/10 dark:from-red-500/20 dark:to-red-600/20 rounded-2xl border border-red-500/20 dark:border-red-500/30 backdrop-blur-sm">
                    <AlertTriangle className="h-10 w-10 text-red-500 mx-auto mb-3" />
                    <div className="text-3xl font-bold text-red-500 mb-1">
                      €{savings.potentialLoss.toLocaleString()}
                    </div>
                    <div className="text-sm text-red-600/80 dark:text-red-400/80">{t("potentialRisk")}</div>
                  </div>

                  <div className="text-center p-6 bg-gradient-to-br from-blue-500/10 to-blue-600/10 dark:from-blue-500/20 dark:to-blue-600/20 rounded-2xl border border-blue-500/20 dark:border-blue-500/30 backdrop-blur-sm">
                    <Shield className="h-10 w-10 text-blue-500 mx-auto mb-3" />
                    <div className="text-3xl font-bold text-blue-500 mb-1">€{savings.escrowFee.toLocaleString()}</div>
                    <div className="text-sm text-blue-600/80 dark:text-blue-400/80">{t("protectionFee")}</div>
                  </div>
                </div>

                <div className="text-center p-8 bg-gradient-to-br from-green-500/10 to-emerald-500/10 dark:from-green-500/20 dark:to-emerald-500/20 rounded-2xl border border-green-500/20 dark:border-green-500/30 animate-pulse-glow backdrop-blur-sm">
                  <div className="flex items-center justify-center mb-4">
                    <Sparkles className="h-12 w-12 text-green-500" />
                  </div>
                  <div className="text-4xl font-bold text-green-500 mb-2">€{savings.netSavings.toLocaleString()}</div>
                  <div className="text-lg font-medium text-green-600 dark:text-green-400 mb-3">
                    {t("potentialNetSavings")}
                  </div>
                  <div className="text-sm text-green-600/80 dark:text-green-400/80">
                    {savings.riskReduction}% {t("riskReductionText")}
                  </div>
                </div>

                <div className="text-center text-xs text-muted-foreground pt-4 border-t border-border/50 dark:border-border/30">
                  {t("basedOnIndustryData")}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}
