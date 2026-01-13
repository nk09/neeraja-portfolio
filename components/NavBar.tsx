"use client";
import React from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

const links = [
  { href: "/", label: "Home" },
  { href: "/engagement", label: "Engagement" },
  { href: "/open-source", label: "Open Source" },
  { href: "/evidence", label: "Evidence" },
  { href: "/kubernetes", label: "Kubernetes" },
  { href: "/terraform", label: "Terraform" },
  { href: "/kafka", label: "Kafka" },
  { href: "/cloud", label: "Cloud" },
  { href: "/automation", label: "Automation" },
  { href: "/thinking", label: "Thinking" },
];

export default function NavBar() {
  const [open, setOpen] = React.useState(false);

  return (
    <header className="sticky top-0 z-40 mb-8">
      <div className="backdrop-blur supports-[backdrop-filter]:bg-slate-950/50 bg-slate-950/70 border border-white/5 rounded-2xl px-4 py-3">
        <div className="flex items-center justify-between gap-3">
          <Link href="/" className="font-semibold text-slate-200 hover:text-white transition">
            Neeraja Khanapure
          </Link>

          <div className="hidden lg:flex items-center gap-4">
            {links.map((l) => (
              <Link key={l.href} href={l.href} className="text-sm text-slate-300 hover:text-white transition">
                {l.label}
              </Link>
            ))}
            <a
              href="/resume.pdf"
              className="text-sm rounded-xl px-3 py-2 bg-white/10 border border-white/10 hover:bg-white/15 transition"
            >
              Resume
            </a>
          </div>

          <button
            className="lg:hidden inline-flex items-center justify-center rounded-xl px-3 py-2 bg-white/10 border border-white/10 hover:bg-white/15 transition"
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>

        {open && (
          <nav className="lg:hidden mt-3 pt-3 border-t border-white/10 grid grid-cols-2 gap-2">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="text-sm text-slate-200 rounded-xl px-3 py-2 bg-white/5 border border-white/10 hover:bg-white/10 transition"
              >
                {l.label}
              </Link>
            ))}
            <a
              href="/resume.pdf"
              onClick={() => setOpen(false)}
              className="text-sm text-slate-200 rounded-xl px-3 py-2 bg-white/5 border border-white/10 hover:bg-white/10 transition"
            >
              Resume
            </a>
          </nav>
        )}
      </div>
    </header>
  );
}
