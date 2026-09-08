import { useEffect, useState } from "react"
import { NavLink } from "react-router"
import { Menu, X } from "lucide-react"

export const sideLinks: { label: string; to: string | null }[] = [
  { label: "Feed", to: "/feed" },
  { label: "My Posts", to: "/myPosts" },
  { label: "Community", to: "/Community" },
  { label: "Saved", to: null },
]

/** Shared list of section links — reused by the desktop rail and the mobile drawer. */
export function SectionLinks({ onNavigate }: { onNavigate?: () => void }) {
  return (
    <nav className="flex flex-col  ">
      {sideLinks.map((link) =>
        link.to ? (
          <NavLink
            key={link.label}
            to={link.to}
            onClick={onNavigate}
            className={({ isActive }) =>
              "text-left text-sm py-2 pl-3 border-l-2 transition-colors " +
              (isActive
                ? "border-ink text-ink font-medium"
                : "border-line text-ink-soft hover:text-ink hover:border-line-strong")
            }
          >
            {link.label}
          </NavLink>
        ) : (
          <button
            key={link.label}
            onClick={onNavigate}
            className="text-left text-sm py-2 pl-3 border-l-2 border-line text-ink-soft hover:text-ink hover:border-line-strong transition-colors"
          >
            {link.label}
          </button>
        )
      )}
    </nav>
  )
}

/**
 * Mobile "Sections" navigation: a hamburger button that opens an off-canvas
 * drawer sliding in from the left. Hidden from lg upwards, where the pages that
 * need it show a static left rail instead.
 */
export default function SectionsDrawer() {
  const [open, setOpen] = useState(false)

  // lock body scroll while the drawer is open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : ""
    return () => {
      document.body.style.overflow = ""
    }
  }, [open])

  // close on Escape
  useEffect(() => {
    if (!open) return
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false)
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [open])

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Open sections menu"
        aria-expanded={open}
        className="lg:hidden shrink-0 -ml-1 p-2 text-ink-soft hover:text-ink transition-colors"
      >
        <Menu size={20} />
      </button>

      {/* overlay */}
      <div
        onClick={() => setOpen(false)}
        className={
          "lg:hidden fixed inset-0 z-50 bg-black/40 transition-opacity duration-200 " +
          (open ? "opacity-100" : "opacity-0 pointer-events-none")
        }
      />

      {/* panel */}
      <aside
        className={
          "lg:hidden fixed inset-y-0 left-0 z-50 w-72 max-w-[80%] bg-paper border-r border-line shadow-xl " +
          "transition-transform duration-200 ease-out " +
          (open ? "translate-x-0" : "-translate-x-full")
        }
      >
        <div className="flex items-center justify-between h-16 px-4 border-b border-line">
          <p className="kicker text-ink-faint">Sections</p>
          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label="Close sections menu"
            className="p-2 -mr-2 text-ink-soft hover:text-ink transition-colors"
          >
            <X size={18} />
          </button>
        </div>
        <div className="p-4 bg-amber-50 h-[100vh]">
          <SectionLinks onNavigate={() => setOpen(false)} />
        </div>
      </aside>
    </>
  )
}
