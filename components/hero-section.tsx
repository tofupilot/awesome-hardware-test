import Link from "next/link"
import Image from "next/image"
import { Star, GitFork, Users, GitCommit, CircleDot, MessageCircle } from "lucide-react"
import { translations, Locale } from "@/lib/translations"
import { Button } from "@/components/ui/button"

interface HeroSectionProps {
  lang: Locale
}

export function HeroSection({ lang }: HeroSectionProps) {
  const t = translations[lang] || translations['en']  // Fallback to English
  return (
    <section className="bg-gradient-to-r from-zinc-900 via-zinc-800 to-zinc-900 border-b border-green-500/20 relative">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl relative z-10">
          <div className="flex items-center mb-6">
            <div className="relative mr-4 flex-shrink-0 p-1 border border-green-500/20">
              <Image 
                src="/logo.png" 
                alt="Logo" 
                width={48} 
                height={48}
                className="h-12 w-12"
              />
            </div>
            <div className="flex items-center">
              <h1 className="text-4xl font-bold font-mono">
                <span className="text-green-400">{t.hero.title.awesome}</span>
                <span className="text-white mx-2">{t.hero.title.hardware}</span>
                <span className="text-green-400">{t.hero.title.test}</span>
              </h1>
            </div>
          </div>

          <p className="text-lg text-zinc-300 mb-6 leading-relaxed">
            {t.hero.subtitle}
          </p>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-sm mb-8">
            <div className="bg-zinc-800/70 border border-green-500/20 rounded-none p-3 font-mono">
              <div className="flex items-center gap-1 text-green-400 text-xs mb-1">
                <Star className="h-3 w-3" />
                {t.hero.stats.stars}
              </div>
              <div className="text-white font-bold">1.2K</div>
            </div>
            <div className="bg-zinc-800/70 border border-green-500/20 rounded-none p-3 font-mono">
              <div className="flex items-center gap-1 text-green-400 text-xs mb-1">
                <Users className="h-3 w-3" />
                {t.hero.stats.contributors}
              </div>
              <div className="text-white font-bold">42</div>
            </div>
            <div className="bg-zinc-800/70 border border-green-500/20 rounded-none p-3 font-mono">
              <div className="flex items-center gap-1 text-green-400 text-xs mb-1">
                <GitCommit className="h-3 w-3" />
                {t.hero.stats.commits}
              </div>
              <div className="text-white font-bold">350+</div>
            </div>
            <div className="bg-zinc-800/70 border border-green-500/20 rounded-none p-3 font-mono">
              <div className="flex items-center gap-1 text-green-400 text-xs mb-1">
                <GitFork className="h-3 w-3" />
                {t.hero.stats.forks}
              </div>
              <div className="text-white font-bold">89</div>
            </div>
            <div className="bg-zinc-800/70 border border-green-500/20 rounded-none p-3 font-mono">
              <div className="flex items-center gap-1 text-green-400 text-xs mb-1">
                <CircleDot className="h-3 w-3" />
                {t.hero.stats.issues}
              </div>
              <div className="text-green-400 font-bold">5 {t.hero.stats.open}</div>
            </div>
          </div>


          <p className="text-sm text-zinc-500 font-mono">
            [{t.hero.credits.createdBy}:{" "}
            <Link href="https://tofupilot.com" className="text-green-400 hover:underline" target="_blank">
              TOFUPILOT
            </Link>
            ] [{t.hero.credits.inspiredBy}:{" "}
            <Link href="https://github.com/sschaetz" className="text-green-400 hover:underline" target="_blank">
              SSCHAETZ
            </Link>
            ]
          </p>
        </div>
      </div>
    </section>
  )
}
