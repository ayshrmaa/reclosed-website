import type { JSX } from "react";
import { cn } from "@/lib/utils";

export function DivideX({ className }: { className?: string }): JSX.Element {
  return <div className={cn("bg-divide h-[1px] w-full", className)} />;
}
