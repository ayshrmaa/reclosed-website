import { CAL_URL } from "@/data/site";
import { ComplianceIcon, DatabaseIcon, OptInIcon, ZeroAdIcon } from "@/icons/card-icons";
import { Button } from "./button";
import { Container } from "./container";

const safeguards = [
  { icon: ComplianceIcon, title: "Encrypted in transit and at rest", body: "Your CRM data is never sent or stored in plain text." },
  { icon: DatabaseIcon, title: "Isolated by client", body: "Your data lives in its own space. Only your assigned team can access it, through scoped CRM permissions." },
  { icon: ZeroAdIcon, title: "Never used for training", body: "Your leads and conversations never train AI models and are never shared with other clients." },
  { icon: OptInIcon, title: "Yours to take back", body: "Export or delete your data on request, including when you offboard. NDA available." },
];

export function Compliance() {
  return (
    <Container id="security" className="border-divide border-x bg-gray-100 px-5 py-14 sm:px-8 md:py-20 lg:px-12 dark:bg-neutral-900">
      <section aria-labelledby="security-heading" className="grid items-center gap-10 md:grid-cols-2 md:gap-16">
        <div>
          <p className="text-sm font-medium text-brand">Data security</p>
          <h2 id="security-heading" className="mt-4 text-2xl font-medium tracking-tight text-primary md:text-3xl lg:text-4xl">
            Your CRM data stays yours.<br />Locked down, start to finish.
          </h2>
          <p className="mt-5 max-w-lg text-sm leading-7 text-neutral-600 dark:text-neutral-400">
            Your leads, conversations, and pipeline notes are handled with the same care as your own systems. Here is exactly what happens to your data.
          </p>
          <Button href={CAL_URL} external className="mt-6 inline-flex min-h-11 items-center gap-3">
            Book a call <span aria-hidden="true">↗</span>
          </Button>
        </div>
        <ul className="divide-y divide-divide">
          {safeguards.map(({ icon: Icon, title, body }) => (
            <li key={title} className="flex gap-4 py-6 first:pt-0 last:pb-0">
              <span className="flex size-11 shrink-0 items-center justify-center rounded-xl border border-brand/15 bg-brand/5 text-brand dark:bg-brand/10"><Icon className="size-5" aria-hidden="true" /></span>
              <div>
                <h3 className="text-base font-medium text-primary">{title}</h3>
                <p className="mt-2 text-sm leading-6 text-neutral-600 dark:text-neutral-400">{body}</p>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </Container>
  );
}
