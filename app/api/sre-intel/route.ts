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

export async function POST(req: Request) {
  try {
    const { messages } = (await req.json()) as { messages: Message[] };

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json({
        content: [{ text: "Gemini API key is missing." }],
      });
    }

    // Build Gemini contents array from conversation history.
    // Skip the initial assistant greeting (first message) and prepend the
    // system prompt to the first user message so Gemini gets context.
    const contents: { role: string; parts: { text: string }[] }[] = [];

    for (const msg of messages) {
      // Skip the opening assistant greeting — it's UI-only
      if (msg.role === "assistant" && contents.length === 0) continue;

      const geminiRole = msg.role === "user" ? "user" : "model";
      let text = msg.content;

      // Prepend system prompt to the first user turn
      if (geminiRole === "user" && contents.length === 0) {
        text = `${SYSTEM_PROMPT}\n\nQuestion:\n${text}`;
      }

      contents.push({ role: geminiRole, parts: [{ text }] });
    }

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.7-flash:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ contents }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      console.error("Gemini API error:", JSON.stringify(data));
      return NextResponse.json({
        content: [{ text: `AI service error: ${data?.error?.message || response.statusText || "unknown"}. Status: ${response.status}` }],
      });
    }

    const answer =
      data?.candidates?.[0]?.content?.parts?.[0]?.text ??
      "No response generated.";

    return NextResponse.json({ content: [{ text: answer }] });
  } catch (error) {
    console.error("SRE Intel API error:", error);
    return NextResponse.json({
      content: [{ text: "Something went wrong, please try again." }],
    });
  }
}
