import Link from "next/link"

export function Footer() {
  return (
    <footer className="border-t border-border bg-card text-card-foreground">
      <div className="container mx-auto px-4 py-12 md:px-6">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div>
            <h3 className="font-serif text-xl font-bold tracking-tight text-accent">Luxe</h3>
            <p className="mt-2 text-sm text-muted-foreground">Modern luxury beauty salon</p>
          </div>

          <div>
            <h4 className="font-serif font-semibold text-foreground">Services</h4>
            <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
              <li><Link href="/services" className="transition-colors hover:text-foreground">All Services</Link></li>
              <li><Link href="/services" className="transition-colors hover:text-foreground">Pricing</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-serif font-semibold text-foreground">Gallery</h4>
            <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
              <li><Link href="/gallery" className="transition-colors hover:text-foreground">See Our Work</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-serif font-semibold text-foreground">Contact</h4>
            <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
              <li><Link href="/contact" className="transition-colors hover:text-foreground">Get in Touch</Link></li>
              <li><Link href="/booking" className="transition-colors hover:text-foreground">Book Now</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-8 border-t border-border pt-8 text-center text-sm text-muted-foreground">
          <p>2024 Luxe Salon. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
