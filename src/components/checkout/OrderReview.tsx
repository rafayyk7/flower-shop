"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { ArrowLeft, MapPin, CreditCard, Check } from "lucide-react";
import { useCartStore } from "@/store/cart-store";
import { useCheckoutStore } from "@/store/checkout-store";
import { useOrderStore } from "@/store/order-store";
import type { Order } from "@/types/order";
import Button from "@/components/ui/Button";

export default function OrderReview() {
  const router = useRouter();
  const { items, getSubtotal, clearCart } = useCartStore();
  const { shippingAddress, paymentDetails, setStep, setProcessing, isProcessing, resetCheckout } =
    useCheckoutStore();
  const { addOrder } = useOrderStore();
  const [error, setError] = useState("");

  const subtotal = getSubtotal();
  const shipping = subtotal >= 100 ? 0 : 12.99;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  const formatPrice = (amount: number) =>
    new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(amount);

  const generateOrderNumber = () => {
    const prefix = "PB";
    const timestamp = Date.now().toString(36).toUpperCase();
    const random = Math.random().toString(36).substring(2, 6).toUpperCase();
    return `${prefix}-${timestamp}-${random}`;
  };

  const handlePlaceOrder = async () => {
    if (!shippingAddress || !paymentDetails) {
      setError("Missing checkout information. Please go back and complete all steps.");
      return;
    }

    setProcessing(true);
    setError("");

    // Simulate payment processing
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Create order
    const order: Order = {
      id: crypto.randomUUID(),
      orderNumber: generateOrderNumber(),
      items: items.map((item) => ({
        productId: item.product.id,
        productName: item.product.name,
        productImage: item.product.imageUrl,
        price: item.product.price,
        quantity: item.quantity,
      })),
      shippingAddress,
      subtotal,
      shipping,
      tax,
      total,
      status: "confirmed",
      createdAt: new Date().toISOString(),
      estimatedDelivery: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(),
    };

    // Save order and clear cart
    addOrder(order);
    clearCart();
    resetCheckout();

    // Redirect to confirmation
    router.push(`/order-confirmation/${order.id}`);
  };

  if (!shippingAddress || !paymentDetails) {
    return (
      <div className="rounded-2xl bg-white p-6 shadow-sm text-center">
        <p className="text-warm-gray">Missing checkout information.</p>
        <Button variant="primary" size="md" className="mt-4" onClick={() => setStep("shipping")}>
          Start Over
        </Button>
      </div>
    );
  }

  const maskedCard = `•••• •••• •••• ${paymentDetails.cardNumber.slice(-4)}`;

  return (
    <div className="rounded-2xl bg-white p-6 shadow-sm md:p-8">
      <button
        onClick={() => setStep("payment")}
        className="mb-4 flex items-center gap-1 text-sm text-warm-gray hover:text-dusty-rose transition-colors cursor-pointer"
      >
        <ArrowLeft size={14} />
        Back to payment
      </button>

      <h2 className="font-heading text-2xl font-semibold text-charcoal">
        Review Your Order
      </h2>
      <p className="mt-1 text-sm text-warm-gray">
        Please review your information before placing your order.
      </p>

      <div className="mt-6 space-y-6">
        {/* Shipping Address */}
        <div className="rounded-xl border border-cream p-4">
          <div className="flex items-start gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blush/50">
              <MapPin size={14} className="text-dusty-rose" />
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-semibold text-charcoal">Shipping Address</h4>
                <button
                  onClick={() => setStep("shipping")}
                  className="text-xs text-dusty-rose hover:underline cursor-pointer"
                >
                  Edit
                </button>
              </div>
              <p className="mt-1 text-sm text-warm-gray">
                {shippingAddress.firstName} {shippingAddress.lastName}
              </p>
              <p className="text-sm text-warm-gray">
                {shippingAddress.address}
                {shippingAddress.apartment && `, ${shippingAddress.apartment}`}
              </p>
              <p className="text-sm text-warm-gray">
                {shippingAddress.city}, {shippingAddress.state} {shippingAddress.zipCode}
              </p>
              <p className="text-sm text-warm-gray">{shippingAddress.email}</p>
              <p className="text-sm text-warm-gray">{shippingAddress.phone}</p>
            </div>
          </div>
        </div>

        {/* Payment Method */}
        <div className="rounded-xl border border-cream p-4">
          <div className="flex items-start gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blush/50">
              <CreditCard size={14} className="text-dusty-rose" />
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-semibold text-charcoal">Payment Method</h4>
                <button
                  onClick={() => setStep("payment")}
                  className="text-xs text-dusty-rose hover:underline cursor-pointer"
                >
                  Edit
                </button>
              </div>
              <p className="mt-1 text-sm text-warm-gray">{maskedCard}</p>
              <p className="text-sm text-warm-gray">Expires {paymentDetails.expiryDate}</p>
            </div>
          </div>
        </div>

        {/* Order Items */}
        <div className="rounded-xl border border-cream p-4">
          <h4 className="text-sm font-semibold text-charcoal">Order Items</h4>
          <ul className="mt-3 divide-y divide-cream">
            {items.map((item) => (
              <li key={item.product.id} className="flex items-center gap-3 py-3 first:pt-0 last:pb-0">
                <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-lg bg-cream">
                  <Image
                    src={item.product.imageUrl}
                    alt={item.product.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-charcoal">{item.product.name}</p>
                  <p className="text-xs text-warm-gray">Qty: {item.quantity}</p>
                </div>
                <span className="text-sm font-medium text-charcoal">
                  {formatPrice(item.product.price * item.quantity)}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Order Total */}
        <div className="rounded-xl bg-cream/50 p-4">
          <dl className="space-y-2">
            <div className="flex justify-between text-sm">
              <dt className="text-warm-gray">Subtotal</dt>
              <dd className="font-medium text-charcoal">{formatPrice(subtotal)}</dd>
            </div>
            <div className="flex justify-between text-sm">
              <dt className="text-warm-gray">Shipping</dt>
              <dd className="font-medium text-charcoal">
                {shipping === 0 ? <span className="text-sage">Free</span> : formatPrice(shipping)}
              </dd>
            </div>
            <div className="flex justify-between text-sm">
              <dt className="text-warm-gray">Tax</dt>
              <dd className="font-medium text-charcoal">{formatPrice(tax)}</dd>
            </div>
            <div className="flex justify-between border-t border-cream pt-2">
              <dt className="text-base font-semibold text-charcoal">Total</dt>
              <dd className="text-lg font-bold text-charcoal">{formatPrice(total)}</dd>
            </div>
          </dl>
        </div>

        {error && (
          <p className="text-sm text-dusty-rose text-center">{error}</p>
        )}

        <Button
          variant="primary"
          size="lg"
          className="w-full"
          onClick={handlePlaceOrder}
          disabled={isProcessing}
        >
          {isProcessing ? (
            <>
              <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
              Processing...
            </>
          ) : (
            <>
              <Check size={18} />
              Place Order — {formatPrice(total)}
            </>
          )}
        </Button>

        <p className="text-center text-xs text-warm-gray/60">
          By placing this order, you agree to our Terms of Service and Privacy Policy.
        </p>
      </div>
    </div>
  );
}
