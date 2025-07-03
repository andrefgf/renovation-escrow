"use client"

import { Globe } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/contexts/language-context"

export function LanguageToggle() {
  const { language, setLanguage, t } = useLanguage()

  const isPortuguese = language === "pt-PT"

  const handleLanguageToggle = () => {
    const newLanguage = isPortuguese ? "en" : "pt-PT"
    setLanguage(newLanguage)

    // Announce language change to screen readers
    const announcement = newLanguage === "pt-PT" ? t("portuguese") : t("english")
    const ariaLive = document.createElement("div")
    ariaLive.setAttribute("aria-live", "polite")
    ariaLive.setAttribute("aria-atomic", "true")
    ariaLive.className = "sr-only"
    ariaLive.textContent = `${t("toggleLanguage")}: ${announcement}`
    document.body.appendChild(ariaLive)

    setTimeout(() => {
      document.body.removeChild(ariaLive)
    }, 1000)
  }

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={handleLanguageToggle}
      className="h-10 px-3 rounded-xl border border-primary/30 bg-primary/10 hover:bg-primary/15 hover:border-primary/40 transition-all duration-300 group relative overflow-hidden backdrop-blur-sm shadow-lg shadow-primary/10 btn-accessible dark:bg-primary/15 dark:hover:bg-primary/20 dark:border-primary/40 dark:hover:border-primary/50 dark:shadow-primary/15"
      aria-label={`${t("toggleLanguage")}: ${isPortuguese ? t("english") : t("portuguese")}`}
      role="switch"
      aria-pressed={isPortuguese}
    >
      <div className="flex items-center space-x-2">
        <div className="relative">
          <Globe
            className="h-4 w-4 text-primary group-hover:text-primary/80 transition-all duration-300 drop-shadow-sm"
            aria-hidden="true"
          />
          <div className="absolute inset-0 bg-primary/20 rounded-full blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
        <span
          className="text-sm font-medium min-w-[2rem] text-center transition-all duration-300 text-primary group-hover:text-primary/80"
          aria-label={isPortuguese ? "Português" : "English"}
        >
          {isPortuguese ? "PT" : "EN"}
        </span>
      </div>

      {/* Screen reader text */}
      <span className="sr-only">{isPortuguese ? t("switchToEnglish") : t("switchToPortuguese")}</span>

      {/* Enhanced glow effect */}
      <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-primary/8 to-purple-500/8 group-hover:from-primary/15 group-hover:to-purple-500/15 transition-all duration-300 dark:from-primary/12 dark:to-purple-500/12 dark:group-hover:from-primary/20 dark:group-hover:to-purple-500/20" />

      {/* Focus indicator */}
      <div className="absolute inset-0 rounded-xl opacity-0 focus-visible:opacity-100 ring-2 ring-primary ring-offset-2 ring-offset-background transition-opacity" />
    </Button>
  )
}
