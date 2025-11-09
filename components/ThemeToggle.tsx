"use client";
import React from "react";

export default function ThemeToggle() {
  const [dark, setDark] = React.useState(
    typeof document !== "undefined" ? document.documentElement.classList.contains("dark") : true
  );
  const toggle = () => {
    const next = !dark;
    setDark(next);
    if (typeof document !== "undefined") {
      document.documentElement.classList.toggle("dark", next);
    }
    try { localStorage.setItem("theme", next ? "dark" : "light"); } catch {}
  };
  return (
    <button onClick={toggle} className="rounded-xl px-3 py-2 bg-white/10 hover:bg-white/15 border border-white/10 transition" aria-label="Toggle theme">
      {dark ? "🌙 Dark" : "☀️ Light"}
    </button>
  );
}
