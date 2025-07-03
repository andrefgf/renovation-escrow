"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Calculator, TrendingUp, Shield, AlertTriangle, Sparkles } from "lucide-react"

export function SavingsCalculator() {
  const [projectValue, setProjectValue] = useState([25000])
  const [contractorRisk, setContractorRisk] = useState([3])
  const [email, setEmail] = useState("")
  const [isVisible, setIsVisible] = useState(false)

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
      alert(`Detailed report sent to ${email}!`)
    }
  }

  return (
    <section id="calculator" className="py-24 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-purple-500/5 dark:from-primary/10 dark:to-purple-500/10" />
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-gradient-to-l from-primary/10 to-transparent rounded-full blur-3xl" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div
          className={`text-center mb-16 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="inline-flex items-center space-x-2 px-4 py-2 bg-primary/10 border border-primary/20 rounded-full mb-6">
            <Calculator className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium text-primary">Free Tool</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-foreground to-primary bg-clip-text text-transparent">
              Calculate Your Savings
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Discover how much you could save and protect with our escrow service.
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Input Card */}
            <Card
              className={`border-0 bg-gradient-to-br from-background to-accent/20 shadow-2xl transition-all duration-700 delay-200 ${
                isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"
              }`}
            >
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-2xl">
                  <TrendingUp className="h-6 w-6 text-primary" />
                  <span>Project Details</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-8">
                <div>
                  <Label className="text-lg font-medium mb-4 block">
                    Project Value: €{projectValue[0].toLocaleString()}
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
                  <Label className="text-lg font-medium mb-4 block">Contractor Risk Level: {contractorRisk[0]}/5</Label>
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
                      <span>Low Risk</span>
                      <span>High Risk</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-4 pt-4 border-t border-border/50">
                  <Label className="text-lg font-medium">Get Detailed Report</Label>
                  <div className="flex space-x-3">
                    <Input
                      type="email"
                      placeholder="your@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="flex-1"
                    />
                    <Button
                      onClick={handleGetReport}
                      disabled={!email}
                      className="bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90"
                    >
                      Send Report
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Results Card */}
            <Card
              className={`border-0 bg-gradient-to-br from-background to-accent/20 shadow-2xl transition-all duration-700 delay-400 ${
                isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"
              }`}
            >
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-2xl">
                  <Shield className="h-6 w-6 text-green-500" />
                  <span>Your Protection</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-6 bg-gradient-to-br from-red-500/10 to-red-600/10 rounded-2xl border border-red-500/20">
                    <AlertTriangle className="h-10 w-10 text-red-500 mx-auto mb-3" />
                    <div className="text-3xl font-bold text-red-500 mb-1">
                      €{savings.potentialLoss.toLocaleString()}
                    </div>
                    <div className="text-sm text-red-600/80">Potential Risk</div>
                  </div>

                  <div className="text-center p-6 bg-gradient-to-br from-blue-500/10 to-blue-600/10 rounded-2xl border border-blue-500/20">
                    <Shield className="h-10 w-10 text-blue-500 mx-auto mb-3" />
                    <div className="text-3xl font-bold text-blue-500 mb-1">€{savings.escrowFee.toLocaleString()}</div>
                    <div className="text-sm text-blue-600/80">Protection Fee</div>
                  </div>
                </div>

                <div className="text-center p-8 bg-gradient-to-br from-green-500/10 to-emerald-500/10 rounded-2xl border border-green-500/20 animate-pulse-glow">
                  <div className="flex items-center justify-center mb-4">
                    <Sparkles className="h-12 w-12 text-green-500" />
                  </div>
                  <div className="text-4xl font-bold text-green-500 mb-2">€{savings.netSavings.toLocaleString()}</div>
                  <div className="text-lg font-medium text-green-600 mb-3">Potential Net Savings</div>
                  <div className="text-sm text-green-600/80">{savings.riskReduction}% risk reduction with escrow</div>
                </div>

                <div className="text-center text-xs text-muted-foreground pt-4 border-t border-border/50">
                  * Based on industry data and risk assessment
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}
