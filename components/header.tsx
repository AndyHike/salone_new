"use client"

import { useState, useTransition } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { getTranslation } from "@/lib/i18n"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const pathname = usePathname()
  const router = useRouter()
  const [isPending, startTransition] = useTransition()

  const currentLang = pathname.split("/")[1] || "en"
  const basePath = pathname.replace(`/${currentLang}`, "")

  const t = (key: string) => getTranslation(currentLang, key)

  const navItems = [
    { label: t("nav.home"), href: "" },
    { label: t("nav.services"), href: "/services" },
    { label: t("nav.gallery"), href: "/gallery" },
    { label: t("nav.booking"), href: "/booking" },
    { label: t("nav.contact"), href: "/contact" },
  ]

  const getNavHref = (href: string) => {
    return `/${currentLang}${href}`
  }

  const handleLangChange = (lang: string) => {
    startTransition(() => {
      router.push(`/${lang}${basePath}`)
    })
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <nav className="container mx-auto flex items-center justify-between px-4 py-4 md:px-6">
        <Link href={`/${currentLang}`} className="font-serif text-2xl font-bold tracking-tight text-accent">
          Luxe
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={getNavHref(item.href)}
              className="text-sm font-medium text-foreground transition-colors hover:text-accent"
            >
              {item.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden gap-2 sm:flex">
            {["en", "uk", "cs"].map((lang) => (
              <button
                key={lang}
                onClick={() => handleLangChange(lang)}
                disabled={isPending}
                className={`text-xs font-medium uppercase transition-colors ${
                  currentLang === lang
                    ? "text-accent font-bold"
                    : "text-muted-foreground hover:text-accent"
                } ${isPending ? "opacity-60 cursor-wait" : ""}`}
              >
                {lang}
              </button>
            ))}
          </div>

          <button
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </nav>

      {isMenuOpen && (
        <div className="border-t border-border bg-card md:hidden">
          <div className="flex flex-col gap-4 px-4 py-4">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={getNavHref(item.href)}
                className="text-sm font-medium text-foreground transition-colors hover:text-accent"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  )
}
