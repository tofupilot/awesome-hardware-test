import { ImageOff } from "lucide-react"

interface ImagePlaceholderProps {
  text?: string
  className?: string
}

export function ImagePlaceholder({ 
  text = "No image available yet", 
  className = "" 
}: ImagePlaceholderProps) {
  return (
    <div className={`flex flex-col items-center justify-center h-full w-full bg-zinc-900/50 border border-zinc-700/50 ${className}`}>
      <div className="text-zinc-600 mb-2">
        <ImageOff className="h-8 w-8" />
      </div>
      <p className="text-zinc-500 text-sm font-mono text-center px-4">
        {text.toUpperCase()}
      </p>
    </div>
  )
}