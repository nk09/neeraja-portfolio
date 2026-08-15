"use client";

import { useState, useRef, useEffect } from "react";

const SUGGESTIONS = [
  "How do I fix HPA thrashing on EKS?",
  "Terraform drift detection best practices?",
  "Kafka consumer lag, where do I start?",
  "Design an SLO for an API endpoint",
  "OTel vs Prometheus, when to use each?",
  "Safe Kubernetes upgrade checklist",
  "Terraform module guardrails pattern",
  "Kafka DLQ retry strategy",
];

interface Message {
  role: "user" | "assistant";
  content: string;
}

function TypingDots() {
  return (
    <div className="typing-wrap">
      <span className="dot" />
      <span className="dot" />
      <span className="dot" />
    </div>
  );
}

export default function SreIntelPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "Hey, I'm SRE Intel, a production knowledge assistant. Ask me a real question: Kubernetes debugging, Terraform patterns, Kafka reliability, SLO design, cloud HA architecture, or anything in the SRE/platform space. I give specific, opinionated answers, not documentation summaries.",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const msgsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (msgsRef.current) msgsRef.current.scrollTop = msgsRef.current.scrollHeight;
  }, [messages, loading]);

  async function send(text: string) {
    text = text.trim();
    if (!text || loading) return;
    setInput("");
    setLoading(true);

    const next: Message[] = [...messages, { role: "user", content: text }];
    setMessages(next);

    try {
      const res = await fetch("/api/sre-intel", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: next }),
      });
      const data = await res.json();
      const reply = data.content?.[0]?.text ?? "Something went wrong, please try again.";
      setMessages([...next, { role: "assistant", content: reply }]);
    } catch {
      setMessages([...next, { role: "assistant", content: "Connection error, please try again." }]);
    }
    setLoading(false);
  }

  return (
    <main>
      <div className="sre-intel-page">
        <div className="sre-intel-header">
          <div className="sre-intel-header-left">
            <div className="sre-badge">SRE Intel</div>
            <h1 className="sre-intel-h1">Production SRE Knowledge Assistant</h1>
            <p className="sre-intel-tagline">
              Ask production questions. Get opinionated, specific answers, not docs summaries.
              Kubernetes · Terraform · Kafka · Observability · Cloud Reliability.
            </p>
          </div>
          <div className="sre-intel-meta">
            <div className="sre-meta-item">
              <span className="sre-meta-label">Powered by</span>
              <span className="sre-meta-val">Google Gemini</span>
            </div>
            <div className="sre-meta-item">
              <span className="sre-meta-label">Domain</span>
              <span className="sre-meta-val">SRE / Platform / DevOps</span>
            </div>
            <div className="sre-meta-item">
              <span className="sre-meta-label">Style</span>
              <span className="sre-meta-val">Opinionated · Production-first</span>
            </div>
          </div>
        </div>

        <div className="sre-intel-body">
          {/* Chat */}
          <div className="chat-panel">
            <div className="chat-window" ref={msgsRef}>
              {messages.map((m, i) => (
                <div key={i} className={`msg msg-${m.role === "user" ? "user" : "ai"}`}>
                  <div className="bubble">
                    {m.content.split("\n").map((line, j) => (
                      <span key={j}>
                        {line}
                        {j < m.content.split("\n").length - 1 && <br />}
                      </span>
                    ))}
                  </div>
                  <div className="msg-label">{m.role === "user" ? "You" : "SRE Intel"}</div>
                </div>
              ))}
              {loading && (
                <div className="msg msg-ai">
                  <TypingDots />
                  <div className="msg-label">SRE Intel</div>
                </div>
              )}
            </div>
            <div className="chat-bar">
              <input
                className="chat-input"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && send(input)}
                placeholder="Ask a production SRE question..."
              />
              <button className="send-btn" onClick={() => send(input)} disabled={loading || !input.trim()}>
                →
              </button>
            </div>
          </div>

          {/* Sidebar */}
          <div className="sre-sidebar">
            <div className="sidebar-section">
              <div className="sidebar-label">Try asking</div>
              <div className="sug-list">
                {SUGGESTIONS.map((s) => (
                  <button key={s} className="sug-btn" onClick={() => send(s)}>
                    {s}
                  </button>
                ))}
              </div>
            </div>

            <div className="sidebar-section">
              <div className="sidebar-label">Deep dives</div>
              <div className="sidebar-links">
                <a href="/kubernetes" className="sidebar-link">Kubernetes patterns →</a>
                <a href="/terraform" className="sidebar-link">Terraform guardrails →</a>
                <a href="/kafka" className="sidebar-link">Kafka reliability →</a>
                <a href="/cloud" className="sidebar-link">Cloud HA design →</a>
                <a href="/automation" className="sidebar-link">Python automation →</a>
                <a href="/thinking" className="sidebar-link">Engineering judgment →</a>
              </div>
            </div>

            <div className="sidebar-section sidebar-about">
              <div className="sidebar-label">About this tool</div>
              <p className="sidebar-about-text">
                SRE Intel is built by Neeraja Khanapure, a Platform/SRE engineer with
                production experience on EKS/GKE, Terraform, Kafka, and multi-cloud HA systems.
                The assistant reflects real production patterns, not textbook answers.
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
