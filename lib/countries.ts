export interface Country {
  code: string // ISO 3166-1 alpha-2
  name: string
  phoneCode: string
  flag: string
  format?: string // Phone number format pattern
  minLength?: number
  maxLength?: number
}

export const countries: Country[] = [
  // Europe
  { code: "PT", name: "Portugal", phoneCode: "+351", flag: "🇵🇹", format: "9XX XXX XXX", minLength: 9, maxLength: 9 },
  { code: "ES", name: "Spain", phoneCode: "+34", flag: "🇪🇸", format: "XXX XXX XXX", minLength: 9, maxLength: 9 },
  { code: "FR", name: "France", phoneCode: "+33", flag: "🇫🇷", format: "X XX XX XX XX", minLength: 10, maxLength: 10 },
  { code: "DE", name: "Germany", phoneCode: "+49", flag: "🇩🇪", format: "XXX XXXXXXX", minLength: 10, maxLength: 12 },
  { code: "IT", name: "Italy", phoneCode: "+39", flag: "🇮🇹", format: "XXX XXX XXXX", minLength: 10, maxLength: 11 },
  {
    code: "GB",
    name: "United Kingdom",
    phoneCode: "+44",
    flag: "🇬🇧",
    format: "XXXX XXX XXX",
    minLength: 10,
    maxLength: 11,
  },
  { code: "NL", name: "Netherlands", phoneCode: "+31", flag: "🇳🇱", format: "X XXXX XXXX", minLength: 9, maxLength: 9 },
  { code: "BE", name: "Belgium", phoneCode: "+32", flag: "🇧🇪", format: "XXX XX XX XX", minLength: 9, maxLength: 9 },
  { code: "CH", name: "Switzerland", phoneCode: "+41", flag: "🇨🇭", format: "XX XXX XX XX", minLength: 9, maxLength: 9 },
  { code: "AT", name: "Austria", phoneCode: "+43", flag: "🇦🇹", format: "XXX XXXXXXX", minLength: 10, maxLength: 13 },
  { code: "SE", name: "Sweden", phoneCode: "+46", flag: "🇸🇪", format: "XX XXX XX XX", minLength: 9, maxLength: 9 },
  { code: "NO", name: "Norway", phoneCode: "+47", flag: "🇳🇴", format: "XXX XX XXX", minLength: 8, maxLength: 8 },
  { code: "DK", name: "Denmark", phoneCode: "+45", flag: "🇩🇰", format: "XX XX XX XX", minLength: 8, maxLength: 8 },
  { code: "FI", name: "Finland", phoneCode: "+358", flag: "🇫🇮", format: "XX XXX XXXX", minLength: 9, maxLength: 10 },
  { code: "IE", name: "Ireland", phoneCode: "+353", flag: "🇮🇪", format: "XX XXX XXXX", minLength: 9, maxLength: 9 },
  { code: "PL", name: "Poland", phoneCode: "+48", flag: "🇵🇱", format: "XXX XXX XXX", minLength: 9, maxLength: 9 },
  {
    code: "CZ",
    name: "Czech Republic",
    phoneCode: "+420",
    flag: "🇨🇿",
    format: "XXX XXX XXX",
    minLength: 9,
    maxLength: 9,
  },
  { code: "HU", name: "Hungary", phoneCode: "+36", flag: "🇭🇺", format: "XX XXX XXXX", minLength: 9, maxLength: 9 },
  { code: "GR", name: "Greece", phoneCode: "+30", flag: "🇬🇷", format: "XXX XXX XXXX", minLength: 10, maxLength: 10 },

  // North America
  {
    code: "US",
    name: "United States",
    phoneCode: "+1",
    flag: "🇺🇸",
    format: "(XXX) XXX-XXXX",
    minLength: 10,
    maxLength: 10,
  },
  { code: "CA", name: "Canada", phoneCode: "+1", flag: "🇨🇦", format: "(XXX) XXX-XXXX", minLength: 10, maxLength: 10 },
  { code: "MX", name: "Mexico", phoneCode: "+52", flag: "🇲🇽", format: "XX XXXX XXXX", minLength: 10, maxLength: 10 },

  // South America
  { code: "BR", name: "Brazil", phoneCode: "+55", flag: "🇧🇷", format: "XX XXXXX-XXXX", minLength: 10, maxLength: 11 },
  { code: "AR", name: "Argentina", phoneCode: "+54", flag: "🇦🇷", format: "XX XXXX-XXXX", minLength: 10, maxLength: 10 },
  { code: "CL", name: "Chile", phoneCode: "+56", flag: "🇨🇱", format: "X XXXX XXXX", minLength: 9, maxLength: 9 },
  { code: "CO", name: "Colombia", phoneCode: "+57", flag: "🇨🇴", format: "XXX XXX XXXX", minLength: 10, maxLength: 10 },
  { code: "PE", name: "Peru", phoneCode: "+51", flag: "🇵🇪", format: "XXX XXX XXX", minLength: 9, maxLength: 9 },

  // Asia
  { code: "CN", name: "China", phoneCode: "+86", flag: "🇨🇳", format: "XXX XXXX XXXX", minLength: 11, maxLength: 11 },
  { code: "JP", name: "Japan", phoneCode: "+81", flag: "🇯🇵", format: "XX-XXXX-XXXX", minLength: 10, maxLength: 11 },
  {
    code: "KR",
    name: "South Korea",
    phoneCode: "+82",
    flag: "🇰🇷",
    format: "XX-XXXX-XXXX",
    minLength: 10,
    maxLength: 11,
  },
  { code: "IN", name: "India", phoneCode: "+91", flag: "🇮🇳", format: "XXXXX XXXXX", minLength: 10, maxLength: 10 },
  { code: "SG", name: "Singapore", phoneCode: "+65", flag: "🇸🇬", format: "XXXX XXXX", minLength: 8, maxLength: 8 },
  { code: "MY", name: "Malaysia", phoneCode: "+60", flag: "🇲🇾", format: "XX-XXX XXXX", minLength: 9, maxLength: 10 },
  { code: "TH", name: "Thailand", phoneCode: "+66", flag: "🇹🇭", format: "XX XXX XXXX", minLength: 9, maxLength: 9 },
  { code: "VN", name: "Vietnam", phoneCode: "+84", flag: "🇻🇳", format: "XXX XXX XXXX", minLength: 9, maxLength: 10 },
  {
    code: "PH",
    name: "Philippines",
    phoneCode: "+63",
    flag: "🇵🇭",
    format: "XXX XXX XXXX",
    minLength: 10,
    maxLength: 10,
  },
  { code: "ID", name: "Indonesia", phoneCode: "+62", flag: "🇮🇩", format: "XXX-XXX-XXXX", minLength: 10, maxLength: 12 },

  // Middle East
  {
    code: "AE",
    name: "United Arab Emirates",
    phoneCode: "+971",
    flag: "🇦🇪",
    format: "XX XXX XXXX",
    minLength: 9,
    maxLength: 9,
  },
  {
    code: "SA",
    name: "Saudi Arabia",
    phoneCode: "+966",
    flag: "🇸🇦",
    format: "XX XXX XXXX",
    minLength: 9,
    maxLength: 9,
  },
  { code: "IL", name: "Israel", phoneCode: "+972", flag: "🇮🇱", format: "XX-XXX-XXXX", minLength: 9, maxLength: 9 },
  { code: "TR", name: "Turkey", phoneCode: "+90", flag: "🇹🇷", format: "XXX XXX XX XX", minLength: 10, maxLength: 10 },

  // Africa
  { code: "ZA", name: "South Africa", phoneCode: "+27", flag: "🇿🇦", format: "XX XXX XXXX", minLength: 9, maxLength: 9 },
  { code: "NG", name: "Nigeria", phoneCode: "+234", flag: "🇳🇬", format: "XXX XXX XXXX", minLength: 10, maxLength: 10 },
  { code: "KE", name: "Kenya", phoneCode: "+254", flag: "🇰🇪", format: "XXX XXX XXX", minLength: 9, maxLength: 9 },
  { code: "EG", name: "Egypt", phoneCode: "+20", flag: "🇪🇬", format: "XX XXXX XXXX", minLength: 10, maxLength: 10 },
  { code: "MA", name: "Morocco", phoneCode: "+212", flag: "🇲🇦", format: "XX-XXXX-XXXX", minLength: 9, maxLength: 9 },

  // Oceania
  { code: "AU", name: "Australia", phoneCode: "+61", flag: "🇦🇺", format: "XXX XXX XXX", minLength: 9, maxLength: 9 },
  { code: "NZ", name: "New Zealand", phoneCode: "+64", flag: "🇳🇿", format: "XX XXX XXXX", minLength: 8, maxLength: 9 },
]

// Sort countries alphabetically by name, but keep Portugal first
export const sortedCountries = [
  countries.find((c) => c.code === "PT")!,
  ...countries.filter((c) => c.code !== "PT").sort((a, b) => a.name.localeCompare(b.name)),
]

export const getCountryByCode = (code: string): Country | undefined => {
  return countries.find((country) => country.code === code)
}

export const getCountryByPhoneCode = (phoneCode: string): Country | undefined => {
  return countries.find((country) => country.phoneCode === phoneCode)
}

export const validatePhoneForCountry = (phone: string, country: Country): boolean => {
  const cleanPhone = phone.replace(/\D/g, "")

  if (country.minLength && cleanPhone.length < country.minLength) return false
  if (country.maxLength && cleanPhone.length > country.maxLength) return false

  // Basic validation - in production, you'd want more specific validation per country
  return cleanPhone.length >= (country.minLength || 7) && cleanPhone.length <= (country.maxLength || 15)
}

export const formatPhoneNumber = (phone: string, country: Country): string => {
  const cleanPhone = phone.replace(/\D/g, "")
  if (!country.format) return cleanPhone

  let formatted = ""
  let phoneIndex = 0

  for (let i = 0; i < country.format.length && phoneIndex < cleanPhone.length; i++) {
    if (country.format[i] === "X") {
      formatted += cleanPhone[phoneIndex]
      phoneIndex++
    } else {
      formatted += country.format[i]
    }
  }

  return formatted
}
