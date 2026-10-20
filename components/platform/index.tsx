import { Button } from "@/components/button";
import { Container } from "@/components/container";
import { SectionHeading } from "@/components/section-heading";
import { FeatureLabel } from "@/components/feature-label";
import { CAL_URL } from "@/data/site";
import { PlatformNavigation } from "./navigation";
import { EngageVisual, ChannelsVisual, RoutingVisual, ScriptsVisual, ComplianceVisual } from "./visuals";

const features = [
  {
    id: "platform-engage",
    title: "Engage, qualify, book. Period.",
    body: "One goal: book as many qualified calls as possible from your CRM list. Every lead ends up opted out, unqualified, or booked.",
    visual: EngageVisual,
    details: [
      ["Reach out", "Work every dormant lead, including the no-shows and not-nows."],
      ["Qualify", "Find out who is a fit before your sales team steps in."],
      ["Book", "Put qualified conversations directly on your calendar."],
    ],
  },
  {
    id: "platform-channels",
    title: "Every channel. One conversation.",
    body: "iMessage, WhatsApp voice notes, email, and SMS, connected by Universal Context™. Every message picks up where the last conversation left off.",
    visual: ChannelsVisual,
    details: [
      ["Meet leads where they reply", "Reach each lead on the channel they actually use."],
      ["Carry the context", "What happens on one channel informs the next message."],
      ["Know the history", "CRM notes, tags, and pipeline history inform the outreach."],
    ],
  },
  {
    id: "platform-routing",
    title: "The right lead. The right next step.",
    body: "Grade replies against your own qualification criteria and route leads to the right pipeline or sales team. Use low-ticket downsells for ascension later.",
    visual: RoutingVisual,
    details: [
      ["Custom qualification", "Score replies against the criteria that matter to your offer."],
      ["Automatic routing", "Send qualified leads to the right team and pipeline."],
      ["Downsell, then ascend", "Give leads who are not ready a relevant lower-ticket offer."],
    ],
  },
  {
    id: "sales-teams",
    title: "For sales teams, by sales teams.",
    body: "Reactivation scripts, cadences, and segmentation built from high-ticket sales conversations with our partnered agencies. Grounded in how people actually buy.",
    visual: ScriptsVisual,
    details: [
      ["Real sales conversations", "Learn from the objections and replies sales teams hear every day."],
      ["Agency expertise", "Built with partners who sell high-ticket offers."],
      ["Purposeful follow-ups", "Match the script and cadence to the lead's situation."],
    ],
  },
  {
    id: "platform-compliance",
    title: "Work the list. Protect deliverability.",
    body: "Reclosed's compliance stack manages send times, reply delays, content safety, and number health to help reduce deliverability loss and carrier blacklisting.",
    visual: ComplianceVisual,
    details: [
      ["Local send times", "Reach leads during their local sending windows."],
      ["Considered timing", "Manage reply delays, follow-up cadence, and content safety."],
      ["Number health", "Warm up and rotate numbers to help protect deliverability."],
    ],
  },
];

function WalkthroughLink() {
  return (
    <Button href={CAL_URL} external className="platform-cta inline-flex min-h-11 items-center gap-3">
      Book a call <span aria-hidden="true">↗</span>
    </Button>
  );
}

export function Platform() {
  return (
    <Container id="platform" className="platform border-x border-divide">
      <section aria-labelledby="platform-heading">
        <header className="border-b border-divide px-5 py-16 text-center md:py-20">
          <FeatureLabel number="01" name="CRM Reactivation" />
          <SectionHeading className="mx-auto max-w-2xl text-balance">
            <span id="platform-heading">Every lead, worked to the maximum.</span>
          </SectionHeading>
          <p className="mt-4 text-base leading-7 text-neutral-500 dark:text-neutral-400">Reclosed sets the new standard for revenue recovery.</p>
        </header>

        <div className="platform-layout">
          <aside className="platform-sidebar"><PlatformNavigation /></aside>
          <div className="min-w-0">
            {features.map((feature) => (
              <article key={feature.id} id={feature.id} aria-labelledby={`${feature.id}-heading`} className="platform-article border-t border-divide">
                <div className="platform-intro">
                  <h3 id={`${feature.id}-heading`} className="platform-title">{feature.title}</h3>
                  <p className="platform-description">{feature.body}</p>
                </div>
                <div className="mx-5 sm:mx-8 lg:mx-12">
                  <feature.visual />
                </div>
                <div className="grid gap-7 px-5 pt-8 pb-12 sm:px-8 md:grid-cols-3 lg:px-12">
                  {feature.details.map(([title, body]) => (
                    <div key={title}>
                      <h4 className="text-sm font-medium text-primary">{title}</h4>
                      <p className="mt-2 text-sm leading-6 text-neutral-500 dark:text-neutral-400">{body}</p>
                    </div>
                  ))}
                </div>
              </article>
            ))}
            <div className="flex flex-col items-start gap-5 border-t border-divide px-5 py-8 sm:flex-row sm:items-center sm:justify-between sm:px-8 lg:px-12">
              <p className="text-base font-medium text-primary">Put your dormant pipeline to work.</p>
              <WalkthroughLink />
            </div>
          </div>
        </div>
      </section>
    </Container>
  );
}
