"use client";

import Image from "next/image";
import Link from "next/link";
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight, ArrowLeft } from "lucide-react";
import { useCartStore } from "@/store/cart-store";
import Button from "@/components/ui/Button";
import SectionHeading from "@/components/ui/SectionHeading";

export default function CartPageContent() {
  const { items, removeItem, updateQuantity, clearCart, getSubtotal } = useCartStore();

  const subtotal = getSubtotal();
  const shipping = subtotal >= 100 ? 0 : 12.99;
  const total = subtotal + shipping;

  const formatPrice = (amount: number) =>
    new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(amount);

  if (items.length === 0) {
    return (
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="flex h-24 w-24 items-center justify-center rounded-full bg-cream">
              <ShoppingBag size={40} className="text-warm-gray/40" />
            </div>
            <h1 className="mt-6 font-heading text-3xl font-semibold text-charcoal">
              Your bag is empty
            </h1>
            <p className="mt-3 max-w-md text-sm text-warm-gray">
              Looks like you haven&apos;t added any beautiful arrangements to your bag yet. 
              Explore our collection and find the perfect blooms.
            </p>
            <Link href="/shop" className="mt-8">
              <Button variant="primary" size="lg">
                <ShoppingBag size={18} />
                Start Shopping
              </Button>
            </Link>
          </div>
        </div>
      </section>
    );
  }

  return (
    <>
      {/* Header */}
      <section className="border-b border-cream bg-white py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            subtitle="Review Your Selection"
            title="Your Bag"
            description={`You have ${items.length} ${items.length === 1 ? "arrangement" : "arrangements"} in your bag.`}
          />
        </div>
      </section>

      {/* Cart Content */}
      <section className="py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-3">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              {/* Table Header (desktop) */}
              <div className="hidden border-b border-cream pb-4 md:grid md:grid-cols-12 md:gap-4">
                <div className="col-span-6 text-xs font-semibold uppercase tracking-wider text-warm-gray">
                  Product
                </div>
                <div className="col-span-2 text-center text-xs font-semibold uppercase tracking-wider text-warm-gray">
                  Price
                </div>
                <div className="col-span-2 text-center text-xs font-semibold uppercase tracking-wider text-warm-gray">
                  Quantity
                </div>
                <div className="col-span-2 text-right text-xs font-semibold uppercase tracking-wider text-warm-gray">
                  Total
                </div>
              </div>

              {/* Items */}
              <ul className="divide-y divide-cream">
                {items.map((item) => (
                  <li
                    key={item.product.id}
                    className="py-6 md:grid md:grid-cols-12 md:items-center md:gap-4"
                  >
                    {/* Product info */}
                    <div className="flex gap-4 md:col-span-6">
                      <Link
                        href={`/shop/${item.product.slug}`}
                        className="relative h-28 w-28 shrink-0 overflow-hidden rounded-xl bg-cream md:h-24 md:w-24"
                      >
                        <Image
                          src={item.product.imageUrl}
                          alt={item.product.name}
                          fill
                          className="object-cover"
                        />
                      </Link>
                      <div className="flex flex-col">
                        <Link
                          href={`/shop/${item.product.slug}`}
                          className="font-heading text-base font-semibold text-charcoal hover:text-dusty-rose transition-colors"
                        >
                          {item.product.name}
                        </Link>
                        <p className="mt-1 text-xs text-warm-gray line-clamp-2">
                          {item.product.shortDescription}
                        </p>
                        <button
                          onClick={() => removeItem(item.product.id)}
                          className="mt-auto flex items-center gap-1 text-xs text-warm-gray/60 transition-colors hover:text-dusty-rose cursor-pointer md:hidden"
                        >
                          <Trash2 size={12} />
                          Remove
                        </button>
                      </div>
                    </div>

                    {/* Price (desktop) */}
                    <div className="hidden text-center md:col-span-2 md:block">
                      <span className="text-sm font-medium text-charcoal">
                        {formatPrice(item.product.price)}
                      </span>
                    </div>

                    {/* Quantity */}
                    <div className="mt-4 flex items-center justify-between md:col-span-2 md:mt-0 md:justify-center">
                      <span className="text-xs text-warm-gray md:hidden">Quantity:</span>
                      <div className="flex items-center rounded-full border border-cream bg-white">
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                          className="flex h-8 w-8 items-center justify-center text-warm-gray transition-colors hover:text-charcoal cursor-pointer"
                          aria-label="Decrease quantity"
                        >
                          <Minus size={14} />
                        </button>
                        <span className="w-8 text-center text-sm font-medium text-charcoal">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                          className="flex h-8 w-8 items-center justify-center text-warm-gray transition-colors hover:text-charcoal cursor-pointer"
                          aria-label="Increase quantity"
                        >
                          <Plus size={14} />
                        </button>
                      </div>
                    </div>

                    {/* Line total */}
                    <div className="mt-4 flex items-center justify-between md:col-span-2 md:mt-0 md:justify-end">
                      <span className="text-xs text-warm-gray md:hidden">Total:</span>
                      <div className="flex items-center gap-3">
                        <span className="text-sm font-semibold text-charcoal">
                          {formatPrice(item.product.price * item.quantity)}
                        </span>
                        <button
                          onClick={() => removeItem(item.product.id)}
                          className="hidden h-7 w-7 items-center justify-center rounded-full text-warm-gray/50 transition-colors hover:bg-blush hover:text-dusty-rose cursor-pointer md:flex"
                          aria-label={`Remove ${item.product.name} from cart`}
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>

              {/* Cart actions */}
              <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-t border-cream pt-6">
                <Link href="/shop">
                  <Button variant="ghost" size="sm">
                    <ArrowLeft size={16} />
                    Continue Shopping
                  </Button>
                </Link>
                <Button variant="outline" size="sm" onClick={clearCart}>
                  Clear Cart
                </Button>
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="rounded-2xl bg-cream/50 p-6">
                <h3 className="font-heading text-lg font-semibold text-charcoal">
                  Order Summary
                </h3>

                <dl className="mt-6 space-y-3">
                  <div className="flex items-center justify-between">
                    <dt className="text-sm text-warm-gray">Subtotal</dt>
                    <dd className="text-sm font-medium text-charcoal">
                      {formatPrice(subtotal)}
                    </dd>
                  </div>
                  <div className="flex items-center justify-between">
                    <dt className="text-sm text-warm-gray">Shipping</dt>
                    <dd className="text-sm font-medium text-charcoal">
                      {shipping === 0 ? (
                        <span className="text-sage">Free</span>
                      ) : (
                        formatPrice(shipping)
                      )}
                    </dd>
                  </div>
                  {shipping > 0 && (
                    <p className="text-xs text-warm-gray/60">
                      Add {formatPrice(100 - subtotal)} more for free shipping
                    </p>
                  )}
                  <div className="border-t border-cream pt-3">
                    <div className="flex items-center justify-between">
                      <dt className="text-base font-semibold text-charcoal">Total</dt>
                      <dd className="text-xl font-bold text-charcoal">
                        {formatPrice(total)}
                      </dd>
                    </div>
                  </div>
                </dl>

                {/* Promo code */}
                <div className="mt-6">
                  <label
                    htmlFor="promo-code"
                    className="block text-xs font-medium text-warm-gray"
                  >
                    Promo Code
                  </label>
                  <div className="mt-1.5 flex gap-2">
                    <input
                      type="text"
                      id="promo-code"
                      placeholder="Enter code"
                      className="flex-1 rounded-lg border border-cream bg-white px-3 py-2 text-sm text-charcoal placeholder:text-warm-gray/40 outline-none transition-colors focus:border-rose"
                    />
                    <Button variant="outline" size="sm">
                      Apply
                    </Button>
                  </div>
                </div>

                {/* Checkout button */}
                <Link href="/checkout" className="mt-6 block">
                  <Button variant="primary" size="lg" className="w-full">
                    Proceed to Checkout
                    <ArrowRight size={16} />
                  </Button>
                </Link>

                {/* Trust badges */}
                <div className="mt-6 flex items-center justify-center gap-4 text-xs text-warm-gray/60">
                  <span>🔒 Secure checkout</span>
                  <span>•</span>
                  <span>💳 All cards accepted</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
