import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { question } = await req.json();

    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      return NextResponse.json({
        answer: "Gemini API key not configured."
      });
    }

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          contents: [
            {
              role: "user",
              parts: [
                {
                  text: `You are SRE Intel, a production SRE assistant.

Give practical answers for:
- Kubernetes debugging
- Terraform patterns
- Kafka reliability
- Observability (Prometheus, Grafana)
- Cloud reliability engineering

Avoid generic explanations. Give practical, opinionated answers like a senior SRE.

Question:
${question}`
                }
              ]
            }
          ]
        })
      }
    );

    const data = await response.json();

    const answer =
      data?.candidates?.[0]?.content?.parts?.[0]?.text ||
      "No response generated.";

    return NextResponse.json({ answer });
  } catch (error) {
    console.error("SRE Intel error:", error);

    return NextResponse.json({
      answer: "Something went wrong while generating the response."
    });
  }
}
