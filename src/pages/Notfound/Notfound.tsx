import { Link, useLocation } from "react-router"
import { ArrowLeft } from "lucide-react"

export default function Notfound() {
  const { pathname } = useLocation()

  return (
    <div className="min-h-screen bg-paper flex flex-col items-center justify-center px-5 py-16 text-center">
      <p className="kicker text-ink-faint">Error 404</p>

      <h1 className="font-display text-7xl sm:text-8xl text-ink leading-none mt-4">
        Nothing here<span className="text-accent">.</span>
      </h1>

      <p className="text-sm text-ink-soft mt-4 max-w-sm">
        The page you're looking for has moved, or never existed.
      </p>

      <p className="font-mono text-[11px] text-ink-faint mt-3 break-all max-w-sm">
        {pathname}
      </p>

      <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
        <Link
          to="/feed"
          className="inline-flex items-center gap-1.5 bg-ink hover:bg-ink/90 text-paper text-sm font-medium px-5 py-2.5 rounded-xs transition-colors"
        >
          <ArrowLeft size={15} />
          Back to feed
        </Link>
        <Link
          to="/profile"
          className="inline-block text-sm font-medium text-ink-soft hover:text-ink border border-line hover:border-ink px-5 py-2.5 rounded-xs transition-colors"
        >
          Go to profile
        </Link>
      </div>
    </div>
  )
}
