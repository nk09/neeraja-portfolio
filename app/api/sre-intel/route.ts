import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { question } = await req.json();

    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      return NextResponse.json({
        answer: "Gemini API key is missing."
      });
    }

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
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

Give practical answers about:
- Kubernetes debugging
- Terraform patterns
- Kafka reliability
- Observability (Prometheus, Grafana)
- Cloud reliability engineering

Avoid generic documentation summaries. Provide opinionated production advice.

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

    // Log Gemini errors to Vercel logs
    if (!response.ok) {
      console.error("Gemini API error:", data);
      return NextResponse.json({
        answer: "AI service error. Check server logs."
      });
    }

    const answer =
      data?.candidates?.[0]?.content?.parts?.[0]?.text ??
      "No response generated.";

    return NextResponse.json({ answer });

  } catch (error) {
    console.error("SRE Intel API error:", error);

    return NextResponse.json({
      answer: "Something went wrong, please try again."
    });
  }
}
