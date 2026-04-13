import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { messages = [{ role: "user", content: (await req.json()).message }] } = await req.json();

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: `You are SRE Intel, a production SRE assistant.
Give practical answers for Kubernetes, Terraform, Kafka, observability and reliability engineering.
Avoid generic explanations.

Question:
${message}`
                }
              ]
            }
          ]
        })
      }
    );

    const data = await response.json();

    const reply =
      data.candidates?.[0]?.content?.parts?.[0]?.text ||
      "No response generated.";

    return NextResponse.json({ reply });

  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "SRE Intel failed" },
      { status: 500 }
    );
  }
}
