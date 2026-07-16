import { notFound } from "next/navigation";
import Link from "next/link";
import { Truck, Shield, RotateCcw, Leaf } from "lucide-react";
import { getProductBySlug, getFeaturedProducts } from "@/services/product-service";
import { categories } from "@/data/categories";
import StarRating from "@/components/ui/StarRating";
import Badge from "@/components/ui/Badge";
import ProductCard from "@/components/product/ProductCard";
import SectionHeading from "@/components/ui/SectionHeading";
import ProductDetailClient from "@/components/product/ProductDetailClient";

export const dynamic = "force-dynamic";

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    return { title: "Product Not Found" };
  }

  return {
    title: `${product.name} — Petal & Bloom`,
    description: product.shortDescription,
  };
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
      {/* Breadcrumb */}
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

      {/* Product Detail */}
      <section className="py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-2">
            {/* Left: Gallery + Badges (Server rendered) */}
            <div>
              {/* Badges above gallery on mobile */}
              <div className="mb-4 flex flex-wrap gap-2 lg:hidden">
                {hasDiscount && (
                  <Badge variant="sale">
                    -{Math.round(((product.compareAtPrice! - product.price) / product.compareAtPrice!) * 100)}%
                  </Badge>
                )}
                {product.isNew && <Badge variant="new">New Arrival</Badge>}
                {product.isBestseller && <Badge variant="bestseller">Bestseller</Badge>}
              </div>

              {/* Client-side gallery and selection components */}
              <ProductDetailClient product={product} />
            </div>

            {/* Right: Product Info (Server rendered) */}
            <div className="flex flex-col">
              {/* Badges (desktop) */}
              <div className="mb-4 hidden flex-wrap gap-2 lg:flex">
                {hasDiscount && (
                  <Badge variant="sale">
                    -{Math.round(((product.compareAtPrice! - product.price) / product.compareAtPrice!) * 100)}% Off
                  </Badge>
                )}
                {product.isNew && <Badge variant="new">New Arrival</Badge>}
                {product.isBestseller && <Badge variant="bestseller">Bestseller</Badge>}
              </div>

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
                <span className="text-3xl font-bold text-charcoal">
                  {formatPrice(product.price)}
                </span>
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

              {/* Trust signals */}
              <div className="mt-8 grid grid-cols-2 gap-4 rounded-xl bg-cream/50 p-4 sm:grid-cols-4">
                {[
                  { icon: Truck, label: "Free Delivery $100+" },
                  { icon: Shield, label: "7-Day Freshness" },
                  { icon: RotateCcw, label: "Easy Returns" },
                  { icon: Leaf, label: "Sustainably Sourced" },
                ].map((item) => (
                  <div key={item.label} className="flex flex-col items-center text-center">
                    <item.icon size={20} className="mb-1.5 text-sage" />
                    <span className="text-[11px] leading-tight text-warm-gray">{item.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Product Details Tabs */}
      <section className="border-t border-cream bg-white py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 md:grid-cols-3">
            <div>
              <h3 className="font-heading text-lg font-semibold text-charcoal">What&apos;s Included</h3>
              <ul className="mt-3 space-y-2 text-sm text-warm-gray">
                <li>• Hand-arranged premium blooms</li>
                <li>• Seasonal foliage and accents</li>
                <li>• Elegant gift wrapping</li>
                <li>• Flower food packet</li>
                <li>• Care instructions card</li>
              </ul>
            </div>
            <div>
              <h3 className="font-heading text-lg font-semibold text-charcoal">Care Instructions</h3>
              <ul className="mt-3 space-y-2 text-sm text-warm-gray">
                <li>• Trim stems at 45° angle</li>
                <li>• Use room temperature water</li>
                <li>• Change water every 2 days</li>
                <li>• Keep away from direct sunlight</li>
                <li>• Remove wilted blooms promptly</li>
              </ul>
            </div>
            <div>
              <h3 className="font-heading text-lg font-semibold text-charcoal">Delivery Info</h3>
              <ul className="mt-3 space-y-2 text-sm text-warm-gray">
                <li>• Same-day delivery before 2 PM</li>
                <li>• Free shipping on orders $100+</li>
                <li>• Delivery 7 days a week</li>
                <li>• Safe drop-off if not home</li>
                <li>• SMS tracking updates</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="py-20">
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
