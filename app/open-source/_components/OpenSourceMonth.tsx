import fs from "fs/promises";
import path from "path";
import Markdown from "../../../components/Markdown";

export default async function OpenSourceMonth({ monthSlug }: { monthSlug: string }) {
  const mdPath = path.join(process.cwd(), "app", "open-source", monthSlug, "content.md");
  const markdown = await fs.readFile(mdPath, "utf-8");
  return (
    <div className="rounded-3xl p-6 sm:p-10 glass">
      <Markdown markdown={markdown} />
    </div>
  );
}
