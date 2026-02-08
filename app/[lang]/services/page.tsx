import { mockServices, mockCategories, getServiceName, getServiceDescription } from "@/lib/mock-data"
import { getTranslation } from "@/lib/i18n"
import Link from "next/link"

export const metadata = {
  title: "Services - Luxe Salon",
  description: "Browse all our professional hair and beauty services with pricing",
}

export default async function ServicesPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params
  const t = (key: string) => getTranslation(lang, key)

  return (
    <div className="px-4 py-16">
      <div className="container mx-auto">
        <div className="mb-16">
          <h1 className="text-5xl font-bold text-foreground">{t("services.title")}</h1>
          <p className="mt-4 text-lg text-muted-foreground">
            {t("services.description")}
          </p>
        </div>

        <div className="mb-12">
          <h2 className="mb-6 text-2xl font-bold text-foreground">{t("services.categoriesTitle")}</h2>
          <div className="flex flex-wrap gap-3">
            <button className="rounded border-2 border-accent bg-transparent px-6 py-2 font-medium text-foreground transition hover:bg-accent hover:text-accent-foreground">
              {t("services.allBtn")}
            </button>
            {mockCategories.map((cat) => {
              const langKey = `name_${lang}` as keyof typeof cat
              return (
                <button
                  key={cat.id}
                  className="rounded border border-border bg-card px-6 py-2 font-medium text-foreground transition hover:border-accent"
                >
                  {cat[langKey] || cat.name_en}
                </button>
              )
            })}
          </div>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {mockServices.map((service) => (
            <Link
              key={service.id}
              href={`/${lang}/services/${service.id}`}
              className="group rounded border border-border bg-card p-8 transition hover:border-accent hover:shadow-xl"
            >
              <div className="mb-4 flex h-40 items-center justify-center rounded bg-secondary">
                <span className="text-muted-foreground">Service Image</span>
              </div>
              <h3 className="text-2xl font-bold text-foreground transition group-hover:text-accent">
                {getServiceName(service, lang)}
              </h3>
              <p className="mt-3 text-muted-foreground">{getServiceDescription(service, lang)}</p>
              <div className="mt-6 flex items-end justify-between">
                <span className="text-3xl font-bold text-accent">${service.price}</span>
                <span className="text-sm text-muted-foreground">{service.duration} min</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
