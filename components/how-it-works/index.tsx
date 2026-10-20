import { Container } from "@/components/container";
import { AuditVisual, SetupVisual, OptimizationVisual, OperatorVisual } from "@/components/platform/visuals";
import { SectionHeading } from "@/components/section-heading";
import { ShimmerText } from "@/components/shimmer-text";
import { SubHeading } from "@/components/sub-heading";

const steps = [
  {
    title: "Feasibility",
    body: "We audit your marketing and sales processes, from your offer and lead quality to the way your team closes.",
    visual: AuditVisual,
  },
  {
    title: "Setup",
    body: "We build your campaigns, scripts, and follow-ups, then connect everything to your existing tech stack.",
    visual: SetupVisual,
  },
  {
    title: "Optimization",
    body: "We review the data, A/B test new scripts, and refine your segments to keep improving every campaign.",
    visual: OptimizationVisual,
  },
];

export function HowItWorks() {
  return (
    <Container id="how-it-works" className="border-divide border-x">
      <div className="flex flex-col items-center pt-16">
        <ShimmerText>How it works</ShimmerText>
        <SectionHeading>Done-for-you deployment. Built for your business.</SectionHeading>
        <SubHeading>From feasibility to setup, and from launch to optimization — all done for you.</SubHeading>
        <div className="mt-16 grid w-full grid-cols-1 border-t border-divide md:grid-cols-2">
          {steps.map((step, index) => (
            <div key={step.title} className={`platform-step ${index % 2 === 0 ? "md:border-r" : ""} border-b border-divide`}>
              <div className="mb-4 flex items-center gap-3">
                <span className="font-mono text-xs text-neutral-500" aria-hidden="true">0{index + 1}</span>
                <h4 className="text-base font-medium text-primary">{step.title}</h4>
              </div>
              <p className="min-h-18 text-sm leading-6 text-neutral-500 dark:text-neutral-400">{step.body}</p>
              <step.visual />
            </div>
          ))}
          <div className="platform-step border-b border-divide">
            <div className="mb-4 flex items-center gap-3">
              <span className="font-mono text-xs text-neutral-500" aria-hidden="true">04</span>
              <h4 className="text-base font-medium text-primary">Growth operator support</h4>
            </div>
            <p className="min-h-18 text-sm leading-6 text-neutral-500 dark:text-neutral-400">Your personal email and SMS marketing growth operator. Full expertise at your fingertips, beyond setup and launch.</p>
            <OperatorVisual />
          </div>
        </div>
      </div>
    </Container>
  );
}
