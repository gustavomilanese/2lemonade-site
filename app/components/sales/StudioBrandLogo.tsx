import Image from "next/image";

const SRC = "/branding/2lemonade-logo.png";

type Props = {
  /** `header`: barra. `hero`: hero grande. `heroInset`: logo arriba del panel oscuro (split hero). */
  variant?: "header" | "hero" | "heroInset";
  className?: string;
  priority?: boolean;
};

export function StudioBrandLogo({ variant = "hero", className = "", priority = false }: Props) {
  const base = "object-contain object-left";

  if (variant === "heroInset") {
    return (
      <Image
        src={SRC}
        alt="2Lemonade Digital Studio"
        width={1024}
        height={1024}
        priority={priority}
        className={`h-9 w-auto max-h-9 max-w-[min(100%,188px)] sm:h-10 sm:max-h-10 sm:max-w-[210px] ${base} ${className}`}
      />
    );
  }

  if (variant === "header") {
    return (
      <Image
        src={SRC}
        alt="2Lemonade Digital Studio"
        width={1024}
        height={1024}
        priority={priority}
        className={`h-[4.5rem] w-auto max-h-[4.5rem] max-w-[min(100%,336px)] sm:h-[5rem] sm:max-h-[5rem] sm:max-w-[400px] ${base} ${className}`}
      />
    );
  }

  return (
    <Image
      src={SRC}
      alt="2Lemonade Digital Studio"
      width={1024}
      height={1024}
      priority={priority}
      className={`w-full max-w-[220px] drop-shadow-[0_0_32px_rgba(34,211,238,0.22)] sm:max-w-[260px] lg:max-w-[280px] ${base} ${className}`}
    />
  );
}
