import Link from "next/link";

// URL of the auto-generated topics.json in the public-posts repo.
// This file is updated automatically every Tuesday/Friday by GitHub Actions.
const TOPICS_URL = "/topics.json";

type WorkflowTopic = {
  title: string;
  summary: string;
  why: string[];
  rule: string;
  tools: string[];
  takeaway: string;
  diagram: string;
  tags: string[];
  type: string;
  slug: string;
};

type TopicsData = {
  workflows: Record<string, WorkflowTopic>;
  insights: Record<string, unknown>;
};

async function getWorkflow(slug: string): Promise<WorkflowTopic | null> {
  try {
    const res = await fetch(TOPICS_URL, {
      next: { revalidate: 3600 }, // re-fetch at most once per hour
    });
    if (!res.ok) return null;
    const data: TopicsData = await res.json();
    return data.workflows?.[slug] ?? null;
  } catch {
    return null;
  }
}

function titleFromSlug(slug: string): string {
  return slug
    .split("-")
    .filter(Boolean)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

export default async function WorkflowDeepDivePage({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = params;
  const topic = await getWorkflow(slug);
  const title = topic?.title ?? titleFromSlug(slug);
  const repoUrl = "https://github.com/nk09/neeraja-public-posts";
  const searchUrl = `${repoUrl}/search?q=${encodeURIComponent(slug)}`;

  if (!topic) {
    return (
      <main className="mx-auto max-w-3xl px-6 py-12">
        <div className="glass rounded-3xl p-8 sm:p-10">
          <p className="text-sm text-slate-300">Workflows</p>
          <h1 className="mt-2 text-3xl sm:text-4xl font-extrabold leading-tight">
            <span className="gradient-text">{title}</span>
          </h1>
          <p className="mt-4 text-slate-300">
            This workflow post is being added to the portfolio shortly. Check back in a few minutes,
            or find the original LinkedIn post below.
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            <Link href="/" className="rounded-xl px-4 py-2 bg-white/10 border border-white/10 hover:bg-white/15 transition">
              Back to Home
            </Link>
            <Link href="/workflows" className="rounded-xl px-4 py-2 bg-white/10 border border-white/10 hover:bg-white/15 transition">
              All Workflows
            </Link>
            <a href={searchUrl} target="_blank" rel="noopener noreferrer" className="rounded-xl px-4 py-2 bg-white/10 border border-white/10 hover:bg-white/15 transition">
              Find original post
            </a>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-3xl px-6 py-12">
      <div className="glass rounded-3xl p-8 sm:p-10">
        <p className="text-sm text-slate-300">Workflows</p>

        <h1 className="mt-2 text-3xl sm:text-4xl font-extrabold leading-tight">
          <span className="gradient-text">{title}</span>
        </h1>

        <p className="mt-4 text-slate-300">{topic.summary}</p>

        {topic.tags?.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-2">
            {topic.tags.map((tag) => (
              <span key={tag} className="text-xs rounded-full px-3 py-1 bg-white/10 border border-white/10 text-slate-300">
                #{tag}
              </span>
            ))}
          </div>
        )}

        <div className="mt-8 space-y-6">
          {/* Diagram */}
          {topic.diagram && (
            <section className="rounded-2xl border border-white/10 bg-white/5 p-5">
              <h2 className="text-slate-200 font-semibold">How it looks in practice</h2>
              <pre className="mt-3 whitespace-pre-wrap rounded-xl bg-black/40 border border-white/10 p-4 text-xs text-slate-200 font-mono leading-relaxed">
                {topic.diagram}
              </pre>
            </section>
          )}

          {/* Where it breaks */}
          <section className="rounded-2xl border border-white/10 bg-white/5 p-5">
            <h2 className="text-slate-200 font-semibold">Where it breaks</h2>
            <ul className="mt-3 list-disc pl-5 text-slate-300 space-y-2">
              {topic.why.map((x) => (
                <li key={x}>{x}</li>
              ))}
            </ul>
          </section>

          {/* The rule */}
          <section className="rounded-2xl border border-white/10 bg-white/5 p-5">
            <h2 className="text-slate-200 font-semibold">The rule</h2>
            <p className="mt-3 text-slate-300 font-medium">→ {topic.rule}</p>
          </section>

          {/* How to sanity-check */}
          <section className="rounded-2xl border border-white/10 bg-white/5 p-5">
            <h2 className="text-slate-200 font-semibold">How to sanity-check it</h2>
            <ul className="mt-3 list-disc pl-5 text-slate-300 space-y-2">
              {topic.tools.map((x) => (
                <li key={x}>{x}</li>
              ))}
            </ul>
          </section>

          {/* Takeaway */}
          {topic.takeaway && (
            <section className="rounded-2xl border border-white/10 bg-white/5 p-5">
              <h2 className="text-slate-200 font-semibold">The bigger picture</h2>
              <p className="mt-3 text-slate-300 italic">{topic.takeaway}</p>
            </section>
          )}
        </div>

        <div className="mt-10 flex flex-wrap gap-3">
          <Link href="/" className="rounded-xl px-4 py-2 bg-white/10 border border-white/10 hover:bg-white/15 transition">
            Back to Home
          </Link>
          <Link href="/workflows" className="rounded-xl px-4 py-2 bg-white/10 border border-white/10 hover:bg-white/15 transition">
            All Workflows
          </Link>
          <a href={searchUrl} target="_blank" rel="noopener noreferrer" className="rounded-xl px-4 py-2 bg-white/10 border border-white/10 hover:bg-white/15 transition">
            Related posts
          </a>
        </div>

        <p className="mt-6 text-xs text-slate-400">
          Route: <span className="font-mono">/workflows/{slug}</span>
        </p>
      </div>
    </main>
  );
}
