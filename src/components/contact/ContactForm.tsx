"use client";

import { useState } from "react";
import { Send, Check } from "lucide-react";
import Button from "@/components/ui/Button";

const inquiryTypes = [
  "General Inquiry",
  "Order Status",
  "Custom Arrangement",
  "Wedding Consultation",
  "Corporate Orders",
  "Feedback",
];

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    inquiryType: "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    await new Promise((r) => setTimeout(r, 1500));

    setIsSubmitting(false);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="py-12 text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-sage/20">
          <Check size={32} className="text-sage" />
        </div>
        <h3 className="mt-4 font-heading text-xl font-semibold text-charcoal">
          Message Sent!
        </h3>
        <p className="mt-2 text-sm text-warm-gray">
          Thank you for reaching out. We&apos;ll get back to you within 24 hours.
        </p>
        <Button
          variant="outline"
          size="md"
          className="mt-6"
          onClick={() => {
            setSubmitted(false);
            setForm({ name: "", email: "", phone: "", inquiryType: "", message: "" });
          }}
        >
          Send Another Message
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="mt-6 space-y-5">
      {/* Name & Email row */}
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="mb-1.5 block text-sm font-medium text-charcoal">
            Your Name *
          </label>
          <input
            type="text"
            id="name"
            required
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="w-full rounded-lg border border-cream bg-white px-4 py-3 text-sm text-charcoal placeholder:text-warm-gray/50 outline-none transition-colors focus:border-rose"
            placeholder="Jane Doe"
          />
        </div>
        <div>
          <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-charcoal">
            Email Address *
          </label>
          <input
            type="email"
            id="email"
            required
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="w-full rounded-lg border border-cream bg-white px-4 py-3 text-sm text-charcoal placeholder:text-warm-gray/50 outline-none transition-colors focus:border-rose"
            placeholder="jane@example.com"
          />
        </div>
      </div>

      {/* Phone & Inquiry Type row */}
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="phone" className="mb-1.5 block text-sm font-medium text-charcoal">
            Phone Number
          </label>
          <input
            type="tel"
            id="phone"
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
            className="w-full rounded-lg border border-cream bg-white px-4 py-3 text-sm text-charcoal placeholder:text-warm-gray/50 outline-none transition-colors focus:border-rose"
            placeholder="(555) 123-4567"
          />
        </div>
        <div>
          <label htmlFor="inquiryType" className="mb-1.5 block text-sm font-medium text-charcoal">
            Inquiry Type *
          </label>
          <select
            id="inquiryType"
            required
            value={form.inquiryType}
            onChange={(e) => setForm({ ...form, inquiryType: e.target.value })}
            className="w-full rounded-lg border border-cream bg-white px-4 py-3 text-sm text-charcoal outline-none transition-colors focus:border-rose cursor-pointer"
          >
            <option value="">Select an option</option>
            {inquiryTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Message */}
      <div>
        <label htmlFor="message" className="mb-1.5 block text-sm font-medium text-charcoal">
          Your Message *
        </label>
        <textarea
          id="message"
          required
          rows={5}
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
          className="w-full rounded-lg border border-cream bg-white px-4 py-3 text-sm text-charcoal placeholder:text-warm-gray/50 outline-none transition-colors focus:border-rose resize-none"
          placeholder="Tell us how we can help..."
        />
      </div>

      <Button type="submit" variant="primary" size="lg" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? (
          <>
            <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
            Sending...
          </>
        ) : (
          <>
            <Send size={16} />
            Send Message
          </>
        )}
      </Button>
    </form>
  );
}
