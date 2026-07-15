"use client";

import { ShoppingBag } from "lucide-react";
import { useCartStore } from "@/store/cart-store";

export default function CartButton() {
  const { openCart, getItemCount } = useCartStore();
  const itemCount = getItemCount();

  return (
    <button
      onClick={openCart}
      className="relative rounded-full p-2 text-warm-gray transition-colors duration-300 hover:bg-blush/40 hover:text-dusty-rose cursor-pointer"
      aria-label={`Shopping cart with ${itemCount} items`}
    >
      <ShoppingBag size={18} />
      {itemCount > 0 && (
        <span className="absolute -top-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-dusty-rose text-[10px] font-bold text-white animate-in zoom-in-50 duration-200">
          {itemCount > 99 ? "99+" : itemCount}
        </span>
      )}
    </button>
  );
}
