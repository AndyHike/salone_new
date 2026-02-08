import { getTranslation } from "@/lib/i18n"

export const metadata = {
  title: "Contact Us - Luxe Salon",
  description: "Get in touch with us for any inquiries",
}

export default async function ContactPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params
  const t = (key: string) => getTranslation(lang, key)
  return (
    <div className="px-4 py-16">
      <div className="container mx-auto">
        <div className="mb-16 text-center">
          <h1 className="text-5xl font-bold text-foreground">{t("contact.title")}</h1>
          <p className="mt-4 text-lg text-muted-foreground">
            {t("contact.description")}
          </p>
        </div>

        <div className="grid gap-12 md:grid-cols-2">
          <form className="space-y-6 rounded border border-border bg-card p-8">
            <div>
              <label className="mb-2 block text-sm font-medium text-foreground">{t("contact.name")} {t("contact.required")}</label>
              <input
                type="text"
                className="w-full rounded border border-border bg-background px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent"
                placeholder="John Doe"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-foreground">{t("contact.email")} {t("contact.required")}</label>
              <input
                type="email"
                className="w-full rounded border border-border bg-background px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent"
                placeholder="john@example.com"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-foreground">{t("contact.subject")} {t("contact.required")}</label>
              <input
                type="text"
                className="w-full rounded border border-border bg-background px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent"
                placeholder={t("contact.subjectPlaceholder")}
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-foreground">{t("contact.message")} {t("contact.required")}</label>
              <textarea
                className="w-full rounded border border-border bg-background px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent"
                placeholder={t("contact.messagePlaceholder")}
                rows={6}
              />
            </div>

            <button
              type="submit"
              className="w-full rounded bg-accent py-4 text-lg font-bold text-accent-foreground transition hover:opacity-90"
            >
              {t("contact.send")}
            </button>
          </form>

          <div className="space-y-6">
            <div className="rounded border border-border bg-card p-8">
              <h3 className="mb-4 text-2xl font-bold text-foreground">{t("contact.address")}</h3>
              <p className="text-muted-foreground">
                123 Beauty Street<br />
                Salon City, SC 12345<br />
                Country
              </p>
            </div>

            <div className="rounded border border-border bg-card p-8">
              <h3 className="mb-4 text-2xl font-bold text-foreground">{t("contact.phone")}</h3>
              <p className="text-muted-foreground">
                <a href="tel:+1234567890" className="transition hover:text-accent">+1 (234) 567-890</a>
              </p>
            </div>

            <div className="rounded border border-border bg-card p-8">
              <h3 className="mb-4 text-2xl font-bold text-foreground">{t("contact.hours")}</h3>
              <div className="space-y-2 text-muted-foreground">
                <p>{t("contact.monday_friday")}</p>
                <p>{t("contact.saturday")}</p>
                <p>{t("contact.sunday")}</p>
              </div>
            </div>

            <div className="rounded border border-border bg-card p-8">
              <h3 className="mb-4 text-2xl font-bold text-foreground">{t("contact.emailContact")}</h3>
              <p className="text-muted-foreground">
                <a href="mailto:info@luxesalon.com" className="transition hover:text-accent">info@luxesalon.com</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
