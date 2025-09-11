import Link from "next/link"
import Image from "next/image"
import { Star, GitFork, Users, GitCommit, CircleDot, MessageCircle, Database, Tags } from "lucide-react"
import { translations, Locale } from "@/lib/translations"
import { Button } from "@/components/ui/button"
import { hardwareTestData, categories } from "@/lib/hardware-data"

const DiscordIcon = ({ className }: { className?: string }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="24" 
    height="24" 
    viewBox="0 0 24 24" 
    fill="currentColor"
    className={className}
  >
    <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515a.074.074 0 0 0-.079.037c-.211.375-.445.864-.608 1.25a18.27 18.27 0 0 0-5.487 0a12.64 12.64 0 0 0-.617-1.25a.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057a19.9 19.9 0 0 0 5.993 3.03a.078.078 0 0 0 .084-.028a14.09 14.09 0 0 0 1.226-1.994a.076.076 0 0 0-.041-.106a13.107 13.107 0 0 1-1.872-.892a.077.077 0 0 1-.008-.128a10.2 10.2 0 0 0 .372-.292a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.196.373.292a.077.077 0 0 1-.006.127a12.299 12.299 0 0 1-1.873.892a.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028a19.839 19.839 0 0 0 6.002-3.03a.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.956-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.955-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.946 2.418-2.157 2.418Z"/>
  </svg>
)

interface HeroSectionProps {
  lang: Locale
  repoLastCommit?: string
  repoStars?: number
  repoContributors?: number
}

export function HeroSection({ lang, repoLastCommit, repoStars, repoContributors }: HeroSectionProps) {
  const t = translations[lang] || translations['en']  // Fallback to English
  
  // Get actual relative time from GitHub API
  const getRelativeTime = () => {
    if (!repoLastCommit) {
      // Fallback if no commit data
      return '7d'
    }
    
    const now = new Date()
    const lastUpdate = new Date(repoLastCommit)
    const diffTime = now.getTime() - lastUpdate.getTime()
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24))
    
    if (diffDays < 1) return 'today'
    if (diffDays === 1) return '1d'
    if (diffDays < 7) return `${diffDays}d`
    if (diffDays < 30) return `${Math.floor(diffDays / 7)}w`
    return `${Math.floor(diffDays / 30)}m`
  }
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

          <div className="flex gap-4 mb-8 max-w-3xl">
            <div className="bg-zinc-800/70 border border-green-500/20 rounded-none p-3 font-mono flex-1">
              <div className="flex items-center gap-1 text-green-400 text-xs mb-1">
                <Database className="h-3 w-3" />
                {t.hero.stats.resources}
              </div>
              <div className="text-white font-bold">{hardwareTestData.length}</div>
            </div>
            <div className="bg-zinc-800/70 border border-green-500/20 rounded-none p-3 font-mono flex-1">
              <div className="flex items-center gap-1 text-green-400 text-xs mb-1">
                <Tags className="h-3 w-3" />
                {t.hero.stats.categories}
              </div>
              <div className="text-white font-bold">{categories.length}</div>
            </div>
            <div className="bg-zinc-800/70 border border-green-500/20 rounded-none p-3 font-mono flex-1">
              <div className="flex items-center gap-1 text-green-400 text-xs mb-1">
                <GitCommit className="h-3 w-3" />
                {t.hero.stats.lastUpdate}
              </div>
              <div className="text-white font-bold">{getRelativeTime()} ago</div>
            </div>
            <Link 
              href="https://discord.gg/XuwYANGx7J" 
              target="_blank"
              className="bg-zinc-800/70 border border-violet-500/20 rounded-none p-3 font-mono hover:border-violet-500/50 hover:bg-violet-900/20 transition-colors block flex-1"
            >
              <div className="flex items-center gap-1 text-violet-400 text-xs mb-1">
                <DiscordIcon className="h-3 w-3" />
                {t.hero.stats.discordUsers}
              </div>
              <div className="text-white font-bold">100+</div>
            </Link>
            {/* Commented out for now but fetching real data */}
            {/* <div className="bg-zinc-800/70 border border-green-500/20 rounded-none p-3 font-mono">
              <div className="flex items-center gap-1 text-green-400 text-xs mb-1">
                <Star className="h-3 w-3" />
                {t.hero.stats.stars}
              </div>
              <div className="text-white font-bold">{repoStars || '0'}</div>
            </div>
            <div className="bg-zinc-800/70 border border-green-500/20 rounded-none p-3 font-mono">
              <div className="flex items-center gap-1 text-green-400 text-xs mb-1">
                <Users className="h-3 w-3" />
                {t.hero.stats.contributors}
              </div>
              <div className="text-white font-bold">{repoContributors || '0'}</div>
            </div> */}
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
