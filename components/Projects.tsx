import React from "react";

const projects = [
  { title: "Observability LLM Assistant", desc: "AI agent that explains Grafana panels, suggests PromQL, and maps Datadog → Prometheus.", link: "#" },
  { title: "GitOps Platform Templates", desc: "Reusable Kubernetes app templates with Actions → Argo/Spinnaker promotion and auto rollbacks.", link: "#" },
  { title: "Telemetry Migration Toolkit", desc: "Dashboards/alerts migration automation with validation CLI and diff reports.", link: "#" },
];

export default function Projects() {
  return (
    <section className="mb-10">
      <h2 className="text-xl sm:text-2xl font-bold mb-4">Projects</h2>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {projects.map((p) => (
          <a key={p.title} href={p.link} className="glass rounded-2xl p-5 block hover:bg-white/15 transition">
            <h3 className="font-semibold">{p.title}</h3>
            <p className="text-sm text-slate-300 mt-2">{p.desc}</p>
          </a>
        ))}
      </div>
    </section>
  );
}
