"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Mail, CheckCircle, ExternalLink } from "lucide-react"
import { translations, Locale } from "@/lib/translations"
import { ImagePlaceholder } from "@/components/image-placeholder"

interface NewsletterSectionProps {
  lang: Locale
}

export function NewsletterSection({ lang }: NewsletterSectionProps) {
  const t = translations[lang] || translations['en']  // Fallback to English
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
      <Card className="bg-zinc-800/70 border-green-500/20 hover:border-green-500/50 transition-all duration-300 overflow-hidden group rounded-none !py-0">
        <div className="relative h-48 bg-zinc-900/70 overflow-hidden flex items-center justify-center">
          <CheckCircle className="h-16 w-16 text-green-400" />
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-900/90 via-transparent to-transparent" />
        </div>
        <CardHeader className="p-4">
          <CardTitle className="text-lg font-mono text-green-400 text-center">
            {t.newsletter.confirmed.toUpperCase()}
          </CardTitle>
          <CardDescription className="text-zinc-400 text-sm leading-relaxed text-center font-mono">
            {t.newsletter.confirmedText}
          </CardDescription>
        </CardHeader>
      </Card>
    )
  }

  return (
    <Card className="bg-zinc-800/70 border-green-500/20 hover:border-green-500/50 transition-all duration-300 overflow-hidden group cursor-pointer hover:shadow-lg hover:shadow-green-500/10 rounded-none !py-0">
      <div onClick={(e) => e.preventDefault()}>
        {/* Image */}
        <div className="relative h-48 bg-zinc-900/70 overflow-hidden">
          <ImagePlaceholder 
            text="Stay updated with latest tools"
            className="group-hover:scale-105 transition-transform duration-500"
          />
          {/* Hardware overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-900/90 via-transparent to-transparent" />

          {/* Overlay badges */}
          <div className="absolute top-3 right-3 flex gap-2">
            <Badge
              variant="secondary"
              className="bg-zinc-900/90 text-green-400 text-xs font-mono rounded-none"
            >
              <Mail className="h-3 w-3 mr-1" />
              NEWSLETTER
            </Badge>
          </div>
        </div>

        <CardHeader className="p-4">
          <div className="flex items-start justify-between mb-2">
            <CardTitle className="text-lg font-mono text-green-400 group-hover:text-green-300 transition-colors">
              {t.newsletter.title.toUpperCase()}
            </CardTitle>
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                className="h-6 w-6 p-0 text-zinc-400 hover:text-green-400 rounded-none bg-transparent"
                onClick={(e) => {
                  e.preventDefault();
                  // Focus on email input when external link button is clicked
                  const emailInput = document.querySelector('input[type="email"]') as HTMLInputElement;
                  if (emailInput) emailInput.focus();
                }}
              >
                <ExternalLink className="h-3 w-3" />
              </Button>
            </div>
          </div>
          <div className="flex gap-2 mb-3 flex-wrap">
            <Badge
              variant="outline"
              className="border-green-500/30 text-green-400 text-xs font-mono rounded-none bg-transparent"
            >
              EMAIL
            </Badge>
            <Badge
              variant="secondary"
              className="bg-zinc-700/70 text-zinc-300 text-xs font-mono rounded-none"
            >
              UPDATES
            </Badge>
          </div>
          <CardDescription className="text-zinc-400 text-sm leading-relaxed line-clamp-3 font-mono mb-4">
            {t.newsletter.description}
          </CardDescription>
          
          <form onSubmit={handleSubmit} className="space-y-3" suppressHydrationWarning={true}>
            <Input
              type="email"
              placeholder={t.newsletter.placeholder}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-zinc-900/70 border-green-500/30 text-zinc-100 placeholder-zinc-500 font-mono focus:border-green-500 focus:ring-green-500/20 rounded-none text-xs"
              required
            />
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-green-600 hover:bg-green-700 text-white font-mono rounded-none text-xs h-8"
            >
              {isLoading ? t.newsletter.subscribing : t.newsletter.subscribe}
            </Button>
          </form>
        </CardHeader>
      </div>
    </Card>
  )
}
