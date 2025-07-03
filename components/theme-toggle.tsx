"use client"

import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/contexts/language-context"
import { useEffect, useState } from "react"

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const { t } = useLanguage()
  const [mounted, setMounted] = useState(false)
  const [isAnimating, setIsAnimating] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleThemeToggle = () => {
    setIsAnimating(true)
    const newTheme = theme === "dark" ? "light" : "dark"
    setTheme(newTheme)

    // Announce theme change to screen readers
    const announcement = newTheme === "dark" ? t("darkMode") : t("lightMode")
    const ariaLive = document.createElement("div")
    ariaLive.setAttribute("aria-live", "polite")
    ariaLive.setAttribute("aria-atomic", "true")
    ariaLive.className = "sr-only"
    ariaLive.textContent = `${t("toggleTheme")}: ${announcement}`
    document.body.appendChild(ariaLive)

    setTimeout(() => {
      document.body.removeChild(ariaLive)
      setIsAnimating(false)
    }, 400)
  }

  if (!mounted) {
    return (
      <Button
        variant="ghost"
        size="sm"
        className="h-10 w-10 px-0 rounded-xl border border-border/50 bg-background/50 backdrop-blur-sm"
        aria-label={t("toggleTheme")}
      >
        <Sun className="h-4 w-4" />
      </Button>
    )
  }

  const isDark = theme === "dark"

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={handleThemeToggle}
      className={`h-10 w-10 px-0 rounded-xl border transition-all duration-200 group relative overflow-hidden btn-accessible ${
        isDark
          ? "border-blue-400/40 bg-slate-900/60 hover:bg-slate-800/70 hover:border-blue-300/60 shadow-lg shadow-blue-500/20"
          : "border-amber-400/40 bg-amber-50/60 hover:bg-amber-100/70 hover:border-amber-300/60 shadow-lg shadow-amber-500/20"
      } backdrop-blur-sm ${isAnimating ? "animate-theme-switch" : ""}`}
      aria-label={`${t("toggleTheme")}: ${isDark ? t("lightMode") : t("darkMode")}`}
      aria-pressed={isDark}
      role="switch"
    >
      <div className="relative w-4 h-4">
        <Sun
          className={`h-4 w-4 absolute transition-all duration-500 ${
            isDark
              ? "rotate-90 scale-0 opacity-0"
              : "rotate-0 scale-100 opacity-100 text-amber-700 group-hover:text-amber-800 drop-shadow-sm"
          }`}
          aria-hidden="true"
        />
        <Moon
          className={`h-4 w-4 absolute transition-all duration-500 ${
            isDark
              ? "rotate-0 scale-100 opacity-100 text-blue-200 group-hover:text-blue-100 drop-shadow-sm"
              : "-rotate-90 scale-0 opacity-0"
          }`}
          aria-hidden="true"
        />
      </div>

      {/* Screen reader text */}
      <span className="sr-only">{isDark ? t("switchToLightMode") : t("switchToDarkMode")}</span>

      {/* Enhanced glow effect with better contrast */}
      <div
        className={`absolute inset-0 rounded-xl transition-all duration-300 ${
          isDark
            ? "bg-gradient-to-r from-blue-400/15 to-indigo-400/15 group-hover:from-blue-400/25 group-hover:to-indigo-400/25"
            : "bg-gradient-to-r from-amber-400/15 to-orange-400/15 group-hover:from-amber-400/25 group-hover:to-orange-400/25"
        }`}
      />

      {/* Focus indicator */}
      <div className="absolute inset-0 rounded-xl opacity-0 focus-visible:opacity-100 ring-2 ring-primary ring-offset-2 ring-offset-background transition-opacity" />
    </Button>
  )
}
