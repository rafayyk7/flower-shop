"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, MapPin, Plus } from "lucide-react";
import { useAuthStore } from "@/store/auth-store";
import Button from "@/components/ui/Button";

export default function SavedAddresses() {
  const router = useRouter();
  const { isAuthenticated } = useAuthStore();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login");
    }
  }, [isAuthenticated, router]);

  if (!isAuthenticated) {
    return null;
  }

  // Mock addresses - in production, these would come from user data/API
  const addresses: { id: string; label: string; address: string; isDefault: boolean }[] = [];

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
          <h1 className="font-heading text-3xl font-bold text-charcoal">Saved Addresses</h1>
          <p className="mt-1 text-warm-gray">Manage your delivery addresses for faster checkout</p>
        </div>

        {addresses.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-2xl bg-white py-16 shadow-sm text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-blush/50">
              <MapPin size={28} className="text-dusty-rose" />
            </div>
            <h2 className="mt-4 font-heading text-xl font-semibold text-charcoal">
              No saved addresses
            </h2>
            <p className="mt-2 max-w-sm text-sm text-warm-gray">
              Add a delivery address to speed up your checkout process.
            </p>
            <Button variant="primary" size="md" className="mt-6">
              <Plus size={16} />
              Add Address
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            {addresses.map((addr) => (
              <div
                key={addr.id}
                className="flex items-start justify-between rounded-2xl bg-white p-6 shadow-sm"
              >
                <div className="flex gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blush/50">
                    <MapPin size={18} className="text-dusty-rose" />
                  </div>
                  <div>
                    <p className="font-medium text-charcoal">{addr.label}</p>
                    <p className="mt-1 text-sm text-warm-gray whitespace-pre-line">
                      {addr.address}
                    </p>
                    {addr.isDefault && (
                      <span className="mt-2 inline-block rounded-full bg-sage/20 px-2 py-0.5 text-xs font-medium text-sage-dark">
                        Default
                      </span>
                    )}
                  </div>
                </div>
                <button className="text-sm text-dusty-rose hover:underline cursor-pointer">
                  Edit
                </button>
              </div>
            ))}

            <Button variant="outline" className="w-full">
              <Plus size={16} />
              Add New Address
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
