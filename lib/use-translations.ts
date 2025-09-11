'use client';

import { usePathname } from 'next/navigation';
import { translations, type Locale } from './translations';

export function useTranslations() {
  const pathname = usePathname();
  const locale = (pathname.split('/')[1] || 'en') as Locale;
  
  const t = (key: string, params?: Record<string, any>) => {
    const keys = key.split('.');
    let value: any = translations[locale];
    
    for (const k of keys) {
      value = value?.[k];
    }
    
    if (typeof value === 'function' && params) {
      return value(params.count || params);
    }
    
    return value || key;
  };
  
  return { t, locale };
}