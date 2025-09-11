"use client"

import { useState, useRef, useEffect } from "react"
import { useRouter, usePathname } from "next/navigation"
import { Earth, ChevronDown } from "lucide-react"
import { translations, Locale } from "@/lib/translations"

interface LanguageDropdownProps {
  lang: Locale
}

export function LanguageDropdown({ lang }: LanguageDropdownProps) {
  const t = translations[lang] || translations['en']
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const router = useRouter()
  const pathname = usePathname()
  
  const getLanguagesCount = () => {
    return Object.keys(translations).length
  }

  const handleLanguageChange = (newLang: Locale) => {
    const currentPath = pathname.replace(`/${lang}`, `/${newLang}`)
    router.push(currentPath)
    setIsOpen(false)
  }

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <div className="flex-1" ref={dropdownRef}>
      <div 
        className="bg-zinc-800/70 border border-green-500/20 rounded-none p-3 font-mono cursor-pointer hover:border-green-500/40 transition-colors relative"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex items-center gap-1 text-green-400 text-xs mb-1">
          <Earth className="h-3 w-3" />
          {t.hero.stats.languages}
          <ChevronDown className={`h-3 w-3 ml-auto transition-transform ${isOpen ? 'rotate-180' : ''}`} />
        </div>
        <div className="text-white font-bold">{getLanguagesCount()}</div>
      </div>
      
      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-zinc-800 border border-green-500/20 rounded-none z-[9999] shadow-lg">
          <button
            className={`w-full text-left p-3 font-mono text-sm hover:bg-green-500/10 transition-colors ${lang === 'en' ? 'text-green-400' : 'text-zinc-300'}`}
            onClick={() => handleLanguageChange('en')}
          >
            🇺🇸 English
          </button>
          <button
            className={`w-full text-left p-3 font-mono text-sm hover:bg-green-500/10 transition-colors border-t border-green-500/10 ${lang === 'fr' ? 'text-green-400' : 'text-zinc-300'}`}
            onClick={() => handleLanguageChange('fr')}
          >
            🇫🇷 Français
          </button>
        </div>
      )}
    </div>
  )
}