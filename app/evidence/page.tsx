import React from "react";
import NavBar from "../../components/NavBar";
import Markdown from "../../components/Markdown";

export const metadata = {
  title: "Skills → Evidence | Neeraja Khanapure",
  description: "A proof map linking skills to artifacts across the site.",
};

const markdown = `### Skills → Evidence (how to read this portfolio)
I don’t want this site to be a tool list. This page maps each skill to a proof artifact.

| Skill | Proof on this site | What it demonstrates |
|------|---------------------|---------------------|
| Kubernetes | [/kubernetes](/kubernetes) | Cluster reliability, rollouts, scaling, RBAC/IRSA |
| Terraform | [/terraform](/terraform) | Modules, CI gating, state hygiene, guardrails |
| Kafka | [/kafka](/kafka) | Lag/debugging playbooks, reliability patterns |
| Cloud | [/cloud](/cloud) | HA design, security and cost controls |
| Python Automation | [/automation](/automation) | Toil reduction via scripts and API tooling |
| Observability | [/engagement](/engagement) + dashboards | Prometheus/Grafana/OTel mental models |

### Public visibility model
- Engagement raw logs stay private (GitHub Issues), but weekly pages are public: [/engagement](/engagement)
- Open-source tracking stays clean and curated: [/open-source](/open-source)`;

export default function Page() {
  return (
    <main>
      <NavBar />
      <section className="glass rounded-3xl p-8">
        <h1 className="text-3xl font-extrabold mb-4">Skills → Evidence</h1>
        <Markdown markdown={markdown} />
      </section>
    </main>
  );
}
