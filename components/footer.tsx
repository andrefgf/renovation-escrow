"use client"

import Link from "next/link"
import { Shield, Mail, Phone, MapPin } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"

export function Footer() {
  const { t } = useLanguage()

  return (
    <footer id="contact" className="bg-gray-900 dark:bg-black text-white transition-colors duration-500">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <Shield className="h-8 w-8 text-blue-400" />
              <span className="text-2xl font-bold">EscrowReno</span>
            </div>
            <p className="text-gray-400 dark:text-gray-300 mb-6 max-w-md">{t("footerDescription")}</p>
            <div className="space-y-2">
              <div className="flex items-center space-x-2 text-gray-400 dark:text-gray-300">
                <MapPin className="h-4 w-4" />
                <span>Lisboa, Portugal</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-400 dark:text-gray-300">
                <Phone className="h-4 w-4" />
                <span>+351 XXX XXX XXX</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-400 dark:text-gray-300">
                <Mail className="h-4 w-4" />
                <span>info@escrowreno.pt</span>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">{t("platform")}</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/features" className="text-gray-400 dark:text-gray-300 hover:text-white transition-colors">
                  {t("features")}
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="text-gray-400 dark:text-gray-300 hover:text-white transition-colors">
                  {t("pricing")}
                </Link>
              </li>
              <li>
                <Link href="/security" className="text-gray-400 dark:text-gray-300 hover:text-white transition-colors">
                  {t("security")}
                </Link>
              </li>
              <li>
                <Link href="/api" className="text-gray-400 dark:text-gray-300 hover:text-white transition-colors">
                  {t("api")}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">{t("support")}</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/help" className="text-gray-400 dark:text-gray-300 hover:text-white transition-colors">
                  {t("helpCenter")}
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-400 dark:text-gray-300 hover:text-white transition-colors">
                  {t("contactUs")}
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-gray-400 dark:text-gray-300 hover:text-white transition-colors">
                  {t("privacyPolicy")}
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-gray-400 dark:text-gray-300 hover:text-white transition-colors">
                  {t("termsOfService")}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 dark:border-gray-700 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center transition-colors duration-300">
          <p className="text-gray-400 dark:text-gray-300 text-sm">© 2024 EscrowReno. {t("allRightsReserved")}</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <span className="text-gray-400 dark:text-gray-300 text-sm">{t("poweredBySibs")}</span>
            <span className="text-gray-400 dark:text-gray-300 text-sm">{t("euCompliant")}</span>
            <span className="text-gray-400 dark:text-gray-300 text-sm">{t("sslSecured")}</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
