import Link from "next/link";

const TOPICS_URL = "/topics.json";

type InsightTopic = {
  title: string;
  summary: string;
  insight: string;
  non_obvious: string;
  rule: string;
  refs: string[];
  diagram: string;
  type: string;
  slug: string;
};

type TopicsData = {
  workflows: Record<string, unknown>;
  insights: Record<string, InsightTopic>;
};

async function getInsight(slug: string): Promise<InsightTopic | null> {
  try {
    const res = await fetch(TOPICS_URL, {
      next: { revalidate: 3600 },
    });
    if (!res.ok) return null;
    const data: TopicsData = await res.json();
    return data.insights?.[slug] ?? null;
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

export default async function InsightDeepDivePage({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = params;
  const topic = await getInsight(slug);
  const title = topic?.title ?? titleFromSlug(slug);
  const repoUrl = "https://github.com/nk09/neeraja-public-posts";
  const searchUrl = `${repoUrl}/search?q=${encodeURIComponent(slug)}`;

  if (!topic) {
    return (
      <main className="mx-auto max-w-3xl px-6 py-12">
        <div className="glass rounded-3xl p-8 sm:p-10">
          <p className="text-sm text-slate-300">Insights</p>
          <h1 className="mt-2 text-3xl sm:text-4xl font-extrabold leading-tight">
            <span className="gradient-text">{title}</span>
          </h1>
          <p className="mt-4 text-slate-300">
            This insight is being added to the portfolio shortly. Check back in a few minutes,
            or find the original LinkedIn post below.
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            <Link href="/" className="rounded-xl px-4 py-2 bg-white/10 border border-white/10 hover:bg-white/15 transition">
              Back to Home
            </Link>
            <Link href="/insights" className="rounded-xl px-4 py-2 bg-white/10 border border-white/10 hover:bg-white/15 transition">
              All Insights
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
        <p className="text-sm text-slate-300">Insights</p>

        <h1 className="mt-2 text-3xl sm:text-4xl font-extrabold leading-tight">
          <span className="gradient-text">{title}</span>
        </h1>

        <p className="mt-4 text-slate-300">{topic.summary}</p>

        <div className="mt-8 space-y-6">

          {/* Diagram */}
          {topic.diagram && (
            <section className="rounded-2xl border border-white/10 bg-white/5 p-5">
              <h2 className="text-slate-200 font-semibold">The pattern</h2>
              <pre className="mt-3 whitespace-pre-wrap rounded-xl bg-black/40 border border-white/10 p-4 text-xs text-slate-200 font-mono leading-relaxed">
                {topic.diagram}
              </pre>
            </section>
          )}

          {/* Full insight */}
          <section className="rounded-2xl border border-white/10 bg-white/5 p-5">
            <h2 className="text-slate-200 font-semibold">The insight</h2>
            <p className="mt-3 text-slate-300">{topic.insight}</p>
          </section>

          {/* Non-obvious */}
          <section className="rounded-2xl border border-white/10 bg-white/5 p-5">
            <h2 className="text-slate-200 font-semibold">The non-obvious part</h2>
            <p className="mt-3 text-slate-300">{topic.non_obvious}</p>
          </section>

          {/* Rule */}
          <section className="rounded-2xl border border-white/10 bg-white/5 p-5">
            <h2 className="text-slate-200 font-semibold">My rule</h2>
            <p className="mt-3 text-slate-300 font-medium">→ {topic.rule}</p>
          </section>

          {/* Refs */}
          {topic.refs?.length > 0 && (
            <section className="rounded-2xl border border-white/10 bg-white/5 p-5">
              <h2 className="text-slate-200 font-semibold">Worth reading</h2>
              <ul className="mt-3 space-y-2">
                {topic.refs.map((ref) => (
                  <li key={ref} className="text-slate-300 text-sm">▸ {ref}</li>
                ))}
              </ul>
            </section>
          )}
        </div>

        <div className="mt-10 flex flex-wrap gap-3">
          <Link href="/" className="rounded-xl px-4 py-2 bg-white/10 border border-white/10 hover:bg-white/15 transition">
            Back to Home
          </Link>
          <Link href="/insights" className="rounded-xl px-4 py-2 bg-white/10 border border-white/10 hover:bg-white/15 transition">
            All Insights
          </Link>
          <a href={searchUrl} target="_blank" rel="noopener noreferrer" className="rounded-xl px-4 py-2 bg-white/10 border border-white/10 hover:bg-white/15 transition">
            Related posts
          </a>
        </div>

        <p className="mt-6 text-xs text-slate-400">
          Route: <span className="font-mono">/insights/{slug}</span>
        </p>
      </div>
    </main>
  );
}
