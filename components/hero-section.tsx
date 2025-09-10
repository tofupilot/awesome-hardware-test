import Link from "next/link"
import { CircuitBoard } from "lucide-react"

export function HeroSection() {
  return (
    <section className="bg-gradient-to-r from-zinc-900 via-zinc-800 to-zinc-900 border-b border-green-500/20 relative">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl relative z-10">
          <div className="flex items-center mb-6">
            <div className="relative mr-4 flex-shrink-0">
              <CircuitBoard className="h-12 w-12 text-green-400" />
            </div>
            <div className="flex flex-col justify-center">
              <h1 className="text-4xl font-bold mb-2 font-mono">
                <span className="text-green-400">AWESOME</span>
                <span className="text-white mx-2">HARDWARE</span>
                <span className="text-green-400">TEST</span>
              </h1>
            </div>
          </div>

          <p className="text-lg text-zinc-300 mb-6 leading-relaxed">
            A curated collection of hardware testing frameworks, instruments, and tools. From embedded systems to
            semiconductor fabrication, this repository contains everything needed for professional hardware validation
            and quality assurance.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-sm mb-8">
            <div className="bg-zinc-800/70 border border-green-500/20 rounded-none p-3 font-mono">
              <div className="text-green-400 text-xs">FRAMEWORKS</div>
              <div className="text-white font-bold">12+</div>
            </div>
            <div className="bg-zinc-800/70 border border-green-500/20 rounded-none p-3 font-mono">
              <div className="text-green-400 text-xs">LANGUAGES</div>
              <div className="text-white font-bold">8+</div>
            </div>
            <div className="bg-zinc-800/70 border border-green-500/20 rounded-none p-3 font-mono">
              <div className="text-green-400 text-xs">INSTRUMENTS</div>
              <div className="text-white font-bold">15+</div>
            </div>
            <div className="bg-zinc-800/70 border border-green-500/20 rounded-none p-3 font-mono">
              <div className="text-green-400 text-xs">PLATFORMS</div>
              <div className="text-white font-bold">ALL</div>
            </div>
            <div className="bg-zinc-800/70 border border-green-500/20 rounded-none p-3 font-mono">
              <div className="text-green-400 text-xs">STATUS</div>
              <div className="text-green-400 font-bold">LIVE</div>
            </div>
          </div>

          <p className="text-sm text-zinc-500 font-mono">
            [CREATED BY:{" "}
            <Link href="https://upview.com" className="text-green-400 hover:underline" target="_blank">
              UPVIEW
            </Link>
            ] [INSPIRED BY:{" "}
            <Link href="https://github.com/sschaetz" className="text-green-400 hover:underline" target="_blank">
              SSCHAETZ
            </Link>
            ]
          </p>
        </div>
      </div>
    </section>
  )
}
