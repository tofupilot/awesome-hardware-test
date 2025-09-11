import { hardwareTestData as allResources, categories, categoryIcons } from "@/lib/hardware-data"
import { translations, Locale } from "@/lib/translations"
import { HeroSection } from "@/components/hero-section"
import { SiteFooter } from "@/components/site-footer"
import { NewsletterSection } from "@/components/newsletter-section"
import { getAllGitHubData } from "@/lib/github-data"
import { CategoryNavigationServer } from "@/components/category-navigation-server"
import { ResourceCard } from "@/components/resource-card"
import { SearchInput } from "@/components/search-input"
import { JsonLd } from "@/components/json-ld"
import { Metadata } from "next"

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://awesome-hardware-test.com';

export async function generateMetadata({ params }: { params: Promise<{ lang: Locale }> }): Promise<Metadata> {
  const { lang } = await params
  const isEnglish = lang === 'en'
  
  return {
    title: isEnglish ? "Hardware Testing Tools & Frameworks" : "Outils et Frameworks de Test Matériel",
    description: isEnglish 
      ? `${allResources.length} hardware testing tools. Find test execution engines, wafer maps, instrument interfaces for electronics validation.`
      : `${allResources.length} outils de test matériel. Moteurs d'exécution, cartes de wafers, interfaces d'instruments pour validation électronique.`,
    alternates: {
      canonical: `${siteUrl}/${lang}`,
      languages: {
        'en': '/en',
        'fr': '/fr',
      },
    },
    openGraph: {
      title: isEnglish ? "Hardware Testing Tools Collection" : "Collection d'Outils de Test Matériel",
      description: isEnglish 
        ? "Open source hardware testing frameworks and tools for electronics validation"
        : "Frameworks et outils open source pour la validation électronique",
      url: `${siteUrl}/${lang}`,
      locale: lang === 'en' ? 'en_US' : 'fr_FR',
    },
  }
}

interface LandingPageProps {
  params: Promise<{
    lang: Locale
  }>
  searchParams: Promise<{
    category?: string
    search?: string
  }>
}

export default async function LandingPage({ params, searchParams }: LandingPageProps) {
  const { lang } = await params
  const { category = "All", search = "" } = await searchParams
  const t = translations[lang]
  
  // Fetch GitHub data server-side (stars, releases, contributors, etc.)
  const githubData = await getAllGitHubData()

  // JSON-LD structured data
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareSourceCode",
    "name": "Awesome Hardware Test",
    "description": lang === 'en' 
      ? "Complete collection of hardware testing tools and frameworks"
      : "Collection complète d'outils et frameworks de test matériel",
    "url": `${siteUrl}/${lang}`,
    "codeRepository": "https://github.com/awesome-hardware-test",
    "programmingLanguage": ["Python", "Rust", "C++", "JavaScript"],
    "keywords": "hardware testing, test automation, semiconductor testing, wafer maps",
    "aggregateRating": {
      "@type": "AggregateRating",
      "itemCount": allResources.length,
      "bestRating": 5,
      "worstRating": 1
    }
  }

  // Filter resources server-side based on URL params
  const filteredResources = allResources.filter((resource) => {
    const description = typeof resource.description === 'object' ? resource.description[lang] : resource.description
    const matchesSearch =
      !search ||
      resource.name.toLowerCase().includes(search.toLowerCase()) ||
      description.toLowerCase().includes(search.toLowerCase())
    const matchesCategory = category === "All" || resource.category === category
    return matchesSearch && matchesCategory
  })

  const getCategoryCount = (cat: string) => {
    if (cat === "All") return allResources.length
    return allResources.filter((r) => r.category === cat).length
  }

  return (
    <>
      <JsonLd data={jsonLd} />
      <div className="min-h-screen bg-zinc-900 text-zinc-100 relative">
      <HeroSection lang={lang} />
      
      <nav className="border-b border-green-500/20 bg-zinc-900/98 relative z-10">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-4 py-4">
            {/* Search Bar - Client Component */}
            <SearchInput 
              defaultValue={search} 
              placeholder="SEARCH"
              lang={lang}
            />
            
            {/* Category Buttons - Server Component with Links */}
            <CategoryNavigationServer
              categories={categories}
              categoryIcons={categoryIcons}
              activeCategory={category}
              getCategoryCount={getCategoryCount}
              lang={lang}
              currentSearch={search}
            />
          </div>
        </div>
      </nav>

      <main className="container mx-auto px-4 py-8 relative z-10">
        {/* Search Results Info */}
        {search && (
          <div className="mb-8">
            <p className="text-sm text-green-400 font-mono">
              {t.search.results(filteredResources.length)}
              {category !== "All" && ` ${t.search.category(category)}`}
            </p>
          </div>
        )}

        {/* Resources Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredResources.map((resource, index) => (
            <ResourceCard 
              key={resource.id} 
              resource={resource} 
              lang={lang}
              starCount={githubData[resource.id]?.stars}
              lastRelease={githubData[resource.id]?.lastRelease}
              contributors={githubData[resource.id]?.contributors}
            />
          ))}
        </div>

        {filteredResources.length === 0 && (
          <div className="text-center py-12">
            <div className="text-red-400 font-mono text-lg mb-2">{t.search.noResults}</div>
            <p className="text-zinc-500 font-mono">
              {search
                ? t.search.noResultsQuery(search, category !== "All" ? category : undefined)
                : t.search.noResultsStatus}
            </p>
          </div>
        )}

        {/* Newsletter Section */}
        <div className="mt-16">
          <NewsletterSection lang={lang} />
        </div>

        <SiteFooter lang={lang} />
      </main>
    </div>
    </>
  )
}