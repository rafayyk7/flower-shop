"use client";

import { useState } from "react";

export default function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      // Future: POST to /api/newsletter
      setSubmitted(true);
    }
  };

  if (submitted) {
    return (
      <div className="mt-8">
        <p className="text-sm font-medium text-sage">
          🌿 Thank you! You&apos;re now part of the Petal & Bloom family.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto mt-8 flex max-w-md flex-col gap-3 sm:flex-row"
    >
      <input
        type="email"
        required
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="flex-1 rounded-full border border-white/10 bg-white/10 px-5 py-3 text-sm text-white placeholder:text-white/40 outline-none transition-all focus:border-rose focus:ring-2 focus:ring-rose/30"
      />
      <button
        type="submit"
        className="cursor-pointer rounded-full bg-dusty-rose px-6 py-3 text-sm font-semibold text-white transition-colors duration-300 hover:bg-rose"
      >
        Subscribe
      </button>
    </form>
  );
}
