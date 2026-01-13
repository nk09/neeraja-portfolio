import React from "react";
import NavBar from "../../components/NavBar";
import Markdown from "../../components/Markdown";

export const metadata = {
  title: "Python Automation | Neeraja Khanapure",
  description: "Operational automation scripts, API tooling, and toil reduction.",
};

const markdown = `### Python automation (what I build)
- Ops tooling that removes manual work: validations, migrations, API sync jobs, report generation.
- Reliability-first scripting: retries, rate limits, structured logging, idempotency.
- Integrations: GitHub APIs, Grafana APIs, telemetry validation, CI/CD hooks.

### Why this matters
The difference between “DevOps” and “Senior DevOps” is **toil reduction**. Automate the boring, repeatable parts so humans can do judgment work.

### Links
- Evidence map: [https://neeraja-portfolio-09.vercel.app/evidence](https://neeraja-portfolio-09.vercel.app/evidence)`;

export default function Page() {
  return (
    <main>
      <NavBar />
      <section className="glass rounded-3xl p-8">
        <h1 className="text-3xl font-extrabold mb-4">Python Automation</h1>
        <Markdown markdown={markdown} />
      </section>
    </main>
  );
}
