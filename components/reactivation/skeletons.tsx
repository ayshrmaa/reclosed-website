"use client";

import { AnimatePresence, motion } from "motion/react";
import { useCallback, useEffect, useId, useRef, useState, type ReactNode, type SVGProps } from "react";
import { DivideX } from "@/components/divide";
import { LogoMark } from "@/components/logo";
import { INTEGRATIONS } from "@/data/integrations";
import { OperatorIcon, RoutingIcon } from "@/icons/card-icons";
import { AttachmentIcon, CheckCircleIcon, IMessageIcon, PlayIcon, SendIcon, SmsIcon, WhatsAppIcon } from "@/icons/general";
import { cn } from "@/lib/utils";

const leads = [
  { name: "Maya R.", status: "Booked", icon: IMessageIcon, tone: "border-emerald-500 bg-emerald-50 text-emerald-500 dark:bg-emerald-50/10" },
  { name: "Chris T.", status: "Unqualified", icon: WhatsAppIcon, tone: "border-yellow-500 bg-yellow-50 text-yellow-500 dark:bg-yellow-50/10" },
  { name: "Dana L.", status: "Opted out", icon: SmsIcon, tone: "border-red-500 bg-red-50 text-red-500 dark:bg-red-50/10" },
];

function SparkleSweep({ delay }: { delay: number }) {
  // Targets are sampled once; the server and hydration both render the same zeroed initial state.
  const [particles] = useState(() => Array.from({ length: 8 }, () => ({
    x: 100 * Math.random() - 50,
    y: 100 * Math.random() - 50,
    delay: 0.8 * Math.random(),
    duration: 0.5 + Math.random(),
    scale: 0.5 + 0.5 * Math.random(),
  })));

  return (
    <motion.div
      initial={{ left: 0, opacity: 0 }}
      whileInView={{ left: "100%", opacity: [0, 1, 1, 1, 0] }}
      viewport={{ once: true }}
      transition={{ left: { duration: 1, delay, ease: "easeInOut" }, opacity: { duration: 1, delay, ease: "easeInOut" } }}
      className="absolute inset-y-0 left-0 h-full w-[2px] bg-gradient-to-t from-transparent via-blue-500 to-transparent"
      aria-hidden="true"
    >
      {particles.map((particle, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, scale: 0, x: 0, y: 0 }}
          whileInView={{ opacity: [0, 1, 0], scale: [0, particle.scale, 0], x: particle.x, y: particle.y, rotate: [0, 360] }}
          viewport={{ once: true }}
          transition={{ duration: particle.duration, delay: delay + particle.delay, ease: "easeOut" }}
          className="absolute top-1/2 left-1/2 h-1 w-1 text-xs text-blue-400"
        >✨</motion.div>
      ))}
    </motion.div>
  );
}

export function EngageSkeleton() {
  return (
    <motion.div className="relative mx-auto mt-20 h-full max-h-70 min-h-40 w-[85%] rounded-2xl border-t border-gray-300 bg-white p-4 shadow-2xl dark:border-neutral-700 dark:bg-neutral-800">
      <motion.div
        initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 1, delay: 1.5 }}
        className="shadow-aceternity absolute -top-10 -right-10 z-20 flex w-40 shrink-0 flex-col items-start rounded-lg bg-white text-xs dark:bg-neutral-900"
      >
        <div className="flex w-full items-center justify-between p-2">
          <div className="flex items-center gap-2 font-medium"><LogoMark className="size-4" />Reclosed</div>
          <p className="font-mono text-gray-600">iMessage</p>
        </div>
        <DivideX />
        <div className="m-2 rounded-sm border border-blue-500 bg-blue-50 px-2 py-0.5 text-blue-500 dark:bg-blue-50/10">Live</div>
      </motion.div>
      <div className="mb-4 flex gap-2" aria-hidden="true">
        <div className="h-3 w-3 rounded-full bg-red-500" />
        <div className="h-3 w-3 rounded-full bg-yellow-500" />
        <div className="h-3 w-3 rounded-full bg-green-500" />
      </div>
      <div className="mt-12 flex items-center gap-2">
        <LogoMark className="size-4" />
        <span className="text-charcoal-700 text-sm font-medium dark:text-neutral-200">All leads</span>
        <span className="text-charcoal-700 rounded-lg border border-gray-200 bg-gray-50 px-2 py-0.5 text-xs dark:border-neutral-600 dark:bg-neutral-800 dark:text-neutral-200">4,180</span>
      </div>
      <DivideX className="mt-2" />
      {leads.map(({ name, status, icon: Icon, tone }, index) => (
        <div key={name} className="relative">
          <motion.div
            className="mt-4 flex items-center justify-between gap-2"
            initial={{ clipPath: "inset(0 100% 0 0)", filter: "blur(10px)" }}
            whileInView={{ clipPath: "inset(0 0% 0 0)", filter: "blur(0px)" }}
            viewport={{ once: true }} transition={{ duration: 1, delay: index, ease: "easeInOut" }}
          >
            <div className="flex items-center gap-2">
              <Icon className="size-4" />
              <span className="text-charcoal-700 text-sm font-medium dark:text-neutral-200">{name}</span>
            </div>
            <div className={cn("rounded-sm border px-2 py-0.5 text-xs", tone)}>{status}</div>
          </motion.div>
          <SparkleSweep delay={index} />
        </div>
      ))}
    </motion.div>
  );
}

type Message = { role: "lead" | "reclosed"; channel: string; content: string; voice?: boolean };
const messages: Message[] = [
  { role: "reclosed", channel: "iMessage", content: "Hey Maya, still thinking about the coaching program? Happy to answer anything." },
  { role: "lead", channel: "iMessage", content: "Budget actually freed up this month" },
  { role: "reclosed", channel: "WhatsApp", content: "", voice: true },
  { role: "lead", channel: "WhatsApp", content: "Wednesday 2pm works" },
  { role: "reclosed", channel: "Email", content: "Booked. Calendar invite sent." },
];

function VoiceNote() {
  return (
    <div className="flex items-center gap-2 rounded-2xl bg-gray-100 px-3 py-2" role="img" aria-label="WhatsApp voice note, 0:28">
      <span className="size-6 rounded-full bg-green-500 text-white"><PlayIcon /></span>
      <div className="flex items-end gap-0.5" aria-hidden="true">
        {[4, 8, 12, 6, 14, 10, 6, 12, 8, 4].map((height, index) => <span key={index} className="w-0.5 rounded-full bg-gray-400" style={{ height }} />)}
      </div>
      <span className="font-mono text-[10px] text-gray-500">0:28</span>
    </div>
  );
}

function ChatMessage({ message, active, onComplete, onProgress }: { message: Message; active: boolean; onComplete: () => void; onProgress: () => void }) {
  const [characters, setCharacters] = useState(0);
  const content = active ? message.content.slice(0, characters) : message.content;
  const typing = active && characters < message.content.length;

  useEffect(() => {
    if (!active) return;
    if (!message.content.length) {
      const timeout = setTimeout(onComplete, 400);
      return () => clearTimeout(timeout);
    }

    const started = performance.now();
    let timeout: ReturnType<typeof setTimeout> | undefined;
    const interval = setInterval(() => {
      const count = Math.min(message.content.length, Math.floor((performance.now() - started) / 30));
      setCharacters(count);
      if (count === message.content.length) {
        clearInterval(interval);
        timeout = setTimeout(onComplete, 400);
      }
    }, 30);
    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [active, message.content, onComplete]);

  useEffect(() => {
    onProgress();
  }, [content, onProgress]);

  const lead = message.role === "lead";
  return (
    <div className={lead ? "flex justify-end gap-3" : "flex gap-3 px-1"}>
      {!lead && <div className="size-8 rounded-full shadow-aceternity flex items-center justify-center bg-white"><LogoMark className="size-4 text-black" /></div>}
      <div className="flex max-w-xs flex-col gap-1">
        {lead && <span className="sr-only">Maya</span>}
        {message.voice ? <VoiceNote /> : (
          <div className={lead ? "rounded-2xl rounded-br-md bg-blue-500 px-4 py-2 text-sm text-white" : "text-charcoal-700 rounded-2xl rounded-bl-md bg-gray-100 px-4 py-2 text-sm"}>
            {content}{typing && <span className="animate-pulse">|</span>}
          </div>
        )}
        <span className="font-mono text-[10px] text-gray-500">{message.channel}</span>
      </div>
      {lead && <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-gray-200 text-xs font-medium text-gray-600 dark:bg-neutral-700 dark:text-neutral-200" aria-hidden="true">M</div>}
    </div>
  );
}

export function ConversationSkeleton() {
  const [visible, setVisible] = useState(0);
  const [draft, setDraft] = useState("");
  const [replies, setReplies] = useState<Message[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (visible || replies.length) return;
    const timeout = setTimeout(() => setVisible(1), 200);
    return () => clearTimeout(timeout);
  }, [visible, replies.length]);

  const advanceMessage = useCallback(() => {
    setVisible((current) => Math.min(current + 1, messages.length));
  }, []);

  const scrollToNewest = useCallback(() => {
    const list = scrollRef.current;
    list?.scrollTo({ top: list.scrollHeight, behavior: "instant" });
  }, []);

  useEffect(() => {
    scrollToNewest();
  }, [visible, replies.length, scrollToNewest]);

  function sendReply() {
    if (!draft.trim()) return;
    // This is a local demo, matching the reference input's in-memory behavior.
    setReplies((current) => [...current, { role: "reclosed", channel: "SMS", content: draft.trim() }]);
    setVisible(messages.length);
    setDraft("");
  }

  return (
    <motion.div className="relative mx-auto mt-2 h-full max-h-70 min-h-40 w-[85%] p-4">
      <div className="absolute inset-x-0 -bottom-4 mx-auto flex w-[85%] items-center justify-between rounded-lg border border-gray-300 bg-white shadow-[0px_2px_12px_0px_rgba(0,0,0,0.08)] dark:border-neutral-700 dark:bg-neutral-800">
        <input
          type="text" value={draft} onChange={(event) => setDraft(event.target.value)}
          onKeyDown={(event) => { if (event.key === "Enter") sendReply(); }}
          className="flex-1 border-none px-4 py-4 text-xs placeholder-neutral-600 focus:outline-none"
          placeholder="Reply as Reclosed" aria-label="Reply as Reclosed"
        />
        <div className="mr-4 flex items-center gap-2">
          <AttachmentIcon aria-hidden="true" />
          <button type="button" className="cursor-pointer" onClick={sendReply} aria-label="Send demo reply"><SendIcon /></button>
        </div>
      </div>
      <div
        ref={scrollRef}
        className="mask-bg-gradient-to-b flex max-h-[calc(100%-1rem)] flex-col gap-4 overflow-y-auto from-white to-transparent mask-t-from-70% mask-b-from-70% pt-4 pb-16 dark:from-neutral-900 dark:to-transparent"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        <AnimatePresence>
          {[...messages.slice(0, visible), ...replies].map((message, index) => {
            const active = index === visible - 1 && !replies.length;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }} transition={{ duration: 0.3 }}
              >
                <ChatMessage message={message} active={active} onComplete={advanceMessage} onProgress={scrollToNewest} />
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

function TextIconBlock({ icon, text, children }: { icon: ReactNode; text: string; children: ReactNode }) {
  return <div className="relative flex items-center gap-2">{icon}<span className="text-charcoal-700 text-sm font-medium dark:text-neutral-200">{text}</span>{children}</div>;
}

function IntegrationNode({ name }: { name: string }) {
  const integration = INTEGRATIONS.find((entry) => entry.title === name)!;
  return (
    <div className="relative flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-md border border-neutral-200 bg-white shadow-md dark:border-neutral-600 dark:bg-neutral-900">
      {/* Preserve the existing local integration logo's intrinsic aspect ratio. */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={integration.src} alt={integration.title} className="size-6 object-contain" />
    </div>
  );
}

export function RoutingGraph() {
  return (
    <>
      <div className="relative mx-auto my-24 h-full w-full scale-[2] sm:scale-[1.5] md:scale-[1.2] lg:hidden">
        {/* Self-contained local SVG with embedded integration logos. */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/illustrations/routing-graph.svg" alt="Grading and routing graph" width={1000} height={420} />
      </div>
      <motion.div className="relative mx-auto my-12 hidden h-full max-h-70 min-h-80 max-w-[67rem] grid-cols-2 p-4 lg:grid">
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-10">
            <TextIconBlock icon={<CheckCircleIcon className="size-4" />} text="Qualified · A grade"><TopSVG className="absolute top-2 -right-84" /></TextIconBlock>
            <TextIconBlock icon={<RoutingIcon className="size-4" />} text="Downsell · B grade"><MiddleSVG className="absolute top-2 -right-84" /></TextIconBlock>
            <TextIconBlock icon={<OperatorIcon className="size-4" />} text="Sales team B"><BottomSVG className="absolute -right-84 bottom-2" /></TextIconBlock>
          </div>
          <div className="relative h-16 w-16 overflow-hidden rounded-md bg-gray-200 p-px shadow-xl dark:bg-neutral-700" style={{ flexShrink: 0 }}>
            <div className="absolute inset-0 scale-[1.4] animate-spin rounded-full bg-conic [background-image:conic-gradient(at_center,transparent,var(--color-blue-500)_20%,transparent_30%)] [animation-duration:2s]" />
            <div className="absolute inset-0 scale-[1.4] animate-spin rounded-full bg-conic [background-image:conic-gradient(at_center,transparent,var(--color-brand)_20%,transparent_30%)] [animation-delay:1s] [animation-duration:2s]" />
            <div className="relative z-20 flex h-full w-full items-center justify-center rounded-[5px] bg-white dark:bg-neutral-900"><LogoMark className="size-8 text-black dark:text-white" /></div>
          </div>
        </div>
        <div className="relative flex h-full w-full items-center justify-start">
          <RightSideSVG />
          <div className="relative flex flex-col items-center gap-2">
            <span className="relative z-20 rounded-sm border border-blue-500 bg-blue-50 px-2 py-0.5 text-xs text-blue-500 dark:bg-blue-900 dark:text-white">Routed</span>
            <div className="absolute inset-x-0 -top-30 flex h-full flex-col items-center">
              <IntegrationNode name="GoHighLevel" />
              <VerticalLine />
              <VerticalLine />
              <IntegrationNode name="Close" />
            </div>
          </div>
          <div className="2 absolute -top-4 right-30 flex h-full flex-col items-center">
            <IntegrationNode name="Calendly" />
            <VerticalLine />
            <IntegrationNode name="Slack" />
          </div>
          <RightSideSVG />
          <IntegrationNode name="Discord" />
        </div>
      </motion.div>
    </>
  );
}

function VerticalLine(props: SVGProps<SVGSVGElement>) {
  const id = useId();
  return (
    <svg width="1" height="81" viewBox="0 0 1 81" fill="none" xmlns="http://www.w3.org/2000/svg" className="shrink-0" {...props}>
      <line y1="-0.5" x2="80" y2="-0.5" transform="matrix(0 -1 -1 0 0 80.5)" stroke="var(--color-line)" />
      <line y1="-0.5" x2="80" y2="-0.5" transform="matrix(0 -1 -1 0 0 80.5)" stroke={`url(#${id})`} />
      <defs>
        <motion.linearGradient id={id} initial={{ x1: 0, x2: 2, y1: "0%", y2: "0%" }} animate={{ x1: 0, x2: 2, y1: "80%", y2: "100%" }} transition={{ duration: 4, repeat: Infinity, repeatType: "loop", ease: "easeInOut", repeatDelay: 1 }} gradientUnits="userSpaceOnUse">
          <stop stopColor="var(--color-line)" /><stop offset="0.5" stopColor="var(--color-brand)" /><stop offset="1" stopColor="var(--color-line)" />
        </motion.linearGradient>
      </defs>
    </svg>
  );
}

function RightSideSVG(props: SVGProps<SVGSVGElement>) {
  const id = useId();
  return (
    <svg width="314" height="2" viewBox="0 0 314 2" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <line x1="0.5" y1="1" x2="313.5" y2="1" stroke="var(--color-line)" strokeLinecap="round" />
      <line x1="0.5" y1="1" x2="313.5" y2="1" stroke={`url(#${id})`} strokeLinecap="round" />
      <defs>
        <motion.linearGradient id={id} initial={{ y1: 0, y2: 1, x1: "-10%", x2: "0%" }} animate={{ y1: 0, y2: 1, x1: "110%", x2: "120%" }} transition={{ duration: 2, repeat: Infinity, repeatType: "loop", ease: "easeInOut", repeatDelay: 1 }} gradientUnits="userSpaceOnUse">
          <stop stopColor="var(--color-line)" /><stop offset="0.5" stopColor="var(--color-blue-500)" /><stop offset="1" stopColor="var(--color-line)" />
        </motion.linearGradient>
      </defs>
    </svg>
  );
}

function TopSVG(props: SVGProps<SVGSVGElement>) {
  const id = useId();
  return (
    <svg width="312" height="33" viewBox="0 0 312 33" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <line x1="0.5" y1="1" x2="311.5" y2="1" stroke="var(--color-line)" strokeLinecap="round" />
      <line x1="311.5" y1="1" x2="311.5" y2="32" stroke="var(--color-line)" strokeLinecap="round" />
      <line x1="0.5" y1="1" x2="311.5" y2="1" stroke={`url(#${id})`} strokeLinecap="round" />
      <defs>
        <motion.linearGradient id={id} gradientUnits="userSpaceOnUse" initial={{ x1: "-20%", x2: "0%", y1: 1, y2: 0 }} animate={{ x1: "105%", x2: "120%", y1: 1, y2: 0 }} transition={{ duration: 2, repeat: Infinity, repeatType: "loop", ease: "easeInOut", repeatDelay: 1 }}>
          <stop stopColor="var(--color-line)" /><stop offset="0.33" stopColor="var(--color-brand)" /><stop offset="0.66" stopColor="var(--color-brand)" /><stop offset="1" stopColor="var(--color-line)" />
        </motion.linearGradient>
      </defs>
    </svg>
  );
}

function MiddleSVG(props: SVGProps<SVGSVGElement>) {
  const id = useId();
  return (
    <svg width="323" height="2" viewBox="0 0 323 2" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <line x1="0.5" y1="1" x2="322.5" y2="1" stroke="var(--color-line)" strokeLinecap="round" />
      <line x1="0.5" y1="1" x2="322.5" y2="1" stroke={`url(#${id})`} strokeLinecap="round" />
      <defs>
        <motion.linearGradient id={id} gradientUnits="userSpaceOnUse" initial={{ x1: "-20%", x2: "0%", y1: 1, y2: 0 }} animate={{ x1: "105%", x2: "120%", y1: 1, y2: 0 }} transition={{ duration: 2, repeat: Infinity, repeatType: "loop", ease: "easeInOut", repeatDelay: 1 }}>
          <stop stopColor="var(--color-line)" /><stop offset="0.33" stopColor="var(--color-blue-500)" /><stop offset="0.66" stopColor="var(--color-blue-500)" /><stop offset="1" stopColor="var(--color-line)" />
        </motion.linearGradient>
      </defs>
    </svg>
  );
}

function BottomSVG(props: SVGProps<SVGSVGElement>) {
  const id = useId();
  return (
    <svg width="326" height="32" viewBox="0 0 326 32" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <line y1="31" x2="325" y2="31" stroke="var(--color-line)" />
      <line x1="325.5" y1="31" x2="325.5" y2="1" stroke="var(--color-line)" strokeLinecap="round" />
      <line y1="31" x2="325" y2="31" stroke={`url(#${id})`} />
      <defs>
        <motion.linearGradient id={id} gradientUnits="userSpaceOnUse" initial={{ x1: "-20%", x2: "0%", y1: 1, y2: 0 }} animate={{ x1: "105%", x2: "120%" }} transition={{ duration: 2, repeat: Infinity, repeatType: "loop", ease: "easeInOut", repeatDelay: 1 }}>
          <stop stopColor="var(--color-line)" /><stop offset="0.33" stopColor="var(--color-yellow-500)" /><stop offset="0.66" stopColor="var(--color-yellow-500)" /><stop offset="1" stopColor="var(--color-line)" />
        </motion.linearGradient>
      </defs>
    </svg>
  );
}
