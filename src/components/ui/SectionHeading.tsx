interface SectionHeadingProps {
  subtitle?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
}

export default function SectionHeading({
  subtitle,
  title,
  description,
  align = "center",
  className = "",
}: SectionHeadingProps) {
  const alignment = align === "center" ? "text-center mx-auto" : "text-left";

  return (
    <div className={`max-w-2xl ${alignment} ${className}`}>
      {subtitle && (
        <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-rose">
          {subtitle}
        </p>
      )}
      <h2 className="font-heading text-3xl font-semibold text-charcoal md:text-4xl lg:text-[2.75rem] leading-tight">
        {title}
      </h2>
      {description && (
        <p className="mt-4 text-base leading-relaxed text-warm-gray">
          {description}
        </p>
      )}
    </div>
  );
}
