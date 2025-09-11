import { notFound } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CopyButton } from "@/components/copy-button"
import { JsonLd } from "@/components/json-ld"
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
  const githubData = await getAllGitHubData()
  const repoData = githubData[resource.id]
  const githubStars = repoData?.stars
  
  const CategoryIcon = categoryIcons[resource.category as keyof typeof categoryIcons] || Zap

  const getPlaceholderImage = (resourceName: string) => {
    const queries = {
      crappy: "python hardware testing framework dashboard interface oscilloscope",
      exclave: "rust factory testing infrastructure console terminal",
      openhtf: "google hardware testing framework web interface dashboard",
    }
    const query = queries[resourceName as keyof typeof queries] || "hardware testing tool interface"
    return `/placeholder.svg?height=400&width=800&text=${encodeURIComponent(query)}`
  }

  const formatStars = (stars?: number) => {
    if (!stars) return "0"
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
      <header className="border-b border-green-500/20 bg-zinc-900/98 backdrop-blur sticky top-0 z-50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2 text-green-400 hover:text-green-300 font-mono">
            <ArrowLeft className="h-4 w-4" />
            <span className="text-sm">[BACK_TO_RESOURCES]</span>
          </Link>
          <div className="flex items-center space-x-4">
            <Button
              variant="outline"
              size="sm"
              className="border-green-500/50 hover:bg-green-500/10 text-green-400 hover:text-green-300 font-mono rounded-none h-8 bg-transparent"
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
              className="border-green-500/50 hover:bg-green-500/10 text-green-400 hover:text-green-300 font-mono rounded-none h-8 bg-transparent"
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
              <CategoryIcon className="h-12 w-12 text-green-400" />
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-none" />
            </div>
            <div>
              <h1 className="text-4xl font-bold font-mono text-green-400">{resource.name.toUpperCase()}</h1>
              <p className="text-zinc-400 font-mono text-sm">
                [{typeof resource.description === 'object' 
                  ? resource.description[lang].toUpperCase() 
                  : (resource.description as string).toUpperCase()}]
              </p>
            </div>
          </div>

          {/* Repository stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-zinc-800/70 border border-green-500/20 rounded-none p-3 font-mono">
              <div className="text-green-400 text-xs flex items-center">
                <Star className="h-3 w-3 mr-1" />
                STARS
              </div>
              <div className="text-white font-bold">{formatStars(githubStars) || 'N/A'}</div>
            </div>
            <div className="bg-zinc-800/70 border border-green-500/20 rounded-none p-3 font-mono">
              <div className="text-green-400 text-xs flex items-center">
                <Users className="h-3 w-3 mr-1" />
                CONTRIBUTORS
              </div>
              <div className="text-white font-bold">{repoData?.contributors || 'N/A'}</div>
            </div>
            <div className="bg-zinc-800/70 border border-green-500/20 rounded-none p-3 font-mono">
              <div className="text-green-400 text-xs flex items-center">
                <Calendar className="h-3 w-3 mr-1" />
                LAST_RELEASE
              </div>
              <div className="text-white font-bold">{repoData?.lastRelease || 'N/A'}</div>
            </div>
            <div className="bg-zinc-800/70 border border-green-500/20 rounded-none p-3 font-mono">
              <div className="text-green-400 text-xs flex items-center">
                <Github className="h-3 w-3 mr-1" />
                LICENSE
              </div>
              <div className="text-white font-bold">{formatLicense(repoData?.license || resource.license)}</div>
            </div>
          </div>

          {/* Category and Language badges */}
          <div className="flex flex-wrap gap-4 mb-6">
            <Badge variant="secondary" className="bg-zinc-700/70 text-zinc-300 font-mono rounded-none">
              {resource.language?.toUpperCase() || 'UNKNOWN'}
            </Badge>
            <Badge variant="secondary" className="bg-green-900/70 text-green-300 font-mono rounded-none">
              {resource.category.replace(" ", "_").toUpperCase()}
            </Badge>
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Hero Image */}
            <Card className="bg-zinc-800/70 border-green-500/20 overflow-hidden rounded-none">
              <div className="relative h-64 bg-zinc-900/70">
                <Image
                  src={getPlaceholderImage(resource.name) || "/placeholder.svg"}
                  alt={`${resource.name} interface`}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-900/90 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 text-green-400 font-mono text-sm">
                  [SYSTEM_INTERFACE_PREVIEW]
                </div>
              </div>
            </Card>

            {/* Description */}
            <Card className="bg-zinc-800/70 border-green-500/20 rounded-none">
              <CardHeader>
                <CardTitle className="font-mono text-green-400">[SYSTEM_DESCRIPTION]</CardTitle>
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
            <Card className="bg-zinc-800/70 border-green-500/20 rounded-none">
              <CardHeader>
                <CardTitle className="font-mono text-green-400 flex items-center justify-between">
                  [CODE_EXAMPLE]
                  <CopyButton 
                    text={resource.installation || ''}
                    className="h-6 w-6 p-0 text-zinc-400 hover:text-green-400 rounded-none bg-transparent"
                  />
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-zinc-900/70 border border-green-500/20 rounded-none p-4 font-mono text-sm">
                  <div className="text-zinc-500 mb-2"># Installation</div>
                  <div className="text-green-400">{resource.installation || 'Installation instructions not available'}</div>
                  <div className="text-zinc-500 mt-4 mb-2"># Basic usage example</div>
                  <div className="text-zinc-300">
                    {resource.name === "crappy" && (
                      <>
                        <div>import crappy</div>
                        <div>from crappy import condition, blocks</div>
                        <div className="mt-2"># Create a test configuration</div>
                        <div>test = crappy.Test()</div>
                        <div>test.add_block(blocks.Generator())</div>
                        <div>test.run()</div>
                      </>
                    )}
                    {resource.name === "exclave" && (
                      <>
                        <div>use exclave::test::Test;</div>
                        <div>use exclave::runner::Runner;</div>
                        <div className="mt-2">// Create a new test</div>
                        <div>let test = Test::new("hardware_test");</div>
                        <div>let runner = Runner::new();</div>
                        <div>runner.execute(test)?;</div>
                      </>
                    )}
                    {resource.name === "openhtf" && (
                      <>
                        <div>import openhtf as htf</div>
                        <div>from openhtf.util import units</div>
                        <div className="mt-2"># Define a test phase</div>
                        <div>@htf.measures(htf.Measurement('voltage'))</div>
                        <div>def test_voltage(test):</div>
                        <div> test.measurements.voltage = 3.3 * units.volt</div>
                      </>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Features */}
            <Card className="bg-zinc-800/70 border-green-500/20 rounded-none">
              <CardHeader>
                <CardTitle className="font-mono text-green-400">[FEATURE_SET]</CardTitle>
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
                        <div className="w-2 h-2 bg-green-400 rounded-none mr-3 flex-shrink-0" />
                        {feature.toUpperCase()}
                      </div>
                    ));
                  })()}
                </div>
              </CardContent>
            </Card>

            {/* Use Cases */}
            <Card className="bg-zinc-800/70 border-green-500/20 rounded-none">
              <CardHeader>
                <CardTitle className="font-mono text-green-400">[APPLICATION_DOMAINS]</CardTitle>
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
            <Card className="bg-zinc-800/70 border-green-500/20 rounded-none">
              <CardHeader>
                <CardTitle className="text-lg font-mono text-green-400 flex items-center">
                  <Download className="h-4 w-4 mr-2" />
                  [INSTALLATION]
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-zinc-900/70 border border-green-500/20 rounded-none p-3 font-mono text-sm text-green-400">
                  $ {resource.installation}
                </div>
              </CardContent>
            </Card>

            {/* Links */}
            <Card className="bg-zinc-800/70 border-green-500/20 rounded-none">
              <CardHeader>
                <CardTitle className="text-lg font-mono text-green-400">[EXTERNAL_LINKS]</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button
                  variant="outline"
                  className="w-full justify-start border-green-500/50 hover:bg-green-500/10 text-green-400 hover:text-green-300 font-mono rounded-none h-8 bg-transparent"
                  asChild
                >
                  <Link href={resource.links?.github || '#'} target="_blank">
                    <Github className="h-4 w-4 mr-2" />
                    GITHUB_REPOSITORY
                  </Link>
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start border-green-500/50 hover:bg-green-500/10 text-green-400 hover:text-green-300 font-mono rounded-none h-8 bg-transparent"
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
                    className="w-full justify-start border-green-500/50 hover:bg-green-500/10 text-green-400 hover:text-green-300 font-mono rounded-none h-8 bg-transparent"
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
            <Card className="bg-zinc-800/70 border-green-500/20 rounded-none">
              <CardHeader>
                <CardTitle className="text-lg font-mono text-green-400">[REPOSITORY_METRICS]</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between font-mono text-sm">
                  <span className="text-zinc-400">STARS</span>
                  <span className="flex items-center text-green-400">
                    <Star className="h-3 w-3 mr-1 fill-current" />
                    {formatStars(githubStars)}
                  </span>
                </div>
                <div className="flex justify-between font-mono text-sm">
                  <span className="text-zinc-400">CONTRIBUTORS</span>
                  <span className="flex items-center text-green-400">
                    <Users className="h-3 w-3 mr-1" />
                    {repoData?.contributors || 'N/A'}
                  </span>
                </div>
                <div className="flex justify-between font-mono text-sm">
                  <span className="text-zinc-400">LAST_RELEASE</span>
                  <span className="text-green-400 text-xs">{repoData?.lastRelease || 'N/A'}</span>
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
