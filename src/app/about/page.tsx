import Image from "next/image";
import Link from "next/link";
import { Heart, Leaf, Award, Users } from "lucide-react";
import Button from "@/components/ui/Button";
import SectionHeading from "@/components/ui/SectionHeading";

export const metadata = {
  title: "About Us — Petal & Bloom",
  description: "Learn about our story, our passion for floristry, and our commitment to quality.",
};

const values = [
  {
    icon: Heart,
    title: "Crafted with Love",
    description:
      "Every arrangement is designed with care and attention, treating each creation as a unique work of art.",
  },
  {
    icon: Leaf,
    title: "Sustainably Sourced",
    description:
      "We partner with certified sustainable farms to bring you the freshest, most ethically grown blooms.",
  },
  {
    icon: Award,
    title: "Expert Artistry",
    description:
      "Our team of master florists brings decades of combined experience to every bouquet we create.",
  },
  {
    icon: Users,
    title: "Community First",
    description:
      "We believe in giving back, donating arrangements to local hospitals and hospices every month.",
  },
];

const team = [
  {
    name: "Elena Rosewood",
    role: "Founder & Head Florist",
    bio: "With 15 years of experience in luxury floristry, Elena founded Petal & Bloom to share her passion for botanical artistry.",
  },
  {
    name: "Marcus Chen",
    role: "Creative Director",
    bio: "Marcus brings a contemporary eye to classic arrangements, creating designs that are both timeless and modern.",
  },
  {
    name: "Sarah Williams",
    role: "Events Specialist",
    bio: "Sarah has orchestrated florals for over 500 weddings and events, making dreams come to life with flowers.",
  },
];

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative bg-charcoal py-24 md:py-32">
        <div className="absolute inset-0 opacity-30">
          <Image
            src="https://images.pexels.com/photos/5410076/pexels-photo-5410076.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200"
            alt="Florists at work"
            fill
            className="object-cover"
          />
        </div>
        <div className="relative mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-blush">
            Our Story
          </p>
          <h1 className="mt-4 font-heading text-4xl font-bold text-white md:text-5xl lg:text-6xl">
            Where Passion Meets <span className="italic text-blush">Petals</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-white/70">
            Founded in 2018, Petal & Bloom has grown from a small studio into a beloved floral
            destination, serving thousands of happy customers across the country.
          </p>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div className="relative aspect-[4/5] overflow-hidden rounded-3xl">
              <Image
                src="https://images.pexels.com/photos/5414026/pexels-photo-5414026.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200"
                alt="Our founder Elena"
                fill
                className="object-cover"
              />
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-rose">
                The Beginning
              </p>
              <h2 className="mt-2 font-heading text-3xl font-semibold text-charcoal md:text-4xl">
                A Dream That <span className="italic text-dusty-rose">Blossomed</span>
              </h2>
              <div className="mt-6 space-y-4 text-warm-gray">
                <p>
                  It started with a single peony. Elena Rosewood, our founder, received a stunning
                  peony bouquet on her 25th birthday and was captivated by the way flowers could
                  convey emotion without words.
                </p>
                <p>
                  That moment sparked a journey through floral design schools in Paris and Tokyo,
                  apprenticeships with master florists, and eventually, the opening of Petal & Bloom
                  in a tiny Brooklyn studio.
                </p>
                <p>
                  Today, we&apos;ve grown into a team of passionate artisans, but our mission remains
                  the same: to create arrangements that tell stories, celebrate moments, and bring
                  joy to everyday life.
                </p>
              </div>
              <Link href="/shop" className="mt-8 inline-block">
                <Button variant="primary" size="lg">
                  Explore Our Work
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-cream/50 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            subtitle="What We Stand For"
            title="Our Core Values"
            description="The principles that guide everything we do, from selecting blooms to designing arrangements."
          />

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((value) => (
              <div
                key={value.title}
                className="rounded-2xl bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blush/50">
                  <value.icon size={22} className="text-dusty-rose" />
                </div>
                <h3 className="mt-4 font-heading text-lg font-semibold text-charcoal">
                  {value.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-warm-gray">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            subtitle="The Artisans"
            title="Meet Our Team"
            description="The talented florists and designers who bring your floral dreams to life."
          />

          <div className="mt-12 grid gap-8 md:grid-cols-3">
            {team.map((member) => (
              <div key={member.name} className="text-center">
                <div className="mx-auto flex h-32 w-32 items-center justify-center rounded-full bg-blush text-4xl font-heading font-bold text-dusty-rose">
                  {member.name.split(" ").map((n) => n[0]).join("")}
                </div>
                <h3 className="mt-4 font-heading text-xl font-semibold text-charcoal">
                  {member.name}
                </h3>
                <p className="text-sm font-medium text-dusty-rose">{member.role}</p>
                <p className="mt-3 text-sm text-warm-gray">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-charcoal py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 text-center sm:grid-cols-2 lg:grid-cols-4">
            {[
              { number: "15,000+", label: "Happy Customers" },
              { number: "50+", label: "Unique Designs" },
              { number: "7", label: "Years of Excellence" },
              { number: "500+", label: "5-Star Reviews" },
            ].map((stat) => (
              <div key={stat.label}>
                <p className="font-heading text-4xl font-bold text-white">{stat.number}</p>
                <p className="mt-1 text-sm text-white/60">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="font-heading text-3xl font-semibold text-charcoal md:text-4xl">
            Ready to Experience the Petal & Bloom Difference?
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-warm-gray">
            Whether it&apos;s a birthday surprise, wedding celebration, or just because — we&apos;re
            here to help you say it with flowers.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link href="/shop">
              <Button variant="primary" size="lg">
                Shop Now
              </Button>
            </Link>
            <Link href="/contact">
              <Button variant="outline" size="lg">
                Get in Touch
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
