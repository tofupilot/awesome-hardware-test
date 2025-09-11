"use client"

import { Button } from "@/components/ui/button"
import { Copy } from "lucide-react"
import { useState } from "react"

interface CopyButtonProps {
  text: string
  className?: string
}

export function CopyButton({ text, className }: CopyButtonProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  return (
    <Button
      variant="ghost"
      size="sm"
      className={className}
      onClick={handleCopy}
    >
      <Copy className={`h-3 w-3 ${copied ? 'text-green-400' : ''}`} />
    </Button>
  )
}