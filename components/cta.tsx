import type { CSSProperties } from "react";
import { INTEGRATIONS } from "@/data/integrations";
import { CAL_URL } from "@/data/site";
import { Button } from "./button";
import { Container } from "./container";

const RINGS = [
  {
    size: 752,
    duration: "34s",
    background: "bg-neutral-100 dark:bg-neutral-700",
    animation: "animate-orbit",
    tileAnimation: "animate-counter-orbit",
    logos: INTEGRATIONS.slice(0, 7),
  },
  {
    size: 544,
    duration: "26s",
    background: "bg-neutral-200 dark:bg-neutral-600",
    animation: "animate-counter-orbit",
    tileAnimation: "animate-orbit",
    logos: INTEGRATIONS.slice(7, 11),
  },
  {
    size: 336,
    duration: "18s",
    background: "bg-neutral-300 dark:bg-neutral-500",
    animation: "animate-orbit",
    tileAnimation: "animate-counter-orbit",
    logos: INTEGRATIONS.slice(11, 13),
  },
];

function CTAOrbit() {
  return (
    <div
      className="mx-auto flex items-center justify-center absolute inset-x-0 -top-120 mask-b-from-30%"
      style={{ width: 800, height: 800 }}
      aria-hidden="true"
    >
      <div className="pointer-events-none absolute inset-0 z-0">
        {RINGS.map((ring) => (
          <div
            key={ring.size}
            className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full shadow-inner ${ring.background}`}
            style={{ width: ring.size, height: ring.size }}
          />
        ))}
      </div>
      {RINGS.map((ring) => (
        <div
          key={ring.size}
          className={`absolute top-1/2 left-1/2 z-10 -translate-x-1/2 -translate-y-1/2 rounded-full ${ring.animation}`}
          style={{ width: ring.size, height: ring.size, "--duration": ring.duration } as CSSProperties}
        >
          <div className="relative h-full w-full">
            {ring.logos.map((logo, index) => {
              const angle = (360 / ring.logos.length) * index;

              return (
                <div
                  key={logo.title}
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                  style={{ transform: `rotate(${angle}deg) translateX(${ring.size / 2}px)` }}
                >
                  <div style={{ transform: `rotate(${-angle}deg)` }}>
                    <div
                      className={`shadow-aceternity flex size-14 items-center justify-center rounded-md bg-white dark:bg-neutral-950 ${ring.tileAnimation}`}
                      style={{ "--duration": ring.duration } as CSSProperties}
                    >
                      {/* Native images preserve the specified intrinsic logo proportions. */}
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img className="h-6 w-auto" src={logo.src} alt={logo.title} />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}

export function CTA() {
  return (
    <Container className="border-divide relative flex min-h-60 flex-col items-center justify-center overflow-hidden border-x px-4 py-4 md:min-h-120">
      <CTAOrbit />
      <h2 className="text-charcoal-700 text-2xl font-medium tracking-tight md:text-3xl dark:text-neutral-100 relative z-10 text-center lg:text-6xl">
        Your whole stack, connected.
        <br />
        Every lead, worked.
      </h2>
      <Button href={CAL_URL} external className="relative z-20 mt-4">
        Book a call
      </Button>
    </Container>
  );
}
