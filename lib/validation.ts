import type { Country } from "./countries"

// Validation utilities for signup process
export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

export const validatePhoneNumber = (phone: string, country: Country): boolean => {
  const cleanPhone = phone.replace(/\D/g, "")

  if (country.minLength && cleanPhone.length < country.minLength) return false
  if (country.maxLength && cleanPhone.length > country.maxLength) return false

  // Basic validation - in production, you'd want more specific validation per country
  return cleanPhone.length >= (country.minLength || 7) && cleanPhone.length <= (country.maxLength || 15)
}

export const validatePassword = (password: string): { isValid: boolean; errors: string[] } => {
  const errors: string[] = []

  if (password.length < 8) {
    errors.push("Mínimo 8 caracteres")
  }
  if (!/[A-Z]/.test(password)) {
    errors.push("Pelo menos uma letra maiúscula")
  }
  if (!/[a-z]/.test(password)) {
    errors.push("Pelo menos uma letra minúscula")
  }
  if (!/\d/.test(password)) {
    errors.push("Pelo menos um número")
  }
  if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
    errors.push("Pelo menos um carácter especial")
  }

  return {
    isValid: errors.length === 0,
    errors,
  }
}

export const sanitizeInput = (input: string): string => {
  // Basic XSS prevention
  return input
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#x27;")
    .replace(/\//g, "&#x2F;")
}

export const generateVerificationCode = (): string => {
  return Math.floor(100000 + Math.random() * 900000).toString()
}

export const generateSecureToken = (): string => {
  const array = new Uint8Array(32)
  crypto.getRandomValues(array)
  return Array.from(array, (byte) => byte.toString(16).padStart(2, "0")).join("")
}
