import React from "react";
import NavBar from "../../components/NavBar";
import Markdown from "../../components/Markdown";

export const metadata = {
  title: "Kafka & Streaming Reliability | Neeraja Khanapure",
  description: "Kafka reliability patterns: lag, partitions, retries, DLQ, debugging.",
};

const markdown = `### Kafka reliability (the stuff that matters in prod)
- Topic design: partitions, replication factor, retention, compaction when needed.
- Consumers: group stability, offset mgmt, **idempotency**, retries, and DLQ patterns.
- Backpressure: protect downstream systems; rate limit and batch responsibly.
- Observability: lag (per group/partition), rebalance rate, produce/consume errors, throughput.

### Debugging playbook (quick checklist)
- Lag spike: **input surge**, **consumer slowdown**, **rebalance**, or **hot partition**?
- Check: consumer errors, commit rate, rebalance count, broker health, ISR, network.
- Fix: scale consumers, tune max.poll, increase partitions carefully, isolate hot keys.

### Links
- Engagement picks: [https://neeraja-portfolio-09.vercel.app/engagement](https://neeraja-portfolio-09.vercel.app/engagement)
- Evidence map: [https://neeraja-portfolio-09.vercel.app/evidence](https://neeraja-portfolio-09.vercel.app/evidence)`;

export default function Page() {
  return (
    <main>
      <NavBar />
      <section className="glass rounded-3xl p-8">
        <h1 className="text-3xl font-extrabold mb-4">Kafka & Streaming Reliability</h1>
        <Markdown markdown={markdown} />
      </section>
    </main>
  );
}
