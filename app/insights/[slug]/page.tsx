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

  return (
    <main className="mx-auto max-w-3xl px-6 py-12">
      <div className="glass rounded-3xl p-8 sm:p-10">
        <p className="text-sm text-slate-300">Insights</p>
        <h1 className="mt-2 text-3xl sm:text-4xl font-extrabold leading-tight">
          <span className="gradient-text">{title}</span>
        </h1>

        <p className="mt-4 text-slate-300">
          Deep-dive page for this insight. If you landed here from a post, this URL is stable and
          intentionally shareable.
        </p>

        <div className="mt-8 space-y-3 rounded-2xl border border-white/10 bg-white/5 p-5">
          <p className="text-slate-200 font-semibold">What you’ll typically find here</p>
          <ul className="list-disc pl-5 text-slate-300 space-y-1">
            <li>Context and problem framing</li>
            <li>Practical approach + tradeoffs</li>
            <li>Actionable checklist / next steps</li>
          </ul>
        </div>

        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href="/"
            className="rounded-xl px-4 py-2 bg-white/10 border border-white/10 hover:bg-white/15 transition"
          >
            Back to Home
          </Link>
          <a
            href={`https://github.com/nk09/neeraja-public-posts`}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-xl px-4 py-2 bg-white/10 border border-white/10 hover:bg-white/15 transition"
          >
            See Posts Repo
          </a>
        </div>

        <p className="mt-6 text-xs text-slate-400">
          Route: <span className="font-mono">/insights/{slug}</span>
        </p>
      </div>
    </main>
  );
}
