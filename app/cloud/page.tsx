import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Cloud | Neeraja Khanapure",
  description: "AWS, GCP, and Azure. HA architecture, multi-AZ design, cost optimization, security, and IAM controls.",
};

export default function CloudPage() {
  return (
    <main>
      <div className="sw-narrow">
        <div className="skill-page-header">
          <div className="section-label">Skills</div>
          <h1 className="page-title">Cloud</h1>
          <p className="page-sub">Real-world cloud decisions across AWS, GCP, and Azure. HA architecture, security posture, and cost discipline at production scale.</p>
        </div>

        <div className="skill-section">
          <h2 className="skill-section-title">What I work on</h2>
          <ul className="skill-list">
            <li>HA architecture: multi-AZ deployments, failover testing, and graceful degradation patterns.</li>
            <li>Network design: VPCs, private endpoints, NACLs vs security groups, and cross-account peering.</li>
            <li>IAM least-privilege: role boundaries, service account scoping, and credential rotation.</li>
            <li>Cost optimization: spot/preemptible instances, right-sizing, reserved capacity planning, and tagging strategies.</li>
            <li>Secrets management: Vault, AWS Secrets Manager, GCP Secret Manager — rotation and access patterns.</li>
          </ul>
        </div>

        <div className="skill-section">
          <h2 className="skill-section-title">Per-cloud strengths</h2>
          <div className="break-items">
            <div className="break-item">
              <div className="break-title">AWS</div>
              <div className="break-desc">EKS, EC2, RDS, S3, IAM, VPC, Route53, CloudWatch, ALB/NLB. EKS with IRSA for pod-level IAM, multi-AZ RDS with read replicas, and cost controls via Savings Plans.</div>
            </div>
            <div className="break-item">
              <div className="break-title">GCP</div>
              <div className="break-desc">GKE, GCS, Cloud SQL, Pub/Sub, Cloud Monitoring. GKE Autopilot for managed clusters, Workload Identity for pod IAM, and BigQuery for cost analysis.</div>
            </div>
            <div className="break-item">
              <div className="break-title">Azure</div>
              <div className="break-desc">AKS, Azure Monitor, Key Vault, and Azure AD integration. Managed identities for pod-level access and Azure Policy for compliance guardrails.</div>
            </div>
          </div>
        </div>

        <div className="skill-section">
          <h2 className="skill-section-title">Design decisions I think about</h2>
          <ul className="skill-list">
            <li>Multi-AZ vs single-AZ: cost vs resilience tradeoff depends on the SLO, not a blanket rule</li>
            <li>Managed vs self-managed: managed services reduce ops burden but add vendor lock-in risk</li>
            <li>Egress costs: often the hidden cost driver in multi-region architectures</li>
            <li>Security groups vs NACLs: stateful vs stateless — both have a place in defence-in-depth</li>
          </ul>
        </div>

        <div className="skill-page-nav">
          <Link href="/evidence" className="piece-link">Skills map →</Link>
          <Link href="/sre-intel" className="piece-link">Ask SRE Intel →</Link>
          <Link href="/kubernetes" className="piece-link">Kubernetes on cloud →</Link>
        </div>
      </div>
    </main>
  );
}
