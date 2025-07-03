"use client"

import { Card, CardContent } from "@/components/ui/card"
import { UserCheck, FileText, Camera, CreditCard } from "lucide-react"
import { useEffect, useRef, useState } from "react"

const steps = [
  {
    icon: UserCheck,
    title: "Sign Up & Verify",
    description: "Create your account and complete KYC verification for both homeowners and contractors.",
    step: "01",
    color: "from-blue-500 to-cyan-500",
  },
  {
    icon: FileText,
    title: "Define Milestones",
    description: "Set clear project milestones and payment schedules with your contractor.",
    step: "02",
    color: "from-purple-500 to-pink-500",
  },
  {
    icon: Camera,
    title: "Submit Evidence",
    description: "Contractors submit photos/videos and request inspections for milestone completion.",
    step: "03",
    color: "from-green-500 to-emerald-500",
  },
  {
    icon: CreditCard,
    title: "Secure Payment",
    description: "Funds are automatically released once verification is complete.",
    step: "04",
    color: "from-orange-500 to-red-500",
  },
]

export function HowItWorks() {
  const [visibleSteps, setVisibleSteps] = useState<boolean[]>(new Array(steps.length).fill(false))
  const stepRefs = useRef<(HTMLDivElement | null)[]>([])

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
    <section id="how-it-works" className="py-24 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-accent/20 to-transparent" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-20">
          <div className="inline-flex items-center space-x-2 px-4 py-2 bg-primary/10 border border-primary/20 rounded-full mb-6">
            <FileText className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium text-primary">Simple Process</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-foreground to-primary bg-clip-text text-transparent">
              How It Works
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Four simple steps to secure your renovation project.
          </p>
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

              <Card className="relative z-10 border-0 bg-gradient-to-br from-background to-accent/20 shadow-xl hover:shadow-2xl transition-all duration-500 group">
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
                    className={`w-20 h-20 rounded-2xl bg-gradient-to-r ${step.color} p-0.5 mx-auto mb-6 mt-4 group-hover:scale-110 transition-transform duration-300`}
                  >
                    <div className="w-full h-full bg-background rounded-2xl flex items-center justify-center">
                      <step.icon className="h-10 w-10 text-foreground" />
                    </div>
                  </div>

                  <h3 className="text-xl font-bold mb-4 group-hover:text-primary transition-colors">{step.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{step.description}</p>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
