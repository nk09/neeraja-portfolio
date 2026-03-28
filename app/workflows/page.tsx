import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Production Workflows | Neeraja Khanapure",
  description:
    "Real production workflow patterns — Terraform, Kubernetes rollouts, MLOps pipelines, CI/CD reliability. Failure modes, rules of thumb, and tools.",
};

const WORKFLOWS = [
  {
    id: "terraform-dag",
    label: "IaC",
    title: "Terraform DAGs aren't deterministic at scale — your abstractions are",
    hook: "Terraform's graph is great at parallelism, not safety. The sharp edges show up when the graph gets wide — mono-repos, shared modules, many resources in one state.",
    sections: [
      {
        heading: "What usually breaks",
        items: [
          "Implicit dependencies hide ordering until a refactor turns into a surprise destroy/create chain. A resource that \"should\" come after another doesn't have an explicit dep — works fine until you rename something.",
          "Fan-out graphs (100+ resources) explode apply time and make blast-radius review impossible. One bad change, 45-minute rollback.",
          "`depends_on` \"fixes\" symptoms, then quietly couples modules and kills reuse. It's the IaC equivalent of `// TODO: fix this properly`.",
        ],
      },
      {
        heading: "The rule",
        items: [
          "If a module needs `depends_on` to be safe, the module boundary is leaking — redesign the interface, don't paper over it.",
          "Separate state by blast radius and ownership (not resource type). Networking team's VPCs = different state from app team's ECS services.",
          "Gate applies with policy (OPA/Conftest or Checkov) + a required human review on any planned destroys.",
        ],
      },
      {
        heading: "Sanity checks I actually run",
        items: [
          "`terraform graph | dot -Tsvg > graph.svg` — inspect fan-out and cycles before big refactors. If it looks like a hairball, the abstractions need work.",
          "`terraform plan -out=tfplan && terraform show -json tfplan | jq '.resource_changes[] | select(.change.actions[] == \"delete\")'` — catch unintended destroys before apply.",
          "Run `tfsec` and `checkov` in CI with hard-fail on HIGH severity. Merge-blocked deploys are better than Monday morning incidents.",
        ],
      },
    ],
    tags: ["terraform", "iac", "platform"],
    related: "/terraform",
    relatedLabel: "Terraform evidence page →",
  },
  {
    id: "k8s-rollouts",
    label: "Kubernetes",
    title: "Kubernetes rollouts: promote on SLOs, not on \"pods are Ready\"",
    hook: "Readiness is a local signal. Production impact is global. Real rollouts need promotion gates that track user-facing health — not whether pods passed their health check.",
    sections: [
      {
        heading: "What usually breaks",
        items: [
          "A rollout can be 100% Ready while P95 latency and error-rate spike — bad cache warmup, noisy neighbor, DB connection exhaustion all happen after pods are healthy.",
          "HPA reacts slower than a fast rollout; you ship overload before autoscaling catches up. Especially painful with traffic spikes on Monday mornings.",
          "Canary gets 'stuck green' because metrics are too coarse (no labels/slices). You miss blast radius on a specific endpoint or tenant until it's too late.",
        ],
      },
      {
        heading: "The rule",
        items: [
          "Promote only when your canary holds the SLO slice you care about (error-rate + latency) for a fixed window. Auto-rollback if it doesn't.",
          "Set PodDisruptionBudgets before you care about them — they take 30 seconds and will save you from a bad node drain at 2am.",
          "Add `minReadySeconds` to Deployments. It's the cheapest canary you have — a pod that crashes 10 seconds after becoming Ready wouldn't have helped you.",
        ],
      },
      {
        heading: "Tools I reach for",
        items: [
          "Argo Rollouts or Flagger with Prometheus as the analysis provider. Define error-rate + P99 latency gates. Set `successCondition` tight enough to catch real regressions.",
          "Alert on canary vs baseline deltas (not absolute thresholds). If your canary's error rate is 3x the baseline's, that's a regression even if the absolute rate is \"low\".",
          "`kubectl rollout status --watch` is fine for local. In CI, wire the rollout analysis result to your pipeline so a failed canary blocks the next stage automatically.",
        ],
      },
    ],
    tags: ["kubernetes", "reliability", "deployments"],
    related: "/kubernetes",
    relatedLabel: "Kubernetes evidence page →",
  },
  {
    id: "mlops-feedback-loop",
    label: "MLOps",
    title: "End-to-end MLOps retraining loop: reliability is in the guardrails",
    hook: "Auto-retraining is easy to wire up in an afternoon. Making it safe in production is the hard part — data drift, silent label shifts, and rollback semantics all bite you later.",
    sections: [
      {
        heading: "What usually breaks",
        items: [
          "A 'better' offline model degrades live KPIs due to training-serving skew — the features at training time aren't the same as serving time, and nobody noticed until the A/B test showed a 12% conversion drop.",
          "Unversioned data and labels make incident RCA impossible. You can't reproduce what trained the model, so you can't explain why it got worse.",
          "Promotion without canary + rollback turns retraining into a weekly outage generator. 'Auto-healing' ML pipelines that auto-promote are the opposite of reliable.",
        ],
      },
      {
        heading: "The rule",
        items: [
          "No model ships without: dataset/version lineage, shadow/canary evaluation against the live baseline, and a one-click rollback path that's been tested.",
          "Define 'model is broken' in terms of the KPI it controls, not just offline accuracy. A model with 94% accuracy that's costing you money is a broken model.",
          "Treat model promotion like a Kubernetes rollout — staged, metric-gated, with automatic rollback on regression.",
        ],
      },
      {
        heading: "Tools that help",
        items: [
          "DVC or LakeFS for dataset versioning. MLflow or SageMaker Model Registry for model lineage. You want to answer 'what data trained this model' in under 2 minutes.",
          "Monitor drift + performance slices with Prometheus/Grafana. Alert on trend, not single spikes — a model degrading 0.5%/day will kill you slowly while all your point-in-time checks look fine.",
          "Shadow mode before canary — run the new model in parallel, log predictions, compare offline. Canary before full promotion — 5% traffic with a human watching the dashboard.",
        ],
      },
    ],
    tags: ["mlops", "aiops", "python", "automation"],
    related: "/automation",
    relatedLabel: "Python automation patterns →",
  },
  {
    id: "ci-cd-reliability",
    label: "CI/CD",
    title: "CI/CD isn't speed — it's predictable change under load",
    hook: "Most pipelines fail not because tests are slow, but because rollout risk isn't modeled — blast radius, rollback, and observability gates are afterthoughts.",
    sections: [
      {
        heading: "What usually breaks",
        items: [
          "Pipelines that test everything but gate nothing. Green CI is not 'safe to deploy'. You need to know what a bad deploy looks like in production and what you'll do in the first 5 minutes.",
          "Rollback is an afterthought. Teams practice deploying; nobody practices rolling back. Then the one time you need it, the runbook is 18 months stale and the artifact registry only keeps 2 versions.",
          "Observability gates don't exist. The deploy finishes, the pod is healthy, the pipeline goes green — and nobody's watching error rates or latency for the next 10 minutes.",
        ],
      },
      {
        heading: "The rule",
        items: [
          "If you can't explain rollback + SLO gates in one slide, the pipeline is not production-ready.",
          "Every deploy should have an automatic quality gate: a 5-10 minute window where the pipeline watches SLI metrics before declaring success.",
          "Keep N+2 artifact versions. One for current, one for rollback, one for 'oh no the rollback had a bug'.",
        ],
      },
      {
        heading: "What good looks like",
        items: [
          "Deploy → SLI watch window (automated) → promote or rollback. This is the atomic unit. Everything else is scaffolding.",
          "Test in prod with traffic control (feature flags, canaries), not just pre-prod environments that don't match production load.",
          "Track DORA metrics: deployment frequency, change failure rate, mean time to recovery. They tell you where your pipeline's weakest link is.",
        ],
      },
    ],
    tags: ["cicd", "reliability", "sre"],
    related: "/sre-intel",
    relatedLabel: "Ask SRE Intel about CI/CD patterns →",
  },
];

export default function WorkflowsPage() {
  return (
    <main>
      <div className="sw thinking-page">
        <div className="page-header">
          <h1 className="page-title">Production Workflows</h1>
          <p className="page-sub">
            Real workflow patterns — Terraform, Kubernetes rollouts, MLOps pipelines, CI/CD reliability.
            Failure modes, rules of thumb, and the tools I actually reach for.
          </p>
          <div className="thinking-meta">
            <span>{WORKFLOWS.length} workflows</span>
            <span>·</span>
            <span>Terraform · Kubernetes · MLOps · CI/CD</span>
          </div>
        </div>

        <div className="thinking-toc">
          {WORKFLOWS.map((w) => (
            <a key={w.id} href={`#${w.id}`} className="toc-item">
              <span className="toc-num">{w.label}</span>
              <span className="toc-title">{w.title}</span>
            </a>
          ))}
        </div>

        <div className="thinking-pieces">
          {WORKFLOWS.map((w) => (
            <article key={w.id} id={w.id} className="thinking-piece">
              <div className="piece-header">
                <div className="piece-num-row">
                  <span className="piece-num">{w.label}</span>
                  <div className="piece-tags">
                    {w.tags.map((t) => <span key={t} className="tag">{t}</span>)}
                  </div>
                </div>
                <h2 className="piece-title">{w.title}</h2>
              </div>

              <blockquote className="piece-callout" style={{ marginBottom: "1.75rem" }}>
                {w.hook}
              </blockquote>

              <div className="piece-body">
                {w.sections.map((s) => (
                  <div key={s.heading} className="workflow-section">
                    <h3 className="workflow-section-heading">{s.heading}</h3>
                    <ul className="workflow-list">
                      {s.items.map((item, i) => (
                        <li key={i}>{item}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>

              <div className="piece-related">
                <Link href={w.related} className="piece-related-link">
                  {w.relatedLabel}
                </Link>
                <Link href="/sre-intel" className="piece-related-link">
                  Ask SRE Intel →
                </Link>
              </div>
            </article>
          ))}
        </div>

        <div className="thinking-footer">
          <p>
            More judgment pieces:{" "}
            <Link href="/thinking">How I Think →</Link>
          </p>
          <p>
            Production Q&A:{" "}
            <Link href="/sre-intel">SRE Intel →</Link>
          </p>
        </div>
      </div>
    </main>
  );
}
