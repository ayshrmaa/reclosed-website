"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

const topics = [
  ["platform-engage", "Engage, qualify, book"],
  ["platform-channels", "Multi channel & multi context"],
  ["platform-routing", "Grading & routing"],
  ["sales-teams", "Proven sales database"],
  ["platform-compliance", "Automated compliance"],
] as const;

export function PlatformNavigation() {
  const [active, setActive] = useState<string>(topics[0][0]);

  useEffect(() => {
    // A narrow reading line keeps even the tallest section active while scrolling.
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id);
        }
      },
      { rootMargin: "-25% 0px -74% 0px", threshold: 0 },
    );
    for (const [id] of topics) {
      const section = document.getElementById(id);
      if (section) observer.observe(section);
    }
    return () => observer.disconnect();
  }, []);

  return (
    <nav aria-label="Explore the Reclosed platform" className="platform-navigation">
      <div className="flex gap-1 overflow-x-auto px-4 py-3 lg:flex-col lg:gap-1 lg:overflow-visible lg:p-6">
        {topics.map(([id, label]) => (
          <a
            key={id}
            href={`#${id}`}
            aria-current={active === id ? "location" : undefined}
            onClick={() => setActive(id)}
            className={cn(
              "platform-topic relative flex min-h-11 shrink-0 items-center rounded-lg px-3 py-3 text-sm leading-5 whitespace-nowrap transition-colors lg:whitespace-normal",
              active === id
                ? "bg-gray-100 font-medium text-charcoal-900 dark:bg-neutral-900 dark:text-neutral-100"
                : "text-neutral-500 hover:bg-gray-100 hover:text-charcoal-900 dark:text-neutral-400 dark:hover:bg-neutral-900 dark:hover:text-neutral-100",
            )}
          >
            {label}
          </a>
        ))}
      </div>
    </nav>
  );
}
