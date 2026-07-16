"use client";

import { useState } from "react";
import { Calendar, Truck, Zap } from "lucide-react";

interface DeliveryOption {
  id: string;
  label: string;
  date: Date;
  price: number;
  icon: typeof Calendar;
  description: string;
}

interface DeliveryDatePickerProps {
  selectedOption: DeliveryOption | null;
  onSelect: (option: DeliveryOption) => void;
}

const getDeliveryOptions = (): DeliveryOption[] => {
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  const dayAfter = new Date(today);
  dayAfter.setDate(dayAfter.getDate() + 2);
  const standard = new Date(today);
  standard.setDate(standard.getDate() + 3);

  const currentHour = today.getHours();

  const options: DeliveryOption[] = [];

  // Same-day delivery (only available before 2 PM)
  if (currentHour < 14) {
    options.push({
      id: "same-day",
      label: "Same Day",
      date: today,
      price: 25,
      icon: Zap,
      description: "Order within 2 hours for delivery today",
    });
  }

  // Next day delivery
  options.push({
    id: "next-day",
    label: "Next Day",
    date: tomorrow,
    price: 15,
    icon: Truck,
    description: "Delivered by 6 PM",
  });

  // Standard delivery (free over $100)
  options.push({
    id: "standard",
    label: "Standard",
    date: standard,
    price: 0,
    icon: Calendar,
    description: "Free delivery in 2-3 days",
  });

  return options;
};

const formatDate = (date: Date) => {
  return date.toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
  });
};

export default function DeliveryDatePicker({
  selectedOption,
  onSelect,
}: DeliveryDatePickerProps) {
  const options = getDeliveryOptions();

  return (
    <div className="space-y-3">
      <label className="block text-sm font-medium text-charcoal">
        Choose Delivery Date
      </label>
      <div className="space-y-2">
        {options.map((option) => {
          const Icon = option.icon;
          const isSelected = selectedOption?.id === option.id;

          return (
            <button
              key={option.id}
              onClick={() => onSelect(option)}
              className={`flex w-full items-center gap-4 rounded-xl border-2 p-4 text-left transition-all cursor-pointer ${
                isSelected
                  ? "border-dusty-rose bg-blush/20"
                  : "border-cream hover:border-rose/50"
              }`}
            >
              <div
                className={`flex h-10 w-10 items-center justify-center rounded-full ${
                  isSelected ? "bg-dusty-rose text-white" : "bg-cream text-warm-gray"
                }`}
              >
                <Icon size={18} />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-charcoal">{option.label}</span>
                  <span className="text-sm text-warm-gray">• {formatDate(option.date)}</span>
                </div>
                <p className="text-xs text-warm-gray">{option.description}</p>
              </div>
              <div className="text-right">
                {option.price === 0 ? (
                  <span className="font-semibold text-sage">Free</span>
                ) : (
                  <span className="font-semibold text-charcoal">+${option.price}</span>
                )}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

export type { DeliveryOption };
