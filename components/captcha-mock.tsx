"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { RefreshCw, Shield } from "lucide-react"

interface CaptchaMockProps {
  onVerify: (success: boolean) => void
  isLoading?: boolean
}

export function CaptchaMock({ onVerify, isLoading = false }: CaptchaMockProps) {
  const [challenge, setChallenge] = useState("")
  const [userAnswer, setUserAnswer] = useState("")
  const [isVerified, setIsVerified] = useState(false)

  const generateChallenge = () => {
    const num1 = Math.floor(Math.random() * 10) + 1
    const num2 = Math.floor(Math.random() * 10) + 1
    const operators = ["+", "-", "×"]
    const operator = operators[Math.floor(Math.random() * operators.length)]

    let answer: number
    let challengeText: string

    switch (operator) {
      case "+":
        answer = num1 + num2
        challengeText = `${num1} + ${num2}`
        break
      case "-":
        answer = Math.max(num1, num2) - Math.min(num1, num2)
        challengeText = `${Math.max(num1, num2)} - ${Math.min(num1, num2)}`
        break
      case "×":
        answer = num1 * num2
        challengeText = `${num1} × ${num2}`
        break
      default:
        answer = num1 + num2
        challengeText = `${num1} + ${num2}`
    }

    setChallenge(challengeText)
    return answer
  }

  const [correctAnswer, setCorrectAnswer] = useState(() => generateChallenge())

  const handleRefresh = () => {
    setCorrectAnswer(generateChallenge())
    setUserAnswer("")
    setIsVerified(false)
  }

  const handleVerify = () => {
    const isCorrect = Number.parseInt(userAnswer) === correctAnswer
    setIsVerified(isCorrect)
    onVerify(isCorrect)
  }

  useEffect(() => {
    setCorrectAnswer(generateChallenge())
  }, [])

  if (isVerified) {
    return (
      <Card className="border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-950">
        <CardContent className="p-4">
          <div className="flex items-center space-x-2 text-green-600 dark:text-green-400">
            <Shield className="h-5 w-5" />
            <span className="font-medium">Verificação humana concluída</span>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="border-border">
      <CardContent className="p-4">
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <Shield className="h-5 w-5 text-primary" />
            <span className="font-medium">Verificação Anti-Spam</span>
          </div>

          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <span className="text-lg font-mono bg-muted px-3 py-2 rounded">{challenge} = ?</span>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleRefresh}
                className="h-8 w-8 p-0"
                aria-label="Gerar novo desafio"
              >
                <RefreshCw className="h-4 w-4" />
              </Button>
            </div>

            <input
              type="number"
              value={userAnswer}
              onChange={(e) => setUserAnswer(e.target.value)}
              className="w-20 px-3 py-2 border rounded-md text-center"
              placeholder="?"
              disabled={isLoading}
            />

            <Button onClick={handleVerify} disabled={!userAnswer || isLoading} size="sm">
              Verificar
            </Button>
          </div>

          <p className="text-xs text-muted-foreground">Resolva a operação matemática para provar que é humano</p>
        </div>
      </CardContent>
    </Card>
  )
}
