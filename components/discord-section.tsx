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
    <Card className="bg-zinc-800/70 border-green-500/20 hover:border-green-500/50 transition-all duration-300 overflow-hidden group cursor-pointer hover:shadow-lg hover:shadow-green-500/10 rounded-none !py-0">
      <Link href="https://discord.gg/XuwYANGx7J" target="_blank">
        {/* Image */}
        <div className="relative h-48 bg-zinc-900/70 overflow-hidden">
          <ImagePlaceholder 
            text="Join our Discord community"
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
              <MessageCircle className="h-3 w-3 mr-1" />
              COMMUNITY
            </Badge>
          </div>
        </div>

        <CardHeader className="p-4">
          <div className="flex items-start justify-between mb-2">
            <CardTitle className="text-lg font-mono text-green-400 group-hover:text-green-300 transition-colors">
              {t.hero.discord.title.toUpperCase()}
            </CardTitle>
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                className="h-6 w-6 p-0 text-zinc-400 hover:text-green-400 rounded-none bg-transparent"
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
              className="border-green-500/30 text-green-400 text-xs font-mono rounded-none bg-transparent"
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