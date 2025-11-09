import React from "react";
import { Cpu, Dock, Boxes, GitBranch, LineChart, ServerCog, Cloud, BrainCircuit, ShieldHalf, Workflow } from "lucide-react";

const items = [
  { icon: Cpu, label: "Kubernetes (EKS/GKE)" },
  { icon: Boxes, label: "Terraform / IaC" },
  { icon: Dock, label: "Docker" },
  { icon: LineChart, label: "Prometheus / Grafana" },
  { icon: ServerCog, label: "CI/CD (Actions/Spinnaker)" },
  { icon: Cloud, label: "AWS / GCP / Azure" },
  { icon: BrainCircuit, label: "OpenTelemetry / AI" },
  { icon: ShieldHalf, label: "Security & Compliance" },
  { icon: Workflow, label: "SRE / SLOs / Toil" },
];

export default function Skills() {
  return (
    <section className="mb-10">
      <h2 className="text-xl sm:text-2xl font-bold mb-4">Skills</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
        {items.map(({ icon: Icon, label }) => (
          <div key={label} className="glass rounded-2xl p-4 flex items-center gap-3 hover:bg-white/15 transition">
            <Icon className="w-5 h-5 text-indigo-300" />
            <span className="text-slate-200">{label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
