import { Hero } from "@/components/hero"
import { Features } from "@/components/features"
import { SavingsCalculator } from "@/components/savings-calculator"
import { HowItWorks } from "@/components/how-it-works"
import { CTA } from "@/components/cta"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <div className="min-h-screen surface-0 transition-colors duration-500">
      <Header />
      <main id="main-content">
        <Hero />
        <Features />
        <HowItWorks />
        <SavingsCalculator />
        <CTA />
      </main>
      <Footer />
    </div>
  )
}
