import { mockServices, getServiceName, getServiceDescription } from "@/lib/mock-data"
import { getTranslation } from "@/lib/i18n"
import Link from "next/link"

export default async function HomePage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params
  const t = (key: string) => getTranslation(lang, key)
  const featuredServices = mockServices.slice(0, 3)

  return (
    <>
      <section className="relative overflow-hidden px-4 py-24 md:py-32">
        <div className="container mx-auto max-w-4xl text-center">
          <p className="mb-4 text-sm font-medium uppercase tracking-widest text-accent">
            {t("home.tagline")}
          </p>
          <h1 className="text-balance text-5xl font-bold tracking-tight text-foreground md:text-7xl">
            {t("home.title")}
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-xl leading-relaxed text-muted-foreground">
            {t("home.description")}
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Link
              href={`/${lang}/booking`}
              className="rounded bg-accent px-8 py-3.5 font-medium text-accent-foreground transition hover:opacity-90"
            >
              {t("home.bookBtn")}
            </Link>
            <Link
              href={`/${lang}/services`}
              className="rounded border border-foreground bg-transparent px-8 py-3.5 font-medium text-foreground transition hover:bg-foreground hover:text-background"
            >
              {t("home.exploreBtn")}
            </Link>
          </div>
        </div>
      </section>

      <section className="border-t border-border px-4 py-24">
        <div className="container mx-auto">
          <div className="mb-16 text-center">
            <h2 className="text-4xl font-bold text-foreground">{t("home.servicesTitle")}</h2>
            <p className="mt-4 text-lg text-muted-foreground">
              {t("home.servicesDesc")}
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {featuredServices.map((service) => (
              <Link
                key={service.id}
                href={`/${lang}/services/${service.id}`}
                className="group rounded border border-border bg-card p-8 transition hover:border-accent hover:shadow-lg"
              >
                <h3 className="text-2xl font-bold text-foreground transition group-hover:text-accent">
                  {getServiceName(service, lang)}
                </h3>
                <p className="mt-3 leading-relaxed text-muted-foreground">{getServiceDescription(service, lang)}</p>
                <div className="mt-6 flex items-end justify-between">
                  <span className="text-2xl font-bold text-accent">${service.price}</span>
                  <span className="text-sm text-muted-foreground">{service.duration} min</span>
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link href={`/${lang}/services`} className="text-lg font-medium text-accent hover:underline">
              {t("home.viewAllBtn")}
            </Link>
          </div>
        </div>
      </section>

      <section className="border-t border-border bg-card px-4 py-24">
        <div className="container mx-auto">
          <div className="mb-16 text-center">
            <h2 className="text-4xl font-bold text-foreground">{t("home.galleryTitle")}</h2>
            <p className="mt-4 text-lg text-muted-foreground">{t("home.galleryDesc")}</p>
          </div>

          <div className="rounded border border-dashed border-border py-16 text-center">
            <p className="text-muted-foreground">{t("home.galleryPlaceholder")}</p>
            <Link href={`/${lang}/gallery`} className="mt-6 inline-block text-lg font-medium text-accent hover:underline">
              {t("home.galleryLink")}
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
