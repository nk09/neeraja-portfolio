import React from "react";
import NavBar from "../../components/NavBar";
import Markdown from "../../components/Markdown";

export const metadata = {
  title: "Cloud Engineering (AWS/GCP/Azure) | Neeraja Khanapure",
  description: "HA design, security, networking, and cost controls across clouds.",
};

const markdown = `### Cloud (AWS/GCP/Azure) — what I emphasize
- **HA by design**: multi-AZ, correct LB patterns, tested failure assumptions.
- **Identity & access**: least privilege IAM, short-lived creds, key rotation.
- **Networking**: VPC/subnets, routing, SG/NACL boundaries, safe ingress/egress.
- **Cost controls**: autoscaling, right sizing, lifecycle policies, cost-per-request thinking.

### Practical deliverables
- Simple reference architectures (honest and debuggable)
- Runbooks for top failure modes
- Drift + compliance checks (automation-first)

### Links
- Terraform: [https://neeraja-portfolio-09.vercel.app/terraform](https://neeraja-portfolio-09.vercel.app/terraform)
- Kubernetes: [https://neeraja-portfolio-09.vercel.app/kubernetes](https://neeraja-portfolio-09.vercel.app/kubernetes)`;

export default function Page() {
  return (
    <main>
      <NavBar />
      <section className="glass rounded-3xl p-8">
        <h1 className="text-3xl font-extrabold mb-4">Cloud Engineering (AWS/GCP/Azure)</h1>
        <Markdown markdown={markdown} />
      </section>
    </main>
  );
}
