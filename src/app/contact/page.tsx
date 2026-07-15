import ContactForm from "@/components/contact/ContactForm";
import { MapPin, Phone, Mail, Clock } from "lucide-react";

export const metadata = {
  title: "Contact Us — Petal & Bloom",
  description: "Get in touch with our team for orders, inquiries, or custom arrangements.",
};

const contactInfo = [
  {
    icon: MapPin,
    label: "Visit Our Studio",
    value: "123 Bloom Street\nBrooklyn, NY 11201",
  },
  {
    icon: Phone,
    label: "Call Us",
    value: "(555) 123-4567",
  },
  {
    icon: Mail,
    label: "Email Us",
    value: "hello@petalandbloom.com",
  },
  {
    icon: Clock,
    label: "Hours",
    value: "Mon–Fri: 9am–6pm\nSat: 10am–4pm\nSun: Closed",
  },
];

export default function ContactPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-white py-16 border-b border-cream">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-rose">
            Get in Touch
          </p>
          <h1 className="mt-4 font-heading text-4xl font-bold text-charcoal md:text-5xl">
            We&apos;d Love to Hear From You
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-warm-gray">
            Have a question about an order? Need help with a custom arrangement? Our friendly team
            is here to help.
          </p>
        </div>
      </section>

      {/* Contact Content */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-5">
            {/* Contact Info */}
            <div className="lg:col-span-2">
              <h2 className="font-heading text-2xl font-semibold text-charcoal">
                Contact Information
              </h2>
              <p className="mt-2 text-sm text-warm-gray">
                Reach out to us through any of these channels.
              </p>

              <ul className="mt-8 space-y-6">
                {contactInfo.map((item) => (
                  <li key={item.label} className="flex gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blush/50">
                      <item.icon size={18} className="text-dusty-rose" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wider text-warm-gray">
                        {item.label}
                      </p>
                      <p className="mt-0.5 whitespace-pre-line text-sm text-charcoal">
                        {item.value}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>

              {/* Map placeholder */}
              <div className="mt-8 aspect-[4/3] overflow-hidden rounded-2xl bg-cream">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3025.3063874233135!2d-73.99!3d40.69!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDDCsDQxJzI0LjAiTiA3M8KwNTknMjQuMCJX!5e0!3m2!1sen!2sus!4v1600000000000!5m2!1sen!2sus"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Our location"
                />
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-3">
              <div className="rounded-2xl bg-white p-6 shadow-sm md:p-8">
                <h2 className="font-heading text-2xl font-semibold text-charcoal">
                  Send Us a Message
                </h2>
                <p className="mt-2 text-sm text-warm-gray">
                  Fill out the form below and we&apos;ll get back to you within 24 hours.
                </p>

                <ContactForm />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Link */}
      <section className="bg-cream/50 py-12">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <p className="text-warm-gray">
            Looking for quick answers?{" "}
            <a href="/faq" className="font-semibold text-dusty-rose hover:underline">
              Check out our FAQ
            </a>
          </p>
        </div>
      </section>
    </>
  );
}
