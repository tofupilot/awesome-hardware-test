"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Mail, CheckCircle } from "lucide-react"

export function NewsletterSection() {
  const [email, setEmail] = useState("")
  const [isSubscribed, setIsSubscribed] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return

    setIsLoading(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setIsSubscribed(true)
    setIsLoading(false)
    setEmail("")
  }

  if (isSubscribed) {
    return (
      <Card className="bg-zinc-800/70 border-green-500/20 rounded-none">
        <CardContent className="p-6 text-center">
          <CheckCircle className="h-12 w-12 text-green-400 mx-auto mb-4" />
          <h3 className="text-lg font-mono text-green-400 mb-2">[SUBSCRIPTION_CONFIRMED]</h3>
          <p className="text-zinc-400 font-mono text-sm">
            You'll receive updates about new hardware testing tools and frameworks.
          </p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="bg-zinc-800/70 border-green-500/20 rounded-none">
      <CardHeader>
        <CardTitle className="font-mono text-green-400 flex items-center">
          <Mail className="h-5 w-5 mr-2" />
          [NEWSLETTER_SUBSCRIPTION]
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-zinc-400 font-mono text-sm mb-4">
          Stay updated with the latest hardware testing tools, frameworks, and industry insights.
        </p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            type="email"
            placeholder="ENTER_EMAIL_ADDRESS..."
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-zinc-900/70 border-green-500/30 text-zinc-100 placeholder-zinc-500 font-mono focus:border-green-500 focus:ring-green-500/20 rounded-none"
            required
          />
          <Button
            type="submit"
            disabled={isLoading}
            className="w-full bg-green-600 hover:bg-green-700 text-white font-mono rounded-none"
          >
            {isLoading ? "[SUBSCRIBING...]" : "[SUBSCRIBE]"}
          </Button>
        </form>
        <p className="text-xs text-zinc-500 font-mono mt-3">No spam. Unsubscribe anytime. Updates sent monthly.</p>
      </CardContent>
    </Card>
  )
}
