import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Card({ className, children }: { className?: string; children: ReactNode }) {
  return <div className={cn("p-4 md:p-8", className)}>{children}</div>;
}

export function CardTitle({ icon, children }: { icon: ReactNode; children: ReactNode }) {
  return (
    <div className="flex items-center gap-2">
      {icon}
      <h3 className="text-charcoal-700 text-lg font-medium dark:text-neutral-100">{children}</h3>
    </div>
  );
}

export function CardDescription({ children }: { children: ReactNode }) {
  return <p className="mt-2 text-base text-gray-600 dark:text-gray-300">{children}</p>;
}
