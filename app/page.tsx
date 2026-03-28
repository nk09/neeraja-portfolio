import Link from "next/link";
import ProfilePhoto from "../components/ProfilePhoto";

export const metadata = {
  title: "Neeraja Khanapure | SRE · Platform · DevOps",
  description:
    "Production-grade platforms on AWS/GCP/Azure. Deep dives on Kubernetes reliability, Terraform, Kafka, observability — and a live SRE knowledge assistant.",
};

const FEATURED_PIECES = [
  {
    section: "Thinking",
    title: "Dashboards lie unless you define the question first",
    teaser: "Teams add Grafana, import the 10,000-star Kubernetes dashboard, and call it observability. Six months later, nobody knows which panel to look at during an incident.",
    href: "/thinking#piece-01",
    tag: "observability",
  },
  {
    section: "Thinking",
    title: "\"Alerts are bad\" is lazy — bad alerts are bad",
    teaser: "The problem was never alerting. It was alerting without ownership, alerting on symptoms without context, and thresholds set by someone who left two years ago.",
    href: "/thinking#piece-03",
    tag: "on-call",
  },
  {
    section: "Workflows",
    title: "Kubernetes rollouts: promote on SLOs, not on \"pods are Ready\"",
    teaser: "Readiness is a local signal. A rollout can be 100% Ready while P95 latency and error-rate spike — bad cache warmup, noisy neighbor, DB pressure.",
    href: "/workflows#k8s-rollouts",
    tag: "kubernetes",
  },
  {
    section: "Workflows",
    title: "Terraform DAGs aren't deterministic at scale — your abstractions are",
    teaser: "The graph is great at parallelism, not safety. The sharp edges show up when the graph gets wide: mono-repos, shared modules, 100+ resources in one state.",
    href: "/workflows#terraform-dag",
    tag: "terraform",
  },
  {
    section: "Insights",
    title: "Observability is a label strategy problem disguised as a tooling problem",
    teaser: "Teams add more metrics and still can't answer: which customer segment is broken, or which rollout caused it. The cardinality is wrong in the places that matter.",
    href: "/insights#observability-labels",
    tag: "prometheus",
  },
  {
    section: "Insights",
    title: "AIOps isn't auto-healing — it's faster, safer incident reasoning",
    teaser: "If the model can't show evidence behind a hypothesis, it becomes hallucination-as-a-service. The danger is a confident wrong answer at 2am sending you the wrong direction.",
    href: "/insights#aiops-reasoning",
    tag: "aiops",
  },
];

const STRENGTHS = [
  { id: "K8S", name: "Kubernetes", href: "/kubernetes", desc: "EKS/GKE ops with real on-call ownership. HPA/VPA, RBAC/IRSA, PDBs, readiness gates, canary deploys, upgrade playbooks." },
  { id: "TF", name: "Terraform", href: "/terraform", desc: "Modules, remote state, CI gating, drift control, guardrails. IaC with production discipline baked in." },
  { id: "MSQ", name: "Kafka", href: "/kafka", desc: "Consumer lag, partitions, DLQ, retries, safe rollouts. Debugging streaming reliability at scale." },
  { id: "OBS", name: "Observability", href: "/sre-intel", desc: "Prometheus / Grafana / OTel. SLO-based paging, alert hygiene, ownership routing." },
  { id: "PY", name: "Python Automation", href: "/automation", desc: "Scripts and APIs for migration, validation, and ops toil reduction." },
  { id: "CLD", name: "Cloud (AWS/GCP/Azure)", href: "/cloud", desc: "HA design, security controls, cost optimization across all three major clouds." },
];

export default function Home() {
  return (
    <main>
      {/* ── HERO ── */}
      <section className="hero">
        <div className="hero-inner hero-two-col">
          <div className="hero-content">
            <div className="hero-eyebrow">Site Reliability · Platform Engineering · DevOps</div>
            <h1 className="hero-name">Neeraja<br />Khanapure</h1>
            <p className="hero-role">SRE // Platform // DevOps</p>
            <p className="hero-desc">
              I design, migrate, and operate <strong>production-grade platforms</strong> on
              AWS / GCP / Azure. I write about Kubernetes reliability, Terraform patterns,
              and the <strong>non-obvious failure modes</strong> that show up at scale.
            </p>
            <div className="hero-btns">
              <Link href="/thinking" className="btn-primary">Read the thinking pieces</Link>
              <Link href="/sre-intel" className="btn-ghost">✦ Ask SRE Intel</Link>
            </div>
            <div className="hero-stack">
              {["Kubernetes", "Terraform", "Kafka", "AWS · GCP · Azure", "Python", "Prometheus · Grafana · OTel", "CI/CD", "RBAC · IRSA"].map((s) => (
                <span key={s} className="stack-chip">{s}</span>
              ))}
            </div>
          </div>
          {/* Profile photo — drop public/profile.jpg into the repo to show your photo */}
          <ProfilePhoto />
        </div>
      </section>

      {/* ── FEATURED WRITING ── */}
      <section>
        <div className="sw">
          <div className="sh">
            <span className="sn">Reading</span>
            <h2 className="st">What you'll find here</h2>
          </div>
          <p className="section-sub">
            Not a CV dressed up as a website. Each piece is a production pattern, judgment call,
            or failure mode — written to be useful to someone debugging something right now.
          </p>
          <div className="featured-grid">
            {FEATURED_PIECES.map((p) => (
              <Link key={p.href} href={p.href} className="featured-card">
                <div className="featured-section">{p.section}</div>
                <div className="featured-title">{p.title}</div>
                <div className="featured-teaser">{p.teaser}</div>
                <div className="featured-footer">
                  <span className="tag">{p.tag}</span>
                  <span className="featured-read">Read →</span>
                </div>
              </Link>
            ))}
          </div>

          <div className="content-nav">
            <Link href="/thinking" className="content-nav-item">
              <span className="content-nav-label">How I Think</span>
              <span className="content-nav-desc">5 judgment pieces on SRE tradeoffs</span>
            </Link>
            <Link href="/workflows" className="content-nav-item">
              <span className="content-nav-label">Production Workflows</span>
              <span className="content-nav-desc">Terraform, K8s, MLOps, CI/CD patterns</span>
            </Link>
            <Link href="/insights" className="content-nav-item">
              <span className="content-nav-label">Insights</span>
              <span className="content-nav-desc">CI/CD reliability, observability, AIOps</span>
            </Link>
            <Link href="/engagement" className="content-nav-item">
              <span className="content-nav-label">Engagement Picks</span>
              <span className="content-nav-desc">Weekly curated SRE reads</span>
            </Link>
          </div>
        </div>
      </section>

      {/* ── SRE INTEL CTA ── */}
      <section className="section-alt">
        <div className="sw">
          <div className="sre-intel-cta">
            <div className="sre-intel-cta-left">
              <div className="sre-intel-badge">SRE Intel</div>
              <h2 className="sre-intel-title">Ask a production question</h2>
              <p className="sre-intel-desc">
                A live SRE knowledge assistant — ask about Kubernetes debugging, Terraform guardrails,
                Kafka lag, SLO design, or anything in the SRE/platform space.
                Gets specific. Doesn&apos;t summarize the docs.
              </p>
              <div className="sre-example-qs">
                {[
                  "How do I fix HPA thrashing on EKS?",
                  "Safe Kubernetes upgrade checklist?",
                  "Terraform drift detection patterns?",
                  "Design an SLO for a payment API",
                ].map((q) => (
                  <span key={q} className="sre-example-q">{q}</span>
                ))}
              </div>
              <Link href="/sre-intel" className="btn-primary" style={{ marginTop: "1.5rem", display: "inline-flex" }}>
                Open SRE Intel →
              </Link>
            </div>
            <div className="sre-intel-cta-preview">
              <div className="preview-msg preview-user">
                How do I fix HPA thrashing on EKS?
              </div>
              <div className="preview-msg preview-ai">
                HPA thrashing comes from a few sources — usually mis-sized requests/limits, cooldown misconfiguration, or using the wrong metric source.<br /><br />
                Start with <code>--horizontal-pod-autoscaler-downscale-stabilization</code> (default 5m — often too aggressive). Then check that CPU requests reflect actual steady-state usage, not peak…
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── SKILLS + EVIDENCE ── */}
      <section>
        <div className="sw">
          <div className="sh">
            <span className="sn">Evidence</span>
            <h2 className="st">Skills, backed by proof</h2>
          </div>
          <p className="section-sub">
            Every skill maps to a page with real patterns and artifacts — not a bullet list.
          </p>
          <div className="strengths-grid">
            {STRENGTHS.map((s) => (
              <Link key={s.id} href={s.href} className="sc">
                <div className="sc-id">{s.id} //</div>
                <div className="sc-name">{s.name}</div>
                <div className="sc-desc">{s.desc}</div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── WEEKLY SIGNAL ── */}
      <section className="section-alt">
        <div className="sw">
          <div className="sh">
            <span className="sn">Signal</span>
            <h2 className="st">Stay current</h2>
          </div>
          <div className="signal-grid">
            <Link href="/engagement" className="signal-card">
              <div className="signal-icon">✦</div>
              <div className="signal-title">Engagement Picks</div>
              <div className="signal-desc">
                Weekly curated SRE / DevOps / Platform reads with a short &ldquo;why I care&rdquo;.
                High-signal, low-noise. Updated every Monday.
              </div>
              <div className="signal-cta">Browse the archive →</div>
            </Link>
            <Link href="/open-source" className="signal-card">
              <div className="signal-icon">⌥</div>
              <div className="signal-title">Open Source Picks</div>
              <div className="signal-desc">
                Monthly curated OSS projects across SRE, infra, security, and data tooling.
                Good-first-issues highlighted. Updated every month.
              </div>
              <div className="signal-cta">Browse the picks →</div>
            </Link>
            <Link href="/resources" className="signal-card">
              <div className="signal-icon">◈</div>
              <div className="signal-title">Resources</div>
              <div className="signal-desc">
                Curated SRE/Platform reading list — evergreen references plus weekly fresh
                links from AWS, CNCF, Grafana, and HashiCorp.
              </div>
              <div className="signal-cta">Browse resources →</div>
            </Link>
          </div>
        </div>
      </section>

      {/* ── CONTACT ── */}
      <section>
        <div className="sw">
          <div className="sh">
            <span className="sn">Contact</span>
            <h2 className="st">Get in touch</h2>
          </div>
          <div className="contact-grid">
            <div className="contact-intro">
              <p>
                Actively looking for SRE, Platform Engineering, and DevOps roles. If you&apos;re
                building reliable platforms and need someone with production Kubernetes, cloud,
                and streaming experience — let&apos;s talk.
              </p>
              <p>
                If you found any of the content useful, I&apos;d also love to hear which piece —
                it helps me know what to write more of.
              </p>
              <div className="open-badge">Open to new opportunities</div>
            </div>
            <div className="contact-cards">
              <a href="https://github.com/nk09" target="_blank" rel="noopener noreferrer" className="cc">
                <div className="cc-icon">GH</div>
                <div><div className="cc-label">GitHub</div><div className="cc-val">github.com/nk09</div></div>
              </a>
              <a href="/resume.pdf" target="_blank" className="cc">
                <div className="cc-icon">CV</div>
                <div><div className="cc-label">Resume</div><div className="cc-val">Download PDF ↗</div></div>
              </a>
              <Link href="/workflows" className="cc">
                <div className="cc-icon">→</div>
                <div><div className="cc-label">Production Workflows</div><div className="cc-val">Terraform, K8s, MLOps patterns</div></div>
              </Link>
              <Link href="/sre-intel" className="cc">
                <div className="cc-icon">✦</div>
                <div><div className="cc-label">SRE Intel</div><div className="cc-val">Live SRE knowledge assistant</div></div>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
