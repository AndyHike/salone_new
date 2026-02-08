import { mockServices, getServiceName, getServiceDescription } from "@/lib/mock-data"
import { getTranslation } from "@/lib/i18n"
import Link from "next/link"

export const metadata = {
  title: "Service Details - Luxe Salon",
  description: "Detailed information about our professional services",
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ lang: string; id: string }>
}) {
  const { lang, id } = await params
  const t = (key: string) => getTranslation(lang, key)
  const service = mockServices.find((s) => s.id === Number(id))

  if (!service) {
    return (
      <div className="px-4 py-16">
        <div className="container mx-auto text-center">
          <h1 className="text-3xl font-bold text-foreground">Service not found</h1>
          <Link href={`/${lang}/services`} className="mt-4 inline-block text-accent hover:underline">
            Back to Services
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="px-4 py-16">
      <div className="container mx-auto max-w-4xl">
        <Link
          href={`/${lang}/services`}
          className="inline-block mb-8 text-accent hover:underline font-medium"
        >
          ← {t("serviceDetail.backBtn")}
        </Link>

        <div className="mb-12 h-96 bg-secondary rounded flex items-center justify-center border border-border">
          <span className="text-muted-foreground text-xl">Service Image</span>
        </div>

        <div className="grid gap-12 md:grid-cols-3">
          <div className="md:col-span-2">
            <h1 className="font-serif text-5xl font-bold text-foreground">{getServiceName(service, lang)}</h1>
            <p className="mt-6 text-lg text-muted-foreground leading-relaxed">{getServiceDescription(service, lang)}</p>

            <div className="mt-12">
              <h2 className="font-serif text-2xl font-bold text-foreground mb-6">{t("serviceDetail.whatToExpect")}</h2>
              <ul className="space-y-4">
                <li className="flex gap-3">
                  <span className="text-accent font-bold">✓</span>
                  <span className="text-foreground">{t("serviceDetail.consultation")}</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-accent font-bold">✓</span>
                  <span className="text-foreground">{t("serviceDetail.premium")}</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-accent font-bold">✓</span>
                  <span className="text-foreground">{t("serviceDetail.relaxing")}</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-accent font-bold">✓</span>
                  <span className="text-foreground">{t("serviceDetail.aftercare")}</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="rounded border border-border bg-card p-8 h-fit">
            <div className="mb-8">
              <p className="text-sm text-muted-foreground uppercase tracking-wide">{t("serviceDetail.startingPrice")}</p>
              <p className="font-serif text-4xl font-bold text-accent mt-2">${service.price}</p>
            </div>

            <div className="mb-8 pb-8 border-b border-border">
              <p className="text-sm text-muted-foreground uppercase tracking-wide">{t("serviceDetail.duration")}</p>
              <p className="font-serif text-2xl font-bold text-foreground mt-2">{service.duration} {lang === "uk" ? "хвилин" : lang === "cs" ? "minut" : "minutes"}</p>
            </div>

            <Link
              href={`/${lang}/booking?service=${service.id}`}
              className="block w-full rounded bg-accent text-accent-foreground py-4 text-center font-bold text-lg hover:opacity-90 transition mb-4"
            >
              {t("serviceDetail.bookBtn")}
            </Link>

            <button className="w-full rounded border border-foreground bg-transparent text-foreground py-4 font-bold hover:bg-foreground hover:text-background transition">
              {t("serviceDetail.contactBtn")}
            </button>
          </div>
        </div>

        <div className="mt-20">
          <h2 className="font-serif text-3xl font-bold text-foreground mb-8">{t("serviceDetail.gallery")}</h2>
          <div className="grid gap-6 md:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="aspect-square bg-secondary rounded flex items-center justify-center border border-border hover:border-accent transition"
              >
                <span className="text-muted-foreground">Gallery Image {i}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
