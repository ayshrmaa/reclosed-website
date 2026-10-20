"use client";

import { useId } from "react";
import { motion } from "motion/react";
import {
  ProblemIcon,
  SolutionIcon,
  BenefitIcon,
  IdentifiedIcon,
  AttributedIcon,
  ReactivationIcon,
} from "@/icons/card-icons";
import { BellIcon, PlayIcon } from "@/icons/general";
import { Container } from "@/components/container";
import { DivideX } from "@/components/divide";
import { FeatureCard } from "@/components/feature-card";
import { LogoMark } from "@/components/logo";
import { SectionHeading } from "@/components/section-heading";
import { FeatureLabel } from "@/components/feature-label";
import { SubHeading } from "@/components/sub-heading";

const leftCards = [
  {
    icon: ProblemIcon,
    title: "The problem",
    description: "You can only sell to leads who explicitly opt in or provide their contact details.",
  },
  {
    icon: SolutionIcon,
    title: "The solution",
    description: "We mine their contact details, and reactivate them through the same process as CRM Reactivation.",
  },
  {
    icon: BenefitIcon,
    title: "The benefit",
    description: "More booked calls and more revenue from your organic and paid, without extra creatives or ad spend. Reclosed is the single easiest lever you can pull to increase your ROAS.",
  },
];

const rightCards = [
  {
    icon: IdentifiedIcon,
    title: "Anonymous, identified",
    description: "Visitors who bounce without opting in are matched to real contact profiles.",
  },
  {
    icon: AttributedIcon,
    title: "Source attributed",
    description: "Every identified visitor is traced to the exact page, ad, or video that brought them.",
  },
  {
    icon: ReactivationIcon,
    title: "Straight into reactivation",
    description: "Identified visitors drop into your CRM and Reclosed starts the conversation.",
  },
];

const trafficBars = [
  { label: "Visitors identified", width: 72 },
  { label: "Matched to CRM", width: 58 },
  { label: "Conversations started", width: 41 },
];

export function AnonymousTraffic() {
  return (
    <Container id="anonymous-traffic" className="border-divide relative overflow-hidden border-x px-4 py-20 md:px-8">
      <div className="relative flex flex-col items-center">
        <FeatureLabel number="02" name="Anonymous Traffic Reactivation" />
        <SectionHeading>Sell to the visitors who never opted in.</SectionHeading>
        <SubHeading>{"You're posting organic content. You're running ads. Many potential clients consume content, float in and out, and leave without getting sold."}</SubHeading>
      </div>
      <div className="mt-20 grid grid-cols-1 gap-4 md:grid-cols-3">
        <div className="grid grid-cols-1 gap-4">
          {leftCards.map((card) => <FeatureCard key={card.title} {...card} />)}
        </div>
        <MiddleCard />
        <div className="grid grid-cols-1 gap-4">
          {rightCards.map((card) => <FeatureCard key={card.title} {...card} />)}
        </div>
      </div>
    </Container>
  );
}

function MiddleCard() {
  return (
    <div className="relative flex min-h-40 flex-col justify-end overflow-hidden rounded-lg bg-gray-50 p-4 md:p-5 dark:bg-neutral-900">
      <div className="absolute inset-0 bg-[radial-gradient(var(--color-dots)_1px,transparent_1px)] mask-radial-from-10% [background-size:10px_10px] shadow-xl" />
      <div className="flex items-center justify-center">
        <div className="relative flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-md border border-neutral-200 bg-white shadow-md dark:border-neutral-600 dark:bg-neutral-900">
          <PlayIcon className="size-6" role="img" aria-label="Traffic" />
        </div>
        <HorizontalLine />
        <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-md bg-gray-200 p-px shadow-xl dark:bg-neutral-700">
          <div className="absolute inset-0 scale-[1.4] animate-spin rounded-full bg-conic [background-image:conic-gradient(at_center,transparent,var(--color-blue-500)_20%,transparent_30%)] [animation-duration:2s]" />
          <div className="via-brand absolute inset-0 scale-[1.4] animate-spin rounded-full bg-conic [background-image:conic-gradient(at_center,transparent,var(--color-brand)_20%,transparent_30%)] [animation-delay:1s] [animation-duration:2s]" />
          <div className="relative z-20 flex h-full w-full items-center justify-center rounded-[5px] bg-white dark:bg-neutral-900">
            <LogoMark />
          </div>
        </div>
        <HorizontalLine />
        <div className="relative flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-md border border-neutral-200 bg-white shadow-md dark:border-neutral-600 dark:bg-neutral-900">
          {/* Native image preserves the reference tile's intrinsic logo sizing. */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logos/gohighlevel.png" alt="GoHighLevel" className="h-5 w-auto" />
        </div>
      </div>
      <div className="relative z-20 flex flex-col items-center justify-center">
        <VerticalLine />
        <div className="rounded-sm border border-blue-500 bg-blue-50 px-2 py-0.5 text-xs text-blue-500 dark:bg-blue-900 dark:text-white">Identified</div>
      </div>
      <div className="h-60 w-full translate-x-10 translate-y-10 overflow-hidden rounded-md bg-gray-200 p-px shadow-xl dark:bg-neutral-700">
        <div className="absolute inset-0 scale-[1.4] animate-spin rounded-full bg-conic from-transparent via-blue-500 via-20% to-transparent to-30% blur-2xl [animation-duration:4s]" />
        <div className="via-brand absolute inset-0 scale-[1.4] animate-spin rounded-full bg-conic from-transparent via-20% to-transparent to-30% blur-2xl [animation-delay:2s] [animation-duration:4s]" />
        <div className="relative z-20 h-full w-full rounded-[5px] bg-white dark:bg-neutral-900">
          <div className="flex items-center justify-between p-4">
            <div className="flex gap-1">
              <div className="size-2 rounded-full bg-red-400" />
              <div className="size-2 rounded-full bg-yellow-400" />
              <div className="size-2 rounded-full bg-green-400" />
            </div>
            <motion.div
              className="shadow-aceternity mr-2 flex items-center gap-1 rounded-sm bg-white px-2 py-1 text-xs text-neutral-500 dark:bg-neutral-700 dark:text-white"
              initial={{ opacity: 0, y: -10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3 }}
            >
              <BellIcon className="size-3" aria-hidden="true" />
              <span>Visitor identified</span>
            </motion.div>
          </div>
          <DivideX />
          <div className="flex h-full flex-row">
            <div className="h-full w-14 bg-gray-200 dark:bg-neutral-800" />
            <div className="w-full gap-y-4 p-4">
              <h2 className="text-sm font-semibold text-gray-800 dark:text-neutral-300">Anonymous traffic</h2>
              <div className="mt-4 flex flex-col gap-y-3 mask-b-from-50%">
                {trafficBars.map((bar, i) => (
                  <div key={bar.label} className="space-y-1">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-gray-600">{bar.label}</span>
                    </div>
                    <div className="h-1.5 overflow-hidden rounded-full bg-gray-200 dark:bg-neutral-700">
                      <motion.div
                        className="h-full rounded-full bg-neutral-300 dark:bg-neutral-400"
                        initial={{ width: 0 }}
                        whileInView={{ width: `${bar.width}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.2, delay: 0.4 + 0.1 * i, ease: "easeOut" }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function HorizontalLine() {
  const gradientId = useId();

  return (
    <svg width="314" height="2" viewBox="0 0 314 2" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <line x1="0.5" y1="1" x2="313.5" y2="1" stroke="var(--color-gray-400)" strokeLinecap="round" />
      <line x1="0.5" y1="1" x2="313.5" y2="1" stroke={`url(#${gradientId})`} strokeLinecap="round" />
      <defs>
        <motion.linearGradient
          id={gradientId}
          gradientUnits="userSpaceOnUse"
          initial={{ y1: 0, y2: 1, x1: "-10%", x2: "0%" }}
          animate={{ y1: 0, y2: 1, x1: "110%", x2: "120%" }}
          transition={{ duration: 2, repeat: Infinity, repeatType: "loop", ease: "easeInOut", repeatDelay: 1 }}
        >
          <stop stopColor="#EAEDF1" />
          <stop offset="0.5" stopColor="var(--color-blue-500)" />
          <stop offset="1" stopColor="#EAEDF1" />
        </motion.linearGradient>
      </defs>
    </svg>
  );
}

function VerticalLine() {
  const gradientId = useId();

  return (
    <svg width="1" height="81" viewBox="0 0 1 81" fill="none" xmlns="http://www.w3.org/2000/svg" className="shrink-0" aria-hidden="true">
      <line y1="-0.5" x2="80" y2="-0.5" transform="matrix(0 -1 -1 0 0 80.5)" stroke="var(--color-line)" />
      <line y1="-0.5" x2="80" y2="-0.5" transform="matrix(0 -1 -1 0 0 80.5)" stroke={`url(#${gradientId})`} />
      <defs>
        <motion.linearGradient
          id={gradientId}
          gradientUnits="userSpaceOnUse"
          initial={{ x1: 0, x2: 2, y1: "0%", y2: "0%" }}
          animate={{ x1: 0, x2: 2, y1: "80%", y2: "100%" }}
          transition={{ duration: 4, repeat: Infinity, repeatType: "loop", ease: "easeInOut", repeatDelay: 1 }}
        >
          <stop stopColor="var(--color-line)" />
          <stop offset="0.5" stopColor="var(--color-brand)" />
          <stop offset="1" stopColor="var(--color-line)" />
        </motion.linearGradient>
      </defs>
    </svg>
  );
}
