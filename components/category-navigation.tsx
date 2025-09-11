"use client"

import { useState, useRef, useEffect } from "react"
import { Cpu, Zap, Database, Cable, Map, HardDrive, TestTube, Package, BookOpen, Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { translations, Locale } from "@/lib/translations"

const iconMap = {
  Zap,
  Database,
  Cable,
  Map,
  HardDrive,
  TestTube,
  Package,
  BookOpen,
}

interface CategoryNavigationProps {
  categories: string[]
  categoryIcons: Record<string, string>
  activeCategory: string
  onCategoryChange: (category: string) => void
  getCategoryCount: (category: string) => number
  searchTerm: string
  onSearchChange: (term: string) => void
  lang: Locale
}

export function CategoryNavigation({
  categories,
  categoryIcons,
  activeCategory,
  onCategoryChange,
  getCategoryCount,
  searchTerm,
  onSearchChange,
  lang,
}: CategoryNavigationProps) {
  const t = translations[lang]
  const scrollRef = useRef<HTMLDivElement>(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(false)

  const checkScrollability = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current
      setCanScrollLeft(scrollLeft > 0)
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth)
    }
  }

  useEffect(() => {
    // Initial check after a small delay to ensure DOM is ready
    const timer = setTimeout(() => {
      checkScrollability()
    }, 0)
    
    // Check again after categories might have rendered
    const timer2 = setTimeout(() => {
      checkScrollability()
    }, 100)
    
    const handleResize = () => checkScrollability()
    window.addEventListener('resize', handleResize)
    
    return () => {
      clearTimeout(timer)
      clearTimeout(timer2)
      window.removeEventListener('resize', handleResize)
    }
  }, [categories])
  return (
    <nav className="border-b border-green-500/20 bg-zinc-900/98 relative z-10">
      <div className="container mx-auto px-4">
        <div className="flex items-center gap-4 py-4">
          {/* Search Bar */}
          <div className="relative min-w-[250px] flex-shrink-0">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-green-500" />
            <Input
              placeholder="SEARCH..."
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              className="pl-10 bg-zinc-800/70 border-green-500/30 text-zinc-100 placeholder-zinc-500 font-mono focus:border-green-500 focus:ring-green-500/20 rounded-none"
            />
          </div>
          {/* Category Buttons with horizontal scroll */}
          <div className="relative flex-1 min-w-0">
            <div 
              ref={scrollRef}
              onScroll={checkScrollability}
              className="flex space-x-1 overflow-x-auto overflow-y-hidden scrollbar-hide"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
          <button
            onClick={() => onCategoryChange("All")}
            className={`cursor-pointer px-4 py-2 rounded-none text-sm font-mono font-medium whitespace-nowrap transition-all duration-300 flex items-center ${
              activeCategory === "All"
                ? "bg-green-500/20 text-green-400 border border-green-500/50 shadow-lg shadow-green-500/20"
                : "text-zinc-400 hover:text-green-400 hover:bg-green-500/10 border border-transparent"
            }`}
          >
            <Cpu className="h-4 w-4 mr-2" />
            {t.navigation.allResources}
            <span className="ml-2 text-xs opacity-75 bg-green-500/20 px-1 rounded-none">{getCategoryCount("All")}</span>
          </button>
          {categories.map((category) => {
            const iconName = categoryIcons[category] as keyof typeof iconMap
            const Icon = iconMap[iconName] || Zap
            const shortName = category
              .replace("Test ", "")
              .replace("Hardware ", "HW_")
              .replace("& ", "")
              .replace(" ", "_")
              .toUpperCase()
            return (
              <button
                key={category}
                onClick={() => onCategoryChange(category)}
                className={`cursor-pointer px-4 py-2 rounded-none text-sm font-mono font-medium whitespace-nowrap transition-all duration-300 flex items-center ${
                  activeCategory === category
                    ? "bg-green-500/20 text-green-400 border border-green-500/50 shadow-lg shadow-green-500/20"
                    : "text-zinc-400 hover:text-green-400 hover:bg-green-500/10 border border-transparent"
                }`}
              >
                <Icon className="h-4 w-4 mr-2" />
                {shortName}
                <span className="ml-2 text-xs opacity-75 bg-green-500/20 px-1 rounded-none">
                  {getCategoryCount(category)}
                </span>
              </button>
            )
          })}
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}
