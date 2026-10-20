import { Button } from "@/components/button";
import { Container } from "@/components/container";
import { LogoMark } from "@/components/logo";
import { CAL_URL } from "@/data/site";
import { SparklesIcon, TerminalIcon } from "@/icons/general";

export function ClientTools() {
  return (
    <Container id="client-tools" className="scroll-mt-24 border-x border-divide px-5 py-14 sm:px-8 md:py-16 lg:px-12">
      <section aria-labelledby="client-tools-heading" className="grid items-center gap-9 md:grid-cols-2 md:gap-12 lg:gap-20">
        <div>
          <p className="text-sm font-medium text-brand">MCP &amp; CLI · Included for clients</p>
          <h2 id="client-tools-heading" className="mt-4 max-w-md text-3xl font-medium leading-tight tracking-tight text-primary lg:text-4xl">
            Your pipeline,<br />a conversation away.
          </h2>
          <p className="mt-5 max-w-md text-sm leading-7 text-neutral-600 dark:text-neutral-400">
            Ask your AI assistant about leads, conversations, and bookings, or access the same data from your terminal. Included with your Reclosed engagement and set up by your growth operator.
          </p>
          <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-neutral-500 dark:text-neutral-400">
            <span className="inline-flex items-center gap-2"><SparklesIcon className="size-4 text-brand" aria-hidden="true" />Your AI assistant</span>
            <span className="inline-flex items-center gap-2"><TerminalIcon className="size-4 text-brand" aria-hidden="true" />Your terminal</span>
          </div>
          <Button href={CAL_URL} external className="mt-6 inline-flex min-h-11 items-center gap-3">Book a call <span aria-hidden="true">↗</span></Button>
        </div>
        <div role="group" aria-label="Illustrative AI assistant conversation about a lead" className="min-w-0 overflow-hidden rounded-2xl border border-divide bg-gray-100 dark:bg-neutral-900">
          <div className="flex items-center justify-between gap-4 border-b border-divide px-5 py-4">
            <span className="flex items-center gap-2.5 text-sm font-medium text-primary"><SparklesIcon className="size-4 text-brand" aria-hidden="true" />Your AI assistant</span>
            <span className="text-xs text-neutral-500 dark:text-neutral-400">Example</span>
          </div>
          <div className="space-y-6 p-5 sm:p-6">
            <p className="ml-auto w-fit max-w-[90%] rounded-2xl rounded-br-md bg-brand/10 px-4 py-3 text-sm leading-6 text-primary">What happened with this lead?</p>
            <div className="flex items-start gap-3">
              <span className="flex size-8 shrink-0 items-center justify-center rounded-lg border border-divide bg-white dark:bg-neutral-950"><LogoMark className="h-4" /></span>
              <div className="min-w-0">
                <p className="text-sm font-medium text-primary">Reclosed</p>
                <p className="mt-2 text-sm leading-7 text-neutral-600 dark:text-neutral-400">Reopened on iMessage, followed up on WhatsApp, and booked the call. Your closer has the full conversation.</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {["CRM history", "Conversations", "Bookings"].map((label) => <span key={label} className="rounded-md border border-divide bg-white px-2 py-1 text-[11px] text-neutral-600 dark:bg-neutral-950 dark:text-neutral-400">{label}</span>)}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Container>
  );
}
