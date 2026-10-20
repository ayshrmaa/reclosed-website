"use client";

import { useState } from "react";
import { Button } from "@/components/button";
import { Container } from "@/components/container";
import { LogoMark } from "@/components/logo";
import { FeatureLabel } from "@/components/feature-label";
import { CAL_URL } from "@/data/site";
import "./features.css";

const stages = [
  { name: "Reactivation started", status: "Added to audience", action: "Add", rule: "Outreach begins", message: "Reclosed starts the conversation. The lead joins the matching Meta custom audience, ready for your team’s retargeting campaign.", example: "Reinforce the conversation with customer stories and testimonials.", className: "added" },
  { name: "Lead qualified", status: "Kept in audience", action: "Keep", rule: "Allow time to close", message: "Interest is confirmed. Keep the lead in the audience for a window that matches your sales cycle, then remove them when that window ends.", example: "Keep relevant proof in front of the lead while your sales team follows up.", className: "retained" },
  { name: "Exit rule matched", status: "Removed from audience", action: "Remove", rule: "Stop at the right moment", message: "A status or tag matches your exit rule. Reclosed removes the lead from this audience, ending eligibility for campaigns targeting this audience.", example: "For example, exclude a closed customer from this reactivation audience.", className: "removed" },
] as const;

export function RetargetingSync() {
  const [stage, setStage] = useState(0);
  const [days, setDays] = useState(14);
  const current = stages[stage];

  return <Container id="retargeting-sync" className="retargeting-section border-x border-divide">
    <section aria-labelledby="retargeting-heading">
      <header className="retargeting-header">
        <FeatureLabel number="03" name="Reactivation Retargeting Sync" />
        <span className="feature-development">In development</span>
        <h2 id="retargeting-heading">The conversation moves.<br /><span>Your ad audiences move with it.</span></h2>
        <p>Connect what happens in Reclosed to who sees your team’s retargeting ads. Audience membership follows the lead’s status, keeping outreach and retargeting in step.</p>
      </header>

      <div className="retargeting-demo">
        <div className="retargeting-demo-heading"><span>From lead status to ad audience</span><span>Interactive example</span></div>
        <div className="retargeting-demo-layout">
          <div className="retargeting-stage-list" role="group" aria-label="Example lead stage">
            <p>Choose a moment in the journey</p>
            {stages.map((item, index) => <button type="button" key={item.name} aria-pressed={index === stage} onClick={() => setStage(index)}>
              <span className="retargeting-stage-number">0{index + 1}</span><span><strong>{item.name}</strong><small>{item.rule}</small></span><span className="retargeting-stage-arrow" aria-hidden="true">→</span>
            </button>)}
          </div>
          <div key={stage} className={`retargeting-canvas ${current.className}`}>
            <div className="retargeting-system"><span className="retargeting-system-logo"><LogoMark className="size-5" /></span><span><strong>Reclosed</strong><small>Reactivation status</small></span><span className="retargeting-system-tag">{current.name}</span></div>
            <div className="retargeting-connector" aria-hidden="true"><span>↓</span></div>
            <div className="retargeting-rule"><span className="retargeting-rule-icon" aria-hidden="true">↻</span><div><strong>Audience sync</strong><span>{stage === 1 ? `Retain for ${days} days` : stage === 0 ? "Start rule matched" : "Exit rule matched"}</span></div><span className="retargeting-action">{current.action}</span></div>
            <div className="retargeting-connector" aria-hidden="true"><span>↓</span></div>
            <div className="retargeting-audience" aria-live="polite" aria-atomic="true">
              <div className="retargeting-audience-heading"><span><strong>Meta custom audience</strong><small>Your ad account · Reactivation</small></span><span className="retargeting-audience-state">{current.status}</span></div>
              <div className="retargeting-lead"><span className="retargeting-avatar" aria-hidden="true">L</span><span>Example lead<small>{stage === 1 ? `Eligible for ${days} more days` : stage === 0 ? "Eligible for your retargeting campaign" : "No longer in this audience"}</small></span><span aria-hidden="true">{stage === 2 ? "−" : "✓"}</span></div>
            </div>
          </div>
        </div>
        <div className="retargeting-explanation">
          <div aria-live="polite" aria-atomic="true"><h3>{current.rule}</h3><p>{current.message}</p></div>
          {stage === 1 ? <div className="retargeting-window"><label htmlFor="retargeting-days">Example sales-cycle window <strong>{days} days</strong></label><input id="retargeting-days" type="range" min="1" max="30" value={days} onChange={(event) => setDays(Number(event.target.value))} /><span>Adjust to see how the audience rule changes.</span></div> : <p className="retargeting-example-note">{current.example}</p>}
        </div>
      </div>

      <div className="retargeting-ownership">
        <div><span className="feature-section-label">Reclosed handles</span><h3>The audience data.</h3><p>Connect your Meta account, map lead statuses to audience rules, and sync additions and removals as those statuses change.</p></div>
        <div><span className="feature-section-label">Your ad team handles</span><h3>The campaigns.</h3><p>Your media buyer controls the creative, campaigns, budgets, and bidding in your own ad account.</p></div>
      </div>
      <div className="retargeting-cta"><p>See how audience sync could fit your reactivation workflow.</p><Button href={CAL_URL} external>Book a call <span aria-hidden="true">↗</span></Button></div>
    </section>
  </Container>;
}
