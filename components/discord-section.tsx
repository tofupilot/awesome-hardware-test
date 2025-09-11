"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MessageCircle } from "lucide-react"
import { translations, Locale } from "@/lib/translations"

interface DiscordSectionProps {
  lang: Locale
}

export function DiscordSection({ lang }: DiscordSectionProps) {
  const t = translations[lang] || translations['en']  // Fallback to English

  return (
    <Card className="bg-zinc-800/70 border-green-500/20 rounded-none">
      <CardHeader>
        <CardTitle className="font-mono text-green-400 flex items-center">
          <MessageCircle className="h-5 w-5 mr-2" />
          {t.hero.discord.title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-zinc-400 font-mono text-sm mb-4">
          {t.hero.discord.description}
        </p>
        <Button
          asChild
          className="w-full bg-green-600 hover:bg-green-700 text-white font-mono rounded-none"
        >
          <Link href="https://discord.gg/XuwYANGx7J" target="_blank" className="flex items-center gap-2 justify-center">
            <MessageCircle className="h-4 w-4" />
            {t.hero.discord.button}
          </Link>
        </Button>
        <p className="text-xs text-zinc-500 font-mono mt-3">Join hardware testing discussions and get support</p>
      </CardContent>
    </Card>
  )
}