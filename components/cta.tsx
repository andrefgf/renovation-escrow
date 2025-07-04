"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowRight, Users, Home, Sparkles } from "lucide-react"
import Link from "next/link"
import { useEffect, useState } from "react"
import { useLanguage } from "@/contexts/language-context"

export function CTA() {
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

    const element = document.querySelector("#cta")
    if (element) observer.observe(element)

    return () => observer.disconnect()
  }, [])

  return (
    <section id="cta" className="py-24 relative overflow-hidden">
      {/* Fixed gradient background with proper dark mode support */}
      <div className="absolute inset-0">
        {/* Light mode gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary via-purple-600 to-pink-600 dark:opacity-0 transition-opacity duration-200" />

        {/* Dark mode: use surface with accent colors */}
        <div className="absolute inset-0 opacity-0 dark:opacity-100 surface-2 transition-opacity duration-200" />
        <div className="absolute inset-0 opacity-0 dark:opacity-100 bg-gradient-to-br from-primary/20 via-purple-600/20 to-pink-600/20 transition-opacity duration-200" />
      </div>

      {/* Overlay for better text contrast */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent dark:from-black/40 dark:to-black/10 transition-all duration-200" />

      {/* Floating elements with proper dark mode opacity */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-white/8 dark:bg-primary/10 rounded-full blur-3xl animate-float transition-all duration-200" />
      <div
        className="absolute bottom-0 right-1/4 w-72 h-72 bg-white/8 dark:bg-purple-500/10 rounded-full blur-3xl animate-float transition-all duration-200"
        style={{ animationDelay: "2s" }}
      />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div
          className={`text-center mb-16 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="inline-flex items-center space-x-2 px-4 py-2 bg-white/15 dark:bg-white/10 border border-white/30 dark:border-white/20 rounded-full mb-6 backdrop-blur-sm shadow-lg">
            <Sparkles className="h-4 w-4 text-white" />
            <span className="text-sm font-medium text-white">{t("joinThousands")}</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold text-white mb-6">{t("readyToProtect")}</h2>
          <p className="text-xl text-white/95 dark:text-white/90 max-w-2xl mx-auto">{t("ctaSubtitle")}</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <Card
            className={`bg-white/15 dark:bg-white/10 backdrop-blur-xl border-white/30 dark:border-white/20 hover:bg-white/25 dark:hover:bg-white/15 transition-all duration-300 group shadow-xl dark:shadow-2xl ${
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"
            }`}
            style={{ transitionDelay: "200ms" }}
          >
            <CardContent className="p-10 text-center">
              <div className="w-20 h-20 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-2xl flex items-center justify-center mx-auto mb-8 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <Home className="h-10 w-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-6">{t("forHomeowners")}</h3>
              <p className="text-white/95 dark:text-white/90 mb-8 leading-relaxed">{t("homeownersDesc")}</p>
              <Button
                size="lg"
                className="w-full bg-white text-primary hover:bg-white/90 shadow-lg hover:shadow-xl transition-all duration-300 group"
                asChild
              >
                <Link href="/signup?type=homeowner">
                  {t("startAsHomeowner")}
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
            </CardContent>
          </Card>

          <Card
            className={`bg-white/15 dark:bg-white/10 backdrop-blur-xl border-white/30 dark:border-white/20 hover:bg-white/25 dark:hover:bg-white/15 transition-all duration-300 group shadow-xl dark:shadow-2xl ${
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"
            }`}
            style={{ transitionDelay: "400ms" }}
          >
            <CardContent className="p-10 text-center">
              <div className="w-20 h-20 bg-gradient-to-r from-green-400 to-emerald-400 rounded-2xl flex items-center justify-center mx-auto mb-8 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <Users className="h-10 w-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-6">{t("forContractors")}</h3>
              <p className="text-white/95 dark:text-white/90 mb-8 leading-relaxed">{t("contractorsDesc")}</p>
              <Button
                size="lg"
                variant="outline"
                className="w-full border-2 border-white text-white hover:bg-white hover:text-primary bg-transparent shadow-lg hover:shadow-xl transition-all duration-300 group"
                asChild
              >
                <Link href="/signup?type=contractor">
                  {t("joinAsContractor")}
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
          <p className="text-white/80 dark:text-white/75 mb-4">{t("alreadyHaveAccount")}</p>
          <Button
            variant="ghost"
            className="text-white hover:text-white/90 hover:bg-white/15 dark:hover:bg-white/10 transition-all duration-300"
            asChild
          >
            <Link href="/login">{t("signInHere")}</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
