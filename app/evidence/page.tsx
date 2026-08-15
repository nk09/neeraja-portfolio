import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Skills → Evidence | Neeraja Khanapure",
  description: "A proof map linking skills to artifacts across the site.",
};

const EVIDENCE = [
  { skill: "Kubernetes", href: "/kubernetes", demonstrates: "Cluster reliability, rollouts, scaling, RBAC/IRSA" },
  { skill: "Terraform", href: "/terraform", demonstrates: "Modules, CI gating, state hygiene, guardrails" },
  { skill: "Kafka", href: "/kafka", demonstrates: "Lag/debugging playbooks, reliability patterns" },
  { skill: "Cloud", href: "/cloud", demonstrates: "HA design, security and cost controls" },
  { skill: "Python Automation", href: "/automation", demonstrates: "Toil reduction via scripts and API tooling" },
  { skill: "Observability", href: "/observability", demonstrates: "Prometheus/Grafana/OTel mental models" },
];

export default function EvidencePage() {
  return (
    <main>
      <div className="sw-narrow">
        <div className="page-title">Skills → Evidence</div>
        <p className="page-sub">
          I don't want this site to be a tool list. This page maps each skill to a proof artifact.
        </p>

        <div className="skill-section">
          <h2 className="skill-section-title">Proof map</h2>
          <table className="evidence-table">
            <thead>
              <tr>
                <th>Skill</th>
                <th>Proof on this site</th>
                <th>What it demonstrates</th>
              </tr>
            </thead>
            <tbody>
              {EVIDENCE.map((e) => (
                <tr key={e.skill}>
                  <td><strong>{e.skill}</strong></td>
                  <td><Link href={e.href}>{e.href}</Link></td>
                  <td>{e.demonstrates}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="skill-section">
          <h2 className="skill-section-title">Public visibility model</h2>
          <ul className="skill-list">
            <li>Engagement raw logs stay private (GitHub Issues), but weekly pages are public: <Link href="/engagement">/engagement</Link></li>
            <li>Open-source tracking stays clean and curated: <Link href="/open-source">/open-source</Link></li>
          </ul>
        </div>

        <div className="page-footer">
          <p>See how I think about these skills: <Link href="/thinking">Thinking →</Link></p>
          <p>Have a question? <Link href="/sre-intel">Ask SRE Intel →</Link></p>
        </div>
      </div>
    </main>
  );
}
