"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Github, Star, ExternalLink, Skull } from "lucide-react";
import { translations, Locale } from "@/lib/translations";
import { HardwareTestResource } from "@/lib/hardware-data";
import { ImagePlaceholder } from "@/components/image-placeholder";

interface ResourceCardProps {
  resource: HardwareTestResource;
  lang: Locale;
  starCount?: number;
  lastRelease?: string;
  contributors?: number;
}

export function ResourceCard({ resource, lang, starCount, lastRelease, contributors }: ResourceCardProps) {
  const t = translations[lang] || translations['en'];  // Fallback to English

  const formatStars = (stars?: number) => {
    if (!stars) return null;
    if (stars >= 1000) {
      return `${(stars / 1000).toFixed(1)}k`;
    }
    return stars.toString();
  };

  // Only use fetched star count from GitHub API, no fallback to hardcoded values
  const displayStars = starCount;
  const formattedStars = formatStars(displayStars);

  return (
    <Card className={`${resource.unmaintained ? 'bg-red-900/20 border-red-500/30 hover:border-red-500/50 hover:shadow-red-500/10' : 'bg-zinc-800/70 border-green-500/20 hover:border-green-500/50 hover:shadow-green-500/10'} !py-0 transition-all duration-300 overflow-hidden group cursor-pointer hover:shadow-lg rounded-none`}>
      <Link href={`/${lang}/${resource.id}`}>
        {/* Image */}
        <div className="relative h-48 bg-zinc-900/70 overflow-hidden">
          {resource.image ? (
            <Image
              src={resource.image}
              alt={`${resource.name} preview`}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
            />
          ) : (
            <ImagePlaceholder 
              text={`${resource.name} image coming soon`}
              className="group-hover:scale-105 transition-transform duration-500"
            />
          )}
          {/* Hardware overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-900/90 via-transparent to-transparent" />

          {/* Overlay badges */}
          <div className="absolute top-3 right-3 flex gap-2">
            {resource.unmaintained && (
              <Badge
                variant="secondary"
                className="bg-red-900/90 text-red-300 text-xs flex items-center font-mono rounded-none"
              >
                <Skull className="h-3 w-3 mr-1" />
                {t.resource.badges.rip}
              </Badge>
            )}
            {displayStars && (
              <Badge
                variant="secondary"
                className={`bg-zinc-900/90 ${resource.unmaintained ? 'text-red-400' : 'text-green-400'} text-xs font-mono rounded-none`}
              >
                <Star className="h-3 w-3 mr-1" />
                {formattedStars}
              </Badge>
            )}
            {resource.isCommercial && (
              <Badge
                variant="secondary"
                className="bg-yellow-900/90 text-yellow-300 text-xs font-mono rounded-none"
              >
                {t.resource.badges.commercial}
              </Badge>
            )}
          </div>
        </div>

        <CardHeader className="p-4">
          <div className="flex items-start justify-between mb-2">
            <CardTitle className={`text-lg font-mono ${resource.unmaintained ? 'text-red-400 group-hover:text-red-300' : 'text-green-400 group-hover:text-green-300'} transition-colors`}>
              {resource.name.toUpperCase()}
            </CardTitle>
            <div className="flex items-center gap-2">
              {resource.links?.github && (
                <Link
                  href={resource.links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`h-8 w-8 flex items-center justify-center text-zinc-400 ${resource.unmaintained ? 'hover:text-red-400 hover:bg-red-900/20' : 'hover:text-green-400 hover:bg-green-900/20'} transition-all duration-200 rounded-none hover:shadow-sm`}
                  onClick={(e) => e.stopPropagation()}
                >
                  <Github className="h-4 w-4" />
                </Link>
              )}
              {resource.links?.website && (
                <Link
                  href={resource.links.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`h-8 w-8 flex items-center justify-center text-zinc-400 ${resource.unmaintained ? 'hover:text-red-400 hover:bg-red-900/20' : 'hover:text-green-400 hover:bg-green-900/20'} transition-all duration-200 rounded-none hover:shadow-sm`}
                  onClick={(e) => e.stopPropagation()}
                >
                  <ExternalLink className="h-4 w-4" />
                </Link>
              )}
            </div>
          </div>
          <div className="flex gap-2 mb-3 flex-wrap">
            {resource.language && (
              <Badge
                variant="outline"
                className={`${resource.unmaintained ? 'border-red-500/30 text-red-400' : 'border-green-500/30 text-green-400'} text-xs font-mono rounded-none bg-transparent`}
              >
                {resource.language.toUpperCase()}
              </Badge>
            )}
            <Badge
              variant="secondary"
              className="bg-zinc-700/70 text-zinc-300 text-xs font-mono rounded-none"
            >
              {resource.category.replace(" ", "_").toUpperCase()}
            </Badge>
          </div>
          <CardDescription className="text-zinc-400 text-sm leading-relaxed line-clamp-3 font-mono">
            {typeof resource.description === 'object' ? resource.description[lang] : resource.description}
          </CardDescription>
        </CardHeader>
      </Link>
    </Card>
  );
}
