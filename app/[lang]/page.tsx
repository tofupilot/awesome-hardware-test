"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"
import { allResources, categories, categoryIcons } from "@/lib/resources"
import { SiteHeader } from "@/components/site-header"
import { HeroSection } from "@/components/hero-section"
import { CategoryNavigation } from "@/components/category-navigation"
import { ResourceCard } from "@/components/resource-card"
import { SiteFooter } from "@/components/site-footer"
import { NewsletterSection } from "@/components/newsletter-section"

export default function LandingPage() {
  const [activeCategory, setActiveCategory] = useState("All")
  const [searchTerm, setSearchTerm] = useState("")

  const filteredResources = allResources.filter((resource) => {
    const matchesSearch =
      resource.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      resource.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = activeCategory === "All" || resource.category === activeCategory
    return matchesSearch && matchesCategory
  })

  const getCategoryCount = (category: string) => {
    if (category === "All") return allResources.length
    return allResources.filter((r) => r.category === category).length
  }

  return (
    <div className="min-h-screen bg-zinc-900 text-zinc-100 relative">
      <SiteHeader totalResources={allResources.length} />
      <HeroSection />
      <CategoryNavigation
        categories={categories}
        categoryIcons={categoryIcons}
        activeCategory={activeCategory}
        onCategoryChange={setActiveCategory}
        getCategoryCount={getCategoryCount}
      />

      <main className="container mx-auto px-4 py-8 relative z-10">
        {/* Search */}
        <div className="mb-8">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-green-500" />
            <Input
              placeholder={`SEARCH ${activeCategory === "All" ? "ALL_RESOURCES" : activeCategory.toUpperCase()}...`}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-zinc-800/70 border-green-500/30 text-zinc-100 placeholder-zinc-500 font-mono focus:border-green-500 focus:ring-green-500/20 rounded-none"
            />
          </div>
          {searchTerm && (
            <p className="text-sm text-green-400 mt-2 font-mono">
              [SEARCH_RESULTS: {filteredResources.length}]
              {activeCategory !== "All" && ` [CATEGORY: ${activeCategory.toUpperCase()}]`}
            </p>
          )}
        </div>

        {/* Resources Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredResources.map((resource, index) => (
            <ResourceCard key={index} resource={resource} />
          ))}
        </div>

        {filteredResources.length === 0 && (
          <div className="text-center py-12">
            <div className="text-red-400 font-mono text-lg mb-2">[ERROR: NO_RESOURCES_FOUND]</div>
            <p className="text-zinc-500 font-mono">
              {searchTerm
                ? `[QUERY: "${searchTerm}"]${activeCategory !== "All" ? ` [CATEGORY: ${activeCategory.toUpperCase()}]` : ""} [RESULTS: 0]`
                : `[STATUS: NO_RESOURCES_AVAILABLE]`}
            </p>
          </div>
        )}

        {/* Newsletter Section */}
        <div className="mt-16">
          <NewsletterSection />
        </div>

        <SiteFooter />
      </main>
    </div>
  )
}
