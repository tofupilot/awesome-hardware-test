'use client';

import { useState } from 'react';
import { useTranslations } from '@/lib/use-translations';
import { hardwareTestData, categories, type TestCategory, type HardwareTestResource } from '@/lib/hardware-data';
import { LanguageSwitcher } from '@/components/language-switcher';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Search, Github, Globe, ExternalLink, Star, Users } from 'lucide-react';

interface CategorySectionProps {
  category: TestCategory;
  resources: HardwareTestResource[];
}

function CategorySection({ category, resources }: CategorySectionProps) {
  const { t } = useTranslations();
  
  if (resources.length === 0) return null;

  return (
    <section className="mb-12">
      <div className="flex items-center gap-3 mb-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
          {t(`categories.${category.toLowerCase().replace(/ & /g, ' & ').replace(/ /g, ' ')}`)}
        </h2>
        <Badge variant="secondary" className="text-sm">
          {resources.length}
        </Badge>
      </div>
      
      <div className="space-y-4">
        {resources.map((resource) => (
          <ResourceItem key={resource.id} resource={resource} />
        ))}
      </div>
    </section>
  );
}

function ResourceItem({ resource }: { resource: HardwareTestResource }) {
  const { t } = useTranslations();
  
  return (
    <Card className="group hover:shadow-md transition-shadow duration-200">
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-3 mb-3">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                {resource.name}
              </h3>
              
              <div className="flex items-center gap-2">
                {resource.language && (
                  <Badge variant="outline" className="text-xs font-mono">
                    {resource.language}
                  </Badge>
                )}
                
                {resource.isCommercial ? (
                  <Badge variant="destructive" className="text-xs">
                    {t('resource.commercial')}
                  </Badge>
                ) : (
                  <Badge variant="default" className="text-xs">
                    {t('resource.openSource')}
                  </Badge>
                )}
              </div>
            </div>
            
            <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
              {typeof resource.description === 'object' ? resource.description.en : resource.description}
            </p>
            
            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-4">
              {resource.tags.map((tag) => (
                <Badge key={tag} variant="secondary" className="text-xs bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700">
                  #{tag}
                </Badge>
              ))}
            </div>
          </div>
        </div>
        
        {/* Links */}
        <div className="flex items-center gap-3 pt-4 border-t border-gray-100 dark:border-gray-800">
          {resource.links.github && (
            <Button size="sm" variant="outline" asChild className="h-8">
              <a 
                href={resource.links.github} 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-2"
              >
                <Github className="h-3 w-3" />
                <span className="hidden sm:inline">{t('resource.github')}</span>
              </a>
            </Button>
          )}
          
          {resource.links.website && (
            <Button size="sm" variant="outline" asChild className="h-8">
              <a 
                href={resource.links.website} 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-2"
              >
                <Globe className="h-3 w-3" />
                <span className="hidden sm:inline">{t('resource.website')}</span>
              </a>
            </Button>
          )}
          
          {resource.links.docs && (
            <Button size="sm" variant="outline" asChild className="h-8">
              <a 
                href={resource.links.docs} 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-2"
              >
                <ExternalLink className="h-3 w-3" />
                <span className="hidden sm:inline">{t('resource.documentation')}</span>
              </a>
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

export function AwesomeList() {
  const { t } = useTranslations();
  const [searchQuery, setSearchQuery] = useState('');

  // Group resources by category
  const categorizedResources = categories.reduce((acc, category) => {
    acc[category] = hardwareTestData.filter(resource => {
      const matchesCategory = resource.category === category;
      const description = typeof resource.description === 'object' ? resource.description.en : resource.description;
      const matchesSearch = searchQuery.trim() === '' || 
        resource.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        resource.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (resource.language && resource.language.toLowerCase().includes(searchQuery.toLowerCase()));
      
      return matchesCategory && matchesSearch;
    });
    return acc;
  }, {} as Record<TestCategory, HardwareTestResource[]>);

  const totalResources = hardwareTestData.filter(resource => {
    if (searchQuery.trim() === '') return true;
    const description = typeof resource.description === 'object' ? resource.description.en : resource.description;
    return resource.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
           description.toLowerCase().includes(searchQuery.toLowerCase()) ||
           resource.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase())) ||
           (resource.language && resource.language.toLowerCase().includes(searchQuery.toLowerCase()));
  }).length;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-white dark:bg-gray-950 sticky top-0 z-10">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 flex items-center gap-2">
                {t('title')} 
                <span className="text-2xl">🤖</span>
              </h1>
            </div>
            <LanguageSwitcher />
          </div>
          
          <p className="text-lg text-gray-600 dark:text-gray-300 mt-2">
            {t('description')}
          </p>
          
          {/* Search */}
          <div className="mt-6 max-w-md">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder={t('search.placeholder')}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            {searchQuery && (
              <div className="mt-2">
                <Badge variant="outline" className="text-sm">
                  {t('search.results', { count: totalResources })}
                </Badge>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Stats */}
        <div className="flex items-center gap-6 mb-8 pb-6 border-b border-gray-200 dark:border-gray-800">
          <div className="flex items-center gap-2">
            <Star className="h-5 w-5 text-yellow-500" />
            <span className="text-sm text-gray-600 dark:text-gray-300">
              A curated list of awesome hardware testing projects and resources
            </span>
          </div>
        </div>

        {/* Categories */}
        <div className="space-y-12">
          {categories.map((category) => (
            <CategorySection
              key={category}
              category={category}
              resources={categorizedResources[category]}
            />
          ))}
        </div>

        {totalResources === 0 && searchQuery && (
          <div className="text-center py-12">
            <p className="text-lg text-muted-foreground">{t('resource.noItems')}</p>
            <p className="text-sm text-muted-foreground mt-2">
              {t('resource.adjustFilters')}
            </p>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t bg-gray-50 dark:bg-gray-900 py-8 mt-16">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-300">
            <p>
              Inspired by the original{' '}
              <a 
                href="https://github.com/tofupilot/awesome-hardware-test" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-600 dark:text-blue-400 hover:underline"
              >
                awesome-hardware-test
              </a>{' '}
              repository
            </p>
            <p>
              {totalResources} resources across {categories.length} categories
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}