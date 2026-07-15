import { NextResponse } from "next/server";
import { categories } from "@/data/categories";

export async function GET() {
  const sorted = [...categories].sort((a, b) => a.order - b.order);
  
  return NextResponse.json({
    categories: sorted,
    total: sorted.length,
  });
}
