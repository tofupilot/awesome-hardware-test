'use client';

import { useState } from 'react';
import { useTranslations } from '@/lib/use-translations';
import { hardwareTestData, categories, type TestCategory, type HardwareTestResource } from '@/lib/hardware-data';
import { LanguageSwitcher } from '@/components/language-switcher';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

interface CategorySectionProps {
  category: TestCategory;
  resources: HardwareTestResource[];
}

function CategorySection({ category, resources }: CategorySectionProps) {
  if (resources.length === 0) return null;

  return (
    <div className="mb-10">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6 pb-2 border-b border-gray-200 dark:border-gray-700">
        {category}
      </h2>
      
      <ul className="list-none space-y-2 ml-0 pl-0">
        {resources.map((resource) => (
          <li key={resource.id} className="flex items-start text-base leading-6">
            <span className="text-gray-600 dark:text-gray-400 mr-3 mt-1.5 text-sm">•</span>
            <div className="flex-1 min-w-0">
              <a 
                href={resource.links.github || resource.links.website || '#'}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 dark:text-blue-400 hover:underline font-semibold"
              >
                {resource.name}
              </a>
              <span className="text-gray-900 dark:text-gray-100">
                {' '}- {typeof resource.description === 'object' ? resource.description.en : resource.description}
              </span>
              {resource.isCommercial && (
                <span className="text-gray-600 dark:text-gray-400 italic">
                  {' '}(Commercial)
                </span>
              )}
              {resource.language && (
                <span className="text-gray-600 dark:text-gray-400 font-mono text-sm">
                  {' '}[{resource.language}]
                </span>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function GitHubStyle() {
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
    <div className="min-h-screen bg-white dark:bg-gray-900 font-[-apple-system,BlinkMacSystemFont,Segoe_UI,Helvetica,Arial,sans-serif]">
      {/* GitHub-style navigation bar */}
      <div className="bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 py-2">
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-600 dark:text-gray-400">
              <span className="font-semibold text-blue-600 dark:text-blue-400">sschaetz</span>
              <span className="mx-1">/</span>
              <span className="font-semibold text-blue-600 dark:text-blue-400">awesome-hardware-test</span>
            </div>
            <LanguageSwitcher />
          </div>
        </div>
      </div>

      {/* Main content area */}
      <div className="max-w-7xl mx-auto">
        <div className="lg:flex">
          {/* Left sidebar (for larger screens) - empty to match GitHub */}
          <div className="hidden lg:block w-64 p-4"></div>
          
          {/* Main content */}
          <div className="flex-1 p-4">
            {/* Repository header */}
            <div className="mb-6">
              <div className="flex items-center mb-2">
                <h1 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mr-2">
                  awesome-hardware-test
                </h1>
                <span className="text-2xl">🤖</span>
              </div>
              
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                A curated list of awesome hardware testing projects and resources
              </p>
              
              {/* Search */}
              <div className="max-w-sm mb-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder="SEARCH_RESOURCES"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-sm"
                  />
                </div>
                {searchQuery && (
                  <div className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                    {totalResources} resources found
                  </div>
                )}
              </div>
            </div>

            {/* README content */}
            <div className="bg-white dark:bg-gray-900 rounded-md border border-gray-200 dark:border-gray-700">
              <div className="p-6">
                <div className="markdown-body">
          {/* Table of Contents style */}
          <div className="mb-8 p-4 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-3 mt-0">Contents</h3>
            <ul className="list-none space-y-1 m-0 p-0">
              {categories.map((category) => {
                const count = categorizedResources[category].length;
                if (count === 0) return null;
                return (
                  <li key={category} className="m-0 p-0">
                    <a 
                      href={`#${category.toLowerCase().replace(/\s+/g, '-').replace(/&/g, '')}`}
                      className="text-blue-600 dark:text-blue-400 hover:underline text-sm no-underline"
                    >
                      {category} ({count})
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Categories */}
          {categories.map((category) => (
            <div 
              key={category} 
              id={category.toLowerCase().replace(/\s+/g, '-').replace(/&/g, '')}
              className="mb-10"
            >
              <CategorySection
                category={category}
                resources={categorizedResources[category]}
              />
            </div>
          ))}

          {totalResources === 0 && searchQuery && (
            <div className="text-center py-12">
              <p className="text-lg text-gray-500 dark:text-gray-400">
                No resources found matching "{searchQuery}"
              </p>
              <p className="text-sm text-gray-400 dark:text-gray-500 mt-2">
                Try adjusting your search terms
              </p>
            </div>
          )}

                  {/* GitHub-style footer */}
                  <div className="mt-16 pt-8 border-t border-gray-200 dark:border-gray-700">
                    <div className="text-center text-sm text-gray-600 dark:text-gray-400">
                      <p className="mb-2">
                        Inspired by{' '}
                        <a 
                          href="https://github.com/tofupilot/awesome-hardware-test" 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-blue-600 dark:text-blue-400 hover:underline"
                        >
                          sschaetz/awesome-hardware-test
                        </a>
                      </p>
                      <p>
                        Found this useful? Give it a ⭐️ on GitHub!
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}