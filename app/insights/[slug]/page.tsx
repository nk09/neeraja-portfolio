import Link from "next/link";

type Props = {
  params: {
    slug: string;
  };
};

function titleFromSlug(slug: string): string {
  return slug
    .split("-")
    .filter(Boolean)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

export default function InsightDeepDivePage({ params }: Props) {
  const slug = params.slug;
  const title = titleFromSlug(slug);

  const repoUrl = "https://github.com/nk09/neeraja-public-posts";
  const searchUrl = `${repoUrl}/search?q=${encodeURIComponent(slug)}`;

  return (
    <main className="mx-auto max-w-3xl px-6 py-12">
      <div className="glass rounded-3xl p-8 sm:p-10">
        <p className="text-sm text-slate-300">Insights</p>

        <h1 className="mt-2 text-3xl sm:text-4xl font-extrabold leading-tight">
          <span className="gradient-text">{title}</span>
        </h1>

        <p className="mt-4 text-slate-300">
          A stable deep-link for this insight. This is meant to be useful even if you only have 2 minutes:
          what to watch, what fails, and what to do next.
        </p>

        <div className="mt-8 space-y-6">
          <section className="rounded-2xl border border-white/10 bg-white/5 p-5">
            <h2 className="text-slate-200 font-semibold">If you remember one thing</h2>
            <p className="mt-3 text-slate-300">
              Turn opinions into gates. If you can’t measure safety (SLIs) and roll back fast, your “best practice”
              is just a vibe.
            </p>
          </section>

          <section className="rounded-2xl border border-white/10 bg-white/5 p-5">
            <h2 className="text-slate-200 font-semibold">Quick checklist</h2>
            <ul className="mt-3 list-disc pl-5 text-slate-300 space-y-1">
              <li>What’s the blast radius of this change?</li>
              <li>What are the SLIs that prove it’s safe?</li>
              <li>What’s the rollback, and has it been rehearsed?</li>
              <li>What signal would tell you it’s getting worse?</li>
            </ul>
          </section>

          <section className="rounded-2xl border border-white/10 bg-white/5 p-5">
            <h2 className="text-slate-200 font-semibold">Copy/paste PromQL starter</h2>
            <pre className="mt-3 whitespace-pre-wrap rounded-xl bg-black/40 border border-white/10 p-4 text-xs text-slate-200 font-mono">
{`# Error-rate (5xx) as a fraction of all requests
sum(rate(http_requests_total{status=~"5.."}[5m])) / sum(rate(http_requests_total[5m]))`}
            </pre>
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
          Route: <span className="font-mono">/insights/{slug}</span>
        </p>
      </div>
    </main>
  );
}
