import Link from "next/link";
import ProfilePhoto from "../components/ProfilePhoto";

export const metadata = {
  title: "Neeraja Khanapure | SRE · Platform · DevOps",
  description:
    "SRE and Platform Engineer working with Kubernetes, Terraform, Kafka, and multi-cloud. Writing about reliability, automation, and the things that actually break in production.",
};

const ARTICLES = [
  {
    section: "Thinking",
    title: "Why your dashboard isn't actually observability",
    teaser: "A beautiful Grafana board with 200 panels is not the same as knowing if your service is healthy. Here's the difference.",
    href: "/thinking#piece-01",
    tag: "observability",
  },
  {
    section: "Thinking",
    title: "Good alerts vs bad alerts. It's not the same thing",
    teaser: "Deleting 90% of your alerts doesn't fix the problem. Ownership and SLOs do.",
    href: "/thinking#piece-03",
    tag: "on-call",
  },
  {
    section: "Workflows",
    title: "Kubernetes rollouts: don't trust \"pods are Ready\"",
    teaser: "A pod can be Ready and still be causing a 40% error rate. Here's how to actually gate a rollout.",
    href: "/workflows#k8s-rollouts",
    tag: "kubernetes",
  },
  {
    section: "Workflows",
    title: "Terraform at scale breaks in predictable ways",
    teaser: "Wide dependency graphs, surprise destroys, overused depends_on and how to avoid all of them.",
    href: "/workflows#terraform-dag",
    tag: "terraform",
  },
  {
    section: "Insights",
    title: "Observability is a labeling problem, not a tooling problem",
    teaser: "You can have Prometheus, Grafana, and OTel all running and still not know which customer is broken.",
    href: "/insights#observability-labels",
    tag: "prometheus",
  },
  {
    section: "Insights",
    title: "AIOps should help you think faster, not replace thinking",
    teaser: "Auto-remediation without guardrails is just a faster way to make things worse at 2am.",
    href: "/insights#aiops-reasoning",
    tag: "aiops",
  },
];

const SKILLS = [
  {
    icon: "⚙️",
    name: "Kubernetes",
    href: "/kubernetes",
    bullets: ["EKS and GKE in production", "Autoscaling, upgrades, RBAC", "Canary deploys and rollbacks", "On-call incident ownership"],
  },
  {
    icon: "🏗️",
    name: "Terraform",
    href: "/terraform",
    bullets: ["Reusable modules and remote state", "CI/CD gating and drift detection", "Guardrails and policy enforcement", "Cross-team IaC patterns"],
  },
  {
    icon: "📨",
    name: "Kafka",
    href: "/kafka",
    bullets: ["Consumer lag and DLQ patterns", "Partition strategy and retries", "Safe broker rolling restarts", "Streaming reliability debugging"],
  },
  {
    icon: "📊",
    name: "Observability",
    href: "/sre-intel",
    bullets: ["Prometheus, Grafana, OpenTelemetry", "SLO design and error budgets", "Alert hygiene and ownership", "Reducing on-call noise"],
  },
  {
    icon: "🐍",
    name: "Python Automation",
    href: "/automation",
    bullets: ["Migration and validation scripts", "API tooling for infra ops", "Toil reduction tooling", "Retry and idempotency patterns"],
  },
  {
    icon: "☁️",
    name: "Cloud",
    href: "/cloud",
    bullets: ["AWS, GCP and Azure", "HA architecture and multi-AZ", "Cost optimization", "Security and IAM controls"],
  },
];

export default function Home() {
  return (
    <main>
      {/* HERO */}
      <section className="hero">
        <div className="hero-inner">
          <div className="hero-content">
            <div className="hero-label">SRE · Platform Engineering · DevOps</div>
            <h1 className="hero-name">Neeraja<br />Khanapure</h1>
            <p className="hero-role">Making production systems reliable, one incident at a time ☀️</p>
            <p className="hero-desc">
              I work on cloud infrastructure, Kubernetes platforms, and streaming systems.
              On this site I share what I&apos;ve learned, the patterns that work,
              and the things that quietly break at scale.
            </p>
            <div className="hero-btns">
              <Link href="/thinking" className="btn-primary">Read the thinking pieces</Link>
              <Link href="/sre-intel" className="btn-outline">Ask SRE Intel ✦</Link>
            </div>
            <div className="hero-chips">
              {["Kubernetes", "Terraform", "Kafka", "AWS · GCP · Azure", "Python", "Prometheus", "Grafana", "OpenTelemetry"].map((s) => (
                <span key={s} className="chip">{s}</span>
              ))}
            </div>
          </div>
          <ProfilePhoto />
        </div>
      </section>

      {/* WRITING */}
      <section>
        <div className="sw">
          <div className="section-label">Writing</div>
          <h2 className="section-title">Things I&apos;ve figured out</h2>
          <p className="section-desc">
            Short reads on Kubernetes, Terraform, observability, and reliability.
            Written from production experience, not from docs.
          </p>
          <div className="articles-grid">
            {ARTICLES.map((a) => (
              <Link key={a.href} href={a.href} className="article-card">
                <div className="article-section">{a.section}</div>
                <div className="article-title">{a.title}</div>
                <div className="article-teaser">{a.teaser}</div>
                <div className="article-footer">
                  <span className="article-tag">{a.tag}</span>
                  <span className="article-read">Read →</span>
                </div>
              </Link>
            ))}
          </div>
          <div className="content-tiles">
            <Link href="/thinking" className="content-tile">
              <span className="tile-label">📝 How I Think</span>
              <span className="tile-desc">5 pieces on SRE tradeoffs</span>
            </Link>
            <Link href="/workflows" className="content-tile">
              <span className="tile-label">🔧 Workflows</span>
              <span className="tile-desc">K8s, Terraform, MLOps, CI/CD</span>
            </Link>
            <Link href="/insights" className="content-tile">
              <span className="tile-label">💡 Insights</span>
              <span className="tile-desc">Observability, CI/CD, AIOps</span>
            </Link>
            <Link href="/engagement" className="content-tile">
              <span className="tile-label">🔖 Weekly Picks</span>
              <span className="tile-desc">Curated SRE reads</span>
            </Link>
          </div>
        </div>
      </section>

      {/* SKILLS */}
      <section className="section-warm">
        <div className="sw">
          <div className="section-label">Skills</div>
          <h2 className="section-title">What I work on</h2>
          <p className="section-desc">
            Each area has its own page with real patterns, examples, and case studies.
          </p>
          <div className="skills-grid">
            {SKILLS.map((s) => (
              <Link key={s.name} href={s.href} className="skill-card">
                <span className="skill-icon">{s.icon}</span>
                <div className="skill-name">{s.name}</div>
                <ul className="skill-bullets">
                  {s.bullets.map((b) => <li key={b}>{b}</li>)}
                </ul>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* SRE INTEL */}
      <section>
        <div className="sw">
          <div className="intel-cta">
            <div>
              <div className="intel-pill">SRE Intel ✦ Live</div>
              <h2 className="intel-title">Have a production question?<br />Ask it here.</h2>
              <p className="intel-desc">
                SRE Intel is an AI assistant trained on production SRE patterns.
                Ask about Kubernetes debugging, Terraform state issues, Kafka lag,
                SLO design, you get a specific answer, not a documentation link.
              </p>
              <div className="intel-qs">
                {[
                  "How do I fix HPA thrashing?",
                  "Safe K8s upgrade checklist?",
                  "Kafka consumer lag, where to start?",
                  "How to design an SLO?",
                ].map((q) => (
                  <span key={q} className="intel-q">{q}</span>
                ))}
              </div>
              <Link href="/sre-intel" className="btn-primary" style={{ marginTop: "1.5rem", display: "inline-flex" }}>
                Open SRE Intel →
              </Link>
            </div>
            <div className="intel-preview">
              <div className="preview-msg preview-user">
                How do I fix HPA thrashing on EKS?
              </div>
              <div className="preview-msg preview-ai">
                Usually mis-sized CPU requests or the downscale window being too short.
                <br /><br />
                Start with <code>--horizontal-pod-autoscaler-downscale-stabilization</code>, default is 5m, often too aggressive. Then check that CPU requests match actual steady-state usage, not peak. HPA scales against requests, not limits.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* RESOURCES */}
      <section className="section-warm">
        <div className="sw">
          <div className="section-label">Stay current</div>
          <h2 className="section-title">Weekly signal</h2>
          <div className="signal-grid">
            <Link href="/engagement" className="signal-card">
              <div className="signal-emoji">📬</div>
              <div className="signal-name">Engagement Picks</div>
              <div className="signal-desc">
                Every week I pick 5 SRE and DevOps reads and explain why they matter.
                Updated Mondays.
              </div>
              <div className="signal-link">Browse archive →</div>
            </Link>
            <Link href="/open-source" className="signal-card">
              <div className="signal-emoji">🌱</div>
              <div className="signal-name">Open Source Picks</div>
              <div className="signal-desc">
                Monthly list of OSS projects worth watching, Kubernetes, Prometheus,
                Terraform, and more. Good first issues included.
              </div>
              <div className="signal-link">Browse picks →</div>
            </Link>
            <Link href="/resources" className="signal-card">
              <div className="signal-emoji">📚</div>
              <div className="signal-name">Resources</div>
              <div className="signal-desc">
                My go-to SRE reading list, Google SRE book, EKS best practices,
                Prometheus docs, and more. Refreshed weekly.
              </div>
              <div className="signal-link">Browse resources →</div>
            </Link>
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section>
        <div className="sw">
          <div className="section-label">Say hello</div>
          <h2 className="section-title">Let&apos;s connect</h2>
          <div className="contact-grid">
            <div className="contact-text">
              <p>
                I&apos;m open to SRE, Platform Engineering, and DevOps roles —
                especially teams building something interesting on Kubernetes or multi-cloud.
              </p>
              <p>
                If you read something here that was useful, I&apos;d love to hear about it.
                And if you have a production problem I might be able to help with, reach out.
              </p>
              <div className="open-badge">Open to new roles</div>
            </div>
            <div className="contact-links">
              <a href="https://github.com/nk09" target="_blank" rel="noopener noreferrer" className="contact-link">
                <div className="contact-link-icon">🐙</div>
                <div>
                  <div className="contact-link-label">GitHub</div>
                  <div className="contact-link-val">github.com/nk09</div>
                </div>
              </a>
              <a href="/resume.pdf" target="_blank" className="contact-link">
                <div className="contact-link-icon">📄</div>
                <div>
                  <div className="contact-link-label">Resume</div>
                  <div className="contact-link-val">Download PDF</div>
                </div>
              </a>
              <Link href="/sre-intel" className="contact-link">
                <div className="contact-link-icon">✦</div>
                <div>
                  <div className="contact-link-label">SRE Intel</div>
                  <div className="contact-link-val">Ask a production question</div>
                </div>
              </Link>
              <Link href="/engagement" className="contact-link">
                <div className="contact-link-icon">📬</div>
                <div>
                  <div className="contact-link-label">Weekly Picks</div>
                  <div className="contact-link-val">SRE reads every Monday</div>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
