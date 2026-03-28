import { Metadata } from "next";
import Link from "next/link";
import fs from "fs";
import path from "path";

export const metadata: Metadata = {
  title: "Resources | Neeraja Khanapure",
  description:
    "Weekly refreshed SRE/DevOps/Platform engineering reading list — curated from AWS, Grafana, CNCF, Prometheus, HashiCorp, and more.",
};

// ── Static seed resources (shown until resources_sync workflow populates weekly.html) ──
const SEED_RESOURCES = [
  {
    category: "Kubernetes & Platform",
    items: [
      { title: "Kubernetes Production Best Practices", href: "https://learnk8s.io/production-best-practices", src: "learnk8s.io" },
      { title: "EKS Best Practices Guide", href: "https://aws.github.io/aws-eks-best-practices/", src: "AWS" },
      { title: "CNCF Landscape", href: "https://landscape.cncf.io/", src: "CNCF" },
      { title: "Kubernetes Failure Stories", href: "https://k8s.af/", src: "k8s.af" },
    ],
  },
  {
    category: "Observability",
    items: [
      { title: "Prometheus Operator Docs", href: "https://prometheus-operator.dev/", src: "prometheus-operator.dev" },
      { title: "Grafana Best Practices", href: "https://grafana.com/docs/grafana/latest/best-practices/", src: "Grafana" },
      { title: "OpenTelemetry Getting Started", href: "https://opentelemetry.io/docs/getting-started/", src: "OTel" },
      { title: "Google SRE Workbook — SLOs", href: "https://sre.google/workbook/implementing-slos/", src: "Google" },
    ],
  },
  {
    category: "Infrastructure as Code",
    items: [
      { title: "Terraform Best Practices", href: "https://www.terraform-best-practices.com/", src: "terraform-best-practices.com" },
      { title: "HashiCorp Learn", href: "https://developer.hashicorp.com/terraform/tutorials", src: "HashiCorp" },
      { title: "Atlantis — Terraform Pull Request Automation", href: "https://www.runatlantis.io/", src: "runatlantis.io" },
    ],
  },
  {
    category: "Streaming & Kafka",
    items: [
      { title: "Confluent Kafka Tutorials", href: "https://developer.confluent.io/tutorials/", src: "Confluent" },
      { title: "Kafka: The Definitive Guide (free)", href: "https://www.confluent.io/resources/kafka-the-definitive-guide-v2/", src: "Confluent" },
      { title: "Strimzi — Kafka on Kubernetes", href: "https://strimzi.io/documentation/", src: "strimzi.io" },
    ],
  },
  {
    category: "SRE & Reliability",
    items: [
      { title: "Google SRE Book (free)", href: "https://sre.google/sre-book/table-of-contents/", src: "Google" },
      { title: "Incident.io — Incident Management Guide", href: "https://incident.io/guide", src: "incident.io" },
      { title: "The On-Call Handbook", href: "https://github.com/alicegoldfuss/oncall-handbook", src: "GitHub" },
      { title: "DORA Metrics — DevOps Research", href: "https://dora.dev/", src: "dora.dev" },
    ],
  },
];

// ── Read weekly.html injected by resources_sync workflow ──────────────────
function getWeeklyHtml(): { html: string; date: string } | null {
  try {
    const weeklyPath = path.join(process.cwd(), "app", "resources", "_generated", "weekly.html");
    if (!fs.existsSync(weeklyPath)) return null;
    const stat = fs.statSync(weeklyPath);
    const html = fs.readFileSync(weeklyPath, "utf-8");
    const date = stat.mtime.toISOString().slice(0, 10);
    return { html, date };
  } catch {
    return null;
  }
}

export default function ResourcesPage() {
  const weekly = getWeeklyHtml();

  return (
    <main>
      <div className="sw" style={{ maxWidth: "860px" }}>
        <div className="page-header">
          <h1 className="page-title">Resources</h1>
          <p className="page-sub">
            SRE / DevOps / Platform engineering reading list. Curated from production experience —
            not a scrape of Awesome lists.
          </p>
        </div>

        {/* ── Weekly fresh picks (from resources_sync workflow) ── */}
        {weekly ? (
          <div className="resources-weekly-block">
            <div className="weekly-header">
              <span className="weekly-badge">Updated {weekly.date}</span>
              <span className="weekly-title">This week&apos;s fresh picks</span>
            </div>
            <div
              className="weekly-links"
              dangerouslySetInnerHTML={{ __html: weekly.html }}
            />
          </div>
        ) : (
          <div className="seed-notice" style={{ marginBottom: "2rem" }}>
            Weekly fresh picks appear here once the{" "}
            <a href="https://github.com/nk09/neeraja-public-posts" target="_blank" rel="noopener noreferrer">
              resources_sync workflow
            </a>{" "}
            runs on Sunday and the PR is merged.
          </div>
        )}

        {/* ── Curated evergreen resources ── */}
        <div className="resources-sections">
          {SEED_RESOURCES.map((section) => (
            <div key={section.category} className="resource-section">
              <h2 className="resource-cat">{section.category}</h2>
              <div className="resource-items">
                {section.items.map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="resource-item"
                  >
                    <div className="resource-item-title">{item.title}</div>
                    <div className="resource-item-src">{item.src} ↗</div>
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="engagement-footer">
          <p>
            Weekly commentary:{" "}
            <Link href="/engagement">Engagement Picks →</Link>
            {" · "}
            OSS tracking:{" "}
            <Link href="/open-source">Open Source Picks →</Link>
          </p>
        </div>
      </div>
    </main>
  );
}
