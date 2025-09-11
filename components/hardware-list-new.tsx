'use client';

import { useState, useMemo } from 'react';
import { useTranslations } from '@/lib/use-translations';
import { hardwareTestData, categories, type TestCategory, searchHardwareTest } from '@/lib/hardware-data';
import { LanguageSwitcher } from '@/components/language-switcher';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Separator } from '@/components/ui/separator';
import { Search, Filter, ChevronDown, Grid3X3, Github, Globe, ExternalLink } from 'lucide-react';

const sortOptions = [
  { name: 'Name A-Z', value: 'name-asc' },
  { name: 'Name Z-A', value: 'name-desc' },
  { name: 'Language', value: 'language' },
];

const filters = [
  {
    id: 'language',
    name: 'Programming Language',
    options: [
      { value: 'python', label: 'Python' },
      { value: 'rust', label: 'Rust' },
      { value: 'c', label: 'C' },
      { value: 'javascript', label: 'JavaScript' },
    ],
  },
  {
    id: 'type',
    name: 'Type',
    options: [
      { value: 'open-source', label: 'Open Source' },
      { value: 'commercial', label: 'Commercial' },
    ],
  },
];

export function HardwareListNew() {
  const { t } = useTranslations();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<TestCategory | 'all'>('all');
  const [sortBy, setSortBy] = useState('name-asc');
  const [selectedFilters, setSelectedFilters] = useState<Record<string, string[]>>({});
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const filteredAndSortedItems = useMemo(() => {
    let items = hardwareTestData;

    // Apply search filter
    if (searchQuery.trim()) {
      items = searchHardwareTest(searchQuery);
    }

    // Apply category filter
    if (selectedCategory !== 'all') {
      items = items.filter(item => item.category === selectedCategory);
    }

    // Apply custom filters
    Object.entries(selectedFilters).forEach(([filterId, values]) => {
      if (values.length > 0) {
        if (filterId === 'language') {
          items = items.filter(item => 
            item.language && values.some(v => 
              item.language!.toLowerCase().includes(v.toLowerCase())
            )
          );
        } else if (filterId === 'type') {
          items = items.filter(item => {
            if (values.includes('commercial') && item.isCommercial) return true;
            if (values.includes('open-source') && !item.isCommercial) return true;
            return false;
          });
        }
      }
    });

    // Apply sorting
    items.sort((a, b) => {
      switch (sortBy) {
        case 'name-asc':
          return a.name.localeCompare(b.name);
        case 'name-desc':
          return b.name.localeCompare(a.name);
        case 'language':
          return (a.language || '').localeCompare(b.language || '');
        default:
          return 0;
      }
    });

    return items;
  }, [searchQuery, selectedCategory, selectedFilters, sortBy]);

  const handleFilterChange = (filterId: string, value: string, checked: boolean) => {
    setSelectedFilters(prev => ({
      ...prev,
      [filterId]: checked 
        ? [...(prev[filterId] || []), value]
        : (prev[filterId] || []).filter(v => v !== value)
    }));
  };

  const FilterSection = ({ filter }: { filter: typeof filters[0] }) => (
    <div className="space-y-3">
      <h3 className="font-medium text-sm">{filter.name}</h3>
      <div className="space-y-2">
        {filter.options.map((option) => (
          <div key={option.value} className="flex items-center space-x-2">
            <Checkbox
              id={`${filter.id}-${option.value}`}
              checked={(selectedFilters[filter.id] || []).includes(option.value)}
              onCheckedChange={(checked) => 
                handleFilterChange(filter.id, option.value, checked as boolean)
              }
            />
            <label 
              htmlFor={`${filter.id}-${option.value}`}
              className="text-sm text-gray-600 cursor-pointer"
            >
              {option.label}
            </label>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-bold">{t('title')}</h1>
            </div>
            <LanguageSwitcher />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-baseline justify-between border-b border-gray-200 pb-6">
          <p className="text-lg text-muted-foreground">{t('description')}</p>
          
          <div className="flex items-center space-x-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm">
                  Sort <ChevronDown className="ml-2 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {sortOptions.map((option) => (
                  <DropdownMenuItem
                    key={option.value}
                    onClick={() => setSortBy(option.value)}
                    className={sortBy === option.value ? "bg-accent" : ""}
                  >
                    {option.name}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <Button variant="outline" size="sm">
              <Grid3X3 className="h-4 w-4" />
            </Button>

            <Sheet open={mobileFiltersOpen} onOpenChange={setMobileFiltersOpen}>
              <SheetTrigger asChild>
                <Button variant="outline" size="sm" className="lg:hidden">
                  <Filter className="h-4 w-4 mr-2" />
                  Filters
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-80">
                <SheetHeader>
                  <SheetTitle>Filters</SheetTitle>
                </SheetHeader>
                <div className="mt-6 space-y-6">
                  {/* Category Filter */}
                  <div className="space-y-3">
                    <h3 className="font-medium text-sm">Category</h3>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="category-all"
                          checked={selectedCategory === 'all'}
                          onCheckedChange={() => setSelectedCategory('all')}
                        />
                        <label htmlFor="category-all" className="text-sm text-gray-600 cursor-pointer">
                          All Categories
                        </label>
                      </div>
                      {categories.map((category) => (
                        <div key={category} className="flex items-center space-x-2">
                          <Checkbox
                            id={`category-${category}`}
                            checked={selectedCategory === category}
                            onCheckedChange={() => setSelectedCategory(category)}
                          />
                          <label 
                            htmlFor={`category-${category}`}
                            className="text-sm text-gray-600 cursor-pointer"
                          >
                            {category}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <Separator />
                  
                  {filters.map((filter) => (
                    <div key={filter.id}>
                      <FilterSection filter={filter} />
                      <Separator className="mt-4" />
                    </div>
                  ))}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4 py-6">
          {/* Desktop Filters */}
          <div className="hidden lg:block">
            <div className="sticky top-4 space-y-6">
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder={t('search.placeholder')}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>

              {/* Category Filter */}
              <div className="space-y-3">
                <h3 className="font-medium text-sm">Category</h3>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="category-all-desktop"
                      checked={selectedCategory === 'all'}
                      onCheckedChange={() => setSelectedCategory('all')}
                    />
                    <label htmlFor="category-all-desktop" className="text-sm text-gray-600 cursor-pointer">
                      All Categories
                    </label>
                  </div>
                  {categories.map((category) => (
                    <div key={category} className="flex items-center space-x-2">
                      <Checkbox
                        id={`category-${category}-desktop`}
                        checked={selectedCategory === category}
                        onCheckedChange={() => setSelectedCategory(category)}
                      />
                      <label 
                        htmlFor={`category-${category}-desktop`}
                        className="text-sm text-gray-600 cursor-pointer"
                      >
                        {category}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              <Separator />

              {filters.map((filter) => (
                <div key={filter.id}>
                  <FilterSection filter={filter} />
                  <Separator className="mt-4" />
                </div>
              ))}
            </div>
          </div>

          {/* Product Grid */}
          <div className="lg:col-span-3">
            {/* Mobile Search */}
            <div className="lg:hidden mb-6">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder={t('search.placeholder')}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            {/* Results count */}
            <div className="flex justify-between items-center mb-6">
              <Badge variant="outline" className="text-sm">
                {t('search.results', { count: filteredAndSortedItems.length })}
              </Badge>
            </div>

            {/* Resource Grid */}
            {filteredAndSortedItems.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-lg text-muted-foreground">{t('resource.noItems')}</p>
                <p className="text-sm text-muted-foreground mt-2">
                  {t('resource.adjustFilters')}
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:gap-x-8">
                {filteredAndSortedItems.map((resource) => (
                  <div key={resource.id} className="group">
                    <div className="aspect-square w-full rounded-lg bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-blue-950 dark:to-indigo-900 flex items-center justify-center mb-4 group-hover:opacity-75 transition-opacity">
                      <div className="text-center p-6">
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
                          {resource.name}
                        </h3>
                        <div className="flex justify-center space-x-2 mb-3">
                          {resource.language && (
                            <Badge variant="secondary" className="text-xs">
                              {resource.language}
                            </Badge>
                          )}
                          <Badge 
                            variant={resource.isCommercial ? "destructive" : "default"} 
                            className="text-xs"
                          >
                            {resource.isCommercial ? t('resource.commercial') : t('resource.openSource')}
                          </Badge>
                        </div>
                        <Badge variant="outline" className="text-xs">
                          {resource.category}
                        </Badge>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <h4 className="font-medium text-gray-900 dark:text-gray-100">
                        {resource.name}
                      </h4>
                      <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2">
                        {typeof resource.description === 'object' ? resource.description.en : resource.description}
                      </p>
                      
                      {/* Tags */}
                      <div className="flex flex-wrap gap-1 mt-2">
                        {resource.tags.slice(0, 3).map((tag) => (
                          <Badge key={tag} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                        {resource.tags.length > 3 && (
                          <Badge variant="outline" className="text-xs">
                            +{resource.tags.length - 3}
                          </Badge>
                        )}
                      </div>

                      {/* Links */}
                      <div className="flex space-x-2 pt-2">
                        {resource.links.github && (
                          <Button size="sm" variant="outline" asChild>
                            <a href={resource.links.github} target="_blank" rel="noopener noreferrer">
                              <Github className="h-3 w-3 mr-1" />
                              GitHub
                            </a>
                          </Button>
                        )}
                        {resource.links.website && (
                          <Button size="sm" variant="outline" asChild>
                            <a href={resource.links.website} target="_blank" rel="noopener noreferrer">
                              <Globe className="h-3 w-3 mr-1" />
                              Website
                            </a>
                          </Button>
                        )}
                        {resource.links.docs && (
                          <Button size="sm" variant="outline" asChild>
                            <a href={resource.links.docs} target="_blank" rel="noopener noreferrer">
                              <ExternalLink className="h-3 w-3 mr-1" />
                              Docs
                            </a>
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}