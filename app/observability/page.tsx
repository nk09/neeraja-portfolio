import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Observability | Neeraja Khanapure",
  description: "Prometheus, Grafana, OpenTelemetry. SLO design, alert hygiene, and reducing on-call noise.",
};

export default function ObservabilityPage() {
  return (
    <main>
      <div className="sw-narrow">
        <div className="skill-page-header">
          <div className="section-label">Skills</div>
          <h1 className="page-title">Observability</h1>
          <p className="page-sub">Prometheus, Grafana, and OpenTelemetry in production. SLO design, alert hygiene, and making dashboards that actually help during incidents.</p>
        </div>

        <div className="skill-section">
          <h2 className="skill-section-title">What I work on</h2>
          <ul className="skill-list">
            <li>SLI and SLO design: defining what "broken" means for real users before building any dashboards.</li>
            <li>Prometheus scrape config, recording rules, and cardinality management.</li>
            <li>Grafana dashboard hygiene: dashboards that answer a specific question, not walls of charts.</li>
            <li>OTel Collector setup: the pipeline between instrumentation and your backend.</li>
            <li>Alert design: SLO-based burn rate alerting instead of raw threshold alerts.</li>
            <li>On-call noise reduction: ownership routing, runbook-linked alerts, and alert review processes.</li>
          </ul>
        </div>

        <div className="skill-section">
          <h2 className="skill-section-title">How I think about this</h2>
          <div className="break-items">
            <div className="break-item">
              <div className="break-title">Start with the SLI, not the tool</div>
              <div className="break-desc">What does "the service is broken" mean for a real user? Translate that into one metric with a threshold you'd page on. Build everything else as supporting context.</div>
            </div>
            <div className="break-item">
              <div className="break-title">Labels are a strategy decision</div>
              <div className="break-desc">Cardinality is a cost. Labels should let you isolate failures by service, version, region, and tenant. user_id as a label is a cardinality bomb.</div>
            </div>
            <div className="break-item">
              <div className="break-title">Dashboards are for exploration</div>
              <div className="break-desc">Production decisions need SLOs, not dashboards. A dashboard without a defined SLI is just a wall of charts that nobody trusts during an incident.</div>
            </div>
            <div className="break-item">
              <div className="break-title">Alerts need owners</div>
              <div className="break-desc">An alert without an owner is a fire alarm in an empty building. Every alert needs a runbook link and a named team responsible for it.</div>
            </div>
          </div>
        </div>

        <div className="skill-section">
          <h2 className="skill-section-title">Stack I use</h2>
          <ul className="skill-list">
            <li>Prometheus for metrics collection and alerting rules</li>
            <li>Grafana for dashboards and alert management UI</li>
            <li>OpenTelemetry Collector as the metrics/traces/logs pipeline</li>
            <li>Jaeger or Tempo for distributed tracing</li>
            <li>PagerDuty or Opsgenie for alert routing with ownership policies</li>
          </ul>
        </div>

        <div className="skill-page-nav">
          <Link href="/thinking#piece-01" className="piece-link">Why dashboards lie →</Link>
          <Link href="/thinking#piece-03" className="piece-link">Good vs bad alerts →</Link>
          <Link href="/sre-intel" className="piece-link">Ask SRE Intel about SLO design →</Link>
        </div>
      </div>
    </main>
  );
}
