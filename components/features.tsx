"use client"

import { Card } from "@/components/ui/card"
import { Shield, Camera, FileCheck, Scale, BarChart, Zap } from "lucide-react"
import { useEffect, useRef, useState } from "react"

const features = [
  {
    icon: Shield,
    title: "Milestone Payments",
    description: "Funds released only when work is completed and verified.",
    color: "from-blue-500 to-cyan-500",
  },
  {
    icon: Camera,
    title: "Visual Verification",
    description: "Photo and video proof before every payment release.",
    color: "from-purple-500 to-pink-500",
  },
  {
    icon: FileCheck,
    title: "Independent Inspections",
    description: "Professional third-party quality validation.",
    color: "from-green-500 to-emerald-500",
  },
  {
    icon: Scale,
    title: "Dispute Resolution",
    description: "Automated mediation for quick conflict resolution.",
    color: "from-orange-500 to-red-500",
  },
  {
    icon: BarChart,
    title: "Performance Tracking",
    description: "Comprehensive contractor metrics and ratings.",
    color: "from-indigo-500 to-purple-500",
  },
  {
    icon: Zap,
    title: "SIBS Integration",
    description: "Secure payments through trusted Portuguese banking.",
    color: "from-yellow-500 to-orange-500",
  },
]

export function Features() {
  const [visibleCards, setVisibleCards] = useState<boolean[]>(new Array(features.length).fill(false))
  const cardRefs = useRef<(HTMLDivElement | null)[]>([])

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
    <section id="features" className="py-24 relative">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <div className="inline-flex items-center space-x-2 px-4 py-2 bg-primary/10 border border-primary/20 rounded-full mb-6">
            <Shield className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium text-primary">Complete Protection</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-foreground to-primary bg-clip-text text-transparent">
              Everything You Need
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Comprehensive safeguards for every aspect of your renovation project.
          </p>
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
              <Card className="p-8 h-full hover:shadow-2xl transition-all duration-500 group border-0 bg-gradient-to-br from-background to-accent/20 hover:to-accent/40">
                <div className="relative">
                  <div
                    className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${feature.color} p-0.5 mb-6 group-hover:scale-110 transition-transform duration-300`}
                  >
                    <div className="w-full h-full bg-background rounded-2xl flex items-center justify-center">
                      <feature.icon className="h-8 w-8 text-foreground" />
                    </div>
                  </div>
                  <h3 className="text-xl font-bold mb-4 group-hover:text-primary transition-colors">{feature.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
                </div>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
