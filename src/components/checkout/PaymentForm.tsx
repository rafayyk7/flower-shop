"use client";

import { useState } from "react";
import { ArrowLeft, CreditCard, Lock } from "lucide-react";
import { useCheckoutStore } from "@/store/checkout-store";
import type { PaymentDetails } from "@/types/order";
import Button from "@/components/ui/Button";

export default function PaymentForm() {
  const { setPaymentDetails, setStep } = useCheckoutStore();
  const [errors, setErrors] = useState<Record<string, string>>({});

  const [form, setForm] = useState<PaymentDetails>({
    cardNumber: "",
    cardHolder: "",
    expiryDate: "",
    cvv: "",
  });

  const formatCardNumber = (value: string) => {
    const digits = value.replace(/\D/g, "").slice(0, 16);
    return digits.replace(/(\d{4})(?=\d)/g, "$1 ");
  };

  const formatExpiry = (value: string) => {
    const digits = value.replace(/\D/g, "").slice(0, 4);
    if (digits.length >= 2) {
      return `${digits.slice(0, 2)}/${digits.slice(2)}`;
    }
    return digits;
  };

  const updateField = (field: keyof PaymentDetails, value: string) => {
    let formattedValue = value;
    if (field === "cardNumber") {
      formattedValue = formatCardNumber(value);
    } else if (field === "expiryDate") {
      formattedValue = formatExpiry(value);
    } else if (field === "cvv") {
      formattedValue = value.replace(/\D/g, "").slice(0, 4);
    }

    setForm((prev) => ({ ...prev, [field]: formattedValue }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};

    const cardDigits = form.cardNumber.replace(/\s/g, "");
    if (!cardDigits) {
      newErrors.cardNumber = "Card number is required";
    } else if (cardDigits.length < 13 || cardDigits.length > 16) {
      newErrors.cardNumber = "Please enter a valid card number";
    }

    if (!form.cardHolder.trim()) {
      newErrors.cardHolder = "Cardholder name is required";
    }

    if (!form.expiryDate) {
      newErrors.expiryDate = "Expiry date is required";
    } else {
      const [month, year] = form.expiryDate.split("/");
      const currentYear = new Date().getFullYear() % 100;
      const currentMonth = new Date().getMonth() + 1;
      if (
        !month ||
        !year ||
        parseInt(month) < 1 ||
        parseInt(month) > 12 ||
        parseInt(year) < currentYear ||
        (parseInt(year) === currentYear && parseInt(month) < currentMonth)
      ) {
        newErrors.expiryDate = "Please enter a valid expiry date";
      }
    }

    if (!form.cvv) {
      newErrors.cvv = "CVV is required";
    } else if (form.cvv.length < 3) {
      newErrors.cvv = "Please enter a valid CVV";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      setPaymentDetails(form);
    }
  };

  const inputClass = (field: string) =>
    `w-full rounded-lg border px-4 py-3 text-sm text-charcoal placeholder:text-warm-gray/50 outline-none transition-colors ${
      errors[field]
        ? "border-dusty-rose bg-blush/10 focus:border-dusty-rose"
        : "border-cream bg-white focus:border-rose"
    }`;

  return (
    <div className="rounded-2xl bg-white p-6 shadow-sm md:p-8">
      <button
        onClick={() => setStep("shipping")}
        className="mb-4 flex items-center gap-1 text-sm text-warm-gray hover:text-dusty-rose transition-colors cursor-pointer"
      >
        <ArrowLeft size={14} />
        Back to shipping
      </button>

      <h2 className="font-heading text-2xl font-semibold text-charcoal">
        Payment Details
      </h2>
      <p className="mt-1 text-sm text-warm-gray">
        Your payment information is secure and encrypted.
      </p>

      {/* Test card notice */}
      <div className="mt-4 flex items-start gap-2 rounded-lg bg-sage/10 p-3">
        <CreditCard size={16} className="mt-0.5 shrink-0 text-sage" />
        <p className="text-xs text-sage-dark">
          <strong>Demo Mode:</strong> Use any test card number (e.g., 4242 4242 4242 4242) with any future expiry and CVV.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="mt-6 space-y-5">
        {/* Card Number */}
        <div>
          <label htmlFor="cardNumber" className="mb-1.5 block text-sm font-medium text-charcoal">
            Card Number *
          </label>
          <div className="relative">
            <input
              type="text"
              id="cardNumber"
              value={form.cardNumber}
              onChange={(e) => updateField("cardNumber", e.target.value)}
              className={`${inputClass("cardNumber")} pr-12`}
              placeholder="4242 4242 4242 4242"
            />
            <CreditCard size={18} className="absolute right-4 top-1/2 -translate-y-1/2 text-warm-gray/40" />
          </div>
          {errors.cardNumber && <p className="mt-1 text-xs text-dusty-rose">{errors.cardNumber}</p>}
        </div>

        {/* Cardholder Name */}
        <div>
          <label htmlFor="cardHolder" className="mb-1.5 block text-sm font-medium text-charcoal">
            Cardholder Name *
          </label>
          <input
            type="text"
            id="cardHolder"
            value={form.cardHolder}
            onChange={(e) => updateField("cardHolder", e.target.value)}
            className={inputClass("cardHolder")}
            placeholder="JANE DOE"
          />
          {errors.cardHolder && <p className="mt-1 text-xs text-dusty-rose">{errors.cardHolder}</p>}
        </div>

        {/* Expiry and CVV */}
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="expiryDate" className="mb-1.5 block text-sm font-medium text-charcoal">
              Expiry Date *
            </label>
            <input
              type="text"
              id="expiryDate"
              value={form.expiryDate}
              onChange={(e) => updateField("expiryDate", e.target.value)}
              className={inputClass("expiryDate")}
              placeholder="MM/YY"
            />
            {errors.expiryDate && <p className="mt-1 text-xs text-dusty-rose">{errors.expiryDate}</p>}
          </div>
          <div>
            <label htmlFor="cvv" className="mb-1.5 block text-sm font-medium text-charcoal">
              CVV *
            </label>
            <input
              type="text"
              id="cvv"
              value={form.cvv}
              onChange={(e) => updateField("cvv", e.target.value)}
              className={inputClass("cvv")}
              placeholder="123"
            />
            {errors.cvv && <p className="mt-1 text-xs text-dusty-rose">{errors.cvv}</p>}
          </div>
        </div>

        {/* Security notice */}
        <div className="flex items-center gap-2 text-xs text-warm-gray/60">
          <Lock size={12} />
          <span>Your payment details are encrypted and secure</span>
        </div>

        <Button type="submit" variant="primary" size="lg" className="w-full mt-6">
          Review Order
        </Button>
      </form>
    </div>
  );
}
