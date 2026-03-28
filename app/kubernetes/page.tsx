import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Kubernetes | Neeraja Khanapure",
  description: "EKS and GKE in production. Autoscaling, upgrades, RBAC, canary deploys, and on-call ownership.",
};

export default function KubernetesPage() {
  return (
    <main>
      <div className="sw-narrow">
        <div className="skill-page-header">
          <div className="section-label">Skills</div>
          <h1 className="page-title">Kubernetes</h1>
          <p className="page-sub">EKS and GKE in production with real on-call ownership. Not just configuration — actual incident response, upgrades, and reliability work.</p>
        </div>

        <div className="skill-section">
          <h2 className="skill-section-title">What I have done</h2>
          <ul className="skill-list">
            <li>Operated EKS and GKE workloads with real on-call ownership. Rollouts, incidents, brownouts, and noisy alerts.</li>
            <li>Built safer delivery patterns: readiness gates, PDBs, canaries, and rollback playbooks.</li>
            <li>Designed for scale: HPA/VPA, Cluster Autoscaler, node group isolation (system vs workload), multi-AZ posture.</li>
            <li>Security and access: RBAC, IRSA, namespace boundaries, least-privilege service accounts, secrets strategy.</li>
          </ul>
        </div>

        <div className="skill-section">
          <h2 className="skill-section-title">What breaks in real life</h2>
          <div className="break-items">
            <div className="break-item">
              <div className="break-title">HPA thrashing</div>
              <div className="break-desc">Fix with sane requests/limits, cooldowns, and queue-aware metrics. Most thrashing comes from CPU requests that don't reflect real steady-state usage.</div>
            </div>
            <div className="break-item">
              <div className="break-title">Node pressure and evictions</div>
              <div className="break-desc">Right-size your workloads, set PDBs before you need them, separate noisy workloads, tune eviction thresholds.</div>
            </div>
            <div className="break-item">
              <div className="break-title">DNS and CNI weirdness</div>
              <div className="break-desc">Correlate CoreDNS latency, conntrack pressure, and CNI errors together. Keep runbooks. This class of issue is almost never obvious in isolation.</div>
            </div>
            <div className="break-item">
              <div className="break-title">Upgrade blast radius</div>
              <div className="break-desc">Staged upgrades, test add-ons first, gate critical workloads. Never upgrade control plane and node groups in the same window.</div>
            </div>
          </div>
        </div>

        <div className="skill-section">
          <h2 className="skill-section-title">Interview-ready examples</h2>
          <ul className="skill-list">
            <li>Safe deploys: readiness gates + canary + metric-gated rollback</li>
            <li>Reduce on-call noise: SLO-based paging + ownership routing</li>
            <li>Cluster upgrade: staged rollout with add-on testing and PDB verification</li>
            <li>Cost reduction: right-sizing via VPA recommendations + spot node groups</li>
          </ul>
        </div>

        <div className="skill-page-nav">
          <Link href="/evidence" className="piece-link">Skills map →</Link>
          <Link href="/sre-intel" className="piece-link">Ask SRE Intel →</Link>
          <Link href="/workflows" className="piece-link">K8s workflow patterns →</Link>
        </div>
      </div>
    </main>
  );
}
