import { Star } from "lucide-react";

interface StarRatingProps {
  rating: number;
  maxStars?: number;
  size?: number;
  className?: string;
}

export default function StarRating({ rating, maxStars = 5, size = 14, className = "" }: StarRatingProps) {
  return (
    <div className={`flex items-center gap-0.5 ${className}`} aria-label={`${rating} out of ${maxStars} stars`}>
      {Array.from({ length: maxStars }, (_, i) => {
        const filled = i < Math.floor(rating);
        const half = !filled && i < rating;
        return (
          <Star
            key={i}
            size={size}
            className={
              filled
                ? "fill-gold text-gold"
                : half
                  ? "fill-gold/50 text-gold"
                  : "fill-transparent text-gold/30"
            }
          />
        );
      })}
    </div>
  );
}
