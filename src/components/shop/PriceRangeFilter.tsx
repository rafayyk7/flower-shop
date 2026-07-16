"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

interface PriceRangeFilterProps {
  minPrice?: number;
  maxPrice?: number;
}

const PRICE_RANGES = [
  { label: "All Prices", min: 0, max: 999 },
  { label: "Under $75", min: 0, max: 75 },
  { label: "$75 - $100", min: 75, max: 100 },
  { label: "$100 - $150", min: 100, max: 150 },
  { label: "Over $150", min: 150, max: 999 },
];

export default function PriceRangeFilter({ minPrice, maxPrice }: PriceRangeFilterProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const [selectedRange, setSelectedRange] = useState<string>("All Prices");

  useEffect(() => {
    // Sync with URL params
    if (minPrice !== undefined && maxPrice !== undefined) {
      const range = PRICE_RANGES.find(
        (r) => r.min === minPrice && r.max === maxPrice
      );
      if (range) {
        setSelectedRange(range.label);
      }
    }
  }, [minPrice, maxPrice]);

  const handleChange = (label: string) => {
    setSelectedRange(label);
    
    const range = PRICE_RANGES.find((r) => r.label === label);
    if (!range) return;

    const params = new URLSearchParams(searchParams.toString());
    
    if (label === "All Prices") {
      params.delete("minPrice");
      params.delete("maxPrice");
    } else {
      params.set("minPrice", range.min.toString());
      params.set("maxPrice", range.max.toString());
    }

    router.push(`/shop?${params.toString()}`);
  };

  return (
    <div className="space-y-2">
      <label className="block text-xs font-semibold uppercase tracking-wider text-warm-gray">
        Price Range
      </label>
      <select
        value={selectedRange}
        onChange={(e) => handleChange(e.target.value)}
        className="w-full rounded-lg border border-cream bg-white px-3 py-2 text-sm text-charcoal outline-none transition-colors focus:border-rose cursor-pointer"
      >
        {PRICE_RANGES.map((range) => (
          <option key={range.label} value={range.label}>
            {range.label}
          </option>
        ))}
      </select>
    </div>
  );
}
