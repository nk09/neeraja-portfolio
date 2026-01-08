import Link from "next/link";

type Props = {
  params: {
    slug: string;
  };
};

type DeepDive = {
  title: string;
  summary: string;
  whyItMatters: string[];
  architecture: string[];
  sharpEdges: string[];
  checklist: string[];
  commands: string[];
};

function titleFromSlug(slug: string): string {
  return slug
    .split("-")
    .filter(Boolean)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

const WORKFLOWS: Record<string, DeepDive> = {
  "terraform-dag": {
    title: "Terraform DAGs: parallelism first, safety second",
    summary:
      "A practical deep-dive on how Terraform's dependency graph behaves at scale — and how to avoid surprise destroy chains and apply-time blowups.",
    whyItMatters: [
      "At ~200+ resources, the graph gets wide. Review becomes about blast radius, not syntax.",
      "Implicit dependencies are great until a refactor changes ordering and you ship an unexpected recreate.",
      "Bad graphs create slow applies, fragile modules, and risky drift handling."
    ],
    architecture: [
      "Module boundaries: define clear inputs/outputs; avoid cross-module data reads that create hidden coupling.",
      "Promotion gates: policy checks (OPA/Conftest or Checkov) + human review on planned destroys.",
      "Execution strategy: separate state by blast radius (workspaces or separate stacks) and run applies in controlled stages."
    ],
    sharpEdges: [
      "`depends_on` is a last resort — it often signals a leaking abstraction.",
      "Graph fan-out hides risk: one small change can touch many resources.",
      "State and provider timeouts become part of reliability (long applies fail in the worst possible moment)."
    ],
    checklist: [
      "Before refactors: visualize the graph and identify fan-out hotspots.",
      "Require review on any destroy in plan; treat it like a production change.",
      "Split stacks by ownership and blast radius (per app/team/env).",
      "Add drift checks and guardrails before apply (policy + static analysis)."
    ],
    commands: [
      "terraform graph | dot -Tsvg > graph.svg",
      "terraform plan -out=tfplan && terraform show -json tfplan | jq '.resource_changes[] | {addr: .address, action: .change.actions}'",
      "checkov -d .  # or conftest test -p policy/ plan.json"
    ],

    snippets: [
      { label: "Visualize the dependency graph", code: `terraform graph | dot -Tsvg > graph.svg
open graph.svg` },
      { label: "List planned deletes (quick blast-radius check)", code: `terraform plan -out tfplan
terraform show -json tfplan | jq -r '.resource_changes[] | select(.change.actions|index("delete")) | .address'` },
      { label: "Tame provider throttling during apply", code: `terraform apply -parallelism=10
# tune based on AWS/GCP API throttling + module fan-out` },
    ],
  },

  "mlops-feedback-loop": {
    title: "MLOps Retraining Loop: safe automation with guardrails",
    summary:
      "A retraining loop is only valuable if it is reproducible, observable, and reversible. This page outlines a production-grade pattern.",
    whyItMatters: [
      "Offline gains can still degrade live KPIs due to skew and traffic shift.",
      "Without dataset/feature lineage, incident RCA becomes guesswork.",
      "Promotion without canary + rollback turns retraining into an outage generator."
    ],
    architecture: [
      "Data/versioning: DVC or LakeFS for dataset + feature snapshots tied to each model build.",
      "Orchestration: Kubeflow/Argo pipelines with explicit stages (extract → validate → train → eval → package).",
      "Registry: MLflow/SageMaker Registry controlling promotion (dev → staging → prod).",
      "Observability: drift + performance slices exported as metrics and alerted on trends."
    ],
    sharpEdges: [
      "Feature skew (training vs serving) is the silent killer — validate parity continuously.",
      "Don’t auto-promote purely on offline metrics; use shadow/canary evaluation.",
      "Rollback must be a first-class API (model version pin + fast config flip)."
    ],
    checklist: [
      "Every model build is tied to: code SHA, dataset version, feature schema version.",
      "Shadow traffic or canary evaluation exists before full rollout.",
      "Rollback path is tested (not documented).",
      "Monitoring includes drift + business KPI slices (tenant/region/version)."
    ],
    commands: [
      "dvc repro  # example: rebuild pipeline with versioned artifacts",
      "kubectl argo rollouts get rollout <name>  # progressive delivery for model service",
      "promql: histogram_quantile(0.95, sum by (le,version) (rate(http_request_duration_seconds_bucket[5m])))"
    ],

    snippets: [
      { label: "Example drift SLI pattern (PromQL style)", code: `# p95 prediction error over 30m (example)
histogram_quantile(0.95, sum(rate(prediction_error_bucket[30m])) by (le))` },
      { label: "Guardrail alert pattern (idea, adjust to your metrics)", code: `# breach for 15m
(predict_error_p95 > 0.20)
AND on() (count_over_time(predict_error_p95[15m]) > 0)` },
    ],
  },

  "resilient-architecture": {
    title: "Resilient Architecture: design for failure, not for uptime",
    summary:
      "A reliability workflow focused on isolating blast radius, controlling dependencies, and using SLIs/SLOs as rollout gates.",
    whyItMatters: [
      "Most outages are dependency cascades, not single-node failures.",
      "Reliability is cheaper when designed early (timeouts, retries, bulkheads).",
      "SLO gates prevent fast rollouts from turning into fast incidents."
    ],
    architecture: [
      "Bulkheads: isolate critical dependencies and apply concurrency limits.",
      "Timeouts and retries: bounded, jittered, and tuned per dependency.",
      "Load shedding: graceful degradation with explicit priorities.",
      "Progressive delivery: canary with SLO-based promotion and auto-rollback."
    ],
    sharpEdges: [
      "Unbounded retries amplify incidents (retry storms).",
      "Missing timeouts turn slow dependencies into full service failure.",
      "Alerting on symptoms without ownership labels creates noise and slows response."
    ],
    checklist: [
      "Each dependency has timeout + retry budget + circuit breaker behavior.",
      "Critical paths have SLOs and error budgets.",
      "Canary rollout is gated by SLI deltas (canary vs baseline)."
    ],
    commands: [
      "promql: sum(rate(http_requests_total{status=~\"5..\"}[5m])) / sum(rate(http_requests_total[5m]))",
      "kubectl -n <ns> describe hpa <name>",
      "kubectl -n <ns> rollout status deploy/<name>"
    ],
  },
};

function genericDeepDive(slug: string): DeepDive {
  const title = titleFromSlug(slug);
  const keywords = slug.split("-").filter(Boolean);

  const isTerraform = keywords.includes("terraform");
  const isK8s = keywords.includes("kubernetes") || keywords.includes("k8s");
  const isObs = keywords.includes("prometheus") || keywords.includes("grafana") || keywords.includes("otel") || keywords.includes("opentelemetry");

  const summary = isTerraform
    ? "A workflow deep-dive focused on safe Infrastructure-as-Code changes: blast radius, drift, and promotion gates."
    : isK8s
    ? "A workflow deep-dive focused on safe Kubernetes change: rollout gates, autoscaling interplay, and rollback."
    : isObs
    ? "A workflow deep-dive focused on observability: SLIs/SLOs, label strategy, and alert quality."
    : "A workflow deep-dive with practical tradeoffs, failure modes, and production guardrails.";

  return {
    title,
    summary,
    whyItMatters: [
      "The value is not in the tool — it’s in making change safe, observable, and reversible.",
      "Most “mystery outages” come from missing gates (policy, rollout health, ownership labels).",
      "This page is a stable anchor for posts and future expansions."
    ],
    architecture: [
      "Define the change workflow end-to-end: inputs → validation → rollout → verification → rollback.",
      "Use a small set of SLIs as gates (error-rate, latency, saturation), not vanity metrics.",
      "Automate checks, but keep a human review step for high-risk changes."
    ],
    sharpEdges: [
      "Generic dashboards with no slicing hide impact; labels/dimensions matter.",
      "Auto-remediation without guardrails increases blast radius.",
      "If rollback isn’t rehearsed, it won’t work when needed."
    ],
    checklist: [
      "What’s the blast radius? (service, env, tenant, region)",
      "What are the promotion gates? (SLIs + window)",
      "What’s the rollback? (fast, tested, documented)",
      "What’s the post-change verification? (baseline vs canary deltas)"
    ],
    commands: [
      isTerraform ? "terraform plan -out=tfplan && terraform show tfplan" : "kubectl rollout status deploy/<name>",
      "promql: sum(rate(http_requests_total{status=~\"5..\"}[5m])) / sum(rate(http_requests_total[5m]))",
      "kubectl -n <ns> get events --sort-by=.metadata.creationTimestamp | tail -n 20"
    ],
  };
}

export default function WorkflowDeepDivePage({ params }: Props) {
  const slug = params.slug;
  const dd = WORKFLOWS[slug] || genericDeepDive(slug);
  const title = dd.title || titleFromSlug(slug);

  const repoUrl = "https://github.com/nk09/neeraja-public-posts";
  const searchUrl = `${repoUrl}/search?q=${encodeURIComponent(slug)}`;

  return (
    <main className="mx-auto max-w-3xl px-6 py-12">
      <div className="glass rounded-3xl p-8 sm:p-10">
        <p className="text-sm text-slate-300">Workflows</p>

        <h1 className="mt-2 text-3xl sm:text-4xl font-extrabold leading-tight">
          <span className="gradient-text">{title}</span>
        </h1>

        <p className="mt-4 text-slate-300">{dd.summary}</p>

        <div className="mt-8 space-y-6">
          <section className="rounded-2xl border border-white/10 bg-white/5 p-5">
            <h2 className="text-slate-200 font-semibold">Why this is worth your time</h2>
            <ul className="mt-3 list-disc pl-5 text-slate-300 space-y-1">
              {dd.whyItMatters.map((x) => (
                <li key={x}>{x}</li>
              ))}
            </ul>
          </section>

          <section className="rounded-2xl border border-white/10 bg-white/5 p-5">
            <h2 className="text-slate-200 font-semibold">Architecture pattern</h2>
            <ul className="mt-3 list-disc pl-5 text-slate-300 space-y-1">
              {dd.architecture.map((x) => (
                <li key={x}>{x}</li>
              ))}
            </ul>
          </section>

          <section className="rounded-2xl border border-white/10 bg-white/5 p-5">
            <h2 className="text-slate-200 font-semibold">Sharp edges</h2>
            <ul className="mt-3 list-disc pl-5 text-slate-300 space-y-1">
              {dd.sharpEdges.map((x) => (
                <li key={x}>{x}</li>
              ))}
            </ul>
          </section>

          <section className="rounded-2xl border border-white/10 bg-white/5 p-5">
            <h2 className="text-slate-200 font-semibold">Production checklist</h2>
            <ul className="mt-3 list-disc pl-5 text-slate-300 space-y-1">
              {dd.checklist.map((x) => (
                <li key={x}>{x}</li>
              ))}
            </ul>
          </section>

          <section className="rounded-2xl border border-white/10 bg-white/5 p-5">
            <h2 className="text-slate-200 font-semibold">Copy/paste snippets</h2>
            <div className="mt-3 space-y-3">
              {dd.commands.map((cmd) => (
                <pre
                  key={cmd}
                  className="whitespace-pre-wrap rounded-xl bg-black/40 border border-white/10 p-4 text-xs text-slate-200 font-mono"
                >
                  {cmd}
                </pre>
              ))}
            </div>
          </section>
        </div>

        <div className="mt-10 flex flex-wrap gap-3">
          <Link
            href="/"
            className="rounded-xl px-4 py-2 bg-white/10 border border-white/10 hover:bg-white/15 transition"
          >
            Back to Home
          </Link>
          <a
            href={repoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-xl px-4 py-2 bg-white/10 border border-white/10 hover:bg-white/15 transition"
          >
            See Posts Repo
          </a>
          <a
            href={searchUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-xl px-4 py-2 bg-white/10 border border-white/10 hover:bg-white/15 transition"
          >
            Search related posts
          </a>
        </div>

        <p className="mt-6 text-xs text-slate-400">
          Route: <span className="font-mono">/workflows/{slug}</span>
        </p>
      </div>
    </main>
  );
}
