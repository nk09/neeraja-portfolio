import fs from "fs/promises";
import path from "path";
import Link from "next/link";
import NavBar from "../../components/NavBar";

function isMonthDir(name: string) {
  return /^\d{4}-\d{2}$/.test(name);
}

export const metadata = {
  title: "Open Source Picks | Neeraja Khanapure",
  description: "Monthly curated open source picks (SRE/Infra/Observability/Security).",
};

export default async function OpenSourceIndex() {
  const base = path.join(process.cwd(), "app", "open-source");
  const entries = await fs.readdir(base, { withFileTypes: true });
  const months = entries
    .filter((e) => e.isDirectory() && isMonthDir(e.name))
    .map((e) => e.name)
    .sort()
    .reverse();

  return (
    <main className="max-w-5xl mx-auto px-4 py-10">
      <NavBar />
      <h1 className="text-3xl sm:text-4xl font-extrabold mb-3">Open Source Picks</h1>
      <p className="text-slate-300 mb-8">
        Monthly curated OSS projects/issues worth tracking. Opinionated, low-noise.
      </p>

      <div className="grid gap-4">
        {months.map((m) => (
          <Link
            key={m}
            href={`/open-source/${m}`}
            className="rounded-2xl p-5 glass hover:opacity-95 transition"
          >
            <div className="text-slate-200 font-semibold">{m}</div>
            <div className="text-slate-400 text-sm mt-1">View monthly picks →</div>
          </Link>
        ))}

        {months.length === 0 && (
          <div className="rounded-2xl p-5 glass text-slate-300">
            No months published yet. Once the workflow opens a PR and it’s merged, months will appear here.
          </div>
        )}
      </div>
    </main>
  );
}