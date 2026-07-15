"use client";

import Image from "next/image";
import Link from "next/link";
import { ShoppingBag, Heart } from "lucide-react";
import { useState } from "react";
import type { Product } from "@/types";
import Badge from "@/components/ui/Badge";
import StarRating from "@/components/ui/StarRating";

interface ProductCardProps {
  product: Product;
  /** Priority loading for above-the-fold images */
  priority?: boolean;
}

/**
 * ProductCard — Premium, responsive product card.
 *
 * Architecture notes:
 * ───────────────────
 * • "use client" is required because we manage local hover/wishlist
 *   state via useState. The parent page can still be a Server Component
 *   and simply pass the `product` prop down.
 *
 * • We use Next/Image with `fill` + `object-cover` inside a fixed
 *   aspect-ratio container for responsive images without layout shift.
 *
 * • The card is wrapped in a <Link> for SEO-friendly navigation,
 *   while the action buttons use `e.preventDefault()` to avoid
 *   triggering navigation.
 */
export default function ProductCard({ product, priority = false }: ProductCardProps) {
  const [isWishlisted, setIsWishlisted] = useState(false);

  const hasDiscount = product.compareAtPrice && product.compareAtPrice > product.price;
  const discountPercent = hasDiscount
    ? Math.round(((product.compareAtPrice! - product.price) / product.compareAtPrice!) * 100)
    : 0;

  const formatPrice = (amount: number) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: product.currency,
    }).format(amount);

  return (
    <Link
      href={`/shop/${product.slug}`}
      className="group relative flex flex-col overflow-hidden rounded-2xl bg-white shadow-[0_2px_20px_rgba(0,0,0,0.06)] transition-all duration-500 hover:shadow-[0_8px_40px_rgba(183,110,121,0.15)] hover:-translate-y-1"
    >
      {/* ── Image Container ── */}
      <div className="relative aspect-[4/5] w-full overflow-hidden bg-cream">
        <Image
          src={product.imageUrl}
          alt={product.name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          priority={priority}
        />

        {/* Gradient overlay on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal/40 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

        {/* ── Badges (top-left) ── */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5">
          {hasDiscount && <Badge variant="sale">-{discountPercent}%</Badge>}
          {product.isNew && <Badge variant="new">New</Badge>}
          {product.isBestseller && <Badge variant="bestseller">Bestseller</Badge>}
        </div>

        {/* ── Wishlist button (top-right) ── */}
        <button
          onClick={(e) => {
            e.preventDefault();
            setIsWishlisted((prev) => !prev);
          }}
          className="absolute top-3 right-3 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 shadow-sm backdrop-blur-sm transition-all duration-300 hover:bg-white hover:scale-110 cursor-pointer"
          aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
        >
          <Heart
            size={16}
            className={
              isWishlisted
                ? "fill-dusty-rose text-dusty-rose"
                : "fill-transparent text-charcoal/60"
            }
          />
        </button>

        {/* ── Quick Add button (bottom, revealed on hover) ── */}
        <div className="absolute inset-x-3 bottom-3 translate-y-3 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
          <button
            onClick={(e) => {
              e.preventDefault();
              // Future: dispatch to cart context / API
            }}
            className="flex w-full items-center justify-center gap-2 rounded-full bg-white px-4 py-2.5 text-sm font-medium text-charcoal shadow-lg backdrop-blur-sm transition-colors duration-300 hover:bg-dusty-rose hover:text-white cursor-pointer"
          >
            <ShoppingBag size={16} />
            Add to Bag
          </button>
        </div>
      </div>

      {/* ── Details ── */}
      <div className="flex flex-1 flex-col p-4 pt-3.5">
        {/* Rating */}
        <div className="mb-1.5 flex items-center gap-1.5">
          <StarRating rating={product.rating} size={12} />
          <span className="text-[11px] text-warm-gray/70">({product.reviewCount})</span>
        </div>

        {/* Name */}
        <h3 className="font-heading text-base font-semibold leading-snug text-charcoal group-hover:text-dusty-rose transition-colors duration-300">
          {product.name}
        </h3>

        {/* Short description */}
        <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-warm-gray/80">
          {product.shortDescription}
        </p>

        {/* Price row */}
        <div className="mt-auto flex items-baseline gap-2 pt-3">
          <span className="text-lg font-semibold text-charcoal">
            {formatPrice(product.price)}
          </span>
          {hasDiscount && (
            <span className="text-sm text-warm-gray/50 line-through">
              {formatPrice(product.compareAtPrice!)}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
