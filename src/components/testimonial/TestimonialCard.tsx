import type { Testimonial } from "@/types";
import StarRating from "@/components/ui/StarRating";
import { Quote } from "lucide-react";

interface TestimonialCardProps {
  testimonial: Testimonial;
}

export default function TestimonialCard({ testimonial }: TestimonialCardProps) {
  return (
    <div className="relative flex flex-col rounded-2xl bg-white p-6 shadow-[0_2px_20px_rgba(0,0,0,0.04)] md:p-8">
      {/* Quote icon */}
      <Quote size={28} className="mb-4 text-blush" />

      {/* Rating */}
      <StarRating rating={testimonial.rating} className="mb-3" />

      {/* Text */}
      <p className="flex-1 text-sm leading-relaxed text-warm-gray italic">
        &ldquo;{testimonial.text}&rdquo;
      </p>

      {/* Author */}
      <div className="mt-5 flex items-center gap-3 border-t border-cream pt-4">
        {/* Avatar placeholder */}
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blush text-sm font-semibold text-dusty-rose">
          {testimonial.name
            .split(" ")
            .map((n) => n[0])
            .join("")}
        </div>
        <div>
          <p className="text-sm font-semibold text-charcoal">{testimonial.name}</p>
          <p className="text-xs text-warm-gray/70">{testimonial.location}</p>
        </div>
      </div>
    </div>
  );
}
