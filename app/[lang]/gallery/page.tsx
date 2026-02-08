import { mockGallery } from "@/lib/mock-data"
import { getTranslation } from "@/lib/i18n"

export const metadata = {
  title: "Gallery - Luxe Salon",
  description: "View our beautiful work and professional results",
}

export default async function GalleryPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params
  const t = (key: string) => getTranslation(lang, key)
  return (
    <div className="px-4 py-16">
      <div className="container mx-auto">
        <div className="mb-16 text-center">
          <h1 className="text-5xl font-bold text-foreground">{t("gallery.title")}</h1>
          <p className="mt-4 text-lg text-muted-foreground">
            {t("gallery.description")}
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {mockGallery.map((item) => (
            <div
              key={item.id}
              className="group relative aspect-square cursor-pointer overflow-hidden rounded border border-border bg-secondary"
            >
              <div className="flex h-full items-center justify-center bg-gradient-to-br from-secondary to-muted">
                <span className="text-center text-muted-foreground">
                  <span className="mb-2 block text-sm">Gallery Image</span>
                  <span className="block text-xs">{item.title}</span>
                </span>
              </div>

              <div className="absolute inset-0 flex items-center justify-center bg-foreground/60 opacity-0 transition group-hover:opacity-100">
                <div className="text-center text-background">
                  <h3 className="mb-2 text-lg font-bold">{item.title}</h3>
                  <p className="text-sm opacity-80">{item.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {mockGallery.length === 0 && (
          <div className="py-24 text-center">
            <p className="text-lg text-muted-foreground">
              {t("gallery.placeholder")}
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
