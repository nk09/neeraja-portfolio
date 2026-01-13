import React from "react";
import NavBar from "../../components/NavBar";
import Markdown from "../../components/Markdown";

export const metadata = {
  title: "Terraform & IaC | Neeraja Khanapure",
  description: "Terraform modules, state hygiene, CI gating, and guardrails.",
};

const markdown = `### Terraform approach (how I keep it production-safe)
- **Modules-first**: small modules with clear interfaces, versioned releases, minimal side-effects.
- **State hygiene**: remote state + locking; avoid “one giant state” for blast-radius control.
- **CI gating**: fmt/validate/plan on PRs; apply only with approvals and protected branches.
- **Guardrails**: least privilege IAM, drift detection, tagging standards.

### Real-world failure modes
- “Applied successfully but app is down” → infra != correctness; use health checks + progressive delivery.
- “State locked/corrupted” → strict backends + unlock procedures with audit trail.
- “Noisy plan diffs” → normalize inputs, stabilize modules, justify ignore_changes sparingly.

### Links
- Evidence map: [https://neeraja-portfolio-09.vercel.app/evidence](https://neeraja-portfolio-09.vercel.app/evidence)
- Automation tooling: [https://neeraja-portfolio-09.vercel.app/automation](https://neeraja-portfolio-09.vercel.app/automation)`;

export default function Page() {
  return (
    <main>
      <NavBar />
      <section className="glass rounded-3xl p-8">
        <h1 className="text-3xl font-extrabold mb-4">Terraform & IaC</h1>
        <Markdown markdown={markdown} />
      </section>
    </main>
  );
}
