import { Container } from "@/components/container";
import { SectionHeading } from "@/components/section-heading";
import { SubHeading } from "@/components/sub-heading";

const outcomes = [
  ["Lead coverage", "Fresh leads get the attention. The old list sits untouched.", "Every dormant lead gets consistent, contextual outreach."],
  ["Follow-up", "Manual reminders and one-off blasts leave gaps.", "Conversations continue across the channels leads use."],
  ["Your sales team", "Reps spend time chasing and qualifying old leads.", "Qualified calls reach the right rep's calendar."],
  ["Revenue recovery", "Paid-for opportunities go unworked in the CRM.", "Your existing pipeline becomes a source of new booked calls."],
];

export function Results() {
  return (
    <Container id="results" className="border-divide border-x">
      <div className="flex flex-col items-center px-5 pt-16 sm:px-8 lg:px-12">
        <SectionHeading>Same CRM. A different outcome.</SectionHeading>
        <SubHeading>Turn the leads you already paid for into conversations your sales team can close.</SubHeading>
      </div>
      <div className="mt-16 px-5 pb-16 sm:px-8 lg:px-12">
        <div className="hidden grid-cols-[1fr_1.5fr_1.5fr] gap-6 pb-5 md:grid" aria-hidden="true">
          <span />
          <p className="font-mono text-xs text-neutral-500 uppercase">Before Reclosed</p>
          <p className="font-mono text-xs text-brand uppercase">With Reclosed</p>
        </div>
        <div className="divide-y divide-divide">
          {outcomes.map(([label, before, after]) => (
            <div key={label} className="grid gap-4 py-6 first:border-t first:border-divide md:grid-cols-[1fr_1.5fr_1.5fr] md:gap-6">
              <h4 className="text-sm font-medium text-primary">{label}</h4>
              <p className="text-sm leading-6 text-neutral-500 dark:text-neutral-400"><span className="sr-only">Before Reclosed: </span>{before}</p>
              <p className="text-sm leading-6 text-primary"><span className="mb-1 block font-mono text-[11px] text-brand uppercase md:sr-only">With Reclosed: </span>{after}</p>
            </div>
          ))}
        </div>
      </div>
    </Container>
  );
}
