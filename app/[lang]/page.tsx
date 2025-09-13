import { hardwareTestData as allResources, categories, categoryIcons } from "@/lib/hardware-data"
import { translations, Locale } from "@/lib/translations"
import { HeroSection } from "@/components/hero-section"
import { NewsletterSection } from "@/components/newsletter-section"
import { DiscordSection } from "@/components/discord-section"
import { getAllGitHubData } from "@/lib/github-data"
import { CategoryNavigationServer } from "@/components/category-navigation-server"
import { ResourceCard } from "@/components/resource-card"
import { SearchInput } from "@/components/search-input"
import { JsonLd } from "@/components/json-ld"
import { Metadata } from "next"

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.awesome-hardware-test.com';

export async function generateMetadata({ params }: { params: Promise<{ lang: Locale }> }): Promise<Metadata> {
  const { lang } = await params
  const isEnglish = lang === 'en'
  
  return {
    title: isEnglish ? "Awesome Hardware Test - Testing Tools, Frameworks & Instruments for Electronics Validation" : "Awesome Hardware Test - Outils, Frameworks et Instruments de Test Matériel",
    description: isEnglish 
      ? "A handpicked collection of resources designed to help test engineers work faster."
      : "Une collection de ressources sélectionnées pour aider les ingénieurs de test à travailler plus rapidement.",
    alternates: {
      canonical: `${siteUrl}/${lang}`,
      languages: {
        'x-default': `${siteUrl}/en`,
        'en': `${siteUrl}/en`,
        'fr': `${siteUrl}/fr`,
      },
    },
    openGraph: {
      title: isEnglish ? "Hardware Testing Tools Collection" : "Collection d'Outils de Test Matériel",
      description: isEnglish 
        ? "A handpicked collection of resources designed to help test engineers work faster."
        : "Une collection de ressources sélectionnées pour aider les ingénieurs de test à travailler plus rapidement.",
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
  
  // Fetch GitHub data server-side
  const { stars, repoData } = await getAllGitHubData()

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

  // Separate active and unmaintained resources
  const activeResources = filteredResources.filter((resource) => !resource.unmaintained)
  const ripResources = filteredResources.filter((resource) => resource.unmaintained)

  const getCategoryCount = (cat: string) => {
    if (cat === "All") return allResources.length
    return allResources.filter((r) => r.category === cat).length
  }

  return (
    <>
      <JsonLd data={jsonLd} />
      <div className="min-h-screen bg-zinc-900 text-zinc-100 relative">
      <HeroSection 
        lang={lang} 
        repoLastCommit={repoData?.lastCommit}
        repoStars={repoData?.stars}
        repoContributors={repoData?.contributors}
      />
      
      <nav className="border-b border-green-500/20 bg-zinc-900/98 relative z-[5]">
        <div className="container mx-auto px-4">
          <div className="flex flex-col sm:flex-row sm:items-center gap-3 py-4">
            {/* Search Bar - Client Component */}
            <SearchInput 
              defaultValue={search} 
              placeholder="SEARCH_RESOURCES"
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

        {/* Active Resources Section */}
        {activeResources.length > 0 && (
          <div className="mb-12">
            <h2 className="text-xl font-mono text-green-400 mb-6">
              [ACTIVE_RESOURCES: {activeResources.length}]
            </h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {activeResources.map((resource, index) => {
                const items = [];
                
                // Add the resource card
                items.push(
                  <ResourceCard 
                    key={resource.id} 
                    resource={resource} 
                    lang={lang}
                    starCount={stars[resource.id]}
                  />
                );
                
                // Insert Discord card after 9th resource (3rd row in 3-col grid) - only if no search
                if (index === 8 && !search) {
                  items.push(
                    <div key="discord-card" className="md:col-span-2 lg:col-span-3">
                      <DiscordSection lang={lang} />
                    </div>
                  );
                }
                
                // Insert Newsletter card after 18th resource (6th row in 3-col grid) - only if no search
                if (index === 17 && !search) {
                  items.push(
                    <div key="newsletter-card" className="md:col-span-2 lg:col-span-3">
                      <NewsletterSection lang={lang} />
                    </div>
                  );
                }
                
                return items;
              }).flat()}
            </div>
          </div>
        )}

        {/* RIP Resources Section */}
        {ripResources.length > 0 && (
          <div className="mb-12">
            <h2 className="text-xl font-mono text-red-400 mb-6">
              [RIP_RESOURCES: {ripResources.length}]
            </h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {ripResources.map((resource, index) => (
                <ResourceCard 
                  key={resource.id} 
                  resource={resource} 
                  lang={lang}
                  starCount={stars[resource.id]}
                />
              ))}
            </div>
          </div>
        )}

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

      </main>
    </div>
    </>
  )
}