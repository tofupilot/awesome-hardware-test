"use client"

import { Cpu, Zap, Database, Cable, Map, HardDrive, TestTube, Package, BookOpen } from "lucide-react"

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
}

export function CategoryNavigation({
  categories,
  categoryIcons,
  activeCategory,
  onCategoryChange,
  getCategoryCount,
}: CategoryNavigationProps) {
  return (
    <nav className="border-b border-green-500/20 bg-zinc-900/98 backdrop-blur relative z-10">
      <div className="container mx-auto px-4">
        <div className="flex space-x-1 overflow-x-auto py-4">
          <button
            onClick={() => onCategoryChange("All")}
            className={`px-4 py-2 rounded-none text-sm font-mono font-medium whitespace-nowrap transition-all duration-300 flex items-center ${
              activeCategory === "All"
                ? "bg-green-500/20 text-green-400 border border-green-500/50 shadow-lg shadow-green-500/20"
                : "text-zinc-400 hover:text-green-400 hover:bg-green-500/10 border border-transparent"
            }`}
          >
            <Cpu className="h-4 w-4 mr-2" />
            ALL_RESOURCES
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
                className={`px-4 py-2 rounded-none text-sm font-mono font-medium whitespace-nowrap transition-all duration-300 flex items-center ${
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
    </nav>
  )
}
