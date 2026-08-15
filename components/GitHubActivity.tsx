import Link from "next/link";

interface GitHubEvent {
  id: string;
  type: string;
  repo: { name: string };
  created_at: string;
  payload: any;
}

function formatEvent(event: GitHubEvent): { icon: string; text: string; url: string } | null {
  const repo = event.repo.name;
  const repoUrl = `https://github.com/${repo}`;

  switch (event.type) {
    case "PushEvent": {
      const count = event.payload?.commits?.length || 1;
      const msg = event.payload?.commits?.[0]?.message?.split("\n")[0] || "pushed code";
      return { icon: "→", text: `${msg}`, url: repoUrl };
    }
    case "PullRequestEvent": {
      const action = event.payload?.action || "opened";
      const title = event.payload?.pull_request?.title || "PR";
      return { icon: "↗", text: `${action} PR: ${title}`, url: event.payload?.pull_request?.html_url || repoUrl };
    }
    case "CreateEvent": {
      const ref = event.payload?.ref_type || "branch";
      return { icon: "+", text: `created ${ref} ${event.payload?.ref || ""}`.trim(), url: repoUrl };
    }
    case "IssuesEvent": {
      const title = event.payload?.issue?.title || "issue";
      return { icon: "●", text: `${event.payload?.action || "opened"}: ${title}`, url: event.payload?.issue?.html_url || repoUrl };
    }
    default:
      return null;
  }
}

function timeAgo(dateStr: string): string {
  const diff = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 60) return `${mins}m ago`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days < 7) return `${days}d ago`;
  return `${Math.floor(days / 7)}w ago`;
}

async function fetchActivity(): Promise<{ icon: string; text: string; url: string; time: string; repo: string }[]> {
  try {
    const token = process.env.GH_PAT || process.env.GITHUB_TOKEN || "";
    const headers: Record<string, string> = { "Accept": "application/vnd.github+json" };
    if (token) headers["Authorization"] = `Bearer ${token}`;

    const res = await fetch("https://api.github.com/users/nk09/events/public?per_page=30", {
      headers,
      next: { revalidate: 1800 }, // refresh every 30 min
    });

    if (!res.ok) return [];

    const events: GitHubEvent[] = await res.json();
    const items: { icon: string; text: string; url: string; time: string; repo: string }[] = [];

    for (const event of events) {
      if (items.length >= 5) break;
      const formatted = formatEvent(event);
      if (formatted) {
        items.push({
          ...formatted,
          time: timeAgo(event.created_at),
          repo: event.repo.name.replace("nk09/", ""),
        });
      }
    }

    return items;
  } catch {
    return [];
  }
}

export default async function GitHubActivity() {
  const items = await fetchActivity();

  if (items.length === 0) return null;

  return (
    <section>
      <div className="sw">
        <div style={{
          display: "flex",
          alignItems: "center",
          gap: "0.75rem",
          marginBottom: "1rem",
        }}>
          <div style={{
            width: 8,
            height: 8,
            borderRadius: "50%",
            background: "var(--peacock)",
            animation: "pulse 2s ease-in-out infinite",
          }} />
          <span style={{ fontSize: "0.8rem", fontWeight: 600, color: "var(--muted)", textTransform: "uppercase", letterSpacing: "0.05em" }}>
            Recent Activity
          </span>
        </div>
        <div style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "0.5rem",
        }}>
          {items.map((item, i) => (
            <a
              key={i}
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
                padding: "0.4rem 0.75rem",
                background: "var(--surface2)",
                border: "1px solid var(--border2)",
                borderRadius: "var(--r)",
                fontSize: "0.8rem",
                color: "var(--text2)",
                textDecoration: "none",
                transition: "border-color 0.2s",
              }}
            >
              <span style={{ color: "var(--terra)", fontWeight: 600, fontFamily: "monospace" }}>{item.icon}</span>
              <span style={{ maxWidth: 280, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{item.text}</span>
              <span style={{ color: "var(--muted)", fontSize: "0.75rem", flexShrink: 0 }}>{item.time}</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
