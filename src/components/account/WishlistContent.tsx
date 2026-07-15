"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Heart, ShoppingBag, Trash2 } from "lucide-react";
import { useWishlistStore } from "@/store/wishlist-store";
import { useCartStore } from "@/store/cart-store";
import Button from "@/components/ui/Button";

export default function WishlistContent() {
  const { items, removeItem, moveToCart } = useWishlistStore();
  const { addItem: addToCart, openCart } = useCartStore();

  const formatPrice = (amount: number) =>
    new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(amount);

  const handleMoveToCart = (productId: string) => {
    moveToCart(productId, addToCart);
    openCart();
  };

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
          <h1 className="font-heading text-3xl font-bold text-charcoal">My Wishlist</h1>
          <p className="mt-1 text-warm-gray">
            {items.length} saved arrangement{items.length !== 1 ? "s" : ""}
          </p>
        </div>

        {items.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-2xl bg-white py-16 shadow-sm text-center">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-blush/50">
              <Heart size={32} className="text-dusty-rose" />
            </div>
            <h2 className="mt-4 font-heading text-xl font-semibold text-charcoal">
              Your wishlist is empty
            </h2>
            <p className="mt-2 max-w-sm text-sm text-warm-gray">
              Save your favorite arrangements to buy them later or share with friends.
            </p>
            <Link href="/shop" className="mt-6">
              <Button variant="primary">Explore Arrangements</Button>
            </Link>
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2">
            {items.map((product) => (
              <div
                key={product.id}
                className="flex gap-4 rounded-2xl bg-white p-4 shadow-sm"
              >
                <Link
                  href={`/shop/${product.slug}`}
                  className="relative h-32 w-32 shrink-0 overflow-hidden rounded-xl bg-cream"
                >
                  <Image
                    src={product.imageUrl}
                    alt={product.name}
                    fill
                    className="object-cover transition-transform hover:scale-105"
                  />
                </Link>

                <div className="flex flex-1 flex-col">
                  <Link
                    href={`/shop/${product.slug}`}
                    className="font-heading text-base font-semibold text-charcoal hover:text-dusty-rose transition-colors"
                  >
                    {product.name}
                  </Link>
                  <p className="mt-1 text-xs text-warm-gray line-clamp-2">
                    {product.shortDescription}
                  </p>
                  <p className="mt-2 font-semibold text-charcoal">
                    {formatPrice(product.price)}
                  </p>

                  <div className="mt-auto flex items-center gap-2 pt-3">
                    <button
                      onClick={() => handleMoveToCart(product.id)}
                      className="flex flex-1 items-center justify-center gap-1.5 rounded-full bg-dusty-rose px-3 py-2 text-xs font-medium text-white transition-colors hover:bg-rose cursor-pointer"
                    >
                      <ShoppingBag size={14} />
                      Move to Bag
                    </button>
                    <button
                      onClick={() => removeItem(product.id)}
                      className="flex h-9 w-9 items-center justify-center rounded-full border border-cream text-warm-gray transition-colors hover:border-dusty-rose hover:text-dusty-rose cursor-pointer"
                      aria-label="Remove from wishlist"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
