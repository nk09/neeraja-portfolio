import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Engagement Picks | Neeraja Khanapure",
  description:
    "Weekly curated SRE/DevOps/Platform engineering reads with opinionated commentary. High-signal, low-noise.",
};

// ── Types ──────────────────────────────────────────────────────────────────
interface PickItem {
  title: string;
  link: string;
  why: string;
}

interface EngagementWeek {
  weekOf: string;
  slug: string;
  items: PickItem[];
  source: "github" | "static";
}

// ── Static seed data (shown until GitHub Issues workflow populates real data) ──
const SEED_WEEKS: EngagementWeek[] = [
  {
    weekOf: "2025-01-06",
    slug: "2025-w02",
    source: "static",
    items: [
      {
        title: "Kubernetes 1.32: What Actually Matters for Operators",
        link: "https://kubernetes.io/blog/",
        why: "The in-place pod resize feature finally stabilizes. If you run HPA + VPA together you'll want to read the interaction notes carefully before upgrading.",
      },
      {
        title: "Grafana 11 Alert State History, How It Works Under the Hood",
        link: "https://grafana.com/blog/",
        why: "Alert state history now writes to a dedicated time-series store. This changes how you think about alert flap detection and long-term trend queries.",
      },
      {
        title: "Terraform Stacks: The Mental Model Shift You Need",
        link: "https://www.hashicorp.com/blog/",
        why: "Stacks aren't just 'workspaces with better DX'. The dependency graph changes how you structure cross-environment rollouts. Worth the 20-minute read.",
      },
      {
        title: "CNCF Survey 2024: Kubernetes Adoption in Production",
        link: "https://cncf.io/",
        why: "The multi-cluster adoption number jumped 12 points. The failure modes teams report (networking complexity, upgrade fear) match exactly what I see on the ground.",
      },
      {
        title: "AWS re:Invent 2024: The 5 EKS Announcements That Matter",
        link: "https://aws.amazon.com/blogs/architecture/",
        why: "EKS Auto Mode is the headline but the quiet win is improved IRSA with pod identity. Much cleaner permission scoping for multi-tenant clusters.",
      },
    ],
  },
  {
    weekOf: "2024-12-30",
    slug: "2024-w53",
    source: "static",
    items: [
      {
        title: "Prometheus Native Histograms: Migrating from Classic Buckets",
        link: "https://prometheus.io/blog/",
        why: "Native histograms reduce cardinality by 60–80% on high-label metrics. The migration path is non-trivial but the storage savings are real.",
      },
      {
        title: "How HashiCorp Vault Agent Injector Actually Works",
        link: "https://www.hashicorp.com/blog/",
        why: "The init container lifecycle and sidecar renewal loop are frequently misunderstood. This clears up why secrets go stale on long-running pods.",
      },
      {
        title: "Kafka 3.8: KRaft Is Now the Default, What Changes",
        link: "https://kafka.apache.org/",
        why: "ZooKeeper removal changes your ops runbook significantly. Broker discovery, partition reassignment, and rolling restart procedures all need updating.",
      },
    ],
  },
];

// ── GitHub Issues fetch (runs server-side at request time) ─────────────────
async function fetchGithubPicks(): Promise<EngagementWeek[]> {
  const token = process.env.GH_PAT || process.env.GITHUB_TOKEN || "";
  const repo = "nk09/neeraja-public-posts"; // The automation repo

  try {
    const headers: HeadersInit = {
      Accept: "application/vnd.github+json",
      "X-GitHub-Api-Version": "2022-11-28",
    };
    if (token) headers["Authorization"] = `Bearer ${token}`;

    const res = await fetch(
      `https://api.github.com/repos/${repo}/issues?labels=engagement,picks&state=closed&per_page=10`,
      { headers, next: { revalidate: 3600 } } // Cache 1h
    );

    if (!res.ok) return [];

    const issues = await res.json();
    if (!Array.isArray(issues) || issues.length === 0) return [];

    return issues.map((issue: { title: string; body: string; created_at: string }) => {
      const dateMatch = issue.created_at.slice(0, 10);
      const items = parseIssueBody(issue.body || "");
      return {
        weekOf: dateMatch,
        slug: toWeekSlug(dateMatch),
        items,
        source: "github" as const,
      };
    }).filter((w) => w.items.length > 0);
  } catch {
    return [];
  }
}

function toWeekSlug(date: string): string {
  const d = new Date(date);
  const year = d.getFullYear();
  const startOfYear = new Date(year, 0, 1);
  const week = Math.ceil(((d.getTime() - startOfYear.getTime()) / 86400000 + startOfYear.getDay() + 1) / 7);
  return `${year}-w${String(week).padStart(2, "0")}`;
}

function parseIssueBody(body: string): PickItem[] {
  // Parse markdown from engagement_issue.md template format:
  // ### N) Title\nSource: link\nSummary: ...\n**Suggested Repost**\n...
  const items: PickItem[] = [];
  const sections = body.split(/###\s+\d+\)/);
  for (const section of sections.slice(1)) {
    const lines = section.trim().split("\n").map((l) => l.trim()).filter(Boolean);
    const titleLine = lines[0] || "";
    const sourceLine = lines.find((l) => l.startsWith("Source:")) || "";
    const summaryLine = lines.find((l) => l.startsWith("Summary:")) || "";

    const title = titleLine.replace(/^\[/, "").replace(/\]\(.*\)$/, "").trim();
    const link = (sourceLine.match(/Source:\s*(.+)/) || [])[1]?.trim() || "#";
    const why = (summaryLine.match(/Summary:\s*(.+)/) || [])[1]?.trim() || "";

    if (title && link !== "#") {
      items.push({ title, link, why: why || "High-signal read for production SRE/DevOps teams." });
    }
  }
  return items;
}

// ── Page ───────────────────────────────────────────────────────────────────
export default async function EngagementPage() {
  const githubWeeks = await fetchGithubPicks();
  const allWeeks: EngagementWeek[] = githubWeeks.length > 0 ? githubWeeks : SEED_WEEKS;
  const isLive = githubWeeks.length > 0;

  return (
    <main>
      <div className="sw" style={{ maxWidth: "860px" }}>
        <div className="page-header">
          <h1 className="page-title">Engagement Picks</h1>
          <p className="page-sub">
            Curated weekly reads with a short, opinionated &ldquo;why I care&rdquo;.
            DevOps / SRE / MLOps / AIOps, high-signal, low-noise.
          </p>
          {!isLive && (
            <div className="seed-notice">
              Showing sample picks. Live weekly picks appear here once the{" "}
              <a href="https://github.com/nk09/neeraja-public-posts" target="_blank" rel="noopener noreferrer">
                engagement workflow
              </a>{" "}
              runs and PRs are merged.
            </div>
          )}
          {isLive && (
            <div className="live-notice">
              ✓ Live, updated weekly via the{" "}
              <a href="https://github.com/nk09/neeraja-public-posts" target="_blank" rel="noopener noreferrer">
                AI engagement agent
              </a>
              .
            </div>
          )}
        </div>

        <div className="engagement-list">
          {allWeeks.map((week) => (
            <div key={week.slug} className="engagement-week">
              <div className="week-header">
                <span className="week-label">Week of {week.weekOf}</span>
                <span className="week-slug">{week.slug}</span>
              </div>
              <div className="picks-list">
                {week.items.map((item, i) => (
                  <div key={i} className="pick-item">
                    <div className="pick-num">{String(i + 1).padStart(2, "0")}</div>
                    <div className="pick-content">
                      <a
                        href={item.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="pick-title"
                      >
                        {item.title} ↗
                      </a>
                      {item.why && (
                        <p className="pick-why">
                          <span className="pick-why-label">Why I care: </span>
                          {item.why}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="engagement-footer">
          <p>
            More commentary on{" "}
            <a href="https://dev.to" target="_blank" rel="noopener noreferrer">DEV.to</a>
            {" "}and{" "}
            <a href="https://medium.com" target="_blank" rel="noopener noreferrer">Medium</a>.
            OSS project tracking: <Link href="/open-source">Open Source Picks →</Link>
          </p>
        </div>
      </div>
    </main>
  );
}
