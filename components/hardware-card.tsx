'use client';

import { useTranslations } from 'next-intl';
import { HardwareItem } from '@/lib/hardware-data';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { ExternalLink, Zap } from 'lucide-react';

interface HardwareCardProps {
  item: HardwareItem;
}

export function HardwareCard({ item }: HardwareCardProps) {
  const t = useTranslations();
  
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
        
        {item.priceRange && (
          <div className="text-sm text-muted-foreground">
            ${item.priceRange.min} - ${item.priceRange.max} {item.priceRange.currency}
          </div>
        )}
      </CardHeader>
      
      <CardContent className="flex-1 flex flex-col">
        {/* Specifications */}
        <div className="space-y-2 mb-4">
          <h4 className="text-sm font-medium">{t('hardware.specifications')}</h4>
          <div className="grid grid-cols-1 gap-1">
            {Object.entries(item.specifications).slice(0, 4).map(([key, value]) => (
              <div key={key} className="flex justify-between text-sm">
                <span className="text-muted-foreground">{key}:</span>
                <span className="font-medium">{value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Test Results */}
        {item.testResults && (
          <div className="mb-4">
            <h4 className="text-sm font-medium mb-2">{t('hardware.testResults')}</h4>
            <div className="flex items-center gap-2">
              <Zap className="h-4 w-4 text-yellow-500" />
              <span className="text-sm">{item.testResults.benchmark}: {item.testResults.score}</span>
            </div>
            {item.testResults.notes && (
              <p className="text-xs text-muted-foreground mt-1">{item.testResults.notes}</p>
            )}
          </div>
        )}

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
          {item.links.official && (
            <Button variant="outline" size="sm" className="w-full" asChild>
              <a href={item.links.official} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="w-4 h-4 mr-2" />
                {t('hardware.officialPage')}
              </a>
            </Button>
          )}
          
          {item.links.reviews && item.links.reviews.length > 0 && (
            <Button variant="outline" size="sm" className="w-full" asChild>
              <a href={item.links.reviews[0]} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="w-4 h-4 mr-2" />
                {t('hardware.reviews')}
              </a>
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}