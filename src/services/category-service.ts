import type { Category } from "@/types";
import { categories } from "@/data/categories";

const delay = (ms: number) => new Promise((r) => setTimeout(r, ms));

export async function getAllCategories(): Promise<Category[]> {
  await delay(0);
  return categories.sort((a, b) => a.order - b.order);
}

export async function getCategoryBySlug(slug: string): Promise<Category | undefined> {
  await delay(0);
  return categories.find((c) => c.slug === slug);
}
