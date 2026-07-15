"use client";

import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { X, Plus, Minus, ShoppingBag, Trash2 } from "lucide-react";
import { useCartStore } from "@/store/cart-store";
import Button from "@/components/ui/Button";

export default function CartDrawer() {
  const { items, isOpen, closeCart, removeItem, updateQuantity, getSubtotal } =
    useCartStore();

  const subtotal = getSubtotal();
  const formatPrice = (amount: number) =>
    new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(amount);

  // Prevent body scroll when drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Close on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeCart();
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [closeCart]);

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 z-50 bg-charcoal/50 backdrop-blur-sm transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={closeCart}
        aria-hidden="true"
      />

      {/* Drawer */}
      <aside
        className={`fixed top-0 right-0 z-50 flex h-full w-full max-w-md flex-col bg-white shadow-2xl transition-transform duration-300 ease-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
        aria-label="Shopping cart"
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-cream px-5 py-4">
          <h2 className="flex items-center gap-2 font-heading text-lg font-semibold text-charcoal">
            <ShoppingBag size={20} className="text-dusty-rose" />
            Your Bag
            <span className="ml-1 text-sm font-normal text-warm-gray">
              ({items.length} {items.length === 1 ? "item" : "items"})
            </span>
          </h2>
          <button
            onClick={closeCart}
            className="flex h-8 w-8 items-center justify-center rounded-full text-warm-gray transition-colors hover:bg-cream hover:text-charcoal cursor-pointer"
            aria-label="Close cart"
          >
            <X size={18} />
          </button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto px-5 py-4">
          {items.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center text-center">
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-cream">
                <ShoppingBag size={32} className="text-warm-gray/50" />
              </div>
              <h3 className="mt-4 font-heading text-lg font-semibold text-charcoal">
                Your bag is empty
              </h3>
              <p className="mt-2 text-sm text-warm-gray">
                Add some beautiful arrangements to get started.
              </p>
              <Button
                variant="primary"
                size="md"
                className="mt-6"
                onClick={closeCart}
              >
                <Link href="/shop">Continue Shopping</Link>
              </Button>
            </div>
          ) : (
            <ul className="space-y-4">
              {items.map((item) => (
                <li
                  key={item.product.id}
                  className="flex gap-4 rounded-xl bg-ivory p-3"
                >
                  {/* Product Image */}
                  <Link
                    href={`/shop/${item.product.slug}`}
                    onClick={closeCart}
                    className="relative h-24 w-24 shrink-0 overflow-hidden rounded-lg bg-cream"
                  >
                    <Image
                      src={item.product.imageUrl}
                      alt={item.product.name}
                      fill
                      className="object-cover"
                    />
                  </Link>

                  {/* Product Info */}
                  <div className="flex flex-1 flex-col">
                    <div className="flex items-start justify-between gap-2">
                      <Link
                        href={`/shop/${item.product.slug}`}
                        onClick={closeCart}
                        className="font-heading text-sm font-semibold text-charcoal hover:text-dusty-rose transition-colors"
                      >
                        {item.product.name}
                      </Link>
                      <button
                        onClick={() => removeItem(item.product.id)}
                        className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-warm-gray/60 transition-colors hover:bg-blush hover:text-dusty-rose cursor-pointer"
                        aria-label={`Remove ${item.product.name} from cart`}
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>

                    <p className="mt-0.5 text-xs text-warm-gray line-clamp-1">
                      {item.product.shortDescription}
                    </p>

                    <div className="mt-auto flex items-center justify-between pt-2">
                      {/* Quantity controls */}
                      <div className="flex items-center rounded-full border border-cream bg-white">
                        <button
                          onClick={() =>
                            updateQuantity(item.product.id, item.quantity - 1)
                          }
                          className="flex h-7 w-7 items-center justify-center text-warm-gray transition-colors hover:text-charcoal cursor-pointer"
                          aria-label="Decrease quantity"
                        >
                          <Minus size={12} />
                        </button>
                        <span className="w-6 text-center text-xs font-medium text-charcoal">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            updateQuantity(item.product.id, item.quantity + 1)
                          }
                          className="flex h-7 w-7 items-center justify-center text-warm-gray transition-colors hover:text-charcoal cursor-pointer"
                          aria-label="Increase quantity"
                        >
                          <Plus size={12} />
                        </button>
                      </div>

                      {/* Line total */}
                      <span className="text-sm font-semibold text-charcoal">
                        {formatPrice(item.product.price * item.quantity)}
                      </span>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t border-cream px-5 py-4">
            {/* Subtotal */}
            <div className="flex items-center justify-between">
              <span className="text-sm text-warm-gray">Subtotal</span>
              <span className="text-lg font-bold text-charcoal">
                {formatPrice(subtotal)}
              </span>
            </div>
            <p className="mt-1 text-xs text-warm-gray/60">
              Shipping & taxes calculated at checkout
            </p>

            {/* Action buttons */}
            <div className="mt-4 space-y-2">
              <Link href="/cart" onClick={closeCart} className="block">
                <Button variant="outline" size="lg" className="w-full">
                  View Full Cart
                </Button>
              </Link>
              <Link href="/checkout" onClick={closeCart} className="block">
                <Button variant="primary" size="lg" className="w-full">
                  Checkout — {formatPrice(subtotal)}
                </Button>
              </Link>
            </div>
          </div>
        )}
      </aside>
    </>
  );
}
