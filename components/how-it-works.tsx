"use client"

import { Card, CardContent } from "@/components/ui/card"
import { UserCheck, FileText, Camera, CreditCard } from "lucide-react"
import { useEffect, useRef, useState } from "react"
import { useLanguage } from "@/contexts/language-context"

export function HowItWorks() {
  const [visibleSteps, setVisibleSteps] = useState<boolean[]>(new Array(4).fill(false))
  const stepRefs = useRef<(HTMLDivElement | null)[]>([])
  const { t } = useLanguage()

  const steps = [
    {
      icon: UserCheck,
      titleKey: "signUpVerify",
      descKey: "signUpVerifyDesc",
      step: "01",
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: FileText,
      titleKey: "defineMilestones",
      descKey: "defineMilestonesDesc",
      step: "02",
      color: "from-purple-500 to-pink-500",
    },
    {
      icon: Camera,
      titleKey: "submitEvidence",
      descKey: "submitEvidenceDesc",
      step: "03",
      color: "from-green-500 to-emerald-500",
    },
    {
      icon: CreditCard,
      titleKey: "securePayment",
      descKey: "securePaymentDesc",
      step: "04",
      color: "from-orange-500 to-red-500",
    },
  ]

  useEffect(() => {
    const observers = stepRefs.current.map((ref, index) => {
      if (!ref) return null

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              setVisibleSteps((prev) => {
                const newState = [...prev]
                newState[index] = true
                return newState
              })
            }, index * 200)
          }
        },
        { threshold: 0.1 },
      )

      observer.observe(ref)
      return observer
    })

    return () => {
      observers.forEach((observer) => observer?.disconnect())
    }
  }, [])

  return (
    <section id="how-it-works" className="py-24 relative surface-1 transition-colors duration-500">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-20">
          <div className="inline-flex items-center space-x-2 px-4 py-2 surface-2 border border-primary/20 dark:border-primary/30 rounded-full mb-6 backdrop-blur-sm shadow-sm dark:shadow-lg">
            <FileText className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium text-primary">{t("simpleProcess")}</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold mb-6">
            <span className="text-primary-semantic bg-gradient-to-r from-foreground to-primary dark:from-foreground dark:to-primary bg-clip-text text-transparent">
              {t("howItWorksTitle")}
            </span>
          </h2>
          <p className="text-xl text-secondary-semantic max-w-2xl mx-auto">{t("howItWorksSubtitle")}</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div
              key={index}
              ref={(el) => (stepRefs.current[index] = el)}
              style={{ transitionDelay: `${index * 200}ms` }}
              className={`relative transition-all duration-700 ${
                visibleSteps[index] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
            >
              {/* Connection line */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-16 left-full w-full h-0.5 bg-gradient-to-r from-primary/50 to-transparent z-0" />
              )}

              <Card className="relative z-10 border-0 surface-2 hover:surface-3 shadow-lg hover:shadow-xl dark:shadow-primary/5 transition-all duration-500 group">
                <CardContent className="p-8 text-center">
                  {/* Step number */}
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <div
                      className={`w-8 h-8 rounded-full bg-gradient-to-r ${step.color} flex items-center justify-center text-white text-sm font-bold shadow-lg`}
                    >
                      {step.step}
                    </div>
                  </div>

                  {/* Icon */}
                  <div
                    className={`w-20 h-20 rounded-2xl bg-gradient-to-r ${step.color} p-0.5 mx-auto mb-6 mt-4 group-hover:scale-110 transition-transform duration-300 shadow-lg`}
                  >
                    <div className="w-full h-full surface-0 rounded-2xl flex items-center justify-center transition-colors duration-300">
                      <step.icon className="h-10 w-10 text-primary-semantic" />
                    </div>
                  </div>

                  <h3 className="text-xl font-bold mb-4 text-primary-semantic group-hover:text-primary transition-colors">
                    {t(step.titleKey as any)}
                  </h3>
                  <p className="text-secondary-semantic leading-relaxed">{t(step.descKey as any)}</p>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
