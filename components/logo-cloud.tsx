"use client";

import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { Container } from "@/components/container";
import { INTEGRATIONS } from "@/data/integrations";

const CELL_CLASSES = [
  "border-divide group relative overflow-hidden border-r border-b md:border-r md:border-b",
  "border-divide group relative overflow-hidden border-r border-b md:border-r md:border-b",
  "border-divide group relative overflow-hidden border-r border-b md:border-r md:border-b",
  "border-divide group relative overflow-hidden border-r border-b md:border-r-0 md:border-b",
  "border-divide group relative overflow-hidden border-r border-b md:border-b-0 md:border-r",
  "border-divide group relative overflow-hidden border-r border-b md:border-b-0 md:border-r",
  "border-divide group relative overflow-hidden border-r md:border-r",
  "border-divide group relative overflow-hidden border-r md:border-r-0",
];

export function LogoCloud() {
  const [displayedIndices, setDisplayedIndices] = useState(() =>
    Array.from({ length: 8 }, (_, index) => index),
  );

  useEffect(() => {
    const interval = window.setInterval(() => {
      const available = INTEGRATIONS.map((_, index) => index).filter(
        (index) => !displayedIndices.includes(index),
      );
      if (available.length === 0) return;
      const slot = Math.floor(Math.random() * displayedIndices.length);
      const replacement = available[Math.floor(Math.random() * available.length)];
      setDisplayedIndices((current) =>
        current.map((index, position) => position === slot ? replacement : index),
      );
    }, 3000);
    return () => window.clearInterval(interval);
  }, [displayedIndices]);

  return (
    <Container id="integrations" className="border-divide border-x">
      <h2 className="py-8 text-center font-mono text-sm tracking-tight text-neutral-500 uppercase dark:text-gray-300">
        Your whole stack, connected
      </h2>
      <div className="border-divide grid grid-cols-2 border-t md:grid-cols-4">
        {displayedIndices.map((index, slot) => {
          const logo = INTEGRATIONS[index];
          return (
            <div key={slot} className={CELL_CLASSES[slot]}>
              <div className="animate-move-left-to-right bg-brand/5 absolute inset-x-0 bottom-0 h-full translate-y-full transition-all duration-200 group-hover:translate-y-0" />
              <AnimatePresence initial={false} mode="wait">
                <motion.div
                  key={index}
                  className="group flex min-h-32 items-center justify-center p-4 py-10 grayscale"
                  initial={{ y: 100, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ opacity: 0, y: -100 }}
                  transition={{ duration: .2, ease: "easeInOut" }}
                  whileHover={{ opacity: 1 }}
                >
                  {/* The reference uses native images for the rotating local logos. */}
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={logo.src}
                    alt={logo.title}
                    className={`object-contain transition-all duration-500 dark:invert dark:filter ${logo.className}`}
                  />
                </motion.div>
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </Container>
  );
}
