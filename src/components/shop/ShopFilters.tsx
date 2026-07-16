"use client";

import Link from "next/link";
import { useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { SlidersHorizontal, X } from "lucide-react";
import type { Category } from "@/types";

interface ShopFiltersProps {
  categories: Category[];
  activeCategory?: string;
  activeSort?: string;
  minPrice?: number;
  maxPrice?: number;
  resultCount: number;
}

const sortOptions = [
  { value: "", label: "Featured" },
  { value: "newest", label: "Newest" },
  { value: "price-asc", label: "Price: Low → High" },
  { value: "price-desc", label: "Price: High → Low" },
  { value: "rating", label: "Top Rated" },
];

const priceRanges = [
  { label: "All Prices", min: 0, max: 999 },
  { label: "Under $75", min: 0, max: 75 },
  { label: "$75 - $100", min: 75, max: 100 },
  { label: "$100 - $150", min: 100, max: 150 },
  { label: "Over $150", min: 150, max: 999 },
];

export default function ShopFilters({
  categories,
  activeCategory,
  activeSort = "",
  minPrice,
  maxPrice,
  resultCount,
}: ShopFiltersProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const buildHref = useCallback(
    (params: { category?: string; sort?: string; minPrice?: number; maxPrice?: number; clear?: boolean }) => {
      if (params.clear) {
        return "/shop";
      }
      
      const sp = new URLSearchParams();
      const cat = params.category !== undefined ? params.category : activeCategory;
      const srt = params.sort !== undefined ? params.sort : activeSort;
      const min = params.minPrice !== undefined ? params.minPrice : minPrice;
      const max = params.maxPrice !== undefined ? params.maxPrice : maxPrice;
      
      if (cat) sp.set("category", cat);
      if (srt) sp.set("sort", srt);
      if (min !== undefined && min > 0) sp.set("minPrice", min.toString());
      if (max !== undefined && max < 999) sp.set("maxPrice", max.toString());
      
      const qs = sp.toString();
      return `/shop${qs ? `?${qs}` : ""}`;
    },
    [activeCategory, activeSort, minPrice, maxPrice],
  );

  const getCurrentPriceLabel = () => {
    if (minPrice === undefined || maxPrice === undefined) return "All Prices";
    const range = priceRanges.find((r) => r.min === minPrice && r.max === maxPrice);
    return range?.label || "All Prices";
  };

  const hasActiveFilters = activeCategory || activeSort || (minPrice !== undefined && minPrice > 0) || (maxPrice !== undefined && maxPrice < 999);

  return (
    <div className="space-y-4">
      {/* Top row: Category pills + Result count */}
      <div className="flex flex-wrap items-center gap-2">
        <Link
          href="/shop"
          className={`rounded-full px-4 py-1.5 text-xs font-medium transition-all duration-300 ${
            !activeCategory
              ? "bg-dusty-rose text-white shadow-sm"
              : "bg-cream text-warm-gray hover:bg-blush/50"
          }`}
        >
          All
        </Link>
        {categories.map((cat) => (
          <Link
            key={cat.id}
            href={buildHref({ category: cat.slug })}
            className={`rounded-full px-4 py-1.5 text-xs font-medium transition-all duration-300 ${
              activeCategory === cat.slug
                ? "bg-dusty-rose text-white shadow-sm"
                : "bg-cream text-warm-gray hover:bg-blush/50"
            }`}
          >
            {cat.name}
          </Link>
        ))}
      </div>

      {/* Second row: Filters + Sort */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-t border-cream pt-4">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <SlidersHorizontal size={14} className="text-warm-gray" />
            <span className="text-xs font-medium text-warm-gray">Filters:</span>
          </div>

          {/* Price Range Dropdown */}
          <select
            value={getCurrentPriceLabel()}
            onChange={(e) => {
              const range = priceRanges.find((r) => r.label === e.target.value);
              if (range) {
                if (range.label === "All Prices") {
                  router.push(buildHref({ minPrice: 0, maxPrice: 999 }));
                } else {
                  router.push(buildHref({ minPrice: range.min, maxPrice: range.max }));
                }
              }
            }}
            className="rounded-lg border border-cream bg-white px-3 py-1.5 text-xs text-charcoal outline-none transition-colors focus:border-rose cursor-pointer"
          >
            {priceRanges.map((range) => (
              <option key={range.label} value={range.label}>
                {range.label}
              </option>
            ))}
          </select>

          {/* Clear filters */}
          {hasActiveFilters && (
            <Link
              href="/shop"
              className="flex items-center gap-1 rounded-full bg-blush/50 px-3 py-1 text-xs font-medium text-dusty-rose hover:bg-blush transition-colors"
            >
              <X size={12} />
              Clear all
            </Link>
          )}
        </div>

        {/* Sort + count */}
        <div className="flex items-center gap-4">
          <span className="text-xs text-warm-gray/60">
            {resultCount} arrangement{resultCount !== 1 ? "s" : ""}
          </span>
          <div className="flex items-center gap-2">
            <label htmlFor="sort-select" className="text-xs text-warm-gray">
              Sort:
            </label>
            <select
              id="sort-select"
              value={activeSort}
              onChange={(e) => {
                router.push(buildHref({ sort: e.target.value || undefined }));
              }}
              className="cursor-pointer rounded-lg border border-cream bg-white px-3 py-1.5 text-xs text-charcoal outline-none transition-colors focus:border-rose"
            >
              {sortOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}
