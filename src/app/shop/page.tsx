import { getAllProducts } from "@/services/product-service";
import { getAllCategories } from "@/services/category-service";
import SectionHeading from "@/components/ui/SectionHeading";
import ProductCard from "@/components/product/ProductCard";
import ShopFilters from "@/components/shop/ShopFilters";

export const dynamic = "force-dynamic";

interface ShopPageProps {
  searchParams: Promise<{ category?: string; sort?: string; q?: string }>;
}

export default async function ShopPage({ searchParams }: ShopPageProps) {
  const params = await searchParams;
  const [allProducts, categories] = await Promise.all([
    getAllProducts(),
    getAllCategories(),
  ]);

  // Filter by category if present
  let filtered = allProducts;
  if (params.category) {
    const cat = categories.find((c) => c.slug === params.category);
    if (cat) {
      filtered = allProducts.filter((p) => p.categoryId === cat.id);
    }
  }

  // Search
  if (params.q) {
    const q = params.q.toLowerCase();
    filtered = filtered.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.tags.some((t) => t.includes(q)),
    );
  }

  // Sort
  if (params.sort === "price-asc") {
    filtered = [...filtered].sort((a, b) => a.price - b.price);
  } else if (params.sort === "price-desc") {
    filtered = [...filtered].sort((a, b) => b.price - a.price);
  } else if (params.sort === "newest") {
    filtered = [...filtered].sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    );
  } else if (params.sort === "rating") {
    filtered = [...filtered].sort((a, b) => b.rating - a.rating);
  }

  const activeCategoryName = params.category
    ? categories.find((c) => c.slug === params.category)?.name
    : undefined;

  return (
    <>
      {/* ── Page Header ── */}
      <section className="bg-white py-16 border-b border-cream">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            subtitle="Our Collection"
            title={activeCategoryName ?? "Shop All Arrangements"}
            description="Discover hand-crafted floral arrangements designed for every occasion, mood, and season."
          />
        </div>
      </section>

      {/* ── Filters + Grid ── */}
      <section className="py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ShopFilters
            categories={categories}
            activeCategory={params.category}
            activeSort={params.sort}
            resultCount={filtered.length}
          />

          {filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-24 text-center">
              <span className="text-5xl">🌷</span>
              <h3 className="mt-4 font-heading text-xl font-semibold text-charcoal">
                No arrangements found
              </h3>
              <p className="mt-2 text-sm text-warm-gray">
                Try adjusting your filters or browse all collections.
              </p>
            </div>
          ) : (
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {filtered.map((product, i) => (
                <ProductCard key={product.id} product={product} priority={i < 4} />
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
