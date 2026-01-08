import React from "react";

export default function Hero() {
  return (
    <section className="mb-10">
      <div className="rounded-3xl p-8 sm:p-12 glass relative overflow-hidden">
        {/* Decorative glow — do not intercept clicks */}
        <div className="pointer-events-none absolute -top-24 -right-24 w-72 h-72 rounded-full blur-3xl bg-brand-gradient opacity-30" />
        <h1 className="text-3xl sm:text-5xl font-extrabold leading-tight">
          <span className="gradient-text">Neeraja Khanapure</span><br />
          <span className="text-slate-200">DevOps & AI Engineer</span>
        </h1>
        <p className="mt-4 text-slate-300 max-w-2xl">
          9+ years building secure, observable, highly-available platforms across AWS/GCP/Azure.
          Real-world work in Kubernetes (EKS/GKE), Terraform, Prometheus/Grafana, OpenTelemetry, and CI/CD.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <a href="https://www.linkedin.com/in/neerajakhanapure" target="_blank" rel="noopener noreferrer"
             className="rounded-xl px-4 py-2 bg-white/10 border border-white/10 hover:bg-white/15 transition">
            LinkedIn
          </a>
          {/* Use a robust Drive URL and open in a new tab */}
          <a
            href="https://drive.google.com/open?id=1-mMjABThyKHBFTGGnrgPI8H_R9vpjF10lDlqDA5qYAI"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-xl px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 hover:opacity-90 transition"
          >
            View Resume
          </a>
        </div>
      </div>
    </section>
  );
}
