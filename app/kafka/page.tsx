import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Kafka | Neeraja Khanapure",
  description: "Consumer lag, DLQ patterns, partition strategy, safe rolling restarts, and streaming reliability debugging.",
};

export default function KafkaPage() {
  return (
    <main>
      <div className="sw-narrow">
        <div className="skill-page-header">
          <div className="section-label">Skills</div>
          <h1 className="page-title">Kafka</h1>
          <p className="page-sub">Consumer lag debugging, DLQ patterns, partition strategy, and safe rolling restarts. Streaming systems that stay reliable under load.</p>
        </div>

        <div className="skill-section">
          <h2 className="skill-section-title">What I work on</h2>
          <ul className="skill-list">
            <li>Consumer lag monitoring and root cause analysis: lag growing vs lag stuck are very different problems.</li>
            <li>DLQ design: retry strategies with exponential backoff, poison pill isolation, and idempotent processing.</li>
            <li>Partition key design for even distribution and ordering guarantees where required.</li>
            <li>Safe broker rolling restarts with rack-aware replication and in-sync replica monitoring.</li>
            <li>Producer config tuning: acks, retries, and idempotency for at-least-once and exactly-once semantics.</li>
          </ul>
        </div>

        <div className="skill-section">
          <h2 className="skill-section-title">Debugging consumer lag</h2>
          <div className="break-items">
            <div className="break-item">
              <div className="break-title">Lag growing steadily</div>
              <div className="break-desc">Consumer throughput is below produce rate. Check consumer CPU and memory, partition count vs consumer count, and batch size config.</div>
            </div>
            <div className="break-item">
              <div className="break-title">Lag stuck but not growing</div>
              <div className="break-desc">Usually a rebalancing loop or a poison pill. Check consumer group describe for partition assignment churn.</div>
            </div>
            <div className="break-item">
              <div className="break-title">Lag spiky</div>
              <div className="break-desc">Typically a downstream dependency adding latency. Check consumer processing time p99, not just the lag offset number.</div>
            </div>
            <div className="break-item">
              <div className="break-title">Consumer group stuck on rebalance</div>
              <div className="break-desc">Check session timeout vs max poll interval. Increase max.poll.interval.ms if processing is slow, or reduce batch size.</div>
            </div>
          </div>
        </div>

        <div className="skill-section">
          <h2 className="skill-section-title">First commands I run</h2>
          <ul className="skill-list">
            <li><code>kafka-consumer-groups.sh --describe</code> to see per-partition lag distribution</li>
            <li>Compare lag across partitions: uneven lag points to a specific partition or consumer issue</li>
            <li>Check broker metrics: under-replicated partitions and ISR shrinks indicate broker health issues</li>
            <li>Monitor consumer group coordinator changes for rebalance frequency</li>
          </ul>
        </div>

        <div className="skill-page-nav">
          <Link href="/evidence" className="piece-link">Skills map →</Link>
          <Link href="/sre-intel" className="piece-link">Ask SRE Intel →</Link>
          <Link href="/workflows" className="piece-link">Streaming reliability patterns →</Link>
        </div>
      </div>
    </main>
  );
}
