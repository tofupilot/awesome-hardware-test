"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Github, Star, ExternalLink, Skull } from "lucide-react"

interface Resource {
  id: string
  name: string
  description: string
  language: string
  category: string
  url: string
  stars?: number
  githubUrl?: string
  voltage: string
  frequency: string
  commercial?: boolean
  unmaintained?: boolean
}

interface ResourceCardProps {
  resource: Resource
}

export function ResourceCard({ resource }: ResourceCardProps) {
  const getPlaceholderImage = (resourceName: string, category: string) => {
    const queries = {
      crappy: "python hardware testing framework dashboard",
      exclave: "rust factory testing infrastructure",
      "Flojoy Studio": "visual scripting IDE interface",
      htf: "medical device testing framework",
      mats: "manufacturing test environment",
      octoprobe: "micropython board testing setup",
      openhtf: "google hardware testing framework",
      robotframework: "automation testing framework",
      sopic: "production line test station",
      TreeATE: "factory testing automation platform",
      "pytest-embedded": "embedded testing plugin",
      HardPy: "pytest hardware test bench",
      TofuPilot: "hardware test database analytics",
      yieldHUB: "semiconductor test analytics",
      pyvisa: "measurement device interface",
      "Test controller": "device control software",
      stdf2map: "wafer map visualization",
    }

    const query = queries[resourceName as keyof typeof queries] || `${category.toLowerCase()} hardware testing tool`
    return `/placeholder.svg?height=200&width=300&text=${encodeURIComponent(query)}`
  }

  const formatStars = (stars?: number) => {
    if (!stars) return null
    if (stars >= 1000) {
      return `${(stars / 1000).toFixed(1)}k`
    }
    return stars.toString()
  }

  return (
    <Card className="bg-zinc-800/70 border-green-500/20 hover:border-green-500/50 transition-all duration-300 overflow-hidden group cursor-pointer backdrop-blur-sm hover:shadow-lg hover:shadow-green-500/10 rounded-none p-3">
      <Link href={`/resource/${resource.id}`}>
        {/* Image */}
        <div className="relative h-48 bg-zinc-900/70 overflow-hidden">
          <Image
            src={getPlaceholderImage(resource.name, resource.category) || "/placeholder.svg"}
            alt={`${resource.name} preview`}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
          {/* Hardware overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-900/90 via-transparent to-transparent" />

          {/* Overlay badges */}
          <div className="absolute top-3 right-3 flex gap-2">
            {resource.stars && (
              <Badge
                variant="secondary"
                className="bg-zinc-900/90 text-green-400 text-xs backdrop-blur-sm font-mono rounded-none"
              >
                <Star className="h-3 w-3 mr-1 fill-current" />
                {formatStars(resource.stars)}
              </Badge>
            )}
            {resource.commercial && (
              <Badge
                variant="secondary"
                className="bg-yellow-900/90 text-yellow-300 text-xs backdrop-blur-sm font-mono rounded-none"
              >
                COMMERCIAL
              </Badge>
            )}
            {resource.unmaintained && (
              <Badge
                variant="secondary"
                className="bg-red-900/90 text-red-300 text-xs flex items-center backdrop-blur-sm font-mono rounded-none"
              >
                <Skull className="h-3 w-3 mr-1" />
                RIP
              </Badge>
            )}
          </div>
        </div>

        <CardHeader className="pb-3">
          <div className="flex items-start justify-between mb-2">
            <CardTitle className="text-lg font-mono text-green-400 group-hover:text-green-300 transition-colors">
              {resource.name.toUpperCase()}
            </CardTitle>
            <div className="flex items-center gap-2">
              {resource.githubUrl && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-6 w-6 p-0 text-zinc-400 hover:text-green-400 rounded-none bg-transparent"
                  onClick={(e) => {
                    e.preventDefault()
                    window.open(resource.githubUrl, "_blank")
                  }}
                >
                  <Github className="h-3 w-3" />
                </Button>
              )}
              <Button
                variant="ghost"
                size="sm"
                className="h-6 w-6 p-0 text-zinc-400 hover:text-green-400 rounded-none bg-transparent"
                onClick={(e) => {
                  e.preventDefault()
                  window.open(resource.url, "_blank")
                }}
              >
                <ExternalLink className="h-3 w-3" />
              </Button>
            </div>
          </div>
          <div className="flex gap-2 mb-3 flex-wrap">
            <Badge
              variant="outline"
              className="border-green-500/30 text-green-400 text-xs font-mono rounded-none bg-transparent"
            >
              {resource.language.toUpperCase()}
            </Badge>
            <Badge variant="secondary" className="bg-zinc-700/70 text-zinc-300 text-xs font-mono rounded-none">
              {resource.category.replace(" ", "_").toUpperCase()}
            </Badge>
          </div>
          <CardDescription className="text-zinc-400 text-sm leading-relaxed line-clamp-3 font-mono">
            {resource.description}
          </CardDescription>
        </CardHeader>
      </Link>
    </Card>
  )
}
