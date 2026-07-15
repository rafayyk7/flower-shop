"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { CheckCircle, Package, Truck, MapPin, Mail, ArrowRight } from "lucide-react";
import { useOrderStore } from "@/store/order-store";
import type { Order } from "@/types/order";
import Button from "@/components/ui/Button";

interface OrderConfirmationContentProps {
  orderId: string;
}

export default function OrderConfirmationContent({ orderId }: OrderConfirmationContentProps) {
  const { getOrder } = useOrderStore();
  const [order, setOrder] = useState<Order | undefined>(undefined);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const foundOrder = getOrder(orderId);
    setOrder(foundOrder);
  }, [orderId, getOrder]);

  const formatPrice = (amount: number) =>
    new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(amount);

  const formatDate = (dateString: string) =>
    new Date(dateString).toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });

  if (!mounted) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-dusty-rose border-t-transparent" />
      </div>
    );
  }

  if (!order) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center px-4 text-center">
        <Package size={48} className="text-warm-gray/40" />
        <h1 className="mt-4 font-heading text-2xl font-semibold text-charcoal">
          Order Not Found
        </h1>
        <p className="mt-2 text-sm text-warm-gray">
          We couldn&apos;t find this order. It may have expired or the link is invalid.
        </p>
        <Link href="/shop" className="mt-6">
          <Button variant="primary">Continue Shopping</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-ivory py-12">
      <div className="mx-auto max-w-3xl px-4">
        {/* Success Header */}
        <div className="text-center">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-sage/20">
            <CheckCircle size={40} className="text-sage" />
          </div>
          <h1 className="mt-6 font-heading text-3xl font-bold text-charcoal">
            Thank You for Your Order!
          </h1>
          <p className="mt-2 text-warm-gray">
            Your order has been confirmed and will be shipped soon.
          </p>
          <p className="mt-4 inline-flex items-center gap-2 rounded-full bg-cream px-4 py-2 text-sm font-semibold text-charcoal">
            Order #{order.orderNumber}
          </p>
        </div>

        {/* Confirmation Email Notice */}
        <div className="mt-8 flex items-center gap-3 rounded-xl bg-blush/30 p-4">
          <Mail size={20} className="shrink-0 text-dusty-rose" />
          <p className="text-sm text-charcoal">
            A confirmation email has been sent to{" "}
            <span className="font-semibold">{order.shippingAddress.email}</span>
          </p>
        </div>

        {/* Order Details Card */}
        <div className="mt-8 rounded-2xl bg-white p-6 shadow-sm">
          {/* Delivery Info */}
          <div className="flex flex-wrap gap-6 border-b border-cream pb-6">
            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-cream">
                <Truck size={18} className="text-sage" />
              </div>
              <div>
                <p className="text-xs font-medium uppercase tracking-wider text-warm-gray">
                  Estimated Delivery
                </p>
                <p className="mt-0.5 font-semibold text-charcoal">
                  {formatDate(order.estimatedDelivery)}
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-cream">
                <MapPin size={18} className="text-sage" />
              </div>
              <div>
                <p className="text-xs font-medium uppercase tracking-wider text-warm-gray">
                  Shipping To
                </p>
                <p className="mt-0.5 font-semibold text-charcoal">
                  {order.shippingAddress.city}, {order.shippingAddress.state}
                </p>
              </div>
            </div>
          </div>

          {/* Order Items */}
          <div className="py-6">
            <h3 className="font-heading text-lg font-semibold text-charcoal">Order Items</h3>
            <ul className="mt-4 divide-y divide-cream">
              {order.items.map((item) => (
                <li key={item.productId} className="flex items-center gap-4 py-4 first:pt-0 last:pb-0">
                  <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-xl bg-cream">
                    <Image
                      src={item.productImage}
                      alt={item.productName}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-charcoal">{item.productName}</p>
                    <p className="text-sm text-warm-gray">
                      {formatPrice(item.price)} × {item.quantity}
                    </p>
                  </div>
                  <span className="font-semibold text-charcoal">
                    {formatPrice(item.price * item.quantity)}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Order Summary */}
          <div className="border-t border-cream pt-6">
            <dl className="space-y-2">
              <div className="flex justify-between text-sm">
                <dt className="text-warm-gray">Subtotal</dt>
                <dd className="text-charcoal">{formatPrice(order.subtotal)}</dd>
              </div>
              <div className="flex justify-between text-sm">
                <dt className="text-warm-gray">Shipping</dt>
                <dd className="text-charcoal">
                  {order.shipping === 0 ? "Free" : formatPrice(order.shipping)}
                </dd>
              </div>
              <div className="flex justify-between text-sm">
                <dt className="text-warm-gray">Tax</dt>
                <dd className="text-charcoal">{formatPrice(order.tax)}</dd>
              </div>
              <div className="flex justify-between border-t border-cream pt-2">
                <dt className="text-base font-semibold text-charcoal">Total</dt>
                <dd className="text-xl font-bold text-charcoal">{formatPrice(order.total)}</dd>
              </div>
            </dl>
          </div>
        </div>

        {/* Shipping Address */}
        <div className="mt-6 rounded-2xl bg-white p-6 shadow-sm">
          <h3 className="font-heading text-lg font-semibold text-charcoal">Shipping Address</h3>
          <address className="mt-3 text-sm not-italic text-warm-gray">
            <p className="font-medium text-charcoal">
              {order.shippingAddress.firstName} {order.shippingAddress.lastName}
            </p>
            <p>{order.shippingAddress.address}</p>
            {order.shippingAddress.apartment && <p>{order.shippingAddress.apartment}</p>}
            <p>
              {order.shippingAddress.city}, {order.shippingAddress.state}{" "}
              {order.shippingAddress.zipCode}
            </p>
            <p>{order.shippingAddress.country}</p>
            <p className="mt-2">{order.shippingAddress.phone}</p>
          </address>
        </div>

        {/* Actions */}
        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Link href="/account/orders">
            <Button variant="outline" size="lg">
              View Order History
            </Button>
          </Link>
          <Link href="/shop">
            <Button variant="primary" size="lg">
              Continue Shopping
              <ArrowRight size={16} />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
