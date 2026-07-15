import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type { Order } from "@/types/order";

// ============================================================
// Order Store — Persists order history
// ============================================================

interface OrderState {
  orders: Order[];
  addOrder: (order: Order) => void;
  getOrder: (orderId: string) => Order | undefined;
  clearOrders: () => void;
}

export const useOrderStore = create<OrderState>()(
  persist(
    (set, get) => ({
      orders: [],

      addOrder: (order) =>
        set((state) => ({
          orders: [order, ...state.orders],
        })),

      getOrder: (orderId) => get().orders.find((o) => o.id === orderId),

      clearOrders: () => set({ orders: [] }),
    }),
    {
      name: "petal-bloom-orders",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
