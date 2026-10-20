"use client";

import { motion } from "motion/react";
import { useEffect, useRef, useState, type JSX } from "react";
import { cn } from "@/lib/utils";

export function Dot({ top, left, right, bottom }: { top?: boolean; left?: boolean; right?: boolean; bottom?: boolean }): JSX.Element {
  const ref = useRef<HTMLDivElement>(null);
  const [nearby, setNearby] = useState(false);

  useEffect(() => {
    function onMouseMove(event: MouseEvent) {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      setNearby(Math.hypot(event.clientX - (rect.left + rect.width / 2), event.clientY - (rect.top + rect.height / 2)) <= 100);
    }
    window.addEventListener("mousemove", onMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMouseMove);
  }, []);

  return (
    <motion.div
      ref={ref}
      className={cn("absolute z-10 h-2 w-2", top && "top-0 xl:-top-1", left && "left-0 xl:-left-2", right && "right-0 xl:-right-2", bottom && "bottom-0 xl:-bottom-1")}
      animate={{
        backgroundColor: nearby ? "var(--color-brand)" : "var(--color-primary)",
        boxShadow: nearby ? "0 0 20px var(--color-brand), 0 0 40px var(--color-brand)" : "none",
        scale: nearby ? 1.5 : 1,
        borderRadius: nearby ? "50%" : "0%",
      }}
      transition={{ duration: .3, ease: "easeOut" }}
    />
  );
}
