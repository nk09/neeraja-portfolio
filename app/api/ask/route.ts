import { NextResponse } from "next/server";

function extractOutputText(payload: any): string {
  if (!payload) return "";
  if (typeof payload.output_text === "string" && payload.output_text.trim()) return payload.output_text.trim();

  const out = payload.output;
  if (Array.isArray(out)) {
    const parts: string[] = [];
    for (const item of out) {
      const content = item?.content;
      if (Array.isArray(content)) {
        for (const c of content) {
          if (c?.type === "output_text" && typeof c?.text === "string") parts.push(c.text);
        }
      }
    }
    return parts.join("\n").trim();
  }
  return "";
}

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({}));
    const message = String(body?.message || "").trim();
    const contextUrl = String(body?.context_url || "").trim();

    if (!message) return NextResponse.json({ error: "Missing message" }, { status: 400 });

    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: "Server misconfigured: OPENAI_API_KEY missing" }, { status: 500 });
    }

    const model = process.env.OPENAI_MODEL || "gpt-4o-mini";

    const instructions =
      "You are Neeraja Khanapure's portfolio assistant. " +
      "Answer like a senior SRE/DevOps/Platform Engineer: practical, production-first, and concise. " +
      "Focus on Kubernetes, Terraform, cloud (AWS/GCP/Azure), Kafka, Python automation, CI/CD, observability, and reliability. " +
      (contextUrl ? `When helpful, refer to the portfolio site at ${contextUrl}. ` : "");

    const resp = await fetch("https://api.openai.com/v1/responses", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model,
        instructions,
        input: message,
      }),
    });

    const payload = await resp.json().catch(() => ({}));

    if (!resp.ok) {
      const msg = payload?.error?.message || payload?.message || "OpenAI API request failed";
      return NextResponse.json({ error: msg, details: payload?.error || payload }, { status: resp.status });
    }

    const text = extractOutputText(payload) || "No response text returned.";
    return NextResponse.json({ reply: text });
  } catch (err: any) {
    return NextResponse.json({ error: err?.message || "Unexpected error" }, { status: 500 });
  }
}
