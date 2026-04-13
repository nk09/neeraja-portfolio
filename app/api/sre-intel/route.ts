import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { question } = await req.json();

    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      return NextResponse.json({
        answer: "Gemini API key missing."
      });
    }

    const res = await fetch(
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

Give practical answers for:
Kubernetes debugging
Terraform patterns
Kafka reliability
Observability (Prometheus, Grafana)
Cloud reliability engineering

Avoid generic explanations.

Question:
${question}`
                }
              ]
            }
          ]
        })
      }
    );

    const data = await res.json();

    const answer =
      data?.candidates?.[0]?.content?.parts?.[0]?.text ||
      "No response generated.";

    return NextResponse.json({ answer });
  } catch (err) {
    console.error(err);

    return NextResponse.json({
      answer: "Something went wrong, please try again."
    });
  }
}
