import type { ReactNode } from "react";

type BadgeVariant = "sale" | "new" | "bestseller" | "default";

const variantStyles: Record<BadgeVariant, string> = {
  sale: "bg-dusty-rose text-white",
  new: "bg-sage text-white",
  bestseller: "bg-gold text-white",
  default: "bg-cream text-charcoal",
};

interface BadgeProps {
  variant?: BadgeVariant;
  children: ReactNode;
  className?: string;
}

export default function Badge({ variant = "default", children, className = "" }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider ${variantStyles[variant]} ${className}`}
    >
      {children}
    </span>
  );
}
