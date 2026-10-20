import { Button } from "@/components/button";
import { CAL_URL } from "@/data/site";
import { ProblemDiagram, type ProblemScenario } from "@/components/problem/diagrams";
import "@/components/problem/story.css";

const problems: { id: ProblemScenario; title: string; body: string; takeaway: string }[] = [
  {
    id: "warm-pipeline",
    title: "Cold ads vs. warm pipeline",
    body: "Scaling ads brings in more people who don't know or trust you. Meanwhile, warm prospects sit untouched in your CRM, already partway to a buying decision.",
    takeaway: "Your next opportunity is already in the pipeline.",
  },
  {
    id: "zero-ad-spend",
    title: "Zero-ad-spend growth",
    body: "Templated email and SMS blasts under-engage the list you paid to build. Give your CRM the same strategic focus as your ads to unlock revenue without increasing ad spend.",
    takeaway: "Work the leads you have before buying more.",
  },
  {
    id: "rep-bottleneck",
    title: "The sales rep bottleneck",
    body: "Reps chase fresh leads while manual reactivation keeps adding repetitive work to their day. Older opportunities slip through, and the leads you already paid for get left behind.",
    takeaway: "Let your closers close. Let Reclosed work the list.",
  },
];

export function ProblemExplorer() {
  return (
    <div className="problem-stories">
      {problems.map((problem, index) => (
        <article key={problem.id} id={`problem-${problem.id}`} aria-labelledby={`problem-title-${problem.id}`} className="problem-story">
          <div className="problem-story-copy">
            <span className="problem-story-number" aria-hidden="true">0{index + 1}<span /></span>
            <h3 id={`problem-title-${problem.id}`}>{problem.title}</h3>
            <p className="problem-story-body">{problem.body}</p>
            <p className="problem-story-takeaway">{problem.takeaway}</p>
            <Button href={CAL_URL} external className="mt-6 inline-flex min-h-11 items-center gap-3">Book a call <span aria-hidden="true">↗</span></Button>
          </div>
          <ProblemDiagram scenario={problem.id} />
        </article>
      ))}
    </div>
  );
}
