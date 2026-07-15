import Image from "next/image";
import Link from "next/link";
import { Truck, Award, Leaf, Clock } from "lucide-react";
import { getFeaturedProducts } from "@/services/product-service";
import { getAllCategories } from "@/services/category-service";
import { testimonials } from "@/data/testimonials";
import ProductCard from "@/components/product/ProductCard";
import CategoryCard from "@/components/product/CategoryCard";
import TestimonialCard from "@/components/testimonial/TestimonialCard";
import SectionHeading from "@/components/ui/SectionHeading";
import Button from "@/components/ui/Button";
import NewsletterForm from "@/components/home/NewsletterForm";

const highlights = [
  {
    icon: Truck,
    title: "Same-Day Delivery",
    description: "Order by 2 PM for same-day delivery in select cities.",
  },
  {
    icon: Award,
    title: "Artisan Quality",
    description: "Every arrangement is hand-crafted by our expert florists.",
  },
  {
    icon: Leaf,
    title: "Sustainably Sourced",
    description: "Farm-fresh blooms from certified sustainable growers.",
  },
  {
    icon: Clock,
    title: "Freshness Guarantee",
    description: "Your flowers will last 7+ days — or we'll replace them.",
  },
];

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const [featuredProducts, categories] = await Promise.all([
    getFeaturedProducts(),
    getAllCategories(),
  ]);

  return (
    <>
      {/* ════════════════════════════════════════════════════
          HERO SECTION
         ════════════════════════════════════════════════════ */}
      <section className="relative flex min-h-[85vh] items-center overflow-hidden">
        {/* Background image */}
        <Image
          src="/images/hero-bg.jpg"
          alt="Luxurious floral arrangement"
          fill
          className="object-cover"
          priority
        />
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-charcoal/60 via-charcoal/30 to-transparent" />

        {/* Content */}
        <div className="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-xl">
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.25em] text-blush">
              Artisan Floral Studio
            </p>
            <h1 className="font-heading text-4xl font-bold leading-[1.1] text-white sm:text-5xl md:text-6xl lg:text-7xl">
              Where Every Petal{" "}
              <span className="italic text-blush">Tells a Story</span>
            </h1>
            <p className="mt-6 max-w-md text-base leading-relaxed text-white/80 sm:text-lg">
              Hand-crafted luxury arrangements for life&apos;s most meaningful moments.
              Delivered with care, designed with passion.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link href="/shop">
                <Button size="lg" variant="primary">
                  Shop Collection
                </Button>
              </Link>
              <Link href="/shop?category=wedding">
                <Button size="lg" variant="outline" className="border-white/60 text-white hover:bg-white/20 hover:text-white hover:border-white">
                  Wedding Florals
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════
          HIGHLIGHTS BAR
         ════════════════════════════════════════════════════ */}
      <section className="border-b border-cream bg-white">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-6 px-4 py-10 sm:px-6 lg:grid-cols-4 lg:px-8">
          {highlights.map((h) => (
            <div key={h.title} className="flex items-start gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blush/40 text-dusty-rose">
                <h.icon size={18} />
              </div>
              <div>
                <h4 className="text-sm font-semibold text-charcoal">{h.title}</h4>
                <p className="mt-0.5 text-xs leading-relaxed text-warm-gray">
                  {h.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ════════════════════════════════════════════════════
          CATEGORIES
         ════════════════════════════════════════════════════ */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            subtitle="Browse by Collection"
            title="Find Your Perfect Arrangement"
            description="From romantic roses to everlasting dried bouquets — explore our curated collections crafted for every occasion."
          />

          <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
            {categories.map((cat) => (
              <CategoryCard key={cat.id} category={cat} />
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════
          FEATURED PRODUCTS
         ════════════════════════════════════════════════════ */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            subtitle="Curated Picks"
            title="Our Featured Arrangements"
            description="Each piece is a work of art — selected for its beauty, fragrance, and the emotions it inspires."
          />

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {featuredProducts.map((product, i) => (
              <ProductCard key={product.id} product={product} priority={i < 2} />
            ))}
          </div>

          <div className="mt-12 flex justify-center">
            <Link href="/shop">
              <Button variant="outline" size="lg">
                View All Arrangements
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════
          ABOUT / STORY BANNER
         ════════════════════════════════════════════════════ */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            {/* Image */}
            <div className="relative aspect-[4/3] overflow-hidden rounded-3xl">
              <Image
                src="https://images.pexels.com/photos/5414026/pexels-photo-5414026.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200"
                alt="Our expert florist at work"
                fill
                className="object-cover"
              />
            </div>

            {/* Text */}
            <div>
              <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-rose">
                Our Story
              </p>
              <h2 className="font-heading text-3xl font-semibold text-charcoal md:text-4xl leading-tight">
                Crafted with Passion, <br />
                <span className="italic text-dusty-rose">Delivered with Love</span>
              </h2>
              <p className="mt-6 text-sm leading-relaxed text-warm-gray">
                Founded in 2018, Petal & Bloom began as a small studio with a big dream: to elevate
                everyday moments through the art of floristry. Our team of master florists sources
                the finest seasonal blooms from sustainable farms and transforms them into
                breathtaking arrangements.
              </p>
              <p className="mt-4 text-sm leading-relaxed text-warm-gray">
                Every bouquet is a signature creation — thoughtfully designed, hand-tied, and
                delivered with the same care as if it were our own. We believe flowers have the
                power to heal, celebrate, and connect us to the beauty in life.
              </p>
              <div className="mt-8 flex gap-8">
                {[
                  { number: "15K+", label: "Happy Clients" },
                  { number: "50+", label: "Unique Designs" },
                  { number: "7", label: "Years of Craft" },
                ].map((stat) => (
                  <div key={stat.label}>
                    <p className="font-heading text-2xl font-bold text-charcoal">{stat.number}</p>
                    <p className="text-xs text-warm-gray">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════
          TESTIMONIALS
         ════════════════════════════════════════════════════ */}
      <section className="bg-cream/50 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            subtitle="Client Love"
            title="What Our Clients Say"
            description="Real words from real people who trusted us with their most special moments."
          />

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {testimonials.map((t) => (
              <TestimonialCard key={t.id} testimonial={t} />
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════
          NEWSLETTER
         ════════════════════════════════════════════════════ */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-3xl bg-charcoal px-6 py-16 text-center sm:px-12 md:py-20">
            {/* Decorative circles */}
            <div className="absolute -top-20 -left-20 h-72 w-72 rounded-full bg-dusty-rose/10" />
            <div className="absolute -bottom-16 -right-16 h-56 w-56 rounded-full bg-sage/10" />

            <div className="relative">
              <p className="mb-2 text-xs font-semibold uppercase tracking-[0.25em] text-rose">
                Stay in Bloom
              </p>
              <h2 className="font-heading text-3xl font-semibold text-white md:text-4xl">
                Join Our Inner Circle
              </h2>
              <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-white/60">
                Be the first to know about new collections, seasonal specials, and exclusive
                subscriber-only offers.
              </p>

              <NewsletterForm />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
