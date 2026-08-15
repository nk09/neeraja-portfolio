import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About | Neeraja Khanapure",
  description:
    "Senior SRE and Platform Engineer with 10+ years building reliable infrastructure at Apple, PayPal, and beyond.",
};

const HIGHLIGHTS = [
  {
    metric: "10+",
    label: "Years of Experience",
    detail: "Cloud infrastructure, Kubernetes, observability, CI/CD",
  },
  {
    metric: "50+",
    label: "Microservices Instrumented",
    detail: "OpenTelemetry distributed tracing with tail-based sampling",
  },
  {
    metric: "70%",
    label: "Observability Cost Reduction",
    detail: "Storage optimization while preserving 100% error traces",
  },
  {
    metric: "60%",
    label: "Fewer Recurring Incidents",
    detail: "Through blameless post-mortems and structured root cause analysis",
  },
];

const TIMELINE = [
  {
    period: "2021 – Present",
    role: "Site Reliability Engineer, Technical Lead",
    company: "Apple",
    location: "Austin, TX",
    summary:
      "Technical lead across three major programs: cloud migration, platform reliability, and enterprise observability modernization. Built self-service CI/CD platform, led Datadog-to-Grafana migration, implemented OpenTelemetry tracing at scale.",
  },
  {
    period: "2020 – 2021",
    role: "Site Reliability Engineer, Cloud Infrastructure",
    company: "PayPal",
    location: "San Jose, CA",
    summary:
      "Designed GCP infrastructure with Terraform, managed GKE clusters, built Grafana/Prometheus monitoring for high-throughput payment systems.",
  },
  {
    period: "2017 – 2018",
    role: "DevOps Engineer, Infrastructure Lead",
    company: "Elata Technologies",
    location: "Virginia Beach, VA",
    summary:
      "Architected Kubernetes platform from scratch, implemented LGTM observability stack, automated AWS infrastructure with Terraform and Ansible.",
  },
  {
    period: "2014 – 2016",
    role: "Software & CI/CD Engineer",
    company: "AT&T, Capital One, McGraw Hill",
    location: "Various, US",
    summary:
      "Built CI/CD pipelines, web applications, and monitoring infrastructure across financial services and education.",
  },
];

const LOOKING_FOR = [
  "SRE, Platform Engineering, or Cloud Infrastructure roles",
  "Teams building on Kubernetes, multi-cloud, or observability platforms",
  "Organizations that value reliability engineering as a discipline",
  "Roles where I can lead technical direction and mentor engineers",
];

export default function AboutPage() {
  return (
    <main>
      <section className="hero" style={{ paddingBottom: "2rem" }}>
        <div className="hero-inner" style={{ alignItems: "flex-start" }}>
          <div className="hero-content">
            <div className="hero-label">About</div>
            <h1 className="hero-name" style={{ fontSize: "2.5rem" }}>
              Neeraja Khanapure
            </h1>
            <p className="hero-role">
              Senior SRE &amp; Platform Engineer
            </p>
            <p className="hero-desc">
              I build and operate the infrastructure that keeps production systems running.
              Over the past 10+ years I&apos;ve worked across Apple, PayPal, and multiple
              engineering organizations — designing Kubernetes platforms, observability
              pipelines, CI/CD systems, and the automation that holds it all together.
            </p>
            <p className="hero-desc" style={{ marginTop: "0.75rem" }}>
              I care about reliability as a practice, not just a title. That means
              SLI/SLO frameworks, blameless post-mortems, reducing toil through
              automation, and building platforms that let dev teams ship without
              needing SRE hand-holding.
            </p>
            <div className="hero-btns" style={{ marginTop: "1.5rem" }}>
              <a
                href="https://www.linkedin.com/in/neerajakhanapure"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
              >
                Connect on LinkedIn
              </a>
              <Link href="/evidence" className="btn-outline">
                See my evidence map
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* HIGHLIGHTS */}
      <section>
        <div className="sw">
          <div className="section-label">Impact</div>
          <h2 className="section-title">By the numbers</h2>
          <div className="skills-grid">
            {HIGHLIGHTS.map((h) => (
              <div key={h.label} className="skill-card" style={{ cursor: "default" }}>
                <div
                  style={{
                    fontFamily: "var(--serif)",
                    fontSize: "2rem",
                    fontWeight: 600,
                    color: "var(--terra)",
                  }}
                >
                  {h.metric}
                </div>
                <div className="skill-name">{h.label}</div>
                <p style={{ fontSize: "0.85rem", color: "var(--text2)", marginTop: "0.25rem" }}>
                  {h.detail}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CAREER TIMELINE */}
      <section className="section-warm">
        <div className="sw">
          <div className="section-label">Experience</div>
          <h2 className="section-title">Career path</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem", marginTop: "1.5rem" }}>
            {TIMELINE.map((t) => (
              <div
                key={t.period}
                style={{
                  background: "var(--surface)",
                  border: "1px solid var(--border)",
                  borderRadius: "var(--r-lg)",
                  padding: "1.5rem",
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", flexWrap: "wrap", gap: "0.5rem" }}>
                  <div>
                    <div style={{ fontWeight: 600, fontSize: "1rem", color: "var(--text)" }}>
                      {t.role}
                    </div>
                    <div style={{ fontSize: "0.9rem", color: "var(--terra)", fontWeight: 500 }}>
                      {t.company}
                    </div>
                  </div>
                  <div style={{ fontSize: "0.85rem", color: "var(--muted)", whiteSpace: "nowrap" }}>
                    {t.period} · {t.location}
                  </div>
                </div>
                <p style={{ marginTop: "0.75rem", fontSize: "0.9rem", color: "var(--text2)", lineHeight: 1.6 }}>
                  {t.summary}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHAT I'M LOOKING FOR */}
      <section>
        <div className="sw">
          <div className="section-label">Next chapter</div>
          <h2 className="section-title">What I&apos;m looking for</h2>
          <div
            style={{
              background: "var(--surface)",
              border: "1px solid var(--border)",
              borderRadius: "var(--r-lg)",
              padding: "1.5rem 2rem",
              marginTop: "1.5rem",
            }}
          >
            <ul style={{ listStyle: "none", padding: 0, display: "flex", flexDirection: "column", gap: "0.75rem" }}>
              {LOOKING_FOR.map((item) => (
                <li
                  key={item}
                  style={{
                    fontSize: "0.95rem",
                    color: "var(--text)",
                    paddingLeft: "1.25rem",
                    position: "relative",
                  }}
                >
                  <span
                    style={{
                      position: "absolute",
                      left: 0,
                      color: "var(--terra)",
                      fontWeight: 600,
                    }}
                  >
                    →
                  </span>
                  {item}
                </li>
              ))}
            </ul>
            <div style={{ marginTop: "1.5rem" }}>
              <a
                href="https://www.linkedin.com/in/neerajakhanapure"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
                style={{ display: "inline-flex" }}
              >
                Connect on LinkedIn
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
