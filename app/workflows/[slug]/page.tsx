import Link from "next/link";
import { getWorkflowBySlug, titleFromSlug } from "../../lib/topics";

export default async function WorkflowDeepDivePage({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = params;
  const topic = await getWorkflowBySlug(slug);
  const title = topic?.title ?? titleFromSlug(slug);
  const repoUrl = "https://github.com/nk09/neeraja-public-posts";
  const searchUrl = `${repoUrl}/search?q=${encodeURIComponent(slug)}`;

  if (!topic) {
    return (
      <main className="mx-auto max-w-3xl px-6 py-12">
        <div className="glass rounded-3xl p-8 sm:p-10">
          <p className="text-sm text-slate-300">Workflows</p>
          <h1 className="mt-2 text-3xl font-extrabold leading-tight sm:text-4xl">
            <span className="gradient-text">{title}</span>
          </h1>
          <p className="mt-4 text-slate-300">
            This workflow post is being added to the portfolio shortly. Check back in a few minutes,
            or find the original LinkedIn post below.
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            <Link href="/" className="rounded-xl border border-white/10 bg-white/10 px-4 py-2 transition hover:bg-white/15">
              Back to Home
            </Link>
            <Link href="/workflows" className="rounded-xl border border-white/10 bg-white/10 px-4 py-2 transition hover:bg-white/15">
              All Workflows
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
        <p className="text-sm text-slate-300">Workflows</p>

        <h1 className="mt-2 text-3xl font-extrabold leading-tight sm:text-4xl">
          <span className="gradient-text">{title}</span>
        </h1>

        <p className="mt-4 text-slate-300">{topic.summary}</p>

        {topic.tags?.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-2">
            {topic.tags.map((tag) => (
              <span key={tag} className="rounded-full border border-white/10 bg-white/10 px-3 py-1 text-xs text-slate-300">
                #{tag}
              </span>
            ))}
          </div>
        )}

        <div className="mt-8 space-y-6">
          {topic.diagram && (
            <section className="rounded-2xl border border-white/10 bg-white/5 p-5">
              <h2 className="font-semibold text-slate-200">How it looks in practice</h2>
              <pre className="mt-3 whitespace-pre-wrap rounded-xl border border-white/10 bg-black/40 p-4 font-mono text-xs leading-relaxed text-slate-200">
                {topic.diagram}
              </pre>
            </section>
          )}

          <section className="rounded-2xl border border-white/10 bg-white/5 p-5">
            <h2 className="font-semibold text-slate-200">Where it breaks</h2>
            <ul className="mt-3 list-disc space-y-2 pl-5 text-slate-300">
              {topic.why.map((x) => (
                <li key={x}>{x}</li>
              ))}
            </ul>
          </section>

          <section className="rounded-2xl border border-white/10 bg-white/5 p-5">
            <h2 className="font-semibold text-slate-200">The rule</h2>
            <p className="mt-3 font-medium text-slate-300">→ {topic.rule}</p>
          </section>

          <section className="rounded-2xl border border-white/10 bg-white/5 p-5">
            <h2 className="font-semibold text-slate-200">How to sanity-check it</h2>
            <ul className="mt-3 list-disc space-y-2 pl-5 text-slate-300">
              {topic.tools.map((x) => (
                <li key={x}>{x}</li>
              ))}
            </ul>
          </section>

          {topic.takeaway && (
            <section className="rounded-2xl border border-white/10 bg-white/5 p-5">
              <h2 className="font-semibold text-slate-200">The bigger picture</h2>
              <p className="mt-3 italic text-slate-300">{topic.takeaway}</p>
            </section>
          )}
        </div>

        <div className="mt-10 flex flex-wrap gap-3">
          <Link href="/" className="rounded-xl border border-white/10 bg-white/10 px-4 py-2 transition hover:bg-white/15">
            Back to Home
          </Link>
          <Link href="/workflows" className="rounded-xl border border-white/10 bg-white/10 px-4 py-2 transition hover:bg-white/15">
            All Workflows
          </Link>
          <a href={searchUrl} target="_blank" rel="noopener noreferrer" className="rounded-xl border border-white/10 bg-white/10 px-4 py-2 transition hover:bg-white/15">
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
