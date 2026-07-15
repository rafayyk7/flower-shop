"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Eye, EyeOff, Mail, Lock } from "lucide-react";
import { useAuthStore } from "@/store/auth-store";
import Button from "@/components/ui/Button";

export default function LoginForm() {
  const router = useRouter();
  const { login, isLoading } = useAuthStore();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Please fill in all fields");
      return;
    }

    const result = await login(email, password);

    if (result.success) {
      router.push("/account");
    } else {
      setError(result.error || "Login failed");
    }
  };

  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center">
          <span className="text-4xl">🌸</span>
          <h1 className="mt-4 font-heading text-3xl font-bold text-charcoal">Welcome Back</h1>
          <p className="mt-2 text-sm text-warm-gray">
            Sign in to your account to continue shopping
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

          <div>
            <label htmlFor="password" className="mb-1.5 block text-sm font-medium text-charcoal">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-lg border border-cream bg-white py-3 pl-10 pr-12 text-sm text-charcoal placeholder:text-warm-gray/50 outline-none transition-colors focus:border-rose"
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
          </div>

          <div className="flex items-center justify-between">
            <label className="flex items-center gap-2 text-sm text-warm-gray">
              <input type="checkbox" className="h-4 w-4 rounded border-cream accent-dusty-rose" />
              Remember me
            </label>
            <Link href="#" className="text-sm text-dusty-rose hover:underline">
              Forgot password?
            </Link>
          </div>

          <Button type="submit" variant="primary" size="lg" className="w-full" disabled={isLoading}>
            {isLoading ? (
              <>
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                Signing in...
              </>
            ) : (
              "Sign In"
            )}
          </Button>
        </form>

        {/* Divider */}
        <div className="my-8 flex items-center gap-4">
          <div className="h-px flex-1 bg-cream" />
          <span className="text-xs text-warm-gray/60">or</span>
          <div className="h-px flex-1 bg-cream" />
        </div>

        {/* Sign up link */}
        <p className="text-center text-sm text-warm-gray">
          Don&apos;t have an account?{" "}
          <Link href="/register" className="font-semibold text-dusty-rose hover:underline">
            Create one
          </Link>
        </p>
      </div>
    </div>
  );
}
