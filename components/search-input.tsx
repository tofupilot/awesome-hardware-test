"use client"

import { useRouter, usePathname, useSearchParams } from 'next/navigation'
import { useTransition, useEffect, useState } from 'react'
import { Search } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Locale } from '@/lib/translations'
import { useDebouncedCallback } from 'use-debounce'

interface SearchInputProps {
  defaultValue: string
  placeholder: string
  lang: Locale
}

export function SearchInput({ defaultValue, placeholder }: SearchInputProps) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [isPending, startTransition] = useTransition()
  const [mounted, setMounted] = useState(false)
  const [searchValue, setSearchValue] = useState(defaultValue)

  useEffect(() => {
    setMounted(true)
    // Initialize with defaultValue when component mounts
    setSearchValue(defaultValue)
  }, [defaultValue])

  // Debounced function to update URL
  const debouncedUpdateURL = useDebouncedCallback((term: string) => {
    const params = new URLSearchParams(searchParams)
    if (term.trim()) {
      params.set('search', term.trim())
    } else {
      params.delete('search')
    }
    
    startTransition(() => {
      router.replace(`${pathname}?${params.toString()}`)
    })
  }, 300)

  // Handle input changes - update local state immediately, debounce URL updates
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setSearchValue(value)
    debouncedUpdateURL(value)
  }

  // Prevent hydration mismatch by not rendering until mounted
  if (!mounted) {
    return (
      <div className="relative w-full sm:min-w-[250px] sm:flex-shrink-0" suppressHydrationWarning>
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-green-500" />
        <Input
          placeholder={placeholder}
          value=""
          readOnly
          className="pl-10 bg-zinc-800/70 border-green-500/30 text-zinc-100 placeholder-zinc-500 font-mono rounded-none"
          suppressHydrationWarning
        />
      </div>
    )
  }

  return (
    <div className="relative min-w-[250px] flex-shrink-0" suppressHydrationWarning>
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-green-500" />
      <Input
        placeholder={placeholder}
        value={searchValue}
        onChange={handleInputChange}
        className={`pl-10 bg-zinc-800/70 border-green-500/30 text-zinc-100 placeholder-zinc-500 font-mono focus:border-green-500 focus:ring-green-500/20 rounded-none transition-opacity ${
          isPending ? 'opacity-70' : 'opacity-100'
        }`}
        suppressHydrationWarning
      />
    </div>
  )
}