import Link from "next/link"
import { Cpu, Zap, Database, Cable, Map, HardDrive, TestTube, Package, BookOpen } from "lucide-react"
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

interface CategoryNavigationServerProps {
  categories: string[]
  categoryIcons: Record<string, string>
  activeCategory: string
  getCategoryCount: (category: string) => number
  lang: Locale
  currentSearch: string
}

export function CategoryNavigationServer({
  categories,
  categoryIcons,
  activeCategory,
  getCategoryCount,
  lang,
  currentSearch
}: CategoryNavigationServerProps) {
  const t = translations[lang] || translations['en']  // Fallback to English
  
  const buildUrl = (category: string) => {
    const params = new URLSearchParams()
    if (category !== "All") params.set('category', category)
    if (currentSearch) params.set('search', currentSearch)
    const queryString = params.toString()
    return `/${lang}${queryString ? `?${queryString}` : ''}`
  }

  return (
    <div className="relative flex-1 min-w-0">
      <div 
        className="flex space-x-1 overflow-x-auto overflow-y-hidden scrollbar-hide"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        <Link
          href={buildUrl("All")}
          className={`cursor-pointer px-4 py-2 rounded-none text-sm font-mono font-medium whitespace-nowrap transition-all duration-300 flex items-center ${
            activeCategory === "All"
              ? "bg-green-500/20 text-green-400 border border-green-500/50 shadow-lg shadow-green-500/20"
              : "text-zinc-400 hover:text-green-400 hover:bg-green-500/10 border border-transparent"
          }`}
        >
          <Cpu className="h-4 w-4 mr-2" />
          {t.navigation.allResources}
          <span className="ml-2 text-xs opacity-75 bg-green-500/20 px-1 rounded-none">{getCategoryCount("All")}</span>
        </Link>
        
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
            <Link
              key={category}
              href={buildUrl(category)}
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
            </Link>
          )
        })}
      </div>
    </div>
  )
}