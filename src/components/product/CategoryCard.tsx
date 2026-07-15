import Image from "next/image";
import Link from "next/link";
import type { Category } from "@/types";

interface CategoryCardProps {
  category: Category;
}

export default function CategoryCard({ category }: CategoryCardProps) {
  return (
    <Link
      href={`/shop?category=${category.slug}`}
      className="group relative flex aspect-[3/4] flex-col justify-end overflow-hidden rounded-2xl"
    >
      {/* Background image */}
      <Image
        src={category.imageUrl}
        alt={category.name}
        fill
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 33vw, 16vw"
        className="object-cover transition-transform duration-700 group-hover:scale-110"
      />

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-charcoal/70 via-charcoal/20 to-transparent" />

      {/* Content */}
      <div className="relative z-10 p-5">
        <h3 className="font-heading text-xl font-semibold text-white">{category.name}</h3>
        <p className="mt-1 text-xs text-white/70">{category.productCount} arrangements</p>
        <div className="mt-3 flex items-center gap-1 text-xs font-medium text-white/90 group-hover:text-blush transition-colors duration-300">
          Explore
          <svg
            className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
        </div>
      </div>
    </Link>
  );
}
