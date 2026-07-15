import { create } from "zustand";
import type { ShippingAddress, PaymentDetails, CheckoutStep } from "@/types/order";

// ============================================================
// Checkout Store — Multi-step form state management
// ============================================================

interface CheckoutState {
  currentStep: CheckoutStep;
  shippingAddress: ShippingAddress | null;
  paymentDetails: PaymentDetails | null;
  isProcessing: boolean;

  // Actions
  setStep: (step: CheckoutStep) => void;
  setShippingAddress: (address: ShippingAddress) => void;
  setPaymentDetails: (payment: PaymentDetails) => void;
  setProcessing: (processing: boolean) => void;
  resetCheckout: () => void;
}

const initialState = {
  currentStep: "shipping" as CheckoutStep,
  shippingAddress: null,
  paymentDetails: null,
  isProcessing: false,
};

export const useCheckoutStore = create<CheckoutState>((set) => ({
  ...initialState,

  setStep: (step) => set({ currentStep: step }),

  setShippingAddress: (address) =>
    set({ shippingAddress: address, currentStep: "payment" }),

  setPaymentDetails: (payment) =>
    set({ paymentDetails: payment, currentStep: "review" }),

  setProcessing: (processing) => set({ isProcessing: processing }),

  resetCheckout: () => set(initialState),
}));
