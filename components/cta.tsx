"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowRight, Users, Home, Sparkles } from "lucide-react"
import Link from "next/link"
import { useEffect, useState } from "react"

export function CTA() {
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

    const element = document.querySelector("#cta")
    if (element) observer.observe(element)

    return () => observer.disconnect()
  }, [])

  return (
    <section id="cta" className="py-24 relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary via-purple-600 to-pink-600" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-white/10 rounded-full blur-3xl animate-float" />
      <div
        className="absolute bottom-0 right-1/4 w-72 h-72 bg-white/10 rounded-full blur-3xl animate-float"
        style={{ animationDelay: "2s" }}
      />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div
          className={`text-center mb-16 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="inline-flex items-center space-x-2 px-4 py-2 bg-white/10 border border-white/20 rounded-full mb-6">
            <Sparkles className="h-4 w-4 text-white" />
            <span className="text-sm font-medium text-white">Join Thousands</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold text-white mb-6">
            Ready to Protect Your
            <br />
            <span className="bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">
              Renovation?
            </span>
          </h2>
          <p className="text-xl text-white/80 max-w-2xl mx-auto">
            Join thousands who trust EscrowReno for secure project payments.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <Card
            className={`bg-white/10 backdrop-blur-xl border-white/20 hover:bg-white/20 transition-all duration-500 group ${
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"
            }`}
            style={{ transitionDelay: "200ms" }}
          >
            <CardContent className="p-10 text-center">
              <div className="w-20 h-20 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-2xl flex items-center justify-center mx-auto mb-8 group-hover:scale-110 transition-transform duration-300">
                <Home className="h-10 w-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-6">For Homeowners</h3>
              <p className="text-white/80 mb-8 leading-relaxed">
                Protect your investment with milestone-based payments and quality verification.
              </p>
              <Button
                size="lg"
                className="w-full bg-white text-primary hover:bg-white/90 shadow-lg hover:shadow-xl transition-all duration-300 group"
                asChild
              >
                <Link href="/signup?type=homeowner">
                  Start as Homeowner
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
            </CardContent>
          </Card>

          <Card
            className={`bg-white/10 backdrop-blur-xl border-white/20 hover:bg-white/20 transition-all duration-500 group ${
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"
            }`}
            style={{ transitionDelay: "400ms" }}
          >
            <CardContent className="p-10 text-center">
              <div className="w-20 h-20 bg-gradient-to-r from-green-400 to-emerald-400 rounded-2xl flex items-center justify-center mx-auto mb-8 group-hover:scale-110 transition-transform duration-300">
                <Users className="h-10 w-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-6">For Contractors</h3>
              <p className="text-white/80 mb-8 leading-relaxed">
                Get paid faster with transparent milestones and build trust with clients.
              </p>
              <Button
                size="lg"
                variant="outline"
                className="w-full border-2 border-white text-white hover:bg-white hover:text-primary bg-transparent shadow-lg hover:shadow-xl transition-all duration-300 group"
                asChild
              >
                <Link href="/signup?type=contractor">
                  Join as Contractor
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>

        <div
          className={`text-center mt-16 transition-all duration-700 delay-600 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <p className="text-white/60 mb-4">Already have an account?</p>
          <Button
            variant="ghost"
            className="text-white hover:text-white/80 hover:bg-white/10 transition-all duration-300"
            asChild
          >
            <Link href="/login">Sign In Here</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
