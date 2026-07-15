"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Package, Heart, MapPin, Settings, LogOut, ChevronRight } from "lucide-react";
import { useAuthStore } from "@/store/auth-store";
import { useOrderStore } from "@/store/order-store";
import { useWishlistStore } from "@/store/wishlist-store";
import Button from "@/components/ui/Button";

export default function AccountDashboard() {
  const router = useRouter();
  const { user, isAuthenticated, logout } = useAuthStore();
  const { orders } = useOrderStore();
  const { items: wishlistItems } = useWishlistStore();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login");
    }
  }, [isAuthenticated, router]);

  if (!isAuthenticated || !user) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-dusty-rose border-t-transparent" />
      </div>
    );
  }

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  const menuItems = [
    {
      href: "/account/orders",
      icon: Package,
      label: "Order History",
      description: `${orders.length} order${orders.length !== 1 ? "s" : ""}`,
    },
    {
      href: "/account/wishlist",
      icon: Heart,
      label: "Wishlist",
      description: `${wishlistItems.length} item${wishlistItems.length !== 1 ? "s" : ""}`,
    },
    {
      href: "/account/addresses",
      icon: MapPin,
      label: "Saved Addresses",
      description: "Manage delivery addresses",
    },
    {
      href: "/account/settings",
      icon: Settings,
      label: "Account Settings",
      description: "Update your profile",
    },
  ];

  return (
    <div className="min-h-screen bg-ivory py-12">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="rounded-2xl bg-white p-6 shadow-sm md:p-8">
          <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-blush text-2xl font-bold text-dusty-rose">
                {user.firstName[0]}
                {user.lastName[0]}
              </div>
              <div>
                <h1 className="font-heading text-2xl font-bold text-charcoal">
                  Hello, {user.firstName}!
                </h1>
                <p className="text-sm text-warm-gray">{user.email}</p>
              </div>
            </div>
            <Button variant="outline" size="sm" onClick={handleLogout}>
              <LogOut size={14} />
              Sign Out
            </Button>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          <div className="rounded-xl bg-white p-5 shadow-sm">
            <p className="text-xs font-medium uppercase tracking-wider text-warm-gray">
              Total Orders
            </p>
            <p className="mt-1 font-heading text-3xl font-bold text-charcoal">{orders.length}</p>
          </div>
          <div className="rounded-xl bg-white p-5 shadow-sm">
            <p className="text-xs font-medium uppercase tracking-wider text-warm-gray">
              Wishlist Items
            </p>
            <p className="mt-1 font-heading text-3xl font-bold text-charcoal">
              {wishlistItems.length}
            </p>
          </div>
          <div className="rounded-xl bg-white p-5 shadow-sm">
            <p className="text-xs font-medium uppercase tracking-wider text-warm-gray">
              Member Since
            </p>
            <p className="mt-1 font-heading text-xl font-bold text-charcoal">
              {new Date(user.createdAt).toLocaleDateString("en-US", {
                month: "short",
                year: "numeric",
              })}
            </p>
          </div>
        </div>

        {/* Menu Items */}
        <div className="mt-6 overflow-hidden rounded-2xl bg-white shadow-sm">
          {menuItems.map((item, index) => (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center justify-between p-5 transition-colors hover:bg-ivory ${
                index !== menuItems.length - 1 ? "border-b border-cream" : ""
              }`}
            >
              <div className="flex items-center gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blush/50">
                  <item.icon size={18} className="text-dusty-rose" />
                </div>
                <div>
                  <p className="font-medium text-charcoal">{item.label}</p>
                  <p className="text-sm text-warm-gray">{item.description}</p>
                </div>
              </div>
              <ChevronRight size={18} className="text-warm-gray/50" />
            </Link>
          ))}
        </div>

        {/* Recent Orders Preview */}
        {orders.length > 0 && (
          <div className="mt-6 rounded-2xl bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <h2 className="font-heading text-lg font-semibold text-charcoal">Recent Orders</h2>
              <Link href="/account/orders" className="text-sm text-dusty-rose hover:underline">
                View all
              </Link>
            </div>
            <ul className="mt-4 space-y-3">
              {orders.slice(0, 3).map((order) => (
                <li
                  key={order.id}
                  className="flex items-center justify-between rounded-lg bg-ivory p-4"
                >
                  <div>
                    <p className="font-medium text-charcoal">Order #{order.orderNumber}</p>
                    <p className="text-sm text-warm-gray">
                      {new Date(order.createdAt).toLocaleDateString()} • {order.items.length} item
                      {order.items.length !== 1 ? "s" : ""}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-charcoal">
                      {new Intl.NumberFormat("en-US", {
                        style: "currency",
                        currency: "USD",
                      }).format(order.total)}
                    </p>
                    <span
                      className={`inline-block rounded-full px-2 py-0.5 text-xs font-medium ${
                        order.status === "delivered"
                          ? "bg-sage/20 text-sage-dark"
                          : order.status === "shipped"
                            ? "bg-gold/20 text-gold"
                            : "bg-blush text-dusty-rose"
                      }`}
                    >
                      {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
