import type { JSX, ReactNode } from "react";
import { cn } from "@/lib/utils";

export function SubHeading({ children, className, as: Component = "p" }: { children: ReactNode; className?: string; as?: "p" | "h2" }): JSX.Element {
  return <Component className={cn("text-center text-sm font-medium tracking-tight text-gray-600 md:text-sm lg:text-base dark:text-gray-300 mx-auto mt-6 max-w-lg", className)}>{children}</Component>;
}
