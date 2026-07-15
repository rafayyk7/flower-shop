"use client";

import Link from "next/link";
import { useCallback } from "react";
import type { Category } from "@/types";

interface ShopFiltersProps {
  categories: Category[];
  activeCategory?: string;
  activeSort?: string;
  resultCount: number;
}

const sortOptions = [
  { value: "", label: "Featured" },
  { value: "newest", label: "Newest" },
  { value: "price-asc", label: "Price: Low → High" },
  { value: "price-desc", label: "Price: High → Low" },
  { value: "rating", label: "Top Rated" },
];

export default function ShopFilters({
  categories,
  activeCategory,
  activeSort = "",
  resultCount,
}: ShopFiltersProps) {
  const buildHref = useCallback(
    (params: { category?: string; sort?: string }) => {
      const sp = new URLSearchParams();
      const cat = params.category ?? activeCategory;
      const srt = params.sort ?? activeSort;
      if (cat) sp.set("category", cat);
      if (srt) sp.set("sort", srt);
      const qs = sp.toString();
      return `/shop${qs ? `?${qs}` : ""}`;
    },
    [activeCategory, activeSort],
  );

  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      {/* Category pills */}
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
            href={buildHref({ category: cat.slug, sort: activeSort })}
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

      {/* Sort + count */}
      <div className="flex items-center gap-4">
        <span className="text-xs text-warm-gray/60">{resultCount} arrangement{resultCount !== 1 ? "s" : ""}</span>
        <div className="flex items-center gap-2">
          <label htmlFor="sort-select" className="text-xs text-warm-gray">Sort:</label>
          {/* We use plain links for sort to keep it server-side friendly */}
          <select
            id="sort-select"
            defaultValue={activeSort}
            onChange={(e) => {
              const href = buildHref({ sort: e.target.value || undefined });
              window.location.href = href;
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
  );
}
