import type { JSX, ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Container({ className, children, id }: { className?: string; children: ReactNode; id?: string }): JSX.Element {
  return <div id={id} className={cn("max-w-7xl mx-auto", className)}>{children}</div>;
}
