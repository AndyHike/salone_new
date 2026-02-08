import { mockServices } from "@/lib/mock-data"
import Link from "next/link"
import { notFound } from "next/navigation"

export const metadata = {
  title: "Service Details - Luxe Salon",
  description: "Detailed information about our professional services",
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const service = mockServices.find((s) => s.id === Number(id))

  if (!service) {
    notFound()
  }

  return (
    <div className="px-4 py-16">
      <div className="container mx-auto max-w-4xl">
        <Link href="/services" className="mb-8 inline-block font-medium text-accent hover:underline">
          Back to Services
        </Link>

        <div className="mb-12 flex h-96 items-center justify-center rounded border border-border bg-secondary">
          <span className="text-xl text-muted-foreground">Service Image - from Directus</span>
        </div>

        <div className="grid gap-12 md:grid-cols-3">
          <div className="md:col-span-2">
            <h1 className="text-5xl font-bold text-foreground">{service.name}</h1>
            <p className="mt-6 text-lg leading-relaxed text-muted-foreground">{service.description}</p>

            <div className="mt-12">
              <h2 className="mb-6 text-2xl font-bold text-foreground">What to Expect</h2>
              <ul className="space-y-4">
                {[
                  "Professional consultation before service",
                  "Premium quality products and techniques",
                  "Relaxing and comfortable environment",
                  "Expert aftercare recommendations",
                ].map((item) => (
                  <li key={item} className="flex gap-3">
                    <span className="font-bold text-accent">&#10003;</span>
                    <span className="text-foreground">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="h-fit rounded border border-border bg-card p-8">
            <div className="mb-8">
              <p className="text-sm uppercase tracking-wide text-muted-foreground">Starting Price</p>
              <p className="mt-2 text-4xl font-bold text-accent">${service.price}</p>
            </div>

            <div className="mb-8 border-b border-border pb-8">
              <p className="text-sm uppercase tracking-wide text-muted-foreground">Duration</p>
              <p className="mt-2 text-2xl font-bold text-foreground">{service.duration} minutes</p>
            </div>

            <Link
              href={`/booking?service=${service.id}`}
              className="mb-4 block w-full rounded bg-accent py-4 text-center text-lg font-bold text-accent-foreground transition hover:opacity-90"
            >
              Book Now
            </Link>

            <Link
              href="/contact"
              className="block w-full rounded border border-foreground bg-transparent py-4 text-center font-bold text-foreground transition hover:bg-foreground hover:text-background"
            >
              Contact Us
            </Link>
          </div>
        </div>

        <div className="mt-20">
          <h2 className="mb-8 text-3xl font-bold text-foreground">Gallery</h2>
          <div className="grid gap-6 md:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="flex aspect-square items-center justify-center rounded border border-border bg-secondary transition hover:border-accent"
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
