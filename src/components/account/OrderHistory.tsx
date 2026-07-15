"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Package, ChevronRight } from "lucide-react";
import { useAuthStore } from "@/store/auth-store";
import { useOrderStore } from "@/store/order-store";
import Button from "@/components/ui/Button";

export default function OrderHistory() {
  const router = useRouter();
  const { isAuthenticated } = useAuthStore();
  const { orders } = useOrderStore();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login");
    }
  }, [isAuthenticated, router]);

  const formatPrice = (amount: number) =>
    new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(amount);

  const formatDate = (dateString: string) =>
    new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "delivered":
        return "bg-sage/20 text-sage-dark";
      case "shipped":
        return "bg-gold/20 text-gold";
      case "processing":
        return "bg-blush text-dusty-rose";
      case "cancelled":
        return "bg-warm-gray/20 text-warm-gray";
      default:
        return "bg-cream text-charcoal";
    }
  };

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-ivory py-12">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <Link
            href="/account"
            className="mb-4 inline-flex items-center gap-1 text-sm text-warm-gray hover:text-dusty-rose transition-colors"
          >
            <ArrowLeft size={14} />
            Back to Account
          </Link>
          <h1 className="font-heading text-3xl font-bold text-charcoal">Order History</h1>
          <p className="mt-1 text-warm-gray">View and track all your orders</p>
        </div>

        {orders.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-2xl bg-white py-16 shadow-sm text-center">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-cream">
              <Package size={32} className="text-warm-gray/50" />
            </div>
            <h2 className="mt-4 font-heading text-xl font-semibold text-charcoal">
              No orders yet
            </h2>
            <p className="mt-2 text-sm text-warm-gray">
              When you place an order, it will appear here.
            </p>
            <Link href="/shop" className="mt-6">
              <Button variant="primary">Start Shopping</Button>
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => (
              <div key={order.id} className="rounded-2xl bg-white p-6 shadow-sm">
                {/* Order Header */}
                <div className="flex flex-wrap items-start justify-between gap-4 border-b border-cream pb-4">
                  <div>
                    <p className="font-semibold text-charcoal">Order #{order.orderNumber}</p>
                    <p className="text-sm text-warm-gray">Placed on {formatDate(order.createdAt)}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-charcoal">{formatPrice(order.total)}</p>
                    <span
                      className={`mt-1 inline-block rounded-full px-2.5 py-0.5 text-xs font-medium ${getStatusColor(
                        order.status
                      )}`}
                    >
                      {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                    </span>
                  </div>
                </div>

                {/* Order Items */}
                <ul className="divide-y divide-cream">
                  {order.items.map((item) => (
                    <li key={item.productId} className="flex items-center gap-4 py-4">
                      <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-lg bg-cream">
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
                      <span className="font-medium text-charcoal">
                        {formatPrice(item.price * item.quantity)}
                      </span>
                    </li>
                  ))}
                </ul>

                {/* Order Footer */}
                <div className="mt-4 flex items-center justify-between border-t border-cream pt-4">
                  <div className="text-sm text-warm-gray">
                    <span className="font-medium text-charcoal">Delivery:</span>{" "}
                    {formatDate(order.estimatedDelivery)}
                  </div>
                  <Link
                    href={`/order-confirmation/${order.id}`}
                    className="flex items-center gap-1 text-sm font-medium text-dusty-rose hover:underline"
                  >
                    View Details
                    <ChevronRight size={14} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
