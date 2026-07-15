"use client";

import { useState } from "react";
import { ShoppingBag, Check } from "lucide-react";
import Button from "@/components/ui/Button";

interface AddToBagButtonProps {
  inStock: boolean;
}

export default function AddToBagButton({ inStock }: AddToBagButtonProps) {
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    // Future: dispatch to cart context / API
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  if (!inStock) {
    return (
      <Button variant="outline" size="lg" disabled className="w-full opacity-50">
        Out of Stock
      </Button>
    );
  }

  return (
    <div className="flex items-center gap-3">
      {/* Quantity selector */}
      <div className="flex items-center rounded-full border border-cream">
        <button
          onClick={() => setQuantity((q) => Math.max(1, q - 1))}
          className="flex h-11 w-11 items-center justify-center text-warm-gray transition-colors hover:text-charcoal cursor-pointer"
          aria-label="Decrease quantity"
        >
          −
        </button>
        <span className="w-8 text-center text-sm font-medium text-charcoal">{quantity}</span>
        <button
          onClick={() => setQuantity((q) => q + 1)}
          className="flex h-11 w-11 items-center justify-center text-warm-gray transition-colors hover:text-charcoal cursor-pointer"
          aria-label="Increase quantity"
        >
          +
        </button>
      </div>

      {/* Add to bag */}
      <Button variant="primary" size="lg" onClick={handleAdd} className="flex-1">
        {added ? (
          <>
            <Check size={18} />
            Added!
          </>
        ) : (
          <>
            <ShoppingBag size={18} />
            Add to Bag
          </>
        )}
      </Button>
    </div>
  );
}
