import type { JSX, ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Heading({ children, className, as: Component = "h1" }: { children: ReactNode; className?: string; as?: "h1" | "h2" }): JSX.Element {
  return <Component className={cn("text-center text-3xl font-medium tracking-tight text-black md:text-4xl lg:text-6xl dark:text-white mt-4", className)}>{children}</Component>;
}
