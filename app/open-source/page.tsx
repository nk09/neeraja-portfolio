import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Open Source Picks | Neeraja Khanapure",
  description:
    "Monthly curated OSS projects and good-first-issues across SRE, infra, security, and data tooling. Opinionated, low-noise.",
};

interface OSSItem {
  repo: string;
  repoUrl: string;
  category: string;
  what: string;
  whyCare: string;
  issueTitle?: string;
  issueUrl?: string;
}

interface OSSMonth {
  month: string;
  items: OSSItem[];
  source: "github" | "static";
}

// ── Static seed data ──────────────────────────────────────────────────────
const SEED_MONTHS: OSSMonth[] = [
  {
    month: "2025-01",
    source: "static",
    items: [
      {
        repo: "kubernetes/kubernetes",
        repoUrl: "https://github.com/kubernetes/kubernetes",
        category: "Infra / Kubernetes",
        what: "The upstream Kubernetes repo, SIG-Node, SIG-Scheduling, and SIG-Autoscaling have active good-first-issues.",
        whyCare: "Contributing here teaches you how the scheduler and kubelet actually make decisions, invaluable for debugging production issues.",
      },
      {
        repo: "prometheus/prometheus",
        repoUrl: "https://github.com/prometheus/prometheus",
        category: "SRE / Observability",
        what: "The Prometheus time-series database. Active issues around native histogram migration and OTLP ingestion.",
        whyCare: "Understanding how Prometheus stores and queries data changes how you design dashboards and alerts.",
      },
      {
        repo: "grafana/grafana",
        repoUrl: "https://github.com/grafana/grafana",
        category: "SRE / Observability",
        what: "Grafana visualization platform. Good-first-issues around panel plugins and alerting UX.",
        whyCare: "The plugin architecture is well-documented. Good entry point into the Go + React codebase.",
      },
      {
        repo: "hashicorp/terraform",
        repoUrl: "https://github.com/hashicorp/terraform",
        category: "Infra / IaC",
        what: "Terraform core. Issues around provider development, state management edge cases, and CLI UX.",
        whyCare: "Reading the provider protocol and state handling code explains many real-world Terraform bugs.",
      },
      {
        repo: "open-telemetry/opentelemetry-collector",
        repoUrl: "https://github.com/open-telemetry/opentelemetry-collector",
        category: "SRE / Observability",
        what: "The OTel Collector, the pipeline between your instrumentation and your backend.",
        whyCare: "Active contributor community. Understanding the processor/exporter model helps you build better telemetry pipelines.",
      },
    ],
  },
  {
    month: "2024-12",
    source: "static",
    items: [
      {
        repo: "kubeflow/kubeflow",
        repoUrl: "https://github.com/kubeflow/kubeflow",
        category: "MLOps / AIOps",
        what: "ML platform on Kubernetes. Pipeline orchestration and model serving components.",
        whyCare: "Bridges SRE skills with ML platform work, growing demand for this intersection.",
      },
      {
        repo: "argoproj/argo-cd",
        repoUrl: "https://github.com/argoproj/argo-cd",
        category: "Infra / GitOps",
        what: "GitOps continuous delivery for Kubernetes. Application sync and health checking.",
        whyCare: "ArgoCD is production-dominant for GitOps. The app-of-apps pattern code is worth reading.",
      },
      {
        repo: "cert-manager/cert-manager",
        repoUrl: "https://github.com/cert-manager/cert-manager",
        category: "Security / Infra",
        what: "Certificate management for Kubernetes. ACME, vault, and private CA integrations.",
        whyCare: "Good-first-issues around controller logic. Certificate rotation is a real production pain, understanding this pays dividends.",
      },
    ],
  },
];

// ── GitHub Issues fetch ──────────────────────────────────────────────────
async function fetchGithubOSSPicks(): Promise<OSSMonth[]> {
  const token = process.env.GH_PAT || process.env.GITHUB_TOKEN || "";
  const repo = "nk09/neeraja-public-posts";

  try {
    const headers: HeadersInit = {
      Accept: "application/vnd.github+json",
      "X-GitHub-Api-Version": "2022-11-28",
    };
    if (token) headers["Authorization"] = `Bearer ${token}`;

    const res = await fetch(
      `https://api.github.com/repos/${repo}/issues?labels=open-source&state=closed&per_page=6`,
      { headers, next: { revalidate: 86400 } } // Cache 24h
    );

    if (!res.ok) return [];
    const issues = await res.json();
    if (!Array.isArray(issues) || issues.length === 0) return [];

    // Group by month
    const byMonth = new Map<string, OSSItem[]>();
    for (const issue of issues) {
      const month = issue.created_at.slice(0, 7);
      const items = parseOSSIssueBody(issue.body || "");
      if (!byMonth.has(month)) byMonth.set(month, []);
      byMonth.get(month)!.push(...items);
    }

    return Array.from(byMonth.entries()).map(([month, items]) => ({
      month,
      items,
      source: "github" as const,
    }));
  } catch {
    return [];
  }
}

function parseOSSIssueBody(body: string): OSSItem[] {
  // Parse open_source_picks.md format: ### N) [title](url)\nRepo: ...\nWhy: ...
  const items: OSSItem[] = [];
  const sections = body.split(/###\s+\d+\)/);
  for (const section of sections.slice(1)) {
    const lines = section.trim().split("\n").map((l) => l.trim()).filter(Boolean);
    const titleMatch = (lines[0] || "").match(/\[(.+?)\]\((.+?)\)/);
    const repoLine = lines.find((l) => l.startsWith("Repo:")) || "";
    const whyLine = lines.find((l) => l.startsWith("Why:")) || "";

    const repo = (repoLine.match(/Repo:\s*(.+)/) || [])[1]?.trim() || "unknown";
    const why = (whyLine.match(/Why:\s*(.+)/) || [])[1]?.trim() || "";

    if (repo !== "unknown") {
      items.push({
        repo,
        repoUrl: `https://github.com/${repo}`,
        category: "SRE / Infra",
        what: titleMatch?.[1] || repo,
        whyCare: why || "Good signal for production SRE teams.",
      });
    }
  }
  return items;
}

const CATEGORY_COLORS: Record<string, string> = {
  "Infra / Kubernetes": "cat-k8s",
  "SRE / Observability": "cat-obs",
  "Infra / IaC": "cat-iac",
  "MLOps / AIOps": "cat-ml",
  "Security / Infra": "cat-sec",
  "Infra / GitOps": "cat-gitops",
  "SRE / Infra": "cat-sre",
};

export default async function OpenSourcePage() {
  const githubMonths = await fetchGithubOSSPicks();
  const allMonths: OSSMonth[] = githubMonths.length > 0 ? githubMonths : SEED_MONTHS;
  const isLive = githubMonths.length > 0;

  return (
    <main>
      <div className="sw" style={{ maxWidth: "860px" }}>
        <div className="page-header">
          <h1 className="page-title">Open Source Picks</h1>
          <p className="page-sub">
            Monthly curated OSS projects worth tracking, SRE, infra, security, and data tooling.
            Opinionated, low-noise. Good-first-issues highlighted.
          </p>
          {!isLive && (
            <div className="seed-notice">
              Showing sample picks. Live monthly picks appear here once the{" "}
              <a href="https://github.com/nk09/neeraja-public-posts" target="_blank" rel="noopener noreferrer">
                open source workflow
              </a>{" "}
              runs on Saturdays.
            </div>
          )}
          {isLive && (
            <div className="live-notice">
              ✓ Live, updated monthly via the{" "}
              <a href="https://github.com/nk09/neeraja-public-posts" target="_blank" rel="noopener noreferrer">
                AI engagement agent
              </a>
              .
            </div>
          )}
        </div>

        <div className="oss-months">
          {allMonths.map((m) => (
            <div key={m.month} className="oss-month">
              <div className="week-header">
                <span className="week-label">{m.month}</span>
                <span className="week-slug">{m.items.length} picks</span>
              </div>
              <div className="oss-items">
                {m.items.map((item, i) => (
                  <div key={i} className="oss-item">
                    <div className="oss-item-top">
                      <a
                        href={item.repoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="oss-repo-link"
                      >
                        {item.repo} ↗
                      </a>
                      <span className={`oss-cat ${CATEGORY_COLORS[item.category] || "cat-sre"}`}>
                        {item.category}
                      </span>
                    </div>
                    <p className="oss-what">{item.what}</p>
                    <p className="oss-why">
                      <span className="pick-why-label">Why I care: </span>
                      {item.whyCare}
                    </p>
                    {item.issueTitle && item.issueUrl && (
                      <a href={item.issueUrl} target="_blank" rel="noopener noreferrer" className="oss-issue-link">
                        ↳ Good first issue: {item.issueTitle}
                      </a>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="engagement-footer">
          <p>
            Weekly SRE reads: <Link href="/engagement">Engagement Picks →</Link>
            {" · "}
            Fresh links: <Link href="/resources">Resources →</Link>
          </p>
        </div>
      </div>
    </main>
  );
}
