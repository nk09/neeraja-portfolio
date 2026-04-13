import Link from "next/link";
import { getInsightBySlug, titleFromSlug } from "../../lib/topics";

export default async function InsightDeepDivePage({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = params;
  const topic = await getInsightBySlug(slug);
  const title = topic?.title ?? titleFromSlug(slug);
  const repoUrl = "https://github.com/nk09/neeraja-public-posts";
  const searchUrl = `${repoUrl}/search?q=${encodeURIComponent(slug)}`;

  if (!topic) {
    return (
      <main className="mx-auto max-w-3xl px-6 py-12">
        <div className="glass rounded-3xl p-8 sm:p-10">
          <p className="text-sm text-slate-300">Insights</p>
          <h1 className="mt-2 text-3xl font-extrabold leading-tight sm:text-4xl">
            <span className="gradient-text">{title}</span>
          </h1>
          <p className="mt-4 text-slate-300">
            This insight is being added to the portfolio shortly. Check back in a few minutes,
            or find the original LinkedIn post below.
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            <Link href="/" className="rounded-xl border border-white/10 bg-white/10 px-4 py-2 transition hover:bg-white/15">
              Back to Home
            </Link>
            <Link href="/insights" className="rounded-xl border border-white/10 bg-white/10 px-4 py-2 transition hover:bg-white/15">
              All Insights
            </Link>
            <a href={searchUrl} target="_blank" rel="noopener noreferrer" className="rounded-xl border border-white/10 bg-white/10 px-4 py-2 transition hover:bg-white/15">
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

        <h1 className="mt-2 text-3xl font-extrabold leading-tight sm:text-4xl">
          <span className="gradient-text">{title}</span>
        </h1>

        <p className="mt-4 text-slate-300">{topic.summary}</p>

        <div className="mt-8 space-y-6">
          {topic.diagram && (
            <section className="rounded-2xl border border-white/10 bg-white/5 p-5">
              <h2 className="font-semibold text-slate-200">The pattern</h2>
              <pre className="mt-3 whitespace-pre-wrap rounded-xl border border-white/10 bg-black/40 p-4 font-mono text-xs leading-relaxed text-slate-200">
                {topic.diagram}
              </pre>
            </section>
          )}

          <section className="rounded-2xl border border-white/10 bg-white/5 p-5">
            <h2 className="font-semibold text-slate-200">The insight</h2>
            <p className="mt-3 text-slate-300">{topic.insight}</p>
          </section>

          <section className="rounded-2xl border border-white/10 bg-white/5 p-5">
            <h2 className="font-semibold text-slate-200">The non-obvious part</h2>
            <p className="mt-3 text-slate-300">{topic.non_obvious}</p>
          </section>

          <section className="rounded-2xl border border-white/10 bg-white/5 p-5">
            <h2 className="font-semibold text-slate-200">My rule</h2>
            <p className="mt-3 font-medium text-slate-300">→ {topic.rule}</p>
          </section>

          {topic.refs?.length > 0 && (
            <section className="rounded-2xl border border-white/10 bg-white/5 p-5">
              <h2 className="font-semibold text-slate-200">Worth reading</h2>
              <ul className="mt-3 space-y-2">
                {topic.refs.map((ref) => (
                  <li key={ref} className="text-sm text-slate-300">▸ {ref}</li>
                ))}
              </ul>
            </section>
          )}
        </div>

        <div className="mt-10 flex flex-wrap gap-3">
          <Link href="/" className="rounded-xl border border-white/10 bg-white/10 px-4 py-2 transition hover:bg-white/15">
            Back to Home
          </Link>
          <Link href="/insights" className="rounded-xl border border-white/10 bg-white/10 px-4 py-2 transition hover:bg-white/15">
            All Insights
          </Link>
          <a href={searchUrl} target="_blank" rel="noopener noreferrer" className="rounded-xl border border-white/10 bg-white/10 px-4 py-2 transition hover:bg-white/15">
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
