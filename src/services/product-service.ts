// ============================================================
// Product Service
// ============================================================
// This service wraps all product data access. Right now it reads
// from static mock arrays; when the real backend is ready, simply
// swap the implementation to fetch() calls — every consumer stays
// the same because the return types are unchanged.
// ============================================================

import type { Product } from "@/types";
import { products } from "@/data/products";

/** Simulate network latency for realistic loading states */
const delay = (ms: number) => new Promise((r) => setTimeout(r, ms));

export async function getAllProducts(): Promise<Product[]> {
  await delay(0);
  return products;
}

export async function getProductBySlug(slug: string): Promise<Product | undefined> {
  await delay(0);
  return products.find((p) => p.slug === slug);
}

export async function getFeaturedProducts(): Promise<Product[]> {
  await delay(0);
  return products.filter((p) => p.isFeatured);
}

export async function getNewProducts(): Promise<Product[]> {
  await delay(0);
  return products.filter((p) => p.isNew);
}

export async function getBestsellerProducts(): Promise<Product[]> {
  await delay(0);
  return products.filter((p) => p.isBestseller);
}

export async function getProductsByCategory(categoryId: string): Promise<Product[]> {
  await delay(0);
  return products.filter((p) => p.categoryId === categoryId);
}

export async function searchProducts(query: string): Promise<Product[]> {
  await delay(0);
  const q = query.toLowerCase();
  return products.filter(
    (p) =>
      p.name.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q) ||
      p.tags.some((t) => t.toLowerCase().includes(q)),
  );
}
