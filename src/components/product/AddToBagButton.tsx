"use client";

import { useState } from "react";
import { ShoppingBag, Check } from "lucide-react";
import { useCartStore } from "@/store/cart-store";
import type { Product } from "@/types";
import Button from "@/components/ui/Button";

interface AddToBagButtonProps {
  product: Product;
}

export default function AddToBagButton({ product }: AddToBagButtonProps) {
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const { addItem, openCart } = useCartStore();

  const handleAdd = () => {
    addItem(product, quantity);
    setAdded(true);
    
    setTimeout(() => {
      setAdded(false);
      openCart();
    }, 800);
  };

  if (!product.inStock) {
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
      <Button 
        variant={added ? "secondary" : "primary"} 
        size="lg" 
        onClick={handleAdd} 
        className="flex-1"
        disabled={added}
      >
        {added ? (
          <>
            <Check size={18} />
            Added to Bag!
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
