import { Container } from "@/components/container";
import { SectionHeading } from "@/components/section-heading";
import { AttentionIcon, BlastIcon, BottleneckIcon } from "@/icons/card-icons";
import { ProblemExplorer } from "@/components/problem-explorer";

const symptoms = [
  { icon: AttentionIcon, title: "Fresh leads get the focus", body: "When ads scale, fresh leads get the attention. The warmer leads already in your CRM get none." },
  { icon: BlastIcon, title: "Blasts leave money behind", body: "Occasional templated emails and SMS blasts barely scratch the surface of your paid-for pipeline." },
  { icon: BottleneckIcon, title: "Follow-up falls through", body: "Reps skip manual reactivation. The leads you paid for sit untouched in your CRM." },
];

export function Problem() {
  return (
    <Container id="problem" className="scroll-mt-24 border-x border-divide">
      <section aria-labelledby="problem-heading">
        <header className="px-5 pt-16 pb-10 text-center md:pt-20 md:pb-12">
          <p className="text-sm text-brand">The problem</p>
          <SectionHeading className="mx-auto max-w-[760px] text-balance leading-tight">
            <span id="problem-heading">Your <span className="text-brand">current stack</span> is not built to reactivate dead leads.</span>
          </SectionHeading>
        </header>
        <div className="grid grid-cols-1 gap-6 px-5 pb-12 sm:px-8 md:grid-cols-3 md:gap-0 md:pb-16 lg:px-12">
          {symptoms.map(({ icon: Icon, title, body }) => (
            <div key={title} className="border-divide md:border-r md:px-6 md:first:pl-0 md:last:border-r-0 md:last:pr-0 lg:px-8">
              <div className="flex items-center gap-2.5">
                <Icon aria-hidden="true" className="size-4 shrink-0 text-neutral-500 dark:text-neutral-400" />
                <h3 className="text-sm font-medium text-primary">{title}</h3>
              </div>
              <p className="mt-3 max-w-sm text-sm leading-6 text-neutral-500 dark:text-neutral-400">{body}</p>
            </div>
          ))}
        </div>
        <ProblemExplorer />
      </section>
    </Container>
  );
}
