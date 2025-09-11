"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MessageCircle, ExternalLink } from "lucide-react"
import { translations, Locale } from "@/lib/translations"
import { ImagePlaceholder } from "@/components/image-placeholder"

interface DiscordSectionProps {
  lang: Locale
}

export function DiscordSection({ lang }: DiscordSectionProps) {
  const t = translations[lang] || translations['en']  // Fallback to English

  return (
    <Card className="bg-zinc-800/70 border-violet-500/20 hover:border-violet-500/50 transition-all duration-300 overflow-hidden group cursor-pointer hover:shadow-lg hover:shadow-violet-500/10 rounded-none">
      <Link href="https://discord.gg/XuwYANGx7J" target="_blank">
        <CardHeader className="p-4">
          <div className="flex items-start justify-between mb-2">
            <CardTitle className="text-lg font-mono text-violet-400 group-hover:text-violet-300 transition-colors">
              {t.hero.discord.title.toUpperCase()}
            </CardTitle>
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                className="h-6 w-6 p-0 text-zinc-400 hover:text-violet-400 rounded-none bg-transparent"
                onClick={(e) => {
                  e.preventDefault();
                  window.open("https://discord.gg/XuwYANGx7J", "_blank");
                }}
              >
                <ExternalLink className="h-3 w-3" />
              </Button>
            </div>
          </div>
          <div className="flex gap-2 mb-3 flex-wrap">
            <Badge
              variant="outline"
              className="border-violet-500/30 text-violet-400 text-xs font-mono rounded-none bg-transparent"
            >
              CHAT
            </Badge>
            <Badge
              variant="secondary"
              className="bg-zinc-700/70 text-zinc-300 text-xs font-mono rounded-none"
            >
              COMMUNITY
            </Badge>
          </div>
          <CardDescription className="text-zinc-400 text-sm leading-relaxed line-clamp-3 font-mono">
            {t.hero.discord.description}
          </CardDescription>
        </CardHeader>
      </Link>
    </Card>
  )
}