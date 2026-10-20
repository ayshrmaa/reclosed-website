"use client";

import { motion } from "motion/react";
import type { CSSProperties, JSX } from "react";
import { cn } from "@/lib/utils";

export function ShimmerText({ children, className, as = "p", duration = 2, spread = 2 }: { children: string; className?: string; as?: "p" | "span"; duration?: number; spread?: number }): JSX.Element {
  const Component = as === "span" ? motion.span : motion.p;
  return (
    <Component
      className={cn("relative inline-block bg-[length:250%_100%,auto] bg-clip-text text-transparent [background-repeat:no-repeat,padding-box] [--bg:linear-gradient(90deg,#0000_calc(50%-var(--spread)),var(--base-gradient-color),#0000_calc(50%+var(--spread)))] dark:[--bg:linear-gradient(90deg,#0000_calc(50%-var(--spread)),var(--base-gradient-color),#0000_calc(50%+var(--spread)))] text-sm font-normal [--base-color:var(--color-brand)] [--base-gradient-color:var(--color-white)] dark:[--base-color:var(--color-brand)] dark:[--base-gradient-color:var(--color-white)]", className)}
      initial={{ backgroundPosition: "100% center" }}
      animate={{ backgroundPosition: "0% center" }}
      transition={{ repeat: Infinity, duration, ease: "linear", repeatDelay: 2 }}
      style={{ "--spread": `${children.length * spread}px`, backgroundImage: "var(--bg), linear-gradient(var(--base-color), var(--base-color))" } as CSSProperties}
    >
      {children}
    </Component>
  );
}
