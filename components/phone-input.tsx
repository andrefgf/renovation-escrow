"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ChevronDown, Search } from "lucide-react"
import { cn } from "@/lib/utils"
import { sortedCountries, type Country, formatPhoneNumber, validatePhoneForCountry } from "@/lib/countries"
import { getFlagComponent } from "@/components/flag-icons"

interface PhoneInputProps {
  value: string
  onChange: (value: string) => void
  selectedCountry: Country
  onCountryChange: (country: Country) => void
  error?: string
  disabled?: boolean
  placeholder?: string
  label?: string
  required?: boolean
}

export function PhoneInput({
  value,
  onChange,
  selectedCountry,
  onCountryChange,
  error,
  disabled = false,
  placeholder,
  label = "Phone number",
  required = false,
}: PhoneInputProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const dropdownRef = useRef<HTMLDivElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
        setSearchQuery("")
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  // Filter countries based on search
  const filteredCountries = sortedCountries.filter(
    (country) =>
      country.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      country.phoneCode.includes(searchQuery) ||
      country.code.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const handleCountrySelect = (country: Country) => {
    onCountryChange(country)
    setIsOpen(false)
    setSearchQuery("")
  }

  const handlePhoneChange = (inputValue: string) => {
    // Remove all non-digit characters
    const digitsOnly = inputValue.replace(/\D/g, "")

    // Format according to country pattern if available
    const formatted = selectedCountry.format ? formatPhoneNumber(digitsOnly, selectedCountry) : digitsOnly

    onChange(formatted)
  }

  const FlagComponent = getFlagComponent(selectedCountry.code)
  const isValid = value ? validatePhoneForCountry(value, selectedCountry) : true

  return (
    <div className="space-y-2">
      {label && (
        <Label htmlFor="phone-input" className="text-sm font-medium">
          {label} {required && <span className="text-red-500">*</span>}
        </Label>
      )}

      <div className="flex items-center relative">
        {/* Country Selector Button */}
        <div className="relative" ref={dropdownRef}>
          <Button
            ref={buttonRef}
            type="button"
            variant="outline"
            onClick={() => setIsOpen(!isOpen)}
            disabled={disabled}
            className={cn(
              "shrink-0 z-10 inline-flex items-center py-2.5 px-4 text-sm font-medium text-center rounded-s-lg border-r-0 hover:bg-accent focus:ring-4 focus:outline-none focus:ring-primary/20",
              error && "border-red-500",
              "bg-background border-input",
            )}
            aria-expanded={isOpen}
            aria-haspopup="listbox"
            aria-label={`Selected country: ${selectedCountry.name} ${selectedCountry.phoneCode}`}
          >
            {FlagComponent ? (
              <FlagComponent className="h-4 w-4 me-2" />
            ) : (
              <span className="text-lg me-2" aria-hidden="true">
                {selectedCountry.flag}
              </span>
            )}
            <span className="font-medium">{selectedCountry.phoneCode}</span>
            <ChevronDown
              className="w-2.5 h-2.5 ms-2.5 transition-transform"
              style={{ transform: isOpen ? "rotate(180deg)" : "rotate(0deg)" }}
            />
          </Button>

          {/* Dropdown Menu */}
          {isOpen && (
            <div className="absolute top-full left-0 z-50 mt-1 bg-background divide-y divide-border rounded-lg shadow-lg w-80 border border-border max-h-80 overflow-hidden">
              {/* Search Input */}
              <div className="p-3 border-b border-border">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="text"
                    placeholder="Search countries..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 h-9"
                    autoFocus
                  />
                </div>
              </div>

              {/* Countries List */}
              <div className="max-h-60 overflow-y-auto">
                {filteredCountries.length > 0 ? (
                  <ul className="py-2 text-sm" role="listbox">
                    {filteredCountries.map((country) => {
                      const CountryFlag = getFlagComponent(country.code)
                      return (
                        <li key={country.code}>
                          <button
                            type="button"
                            onClick={() => handleCountrySelect(country)}
                            className={cn(
                              "inline-flex w-full px-4 py-2 text-sm hover:bg-accent focus:bg-accent focus:outline-none transition-colors",
                              selectedCountry.code === country.code && "bg-accent",
                            )}
                            role="option"
                            aria-selected={selectedCountry.code === country.code}
                          >
                            <span className="inline-flex items-center w-full">
                              {CountryFlag ? (
                                <CountryFlag className="h-4 w-4 me-3" />
                              ) : (
                                <span className="text-lg me-3" aria-hidden="true">
                                  {country.flag}
                                </span>
                              )}
                              <span className="flex-1 text-left">{country.name}</span>
                              <span className="text-muted-foreground ml-2">{country.phoneCode}</span>
                            </span>
                          </button>
                        </li>
                      )
                    })}
                  </ul>
                ) : (
                  <div className="px-4 py-6 text-center text-muted-foreground">No countries found</div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Phone Number Input */}
        <div className="relative w-full">
          <Input
            id="phone-input"
            type="tel"
            value={value}
            onChange={(e) => handlePhoneChange(e.target.value)}
            className={cn(
              "block w-full z-20 text-sm rounded-e-lg border-s-0 focus:ring-primary focus:border-primary",
              error && "border-red-500 focus:border-red-500 focus:ring-red-500",
              !isValid && value && "border-yellow-500 focus:border-yellow-500 focus:ring-yellow-500",
            )}
            placeholder={placeholder || "Phone number"}
            disabled={disabled}
            aria-invalid={!!error}
            aria-describedby={error ? "phone-error" : undefined}
          />
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <p id="phone-error" className="text-sm text-red-500" role="alert">
          {error}
        </p>
      )}

      {!isValid && value && !error && (
        <p className="text-sm text-yellow-600" role="alert">
          Phone number format may be incorrect for {selectedCountry.name}
        </p>
      )}
    </div>
  )
}
