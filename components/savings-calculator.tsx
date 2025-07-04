"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import {
  Calculator,
  TrendingUp,
  Shield,
  AlertTriangle,
  Sparkles,
  Home,
  Building,
  ArrowRight,
  ArrowLeft,
  HelpCircle,
  MapPin,
  Wrench,
  Bed,
  ChefHat,
  Bath,
  Sofa,
  Star,
} from "lucide-react"
import { useLanguage } from "@/contexts/language-context"

type PropertyType = "apartment" | "house"
type ApartmentType = "concrete" | "wood"
type HouseType = "no-roof" | "with-roof"
type RenovationScope = "light" | "medium" | "full"
type PropertyCondition = "move-in" | "some-repair" | "poor"
type QualityLevel = "basic" | "mid-range" | "luxury"
type ContractorRisk = "verified" | "references" | "unknown"

interface RoomCounts {
  bathrooms: number
  kitchens: number
  bedrooms: number
  livingSpaces: number
}

export function SavingsCalculator() {
  const [step, setStep] = useState(1)
  const [propertyType, setPropertyType] = useState<PropertyType>("apartment")
  const [apartmentType, setApartmentType] = useState<ApartmentType>("concrete")
  const [houseType, setHouseType] = useState<HouseType>("no-roof")
  const [location, setLocation] = useState("")
  const [area, setArea] = useState("")
  const [renovationScope, setRenovationScope] = useState<RenovationScope>("medium")
  const [rooms, setRooms] = useState<RoomCounts>({
    bathrooms: 1,
    kitchens: 1,
    bedrooms: 2,
    livingSpaces: 1,
  })
  const [propertyCondition, setPropertyCondition] = useState<PropertyCondition>("some-repair")
  const [qualityLevel, setQualityLevel] = useState<QualityLevel>("mid-range")
  const [contractorRisk, setContractorRisk] = useState<ContractorRisk>("references")
  const [email, setEmail] = useState("")
  const [isVisible, setIsVisible] = useState(false)
  const { t } = useLanguage()

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 },
    )

    const element = document.getElementById("calculator")
    if (element) observer.observe(element)

    return () => observer.disconnect()
  }, [])

  const getBasePrice = () => {
    if (propertyType === "apartment") {
      return apartmentType === "concrete" ? 500 : 600
    } else {
      return houseType === "no-roof" ? 600 : 800
    }
  }

  const getScopeMultiplier = () => {
    const multipliers = {
      light: 0.6, // Cosmetic work
      medium: 1.0, // Standard renovation
      full: 1.4, // Full gut renovation
    }
    return multipliers[renovationScope]
  }

  const getConditionMultiplier = () => {
    const multipliers = {
      "move-in": 0.8, // Already in good condition
      "some-repair": 1.0, // Standard condition
      poor: 1.3, // Major issues to fix
    }
    return multipliers[propertyCondition]
  }

  const getQualityMultiplier = () => {
    const multipliers = {
      basic: 0.7, // Basic finishes
      "mid-range": 1.0, // Standard quality
      luxury: 1.5, // High-end finishes
    }
    return multipliers[qualityLevel]
  }

  const getRoomComplexityMultiplier = () => {
    // Complex rooms (kitchens, bathrooms) cost more per m²
    const totalRooms = rooms.bathrooms + rooms.kitchens + rooms.bedrooms + rooms.livingSpaces
    const complexRooms = rooms.bathrooms * 1.5 + rooms.kitchens * 1.3 + rooms.bedrooms + rooms.livingSpaces
    return totalRooms > 0 ? complexRooms / totalRooms : 1
  }

  const calculateProject = () => {
    const areaNum = Number.parseFloat(area) || 0
    const basePricePerM2 = getBasePrice()

    // Apply all multipliers
    const scopeMultiplier = getScopeMultiplier()
    const conditionMultiplier = getConditionMultiplier()
    const qualityMultiplier = getQualityMultiplier()
    const roomComplexityMultiplier = getRoomComplexityMultiplier()

    const adjustedPricePerM2 =
      basePricePerM2 * scopeMultiplier * conditionMultiplier * qualityMultiplier * roomComplexityMultiplier

    const subtotal = areaNum * adjustedPricePerM2
    const iva = subtotal * 0.23 // 23% IVA in Portugal
    const totalProject = subtotal + iva

    // Risk calculation based on contractor verification and project complexity
    const baseRiskFactors = {
      verified: 0.02, // 2% risk - verified contractors
      references: 0.08, // 8% risk - has references but not fully verified
      unknown: 0.18, // 18% risk - unknown contractor
    }

    // Higher complexity projects have slightly higher risk
    const complexityRiskMultiplier = renovationScope === "full" ? 1.2 : renovationScope === "medium" ? 1.0 : 0.8

    const riskPercentage = baseRiskFactors[contractorRisk] * complexityRiskMultiplier
    const potentialLoss = totalProject * riskPercentage
    const escrowFee = totalProject * 0.025 // 2.5% escrow fee
    const netSavings = potentialLoss - escrowFee

    return {
      subtotal: Math.round(subtotal),
      iva: Math.round(iva),
      totalProject: Math.round(totalProject),
      potentialLoss: Math.round(potentialLoss),
      escrowFee: Math.round(escrowFee),
      netSavings: Math.round(netSavings),
      riskPercentage: Math.round(riskPercentage * 100),
      basePricePerM2,
      adjustedPricePerM2: Math.round(adjustedPricePerM2),
    }
  }

  const results = calculateProject()

  const handleGetReport = () => {
    if (email) {
      alert(`${t("sendReport")} ${email}!`)
    }
  }

  const nextStep = () => {
    if (step < 5) setStep(step + 1)
  }

  const prevStep = () => {
    if (step > 1) setStep(step - 1)
  }

  const resetCalculator = () => {
    setStep(1)
    setPropertyType("apartment")
    setApartmentType("concrete")
    setHouseType("no-roof")
    setLocation("")
    setArea("")
    setRenovationScope("medium")
    setRooms({ bathrooms: 1, kitchens: 1, bedrooms: 2, livingSpaces: 1 })
    setPropertyCondition("some-repair")
    setQualityLevel("mid-range")
    setContractorRisk("references")
    setEmail("")
  }

  const canProceed = () => {
    switch (step) {
      case 1:
        return location && area
      case 2:
        return true
      case 3:
        return true
      case 4:
        return true
      default:
        return true
    }
  }

  const RiskTooltip = ({ title, content }: { title: string; content: string }) => (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <HelpCircle className="h-4 w-4 text-muted-foreground hover:text-primary cursor-help ml-1" />
        </TooltipTrigger>
        <TooltipContent side="top" className="max-w-xs">
          <div className="space-y-1">
            <div className="font-medium">{title}</div>
            <div className="text-sm">{content}</div>
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )

  return (
    <section
      id="calculator"
      className="py-24 relative overflow-hidden surface-0 section-fade transition-colors duration-150"
    >
      {/* Background elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-purple-500/5 dark:from-primary/8 dark:to-purple-500/8 transition-all duration-150" />
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-gradient-to-l from-primary/10 dark:from-primary/15 to-transparent rounded-full blur-3xl transition-all duration-150" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div
          className={`text-center mb-16 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="inline-flex items-center space-x-2 px-4 py-2 bg-primary/10 dark:bg-primary/20 border border-primary/20 dark:border-primary/30 rounded-full mb-6 backdrop-blur-sm">
            <Calculator className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium text-primary">Calculadora Inteligente</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-foreground to-primary dark:from-foreground dark:to-primary bg-clip-text text-transparent">
              Calcule o Seu Projeto
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Obtenha uma estimativa precisa em menos de 1 minuto
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          {step < 5 ? (
            // Multi-step form
            <Card
              className={`border-0 bg-gradient-to-br from-background to-accent/20 dark:from-card dark:to-accent/10 shadow-2xl dark:shadow-primary/5 transition-all duration-700 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
            >
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center space-x-2 text-2xl">
                    <TrendingUp className="h-6 w-6 text-primary" />
                    <span>Passo {step} de 4</span>
                  </CardTitle>
                  <div className="flex space-x-1">
                    {[1, 2, 3, 4].map((i) => (
                      <div
                        key={i}
                        className={`w-3 h-3 rounded-full transition-colors ${i <= step ? "bg-primary" : "bg-muted"}`}
                      />
                    ))}
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-8">
                {step === 1 && (
                  <div className="space-y-6">
                    <h3 className="text-xl font-semibold text-center">Informações Básicas da Propriedade</h3>

                    {/* Property Type */}
                    <div className="space-y-4">
                      <Label className="text-lg font-medium">Tipo de Propriedade</Label>
                      <RadioGroup
                        value={propertyType}
                        onValueChange={(value) => setPropertyType(value as PropertyType)}
                      >
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="flex items-center space-x-2 p-4 border rounded-lg hover:bg-accent/50 transition-colors">
                            <RadioGroupItem value="apartment" id="apartment" />
                            <Label htmlFor="apartment" className="flex items-center space-x-3 cursor-pointer flex-1">
                              <Building className="h-8 w-8 text-primary" />
                              <div>
                                <div className="font-medium">Apartamento</div>
                                <div className="text-sm text-muted-foreground">Em prédio ou edifício</div>
                              </div>
                            </Label>
                          </div>
                          <div className="flex items-center space-x-2 p-4 border rounded-lg hover:bg-accent/50 transition-colors">
                            <RadioGroupItem value="house" id="house" />
                            <Label htmlFor="house" className="flex items-center space-x-3 cursor-pointer flex-1">
                              <Home className="h-8 w-8 text-primary" />
                              <div>
                                <div className="font-medium">Moradia</div>
                                <div className="text-sm text-muted-foreground">Casa independente</div>
                              </div>
                            </Label>
                          </div>
                        </div>
                      </RadioGroup>
                    </div>

                    {/* Construction Type */}
                    {propertyType === "apartment" ? (
                      <div className="space-y-4">
                        <Label className="text-lg font-medium">Tipo de Construção</Label>
                        <RadioGroup
                          value={apartmentType}
                          onValueChange={(value) => setApartmentType(value as ApartmentType)}
                        >
                          <div className="space-y-3">
                            <div className="flex items-center space-x-2 p-4 border rounded-lg hover:bg-accent/50 transition-colors">
                              <RadioGroupItem value="concrete" id="concrete" />
                              <Label htmlFor="concrete" className="cursor-pointer flex-1">
                                <div className="font-medium">Prédio de Placa (Betão)</div>
                                <div className="text-sm text-muted-foreground">500€/m² base + IVA</div>
                              </Label>
                            </div>
                            <div className="flex items-center space-x-2 p-4 border rounded-lg hover:bg-accent/50 transition-colors">
                              <RadioGroupItem value="wood" id="wood" />
                              <Label htmlFor="wood" className="cursor-pointer flex-1">
                                <div className="font-medium">Tabique/Madeira</div>
                                <div className="text-sm text-muted-foreground">600€/m² base + IVA</div>
                              </Label>
                            </div>
                          </div>
                        </RadioGroup>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        <Label className="text-lg font-medium">Trabalhos no Telhado</Label>
                        <RadioGroup value={houseType} onValueChange={(value) => setHouseType(value as HouseType)}>
                          <div className="space-y-3">
                            <div className="flex items-center space-x-2 p-4 border rounded-lg hover:bg-accent/50 transition-colors">
                              <RadioGroupItem value="no-roof" id="no-roof" />
                              <Label htmlFor="no-roof" className="cursor-pointer flex-1">
                                <div className="font-medium">Sem obras no telhado</div>
                                <div className="text-sm text-muted-foreground">600€/m² base + IVA</div>
                              </Label>
                            </div>
                            <div className="flex items-center space-x-2 p-4 border rounded-lg hover:bg-accent/50 transition-colors">
                              <RadioGroupItem value="with-roof" id="with-roof" />
                              <Label htmlFor="with-roof" className="cursor-pointer flex-1">
                                <div className="font-medium">Com obras no telhado</div>
                                <div className="text-sm text-muted-foreground">800€/m² base + IVA</div>
                              </Label>
                            </div>
                          </div>
                        </RadioGroup>
                      </div>
                    )}

                    {/* Location and Area */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="location" className="text-lg font-medium flex items-center">
                          <MapPin className="h-4 w-4 mr-2" />
                          Localização
                        </Label>
                        <Select value={location} onValueChange={setLocation}>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione a cidade" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="lisboa">Lisboa</SelectItem>
                            <SelectItem value="porto">Porto</SelectItem>
                            <SelectItem value="coimbra">Coimbra</SelectItem>
                            <SelectItem value="braga">Braga</SelectItem>
                            <SelectItem value="aveiro">Aveiro</SelectItem>
                            <SelectItem value="faro">Faro</SelectItem>
                            <SelectItem value="setubal">Setúbal</SelectItem>
                            <SelectItem value="other">Outra cidade</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="area" className="text-lg font-medium">
                          Área a Renovar (m²)
                        </Label>
                        <Input
                          id="area"
                          type="number"
                          placeholder="Ex: 80"
                          value={area}
                          onChange={(e) => setArea(e.target.value)}
                          className="text-lg"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {step === 2 && (
                  <div className="space-y-6">
                    <h3 className="text-xl font-semibold text-center">Âmbito da Renovação</h3>

                    {/* Renovation Scope */}
                    <div className="space-y-4">
                      <Label className="text-lg font-medium flex items-center">
                        <Wrench className="h-4 w-4 mr-2" />
                        Tipo de Renovação
                      </Label>
                      <RadioGroup
                        value={renovationScope}
                        onValueChange={(value) => setRenovationScope(value as RenovationScope)}
                      >
                        <div className="space-y-3">
                          <div className="flex items-center space-x-2 p-4 border rounded-lg hover:bg-accent/50 transition-colors">
                            <RadioGroupItem value="light" id="light" />
                            <Label htmlFor="light" className="cursor-pointer flex-1">
                              <div className="font-medium">Renovação Ligeira</div>
                              <div className="text-sm text-muted-foreground">
                                Pintura, pavimentos, luminárias (-40% do preço base)
                              </div>
                            </Label>
                          </div>
                          <div className="flex items-center space-x-2 p-4 border rounded-lg hover:bg-accent/50 transition-colors">
                            <RadioGroupItem value="medium" id="medium" />
                            <Label htmlFor="medium" className="cursor-pointer flex-1">
                              <div className="font-medium">Renovação Média</div>
                              <div className="text-sm text-muted-foreground">
                                Cozinhas, casas de banho, algumas alterações estruturais (preço base)
                              </div>
                            </Label>
                          </div>
                          <div className="flex items-center space-x-2 p-4 border rounded-lg hover:bg-accent/50 transition-colors">
                            <RadioGroupItem value="full" id="full" />
                            <Label htmlFor="full" className="cursor-pointer flex-1">
                              <div className="font-medium">Renovação Total</div>
                              <div className="text-sm text-muted-foreground">
                                Remodelação completa, alterações estruturais (+40% do preço base)
                              </div>
                            </Label>
                          </div>
                        </div>
                      </RadioGroup>
                    </div>

                    {/* Room Counts */}
                    <div className="space-y-4">
                      <Label className="text-lg font-medium">Divisões a Renovar</Label>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label className="flex items-center text-sm">
                            <Bath className="h-4 w-4 mr-2" />
                            Casas de Banho
                          </Label>
                          <Input
                            type="number"
                            min="0"
                            value={rooms.bathrooms}
                            onChange={(e) =>
                              setRooms((prev) => ({ ...prev, bathrooms: Number.parseInt(e.target.value) || 0 }))
                            }
                          />
                        </div>
                        <div className="space-y-2">
                          <Label className="flex items-center text-sm">
                            <ChefHat className="h-4 w-4 mr-2" />
                            Cozinhas
                          </Label>
                          <Input
                            type="number"
                            min="0"
                            value={rooms.kitchens}
                            onChange={(e) =>
                              setRooms((prev) => ({ ...prev, kitchens: Number.parseInt(e.target.value) || 0 }))
                            }
                          />
                        </div>
                        <div className="space-y-2">
                          <Label className="flex items-center text-sm">
                            <Bed className="h-4 w-4 mr-2" />
                            Quartos
                          </Label>
                          <Input
                            type="number"
                            min="0"
                            value={rooms.bedrooms}
                            onChange={(e) =>
                              setRooms((prev) => ({ ...prev, bedrooms: Number.parseInt(e.target.value) || 0 }))
                            }
                          />
                        </div>
                        <div className="space-y-2">
                          <Label className="flex items-center text-sm">
                            <Sofa className="h-4 w-4 mr-2" />
                            Salas
                          </Label>
                          <Input
                            type="number"
                            min="0"
                            value={rooms.livingSpaces}
                            onChange={(e) =>
                              setRooms((prev) => ({ ...prev, livingSpaces: Number.parseInt(e.target.value) || 0 }))
                            }
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {step === 3 && (
                  <div className="space-y-6">
                    <h3 className="text-xl font-semibold text-center">Estado e Qualidade</h3>

                    {/* Property Condition */}
                    <div className="space-y-4">
                      <Label className="text-lg font-medium">Estado Atual da Propriedade</Label>
                      <RadioGroup
                        value={propertyCondition}
                        onValueChange={(value) => setPropertyCondition(value as PropertyCondition)}
                      >
                        <div className="space-y-3">
                          <div className="flex items-center space-x-2 p-4 border rounded-lg hover:bg-accent/50 transition-colors">
                            <RadioGroupItem value="move-in" id="move-in" />
                            <Label htmlFor="move-in" className="cursor-pointer flex-1">
                              <div className="font-medium">Pronto a Habitar</div>
                              <div className="text-sm text-muted-foreground">
                                Bom estado, poucas reparações necessárias (-20% do preço)
                              </div>
                            </Label>
                          </div>
                          <div className="flex items-center space-x-2 p-4 border rounded-lg hover:bg-accent/50 transition-colors">
                            <RadioGroupItem value="some-repair" id="some-repair" />
                            <Label htmlFor="some-repair" className="cursor-pointer flex-1">
                              <div className="font-medium">Precisa de Algumas Reparações</div>
                              <div className="text-sm text-muted-foreground">
                                Estado normal, algumas reparações necessárias (preço base)
                              </div>
                            </Label>
                          </div>
                          <div className="flex items-center space-x-2 p-4 border rounded-lg hover:bg-accent/50 transition-colors">
                            <RadioGroupItem value="poor" id="poor" />
                            <Label htmlFor="poor" className="cursor-pointer flex-1">
                              <div className="font-medium">Mau Estado</div>
                              <div className="text-sm text-muted-foreground">
                                Problemas estruturais, muitas reparações (+30% do preço)
                              </div>
                            </Label>
                          </div>
                        </div>
                      </RadioGroup>
                    </div>

                    {/* Quality Level */}
                    <div className="space-y-4">
                      <Label className="text-lg font-medium flex items-center">
                        <Star className="h-4 w-4 mr-2" />
                        Nível de Qualidade Desejado
                      </Label>
                      <RadioGroup
                        value={qualityLevel}
                        onValueChange={(value) => setQualityLevel(value as QualityLevel)}
                      >
                        <div className="space-y-3">
                          <div className="flex items-center space-x-2 p-4 border rounded-lg hover:bg-accent/50 transition-colors">
                            <RadioGroupItem value="basic" id="basic" />
                            <Label htmlFor="basic" className="cursor-pointer flex-1">
                              <div className="font-medium">Básico / Arrendamento</div>
                              <div className="text-sm text-muted-foreground">
                                Acabamentos simples, funcional (-30% do preço)
                              </div>
                            </Label>
                          </div>
                          <div className="flex items-center space-x-2 p-4 border rounded-lg hover:bg-accent/50 transition-colors">
                            <RadioGroupItem value="mid-range" id="mid-range" />
                            <Label htmlFor="mid-range" className="cursor-pointer flex-1">
                              <div className="font-medium">Médio / Casa de Família</div>
                              <div className="text-sm text-muted-foreground">
                                Acabamentos de qualidade média (preço base)
                              </div>
                            </Label>
                          </div>
                          <div className="flex items-center space-x-2 p-4 border rounded-lg hover:bg-accent/50 transition-colors">
                            <RadioGroupItem value="luxury" id="luxury" />
                            <Label htmlFor="luxury" className="cursor-pointer flex-1">
                              <div className="font-medium">Luxo / Personalizado</div>
                              <div className="text-sm text-muted-foreground">
                                Acabamentos premium, design personalizado (+50% do preço)
                              </div>
                            </Label>
                          </div>
                        </div>
                      </RadioGroup>
                    </div>
                  </div>
                )}

                {step === 4 && (
                  <div className="space-y-6">
                    <h3 className="text-xl font-semibold text-center">Verificação do Empreiteiro</h3>

                    <div className="space-y-4">
                      <Label className="text-lg font-medium">Nível de Confiança no Empreiteiro</Label>
                      <RadioGroup
                        value={contractorRisk}
                        onValueChange={(value) => setContractorRisk(value as ContractorRisk)}
                      >
                        <div className="space-y-3">
                          <div className="flex items-center space-x-2 p-4 border rounded-lg hover:bg-accent/50 transition-colors">
                            <RadioGroupItem value="verified" id="verified" />
                            <Label htmlFor="verified" className="cursor-pointer flex-1">
                              <div className="font-medium text-green-600">Empreiteiro Verificado</div>
                              <div className="text-sm text-muted-foreground">
                                Certificado, seguros, histórico comprovado (2% risco)
                              </div>
                            </Label>
                          </div>
                          <div className="flex items-center space-x-2 p-4 border rounded-lg hover:bg-accent/50 transition-colors">
                            <RadioGroupItem value="references" id="references" />
                            <Label htmlFor="references" className="cursor-pointer flex-1">
                              <div className="font-medium text-yellow-600">Com Referências</div>
                              <div className="text-sm text-muted-foreground">
                                Tem referências mas não totalmente verificado (8% risco)
                              </div>
                            </Label>
                          </div>
                          <div className="flex items-center space-x-2 p-4 border rounded-lg hover:bg-accent/50 transition-colors">
                            <RadioGroupItem value="unknown" id="unknown" />
                            <Label htmlFor="unknown" className="cursor-pointer flex-1">
                              <div className="font-medium text-red-600">Desconhecido</div>
                              <div className="text-sm text-muted-foreground">
                                Pouca ou nenhuma informação disponível (18% risco)
                              </div>
                            </Label>
                          </div>
                        </div>
                      </RadioGroup>
                    </div>

                    {area && (
                      <div className="p-6 bg-primary/10 rounded-lg">
                        <h4 className="font-semibold mb-3">Pré-visualização do Cálculo</h4>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span>Preço base:</span>
                            <span>{getBasePrice()}€/m²</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Preço ajustado:</span>
                            <span>{results.adjustedPricePerM2}€/m²</span>
                          </div>
                          <div className="flex justify-between font-semibold border-t pt-2">
                            <span>Estimativa total:</span>
                            <span>€{results.totalProject.toLocaleString()}</span>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                <div className="flex justify-between pt-6">
                  <Button
                    variant="outline"
                    onClick={prevStep}
                    disabled={step === 1}
                    className="flex items-center space-x-2 bg-transparent"
                  >
                    <ArrowLeft className="h-4 w-4" />
                    <span>Anterior</span>
                  </Button>
                  <Button
                    onClick={nextStep}
                    disabled={!canProceed()}
                    className="flex items-center space-x-2 bg-gradient-to-r from-primary to-purple-600"
                  >
                    <span>{step === 4 ? "Ver Resultados" : "Próximo"}</span>
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ) : (
            // Results view
            <div className="grid lg:grid-cols-2 gap-8">
              {/* Project Summary */}
              <Card
                className={`border-0 bg-gradient-to-br from-background to-accent/20 dark:from-card dark:to-accent/10 shadow-2xl dark:shadow-primary/5 transition-all duration-700 ${
                  isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"
                }`}
              >
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2 text-2xl">
                    <TrendingUp className="h-6 w-6 text-primary" />
                    <span>Resumo do Projeto</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span>Tipo:</span>
                      <span className="font-medium">
                        {propertyType === "apartment" ? "Apartamento" : "Moradia"} em {location}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Área:</span>
                      <span className="font-medium">{area} m²</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Âmbito:</span>
                      <span className="font-medium">
                        {renovationScope === "light" ? "Ligeira" : renovationScope === "medium" ? "Média" : "Total"}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Qualidade:</span>
                      <span className="font-medium">
                        {qualityLevel === "basic" ? "Básica" : qualityLevel === "mid-range" ? "Média" : "Luxo"}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Divisões:</span>
                      <span className="font-medium">
                        {rooms.bathrooms}WC, {rooms.kitchens}Coz, {rooms.bedrooms}Q, {rooms.livingSpaces}Sala
                      </span>
                    </div>
                  </div>

                  <div className="border-t pt-4 space-y-3">
                    <div className="flex justify-between">
                      <span>Preço base:</span>
                      <span>{getBasePrice()}€/m²</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Preço ajustado:</span>
                      <span>{results.adjustedPricePerM2}€/m²</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Subtotal:</span>
                      <span>€{results.subtotal.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>IVA (23%):</span>
                      <span>€{results.iva.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-lg font-bold border-t pt-3">
                      <span>Total do Projeto:</span>
                      <span className="text-primary">€{results.totalProject.toLocaleString()}</span>
                    </div>
                  </div>

                  <div className="space-y-4 pt-4 border-t">
                    <Label className="text-lg font-medium">Receber Relatório Detalhado</Label>
                    <div className="flex space-x-3">
                      <Input
                        type="email"
                        placeholder="o.seu@email.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="flex-1"
                      />
                      <Button
                        onClick={handleGetReport}
                        disabled={!email}
                        className="bg-gradient-to-r from-primary to-purple-600"
                      >
                        Enviar
                      </Button>
                    </div>
                  </div>

                  <Button variant="outline" onClick={resetCalculator} className="w-full bg-transparent">
                    Nova Simulação
                  </Button>
                </CardContent>
              </Card>

              {/* Risk Analysis */}
              <Card
                className={`border-0 bg-gradient-to-br from-background to-accent/20 dark:from-card dark:to-accent/10 shadow-2xl dark:shadow-primary/5 transition-all duration-700 ${
                  isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"
                }`}
              >
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2 text-2xl">
                    <Shield className="h-6 w-6 text-green-500" />
                    <span>Análise de Proteção</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="text-center p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
                    <div className="flex items-center justify-center mb-2">
                      <AlertTriangle className="h-8 w-8 text-yellow-500" />
                      <RiskTooltip
                        title="Risco de Problemas"
                        content="Probabilidade estatística de problemas baseada no tipo de empreiteiro e complexidade do projeto. Inclui abandono, trabalho mal feito, atrasos significativos, ou materiais em falta."
                      />
                    </div>
                    <div className="text-2xl font-bold text-yellow-600">{results.riskPercentage}%</div>
                    <div className="text-xs text-muted-foreground mt-1">Baseado na verificação do empreiteiro</div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
                      <div className="flex items-center justify-center mb-1">
                        <span className="text-sm text-red-600/80">Perda Potencial</span>
                        <RiskTooltip
                          title="Perda Financeira Potencial"
                          content="Valor estimado que pode perder devido a: trabalho mal executado que precisa ser refeito, abandono do projeto pelo empreiteiro, materiais pagos mas não utilizados, custos legais para resolver disputas, ou atrasos que geram custos adicionais."
                        />
                      </div>
                      <div className="text-xl font-bold text-red-500">€{results.potentialLoss.toLocaleString()}</div>
                    </div>

                    <div className="text-center p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                      <div className="flex items-center justify-center mb-1">
                        <span className="text-sm text-blue-600/80">Taxa EscrowReno</span>
                        <RiskTooltip
                          title="Custo do Serviço de Proteção"
                          content="Taxa de 2.5% do valor total do projeto que cobre: verificação de marcos, inspeções independentes, mediação de disputas, seguro de proteção, e gestão segura dos pagamentos através do sistema bancário português."
                        />
                      </div>
                      <div className="text-xl font-bold text-blue-500">€{results.escrowFee.toLocaleString()}</div>
                    </div>
                  </div>

                  <div className="text-center p-6 bg-green-500/10 border border-green-500/20 rounded-lg animate-pulse-glow">
                    <div className="flex items-center justify-center mb-3">
                      <Sparkles className="h-10 w-10 text-green-500" />
                      <RiskTooltip
                        title="Valor da Proteção"
                        content="Diferença entre o risco financeiro potencial e o custo do nosso serviço. Este valor representa quanto pode poupar ao usar a EscrowReno em vez de fazer pagamentos diretos sem proteção."
                      />
                    </div>
                    <div className="text-sm text-green-600/80 mb-1">Valor da Proteção</div>
                    <div className="text-3xl font-bold text-green-500">€{results.netSavings.toLocaleString()}</div>
                    <div className="text-sm text-green-600/80 mt-2">
                      {results.netSavings > 0 ? "Proteção vantajosa" : "Risco baixo detectado"}
                    </div>
                  </div>

                  <div className="text-center text-xs text-muted-foreground pt-4 border-t">
                    * Baseado em dados do setor de construção português, histórico de problemas por tipo de empreiteiro,
                    e análise de risco por complexidade de projeto
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
