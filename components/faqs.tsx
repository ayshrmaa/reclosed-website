"use client";

import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import useMeasure from "react-use-measure";
import { FAQS } from "@/data/faqs";
import { CAL_URL } from "@/data/site";
import { ChevronDownIcon } from "@/icons/general";
import { Button } from "./button";
import { Container } from "./container";
import { DivideX } from "./divide";
import { SectionHeading } from "./section-heading";
import { ShimmerText } from "./shimmer-text";
import { SubHeading } from "./sub-heading";

type AccordionItemProps = {
  id: string;
  index: number;
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
};

function AccordionItem({ id, index, question, answer, isOpen, onToggle }: AccordionItemProps) {
  const [ref, { height }] = useMeasure();

  return (
    <div className="group">
      <button
        type="button"
        id={`${id}-trigger-${index}`}
        aria-expanded={isOpen}
        aria-controls={`${id}-panel-${index}`}
        onClick={onToggle}
        className="flex w-full items-center justify-between gap-4 px-8 py-6 text-left"
      >
        <span className="text-charcoal-700 text-base font-medium dark:text-neutral-100">
          {question}
        </span>
        <motion.span
          className="text-charcoal-700 shadow-aceternity inline-flex size-6 items-center justify-center rounded-md bg-white dark:bg-neutral-950"
          initial={false}
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.25 }}
        >
          <ChevronDownIcon className="dark:text-neutral-100" aria-hidden="true" />
        </motion.span>
      </button>
      <motion.div
        id={`${id}-panel-${index}`}
        role="region"
        aria-labelledby={`${id}-trigger-${index}`}
        aria-hidden={!isOpen}
        initial={false}
        animate={{ height: isOpen ? height : 0, opacity: isOpen ? 1 : 0 }}
        transition={{ height: { duration: 0.35 }, opacity: { duration: 0.2 } }}
        className="overflow-hidden px-8"
        onClick={onToggle}
      >
        <div ref={ref} className="pr-2 pb-5 pl-2 sm:pr-0 sm:pl-0">
          <AnimatePresence mode="popLayout">
            {isOpen && (
              <motion.p
                key="content"
                initial={{ y: -6, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -6, opacity: 0 }}
                transition={{ duration: 0.25 }}
                className="text-gray-600 dark:text-neutral-400"
              >
                {answer}
              </motion.p>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
}

export function FAQs({ id = "faq", items = FAQS, label = "FAQs", heading = "Frequently asked questions", sub = "Everything sales teams ask us before a call. Still have one?" }: { id?: string; items?: { question: string; answer: string }[]; label?: string; heading?: string; sub?: string }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <Container id={id} className="border-divide flex flex-col items-center border-x pt-12">
      <ShimmerText>{label}</ShimmerText>
      <SectionHeading>{heading}</SectionHeading>
      <SubHeading className="px-2">
        {sub}
      </SubHeading>
      <div className="mt-8 mb-12 flex w-full flex-col justify-center gap-4 px-4 sm:flex-row">
        <Button href={CAL_URL} external className="w-full sm:w-auto">
          Book a call
        </Button>
        <Button variant="secondary" href="/contact" className="w-full sm:w-auto">
          Contact us
        </Button>
      </div>
      <DivideX />
      <div className="divide-divide w-full divide-y">
        {items.map((faq, index) => (
          <AccordionItem
            key={faq.question}
            id={id}
            index={index}
            question={faq.question}
            answer={faq.answer}
            isOpen={openIndex === index}
            onToggle={() => setOpenIndex((current) => current === index ? null : index)}
          />
        ))}
      </div>
    </Container>
  );
}
