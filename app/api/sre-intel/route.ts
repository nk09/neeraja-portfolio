import { NextResponse } from "next/server";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const SYSTEM_PROMPT = `You are SRE Intel, a production SRE assistant built into Neeraja Khanapure's portfolio.

Give practical, opinionated answers about:
- Kubernetes debugging, upgrades, scaling, RBAC
- Terraform patterns, drift detection, module design
- Kafka reliability, consumer lag, DLQ strategies
- Observability (Prometheus, Grafana, OpenTelemetry, SLO design)
- Cloud reliability engineering (AWS, GCP, Azure)
- CI/CD, incident management, blameless post-mortems

Be specific and production-first. Avoid generic documentation summaries. Give the kind of answer a senior SRE would give to a colleague.`;

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
    const { messages } = (await req.json()) as { messages: Message[] };

    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      return NextResponse.json({
        content: [{ text: "OpenAI API key is missing." }],
      });
    }

    const model = process.env.OPENAI_MODEL || "gpt-4o-mini";

    // Build the input from the last user message
    const lastUserMsg = [...messages].reverse().find((m) => m.role === "user");
    if (!lastUserMsg) {
      return NextResponse.json({
        content: [{ text: "No question received." }],
      });
    }

    // Build conversation context from previous messages
    const conversationContext = messages
      .filter((m) => m.role === "user" || (m.role === "assistant" && messages.indexOf(m) > 0))
      .slice(0, -1) // exclude the last user message (sent as input)
      .map((m) => `${m.role === "user" ? "User" : "Assistant"}: ${m.content}`)
      .join("\n\n");

    const input = conversationContext
      ? `Previous conversation:\n${conversationContext}\n\nNew question:\n${lastUserMsg.content}`
      : lastUserMsg.content;

    const resp = await fetch("https://api.openai.com/v1/responses", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model,
        instructions: SYSTEM_PROMPT,
        input,
      }),
    });

    const payload = await resp.json().catch(() => ({}));

    if (!resp.ok) {
      const msg = payload?.error?.message || "OpenAI API request failed";
      console.error("SRE Intel API error:", msg);
      return NextResponse.json({
        content: [{ text: `AI service error: ${msg}` }],
      });
    }

    const text = extractOutputText(payload) || "No response generated.";
    return NextResponse.json({ content: [{ text }] });
  } catch (error) {
    console.error("SRE Intel API error:", error);
    return NextResponse.json({
      content: [{ text: "Something went wrong, please try again." }],
    });
  }
}
