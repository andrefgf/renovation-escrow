import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { LanguageProvider } from "@/contexts/language-context"

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
})

export const metadata: Metadata = {
  title: "EscrowReno - Pagamentos Seguros de Renovação | Proteção para Proprietários e Empreiteiros",
  description:
    "Proteja o seu investimento em renovação com pagamentos de caução baseados em marcos. Plataforma de confiança para proprietários e empreiteiros em Portugal. Pagamentos seguros, verificação de qualidade e resolução de conflitos.",
  keywords: "renovação, pagamentos seguros, caução, empreiteiros, Portugal, SIBS, proteção investimento",
  authors: [{ name: "EscrowReno" }],
  openGraph: {
    title: "EscrowReno - Pagamentos Seguros de Renovação",
    description: "Proteja o seu investimento em renovação com pagamentos seguros baseados em marcos.",
    locale: "pt_PT",
    type: "website",
  },
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 5,
  },
  robots: {
    index: true,
    follow: true,
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-PT" suppressHydrationWarning className={inter.variable}>
      <body className={`${inter.className} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange={false}
          storageKey="escrowreno-theme"
        >
          <LanguageProvider>
            <div id="main-content">{children}</div>
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
