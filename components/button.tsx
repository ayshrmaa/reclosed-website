"use client";

import Link from "next/link";
import type { JSX, ReactNode } from "react";
import { cn } from "@/lib/utils";

export type ButtonProps = {
  variant?: "primary" | "secondary" | "brand";
  href?: string;
  external?: boolean;
  className?: string;
  children: ReactNode;
  type?: "button" | "submit";
  onClick?: () => void;
  disabled?: boolean;
};

const variants = {
  primary: "bg-[var(--brand-solid)] text-white hover:bg-[var(--brand-hover)] dark:bg-brand dark:text-[#061055] dark:hover:bg-[#c1ceff]",
  secondary: "border-divide border bg-white text-black transition duration-200 hover:bg-gray-300 dark:border-neutral-700 dark:bg-neutral-950 dark:text-white dark:hover:bg-neutral-800",
  brand: "bg-brand text-white hover:opacity-90 dark:text-[#061055]",
};

export function Button({ variant = "primary", href, external = false, className, children, type = "button", onClick, disabled = false }: ButtonProps): JSX.Element {
  const classes = cn("block whitespace-nowrap focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand rounded-xl px-6 py-2 text-center text-sm font-medium transition duration-150 active:scale-[0.98] sm:text-base", variants[variant], className);

  if (href !== undefined) {
    const linkProps = {
      className: classes,
      "aria-disabled": disabled || undefined,
      tabIndex: disabled ? -1 : undefined,
      onClick: (event: React.MouseEvent<HTMLAnchorElement>) => {
        if (disabled) event.preventDefault();
        else onClick?.();
      },
      children,
    };
    if (external || /^(https?:|mailto:)/i.test(href)) {
      return <a href={href} target="_blank" rel="noopener noreferrer" {...linkProps} />;
    }
    if (!href.includes("#") && (href.startsWith("/") || href.startsWith("#"))) {
      return <Link href={href} {...linkProps} />;
    }
    return <a href={href} {...linkProps} />;
  }

  return <button type={type} disabled={disabled} onClick={onClick} className={classes}>{children}</button>;
}
