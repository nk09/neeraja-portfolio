import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Python Automation | Neeraja Khanapure",
  description: "Migration scripts, validation tooling, API automation, and toil reduction. Scripts that actually get used in production.",
};

export default function AutomationPage() {
  return (
    <main>
      <div className="sw-narrow">
        <div className="skill-page-header">
          <div className="section-label">Skills</div>
          <h1 className="page-title">Python Automation</h1>
          <p className="page-sub">Scripts and tooling that reduce repetitive ops work. Migration utilities, validation frameworks, and API tooling that teams actually use.</p>
        </div>

        <div className="skill-section">
          <h2 className="skill-section-title">What I build</h2>
          <ul className="skill-list">
            <li>Migration scripts: moving workloads between clusters, clouds, or regions with validation at each step.</li>
            <li>Validation tooling: pre and post-deploy checks that run automatically and produce clear pass/fail output.</li>
            <li>API wrappers for infra: Python clients over cloud APIs that encode operational runbooks as code.</li>
            <li>Toil automation: anything that a human does on a schedule and could be wrong gets scripted.</li>
            <li>Report generation: cost reports, SLO burn rate summaries, and on-call metrics from raw data sources.</li>
          </ul>
        </div>

        <div className="skill-section">
          <h2 className="skill-section-title">Patterns I always use</h2>
          <div className="break-items">
            <div className="break-item">
              <div className="break-title">Idempotency first</div>
              <div className="break-desc">Every script should be safe to run twice. Check state before acting, not after. This is the single biggest factor in whether ops scripts cause incidents.</div>
            </div>
            <div className="break-item">
              <div className="break-title">Dry-run mode</div>
              <div className="break-desc">Every script that mutates state gets a <code>--dry-run</code> flag that prints what it would do. Non-negotiable for anything that touches production.</div>
            </div>
            <div className="break-item">
              <div className="break-title">Retry with backoff</div>
              <div className="break-desc">Cloud API calls fail. Network calls fail. Wrap them in retry logic with exponential backoff and jitter. Don't let a transient error fail a 2-hour migration.</div>
            </div>
            <div className="break-item">
              <div className="break-title">Structured logging</div>
              <div className="break-desc">JSON logs with consistent fields. Scripts that run in CI or cron need logs you can query, not print statements you have to grep.</div>
            </div>
          </div>
        </div>

        <div className="skill-section">
          <h2 className="skill-section-title">Example projects</h2>
          <ul className="skill-list">
            <li>This portfolio's engagement automation: GitHub Actions workflows that curate SRE reads weekly</li>
            <li>Kubernetes namespace migration tooling with pre-flight checks and rollback</li>
            <li>Terraform drift detection CLI that integrates with Slack alerting</li>
            <li>SLO burn rate calculator from raw Prometheus data</li>
          </ul>
        </div>

        <div className="skill-page-nav">
          <Link href="/evidence" className="piece-link">Skills map →</Link>
          <Link href="/sre-intel" className="piece-link">Ask SRE Intel →</Link>
          <Link href="/engagement" className="piece-link">See the engagement automation →</Link>
        </div>
      </div>
    </main>
  );
}
