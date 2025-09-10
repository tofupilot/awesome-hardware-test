'use client';

import { useTranslations } from '@/lib/use-translations';
import { HardwareTestResource } from '@/lib/hardware-data';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { ExternalLink, Github, Globe } from 'lucide-react';

interface ResourceCardProps {
  item: HardwareTestResource;
}

export function ResourceCard({ item }: ResourceCardProps) {
  const { t } = useTranslations();
  
  return (
    <Card className="h-full flex flex-col">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="text-lg">{item.name}</CardTitle>
            <CardDescription className="mt-1">{item.description}</CardDescription>
          </div>
          <Badge variant="secondary">{item.category}</Badge>
        </div>
        
        <div className="flex items-center gap-2 mt-2">
          {item.language && (
            <Badge variant="outline" className="text-xs">
              {item.language}
            </Badge>
          )}
          {item.isCommercial ? (
            <Badge variant="destructive" className="text-xs">
              {t('resource.commercial')}
            </Badge>
          ) : (
            <Badge variant="default" className="text-xs">
              {t('resource.openSource')}
            </Badge>
          )}
        </div>
      </CardHeader>
      
      <CardContent className="flex-1 flex flex-col">
        {/* Tags */}
        <div className="mb-4">
          <div className="flex flex-wrap gap-1">
            {item.tags.map((tag) => (
              <Badge key={tag} variant="outline" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>
        </div>

        <Separator className="mb-4" />

        {/* Links */}
        <div className="mt-auto space-y-2">
          {item.links.github && (
            <Button variant="outline" size="sm" className="w-full" asChild>
              <a href={item.links.github} target="_blank" rel="noopener noreferrer">
                <Github className="w-4 h-4 mr-2" />
                {t('resource.github')}
              </a>
            </Button>
          )}
          
          {item.links.website && (
            <Button variant="outline" size="sm" className="w-full" asChild>
              <a href={item.links.website} target="_blank" rel="noopener noreferrer">
                <Globe className="w-4 h-4 mr-2" />
                {t('resource.website')}
              </a>
            </Button>
          )}

          {item.links.docs && (
            <Button variant="outline" size="sm" className="w-full" asChild>
              <a href={item.links.docs} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="w-4 h-4 mr-2" />
                {t('resource.documentation')}
              </a>
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}