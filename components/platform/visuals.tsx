"use client";

import { useState, type ReactNode } from "react";
import { LogoMark } from "@/components/logo";
import { DatabaseIcon, FeasibilityIcon, SetupIcon, OptimizationIcon, OperatorIcon, EngageIcon, RoutingIcon, ComplianceIcon } from "@/icons/card-icons";
import { CheckCircleIcon, IMessageIcon, WhatsAppIcon, MailIcon, SmsIcon } from "@/icons/general";
import { cn } from "@/lib/utils";
import "./visuals.css";
import { AppleMessagePreview, WhatsAppPreview, EmailPreview } from "./channel-previews";

function Badge({ children, muted = false }: { children: ReactNode; muted?: boolean }) {
  return <span className={cn("pv-badge", muted && "pv-badge-muted")}>{children}</span>;
}

function Card({ title, icon, children, className }: { title: string; icon: ReactNode; children: ReactNode; className?: string }) {
  return <div className={cn("pv-card", className)}><div className="pv-card-title"><span aria-hidden="true">{icon}</span>{title}</div><div className="pv-card-body">{children}</div></div>;
}

function Wire() { return <div className="pv-wire" aria-hidden="true"><span /></div>; }

function Shell({ label, compact = false, children }: { label: string; compact?: boolean; children: ReactNode }) {
  return <div className={cn("platform-visual", compact && "pv-compact")} role="group" aria-label={label}>{children}</div>;
}

function Note({ children }: { children: ReactNode }) {
  return <div className="pv-note"><CheckCircleIcon aria-hidden="true" className="size-4 shrink-0" /><span>{children}</span></div>;
}

const auditChecks = [
  ["Your offer", "Understand the offer", "We review your offer and deal value to understand what a recovered opportunity is worth."],
  ["Sales process", "Map the path to a close", "We map qualification, booking, and handoffs around the way your team already sells."],
  ["Lead quality", "Find the warm opportunities", "We review lead sources, CRM history, and dormant segments before recommending a campaign."],
];

export function AuditVisual() {
  const [selected, setSelected] = useState(0);
  return <Shell compact label="Explore the feasibility audit">
    <Card title="Start with your CRM" icon={<DatabaseIcon />}>
      <div className="pv-segments"><span>No-shows</span><span>Not-nows</span><span>Never booked</span></div>
    </Card>
    <Wire />
    <div className="pv-audit-list" role="group" aria-label="Audit areas">
      {auditChecks.map(([label], index) => <button key={label} type="button" aria-pressed={selected === index} onClick={() => setSelected(index)}><FeasibilityIcon aria-hidden="true" /><span>{label}</span><span aria-hidden="true">↗</span></button>)}
    </div>
    <div className="pv-insight" aria-live="polite"><strong>{auditChecks[selected][1]}</strong><p>{auditChecks[selected][2]}</p></div>
  </Shell>;
}

export function SetupVisual() {
  return <Shell compact label="Campaign setup workflow">
    <div className="pv-build-list">
      {[
        { icon: DatabaseIcon, title: "Connect your stack", text: "CRM · calendar · team" },
        { icon: SetupIcon, title: "Build the campaign", text: "Segments · scripts · follow-ups" },
        { icon: ComplianceIcon, title: "Review the controls", text: "Qualification · timing · routing" },
      ].map(({ icon: Icon, title, text }, index) => <div className="pv-build-row" key={title}><span className="pv-node-icon"><Icon aria-hidden="true" /></span><div><strong>{title}</strong><p>{text}</p></div><span className="pv-step-number">0{index + 1}</span></div>)}
    </div>
    <Wire />
    <div className="pv-launch"><LogoMark className="h-6" /><div><strong>Ready for launch</strong><p>Built around your business.</p></div><CheckCircleIcon aria-hidden="true" className="size-5" /></div>
  </Shell>;
}

export function OptimizationVisual() {
  const [variant, setVariant] = useState(0);
  return <Shell compact label="Explore how scripts are refined">
    <div className="pv-small-heading"><OptimizationIcon aria-hidden="true" /><span>One segment. Two approaches.</span></div>
    <div className="pv-switch" role="group" aria-label="Example script variants">{["A · Reopen", "B · Reschedule"].map((label, index) => <button type="button" key={label} aria-pressed={variant === index} onClick={() => setVariant(index)}>{label}</button>)}</div>
    <div className="pv-script-test" aria-live="polite"><span className="pv-caption">Example · missed appointment</span><p>{variant === 0 ? "Still interested in picking up where we left off?" : "Looks like we missed each other. Would another time work better?"}</p></div>
    <div className="pv-refine-loop"><span>Review replies</span><span aria-hidden="true">→</span><span>Refine script</span><span aria-hidden="true">→</span><span>Test again</span></div>
    <Note>Learn from replies. Refine the next conversation.</Note>
  </Shell>;
}

export function OperatorVisual() {
  return <Shell compact label="Your growth operator's ongoing work">
    <div className="pv-operator-header"><span className="pv-node-icon"><OperatorIcon aria-hidden="true" /></span><div><strong>Your growth operator</strong><p>Strategy through execution</p></div></div>
    <div className="pv-work-plan">
      {[ ["Listen", "Review replies and objections"], ["Decide", "Find the next campaign opportunity"], ["Build", "Refine scripts and segments"], ["Support", "Work with your team as you grow"] ].map(([label, text]) => <div key={label}><span className="pv-plan-dot" aria-hidden="true" /><div><span className="pv-caption">{label}</span><p>{text}</p></div></div>)}
    </div>
    <Note>One expert who knows your offer and your pipeline.</Note>
  </Shell>;
}

const journey = [
  { label: "Engage", heading: "Reopen the conversation", message: "You were looking into the program a while back. Is that still on your radar?", reply: "Yes, I’m still interested.", status: "Conversation started", icon: EngageIcon },
  { label: "Qualify", heading: "Find out if there’s a fit", message: "What are you hoping to change, and when would you like to get started?", reply: "I want to grow my team this quarter.", status: "Goals and timing understood", icon: FeasibilityIcon },
  { label: "Book", heading: "Give your closer the context", message: "Let’s talk through the next step. Would Wednesday afternoon work?", reply: "Wednesday works. Send me the invite.", status: "Qualified call booked", icon: CheckCircleIcon },
];

export function EngageVisual() {
  const [stage, setStage] = useState(0);
  const current = journey[stage];
  return <Shell label="Explore a lead's journey from outreach to booking">
    <div className="pv-journey" role="group" aria-label="Lead journey stages">{journey.map(({ label, icon: Icon }, index) => <button key={label} type="button" aria-pressed={stage === index} onClick={() => setStage(index)}><Icon aria-hidden="true" /><span>{label}</span><span className="pv-step-number">0{index + 1}</span></button>)}</div>
    <div className="pv-wide-grid">
      <div className="pv-conversation" aria-live="polite"><span className="pv-caption">Example conversation</span><h5>{current.heading}</h5><div className="pv-bubble">{current.message}</div><div className="pv-bubble pv-bubble-reply">{current.reply}</div><Badge>{current.status}</Badge></div>
      <Card title="Every lead gets an outcome" icon={<RoutingIcon />}><div className="pv-outcome-list"><div className={stage === 2 ? "pv-outcome-active" : ""}><CheckCircleIcon aria-hidden="true" /><span><strong>Booked</strong><small>A qualified call for your team</small></span></div><div><FeasibilityIcon aria-hidden="true" /><span><strong>Unqualified</strong><small>Keep poor fits off the calendar</small></span></div><div><ComplianceIcon aria-hidden="true" /><span><strong>Opted out</strong><small>Respect their choice. Stop outreach.</small></span></div></div></Card>
    </div>
  </Shell>;
}

const channelExamples = [
  { label: "iMessage", icon: IMessageIcon, note: "Picks up the missed appointment", message: "We missed you on the last call. Want to find another time?", reply: "Yes. Could you send me the details first?" },
  { label: "WhatsApp", icon: WhatsAppIcon, note: "Carries the question from iMessage", message: "Of course. Here’s a quick overview of what we’ll cover.", reply: "That helps. Wednesday afternoon works." },
  { label: "Email", icon: MailIcon, note: "Remembers the time they chose", message: "Your Wednesday call is booked. Here are the details and calendar invite.", reply: "Got it, thank you." },
  { label: "SMS", icon: SmsIcon, note: "Knows the call is already booked", message: "A quick reminder about your call today. Looking forward to talking.", reply: "See you then." },
];

export function ChannelsVisual() {
  const [channel, setChannel] = useState(0);
  const current = channelExamples[channel];
  return <Shell label="Explore shared context across messaging channels">
    <div className="pv-wide-grid pv-context-grid">
      <Card title="Universal Context™" icon={<LogoMark className="h-5" />} className="pv-memory"><p className="pv-caption">The same lead, remembered</p><dl><div><dt>CRM history</dt><dd>Missed their previous call</dd></div><div><dt>Interest</dt><dd>Wants to understand the offer</dd></div><div><dt>Next step</dt><dd>{["Confirm interest and answer questions", "Find a time that works", "Wednesday call booked", "Call reminder delivered"][channel]}</dd></div></dl><Badge>Context travels with the conversation</Badge></Card>
      <div className="pv-channel-thread"><div className="pv-channel-picks" role="group" aria-label="Example conversation channels">{channelExamples.map(({ label, icon: Icon }, index) => <button type="button" key={label} data-channel={label} aria-pressed={channel === index} onClick={() => setChannel(index)}><Icon aria-hidden="true" /><span>{label}</span></button>)}</div><div aria-live="polite"><p className="pv-native-caption">Example conversation · Reclosed’s view</p>{channel === 0 || channel === 3 ? <AppleMessagePreview message={current.message} reply={current.reply} sms={channel === 3} /> : channel === 1 ? <WhatsAppPreview message={current.message} reply={current.reply} /> : <EmailPreview message={current.message} reply={current.reply} />}<p className="pv-native-note"><CheckCircleIcon aria-hidden="true" />{current.note}</p></div></div>
    </div>
  </Shell>;
}

const routes = [
  { label: "Ready to buy", quote: "The offer fits, and I’m ready to get started.", criterion: "Offer fit + readiness", destination: "Qualified sales call", detail: "Route to the right closer with conversation context.", tag: "Sales pipeline" },
  { label: "Smaller budget", quote: "I’m interested, but the full program is outside my budget.", criterion: "Fit + a different budget", destination: "Relevant lower-ticket offer", detail: "Offer a suitable downsell, with a path to ascend later.", tag: "Downsell pipeline" },
  { label: "Different needs", quote: "I need help with a different service.", criterion: "Service + team match", destination: "The right specialist", detail: "Route by your criteria to the team that handles that need.", tag: "Specialist team" },
];

export function RoutingVisual() {
  const [route, setRoute] = useState(0);
  const current = routes[route];
  return <Shell label="Explore example lead routing decisions">
    <div className="pv-switch pv-route-switch" role="group" aria-label="Example lead needs">{routes.map(({ label }, index) => <button key={label} type="button" aria-pressed={route === index} onClick={() => setRoute(index)}>{label}</button>)}</div>
    <div className="pv-routing-flow" aria-live="polite"><Card title="The lead replies" icon={<EngageIcon />}><p className="pv-quote">“{current.quote}”</p><span className="pv-caption">Example reply</span></Card><div className="pv-router"><div className="pv-router-wire" aria-hidden="true" /><span className="pv-node-icon"><LogoMark className="h-7" /></span><strong>{current.criterion}</strong><span className="pv-caption">Your qualification rules</span></div><Card title={current.destination} icon={<RoutingIcon />} className="pv-destination"><p>{current.detail}</p><Badge>{current.tag}</Badge></Card></div>
    <Note>Qualification and handoff follow your offer, your criteria, and your team.</Note>
  </Shell>;
}

const scripts = [
  { label: "No-show", reason: "Missed the appointment", intent: "Make it easy to reschedule", script: "Looks like we missed each other. Still want to find a time to talk?", followup: "Offer a new time, then qualify before booking." },
  { label: "Not now", reason: "Timing wasn’t right", intent: "Revisit the original reason", script: "You mentioned revisiting this later. Has the timing changed on your side?", followup: "Understand what changed and agree on the next step." },
  { label: "Never booked", reason: "Interested, but didn’t schedule", intent: "Remove the next obstacle", script: "Still exploring the program? Happy to help with any questions before a call.", followup: "Answer the question, confirm fit, and offer a call." },
];

export function ScriptsVisual() {
  const [segment, setSegment] = useState(0);
  const current = scripts[segment];
  return <Shell label="Explore scripts matched to dormant lead segments"><div className="pv-wide-grid pv-library">
    <div className="pv-library-index"><span className="pv-caption">Start with the lead’s situation</span><div role="group" aria-label="Example script segments">{scripts.map(({ label, reason }, index) => <button type="button" key={label} aria-pressed={segment === index} onClick={() => setSegment(index)}><span><strong>{label}</strong><small>{reason}</small></span><span aria-hidden="true">↗</span></button>)}</div></div>
    <Card title={current.intent} icon={<EngageIcon />} className="pv-script-card"><div aria-live="polite"><span className="pv-caption">Illustrative opening</span><p className="pv-script-copy">“{current.script}”</p><div className="pv-script-next"><span className="pv-caption">Then, follow the conversation</span><p>{current.followup}</p></div></div></Card>
  </div><Note>Script, cadence, and segment work together. The reply shapes what comes next.</Note></Shell>;
}

const sendExamples = [
  { label: "Within send window", state: "Ready for outreach", note: "The lead is within the configured local window. Sending can proceed after the other checks.", checks: [true, true, true], outcome: "Continue to outreach" },
  { label: "Outside send window", state: "Wait for the right time", note: "Keep the message queued until the lead’s local sending window opens.", checks: [true, false, true], outcome: "Queue for the local window" },
  { label: "Opted out", state: "Stop the conversation", note: "An opt-out takes priority. Suppress further outreach to this lead.", checks: [false, true, true], outcome: "Suppress further outreach" },
];

export function ComplianceVisual() {
  const [scenario, setScenario] = useState(0);
  const current = sendExamples[scenario];
  return <Shell label="Explore illustrative sending safeguards"><div className="pv-switch pv-compliance-switch" role="group" aria-label="Example sending conditions">{sendExamples.map(({ label }, index) => <button type="button" key={label} aria-pressed={scenario === index} onClick={() => setScenario(index)}>{label}</button>)}</div><div className="pv-wide-grid">
    <Card title="Before a message goes out" icon={<ComplianceIcon />}><div className="pv-checks">{["Opt-out status", "Local send window", "Timing & content rules"].map((label, index) => <div key={label}><span>{label}</span><Badge muted={!current.checks[index]}>{current.checks[index] ? "Clear" : index === 0 ? "Stop" : "Wait"}</Badge></div>)}</div><p className="pv-caption">Illustrative checks, based on configured rules</p></Card>
    <div className="pv-send-decision" aria-live="polite"><span className="pv-node-icon"><ComplianceIcon aria-hidden="true" /></span><h5>{current.state}</h5><p>{current.note}</p><Badge muted={scenario !== 0}>{current.outcome}</Badge></div>
  </div><div className="pv-health-strip"><span>Behind every campaign</span><strong>Number warmup</strong><strong>Rotation</strong><strong>Reply delays</strong></div></Shell>;
}
