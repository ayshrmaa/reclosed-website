"use client";

import { motion, useSpring, useTransform, type MotionValue } from "motion/react";
import { Fragment, useEffect, useId, useState, type JSX } from "react";
import useMeasure from "react-use-measure";

const springConfig = { stiffness: 280, damping: 18, mass: 0.3 };

function NumberGlyph({ spring, number }: { spring: MotionValue<number>; number: number }): JSX.Element {
  const id = useId();
  const [ref, { height }] = useMeasure();
  const y = useTransform(spring, (latest) => {
    if (!height) return 0;
    const offset = (10 + number - latest % 10) % 10;
    return (offset > 5 ? offset - 10 : offset) * height;
  });

  return height ? (
    <motion.span ref={ref} style={{ y }} layoutId={`${id}-${number}`} className="absolute inset-0 flex items-center justify-center" transition={{ type: "spring", ...springConfig }}>{number}</motion.span>
  ) : (
    <span ref={ref} className="invisible absolute">{number}</span>
  );
}

function Digit({ digit }: { digit: number }): JSX.Element {
  const spring = useSpring(digit, { stiffness: 280, damping: 18, mass: 0.3 });
  useEffect(() => { spring.set(digit); }, [digit, spring]);

  return (
    <div className="relative inline-block w-[1ch] overflow-x-visible overflow-y-clip leading-none tabular-nums">
      <div className="invisible">0</div>
      {Array.from({ length: 10 }, (_, number) => <NumberGlyph key={number} spring={spring} number={number} />)}
    </div>
  );
}

/**
 * Set minDigits to the integer digit count of the largest value in the parent's
 * set (e.g. 5 for 5,000 / 10,000) to reserve columns from the first render.
 * padStart additionally retains the largest count seen, with a minimum of two.
 */
export function SlidingNumber({ value, padStart = false, minDigits = 1 }: { value: number; padStart?: boolean; minDigits?: number }): JSX.Element {
  const [integer, fraction] = Math.abs(value).toString().split(".");
  const [largestCount, setLargestCount] = useState(integer.length);
  if (padStart && integer.length > largestCount) setLargestCount(integer.length);
  const count = Math.max(integer.length, minDigits, padStart ? Math.max(2, largestCount) : 1);
  const digits = integer.padStart(count, "0").split("");
  const label = `${value < 0 ? "-" : ""}${digits.join("").replace(/\B(?=(\d{3})+(?!\d))/g, ",")}${fraction ? `.${fraction}` : ""}`;

  return (
    <div className="flex items-center" role="img" aria-label={label}>
      {value < 0 && <span aria-hidden="true">-</span>}
      {digits.map((digit, index) => (
        <Fragment key={`pos-${digits.length - index - 1}`}>
          {index > 0 && (digits.length - index) % 3 === 0 && <span>,</span>}
          <Digit digit={Number(digit)} />
        </Fragment>
      ))}
      {fraction && <><span>.</span>{fraction.split("").map((digit, index) => <Digit key={`decimal-${index}`} digit={Number(digit)} />)}</>}
    </div>
  );
}
