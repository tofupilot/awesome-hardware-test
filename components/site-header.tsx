import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Github, CircuitBoard, Plus } from "lucide-react"

interface SiteHeaderProps {
  totalResources: number
}

export function SiteHeader({ totalResources }: SiteHeaderProps) {
  return (
    <header className="border-b border-green-500/20 bg-zinc-900/98 backdrop-blur sticky top-0 z-50 relative">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
          <div className="relative">
            <CircuitBoard className="h-6 w-6 text-green-400" />
            <div className="absolute -top-1 -right-1 w-2 h-2 bg-green-400 rounded-none" />
          </div>
          <span className="text-lg font-mono font-semibold text-green-400">awesome-hardware-test</span>
        </Link>
        <div className="flex items-center space-x-4">
          <Button
            variant="outline"
            size="sm"
            className="border-green-500/50 hover:bg-green-500/10 text-green-400 hover:text-green-300 font-mono rounded-none h-8 bg-transparent"
            asChild
          >
            <Link href="https://github.com/sschaetz/awesome-hardware-test/issues/new" target="_blank">
              <Plus className="h-4 w-4 mr-2" />
              Contribute
            </Link>
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="border-green-500/50 hover:bg-green-500/10 text-green-400 hover:text-green-300 font-mono rounded-none h-8 bg-transparent"
            asChild
          >
            <Link href="https://github.com/sschaetz/awesome-hardware-test" target="_blank">
              <Github className="h-4 w-4 mr-2" />
              GitHub
            </Link>
          </Button>
        </div>
      </div>
    </header>
  )
}
