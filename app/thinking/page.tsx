import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "How I Think | Neeraja Khanapure",
  description:
    "Short engineering judgment pieces on SRE, platform engineering, and DevOps. Not tutorials — production tradeoffs.",
};

const PIECES = [
  {
    num: "01",
    title: "Dashboards lie unless you define the question first",
    tags: ["observability", "sre"],
    readTime: "3 min",
    body: [
      "Every dashboard I've inherited looked different on the surface but had the same problem: no one could tell me what question it was built to answer.",
      "Dashboards are exploration tools. They're great for that. But production decisions — paging, rollback, capacity — need something sharper: an SLI with a clear definition, an SLO with a burn rate attached, and ownership that's written down.",
      "The failure mode I see: team adds Grafana, imports the community Kubernetes dashboard (10,000 stars, beautiful panels), and treats it as \"observability\". Six months later, on-call doesn't know which panel to look at during an incident. Every spike triggers a Slack thread. Nobody knows what \"normal\" looks like.",
      "The fix isn't more panels. It's starting from the user journey: what does \"the service is broken\" actually mean for a real user? Translate that into one metric with a threshold you'd page on. Build everything else as supporting context for that signal.",
      "My rule: if you can't write the SLI definition in one sentence and name the person who owns the alert, the dashboard isn't ready for production.",
    ],
    callout: "Page on user-impact. Ticket on symptoms. Route by owner. Everything else is noise management.",
    related: ["/sre-intel", "/kubernetes"],
    relatedLabels: ["Ask SRE Intel about SLO design →", "Kubernetes reliability patterns →"],
  },
  {
    num: "02",
    title: "Variable-izing everything is not \"best practice\"",
    tags: ["terraform", "iac"],
    readTime: "4 min",
    body: [
      "This one comes up in every IaC review. Someone sees a hardcoded value and reflexively adds a variable. The code gets more flexible. It also gets harder to understand, slower to plan, and subtler to break.",
      "Terraform variables exist to handle genuine variation — things that differ between environments, regions, or deployment contexts. They're not a style preference. When you variable-ize something that never actually varies, you're paying abstraction cost with no return.",
      "The concrete problems: a module with 40 variables is effectively undocumented. Readers can't tell which variables matter at runtime vs. which are always \"that one default\". Required variables with no defaults cause plan failures in unexpected places. And when you need to trace what value actually got used in a production apply three weeks ago — good luck.",
      "The harder judgment is knowing when NOT to abstract. A VPC CIDR that's fixed per environment? Hardcode it in the environment's tfvars and call it done. A cluster name pattern? Maybe a local, not a variable. The module interface should reflect reality, not theoretical reuse.",
      "I've found that modules with tight, minimal interfaces (3–5 variables that actually vary) are reused 10x more than flexible-but-complex ones. People use what's easy to reason about.",
    ],
    callout: "If you can't name the two scenarios where this variable takes different values, it's not a variable — it's a hardcoded value in a trenchcoat.",
    related: ["/terraform", "/sre-intel"],
    relatedLabels: ["Terraform patterns deep dive →", "Ask SRE Intel about module design →"],
  },
  {
    num: "03",
    title: "\"Alerts are bad\" is lazy — bad alerts are bad",
    tags: ["observability", "on-call"],
    readTime: "4 min",
    body: [
      "There's a genre of engineering blog post that's essentially \"we deleted 90% of our alerts and everything got better\". These posts are popular. They're also missing the point.",
      "The problem was never alerting — it was alerting without ownership, alerting on symptoms without context, and alerting on thresholds set by someone who left two years ago. Deleting the alerts fixed the noise, but it didn't fix the underlying problem: nobody was accountable for what the alert was protecting against.",
      "A well-designed alert has four properties: it fires on something a user experiences (not a system metric), it points to a runbook with a decision tree, it has an owner who gets paged and can actually do something, and it has a burn rate so you know how urgent it is.",
      "The SLO-based alerting model (burn rates + multi-window alerts) gets this right. A 2% error rate alert at 3am is noise if your SLO is 99%. But a 15x burn rate on your 30-day error budget is a different conversation — that's real signal that warrants waking someone up.",
      "I'd rather have 8 high-quality, owned alerts than 200 \"just in case\" ones. But the answer to 200 bad alerts isn't zero alerts — it's an alert review, a defined SLO, and someone's name on the runbook.",
    ],
    callout: "An alert without a runbook is a question without an answer. An alert without an owner is a fire alarm in an empty building.",
    related: ["/sre-intel", "/engagement"],
    relatedLabels: ["Ask SRE Intel about alert design →", "Weekly SRE reads →"],
  },
  {
    num: "04",
    title: "Canary deploys fail when your metrics are too coarse",
    tags: ["kubernetes", "reliability", "deployments"],
    readTime: "5 min",
    body: [
      "Canary deployments are one of those practices that looks solved in the docs and turns out to be subtle in production. The tooling (Argo Rollouts, Flagger) is good. The failure mode is almost always in the metrics you feed it.",
      "A canary gate that checks aggregate error rate will miss a broken rollout that only affects one customer segment, one region, or one API path. You ship the canary, the gate passes, you promote — and three hours later someone notices a 40% error rate on the /checkout endpoint for EU customers.",
      "The fix is thinking about slicing before you write the gate. Which dimensions actually matter? Service + environment is table stakes. Add version label, add the key tenant/region dimensions if your service is multi-tenant. The canary comparison needs to happen at the slice level, not the aggregate.",
      "The other failure mode: your canary baseline period is too short. Caches warm up. Background jobs fire on a schedule. Traffic patterns shift. A 5-minute canary window will miss things that a 20-minute window catches. The \"right\" duration depends on your p99 response time and your request rate, but I'd start at 10x your SLI measurement window.",
      "When a canary rollout fails, the most useful question isn't \"what broke\" — it's \"why didn't we see it coming\". Usually the answer is in the metric labels.",
    ],
    callout: "Promote on SLO slice, not on pod health. \"Pods are Ready\" is a local signal. User impact is global.",
    related: ["/kubernetes", "/sre-intel"],
    relatedLabels: ["Kubernetes patterns →", "Ask SRE Intel about canary setup →"],
  },
  {
    num: "05",
    title: "Terraform remote state is your blast radius boundary",
    tags: ["terraform", "iac", "reliability"],
    readTime: "4 min",
    body: [
      "How you split Terraform state is one of those decisions that feels like an implementation detail until it isn't. The wrong split will either give you a 45-minute apply that touches production networking while someone's trying to deploy an app, or it'll give you 60 state files with 600 outputs and a cross-reference graph that nobody can debug.",
      "The frame I use: state boundaries should match blast radius and ownership boundaries. If the networking team owns VPCs and the platform team owns clusters, those are different state files — not because of technical coupling, but because they have different on-call rotations, different change rates, and different risk tolerances.",
      "Common mistake: one monolithic state for an environment. This seems simple until you're waiting for a plan to finish (all 400 resources) before you can apply a one-line change to a security group rule. Or worse, a bad apply rolls back changes across completely unrelated services.",
      "Another mistake: splitting by resource type (all S3 buckets in one state, all IAM in another). This creates the phantom coupling problem — your app code depends on S3 ARNs that live in a different state, so now everything is a data source and a cross-reference and a potential circular dependency.",
      "Split by: lifecycle + ownership + blast radius. Networking is slow-changing and affects everything, so isolate it. Per-service infra changes frequently and has limited blast radius, so give it its own state. Shared platform resources (EKS cluster, RDS cluster) live in the middle — team ownership, moderate blast radius.",
    ],
    callout: "If a bad apply could take down more than one team's service, your state boundary is wrong.",
    related: ["/terraform", "/sre-intel"],
    relatedLabels: ["Terraform deep dive →", "Ask SRE Intel about state design →"],
  },
];

export default function ThinkingPage() {
  return (
    <main>
      <div className="sw thinking-page">
        <div className="page-header">
          <h1 className="page-title">How I Think</h1>
          <p className="page-sub">
            Short engineering judgment pieces — not tutorials. These are the mental models
            behind production decisions in SRE, platform engineering, and DevOps.
          </p>
          <div className="thinking-meta">
            <span>{PIECES.length} pieces</span>
            <span>·</span>
            <span>Kubernetes · Terraform · Observability · Reliability</span>
          </div>
        </div>

        <div className="thinking-toc">
          {PIECES.map((p) => (
            <a key={p.num} href={`#piece-${p.num}`} className="toc-item">
              <span className="toc-num">{p.num}</span>
              <span className="toc-title">{p.title}</span>
              <span className="toc-time">{p.readTime}</span>
            </a>
          ))}
        </div>

        <div className="thinking-pieces">
          {PIECES.map((p) => (
            <article key={p.num} id={`piece-${p.num}`} className="thinking-piece">
              <div className="piece-header">
                <div className="piece-num-row">
                  <span className="piece-num">{p.num}</span>
                  <span className="piece-time">{p.readTime} read</span>
                  <div className="piece-tags">
                    {p.tags.map((t) => <span key={t} className="tag">{t}</span>)}
                  </div>
                </div>
                <h2 className="piece-title">{p.title}</h2>
              </div>

              <div className="piece-body">
                {p.body.map((para, i) => (
                  <p key={i}>{para}</p>
                ))}
              </div>

              <blockquote className="piece-callout">
                {p.callout}
              </blockquote>

              <div className="piece-related">
                {p.related.map((href, i) => (
                  <Link key={href} href={href} className="piece-related-link">
                    {p.relatedLabels[i]}
                  </Link>
                ))}
              </div>
            </article>
          ))}
        </div>

        <div className="thinking-footer">
          <p>
            More commentary every week in{" "}
            <Link href="/engagement">Engagement Picks →</Link>
          </p>
          <p>
            Want to go deeper on any of these?{" "}
            <Link href="/sre-intel">Ask SRE Intel →</Link>
          </p>
        </div>
      </div>
    </main>
  );
}
