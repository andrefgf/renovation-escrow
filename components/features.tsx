"use client"

import { Card } from "@/components/ui/card"
import { Shield, Camera, FileCheck, Scale, BarChart, Zap } from "lucide-react"
import { useEffect, useRef, useState } from "react"
import { useLanguage } from "@/contexts/language-context"

export function Features() {
  const [visibleCards, setVisibleCards] = useState<boolean[]>(new Array(6).fill(false))
  const cardRefs = useRef<(HTMLDivElement | null)[]>([])
  const { t } = useLanguage()

  const features = [
    {
      icon: Shield,
      titleKey: "milestonePayments",
      descKey: "milestonePaymentsDesc",
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: Camera,
      titleKey: "visualVerification",
      descKey: "visualVerificationDesc",
      color: "from-purple-500 to-pink-500",
    },
    {
      icon: FileCheck,
      titleKey: "independentInspections",
      descKey: "independentInspectionsDesc",
      color: "from-green-500 to-emerald-500",
    },
    {
      icon: Scale,
      titleKey: "disputeResolution",
      descKey: "disputeResolutionDesc",
      color: "from-orange-500 to-red-500",
    },
    {
      icon: BarChart,
      titleKey: "performanceTracking",
      descKey: "performanceTrackingDesc",
      color: "from-indigo-500 to-purple-500",
    },
    {
      icon: Zap,
      titleKey: "sibsIntegration",
      descKey: "sibsIntegrationDesc",
      color: "from-yellow-500 to-orange-500",
    },
  ]

  useEffect(() => {
    const observers = cardRefs.current.map((ref, index) => {
      if (!ref) return null

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setVisibleCards((prev) => {
              const newState = [...prev]
              newState[index] = true
              return newState
            })
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
    <section id="features" className="py-24 relative surface-0 section-fade transition-colors duration-150">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <div className="inline-flex items-center space-x-2 px-4 py-2 surface-2 border border-primary/20 dark:border-primary/30 rounded-full mb-6 backdrop-blur-sm shadow-sm dark:shadow-lg">
            <Shield className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium text-primary">{t("completeProtection")}</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold mb-6">
            <span className="text-primary-semantic bg-gradient-to-r from-foreground to-primary dark:from-foreground dark:to-primary bg-clip-text text-transparent">
              {t("everythingYouNeed")}
            </span>
          </h2>
          <p className="text-xl text-secondary-semantic max-w-2xl mx-auto">{t("featuresSubtitle")}</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              ref={(el) => (cardRefs.current[index] = el)}
              style={{ transitionDelay: `${index * 100}ms` }}
              className={`transition-all duration-700 ${
                visibleCards[index] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
            >
              <Card className="p-8 h-full hover:shadow-2xl dark:hover:shadow-primary/10 transition-all duration-500 group border-0 surface-1 hover:surface-2 dark:hover:surface-2 backdrop-blur-sm">
                <div className="relative">
                  <div
                    className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${feature.color} p-0.5 mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`}
                  >
                    <div className="w-full h-full surface-0 rounded-2xl flex items-center justify-center transition-colors duration-300">
                      <feature.icon className="h-8 w-8 text-primary-semantic" />
                    </div>
                  </div>
                  <h3 className="text-xl font-bold mb-4 text-primary-semantic group-hover:text-primary transition-colors duration-300">
                    {t(feature.titleKey as any)}
                  </h3>
                  <p className="text-secondary-semantic leading-relaxed">{t(feature.descKey as any)}</p>
                </div>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
