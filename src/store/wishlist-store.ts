import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type { Product } from "@/types";

// ============================================================
// Wishlist Store — Persisted to localStorage
// ============================================================

interface WishlistState {
  items: Product[];

  // Actions
  addItem: (product: Product) => void;
  removeItem: (productId: string) => void;
  toggleItem: (product: Product) => void;
  isInWishlist: (productId: string) => boolean;
  clearWishlist: () => void;
  moveToCart: (productId: string, addToCart: (product: Product) => void) => void;
}

export const useWishlistStore = create<WishlistState>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (product) => {
        set((state) => {
          if (state.items.some((p) => p.id === product.id)) {
            return state; // Already in wishlist
          }
          return { items: [...state.items, product] };
        });
      },

      removeItem: (productId) => {
        set((state) => ({
          items: state.items.filter((p) => p.id !== productId),
        }));
      },

      toggleItem: (product) => {
        const { items, addItem, removeItem } = get();
        if (items.some((p) => p.id === product.id)) {
          removeItem(product.id);
        } else {
          addItem(product);
        }
      },

      isInWishlist: (productId) => {
        return get().items.some((p) => p.id === productId);
      },

      clearWishlist: () => {
        set({ items: [] });
      },

      moveToCart: (productId, addToCart) => {
        const product = get().items.find((p) => p.id === productId);
        if (product) {
          addToCart(product);
          get().removeItem(productId);
        }
      },
    }),
    {
      name: "petal-bloom-wishlist",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
