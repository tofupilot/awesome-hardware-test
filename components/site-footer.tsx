import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Github, Plus, Languages } from "lucide-react"
import { translations, Locale } from "@/lib/translations"

interface SiteFooterProps {
  lang: Locale
}

export function SiteFooter({ lang }: SiteFooterProps) {
  const t = translations[lang]
  
  if (!t) {
    console.error('Translation not found for language:', lang)
    return null
  }
  
  return (
    <footer className="mt-16 pt-8 border-t border-green-500/20">
      {/* Footer Info */}
      <div className="flex flex-col sm:flex-row justify-between items-center text-sm text-zinc-500 font-mono">
        <div className="flex items-center space-x-4">
          <Button
            variant="outline"
            size="sm"
            className="border-green-500/50 hover:bg-green-500/10 text-green-400 hover:text-green-300 font-mono rounded-none h-8 bg-transparent"
            asChild
          >
            <Link href={lang === 'en' ? '/fr' : '/en'}>
              <Languages className="h-4 w-4 mr-2" />
              {lang === 'en' ? 'FR' : 'EN'}
            </Link>
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="border-green-500/50 hover:bg-green-500/10 text-green-400 hover:text-green-300 font-mono rounded-none h-8 bg-transparent"
            asChild
          >
            <Link href="https://github.com/sschaetz/awesome-hardware-test/issues/new" target="_blank">
              <Plus className="h-4 w-4 mr-2" />
              {t.navigation.contribute}
            </Link>
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="border-green-500/50 hover:bg-green-500/10 text-green-400 hover:text-green-300 font-mono rounded-none h-8 bg-transparent"
            asChild
          >
            <Link href="https://github.com/sschaetz/awesome-hardware-test" target="_blank">
              <Github className="h-4 w-4 mr-2" />
              {t.navigation.github}
            </Link>
          </Button>
        </div>
        <div className="flex space-x-4 mt-2 sm:mt-0">
          <Link
            href="https://github.com/sschaetz/awesome-hardware-test/blob/main/LICENSE"
            className="hover:text-green-400"
            target="_blank"
          >
            [{t.footer.license}]
          </Link>
          <Link
            href="https://github.com/sschaetz/awesome-hardware-test/issues"
            className="hover:text-green-400"
            target="_blank"
          >
            [{t.footer.issues}]
          </Link>
          <Link
            href="https://github.com/sschaetz/awesome-hardware-test/pulls"
            className="hover:text-green-400"
            target="_blank"
          >
            [{t.footer.pullRequests}]
          </Link>
        </div>
      </div>
    </footer>
  )
}
