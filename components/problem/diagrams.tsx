import type { ReactNode } from "react";
import { LogoMark } from "@/components/logo";
import { ColdAdsIcon, DatabaseIcon, EngageIcon, OperatorIcon, BottleneckIcon } from "@/icons/card-icons";
import { CheckCircleIcon, IMessageIcon, MailIcon, SmsIcon } from "@/icons/general";

export type ProblemScenario = "warm-pipeline" | "zero-ad-spend" | "rep-bottleneck";

function Solution({ children }: { children: ReactNode }) {
  return <div className="story-solution"><span className="story-logo" aria-hidden="true"><LogoMark className="h-6" /></span><div><span className="story-label">With Reclosed</span>{children}</div></div>;
}

function PipelineDiagram() {
  return <div className="story-canvas story-pipeline" role="group" aria-label="Paid acquisition brings in leads. Reclosed reconnects the warm opportunities left in your CRM.">
    <div className="story-source"><ColdAdsIcon aria-hidden="true" /><span>Your paid acquisition</span><span className="story-source-note">Already invested</span></div>
    <div className="story-fork" aria-hidden="true" />
    <div className="story-lead-paths">
      <div className="story-lead-card"><EngageIcon aria-hidden="true" /><strong>Fresh leads</strong><p>New faces.<br />First conversations.</p><span className="story-status">Getting the attention</span></div>
      <div className="story-lead-card story-lead-dormant"><DatabaseIcon aria-hidden="true" /><strong>Warm CRM leads</strong><p>No-shows. Not-nows.<br />Never-bookeds.</p><span className="story-status story-status-waiting">Left waiting</span></div>
    </div>
    <div className="story-reconnect"><span aria-hidden="true">↓</span><p>Reconnect the opportunities you already have</p></div>
    <Solution><strong>Turn the warm list into new conversations.</strong><div className="story-mini-steps"><span>Reach out</span><span aria-hidden="true">→</span><span>Qualify</span><span aria-hidden="true">→</span><span>Book</span></div></Solution>
  </div>;
}

const messages = [
  { label: "No-show", icon: IMessageIcon, message: "Want to find a better time for that call?" },
  { label: "Not now", icon: MailIcon, message: "Is this a better month to pick things up?" },
  { label: "Never booked", icon: SmsIcon, message: "Still exploring? Happy to answer your questions." },
];

function ContextDiagram() {
  return <div className="story-canvas story-context" role="group" aria-label="A generic blast ignores the lead's history. Reclosed matches each conversation to their situation.">
    <div className="story-blast"><MailIcon aria-hidden="true" /><div><span className="story-label">One message for everyone</span><p>“Hey, just checking in. Still interested?”</p></div><span className="story-blast-repeat" aria-hidden="true">↻</span></div>
    <div className="story-context-divider"><span>Same list. A personal next step.</span></div>
    <div className="story-personal-messages">{messages.map(({ label, icon: Icon, message }) => <div key={label}><span className="story-person"><Icon aria-hidden="true" />{label}</span><p>{message}</p></div>)}</div>
    <Solution><strong>Start with their history. Give them a reason to reply.</strong><p>New conversations, without buying more leads.</p></Solution>
  </div>;
}

function CapacityDiagram() {
  return <div className="story-canvas story-capacity" role="group" aria-label="Manual follow-up leaves older leads waiting. Reclosed works the list so your reps can focus on qualified calls.">
    <div className="story-queue-header"><DatabaseIcon aria-hidden="true" /><strong>The follow-up queue keeps growing</strong></div>
    <div className="story-queue">{["Fresh inquiry", "Missed appointment", "Ready to revisit"].map((label, index) => <div key={label}><span className="story-queue-dot" aria-hidden="true" /><span>{label}</span><span className={index === 0 ? "story-queue-worked" : "story-queue-wait"}>{index === 0 ? "Being worked" : "Waiting"}</span></div>)}</div>
    <div className="story-bottleneck"><BottleneckIcon aria-hidden="true" /><p>One rep. Only so much time for follow-up.</p></div>
    <div className="story-team-split"><div><span className="story-logo" aria-hidden="true"><LogoMark className="h-6" /></span><span className="story-label">Reclosed</span><strong>Works the list</strong><p>Reconnects, follows up,<br />and qualifies.</p></div><span className="story-handoff-arrow" aria-hidden="true">→</span><div><span className="story-closer-icon"><OperatorIcon aria-hidden="true" /></span><span className="story-label">Your closers</span><strong>Work the calls</strong><p>Qualified opportunities.<br />Context included.</p></div></div>
    <div className="story-capacity-result"><CheckCircleIcon aria-hidden="true" /><span>Less manual chasing. More time for the close.</span></div>
  </div>;
}

const diagrams = { "warm-pipeline": PipelineDiagram, "zero-ad-spend": ContextDiagram, "rep-bottleneck": CapacityDiagram };
export function ProblemDiagram({ scenario }: { scenario: ProblemScenario }) {
  const Diagram = diagrams[scenario];
  return <Diagram />;
}
