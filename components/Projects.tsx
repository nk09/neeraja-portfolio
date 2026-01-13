import React from "react";
import Link from "next/link";

const projects = [
  {
    title: "Datadog → Prometheus/Grafana Migration",
    desc: "Large-scale dashboard/alert migration with validation and query mapping automation. Focus: correctness, performance, and low-noise alerting.",
    link: "/engagement",
  },
  {
    title: "Kubernetes Platform Operations (EKS/GKE)",
    desc: "Upgrade strategy, autoscaling, rollout safety, and day-2 operations playbooks that reduce MTTR and paging noise.",
    link: "/kubernetes",
  },
  {
    title: "Terraform Modules + Guardrails",
    desc: "Reusable IaC modules with safe state management, CI gating, and security/cost guardrails to reduce blast radius.",
    link: "/terraform",
  },
  {
    title: "Kafka Reliability Patterns",
    desc: "Consumer lag debugging, partitioning strategy, retries + DLQ patterns, and operational dashboards for streaming health.",
    link: "/kafka",
  },
  {
    title: "Python Automation for Toil Reduction",
    desc: "Operational scripts and API tooling for migrations, validations, and repeatable runbooks (idempotent, logged, safe).",
    link: "/automation",
  },
  {
    title: "Cloud Engineering (AWS/GCP/Azure)",
    desc: "HA design, networking, IAM least privilege, and practical cost controls for production-grade workloads.",
    link: "/cloud",
  },
];

export default function Projects() {
  return (
    <section className="mb-10">
      <h2 className="text-xl sm:text-2xl font-bold mb-4">Featured work</h2>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {projects.map((p) => (
          <Link key={p.title} href={p.link} className="glass rounded-2xl p-5 block hover:bg-white/15 transition">
            <h3 className="font-semibold">{p.title}</h3>
            <p className="text-sm text-slate-300 mt-2">{p.desc}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}
