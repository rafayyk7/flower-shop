"use client";

import { useState } from "react";
import { useCheckoutStore } from "@/store/checkout-store";
import type { ShippingAddress } from "@/types/order";
import Button from "@/components/ui/Button";

const US_STATES = [
  "Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado", "Connecticut",
  "Delaware", "Florida", "Georgia", "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa",
  "Kansas", "Kentucky", "Louisiana", "Maine", "Maryland", "Massachusetts", "Michigan",
  "Minnesota", "Mississippi", "Missouri", "Montana", "Nebraska", "Nevada", "New Hampshire",
  "New Jersey", "New Mexico", "New York", "North Carolina", "North Dakota", "Ohio",
  "Oklahoma", "Oregon", "Pennsylvania", "Rhode Island", "South Carolina", "South Dakota",
  "Tennessee", "Texas", "Utah", "Vermont", "Virginia", "Washington", "West Virginia",
  "Wisconsin", "Wyoming"
];

export default function ShippingForm() {
  const { setShippingAddress } = useCheckoutStore();
  const [errors, setErrors] = useState<Record<string, string>>({});

  const [form, setForm] = useState<ShippingAddress>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    apartment: "",
    city: "",
    state: "",
    zipCode: "",
    country: "United States",
  });

  const updateField = (field: keyof ShippingAddress, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!form.firstName.trim()) newErrors.firstName = "First name is required";
    if (!form.lastName.trim()) newErrors.lastName = "Last name is required";
    if (!form.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = "Please enter a valid email";
    }
    if (!form.phone.trim()) newErrors.phone = "Phone number is required";
    if (!form.address.trim()) newErrors.address = "Address is required";
    if (!form.city.trim()) newErrors.city = "City is required";
    if (!form.state.trim()) newErrors.state = "State is required";
    if (!form.zipCode.trim()) {
      newErrors.zipCode = "ZIP code is required";
    } else if (!/^\d{5}(-\d{4})?$/.test(form.zipCode)) {
      newErrors.zipCode = "Please enter a valid ZIP code";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      setShippingAddress(form);
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
      <h2 className="font-heading text-2xl font-semibold text-charcoal">
        Shipping Information
      </h2>
      <p className="mt-1 text-sm text-warm-gray">
        Where should we deliver your beautiful arrangement?
      </p>

      <form onSubmit={handleSubmit} className="mt-6 space-y-5">
        {/* Name row */}
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="firstName" className="mb-1.5 block text-sm font-medium text-charcoal">
              First Name *
            </label>
            <input
              type="text"
              id="firstName"
              value={form.firstName}
              onChange={(e) => updateField("firstName", e.target.value)}
              className={inputClass("firstName")}
              placeholder="Jane"
            />
            {errors.firstName && <p className="mt-1 text-xs text-dusty-rose">{errors.firstName}</p>}
          </div>
          <div>
            <label htmlFor="lastName" className="mb-1.5 block text-sm font-medium text-charcoal">
              Last Name *
            </label>
            <input
              type="text"
              id="lastName"
              value={form.lastName}
              onChange={(e) => updateField("lastName", e.target.value)}
              className={inputClass("lastName")}
              placeholder="Doe"
            />
            {errors.lastName && <p className="mt-1 text-xs text-dusty-rose">{errors.lastName}</p>}
          </div>
        </div>

        {/* Contact row */}
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-charcoal">
              Email *
            </label>
            <input
              type="email"
              id="email"
              value={form.email}
              onChange={(e) => updateField("email", e.target.value)}
              className={inputClass("email")}
              placeholder="jane@example.com"
            />
            {errors.email && <p className="mt-1 text-xs text-dusty-rose">{errors.email}</p>}
          </div>
          <div>
            <label htmlFor="phone" className="mb-1.5 block text-sm font-medium text-charcoal">
              Phone *
            </label>
            <input
              type="tel"
              id="phone"
              value={form.phone}
              onChange={(e) => updateField("phone", e.target.value)}
              className={inputClass("phone")}
              placeholder="(555) 123-4567"
            />
            {errors.phone && <p className="mt-1 text-xs text-dusty-rose">{errors.phone}</p>}
          </div>
        </div>

        {/* Address */}
        <div>
          <label htmlFor="address" className="mb-1.5 block text-sm font-medium text-charcoal">
            Street Address *
          </label>
          <input
            type="text"
            id="address"
            value={form.address}
            onChange={(e) => updateField("address", e.target.value)}
            className={inputClass("address")}
            placeholder="123 Bloom Street"
          />
          {errors.address && <p className="mt-1 text-xs text-dusty-rose">{errors.address}</p>}
        </div>

        {/* Apartment */}
        <div>
          <label htmlFor="apartment" className="mb-1.5 block text-sm font-medium text-charcoal">
            Apartment, suite, etc. (optional)
          </label>
          <input
            type="text"
            id="apartment"
            value={form.apartment}
            onChange={(e) => updateField("apartment", e.target.value)}
            className={inputClass("apartment")}
            placeholder="Apt 4B"
          />
        </div>

        {/* City, State, ZIP */}
        <div className="grid gap-4 sm:grid-cols-3">
          <div>
            <label htmlFor="city" className="mb-1.5 block text-sm font-medium text-charcoal">
              City *
            </label>
            <input
              type="text"
              id="city"
              value={form.city}
              onChange={(e) => updateField("city", e.target.value)}
              className={inputClass("city")}
              placeholder="New York"
            />
            {errors.city && <p className="mt-1 text-xs text-dusty-rose">{errors.city}</p>}
          </div>
          <div>
            <label htmlFor="state" className="mb-1.5 block text-sm font-medium text-charcoal">
              State *
            </label>
            <select
              id="state"
              value={form.state}
              onChange={(e) => updateField("state", e.target.value)}
              className={inputClass("state")}
            >
              <option value="">Select state</option>
              {US_STATES.map((state) => (
                <option key={state} value={state}>
                  {state}
                </option>
              ))}
            </select>
            {errors.state && <p className="mt-1 text-xs text-dusty-rose">{errors.state}</p>}
          </div>
          <div>
            <label htmlFor="zipCode" className="mb-1.5 block text-sm font-medium text-charcoal">
              ZIP Code *
            </label>
            <input
              type="text"
              id="zipCode"
              value={form.zipCode}
              onChange={(e) => updateField("zipCode", e.target.value)}
              className={inputClass("zipCode")}
              placeholder="10001"
            />
            {errors.zipCode && <p className="mt-1 text-xs text-dusty-rose">{errors.zipCode}</p>}
          </div>
        </div>

        {/* Country (disabled for now) */}
        <div>
          <label htmlFor="country" className="mb-1.5 block text-sm font-medium text-charcoal">
            Country
          </label>
          <input
            type="text"
            id="country"
            value={form.country}
            disabled
            className="w-full rounded-lg border border-cream bg-cream/50 px-4 py-3 text-sm text-warm-gray"
          />
        </div>

        <Button type="submit" variant="primary" size="lg" className="w-full mt-6">
          Continue to Payment
        </Button>
      </form>
    </div>
  );
}
