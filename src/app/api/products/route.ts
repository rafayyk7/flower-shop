import { NextResponse } from "next/server";
import { products } from "@/data/products";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get("category");
  const search = searchParams.get("q");
  const sort = searchParams.get("sort");
  const featured = searchParams.get("featured");

  let filtered = [...products];

  // Filter by category
  if (category) {
    filtered = filtered.filter((p) => p.categoryId === category);
  }

  // Filter featured
  if (featured === "true") {
    filtered = filtered.filter((p) => p.isFeatured);
  }

  // Search
  if (search) {
    const q = search.toLowerCase();
    filtered = filtered.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.tags.some((t) => t.toLowerCase().includes(q))
    );
  }

  // Sort
  if (sort === "price-asc") {
    filtered.sort((a, b) => a.price - b.price);
  } else if (sort === "price-desc") {
    filtered.sort((a, b) => b.price - a.price);
  } else if (sort === "newest") {
    filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  } else if (sort === "rating") {
    filtered.sort((a, b) => b.rating - a.rating);
  }

  return NextResponse.json({
    products: filtered,
    total: filtered.length,
  });
}
