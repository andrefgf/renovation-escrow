"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Check, ChevronDown, Search } from "lucide-react"
import { cn } from "@/lib/utils"
import { sortedCountries, type Country } from "@/lib/countries"

interface CountrySelectorProps {
  value: Country
  onValueChange: (country: Country) => void
  disabled?: boolean
}

export function CountrySelector({ value, onValueChange, disabled = false }: CountrySelectorProps) {
  const [open, setOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")

  const filteredCountries = sortedCountries.filter(
    (country) =>
      country.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      country.phoneCode.includes(searchQuery) ||
      country.code.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="justify-between h-10 px-3 font-normal bg-transparent"
          disabled={disabled}
        >
          <div className="flex items-center space-x-2 min-w-0">
            <span className="text-lg" aria-hidden="true">
              {value.flag}
            </span>
            <span className="font-medium text-sm">{value.phoneCode}</span>
            <span className="text-xs text-muted-foreground truncate hidden sm:inline">{value.name}</span>
          </div>
          <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-0" align="start">
        <Command>
          <div className="flex items-center border-b px-3">
            <Search className="mr-2 h-4 w-4 shrink-0 opacity-50" />
            <CommandInput
              placeholder="Procurar país ou código..."
              value={searchQuery}
              onValueChange={setSearchQuery}
              className="flex h-10 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50"
            />
          </div>
          <CommandList className="max-h-60">
            <CommandEmpty>Nenhum país encontrado.</CommandEmpty>
            <CommandGroup>
              {filteredCountries.map((country) => (
                <CommandItem
                  key={country.code}
                  value={`${country.name} ${country.phoneCode} ${country.code}`}
                  onSelect={() => {
                    onValueChange(country)
                    setOpen(false)
                    setSearchQuery("")
                  }}
                  className="flex items-center justify-between cursor-pointer"
                >
                  <div className="flex items-center space-x-3">
                    <span className="text-lg" aria-hidden="true">
                      {country.flag}
                    </span>
                    <div className="flex flex-col">
                      <span className="font-medium text-sm">{country.name}</span>
                      <span className="text-xs text-muted-foreground">{country.phoneCode}</span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    {country.format && (
                      <span className="text-xs text-muted-foreground font-mono hidden sm:inline">{country.format}</span>
                    )}
                    <Check className={cn("h-4 w-4", value.code === country.code ? "opacity-100" : "opacity-0")} />
                  </div>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
