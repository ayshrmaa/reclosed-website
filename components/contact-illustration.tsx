import { LogoMark } from "@/components/logo";

const steps = [
  ["Reach out", "Restart conversations with the leads already in your CRM."],
  ["Qualify", "Find the right fit before your sales team steps in."],
  ["Book", "Turn warm conversations into qualified calls."],
];

export function ContactIllustration() {
  return (
    <div className="flex min-h-80 flex-col justify-between gap-12 rounded-2xl border border-divide bg-brand/5 p-6 md:p-10 dark:bg-brand/10">
      <LogoMark className="h-14" />
      <div>
        <h2 className="max-w-sm text-3xl font-medium leading-tight tracking-tight text-primary">Your next booked call is already in your CRM.</h2>
        <p className="mt-4 max-w-sm text-sm leading-7 text-neutral-600 dark:text-neutral-400">One platform. Every channel. A dedicated growth operator to put it all to work.</p>
      </div>
      <ol className="divide-y divide-brand/15">
        {steps.map(([title, body], index) => (
          <li key={title} className="flex gap-4 py-5 first:pt-0 last:pb-0">
            <span className="pt-1 font-mono text-xs text-brand">0{index + 1}</span>
            <div><h3 className="font-medium text-primary">{title}</h3><p className="mt-1 text-sm leading-6 text-neutral-600 dark:text-neutral-400">{body}</p></div>
          </li>
        ))}
      </ol>
    </div>
  );
}
