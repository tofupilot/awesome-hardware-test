import { notFound } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CopyButton } from "@/components/copy-button"
import { JsonLd } from "@/components/json-ld"
import { ImagePlaceholder } from "@/components/image-placeholder"
import { getAllGitHubData } from "@/lib/github-data"
import { Metadata } from "next"
import {
  ArrowLeft,
  ExternalLink,
  Github,
  Star,
  Calendar,
  Users,
  Download,
  Zap,
  Database,
  Cable,
  Map,
  HardDrive,
  TestTube,
  Package,
  BookOpen,
  Skull,
} from "lucide-react"
import { hardwareTestData } from "@/lib/hardware-data"

const categoryIcons = {
  "Test Execution Engines": Zap,
  "Test Database & Analytics": Database,
  "Instrument Interface": Cable,
  "Wafer Maps": Map,
  "Hardware Devices & Tools": HardDrive,
  "Hardware Mocking": TestTube,
  "Test Suites": Package,
  "Resources & Learning": BookOpen,
}

import { Locale, locales } from "@/lib/translations"

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://awesome-hardware-test.com';

export async function generateMetadata({ params }: { params: Promise<{ id: string; lang: Locale }> }): Promise<Metadata> {
  const { id, lang } = await params
  const resource = hardwareTestData.find(r => r.id === id)
  
  if (!resource) {
    return {
      title: "Resource Not Found",
    }
  }

  const description = typeof resource.description === 'object' 
    ? resource.description[lang] 
    : resource.description
  
  const keywords = [
    resource.name,
    ...resource.tags,
    resource.category.toLowerCase(),
    resource.language?.toLowerCase(),
    "hardware testing",
    "test automation"
  ].filter(Boolean) as string[]

  return {
    title: `${resource.name} - ${resource.category}`,
    description: description,
    keywords: keywords,
    alternates: {
      canonical: `${siteUrl}/${lang}/${id}`,
      languages: {
        'en': `/en/${id}`,
        'fr': `/fr/${id}`,
      },
    },
    openGraph: {
      title: resource.name,
      description: description,
      url: `${siteUrl}/${lang}/${id}`,
      type: "article",
      locale: lang === 'en' ? 'en_US' : 'fr_FR',
    },
    twitter: {
      card: "summary_large_image",
      title: `${resource.name} - Hardware Testing Tool`,
      description: description,
    },
  }
}

export async function generateStaticParams() {
  const params = []
  for (const lang of locales) {
    for (const resource of hardwareTestData) {
      params.push({ lang, id: resource.id })
    }
  }
  return params
}

export default async function ResourcePage({ params }: { params: Promise<{ id: string; lang: Locale }> }) {
  const { id, lang } = await params
  const resource = hardwareTestData.find(r => r.id === id)

  if (!resource) {
    notFound()
  }

  // Fetch GitHub data server-side
  const { stars, repoData } = await getAllGitHubData()
  const githubStars = stars[resource.id]
  
  const CategoryIcon = categoryIcons[resource.category as keyof typeof categoryIcons] || Zap


  const formatStars = (stars?: number | null) => {
    if (stars === undefined || stars === null) return "N/A"
    if (stars === 0) return "0"
    if (stars >= 1000) {
      return `${(stars / 1000).toFixed(1)}k`
    }
    return stars.toString()
  }

  const formatLicense = (license?: string) => {
    if (!license) return 'N/A'
    // Common license name mappings to shorter versions
    const licenseMap: Record<string, string> = {
      'BSD 3-Clause "New" or "Revised" License': 'BSD-3-Clause',
      'BSD 2-Clause "Simplified" License': 'BSD-2-Clause',
      'MIT License': 'MIT',
      'Apache License 2.0': 'Apache-2.0',
      'GNU General Public License v3.0': 'GPL-3.0',
      'GNU General Public License v2.0': 'GPL-2.0',
      'GNU Lesser General Public License v3.0': 'LGPL-3.0',
      'GNU Lesser General Public License v2.1': 'LGPL-2.1',
      'Mozilla Public License 2.0': 'MPL-2.0',
      'The Unlicense': 'Unlicense',
    }
    return licenseMap[license] || license
  }

  const description = typeof resource.description === 'object' 
    ? resource.description[lang] 
    : resource.description

  // JSON-LD structured data
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": resource.name,
    "description": description,
    "applicationCategory": resource.category,
    "programmingLanguage": resource.language,
    "keywords": resource.tags.join(", "),
    "url": `${siteUrl}/${lang}/${resource.id}`,
    "sameAs": [
      resource.links?.github,
      resource.links?.website,
      resource.links?.docs
    ].filter(Boolean),
    "aggregateRating": githubStars ? {
      "@type": "AggregateRating",
      "ratingValue": 4.5,
      "ratingCount": githubStars,
      "bestRating": 5,
      "worstRating": 1
    } : undefined,
    "isAccessibleForFree": !resource.isCommercial,
    "license": resource.license
  }

  return (
    <>
      <JsonLd data={jsonLd} />
      <div className="min-h-screen bg-zinc-900 text-zinc-100 relative">
      {/* Header */}
      <header className={`border-b ${resource.unmaintained ? 'border-red-500/20' : 'border-green-500/20'} bg-zinc-900/98 backdrop-blur sticky top-0 z-50`}>
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className={`flex items-center space-x-2 ${resource.unmaintained ? 'text-red-400 hover:text-red-300' : 'text-green-400 hover:text-green-300'} font-mono`}>
            <ArrowLeft className="h-4 w-4" />
            <span className="text-sm">[BACK_TO_RESOURCES]</span>
          </Link>
          <div className="flex items-center space-x-4">
            <Button
              variant="outline"
              size="sm"
              className={`${resource.unmaintained ? 'border-red-500/50 hover:bg-red-500/10 text-red-400 hover:text-red-300' : 'border-green-500/50 hover:bg-green-500/10 text-green-400 hover:text-green-300'} font-mono rounded-none h-8 bg-transparent`}
              asChild
            >
              <Link href={resource.links?.github || '#'} target="_blank">
                <Github className="h-4 w-4 mr-2" />
                GITHUB
              </Link>
            </Button>
            <Button
              variant="outline"
              size="sm"
              className={`${resource.unmaintained ? 'border-red-500/50 hover:bg-red-500/10 text-red-400 hover:text-red-300' : 'border-green-500/50 hover:bg-green-500/10 text-green-400 hover:text-green-300'} font-mono rounded-none h-8 bg-transparent`}
              asChild
            >
              <Link href={resource.links?.website || resource.links?.github || '#'} target="_blank">
                <ExternalLink className="h-4 w-4 mr-2" />
                VISIT
              </Link>
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 relative z-10">
        {/* Hero Section */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-6">
            <div className="relative">
              <CategoryIcon className={`h-12 w-12 ${resource.unmaintained ? 'text-red-400' : 'text-green-400'}`} />
              <div className={`absolute -top-1 -right-1 w-3 h-3 ${resource.unmaintained ? 'bg-red-400' : 'bg-green-400'} rounded-none`} />
            </div>
            <div>
              <h1 className={`text-4xl font-bold font-mono ${resource.unmaintained ? 'text-red-400' : 'text-green-400'}`}>{resource.name.toUpperCase()}</h1>
              <p className="text-zinc-400 font-mono text-sm">
                [{typeof resource.description === 'object' 
                  ? resource.description[lang].toUpperCase() 
                  : (resource.description as string).toUpperCase()}]
              </p>
            </div>
          </div>

          {/* Repository stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className={`bg-zinc-800/70 border ${resource.unmaintained ? 'border-red-500/20' : 'border-green-500/20'} rounded-none p-3 font-mono`}>
              <div className={`${resource.unmaintained ? 'text-red-400' : 'text-green-400'} text-xs flex items-center`}>
                <Star className="h-3 w-3 mr-1" />
                STARS
              </div>
              <div className="text-white font-bold">{formatStars(githubStars) || 'N/A'}</div>
            </div>
            <div className={`bg-zinc-800/70 border ${resource.unmaintained ? 'border-red-500/20' : 'border-green-500/20'} rounded-none p-3 font-mono`}>
              <div className={`${resource.unmaintained ? 'text-red-400' : 'text-green-400'} text-xs flex items-center`}>
                <Users className="h-3 w-3 mr-1" />
                CONTRIBUTORS
              </div>
              <div className="text-white font-bold">{repoData?.contributors || 'N/A'}</div>
            </div>
            <div className={`bg-zinc-800/70 border ${resource.unmaintained ? 'border-red-500/20' : 'border-green-500/20'} rounded-none p-3 font-mono`}>
              <div className={`${resource.unmaintained ? 'text-red-400' : 'text-green-400'} text-xs flex items-center`}>
                <Calendar className="h-3 w-3 mr-1" />
                LAST_RELEASE
              </div>
              <div className="text-white font-bold">N/A</div>
            </div>
            <div className={`bg-zinc-800/70 border ${resource.unmaintained ? 'border-red-500/20' : 'border-green-500/20'} rounded-none p-3 font-mono`}>
              <div className={`${resource.unmaintained ? 'text-red-400' : 'text-green-400'} text-xs flex items-center`}>
                <Github className="h-3 w-3 mr-1" />
                LICENSE
              </div>
              <div className="text-white font-bold">{formatLicense(resource.license)}</div>
            </div>
          </div>

          {/* Category and Language badges */}
          <div className="flex flex-wrap gap-4 mb-6">
            <Badge variant="secondary" className="bg-zinc-700/70 text-zinc-300 font-mono rounded-none">
              {resource.language?.toUpperCase() || 'UNKNOWN'}
            </Badge>
            <Badge variant="secondary" className={`${resource.unmaintained ? 'bg-red-900/70 text-red-300' : 'bg-green-900/70 text-green-300'} font-mono rounded-none`}>
              {resource.category.replace(" ", "_").toUpperCase()}
            </Badge>
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Unmaintained Project Explanation */}
            {resource.unmaintained && (
              <>
                <Card className="bg-red-900/20 border-red-500/30 rounded-none">
                  <CardHeader>
                    <CardTitle className="font-mono text-red-400 flex items-center">
                      <Skull className="h-5 w-5 mr-2 flex-shrink-0" />
                      <span>[RIP {resource.name.toUpperCase()}]</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-zinc-300 font-mono text-sm leading-relaxed">
                      {resource.unmaintainedReason || 'This project is no longer actively maintained. While the existing code may still be functional, users should be aware that no new features, bug fixes, or security updates will be provided. Consider evaluating alternative solutions that have active community support.'}
                    </div>
                  </CardContent>
                </Card>

                {/* Recommended Alternatives Card */}
                {resource.recommendedReplacements && resource.recommendedReplacements.length > 0 && (
                  <Card className="bg-green-900/20 border-green-500/30 rounded-none">
                    <CardHeader>
                      <CardTitle className="font-mono text-green-400 flex items-center">
                        <Zap className="h-5 w-5 mr-2" />
                        [RECOMMENDED_ALTERNATIVES]
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {resource.recommendedReplacements.map((replacement) => (
                          <Link
                            key={replacement.id}
                            href={`/${lang}/${replacement.id}`}
                            className="block p-3 bg-green-900/10 border border-green-500/20 rounded-none hover:bg-green-900/20 hover:border-green-500/40 transition-all group"
                          >
                            <div className="flex items-center gap-2 mb-2">
                              <span className="text-green-400">→</span>
                              <div className="font-bold text-green-400 group-hover:text-green-300 font-mono">
                                {replacement.name.toUpperCase()}
                              </div>
                            </div>
                            {replacement.reason && (
                              <div className="text-zinc-400 text-sm font-mono pl-5">
                                {replacement.reason}
                              </div>
                            )}
                          </Link>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                )}
              </>
            )}

            {/* Hero Image */}
            <Card className={`bg-zinc-800/70 !py-0 ${resource.unmaintained ? 'border-red-500/20' : 'border-green-500/20'} overflow-hidden rounded-none`}>
              <div className="relative h-64 bg-zinc-900/70">
                {resource.image ? (
                  <Image
                    src={resource.image}
                    alt={`${resource.name} interface`}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <ImagePlaceholder 
                    text={resource.imagePlaceholder || `${resource.name} image coming soon`}
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-900/90 via-transparent to-transparent" />
                <div className={`absolute bottom-4 left-4 ${resource.unmaintained ? 'text-red-400' : 'text-green-400'} font-mono text-sm`}>
                  [SYSTEM_INTERFACE_PREVIEW]
                </div>
              </div>
            </Card>

            {/* Description */}
            <Card className={`bg-zinc-800/70 ${resource.unmaintained ? 'border-red-500/20' : 'border-green-500/20'} rounded-none`}>
              <CardHeader>
                <CardTitle className={`font-mono ${resource.unmaintained ? 'text-red-400' : 'text-green-400'}`}>[SYSTEM_DESCRIPTION]</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="prose prose-invert max-w-none">
                  {(() => {
                    const desc = resource.longDescription || 
                      (typeof resource.description === 'object' ? resource.description[lang] : resource.description);
                    return desc.split("\n\n").map((paragraph, index) => (
                      <p key={index} className="text-zinc-300 mb-4 leading-relaxed font-mono text-sm">
                        {paragraph}
                      </p>
                    ));
                  })()}
                </div>
              </CardContent>
            </Card>

            {/* Code Snippet */}
            <Card className={`bg-zinc-800/70 ${resource.unmaintained ? 'border-red-500/20' : 'border-green-500/20'} rounded-none`}>
              <CardHeader>
                <CardTitle className={`font-mono ${resource.unmaintained ? 'text-red-400' : 'text-green-400'} flex items-center justify-between`}>
                  [CODE_EXAMPLE]
                  <CopyButton 
                    text={resource.installation || ''}
                    className={`h-6 w-6 p-0 text-zinc-400 ${resource.unmaintained ? 'hover:text-red-400' : 'hover:text-green-400'} rounded-none bg-transparent`}
                  />
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className={`bg-zinc-900/70 border ${resource.unmaintained ? 'border-red-500/20' : 'border-green-500/20'} rounded-none p-4 font-mono text-sm`}>
                  <div className="text-zinc-500 mb-2"># Installation</div>
                  <div className={`${resource.unmaintained ? 'text-red-400' : 'text-green-400'}`}>{resource.installation || 'Installation instructions not available'}</div>
                  {resource.codeExample && (
                    <>
                      <div className="text-zinc-500 mt-4 mb-2"># Basic usage example</div>
                      <div className="text-zinc-300 whitespace-pre-wrap font-mono">{resource.codeExample}</div>
                    </>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Features */}
            <Card className={`bg-zinc-800/70 ${resource.unmaintained ? 'border-red-500/20' : 'border-green-500/20'} rounded-none`}>
              <CardHeader>
                <CardTitle className={`font-mono ${resource.unmaintained ? 'text-red-400' : 'text-green-400'}`}>[FEATURE_SET]</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-3 md:grid-cols-2">
                  {(() => {
                    const features = resource.features 
                      ? (typeof resource.features === 'object' && 'en' in resource.features 
                          ? resource.features[lang] 
                          : resource.features as string[])
                      : [];
                    return features.map((feature, index) => (
                      <div key={index} className="flex items-center text-zinc-300 font-mono text-sm">
                        <div className={`w-2 h-2 ${resource.unmaintained ? 'bg-red-400' : 'bg-green-400'} rounded-none mr-3 flex-shrink-0`} />
                        {feature.toUpperCase()}
                      </div>
                    ));
                  })()}
                </div>
              </CardContent>
            </Card>

            {/* Use Cases */}
            <Card className={`bg-zinc-800/70 ${resource.unmaintained ? 'border-red-500/20' : 'border-green-500/20'} rounded-none`}>
              <CardHeader>
                <CardTitle className={`font-mono ${resource.unmaintained ? 'text-red-400' : 'text-green-400'}`}>[APPLICATION_DOMAINS]</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-3">
                  {(resource.useCases || []).map((useCase, index) => (
                    <div key={index} className="flex items-center text-zinc-300 font-mono text-sm">
                      <div className="w-2 h-2 bg-yellow-400 rounded-none mr-3 flex-shrink-0" />
                      {useCase.toUpperCase()}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Installation */}
            <Card className={`bg-zinc-800/70 ${resource.unmaintained ? 'border-red-500/20' : 'border-green-500/20'} rounded-none`}>
              <CardHeader>
                <CardTitle className={`text-lg font-mono ${resource.unmaintained ? 'text-red-400' : 'text-green-400'} flex items-center`}>
                  <Download className="h-4 w-4 mr-2" />
                  [INSTALLATION]
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className={`bg-zinc-900/70 border ${resource.unmaintained ? 'border-red-500/20' : 'border-green-500/20'} rounded-none p-3 font-mono text-sm ${resource.unmaintained ? 'text-red-400' : 'text-green-400'}`}>
                  $ {resource.installation}
                </div>
              </CardContent>
            </Card>

            {/* Links */}
            <Card className={`bg-zinc-800/70 ${resource.unmaintained ? 'border-red-500/20' : 'border-green-500/20'} rounded-none`}>
              <CardHeader>
                <CardTitle className={`text-lg font-mono ${resource.unmaintained ? 'text-red-400' : 'text-green-400'}`}>[EXTERNAL_LINKS]</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button
                  variant="outline"
                  className={`w-full justify-start ${resource.unmaintained ? 'border-red-500/50 hover:bg-red-500/10 text-red-400 hover:text-red-300' : 'border-green-500/50 hover:bg-green-500/10 text-green-400 hover:text-green-300'} font-mono rounded-none h-8 bg-transparent`}
                  asChild
                >
                  <Link href={resource.links?.github || '#'} target="_blank">
                    <Github className="h-4 w-4 mr-2" />
                    GITHUB_REPOSITORY
                  </Link>
                </Button>
                <Button
                  variant="outline"
                  className={`w-full justify-start ${resource.unmaintained ? 'border-red-500/50 hover:bg-red-500/10 text-red-400 hover:text-red-300' : 'border-green-500/50 hover:bg-green-500/10 text-green-400 hover:text-green-300'} font-mono rounded-none h-8 bg-transparent`}
                  asChild
                >
                  <Link href={resource.links?.website || resource.links?.github || '#'} target="_blank">
                    <ExternalLink className="h-4 w-4 mr-2" />
                    OFFICIAL_WEBSITE
                  </Link>
                </Button>
                {resource.documentation && (
                  <Button
                    variant="outline"
                    className={`w-full justify-start ${resource.unmaintained ? 'border-red-500/50 hover:bg-red-500/10 text-red-400 hover:text-red-300' : 'border-green-500/50 hover:bg-green-500/10 text-green-400 hover:text-green-300'} font-mono rounded-none h-8 bg-transparent`}
                    asChild
                  >
                    <Link href={resource.documentation} target="_blank">
                      <BookOpen className="h-4 w-4 mr-2" />
                      DOCUMENTATION
                    </Link>
                  </Button>
                )}
              </CardContent>
            </Card>

            {/* GitHub Stats */}
            <Card className={`bg-zinc-800/70 ${resource.unmaintained ? 'border-red-500/20' : 'border-green-500/20'} rounded-none`}>
              <CardHeader>
                <CardTitle className={`text-lg font-mono ${resource.unmaintained ? 'text-red-400' : 'text-green-400'}`}>[REPOSITORY_METRICS]</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between font-mono text-sm">
                  <span className="text-zinc-400">STARS</span>
                  <span className={`flex items-center ${resource.unmaintained ? 'text-red-400' : 'text-green-400'}`}>
                    <Star className="h-3 w-3 mr-1" />
                    {formatStars(githubStars)}
                  </span>
                </div>
                <div className="flex justify-between font-mono text-sm">
                  <span className="text-zinc-400">CONTRIBUTORS</span>
                  <span className={`flex items-center ${resource.unmaintained ? 'text-red-400' : 'text-green-400'}`}>
                    <Users className="h-3 w-3 mr-1" />
                    {repoData?.contributors || 'N/A'}
                  </span>
                </div>
                <div className="flex justify-between font-mono text-sm">
                  <span className="text-zinc-400">LAST_RELEASE</span>
                  <span className={`flex items-center ${resource.unmaintained ? 'text-red-400' : 'text-green-400'}`}>
                    <Calendar className="h-3 w-3 mr-1" />
                    N/A
                  </span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
    </>
  )
}
