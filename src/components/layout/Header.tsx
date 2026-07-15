"use client";

import Link from "next/link";
import { useState } from "react";
import { ShoppingBag, Heart, Search, Menu, X } from "lucide-react";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/shop", label: "Shop" },
  { href: "/shop?category=wedding", label: "Weddings" },
  { href: "/shop?category=sympathy", label: "Sympathy" },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-cream/80 bg-ivory/80 backdrop-blur-lg">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* ── Logo ── */}
        <Link href="/" className="flex items-center gap-2">
          <span className="text-2xl">🌸</span>
          <span className="font-heading text-xl font-bold tracking-tight text-charcoal">
            Petal <span className="text-dusty-rose">&</span> Bloom
          </span>
        </Link>

        {/* ── Desktop Nav ── */}
        <nav className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="relative text-sm font-medium text-warm-gray transition-colors duration-300 hover:text-dusty-rose after:absolute after:-bottom-1 after:left-0 after:h-0.5 after:w-0 after:bg-dusty-rose after:transition-all after:duration-300 hover:after:w-full"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* ── Icons ── */}
        <div className="flex items-center gap-3">
          <button
            className="hidden rounded-full p-2 text-warm-gray transition-colors duration-300 hover:bg-blush/40 hover:text-dusty-rose sm:flex cursor-pointer"
            aria-label="Search"
          >
            <Search size={18} />
          </button>
          <button
            className="hidden rounded-full p-2 text-warm-gray transition-colors duration-300 hover:bg-blush/40 hover:text-dusty-rose sm:flex cursor-pointer"
            aria-label="Wishlist"
          >
            <Heart size={18} />
          </button>
          <button
            className="relative rounded-full p-2 text-warm-gray transition-colors duration-300 hover:bg-blush/40 hover:text-dusty-rose cursor-pointer"
            aria-label="Cart"
          >
            <ShoppingBag size={18} />
            <span className="absolute -top-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-dusty-rose text-[10px] font-bold text-white">
              0
            </span>
          </button>

          {/* ── Mobile menu toggle ── */}
          <button
            className="rounded-full p-2 text-warm-gray md:hidden cursor-pointer"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* ── Mobile Nav Drawer ── */}
      {mobileOpen && (
        <nav className="border-t border-cream bg-ivory px-4 pb-4 pt-2 md:hidden">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="block rounded-lg px-3 py-2.5 text-sm font-medium text-warm-gray transition-colors hover:bg-blush/30 hover:text-dusty-rose"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
