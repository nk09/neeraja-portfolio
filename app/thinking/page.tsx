import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "How I Think | Neeraja Khanapure",
  description: "Short, opinionated pieces on SRE and platform engineering, dashboards, alerts, canary deploys, and Terraform.",
};

const PIECES = [
  {
    num: "01",
    title: "Why your dashboard isn't actually observability",
    tags: ["observability", "sre"],
    readTime: "3 min",
    intro: "A Grafana dashboard with 200 panels is not observability. It's a wall of charts. The difference matters when something breaks at 2am.",
    points: [
      "Dashboards are great for exploration, not for production decisions",
      "Production decisions need SLIs (what does 'broken' mean?) and SLOs (how broken is too broken?)",
      "Most dashboards I've inherited had no defined question, just metrics someone thought were interesting",
      "If your on-call team opens a dashboard during an incident and can't find the right panel in 30 seconds, the dashboard failed",
    ],
    keyTakeaway: "Define the question first. Build the dashboard second. If you can't name the person who owns the alert, the dashboard isn't production-ready.",
    callout: "Page on user impact. Ticket on symptoms. Route by owner.",
    related: ["/sre-intel", "/kubernetes"],
    relatedLabels: ["Ask SRE Intel about SLO design →", "Kubernetes reliability →"],
  },
  {
    num: "02",
    title: "Adding a Terraform variable isn't always the right move",
    tags: ["terraform", "iac"],
    readTime: "4 min",
    intro: "In every IaC review I've done, someone has added a variable to something that never changes. It feels like best practice. It isn't.",
    points: [
      "Variables exist for things that genuinely differ across environments or deployments",
      "A module with 40 variables is effectively undocumented, which ones actually matter?",
      "Hardcoded values aren't bad if the value never changes. They're honest",
      "Forced variables add noise, slow down plans, and create unexpected failures",
      "Modules with 3–5 well-chosen variables get reused far more than flexible-but-complex ones",
    ],
    keyTakeaway: "Before adding a variable, ask: in what two situations would this be different? If you can't answer, hardcode it.",
    callout: "If you can't name two scenarios where this value differs. It's not a variable.",
    related: ["/terraform", "/sre-intel"],
    relatedLabels: ["Terraform patterns →", "Ask SRE Intel →"],
  },
  {
    num: "03",
    title: "The problem isn't alerts. It's bad alerts",
    tags: ["observability", "on-call"],
    readTime: "4 min",
    intro: "There's a popular genre of engineering post: 'we deleted 90% of our alerts and everything got better'. That's missing the point.",
    points: [
      "Deleting bad alerts fixes the noise but doesn't fix why they were bad",
      "A good alert fires on something a user actually experiences, not a system metric",
      "Every alert needs: an owner, a runbook, and a reason it fires at this threshold",
      "SLO-based alerting (burn rates) is the right model. Page on budget consumption, not raw numbers",
      "8 high-quality owned alerts beat 200 'just in case' ones every time",
    ],
    keyTakeaway: "The goal is the right alerts, not fewer alerts. SLOs give you the framework to know which alerts actually matter.",
    callout: "An alert without an owner is a fire alarm in an empty building.",
    related: ["/sre-intel", "/engagement"],
    relatedLabels: ["Ask SRE Intel about alerting →", "Weekly SRE reads →"],
  },
  {
    num: "04",
    title: "Canary deploys break when your metrics are too broad",
    tags: ["kubernetes", "reliability"],
    readTime: "5 min",
    intro: "Canary deployments look solved. The tooling (Argo Rollouts, Flagger) works well. The failure is almost always in what you measure.",
    points: [
      "Aggregate error rate won't catch a broken rollout that only affects EU customers, one API path, or one tenant",
      "Your gate passes, you promote, and three hours later someone reports a 40% error rate on /checkout",
      "The fix is slicing. Add service + version + region labels and compare canary vs baseline at that level",
      "Canary windows that are too short miss things, cache warmup, scheduled jobs, traffic shift patterns",
      "When a canary fails, the most useful question is 'why didn't our gate catch this?', usually it's label gaps",
    ],
    keyTakeaway: "Gate on your SLO slice, not on pod health. A pod being Ready is a local signal. User impact is global.",
    callout: "Pods are Ready is not the same as users are happy.",
    related: ["/kubernetes", "/sre-intel"],
    relatedLabels: ["Kubernetes patterns →", "Ask SRE Intel →"],
  },
  {
    num: "05",
    title: "Terraform state boundaries are your blast radius boundaries",
    tags: ["terraform", "reliability"],
    readTime: "4 min",
    intro: "How you split Terraform state is one of those decisions that feels like a detail until something goes wrong. Then it's everything.",
    points: [
      "One monolithic state for an environment means a bad apply can touch everything, networking, app infra, IAM, at once",
      "Splitting by resource type (all S3 in one state, all IAM in another) creates phantom coupling and circular dependencies",
      "The right split: by lifecycle, ownership, and blast radius",
      "Networking is slow-changing and high-impact. Isolate it",
      "Per-service infra changes often and has limited blast radius. Give it its own state",
      "Shared platform resources (EKS cluster, RDS) sit in the middle, team ownership, moderate risk",
    ],
    keyTakeaway: "If a bad apply could take down more than one team's service, your state boundary is too wide.",
    callout: "State boundaries should match team ownership and blast radius, not resource types.",
    related: ["/terraform", "/sre-intel"],
    relatedLabels: ["Terraform deep dive →", "Ask SRE Intel →"],
  },
];

export default function ThinkingPage() {
  return (
    <main>
      <div className="sw-narrow">
        <div className="page-title">How I Think</div>
        <p className="page-sub">
          Short, opinionated pieces on SRE and platform engineering.
          These are the mental models I actually use, not theory, not docs summaries.
        </p>

        <div className="toc">
          {PIECES.map((p) => (
            <a key={p.num} href={`#piece-${p.num}`} className="toc-row">
              <span className="toc-num">{p.num}</span>
              <span className="toc-title">{p.title}</span>
              <span className="toc-time">{p.readTime}</span>
            </a>
          ))}
        </div>

        <div className="pieces-list">
          {PIECES.map((p, idx) => (
            <div key={p.num}>
              <article id={`piece-${p.num}`} className="piece">
                <div className="piece-header">
                  <div className="piece-meta">
                    <span className="piece-num">{p.num}</span>
                    <span className="piece-time">{p.readTime} read</span>
                    {p.tags.map((t) => <span key={t} className="piece-tag">{t}</span>)}
                  </div>
                  <h2 className="piece-title">{p.title}</h2>
                </div>

                <div className="piece-body">
                  <p>{p.intro}</p>
                </div>

                <div className="key-points">
                  <div className="key-points-label">Key points</div>
                  <ul>
                    {p.points.map((pt) => <li key={pt}>{pt}</li>)}
                  </ul>
                </div>

                {p.keyTakeaway && (
                  <div className="piece-body">
                    <p><strong>Bottom line:</strong> {p.keyTakeaway}</p>
                  </div>
                )}

                <blockquote className="callout">{p.callout}</blockquote>

                <div className="piece-links">
                  {p.related.map((href, i) => (
                    <Link key={href} href={href} className="piece-link">
                      {p.relatedLabels[i]}
                    </Link>
                  ))}
                </div>
              </article>
              {idx < PIECES.length - 1 && <div className="piece-divider" />}
            </div>
          ))}
        </div>

        <div className="page-footer">
          <p>More on this in <Link href="/engagement">Engagement Picks →</Link></p>
          <p>Have a question? <Link href="/sre-intel">Ask SRE Intel →</Link></p>
        </div>
      </div>
    </main>
  );
}
