"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Check, User, Mail, Phone } from "lucide-react";
import { useAuthStore } from "@/store/auth-store";
import Button from "@/components/ui/Button";

export default function AccountSettings() {
  const router = useRouter();
  const { user, isAuthenticated, updateProfile } = useAuthStore();

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  });
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login");
    } else if (user) {
      setForm({
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        phone: user.phone || "",
      });
    }
  }, [isAuthenticated, user, router]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile({
      firstName: form.firstName,
      lastName: form.lastName,
      phone: form.phone,
    });
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  if (!isAuthenticated || !user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-ivory py-12">
      <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <Link
            href="/account"
            className="mb-4 inline-flex items-center gap-1 text-sm text-warm-gray hover:text-dusty-rose transition-colors"
          >
            <ArrowLeft size={14} />
            Back to Account
          </Link>
          <h1 className="font-heading text-3xl font-bold text-charcoal">Account Settings</h1>
          <p className="mt-1 text-warm-gray">Update your personal information</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="rounded-2xl bg-white p-6 shadow-sm md:p-8">
          <div className="space-y-5">
            {/* Name row */}
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="firstName" className="mb-1.5 block text-sm font-medium text-charcoal">
                  First Name
                </label>
                <div className="relative">
                  <input
                    type="text"
                    id="firstName"
                    value={form.firstName}
                    onChange={(e) => setForm({ ...form, firstName: e.target.value })}
                    className="w-full rounded-lg border border-cream bg-white py-3 pl-10 pr-4 text-sm text-charcoal outline-none transition-colors focus:border-rose"
                  />
                  <User size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-warm-gray/50" />
                </div>
              </div>
              <div>
                <label htmlFor="lastName" className="mb-1.5 block text-sm font-medium text-charcoal">
                  Last Name
                </label>
                <div className="relative">
                  <input
                    type="text"
                    id="lastName"
                    value={form.lastName}
                    onChange={(e) => setForm({ ...form, lastName: e.target.value })}
                    className="w-full rounded-lg border border-cream bg-white py-3 pl-10 pr-4 text-sm text-charcoal outline-none transition-colors focus:border-rose"
                  />
                  <User size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-warm-gray/50" />
                </div>
              </div>
            </div>

            {/* Email (read-only) */}
            <div>
              <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-charcoal">
                Email Address
              </label>
              <div className="relative">
                <input
                  type="email"
                  id="email"
                  value={form.email}
                  disabled
                  className="w-full rounded-lg border border-cream bg-cream/50 py-3 pl-10 pr-4 text-sm text-warm-gray"
                />
                <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-warm-gray/50" />
              </div>
              <p className="mt-1 text-xs text-warm-gray/60">
                Contact support to change your email address
              </p>
            </div>

            {/* Phone */}
            <div>
              <label htmlFor="phone" className="mb-1.5 block text-sm font-medium text-charcoal">
                Phone Number
              </label>
              <div className="relative">
                <input
                  type="tel"
                  id="phone"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  className="w-full rounded-lg border border-cream bg-white py-3 pl-10 pr-4 text-sm text-charcoal outline-none transition-colors focus:border-rose"
                  placeholder="(555) 123-4567"
                />
                <Phone size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-warm-gray/50" />
              </div>
            </div>
          </div>

          <div className="mt-8 flex items-center justify-between border-t border-cream pt-6">
            {saved && (
              <span className="flex items-center gap-1 text-sm text-sage">
                <Check size={16} />
                Changes saved!
              </span>
            )}
            <Button type="submit" variant="primary" className="ml-auto">
              Save Changes
            </Button>
          </div>
        </form>

        {/* Danger Zone */}
        <div className="mt-6 rounded-2xl border border-dusty-rose/20 bg-white p-6 shadow-sm">
          <h3 className="font-heading text-lg font-semibold text-charcoal">Danger Zone</h3>
          <p className="mt-1 text-sm text-warm-gray">
            Once you delete your account, there is no going back. Please be certain.
          </p>
          <Button variant="outline" size="sm" className="mt-4 border-dusty-rose text-dusty-rose hover:bg-dusty-rose hover:text-white">
            Delete Account
          </Button>
        </div>
      </div>
    </div>
  );
}
