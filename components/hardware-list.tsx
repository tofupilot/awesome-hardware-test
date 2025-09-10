'use client';

import { useState, useMemo } from 'react';
import { useTranslations } from '@/lib/use-translations';
import { hardwareData, categories, type HardwareCategory, searchHardware, getItemsByCategory } from '@/lib/hardware-data';
import { HardwareCard } from '@/components/hardware-card';
import { LanguageSwitcher } from '@/components/language-switcher';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Search, Filter } from 'lucide-react';

export function HardwareList() {
  const { t } = useTranslations();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<HardwareCategory | 'all'>('all');
  const [activeTab, setActiveTab] = useState('all');

  const filteredItems = useMemo(() => {
    let items = hardwareData;

    // Apply search filter
    if (searchQuery.trim()) {
      items = searchHardware(searchQuery);
    }

    // Apply category filter
    if (selectedCategory !== 'all') {
      items = items.filter(item => item.category === selectedCategory);
    }

    return items;
  }, [searchQuery, selectedCategory]);

  const itemsByCategory = useMemo(() => {
    const result: Record<string, typeof hardwareData> = { all: filteredItems };
    categories.forEach(category => {
      result[category] = filteredItems.filter(item => item.category === category);
    });
    return result;
  }, [filteredItems]);

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Language Switcher */}
      <div className="flex justify-end mb-4">
        <LanguageSwitcher />
      </div>
      
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-4">{t('title')}</h1>
        <p className="text-xl text-muted-foreground mb-6">
          {t('description')}
        </p>
        
        {/* Search and Filter */}
        <div className="flex flex-col sm:flex-row gap-4 max-w-2xl mx-auto mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder={t('search.placeholder')}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <Select value={selectedCategory} onValueChange={(value) => setSelectedCategory(value as HardwareCategory | 'all')}>
            <SelectTrigger className="w-full sm:w-[180px]">
              <Filter className="h-4 w-4 mr-2" />
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">{t('categories.all')}</SelectItem>
              {categories.map((category) => (
                <SelectItem key={category} value={category}>
                  {t(`categories.${category.toLowerCase()}`)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Results count */}
        <div className="flex justify-center mb-6">
          <Badge variant="outline" className="text-sm">
            {t('search.results', { count: filteredItems.length })}
          </Badge>
        </div>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4 lg:grid-cols-6 xl:grid-cols-12 mb-6">
          <TabsTrigger value="all" className="text-xs">
            {t('tabs.all', { count: itemsByCategory.all.length })}
          </TabsTrigger>
          {categories.slice(0, 11).map((category) => (
            <TabsTrigger key={category} value={category} className="text-xs">
              {t(`categories.${category.toLowerCase()}`)} ({itemsByCategory[category].length})
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value="all">
          <HardwareGrid items={itemsByCategory.all} />
        </TabsContent>
        
        {categories.map((category) => (
          <TabsContent key={category} value={category}>
            <HardwareGrid items={itemsByCategory[category]} />
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}

function HardwareGrid({ items }: { items: typeof hardwareData }) {
  const { t } = useTranslations();
  
  if (items.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-lg text-muted-foreground">{t('hardware.noItems')}</p>
        <p className="text-sm text-muted-foreground mt-2">
          {t('hardware.adjustFilters')}
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {items.map((item) => (
        <HardwareCard key={item.id} item={item} />
      ))}
    </div>
  );
}