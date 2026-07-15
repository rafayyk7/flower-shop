"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Search, X, ArrowRight } from "lucide-react";
import { products } from "@/data/products";
import type { Product } from "@/types";

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Product[]>([]);

  // Focus input when modal opens
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    } else {
      setQuery("");
      setResults([]);
    }
  }, [isOpen]);

  // Search as user types
  useEffect(() => {
    if (query.trim().length < 2) {
      setResults([]);
      return;
    }

    const q = query.toLowerCase();
    const filtered = products.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.tags.some((t) => t.toLowerCase().includes(q))
    );
    setResults(filtered.slice(0, 6));
  }, [query]);

  // Close on escape
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [onClose]);

  // Prevent body scroll
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/shop?q=${encodeURIComponent(query.trim())}`);
      onClose();
    }
  };

  const formatPrice = (amount: number) =>
    new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(amount);

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-50 bg-charcoal/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="fixed inset-x-4 top-[10%] z-50 mx-auto max-w-2xl md:inset-x-0">
        <div className="overflow-hidden rounded-2xl bg-white shadow-2xl">
          {/* Search Input */}
          <form onSubmit={handleSubmit} className="relative">
            <Search size={20} className="absolute left-5 top-1/2 -translate-y-1/2 text-warm-gray/50" />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search for arrangements..."
              className="w-full border-b border-cream py-5 pl-14 pr-14 text-lg text-charcoal placeholder:text-warm-gray/50 outline-none"
            />
            <button
              type="button"
              onClick={onClose}
              className="absolute right-4 top-1/2 -translate-y-1/2 flex h-8 w-8 items-center justify-center rounded-full text-warm-gray transition-colors hover:bg-cream cursor-pointer"
            >
              <X size={18} />
            </button>
          </form>

          {/* Results */}
          <div className="max-h-[60vh] overflow-y-auto">
            {query.trim().length > 0 && results.length === 0 && (
              <div className="px-6 py-10 text-center">
                <p className="text-warm-gray">No results found for &ldquo;{query}&rdquo;</p>
                <p className="mt-1 text-sm text-warm-gray/60">
                  Try a different search term
                </p>
              </div>
            )}

            {results.length > 0 && (
              <>
                <ul className="divide-y divide-cream">
                  {results.map((product) => (
                    <li key={product.id}>
                      <Link
                        href={`/shop/${product.slug}`}
                        onClick={onClose}
                        className="flex items-center gap-4 p-4 transition-colors hover:bg-ivory"
                      >
                        <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-lg bg-cream">
                          <Image
                            src={product.imageUrl}
                            alt={product.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-charcoal truncate">{product.name}</p>
                          <p className="text-sm text-warm-gray truncate">
                            {product.shortDescription}
                          </p>
                        </div>
                        <span className="shrink-0 font-semibold text-charcoal">
                          {formatPrice(product.price)}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>

                {/* View all results */}
                <div className="border-t border-cream p-4">
                  <button
                    onClick={handleSubmit}
                    className="flex w-full items-center justify-center gap-2 rounded-lg bg-ivory py-3 text-sm font-medium text-charcoal transition-colors hover:bg-cream cursor-pointer"
                  >
                    View all results for &ldquo;{query}&rdquo;
                    <ArrowRight size={14} />
                  </button>
                </div>
              </>
            )}

            {/* Popular searches (when empty) */}
            {query.trim().length === 0 && (
              <div className="p-6">
                <p className="text-xs font-semibold uppercase tracking-wider text-warm-gray">
                  Popular Searches
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {["Roses", "Peonies", "Wedding", "Birthday", "Sympathy"].map((term) => (
                    <button
                      key={term}
                      onClick={() => setQuery(term)}
                      className="rounded-full bg-cream px-4 py-2 text-sm text-charcoal transition-colors hover:bg-blush cursor-pointer"
                    >
                      {term}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
