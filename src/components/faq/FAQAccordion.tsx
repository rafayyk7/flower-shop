"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQAccordionProps {
  questions: FAQItem[];
}

export default function FAQAccordion({ questions }: FAQAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="divide-y divide-cream overflow-hidden rounded-2xl bg-white shadow-sm">
      {questions.map((item, index) => (
        <div key={index}>
          <button
            onClick={() => toggle(index)}
            className="flex w-full items-center justify-between px-6 py-5 text-left transition-colors hover:bg-ivory cursor-pointer"
            aria-expanded={openIndex === index}
          >
            <span className="pr-4 font-medium text-charcoal">{item.question}</span>
            <ChevronDown
              size={18}
              className={`shrink-0 text-warm-gray transition-transform duration-300 ${
                openIndex === index ? "rotate-180" : ""
              }`}
            />
          </button>
          <div
            className={`overflow-hidden transition-all duration-300 ${
              openIndex === index ? "max-h-96" : "max-h-0"
            }`}
          >
            <div className="px-6 pb-5 text-sm leading-relaxed text-warm-gray">
              {item.answer}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
