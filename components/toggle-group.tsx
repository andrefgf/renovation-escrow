"use client"

import { ThemeToggle } from "./theme-toggle"
import { LanguageToggle } from "./language-toggle"

export function ToggleGroup() {
  return (
    <div className="flex items-center space-x-2 p-1 rounded-2xl bg-background/60 dark:bg-background/40 backdrop-blur-xl border border-border/30 dark:border-border/20 shadow-lg shadow-black/5 dark:shadow-black/20 transition-all duration-300">
      <LanguageToggle />
      <div className="w-px h-6 bg-border/50 dark:bg-border/30 transition-colors duration-300" />
      <ThemeToggle />
    </div>
  )
}
