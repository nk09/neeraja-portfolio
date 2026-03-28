import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terraform | Neeraja Khanapure",
  description: "Reusable modules, remote state, CI gating, drift detection, and guardrails. IaC with production discipline.",
};

export default function TerraformPage() {
  return (
    <main>
      <div className="sw-narrow">
        <div className="skill-page-header">
          <div className="section-label">Skills</div>
          <h1 className="page-title">Terraform</h1>
          <p className="page-sub">Reusable modules, remote state, CI/CD gating, and drift detection. Infrastructure as code that's actually maintainable at team scale.</p>
        </div>

        <div className="skill-section">
          <h2 className="skill-section-title">What I work on</h2>
          <ul className="skill-list">
            <li>Module design with minimal, well-chosen interfaces. A module with 40 variables is undocumented.</li>
            <li>Remote state with S3 + DynamoDB or GCS. Proper state boundaries by blast radius and ownership, not resource type.</li>
            <li>CI gating: plan on PR, apply on merge. Hard fail on unexpected destroys before they hit production.</li>
            <li>Drift detection via scheduled plans. Alert on non-empty plans so drift doesn't compound silently.</li>
            <li>Policy as code with tfsec, Checkov, or OPA/Conftest in CI pipelines.</li>
          </ul>
        </div>

        <div className="skill-section">
          <h2 className="skill-section-title">What breaks in real life</h2>
          <div className="break-items">
            <div className="break-item">
              <div className="break-title">Surprise destroys on refactor</div>
              <div class="break-desc">Implicit dependencies hide ordering until you rename something. Gate applies with a human review on any planned destroy.</div>
            </div>
            <div className="break-item">
              <div className="break-title">Monolithic state</div>
              <div className="break-desc">One state for an entire environment means a bad apply can touch everything at once. Split by lifecycle, ownership, and blast radius.</div>
            </div>
            <div className="break-item">
              <div className="break-title">Over-abstracted modules</div>
              <div className="break-desc">Adding variables to things that never change makes modules harder to use, not easier. Hardcoded values are honest when the value never varies.</div>
            </div>
            <div className="break-item">
              <div className="break-title">Circular dependencies</div>
              <div className="break-desc">Splitting state by resource type (all S3 in one state, all IAM in another) creates phantom coupling. Split by team ownership instead.</div>
            </div>
          </div>
        </div>

        <div className="skill-section">
          <h2 className="skill-section-title">Patterns I reach for</h2>
          <ul className="skill-list">
            <li>Run <code>terraform graph | dot -Tsvg</code> before big refactors to catch fan-out and cycles early</li>
            <li>Gate destroys: <code>terraform show -json tfplan | jq</code> to catch unintended deletes before apply</li>
            <li>tfsec and Checkov in CI with hard-fail on HIGH severity findings</li>
            <li>Workspace patterns for multi-environment with shared modules</li>
          </ul>
        </div>

        <div className="skill-page-nav">
          <Link href="/evidence" className="piece-link">Skills map →</Link>
          <Link href="/sre-intel" className="piece-link">Ask SRE Intel →</Link>
          <Link href="/thinking#piece-02" className="piece-link">Why variables aren't always best practice →</Link>
        </div>
      </div>
    </main>
  );
}
