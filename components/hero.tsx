"use client";

import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState, useSyncExternalStore } from "react";
import { Button } from "@/components/button";
import { Container } from "@/components/container";
import { Heading } from "@/components/heading";
import { LogoMark } from "@/components/logo";
import { ShimmerText } from "@/components/shimmer-text";
import { SubHeading } from "@/components/sub-heading";
import { CAL_URL } from "@/data/site";
import { IMessageIcon, WhatsAppIcon, MailIcon, SmsIcon } from "@/icons/general";

const PHRASES = [
  "There's 20% more monthly revenue",
  "There's a quarter of your pipeline",
  "There's your next revenue jump",
];
const CHANNEL_ICONS = [IMessageIcon, WhatsAppIcon, MailIcon, SmsIcon];
const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";

function subscribeToReducedMotion(onChange: () => void) {
  const media = window.matchMedia(REDUCED_MOTION_QUERY);
  media.addEventListener("change", onChange);
  return () => media.removeEventListener("change", onChange);
}

function RotatingLine() {
  const [index, setIndex] = useState(0);
  const reducedMotion = useSyncExternalStore(
    subscribeToReducedMotion,
    () => window.matchMedia(REDUCED_MOTION_QUERY).matches,
    () => true,
  );

  useEffect(() => {
    if (reducedMotion) return;
    const interval = window.setInterval(() => {
      setIndex((current) => (current + 1) % PHRASES.length);
    }, 3000);
    return () => window.clearInterval(interval);
  }, [reducedMotion]);

  return (
    <span className="block" style={{ minHeight: "1lh" }}>
      <AnimatePresence mode="wait">
        <motion.span
          key={reducedMotion ? 0 : index}
          style={{ display: "inline-block" }}
          initial={reducedMotion ? false : { opacity: 0, filter: "blur(10px)", y: 10 }}
          animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
          exit={{ opacity: 0, filter: "blur(10px)", y: -10 }}
          transition={{ duration: .4, ease: "easeInOut" }}
        >
          {PHRASES[reducedMotion ? 0 : index]}
        </motion.span>
      </AnimatePresence>
      <br />
    </span>
  );
}

export function Hero() {
  return (
    <Container className="border-divide flex flex-col items-center justify-center border-x px-4 pt-10 pb-10 md:pt-32 md:pb-20">
      <ShimmerText>For high-ticket sales teams.</ShimmerText>
      <Heading>
        <RotatingLine />
        sitting <span className="text-brand">dead in your CRM.</span>
      </Heading>
      <SubHeading as="h2">
        You&apos;re pouring time and cash into front-end growth while a paid goldmine rots in your back end. Reclosed revives no-shows, not-nows, and never-booked leads into booked calls and cash on autopilot.
      </SubHeading>
      <div className="mt-6 flex items-center gap-4">
        <Button href={CAL_URL} external>Book a call</Button>
        <Button href="#how-it-works" variant="secondary">See how it works</Button>
      </div>
      <div className="mt-6 flex items-center gap-2">
        <LogoMark className="h-5 w-auto text-charcoal-900 dark:text-white" />
        <div className="-gap-5 flex items-center">
          {CHANNEL_ICONS.map((Icon, index) => (
            <motion.div
              key={index}
              className="-ml-2 first:ml-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: .05 * index }}
            >
              <div className="flex size-7 items-center justify-center rounded-full bg-white shadow-aceternity dark:bg-neutral-900">
                <Icon className="size-4" />
              </div>
            </motion.div>
          ))}
        </div>
        <span className="border-l border-gray-500 pl-4 text-[10px] text-gray-600 sm:text-sm">
          Every lead worked across iMessage, WhatsApp, email and SMS
        </span>
      </div>
    </Container>
  );
}
