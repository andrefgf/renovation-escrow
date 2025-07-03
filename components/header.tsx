"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Shield, Menu, X } from "lucide-react"
import { useState, useEffect } from "react"
import { ToggleGroup } from "./toggle-group"
import { useLanguage } from "@/contexts/language-context"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const { t } = useLanguage()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navItems = [
    { key: "features", href: "#features" },
    { key: "howItWorks", href: "#how-it-works" },
    { key: "calculator", href: "#calculator" },
    { key: "contact", href: "#contact" },
  ]

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen)

    // Announce menu state to screen readers
    const announcement = !isMenuOpen ? t("menuOpened") : t("menuClosed")
    const ariaLive = document.createElement("div")
    ariaLive.setAttribute("aria-live", "polite")
    ariaLive.className = "sr-only"
    ariaLive.textContent = announcement
    document.body.appendChild(ariaLive)

    setTimeout(() => {
      document.body.removeChild(ariaLive)
    }, 1000)
  }

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-background/90 dark:bg-background/90 backdrop-blur-xl border-b border-border/50 dark:border-border/30"
          : "bg-transparent"
      }`}
      role="banner"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center space-x-2 group" aria-label={t("homePageLink")}>
            <div className="relative">
              <Shield
                className="h-8 w-8 text-primary transition-transform group-hover:scale-110 group-focus:scale-110"
                aria-hidden="true"
              />
              <div className="absolute inset-0 bg-primary/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 group-focus:opacity-100 transition-opacity" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
              EscrowReno
            </span>
          </Link>

          <nav className="hidden md:flex items-center space-x-1" role="navigation" aria-label={t("mainNavigation")}>
            {navItems.map((item) => (
              <Link
                key={item.key}
                href={item.href}
                className="px-4 py-2 text-sm font-medium text-medium-contrast hover:text-high-contrast focus:text-high-contrast transition-colors rounded-lg hover:bg-accent/50 focus:bg-accent/50 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
              >
                {t(item.key as any)}
              </Link>
            ))}
          </nav>

          <div className="hidden md:flex items-center space-x-4">
            <ToggleGroup />
            <div className="flex items-center space-x-2" role="group" aria-label={t("authenticationButtons")}>
              <Button variant="ghost" size="sm" className="btn-accessible" asChild>
                <Link href="/login">{t("login")}</Link>
              </Button>
              <Button
                size="sm"
                className="bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90 shadow-lg hover:shadow-xl transition-all duration-300 btn-accessible"
                asChild
              >
                <Link href="/signup">{t("getStarted")}</Link>
              </Button>
            </div>
          </div>

          <div className="md:hidden flex items-center space-x-3">
            <ToggleGroup />
            <button
              onClick={handleMenuToggle}
              className="p-2 rounded-lg hover:bg-accent/50 focus:bg-accent/50 transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
              aria-expanded={isMenuOpen}
              aria-controls="mobile-menu"
              aria-label={isMenuOpen ? t("closeMenu") : t("openMenu")}
            >
              {isMenuOpen ? (
                <X className="h-5 w-5" aria-hidden="true" />
              ) : (
                <Menu className="h-5 w-5" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <div
            id="mobile-menu"
            className="md:hidden animate-slide-up"
            role="navigation"
            aria-label={t("mobileNavigation")}
          >
            <div className="px-2 pt-2 pb-3 space-y-1 bg-background/95 dark:bg-background/95 backdrop-blur-xl border border-border/50 dark:border-border/30 rounded-xl mt-2 shadow-lg">
              {navItems.map((item) => (
                <Link
                  key={item.key}
                  href={item.href}
                  className="block px-3 py-2 text-sm font-medium text-medium-contrast hover:text-high-contrast focus:text-high-contrast hover:bg-accent/50 focus:bg-accent/50 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {t(item.key as any)}
                </Link>
              ))}
              <div className="flex flex-col space-y-2 px-3 py-2 border-t border-border/50 dark:border-border/30 mt-2 pt-4">
                <Button variant="ghost" size="sm" className="btn-accessible" asChild>
                  <Link href="/login">{t("login")}</Link>
                </Button>
                <Button size="sm" className="bg-gradient-to-r from-primary to-purple-600 btn-accessible" asChild>
                  <Link href="/signup">{t("getStarted")}</Link>
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
