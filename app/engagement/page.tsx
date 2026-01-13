import fs from "fs/promises";
import path from "path";
import Link from "next/link";
import NavBar from "../../components/NavBar";

function isWeekDir(name: string) {
  return /^\d{4}-w\d{2}$/.test(name);
}

export const metadata = {
  title: "Engagement Picks | Neeraja Khanapure",
  description: "Weekly curated engagement picks (DevOps/SRE/Observability).",
};

export default async function EngagementIndex() {
  const base = path.join(process.cwd(), "app", "engagement");
  const entries = await fs.readdir(base, { withFileTypes: true });
  const weeks = entries
    .filter((e) => e.isDirectory() && isWeekDir(e.name))
    .map((e) => e.name)
    .sort()
    .reverse();

  return (
    <main className="max-w-5xl mx-auto px-4 py-10">
      <NavBar />
      <h1 className="text-3xl sm:text-4xl font-extrabold mb-3">Engagement Picks</h1>
      <p className="text-slate-300 mb-8">
        Curated weekly reads with a short, opinionated “why I care”. This is the public archive.
      </p>

      <div className="grid gap-4">
        {weeks.map((w) => (
          <Link
            key={w}
            href={`/engagement/${w}`}
            className="rounded-2xl p-5 glass hover:opacity-95 transition"
          >
            <div className="text-slate-200 font-semibold">{w}</div>
            <div className="text-slate-400 text-sm mt-1">View weekly picks →</div>
          </Link>
        ))}

        {weeks.length === 0 && (
          <div className="rounded-2xl p-5 glass text-slate-300">
            No weeks published yet. Once the workflow opens a PR and it’s merged, weeks will appear here.
          </div>
        )}
      </div>
    </main>
  );
}