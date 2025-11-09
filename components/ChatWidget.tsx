"use client";
import React from "react";

export default function ChatWidget() {
  const [open, setOpen] = React.useState(false);
  const [input, setInput] = React.useState("");
  const [messages, setMessages] = React.useState<{role: 'user'|'ai', text: string}[]>([
    { role: "ai", text: "Hi! I’m Neeraja’s AI. Ask about DevOps, SRE, or projects." }
  ]);

  const onSend = () => {
    const q = input.trim();
    if (!q) return;
    setMessages(m => [...m, { role: "user", text: q }]);
    setInput("");

    const reply = q.toLowerCase().includes("prometheus")
      ? "Neeraja migrated monitoring to Prometheus + Grafana with high-signal alerting. Check the Projects section for details."
      : q.toLowerCase().includes("kubernetes")
      ? "Strong hands-on with EKS/GKE, GitOps, canary, and autoscaling. Peek Skills + Projects."
      : "Got it! Explore the homepage sections — or ask a specific question (e.g., 'SLOs', 'OpenTelemetry', 'CI/CD').";

    setTimeout(() => setMessages(m => [...m, { role: "ai", text: reply }]), 400);
  };

  return (
    <>
      <button onClick={() => setOpen(true)} className="fixed bottom-6 right-6 z-40 rounded-full px-4 py-3 bg-indigo-600 hover:bg-indigo-500 shadow-lg shadow-indigo-900/40">
        Ask Neeraja AI
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/40 p-4">
          <div className="w-full max-w-lg glass rounded-2xl p-4 sm:p-6">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-lg font-semibold">Ask Neeraja AI</h3>
              <button onClick={() => setOpen(false)} className="text-slate-300 hover:text-white">✕</button>
            </div>
            <div className="h-72 overflow-y-auto space-y-2 mb-3 pr-2">
              {messages.map((m, i) => (
                <div key={i} className={m.role === "ai" ? "text-sm text-indigo-200" : "text-sm text-slate-200 text-right"}>
                  <span className="inline-block px-3 py-2 rounded-xl bg-white/10">{m.text}</span>
                </div>
              ))}
            </div>
            <div className="flex gap-2">
              <input className="flex-1 rounded-xl bg-white/10 border border-white/10 px-3 py-2 outline-none"
                     placeholder="Type a question…" value={input}
                     onChange={e => setInput(e.target.value)}
                     onKeyDown={e => (e.key === "Enter" ? onSend() : null)} />
              <button onClick={onSend} className="rounded-xl px-3 py-2 bg-indigo-600 hover:bg-indigo-500">Send</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
