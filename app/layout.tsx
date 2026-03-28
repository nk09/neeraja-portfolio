import type { Metadata } from "next";
import Link from "next/link";
import "../styles/globals.css";

export const metadata: Metadata = {
  title: "Neeraja Khanapure | SRE · Platform · DevOps",
  description:
    "Production-grade platforms on AWS/GCP/Azure. Kubernetes reliability, Terraform, Kafka, observability. Deep dives, patterns, and a live SRE assistant.",
};

const NAV_LINKS = [
  { href: "/thinking", label: "Thinking" },
  { href: "/workflows", label: "Workflows" },
  { href: "/insights", label: "Insights" },
  { href: "/engagement", label: "Engagement" },
  { href: "/resources", label: "Resources" },
  { href: "/sre-intel", label: "SRE Intel ✦" },
];

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        {/* Custom cursor — dot + trailing ring */}
        <div className="cursor" id="nk-cursor" />
        <div className="cursor-ring" id="nk-cursor-ring" />

        {/* Nav */}
        <nav className="nav">
          <Link href="/" className="nav-logo">NK//</Link>
          <ul className="nav-links">
            {NAV_LINKS.map((l) => (
              <li key={l.href}>
                <Link href={l.href}>{l.label}</Link>
              </li>
            ))}
          </ul>
          {/*
            Resume: place your CV at public/resume.pdf in the repo root.
            Vercel serves public/* at the root URL automatically.
            If no PDF exists yet, the link opens a 404 — add the file to fix.
          */}
          <a className="nav-cta" href="/resume.pdf" target="_blank" rel="noopener noreferrer">
            Resume ↗
          </a>
        </nav>

        {children}

        <footer>
          <span>© 2025 Neeraja Khanapure</span>
          <span>SRE · Platform · DevOps</span>
        </footer>

        {/* Cursor JS — inline so it runs immediately after hydration */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
(function() {
  var dot = document.getElementById('nk-cursor');
  var ring = document.getElementById('nk-cursor-ring');
  if (!dot || !ring) return;
  var mx = 0, my = 0, rx = 0, ry = 0, raf = null;

  document.addEventListener('mousemove', function(e) {
    mx = e.clientX; my = e.clientY;
    dot.style.transform = 'translate(' + (mx - 4) + 'px,' + (my - 4) + 'px)';
    if (!raf) raf = requestAnimationFrame(tick);
  });

  function tick() {
    raf = null;
    rx += (mx - rx) * 0.16;
    ry += (my - ry) * 0.16;
    ring.style.transform = 'translate(' + (rx - 17) + 'px,' + (ry - 17) + 'px)';
    if (Math.abs(mx - rx) > 0.4 || Math.abs(my - ry) > 0.4) raf = requestAnimationFrame(tick);
  }

  var sel = 'a,button,[onclick],.sc,.case-card,.featured-card,.signal-card,.cc,.sug-btn,.piece-related-link,.str-card,.oss-item';
  document.addEventListener('mouseover', function(e) {
    if (e.target && e.target.closest && e.target.closest(sel)) ring.classList.add('hovered');
  });
  document.addEventListener('mouseout', function(e) {
    if (e.target && e.target.closest && e.target.closest(sel)) ring.classList.remove('hovered');
  });
  document.addEventListener('mouseleave', function() { dot.style.opacity='0'; ring.style.opacity='0'; });
  document.addEventListener('mouseenter', function() { dot.style.opacity='1'; ring.style.opacity='1'; });
})();
`,
          }}
        />
      </body>
    </html>
  );
}
