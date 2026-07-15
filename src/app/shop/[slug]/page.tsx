import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Truck, Shield, RotateCcw } from "lucide-react";
import { getProductBySlug, getFeaturedProducts } from "@/services/product-service";
import { getCategoryBySlug } from "@/services/category-service";
import { categories } from "@/data/categories";
import StarRating from "@/components/ui/StarRating";
import Badge from "@/components/ui/Badge";
import ProductCard from "@/components/product/ProductCard";
import SectionHeading from "@/components/ui/SectionHeading";
import AddToBagButton from "@/components/product/AddToBagButton";

export const dynamic = "force-dynamic";

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) notFound();

  const category = categories.find((c) => c.id === product.categoryId);
  const relatedProducts = (await getFeaturedProducts())
    .filter((p) => p.id !== product.id)
    .slice(0, 4);

  const hasDiscount = product.compareAtPrice && product.compareAtPrice > product.price;
  const formatPrice = (amount: number) =>
    new Intl.NumberFormat("en-US", { style: "currency", currency: product.currency }).format(
      amount,
    );

  return (
    <>
      {/* ── Breadcrumb ── */}
      <div className="border-b border-cream bg-white">
        <div className="mx-auto flex max-w-7xl items-center gap-2 px-4 py-4 text-xs text-warm-gray sm:px-6 lg:px-8">
          <Link href="/" className="hover:text-dusty-rose transition-colors">
            Home
          </Link>
          <span>/</span>
          <Link href="/shop" className="hover:text-dusty-rose transition-colors">
            Shop
          </Link>
          {category && (
            <>
              <span>/</span>
              <Link
                href={`/shop?category=${category.slug}`}
                className="hover:text-dusty-rose transition-colors"
              >
                {category.name}
              </Link>
            </>
          )}
          <span>/</span>
          <span className="text-charcoal font-medium">{product.name}</span>
        </div>
      </div>

      {/* ── Product Detail ── */}
      <section className="py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-2">
            {/* Gallery */}
            <div className="space-y-4">
              <div className="relative aspect-square overflow-hidden rounded-2xl bg-cream">
                <Image
                  src={product.imageUrl}
                  alt={product.name}
                  fill
                  className="object-cover"
                  priority
                />
                {/* Badges */}
                <div className="absolute top-4 left-4 flex flex-col gap-1.5">
                  {hasDiscount && (
                    <Badge variant="sale">
                      -{Math.round(((product.compareAtPrice! - product.price) / product.compareAtPrice!) * 100)}%
                    </Badge>
                  )}
                  {product.isNew && <Badge variant="new">New</Badge>}
                  {product.isBestseller && <Badge variant="bestseller">Bestseller</Badge>}
                </div>
              </div>
              {/* Thumbnail strip */}
              {product.images.length > 1 && (
                <div className="grid grid-cols-4 gap-3">
                  {product.images.map((img, i) => (
                    <div
                      key={i}
                      className="relative aspect-square overflow-hidden rounded-xl bg-cream border-2 border-transparent hover:border-dusty-rose transition-colors cursor-pointer"
                    >
                      <Image src={img} alt={`${product.name} ${i + 1}`} fill className="object-cover" />
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Info */}
            <div className="flex flex-col">
              {category && (
                <Link
                  href={`/shop?category=${category.slug}`}
                  className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-rose hover:text-dusty-rose transition-colors"
                >
                  {category.name}
                </Link>
              )}

              <h1 className="font-heading text-3xl font-bold text-charcoal md:text-4xl">
                {product.name}
              </h1>

              <div className="mt-3 flex items-center gap-3">
                <StarRating rating={product.rating} />
                <span className="text-sm text-warm-gray">
                  {product.rating} ({product.reviewCount} reviews)
                </span>
              </div>

              {/* Price */}
              <div className="mt-6 flex items-baseline gap-3">
                <span className="text-3xl font-bold text-charcoal">{formatPrice(product.price)}</span>
                {hasDiscount && (
                  <span className="text-lg text-warm-gray/50 line-through">
                    {formatPrice(product.compareAtPrice!)}
                  </span>
                )}
              </div>

              {/* Description */}
              <p className="mt-6 text-sm leading-relaxed text-warm-gray">
                {product.description}
              </p>

              {/* Tags */}
              <div className="mt-4 flex flex-wrap gap-2">
                {product.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-cream px-3 py-1 text-[11px] font-medium capitalize text-warm-gray"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Add to bag */}
              <div className="mt-8">
                <AddToBagButton product={product} />
              </div>

              {/* Trust signals */}
              <div className="mt-8 grid grid-cols-3 gap-4 border-t border-cream pt-6">
                {[
                  { icon: Truck, label: "Free delivery over $100" },
                  { icon: Shield, label: "Freshness guarantee" },
                  { icon: RotateCcw, label: "Easy returns" },
                ].map((item) => (
                  <div key={item.label} className="flex flex-col items-center text-center">
                    <item.icon size={18} className="mb-1.5 text-sage" />
                    <span className="text-[11px] text-warm-gray">{item.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Related Products ── */}
      {relatedProducts.length > 0 && (
        <section className="bg-white py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <SectionHeading subtitle="You May Also Love" title="Related Arrangements" />
            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {relatedProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
