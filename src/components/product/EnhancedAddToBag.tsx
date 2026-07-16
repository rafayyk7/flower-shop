"use client";

import { useState } from "react";
import { ShoppingBag, Check, Heart } from "lucide-react";
import { useCartStore } from "@/store/cart-store";
import { useWishlistStore } from "@/store/wishlist-store";
import type { Product } from "@/types";
import type { ProductSize } from "./SizeSelector";
import type { DeliveryOption } from "./DeliveryDatePicker";
import Button from "@/components/ui/Button";

interface EnhancedAddToBagProps {
  product: Product;
  selectedSize: ProductSize;
  selectedDelivery: DeliveryOption | null;
}

export default function EnhancedAddToBag({
  product,
  selectedSize,
  selectedDelivery,
}: EnhancedAddToBagProps) {
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const { addItem, openCart } = useCartStore();
  const { toggleItem, isInWishlist } = useWishlistStore();

  const isWishlisted = isInWishlist(product.id);
  const finalPrice = product.price + selectedSize.priceModifier;
  const deliveryPrice = selectedDelivery?.price || 0;
  const totalPrice = (finalPrice + deliveryPrice) * quantity;

  const formatPrice = (amount: number) =>
    new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(amount);

  const handleAddToBag = () => {
    if (!selectedDelivery) return;

    // Create a modified product with the selected options
    const modifiedProduct: Product = {
      ...product,
      price: finalPrice,
      name: `${product.name} (${selectedSize.name})`,
    };

    addItem(modifiedProduct, quantity);
    setAdded(true);

    setTimeout(() => {
      setAdded(false);
      openCart();
    }, 800);
  };

  return (
    <div className="space-y-4">
      {/* Quantity & Add to Bag */}
      <div className="flex items-center gap-3">
        {/* Quantity selector */}
        <div className="flex items-center rounded-full border border-cream">
          <button
            onClick={() => setQuantity((q) => Math.max(1, q - 1))}
            className="flex h-12 w-12 items-center justify-center text-warm-gray transition-colors hover:text-charcoal cursor-pointer"
            aria-label="Decrease quantity"
          >
            −
          </button>
          <span className="w-8 text-center text-sm font-medium text-charcoal">
            {quantity}
          </span>
          <button
            onClick={() => setQuantity((q) => q + 1)}
            className="flex h-12 w-12 items-center justify-center text-warm-gray transition-colors hover:text-charcoal cursor-pointer"
            aria-label="Increase quantity"
          >
            +
          </button>
        </div>

        {/* Add to bag button */}
        <Button
          variant={added ? "secondary" : "primary"}
          size="lg"
          onClick={handleAddToBag}
          disabled={added || !selectedDelivery}
          className="flex-1"
        >
          {added ? (
            <>
              <Check size={18} />
              Added to Bag!
            </>
          ) : (
            <>
              <ShoppingBag size={18} />
              Add to Bag — {formatPrice(totalPrice)}
            </>
          )}
        </Button>

        {/* Wishlist button */}
        <button
          onClick={() => toggleItem(product)}
          className={`flex h-12 w-12 items-center justify-center rounded-full border-2 transition-all cursor-pointer ${
            isWishlisted
              ? "border-dusty-rose bg-blush/30"
              : "border-cream hover:border-dusty-rose"
          }`}
          aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
        >
          <Heart
            size={18}
            className={isWishlisted ? "fill-dusty-rose text-dusty-rose" : "text-warm-gray"}
          />
        </button>
      </div>

      {/* Price breakdown */}
      {quantity > 1 && (
        <div className="rounded-lg bg-cream/50 p-3 text-sm">
          <div className="flex justify-between text-warm-gray">
            <span>
              {formatPrice(finalPrice)} × {quantity}
            </span>
            <span>{formatPrice(finalPrice * quantity)}</span>
          </div>
          {deliveryPrice > 0 && (
            <div className="flex justify-between text-warm-gray">
              <span>Delivery</span>
              <span>{formatPrice(deliveryPrice)}</span>
            </div>
          )}
        </div>
      )}

      {/* Delivery reminder */}
      {!selectedDelivery && (
        <p className="text-center text-sm text-dusty-rose">
          Please select a delivery date above
        </p>
      )}
    </div>
  );
}
