import { MetadataRoute } from 'next'
import { hardwareTestData } from '@/lib/hardware-data'
import { locales } from '@/lib/translations'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://awesome-hardware-test.com'

export default function sitemap(): MetadataRoute.Sitemap {
  const currentDate = new Date()
  
  // Home pages for each language
  const homePages = locales.map(lang => ({
    url: `${siteUrl}/${lang}`,
    lastModified: currentDate,
    changeFrequency: 'weekly' as const,
    priority: 1,
  }))

  // Resource pages for each language
  const resourcePages = locales.flatMap(lang =>
    hardwareTestData.map(resource => ({
      url: `${siteUrl}/${lang}/${resource.id}`,
      lastModified: currentDate,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    }))
  )

  return [
    {
      url: siteUrl,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 1,
    },
    ...homePages,
    ...resourcePages,
  ]
}