"use client";

import { Check } from "lucide-react";

export interface ProductSize {
  id: string;
  name: string;
  description: string;
  priceModifier: number; // e.g., 0 for base, 20 for +$20, -10 for -$10
  popular?: boolean;
}

interface SizeSelectorProps {
  sizes: ProductSize[];
  selectedSize: ProductSize;
  onSelect: (size: ProductSize) => void;
  basePrice: number;
}

export default function SizeSelector({
  sizes,
  selectedSize,
  onSelect,
  basePrice,
}: SizeSelectorProps) {
  const formatPrice = (modifier: number) => {
    const price = basePrice + modifier;
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(price);
  };

  return (
    <div className="space-y-3">
      <label className="block text-sm font-medium text-charcoal">
        Select Size
      </label>
      <div className="grid gap-3 sm:grid-cols-3">
        {sizes.map((size) => (
          <button
            key={size.id}
            onClick={() => onSelect(size)}
            className={`relative flex flex-col items-center rounded-xl border-2 p-4 text-center transition-all cursor-pointer ${
              selectedSize.id === size.id
                ? "border-dusty-rose bg-blush/20"
                : "border-cream hover:border-rose/50"
            }`}
          >
            {/* Popular badge */}
            {size.popular && (
              <span className="absolute -top-2 left-1/2 -translate-x-1/2 rounded-full bg-sage px-2 py-0.5 text-[10px] font-semibold uppercase text-white">
                Popular
              </span>
            )}

            {/* Selected check */}
            {selectedSize.id === size.id && (
              <span className="absolute top-2 right-2 flex h-5 w-5 items-center justify-center rounded-full bg-dusty-rose">
                <Check size={12} className="text-white" />
              </span>
            )}

            <span className="font-heading text-base font-semibold text-charcoal">
              {size.name}
            </span>
            <span className="mt-1 text-xs text-warm-gray">{size.description}</span>
            <span className="mt-2 font-semibold text-charcoal">
              {formatPrice(size.priceModifier)}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}

// Default sizes for products
export const defaultProductSizes: ProductSize[] = [
  {
    id: "small",
    name: "Petite",
    description: "Perfect for desks",
    priceModifier: -15,
  },
  {
    id: "medium",
    name: "Classic",
    description: "Our signature size",
    priceModifier: 0,
    popular: true,
  },
  {
    id: "large",
    name: "Grand",
    description: "Make a statement",
    priceModifier: 35,
  },
];
