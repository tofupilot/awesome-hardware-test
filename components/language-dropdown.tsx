"use client"

import { useState, useEffect } from "react"
import { useRouter, usePathname } from "next/navigation"
import { Earth, X } from "lucide-react"
import { translations, Locale } from "@/lib/translations"

interface LanguageDropdownProps {
  lang: Locale
}

export function LanguageDropdown({ lang }: LanguageDropdownProps) {
  const t = translations[lang] || translations['en']
  const [isModalOpen, setIsModalOpen] = useState(false)
  const router = useRouter()
  const pathname = usePathname()
  
  const getLanguagesCount = () => {
    return Object.keys(translations).length
  }

  const handleLanguageChange = (newLang: Locale) => {
    const currentPath = pathname.replace(`/${lang}`, `/${newLang}`)
    router.push(currentPath)
    setIsModalOpen(false)
  }

  // Close modal on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsModalOpen(false)
      }
    }
    
    if (isModalOpen) {
      document.addEventListener('keydown', handleEscape)
      document.body.style.overflow = 'hidden'
    }
    
    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = 'unset'
    }
  }, [isModalOpen])

  return (
    <>
      <div className="w-48 flex-shrink-0">
        <div 
          className="bg-zinc-800/70 border border-green-500/20 rounded-none p-3 font-mono cursor-pointer hover:border-green-500/40 transition-colors w-full"
          onClick={() => setIsModalOpen(true)}
        >
          <div className="flex items-center gap-1 text-green-400 text-xs mb-1">
            <Earth className="h-3 w-3" />
            {t.hero.stats.languages}
          </div>
          <div className="text-white font-bold">{getLanguagesCount()}</div>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setIsModalOpen(false)}
          />
          
          {/* Modal Content */}
          <div className="relative bg-zinc-800 border border-green-500/20 rounded-none shadow-2xl max-w-sm w-full mx-4">
            <div className="flex items-center justify-between p-4 border-b border-green-500/20">
              <h3 className="text-green-400 font-mono text-sm">{t.hero.stats.languages}</h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-zinc-400 hover:text-green-400 transition-colors"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            
            <div className="p-4">
              <div className="space-y-2">
                <button
                  className={`w-full text-left p-3 font-mono text-sm rounded-none border transition-all ${
                    lang === 'en' 
                      ? 'bg-green-500/10 border-green-500/30 text-green-400' 
                      : 'bg-zinc-700/50 border-zinc-600/30 text-zinc-300 hover:bg-green-500/5 hover:border-green-500/20'
                  }`}
                  onClick={() => handleLanguageChange('en')}
                >
                  🇺🇸 English
                </button>
                <button
                  className={`w-full text-left p-3 font-mono text-sm rounded-none border transition-all ${
                    lang === 'fr' 
                      ? 'bg-green-500/10 border-green-500/30 text-green-400' 
                      : 'bg-zinc-700/50 border-zinc-600/30 text-zinc-300 hover:bg-green-500/5 hover:border-green-500/20'
                  }`}
                  onClick={() => handleLanguageChange('fr')}
                >
                  🇫🇷 Français
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}