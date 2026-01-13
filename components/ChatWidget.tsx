"use client";
import React from "react";

type Msg = { role: "user" | "ai"; text: string };

export default function ChatWidget() {
  const [open, setOpen] = React.useState(false);
  const [input, setInput] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [messages, setMessages] = React.useState<Msg[]>([
    {
      role: "ai",
      text:
        "Hi — I’m Neeraja’s AI. Ask me about Kubernetes, Terraform, Kafka, Python automation, cloud, CI/CD, or my projects. " +
        "Tip: ask for a troubleshooting playbook or design tradeoffs."
    },
  ]);

  async function onSend() {
    const q = input.trim();
    if (!q || loading) return;

    setMessages((m) => [...m, { role: "user", text: q }]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: q, context_url: "https://neeraja-portfolio-09.vercel.app" }),
      });

      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        const err = data?.error || `Request failed (status ${res.status})`;
        setMessages((m) => [...m, { role: "ai", text: `I couldn't answer right now: ${err}` }]);
      } else {
        setMessages((m) => [...m, { role: "ai", text: data.reply || "No response text returned." }]);
      }
    } catch (e) {
      setMessages((m) => [
        ...m,
        {
          role: "ai",
          text:
            "Network error calling /api/ask. If you're running locally, ensure OPENAI_API_KEY is set and the dev server is running.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <button
        onClick={() => setOpen((v) => !v)}
        className="fixed bottom-6 right-6 z-50 rounded-full px-4 py-3 bg-indigo-600 hover:bg-indigo-500 shadow-lg"
      >
        Ask Neeraja AI
      </button>

      {open && (
        <div className="fixed bottom-24 right-6 z-50 w-[360px] max-w-[92vw] glass rounded-2xl p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="font-semibold text-slate-200">Neeraja AI</div>
            <button className="text-slate-300 hover:text-white" onClick={() => setOpen(false)}>
              ✕
            </button>
          </div>

          <div className="h-64 overflow-auto space-y-3 pr-1">
            {messages.map((m, idx) => (
              <div
                key={idx}
                className={[
                  "rounded-2xl px-3 py-2 text-sm border",
                  m.role === "user"
                    ? "ml-auto bg-indigo-600/30 border-indigo-500/30 text-slate-100"
                    : "bg-white/5 border-white/10 text-slate-100",
                ].join(" ")}
              >
                {m.text}
              </div>
            ))}
            {loading && (
              <div className="rounded-2xl px-3 py-2 text-sm bg-white/5 border border-white/10 text-slate-300">
                Thinking…
              </div>
            )}
          </div>

          <div className="mt-3 flex gap-2">
            <input
              className="flex-1 rounded-xl bg-white/10 border border-white/10 px-3 py-2 outline-none"
              placeholder="Ask a real question…"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => (e.key === "Enter" ? onSend() : null)}
              disabled={loading}
            />
            <button
              onClick={onSend}
              className="rounded-xl px-3 py-2 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-60"
              disabled={loading}
            >
              Send
            </button>
          </div>

          <p className="mt-2 text-xs text-slate-400">
            Uses a server-side API route. Set <span className="text-slate-200">OPENAI_API_KEY</span> in Vercel env vars.
          </p>
        </div>
      )}
    </>
  );
}
