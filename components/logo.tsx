import Link from "next/link";
import type { JSX } from "react";
import { cn } from "@/lib/utils";

export function LogoMark({ className }: { className?: string }): JSX.Element {
  return (
    <span
      role="img"
      aria-label="Reclosed"
      className={cn("inline-block h-6 shrink-0 aspect-[445/512] bg-current text-brand", className)}
      style={{
        maskImage: "url(/logo-mark.png)",
        maskSize: "contain",
        maskRepeat: "no-repeat",
        maskPosition: "center",
        WebkitMaskImage: "url(/logo-mark.png)",
        WebkitMaskSize: "contain",
        WebkitMaskRepeat: "no-repeat",
        WebkitMaskPosition: "center",
      }}
    />
  );
}

export function Logo({ className }: { className?: string }): JSX.Element {
  return (
    <Link href="/" className={cn("flex items-center gap-2 text-primary", className)}>
      <LogoMark />
      <span className="text-2xl font-medium">Reclosed</span>
    </Link>
  );
}
