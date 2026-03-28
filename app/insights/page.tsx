import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Insights | Neeraja Khanapure",
  description:
    "Engineering insights on CI/CD reliability, observability design, AIOps, and production platform patterns. Opinionated, production-first.",
};

const INSIGHTS = [
  {
    id: "cicd-reliability",
    label: "CI/CD",
    title: "CI/CD isn't speed. It's predictable change under load",
    insight:
      "Most pipelines fail not because tests are slow, but because rollout risk isn't modeled, blast radius, rollback, and observability gates are afterthoughts that only matter when something goes wrong.",
    deeperTake:
      "At scale, the fastest teams are the ones who can rollback in minutes and prove safety with metrics, not the ones who can click Deploy more often. Velocity is downstream of confidence. Confidence is downstream of observability gates and rehearsed rollback.",
    pitfalls: [
      "Treating \"all tests pass\" as \"safe to deploy\". Your test suite doesn't know about your production traffic patterns, cache state, or database connection pool saturation.",
      "Rollback is an untested code path. Teams practice deploying constantly; they practice rolling back maybe once a year. The one time you need it under pressure, the runbook is stale.",
    ],
    rule: "If you can't explain rollback + SLO gates in one slide, the pipeline is not production-ready.",
    refs: [
      { label: "Google SRE Book, Release Engineering", href: "https://sre.google/sre-book/release-engineering/" },
      { label: "DORA Metrics, DevOps Research", href: "https://dora.dev/" },
    ],
    tags: ["cicd", "reliability", "sre"],
    relatedPage: "/workflows",
    relatedLabel: "CI/CD workflow patterns →",
  },
  {
    id: "observability-labels",
    label: "Observability",
    title: "Observability is a label strategy problem disguised as a tooling problem",
    insight:
      "You can't debug what you can't slice. Most 'noisy dashboards' problems are really missing ownership labels, inconsistent dimensions, and no SLI intent, not a Prometheus or Grafana problem.",
    deeperTake:
      "Teams add more metrics and still can't answer: which customer segment is broken, or which rollout caused it. The cardinality is wrong in the places that matter. The fix isn't more tools. It's defining the question (SLI) and designing labels that let you isolate (service, env, version, tenant) without blowing up cardinality.",
    pitfalls: [
      "Importing a community dashboard with 200 panels and calling it 'observability', if you can't explain what each panel is answering during an incident, it's decoration.",
      "High-cardinality labels on the wrong dimensions, user_id as a Prometheus label is a cardinality bomb. tenant_tier or region is usually the right granularity.",
    ],
    rule: "Define SLIs first, then design labels that let you isolate the failure. Everything else is supporting context.",
    refs: [
      { label: "Google SRE Workbook, Implementing SLOs", href: "https://sre.google/workbook/implementing-slos/" },
      { label: "Prometheus Label Best Practices", href: "https://prometheus.io/docs/practices/naming/" },
    ],
    tags: ["observability", "prometheus", "sre"],
    relatedPage: "/sre-intel",
    relatedLabel: "Ask SRE Intel about SLO design →",
  },
  {
    id: "aiops-reasoning",
    label: "AIOps",
    title: "AIOps isn't auto-healing. It's faster, safer incident reasoning",
    insight:
      "AI is best at compressing signal: summarizing anomalies, correlating events across systems, and ranking likely causes. So humans can validate and decide quickly. Not so humans can step back entirely.",
    deeperTake:
      "If the model can't show evidence, metrics, logs, traces, behind a hypothesis, it becomes hallucination-as-a-service. The danger isn't that AI gets it wrong; it's that a confident wrong answer at 2am leads an on-call engineer down the wrong path for 45 minutes.",
    pitfalls: [
      "Auto-remediation without approval gates, AI identifies the fix, triggers the restart, nobody knows what happened. Until the \"fix\" made things worse.",
      "Trusting anomaly detection on raw metrics without context, a CPU spike looks identical whether it's a traffic surge, a runaway job, or an attack. The model needs the context humans have.",
    ],
    rule: "Use AI for hypothesis ranking + runbook retrieval; keep remediation behind explicit approvals and guardrails.",
    refs: [
      { label: "OpenTelemetry, Consistent Signal Collection", href: "https://opentelemetry.io/docs/" },
      { label: "Blameless Postmortem Templates", href: "https://sre.google/sre-book/postmortem-culture/" },
    ],
    tags: ["aiops", "observability", "sre"],
    relatedPage: "/sre-intel",
    relatedLabel: "Ask SRE Intel about AIOps patterns →",
  },
];

export default function InsightsPage() {
  return (
    <main>
      <div className="sw thinking-page">
        <div className="page-header">
          <h1 className="page-title">Insights</h1>
          <p className="page-sub">
            Opinionated takes on CI/CD reliability, observability design, and AIOps.
            Each piece covers the non-obvious angle, what goes wrong and why.
          </p>
        </div>

        <div className="thinking-toc">
          {INSIGHTS.map((ins) => (
            <a key={ins.id} href={`#${ins.id}`} className="toc-item">
              <span className="toc-num">{ins.label}</span>
              <span className="toc-title">{ins.title}</span>
            </a>
          ))}
        </div>

        <div className="thinking-pieces">
          {INSIGHTS.map((ins) => (
            <article key={ins.id} id={ins.id} className="thinking-piece">
              <div className="piece-header">
                <div className="piece-num-row">
                  <span className="piece-num">{ins.label}</span>
                  <div className="piece-tags">
                    {ins.tags.map((t) => <span key={t} className="tag">{t}</span>)}
                  </div>
                </div>
                <h2 className="piece-title">{ins.title}</h2>
              </div>

              <div className="piece-body">
                <p>{ins.insight}</p>
                <p>{ins.deeperTake}</p>

                <div className="insight-pitfalls">
                  <div className="insight-pitfalls-label">What I&apos;ve seen go wrong</div>
                  <ul>
                    {ins.pitfalls.map((p, i) => <li key={i}>{p}</li>)}
                  </ul>
                </div>
              </div>

              <blockquote className="piece-callout">{ins.rule}</blockquote>

              <div className="insight-refs">
                <div className="insight-refs-label">Further reading</div>
                {ins.refs.map((r) => (
                  <a key={r.href} href={r.href} target="_blank" rel="noopener noreferrer" className="insight-ref-link">
                    {r.label} ↗
                  </a>
                ))}
              </div>

              <div className="piece-related">
                <Link href={ins.relatedPage} className="piece-related-link">{ins.relatedLabel}</Link>
              </div>
            </article>
          ))}
        </div>

        <div className="thinking-footer">
          <p>Workflow patterns: <Link href="/workflows">Production Workflows →</Link></p>
          <p>Judgment pieces: <Link href="/thinking">How I Think →</Link></p>
          <p>Live Q&A: <Link href="/sre-intel">SRE Intel →</Link></p>
        </div>
      </div>
    </main>
  );
}
