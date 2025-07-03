"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight, Shield, Sparkles, TrendingUp } from "lucide-react"
import Link from "next/link"
import { useEffect, useState } from "react"
import { useLanguage } from "@/contexts/language-context"

export function Hero() {
  const [isVisible, setIsVisible] = useState(false)
  const { t } = useLanguage()

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <section
      className="relative min-h-screen flex items-center justify-center overflow-hidden surface-0 transition-colors duration-500"
      aria-labelledby="hero-title"
      role="banner"
    >
      {/* Skip link for accessibility */}
      <a href="#main-content" className="skip-link">
        {t("skipToMainContent")}
      </a>

      {/* Refined background - no problematic gradients in dark mode */}
      <div className="absolute inset-0" aria-hidden="true">
        {/* Light mode: subtle gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-purple-500/5 dark:from-transparent dark:via-transparent dark:to-transparent transition-all duration-500" />

        {/* Dark mode: subtle surface elevation with proper contrast */}
        <div className="absolute inset-0 hidden dark:block">
          <div className="absolute inset-0 surface-1" />
          <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-primary/10 to-transparent" />
        </div>

        {/* Floating elements - more subtle in dark mode */}
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-primary/8 dark:bg-primary/15 rounded-full blur-3xl animate-float transition-all duration-500" />
        <div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/8 dark:bg-purple-500/15 rounded-full blur-3xl animate-float transition-all duration-500"
          style={{ animationDelay: "1s" }}
        />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          {/* Badge with proper surface elevation */}
          <div
            className={`inline-flex items-center space-x-2 px-4 py-2 surface-2 border border-primary/20 dark:border-primary/30 rounded-full mb-8 transition-all duration-700 backdrop-blur-sm shadow-sm dark:shadow-lg ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
            role="img"
            aria-label={t("trustedInPortugal")}
          >
            <Sparkles className="h-4 w-4 text-primary" aria-hidden="true" />
            <span className="text-sm font-medium text-primary">{t("trustedInPortugal")}</span>
          </div>

          {/* Main heading with enhanced contrast */}
          <h1
            id="hero-title"
            className={`text-4xl sm:text-6xl lg:text-7xl font-bold mb-6 transition-all duration-700 delay-200 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            <span className="text-primary-semantic bg-gradient-to-r from-foreground via-primary to-purple-600 dark:from-foreground dark:via-primary dark:to-purple-400 bg-clip-text text-transparent">
              {t("heroTitle")}
            </span>
          </h1>

          {/* Subtitle with proper semantic color */}
          <p
            className={`text-xl sm:text-2xl text-secondary-semantic mb-12 max-w-2xl mx-auto leading-relaxed transition-all duration-700 delay-400 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
            role="text"
          >
            {t("heroSubtitle")}
          </p>

          {/* CTA Buttons with enhanced surface styling */}
          <div
            className={`flex flex-col sm:flex-row gap-4 justify-center mb-16 transition-all duration-700 delay-600 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
            role="group"
            aria-label={t("callToActionButtons")}
          >
            <Button
              size="lg"
              className="text-lg px-8 py-6 bg-gradient-to-r from-primary to-purple-600 dark:from-primary dark:to-purple-500 hover:from-primary/90 hover:to-purple-600/90 dark:hover:from-primary/90 dark:hover:to-purple-500/90 shadow-lg hover:shadow-xl dark:shadow-primary/20 transition-all duration-300 group"
              asChild
            >
              <Link href="/signup" aria-describedby="cta-primary-desc">
                {t("startFreeTrial")}
                <ArrowRight
                  className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform"
                  aria-hidden="true"
                />
                <span id="cta-primary-desc" className="sr-only">
                  {t("startFreeTrialDescription")}
                </span>
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="text-lg px-8 py-6 border-2 surface-2 border-border dark:border-border hover:surface-3 dark:hover:surface-3 transition-all duration-300 backdrop-blur-sm bg-transparent"
              asChild
            >
              <Link href="#calculator" aria-describedby="cta-secondary-desc">
                {t("calculateSavings")}
                <span id="cta-secondary-desc" className="sr-only">
                  {t("calculateSavingsDescription")}
                </span>
              </Link>
            </Button>
          </div>

          {/* Stats with proper contrast */}
          <div
            className={`grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-2xl mx-auto transition-all duration-700 delay-800 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
            role="region"
            aria-label={t("platformStatistics")}
          >
            <div className="text-center" role="group" aria-labelledby="stat-1-label">
              <div className="text-3xl font-bold text-primary mb-2" aria-label="2.5 million euros">
                €2.5M+
              </div>
              <div id="stat-1-label" className="text-sm text-tertiary-semantic">
                {t("protected")}
              </div>
            </div>
            <div className="text-center" role="group" aria-labelledby="stat-2-label">
              <div className="text-3xl font-bold text-primary mb-2" aria-label="98 percent">
                98%
              </div>
              <div id="stat-2-label" className="text-sm text-tertiary-semantic">
                {t("successRate")}
              </div>
            </div>
            <div className="text-center" role="group" aria-labelledby="stat-3-label">
              <div className="text-3xl font-bold text-primary mb-2" aria-label="24 hours">
                24h
              </div>
              <div id="stat-3-label" className="text-sm text-tertiary-semantic">
                {t("avgResponse")}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating elements with proper opacity for dark mode */}
      <div
        className="absolute top-20 left-10 opacity-15 dark:opacity-25 transition-opacity duration-500"
        aria-hidden="true"
      >
        <Shield className="h-8 w-8 text-primary animate-float" />
      </div>
      <div
        className="absolute bottom-20 right-10 opacity-15 dark:opacity-25 transition-opacity duration-500"
        aria-hidden="true"
      >
        <TrendingUp className="h-8 w-8 text-purple-500 animate-float" style={{ animationDelay: "2s" }} />
      </div>
    </section>
  )
}
