import Link from "next/link"

export function SiteFooter() {
  return (
    <footer className="mt-16 pt-8 border-t border-green-500/20">
      <div className="flex flex-col sm:flex-row justify-between items-center text-sm text-zinc-500 font-mono">
        <p>
          [MAINTAINER:{" "}
          <Link href="https://github.com/sschaetz" className="text-green-400 hover:underline" target="_blank">
            SSCHAETZ
          </Link>
          ]
        </p>
        <div className="flex space-x-4 mt-2 sm:mt-0">
          <Link
            href="https://github.com/sschaetz/awesome-hardware-test/blob/main/LICENSE"
            className="hover:text-green-400"
            target="_blank"
          >
            [LICENSE: GPL-3.0]
          </Link>
          <Link
            href="https://github.com/sschaetz/awesome-hardware-test/issues"
            className="hover:text-green-400"
            target="_blank"
          >
            [ISSUES]
          </Link>
          <Link
            href="https://github.com/sschaetz/awesome-hardware-test/pulls"
            className="hover:text-green-400"
            target="_blank"
          >
            [PULL_REQUESTS]
          </Link>
        </div>
      </div>
    </footer>
  )
}
