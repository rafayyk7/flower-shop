import Image from "next/image";
import Link from "next/link";
import { Droplets, Sun, Scissors, ThermometerSun, Clock, Flower2 } from "lucide-react";
import Button from "@/components/ui/Button";

export const metadata = {
  title: "Flower Care Guide — Petal & Bloom",
  description: "Expert tips to keep your floral arrangements fresh and beautiful for longer.",
};

const careTips = [
  {
    icon: Scissors,
    title: "Trim the Stems",
    description:
      "Cut 1-2 inches off stems at a 45-degree angle with sharp scissors. This increases water absorption surface area.",
  },
  {
    icon: Droplets,
    title: "Fresh Water Daily",
    description:
      "Change the water every 1-2 days. Clean the vase each time to prevent bacterial growth.",
  },
  {
    icon: Sun,
    title: "Avoid Direct Sunlight",
    description:
      "Keep flowers in a cool spot away from direct sunlight, heating vents, and appliances that generate heat.",
  },
  {
    icon: ThermometerSun,
    title: "Keep Cool",
    description:
      "Flowers last longer in cooler temperatures (65-72°F). Some people even refrigerate them overnight!",
  },
  {
    icon: Flower2,
    title: "Remove Wilted Blooms",
    description:
      "As flowers wilt, remove them promptly. Decaying flowers release ethylene gas that affects fresh blooms.",
  },
  {
    icon: Clock,
    title: "Use Flower Food",
    description:
      "Always use the flower food packet included with your arrangement. It contains nutrients and antibacterials.",
  },
];

const flowerGuides = [
  {
    name: "Roses",
    lifespan: "7-10 days",
    tips: [
      "Remove leaves below waterline",
      "Re-cut stems every few days",
      "Mist petals lightly in dry conditions",
    ],
  },
  {
    name: "Peonies",
    lifespan: "5-7 days",
    tips: [
      "Buy in bud stage for longest life",
      "Gently blow on buds to help them open",
      "Keep in cool room (60-65°F)",
    ],
  },
  {
    name: "Lilies",
    lifespan: "10-14 days",
    tips: [
      "Remove pollen stamens to prevent staining",
      "Remove flowers as they die",
      "Keep away from pets (toxic to cats)",
    ],
  },
  {
    name: "Hydrangeas",
    lifespan: "7-14 days",
    tips: [
      "Submerge whole flower in water if wilting",
      "Mist blooms daily",
      "Use warm water for hydration",
    ],
  },
];

export default function CareGuidePage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-white py-16 border-b border-cream">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-rose">
            Expert Advice
          </p>
          <h1 className="mt-4 font-heading text-4xl font-bold text-charcoal md:text-5xl">
            Flower Care Guide
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-warm-gray">
            Follow these simple tips to keep your arrangements looking fresh and vibrant for as
            long as possible.
          </p>
        </div>
      </section>

      {/* Quick Tips Grid */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-center font-heading text-2xl font-semibold text-charcoal md:text-3xl">
            Essential Care Tips
          </h2>
          <p className="mx-auto mt-2 max-w-2xl text-center text-warm-gray">
            These fundamentals apply to most cut flowers and will significantly extend their life.
          </p>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {careTips.map((tip) => (
              <div
                key={tip.title}
                className="rounded-2xl bg-cream/30 p-6 transition-colors hover:bg-cream/50"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blush/50">
                  <tip.icon size={22} className="text-dusty-rose" />
                </div>
                <h3 className="mt-4 font-heading text-lg font-semibold text-charcoal">
                  {tip.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-warm-gray">{tip.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Flower-Specific Guides */}
      <section className="bg-white py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-center font-heading text-2xl font-semibold text-charcoal md:text-3xl">
            Care by Flower Type
          </h2>
          <p className="mx-auto mt-2 max-w-2xl text-center text-warm-gray">
            Different flowers have unique needs. Here are specific tips for popular varieties.
          </p>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {flowerGuides.map((flower) => (
              <div key={flower.name} className="rounded-2xl border border-cream p-6">
                <h3 className="font-heading text-xl font-semibold text-charcoal">{flower.name}</h3>
                <p className="mt-1 text-sm text-dusty-rose">Lasts {flower.lifespan}</p>
                <ul className="mt-4 space-y-2">
                  {flower.tips.map((tip, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-warm-gray">
                      <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-sage" />
                      {tip}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Step by Step Guide */}
      <section className="py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-center font-heading text-2xl font-semibold text-charcoal md:text-3xl">
            When Your Flowers Arrive
          </h2>
          <p className="mx-auto mt-2 max-w-2xl text-center text-warm-gray">
            Follow these steps as soon as your delivery arrives for best results.
          </p>

          <ol className="mt-12 space-y-6">
            {[
              {
                step: 1,
                title: "Unpack Carefully",
                desc: "Remove packaging gently. If flowers were shipped, let them acclimate to room temperature for 30 minutes.",
              },
              {
                step: 2,
                title: "Prepare the Vase",
                desc: "Clean your vase thoroughly with soap and water. Fill with room temperature water and add the flower food packet.",
              },
              {
                step: 3,
                title: "Trim the Stems",
                desc: "Using sharp scissors or a knife, cut 1-2 inches off each stem at a 45-degree angle while holding stems under water if possible.",
              },
              {
                step: 4,
                title: "Remove Lower Leaves",
                desc: "Strip any leaves that would be below the waterline. Submerged leaves promote bacterial growth.",
              },
              {
                step: 5,
                title: "Arrange & Display",
                desc: "Arrange flowers in the vase and place in a cool spot away from direct sunlight, fruit, and heating/cooling vents.",
              },
              {
                step: 6,
                title: "Maintain Daily",
                desc: "Check water levels daily, change water every 2 days, and remove any wilting blooms promptly.",
              },
            ].map((item) => (
              <li key={item.step} className="flex gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-dusty-rose font-heading text-lg font-bold text-white">
                  {item.step}
                </div>
                <div>
                  <h4 className="font-semibold text-charcoal">{item.title}</h4>
                  <p className="mt-1 text-sm text-warm-gray">{item.desc}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-cream/50 py-16">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="font-heading text-2xl font-semibold text-charcoal">
            Need More Help?
          </h2>
          <p className="mt-2 text-warm-gray">
            Our floral experts are here to answer any questions about flower care.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-4">
            <Link href="/contact">
              <Button variant="primary">Contact Us</Button>
            </Link>
            <Link href="/faq">
              <Button variant="outline">View FAQ</Button>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
