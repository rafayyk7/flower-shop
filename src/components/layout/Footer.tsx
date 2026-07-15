import Link from "next/link";
import { Globe, MessageCircle, AtSign } from "lucide-react";

const footerSections = [
  {
    title: "Shop",
    links: [
      { label: "All Arrangements", href: "/shop" },
      { label: "Roses", href: "/shop?category=roses" },
      { label: "Peonies", href: "/shop?category=peonies" },
      { label: "Wedding Collection", href: "/shop?category=wedding" },
      { label: "Dried & Preserved", href: "/shop?category=dried-flowers" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About Us", href: "/about" },
      { label: "Contact", href: "/contact" },
      { label: "FAQ", href: "/faq" },
      { label: "Careers", href: "/about" },
    ],
  },
  {
    title: "Account",
    links: [
      { label: "My Account", href: "/account" },
      { label: "Order History", href: "/account/orders" },
      { label: "Wishlist", href: "/account/wishlist" },
      { label: "Cart", href: "/cart" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="border-t border-cream bg-white">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-5">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2">
              <span className="text-2xl">🌸</span>
              <span className="font-heading text-xl font-bold text-charcoal">
                Petal <span className="text-dusty-rose">&</span> Bloom
              </span>
            </Link>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-warm-gray">
              Hand-crafted floral artistry for life&apos;s most meaningful moments. Same-day
              delivery available in select cities.
            </p>

            {/* Social */}
            <div className="mt-6 flex gap-3">
              {[AtSign, Globe, MessageCircle].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-cream text-warm-gray transition-all duration-300 hover:border-dusty-rose hover:bg-blush/30 hover:text-dusty-rose"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {footerSections.map((section) => (
            <div key={section.title}>
              <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-charcoal">
                {section.title}
              </h4>
              <ul className="space-y-2.5">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-warm-gray transition-colors duration-300 hover:text-dusty-rose"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-cream pt-8 sm:flex-row">
          <p className="text-xs text-warm-gray/60">
            © {new Date().getFullYear()} Petal & Bloom. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link href="/faq" className="text-xs text-warm-gray/60 hover:text-dusty-rose transition-colors">
              Privacy Policy
            </Link>
            <Link href="/faq" className="text-xs text-warm-gray/60 hover:text-dusty-rose transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
