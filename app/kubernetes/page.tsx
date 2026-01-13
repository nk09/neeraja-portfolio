import React from "react";
import NavBar from "../../components/NavBar";
import Markdown from "../../components/Markdown";

export const metadata = {
  title: "Kubernetes (EKS/GKE) | Neeraja Khanapure",
  description: "Production-grade Kubernetes patterns, reliability, and operations.",
};

const markdown = `### What I’ve done (production patterns)
- Operated **EKS/GKE** workloads with real on-call ownership: rollouts, incidents, brownouts, and noisy alerts.
- Built safer delivery patterns: **readiness gates**, **PDBs**, **canaries**, and rollback playbooks.
- Designed for scale: **HPA/VPA**, **Cluster Autoscaler**, node group isolation (system vs workload), multi-AZ posture.
- Security + access: **RBAC**, **IRSA**, namespace boundaries, least-privilege service accounts, secrets strategy.

### Things I care about (what breaks in real life)
- **HPA thrashing** → fix with sane requests/limits, cooldowns, and queue-aware metrics.
- **Node pressure / evictions** → right-size, set PDBs, separate noisy workloads, tune eviction thresholds.
- **DNS & CNI weirdness** → correlate CoreDNS latency, conntrack pressure, and CNI errors; keep runbooks.
- **Upgrade blast radius** → staged upgrades, test add-ons, and gate critical workloads.

### Artifacts (public)
- Engagement picks archive: [https://neeraja-portfolio-09.vercel.app/engagement](https://neeraja-portfolio-09.vercel.app/engagement)
- Evidence map (skills → proof): [https://neeraja-portfolio-09.vercel.app/evidence](https://neeraja-portfolio-09.vercel.app/evidence)

### Interview-ready examples
- Safe deploys: readiness + canary + rollback
- Reduce on-call noise: SLO-based paging + ownership routing`;

export default function Page() {
  return (
    <main>
      <NavBar />
      <section className="glass rounded-3xl p-8">
        <h1 className="text-3xl font-extrabold mb-4">Kubernetes (EKS/GKE)</h1>
        <Markdown markdown={markdown} />
      </section>
    </main>
  );
}
