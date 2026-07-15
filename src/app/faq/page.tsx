import Link from "next/link";
import { ChevronDown } from "lucide-react";
import Button from "@/components/ui/Button";
import FAQAccordion from "@/components/faq/FAQAccordion";

export const metadata = {
  title: "FAQ — Petal & Bloom",
  description: "Frequently asked questions about our floral arrangements, delivery, and services.",
};

const faqCategories = [
  {
    title: "Orders & Delivery",
    questions: [
      {
        question: "What are your delivery options?",
        answer:
          "We offer same-day delivery for orders placed before 2 PM local time in select metro areas. Standard delivery takes 1-3 business days. For rural areas, delivery may take up to 5 business days. All deliveries are handled with care to ensure your flowers arrive fresh.",
      },
      {
        question: "Do you deliver on weekends?",
        answer:
          "Yes! We deliver Monday through Saturday. Sunday delivery is available for an additional fee in select areas. For same-day Sunday delivery, please contact us directly to check availability.",
      },
      {
        question: "Can I schedule a delivery for a specific time?",
        answer:
          "We offer delivery windows rather than exact times: Morning (9am-12pm), Afternoon (12pm-4pm), and Evening (4pm-7pm). If the recipient isn't home, we'll leave the arrangement in a safe, shaded area with a delivery notification.",
      },
      {
        question: "How much does delivery cost?",
        answer:
          "Standard delivery is $12.99, but FREE on all orders over $100. Same-day delivery is available for an additional $15. Rush delivery (within 3 hours) is $25 where available.",
      },
    ],
  },
  {
    title: "Products & Care",
    questions: [
      {
        question: "How long will my flowers last?",
        answer:
          "With proper care, our fresh arrangements typically last 7-10 days. We include a care card with every order. Key tips: trim stems at an angle, change water every 2-3 days, keep away from direct sunlight and heat sources.",
      },
      {
        question: "What is your freshness guarantee?",
        answer:
          "We guarantee our flowers will stay fresh for at least 7 days from delivery. If they don't, contact us within 7 days with photos and we'll send a replacement arrangement or issue a full refund.",
      },
      {
        question: "Do you offer preserved or dried arrangements?",
        answer:
          "Yes! Our Preserved Elegance collection features arrangements that last 1-3 years without water or maintenance. These are perfect for those who want long-lasting beauty.",
      },
      {
        question: "Can I request specific flowers or colors?",
        answer:
          "Absolutely! We offer custom arrangements for any occasion. Contact us at least 48 hours in advance to discuss your preferences, and our florists will create something special.",
      },
    ],
  },
  {
    title: "Payments & Returns",
    questions: [
      {
        question: "What payment methods do you accept?",
        answer:
          "We accept all major credit cards (Visa, MasterCard, American Express, Discover), PayPal, Apple Pay, and Google Pay. All transactions are securely processed with SSL encryption.",
      },
      {
        question: "Can I cancel or modify my order?",
        answer:
          "Orders can be cancelled or modified up to 24 hours before the scheduled delivery date. For same-day orders, please contact us immediately at (555) 123-4567. After the cutoff, we cannot guarantee changes.",
      },
      {
        question: "What is your refund policy?",
        answer:
          "Due to the perishable nature of flowers, we don't accept returns. However, if you're not satisfied with your arrangement, contact us within 24 hours of delivery with photos and we'll make it right with a replacement or refund.",
      },
      {
        question: "Do you offer gift receipts?",
        answer:
          "Yes! Simply select 'This is a gift' during checkout. We'll include a gift receipt that excludes pricing and add your personalized message to a beautiful gift card.",
      },
    ],
  },
  {
    title: "Special Occasions",
    questions: [
      {
        question: "Do you do wedding flowers?",
        answer:
          "Yes! We specialize in wedding florals including bridal bouquets, ceremony arrangements, reception centerpieces, and more. Schedule a free consultation to discuss your vision and receive a custom quote.",
      },
      {
        question: "Can you deliver to hospitals or funeral homes?",
        answer:
          "Yes, we regularly deliver to hospitals, nursing homes, and funeral homes. Please provide the full recipient name and room number (for hospitals) or service date and time (for funerals).",
      },
      {
        question: "Do you offer corporate or subscription services?",
        answer:
          "We offer corporate accounts with special pricing for offices, hotels, and event spaces. We also have subscription services for weekly or bi-weekly fresh flower deliveries. Contact us for details.",
      },
    ],
  },
];

export default function FAQPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-white py-16 border-b border-cream">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-rose">
            Support
          </p>
          <h1 className="mt-4 font-heading text-4xl font-bold text-charcoal md:text-5xl">
            Frequently Asked Questions
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-warm-gray">
            Find answers to common questions about our flowers, delivery, and services. Can&apos;t
            find what you&apos;re looking for? We&apos;re here to help.
          </p>
        </div>
      </section>

      {/* FAQ Content */}
      <section className="py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          {faqCategories.map((category) => (
            <div key={category.title} className="mb-12">
              <h2 className="mb-6 font-heading text-2xl font-semibold text-charcoal">
                {category.title}
              </h2>
              <FAQAccordion questions={category.questions} />
            </div>
          ))}
        </div>
      </section>

      {/* Still Have Questions CTA */}
      <section className="bg-cream/50 py-16">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="font-heading text-2xl font-semibold text-charcoal">
            Still Have Questions?
          </h2>
          <p className="mt-2 text-warm-gray">
            Our friendly team is here to help with any questions you might have.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-4">
            <Link href="/contact">
              <Button variant="primary">Contact Us</Button>
            </Link>
            <a href="tel:5551234567">
              <Button variant="outline">Call (555) 123-4567</Button>
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
