import React from "react";
import dynamic from "next/dynamic";
import NavBar from "../components/NavBar";
import Markdown from "../components/Markdown";
import Link from "next/link";

const ChatWidget = dynamic(() => import("../components/ChatWidget"), { ssr: false });

const proof = [
  { k: "Kubernetes", v: "EKS/GKE ops, upgrades, autoscaling, RBAC/IRSA" },
  { k: "Terraform", v: "Modules, remote state, CI gating, guardrails" },
  { k: "Kafka", v: "Consumer lag, partitions, DLQ, retries, safe rollouts" },
  { k: "Python", v: "Automation tooling for migration, validation, ops" },
  { k: "Observability", v: "Prometheus/Grafana/OTel, SLOs, alert hygiene" },
  { k: "Cloud", v: "AWS/GCP/Azure, HA design, security + cost controls" },
];

const about = `
### What I do
I build and operate production platforms where reliability is non-negotiable — Kubernetes, cloud infrastructure, CI/CD, streaming systems, telemetry, and automation.

### What you'll find here
- **Engagement Picks**: weekly curated engineering reads + commentary
- **Open Source Picks**: monthly OSS projects worth tracking (SRE/infra/security/data)
- **Evidence pages**: Kubernetes / Terraform / Kafka / Cloud / Automation with real-world patterns and artifacts
`;

export default function Page() {
  return (
    <main>
      <NavBar />

      <section className="mb-10">
        <div className="rounded-3xl p-8 sm:p-12 glass relative overflow-hidden">
          <div className="pointer-events-none absolute -top-24 -right-24 w-72 h-72 rounded-full blur-3xl bg-brand-gradient opacity-30" />
          <div className="pointer-events-none absolute -bottom-24 -left-24 w-72 h-72 rounded-full blur-3xl bg-brand-gradient opacity-20" />

          <h1 className="text-3xl sm:text-5xl font-extrabold leading-tight">
            <span className="gradient-text">Site Reliability • Platform Engineering • DevOps</span><br />
            <span className="text-slate-200">Kubernetes • Cloud • Terraform • Kafka • Python</span>
          </h1>

          <p className="mt-4 text-slate-300 max-w-3xl">
            I design, migrate, and operate production-grade platforms across AWS/GCP/Azure with a heavy focus on Kubernetes reliability,
            infrastructure automation, streaming systems, and high-signal observability.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/evidence" className="rounded-xl px-4 py-2 bg-white/10 border border-white/10 hover:bg-white/15 transition">
              Skills → Evidence
            </Link>
            <Link href="/kubernetes" className="rounded-xl px-4 py-2 border border-slate-600 text-slate-200 hover:bg-slate-800/40 transition">
              Kubernetes
            </Link>
            <Link href="/terraform" className="rounded-xl px-4 py-2 border border-slate-600 text-slate-200 hover:bg-slate-800/40 transition">
              Terraform
            </Link>
            <Link href="/kafka" className="rounded-xl px-4 py-2 border border-slate-600 text-slate-200 hover:bg-slate-800/40 transition">
              Kafka
            </Link>
            <a href="/resume.pdf" className="rounded-xl px-4 py-2 bg-indigo-600 hover:bg-indigo-500 transition">
              Resume
            </a>
          </div>
        </div>
      </section>

      <section className="mb-10">
        <div className="grid lg:grid-cols-2 gap-6">
          <div className="glass rounded-2xl p-6">
            <h2 className="text-xl sm:text-2xl font-bold mb-3">High-signal overview</h2>
            <Markdown markdown={about} />
          </div>

          <div className="glass rounded-2xl p-6">
            <h2 className="text-xl sm:text-2xl font-bold mb-3">Core strengths</h2>
            <div className="grid sm:grid-cols-2 gap-3">
              {proof.map((x) => (
                <div key={x.k} className="rounded-2xl p-4 bg-white/5 border border-white/10">
                  <div className="text-sm font-semibold text-slate-200">{x.k}</div>
                  <div className="text-sm text-slate-300 mt-1">{x.v}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mb-10">
        <div className="grid lg:grid-cols-2 gap-6">
          <Link href="/engagement" className="glass rounded-2xl p-6 block hover:bg-white/10 transition">
            <h2 className="text-xl font-bold">Engagement Picks</h2>
            <p className="text-slate-300 mt-2">Weekly curated picks with opinionated commentary. SEO-friendly long-term archive.</p>
            <p className="text-sm text-slate-400 mt-3">Go to /engagement →</p>
          </Link>

          <Link href="/open-source" className="glass rounded-2xl p-6 block hover:bg-white/10 transition">
            <h2 className="text-xl font-bold">Open Source Picks</h2>
            <p className="text-slate-300 mt-2">Monthly OSS tracking list across SRE, infra, security, and data tooling.</p>
            <p className="text-sm text-slate-400 mt-3">Go to /open-source →</p>
          </Link>
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-xl sm:text-2xl font-bold mb-4">Featured case studies</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <Link href="/kubernetes" className="glass rounded-2xl p-5 block hover:bg-white/10 transition">
            <h3 className="font-semibold">Kubernetes: operating EKS/GKE in prod</h3>
            <p className="text-sm text-slate-300 mt-2">Upgrades, autoscaling, runtime reliability, and safe rollouts.</p>
          </Link>
          <Link href="/terraform" className="glass rounded-2xl p-5 block hover:bg-white/10 transition">
            <h3 className="font-semibold">Terraform: modules + guardrails</h3>
            <p className="text-sm text-slate-300 mt-2">Remote state, CI gating, drift control, and least-privilege infra.</p>
          </Link>
          <Link href="/kafka" className="glass rounded-2xl p-5 block hover:bg-white/10 transition">
            <h3 className="font-semibold">Kafka: streaming reliability patterns</h3>
            <p className="text-sm text-slate-300 mt-2">Consumer lag, partitions, retries/DLQs, and debugging.</p>
          </Link>
          <Link href="/automation" className="glass rounded-2xl p-5 block hover:bg-white/10 transition">
            <h3 className="font-semibold">Python automation: reduce toil</h3>
            <p className="text-sm text-slate-300 mt-2">Operational scripts + APIs to automate repetitive reliability work.</p>
          </Link>
          <Link href="/cloud" className="glass rounded-2xl p-5 block hover:bg-white/10 transition">
            <h3 className="font-semibold">Cloud: HA + security + cost</h3>
            <p className="text-sm text-slate-300 mt-2">Real-world cloud decisions across AWS/GCP/Azure.</p>
          </Link>
          <Link href="/thinking" className="glass rounded-2xl p-5 block hover:bg-white/10 transition">
            <h3 className="font-semibold">How I think</h3>
            <p className="text-sm text-slate-300 mt-2">Short judgment pieces — not tutorials — about engineering tradeoffs.</p>
          </Link>
        </div>
      </section>

      <ChatWidget />
    </main>
  );
}
