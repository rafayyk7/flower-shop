// ============================================================
// Flower Shop – Shared TypeScript Interfaces
// ============================================================
// These types mirror the shapes our backend will eventually return.
// Every mock-data file and component imports from here so a single
// schema change propagates everywhere.
// ============================================================

export interface Product {
  id: string;
  slug: string;
  name: string;
  description: string;
  shortDescription: string;
  price: number;
  compareAtPrice?: number; // original price when on sale
  currency: string;
  imageUrl: string;
  images: string[]; // gallery
  categoryId: string;
  tags: string[];
  inStock: boolean;
  isFeatured: boolean;
  isNew: boolean;
  isBestseller: boolean;
  rating: number; // 0-5
  reviewCount: number;
  createdAt: string; // ISO date
}

export interface Category {
  id: string;
  slug: string;
  name: string;
  description: string;
  imageUrl: string;
  productCount: number;
  order: number; // for display ordering
}

export interface Testimonial {
  id: string;
  name: string;
  location: string;
  avatarUrl?: string;
  rating: number;
  text: string;
  date: string;
}

export interface HeroBanner {
  id: string;
  title: string;
  subtitle: string;
  ctaText: string;
  ctaLink: string;
  imageUrl: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}
