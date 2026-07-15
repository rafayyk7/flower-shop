"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Check, Truck, CreditCard, ClipboardList } from "lucide-react";
import { useCartStore } from "@/store/cart-store";
import { useCheckoutStore } from "@/store/checkout-store";
import ShippingForm from "./ShippingForm";
import PaymentForm from "./PaymentForm";
import OrderReview from "./OrderReview";

const steps = [
  { id: "shipping", label: "Shipping", icon: Truck },
  { id: "payment", label: "Payment", icon: CreditCard },
  { id: "review", label: "Review", icon: ClipboardList },
] as const;

export default function CheckoutContent() {
  const router = useRouter();
  const { items, getSubtotal } = useCartStore();
  const { currentStep } = useCheckoutStore();

  const subtotal = getSubtotal();
  const shipping = subtotal >= 100 ? 0 : 12.99;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  const formatPrice = (amount: number) =>
    new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(amount);

  // Redirect if cart is empty
  useEffect(() => {
    if (items.length === 0) {
      router.push("/cart");
    }
  }, [items.length, router]);

  if (items.length === 0) {
    return null;
  }

  const currentStepIndex = steps.findIndex((s) => s.id === currentStep);

  return (
    <div className="min-h-screen bg-ivory">
      {/* Header */}
      <header className="border-b border-cream bg-white">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link href="/cart" className="flex items-center gap-2 text-sm text-warm-gray hover:text-dusty-rose transition-colors">
            <ArrowLeft size={16} />
            Back to Cart
          </Link>
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl">🌸</span>
            <span className="font-heading text-xl font-bold text-charcoal">
              Petal <span className="text-dusty-rose">&</span> Bloom
            </span>
          </Link>
          <div className="w-24" />
        </div>
      </header>

      {/* Progress Steps */}
      <div className="border-b border-cream bg-white py-6">
        <div className="mx-auto max-w-3xl px-4">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => {
              const isCompleted = index < currentStepIndex;
              const isCurrent = step.id === currentStep;
              const Icon = step.icon;

              return (
                <div key={step.id} className="flex flex-1 items-center">
                  <div className="flex flex-col items-center">
                    <div
                      className={`flex h-10 w-10 items-center justify-center rounded-full transition-colors ${
                        isCompleted
                          ? "bg-sage text-white"
                          : isCurrent
                            ? "bg-dusty-rose text-white"
                            : "bg-cream text-warm-gray"
                      }`}
                    >
                      {isCompleted ? <Check size={18} /> : <Icon size={18} />}
                    </div>
                    <span
                      className={`mt-2 text-xs font-medium ${
                        isCurrent ? "text-dusty-rose" : "text-warm-gray"
                      }`}
                    >
                      {step.label}
                    </span>
                  </div>
                  {index < steps.length - 1 && (
                    <div
                      className={`mx-4 h-0.5 flex-1 transition-colors ${
                        index < currentStepIndex ? "bg-sage" : "bg-cream"
                      }`}
                    />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-3">
          {/* Form Section */}
          <div className="lg:col-span-2">
            {currentStep === "shipping" && <ShippingForm />}
            {currentStep === "payment" && <PaymentForm />}
            {currentStep === "review" && <OrderReview />}
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 rounded-2xl bg-white p-6 shadow-sm">
              <h3 className="font-heading text-lg font-semibold text-charcoal">
                Order Summary
              </h3>

              {/* Items */}
              <ul className="mt-4 max-h-64 space-y-3 overflow-y-auto">
                {items.map((item) => (
                  <li key={item.product.id} className="flex gap-3">
                    <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-lg bg-cream">
                      <Image
                        src={item.product.imageUrl}
                        alt={item.product.name}
                        fill
                        className="object-cover"
                      />
                      <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-charcoal text-[10px] font-bold text-white">
                        {item.quantity}
                      </span>
                    </div>
                    <div className="flex flex-1 flex-col">
                      <span className="text-sm font-medium text-charcoal line-clamp-1">
                        {item.product.name}
                      </span>
                      <span className="text-xs text-warm-gray">
                        {formatPrice(item.product.price)} each
                      </span>
                    </div>
                    <span className="text-sm font-medium text-charcoal">
                      {formatPrice(item.product.price * item.quantity)}
                    </span>
                  </li>
                ))}
              </ul>

              {/* Totals */}
              <dl className="mt-6 space-y-2 border-t border-cream pt-4">
                <div className="flex items-center justify-between text-sm">
                  <dt className="text-warm-gray">Subtotal</dt>
                  <dd className="font-medium text-charcoal">{formatPrice(subtotal)}</dd>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <dt className="text-warm-gray">Shipping</dt>
                  <dd className="font-medium text-charcoal">
                    {shipping === 0 ? <span className="text-sage">Free</span> : formatPrice(shipping)}
                  </dd>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <dt className="text-warm-gray">Tax (8%)</dt>
                  <dd className="font-medium text-charcoal">{formatPrice(tax)}</dd>
                </div>
                <div className="flex items-center justify-between border-t border-cream pt-2">
                  <dt className="text-base font-semibold text-charcoal">Total</dt>
                  <dd className="text-xl font-bold text-charcoal">{formatPrice(total)}</dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
