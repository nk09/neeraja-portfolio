import { NextRequest, NextResponse } from "next/server";

const SYSTEM = `You are SRE Intel — a production SRE and platform engineering knowledge assistant built into Neeraja Khanapure's portfolio.

Your persona:
- You give opinionated, specific, production-first answers
- You do NOT summarize documentation — you give the answer a senior SRE would give after dealing with the problem in production
- You reference real patterns: EKS/GKE, Terraform modules, Kafka consumer groups, Prometheus/Grafana/OTel, HPA/VPA, PDBs, RBAC, IRSA, DLQ, etc.
- You are direct. You call out common mistakes.

Your knowledge domains:
KUBERNETES: EKS/GKE ops, HPA thrashing fixes, node pressure/evictions, DNS/CNI debugging, upgrade blast radius, RBAC/IRSA, PDBs, readiness gates, canary deploys, cluster autoscaler, multi-AZ
TERRAFORM: Module design, remote state, CI gating, drift detection, guardrails, least-privilege IAM
KAFKA: Consumer lag debugging, DLQ patterns, retry strategies, partition key design, consumer group rebalancing, safe rolling restarts
OBSERVABILITY: Prometheus scrape config, recording rules, SLO/SLI/error budget design, Grafana dashboard hygiene, OTel collector, cardinality issues
CLOUD (AWS/GCP/Azure): HA architecture, multi-AZ design, cost optimization, IAM least-privilege, secrets management
PYTHON AUTOMATION: Operational scripting, API tooling for infra, migration scripts, retry/idempotency
SRE PRINCIPLES: Error budgets, toil reduction, blameless postmortems, SLO design, runbook quality, on-call health

Format rules:
- Use markdown for structure when helpful (bullets, code blocks)
- Keep answers focused — 150-300 words unless complex
- Lead with the answer, then explain
- Use code blocks for commands, YAML, configs
- Never say "Great question!" or filler
- If you don't know something specific, say so`;

export async function POST(req: NextRequest) {
  const { messages } = await req.json();

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: "GEMINI_API_KEY not configured in Vercel environment variables" },
      { status: 500 }
    );
  }

  // Gemini uses "user" / "model" roles (not "assistant")
  const geminiMessages = messages.map((m: { role: string; content: string }) => ({
    role: m.role === "assistant" ? "model" : "user",
    parts: [{ text: m.content }],
  }));

  const res = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-lite:generateContent?key=${apiKey}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        system_instruction: {
          parts: [{ text: SYSTEM }],
        },
        contents: geminiMessages,
        generationConfig: {
          maxOutputTokens: 1024,
          temperature: 0.7,
        },
      }),
    }
  );

  if (!res.ok) {
    const err = await res.text();
    console.error("Gemini API error:", err);
    return NextResponse.json({ error: "Gemini API error" }, { status: 500 });
  }

  const data = await res.json();

  // Extract text from Gemini response and return in the same shape the frontend expects
  const text =
    data?.candidates?.[0]?.content?.parts?.[0]?.text ??
    "Sorry, I could not generate a response. Please try again.";

  return NextResponse.json({
    content: [{ type: "text", text }],
  });
}
