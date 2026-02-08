import { mockServices, getServiceName } from "@/lib/mock-data"
import { getTranslation } from "@/lib/i18n"

export const metadata = {
  title: "Book an Appointment - Luxe Salon",
  description: "Schedule your beauty service with us",
}

export default async function BookingPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params
  const t = (key: string) => getTranslation(lang, key)
  return (
    <div className="px-4 py-16">
      <div className="container mx-auto max-w-2xl">
        <div className="mb-12">
          <h1 className="text-5xl font-bold text-foreground">{t("booking.title")}</h1>
          <p className="mt-4 text-lg text-muted-foreground">
            {t("booking.description")}
          </p>
        </div>

        <form className="space-y-6 rounded border border-border bg-card p-8">
          <div>
            <label className="mb-2 block text-sm font-medium text-foreground">{t("booking.name")} {t("booking.required")}</label>
            <input
              type="text"
              className="w-full rounded border border-border bg-background px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent"
              placeholder="John Doe"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-foreground">{t("booking.email")} {t("booking.required")}</label>
            <input
              type="email"
              className="w-full rounded border border-border bg-background px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent"
              placeholder="john@example.com"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-foreground">{t("booking.phone")} {t("booking.required")}</label>
            <input
              type="tel"
              className="w-full rounded border border-border bg-background px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent"
              placeholder="+420 000 000 000"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-foreground">{t("booking.service")} {t("booking.required")}</label>
            <select className="w-full rounded border border-border bg-background px-4 py-3 text-foreground focus:outline-none focus:ring-2 focus:ring-accent">
              <option value="">{t("booking.servicePlaceholder")}</option>
              {mockServices.map((service) => (
                <option key={service.id} value={service.id}>
                  {getServiceName(service, lang)} - ${service.price}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-foreground">{t("booking.date")} {t("booking.required")}</label>
            <input
              type="date"
              className="w-full rounded border border-border bg-background px-4 py-3 text-foreground focus:outline-none focus:ring-2 focus:ring-accent"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-foreground">{t("booking.time")} {t("booking.required")}</label>
            <select className="w-full rounded border border-border bg-background px-4 py-3 text-foreground focus:outline-none focus:ring-2 focus:ring-accent">
              <option value="">{t("booking.timePlaceholder")}</option>
              <option value="09:00">09:00 AM</option>
              <option value="10:00">10:00 AM</option>
              <option value="11:00">11:00 AM</option>
              <option value="12:00">12:00 PM</option>
              <option value="14:00">02:00 PM</option>
              <option value="15:00">03:00 PM</option>
              <option value="16:00">04:00 PM</option>
              <option value="17:00">05:00 PM</option>
            </select>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-foreground">{t("booking.notes")}</label>
            <textarea
              className="w-full rounded border border-border bg-background px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent"
              placeholder={t("booking.notesPlaceholder")}
              rows={4}
            />
          </div>

          <button
            type="submit"
            className="mt-4 w-full rounded bg-accent py-4 text-lg font-bold text-accent-foreground transition hover:opacity-90"
          >
            {t("booking.submit")}
          </button>

          <p className="text-center text-sm text-muted-foreground">
            {t("booking.confirmation")}
          </p>
        </form>
      </div>
    </div>
  )
}
