"use client";

import { useState } from "react";
import Link from "next/link";
import { Mail, ArrowLeft, Check } from "lucide-react";
import Button from "@/components/ui/Button";

export default function ForgotPasswordForm() {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email.trim()) {
      setError("Please enter your email address");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address");
      return;
    }

    setIsSubmitting(true);

    // Simulate API call
    await new Promise((r) => setTimeout(r, 1500));

    setIsSubmitting(false);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center px-4 py-12">
        <div className="w-full max-w-md text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-sage/20">
            <Check size={32} className="text-sage" />
          </div>
          <h1 className="mt-6 font-heading text-2xl font-bold text-charcoal">
            Check Your Email
          </h1>
          <p className="mt-3 text-sm text-warm-gray">
            We&apos;ve sent a password reset link to{" "}
            <span className="font-semibold text-charcoal">{email}</span>
          </p>
          <p className="mt-6 text-sm text-warm-gray">
            Didn&apos;t receive the email? Check your spam folder or{" "}
            <button
              onClick={() => setSubmitted(false)}
              className="font-semibold text-dusty-rose hover:underline cursor-pointer"
            >
              try again
            </button>
          </p>
          <Link href="/login" className="mt-8 inline-block">
            <Button variant="outline">
              <ArrowLeft size={16} />
              Back to Sign In
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center">
          <span className="text-4xl">🔐</span>
          <h1 className="mt-4 font-heading text-3xl font-bold text-charcoal">
            Forgot Password?
          </h1>
          <p className="mt-2 text-sm text-warm-gray">
            No worries! Enter your email and we&apos;ll send you a reset link.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="mt-8 space-y-5">
          {error && (
            <div className="rounded-lg bg-blush/50 px-4 py-3 text-sm text-dusty-rose">
              {error}
            </div>
          )}

          <div>
            <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-charcoal">
              Email Address
            </label>
            <div className="relative">
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-lg border border-cream bg-white py-3 pl-10 pr-4 text-sm text-charcoal placeholder:text-warm-gray/50 outline-none transition-colors focus:border-rose"
                placeholder="jane@example.com"
              />
              <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-warm-gray/50" />
            </div>
          </div>

          <Button type="submit" variant="primary" size="lg" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                Sending...
              </>
            ) : (
              "Send Reset Link"
            )}
          </Button>
        </form>

        {/* Back to login */}
        <div className="mt-8 text-center">
          <Link
            href="/login"
            className="inline-flex items-center gap-1 text-sm text-warm-gray hover:text-dusty-rose transition-colors"
          >
            <ArrowLeft size={14} />
            Back to Sign In
          </Link>
        </div>
      </div>
    </div>
  );
}
