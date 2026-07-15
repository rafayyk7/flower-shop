"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Eye, EyeOff, Mail, Lock, User } from "lucide-react";
import { useAuthStore } from "@/store/auth-store";
import Button from "@/components/ui/Button";

export default function RegisterForm() {
  const router = useRouter();
  const { register, isLoading } = useAuthStore();

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const updateField = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (!form.firstName.trim()) newErrors.firstName = "First name is required";
    if (!form.lastName.trim()) newErrors.lastName = "Last name is required";
    if (!form.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = "Please enter a valid email";
    }
    if (!form.password) {
      newErrors.password = "Password is required";
    } else if (form.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }
    if (form.password !== form.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) return;

    const result = await register({
      email: form.email,
      password: form.password,
      firstName: form.firstName,
      lastName: form.lastName,
    });

    if (result.success) {
      router.push("/account");
    } else {
      setErrors({ form: result.error || "Registration failed" });
    }
  };

  const inputClass = (field: string) =>
    `w-full rounded-lg border py-3 pl-10 pr-4 text-sm text-charcoal placeholder:text-warm-gray/50 outline-none transition-colors ${
      errors[field]
        ? "border-dusty-rose bg-blush/10"
        : "border-cream bg-white focus:border-rose"
    }`;

  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center">
          <span className="text-4xl">🌸</span>
          <h1 className="mt-4 font-heading text-3xl font-bold text-charcoal">Create Account</h1>
          <p className="mt-2 text-sm text-warm-gray">
            Join Petal & Bloom for exclusive offers and faster checkout
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="mt-8 space-y-5">
          {errors.form && (
            <div className="rounded-lg bg-blush/50 px-4 py-3 text-sm text-dusty-rose">
              {errors.form}
            </div>
          )}

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
                  onChange={(e) => updateField("firstName", e.target.value)}
                  className={inputClass("firstName")}
                  placeholder="Jane"
                />
                <User size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-warm-gray/50" />
              </div>
              {errors.firstName && <p className="mt-1 text-xs text-dusty-rose">{errors.firstName}</p>}
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
                  onChange={(e) => updateField("lastName", e.target.value)}
                  className={inputClass("lastName")}
                  placeholder="Doe"
                />
                <User size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-warm-gray/50" />
              </div>
              {errors.lastName && <p className="mt-1 text-xs text-dusty-rose">{errors.lastName}</p>}
            </div>
          </div>

          <div>
            <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-charcoal">
              Email Address
            </label>
            <div className="relative">
              <input
                type="email"
                id="email"
                value={form.email}
                onChange={(e) => updateField("email", e.target.value)}
                className={inputClass("email")}
                placeholder="jane@example.com"
              />
              <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-warm-gray/50" />
            </div>
            {errors.email && <p className="mt-1 text-xs text-dusty-rose">{errors.email}</p>}
          </div>

          <div>
            <label htmlFor="password" className="mb-1.5 block text-sm font-medium text-charcoal">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                value={form.password}
                onChange={(e) => updateField("password", e.target.value)}
                className={`${inputClass("password")} pr-12`}
                placeholder="••••••••"
              />
              <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-warm-gray/50" />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-warm-gray/50 hover:text-charcoal cursor-pointer"
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
            {errors.password && <p className="mt-1 text-xs text-dusty-rose">{errors.password}</p>}
          </div>

          <div>
            <label htmlFor="confirmPassword" className="mb-1.5 block text-sm font-medium text-charcoal">
              Confirm Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="confirmPassword"
                value={form.confirmPassword}
                onChange={(e) => updateField("confirmPassword", e.target.value)}
                className={inputClass("confirmPassword")}
                placeholder="••••••••"
              />
              <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-warm-gray/50" />
            </div>
            {errors.confirmPassword && (
              <p className="mt-1 text-xs text-dusty-rose">{errors.confirmPassword}</p>
            )}
          </div>

          <label className="flex items-start gap-2 text-sm text-warm-gray">
            <input
              type="checkbox"
              className="mt-1 h-4 w-4 rounded border-cream accent-dusty-rose"
              required
            />
            <span>
              I agree to the{" "}
              <Link href="#" className="text-dusty-rose hover:underline">
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link href="#" className="text-dusty-rose hover:underline">
                Privacy Policy
              </Link>
            </span>
          </label>

          <Button type="submit" variant="primary" size="lg" className="w-full" disabled={isLoading}>
            {isLoading ? (
              <>
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                Creating account...
              </>
            ) : (
              "Create Account"
            )}
          </Button>
        </form>

        {/* Sign in link */}
        <p className="mt-8 text-center text-sm text-warm-gray">
          Already have an account?{" "}
          <Link href="/login" className="font-semibold text-dusty-rose hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
