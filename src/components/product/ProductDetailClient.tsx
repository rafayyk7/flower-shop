"use client";

import { useState } from "react";
import type { Product } from "@/types";
import ProductGallery from "./ProductGallery";
import SizeSelector, { defaultProductSizes, type ProductSize } from "./SizeSelector";
import DeliveryDatePicker, { type DeliveryOption } from "./DeliveryDatePicker";
import EnhancedAddToBag from "./EnhancedAddToBag";

interface ProductDetailClientProps {
  product: Product;
}

export default function ProductDetailClient({ product }: ProductDetailClientProps) {
  const [selectedSize, setSelectedSize] = useState<ProductSize>(
    defaultProductSizes.find((s) => s.popular) || defaultProductSizes[1]
  );
  const [selectedDelivery, setSelectedDelivery] = useState<DeliveryOption | null>(null);

  return (
    <div className="space-y-8">
      {/* Gallery */}
      <ProductGallery images={product.images} productName={product.name} />

      {/* Size Selection */}
      <SizeSelector
        sizes={defaultProductSizes}
        selectedSize={selectedSize}
        onSelect={setSelectedSize}
        basePrice={product.price}
      />

      {/* Delivery Date */}
      <DeliveryDatePicker
        selectedOption={selectedDelivery}
        onSelect={setSelectedDelivery}
      />

      {/* Add to Bag */}
      <EnhancedAddToBag
        product={product}
        selectedSize={selectedSize}
        selectedDelivery={selectedDelivery}
      />
    </div>
  );
}
