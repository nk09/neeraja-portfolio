import type { Metadata } from "next";
import Link from "next/link";
import "../styles/globals.css";

export const metadata: Metadata = {
  title: "Neeraja Khanapure | SRE · Platform · DevOps",
  description:
    "SRE and Platform Engineer working with Kubernetes, Terraform, Kafka, and multi-cloud. Writing about reliability, automation, and what actually breaks in production.",
};

const NAV_LINKS = [
  { href: "/thinking", label: "Thinking" },
  { href: "/workflows", label: "Workflows" },
  { href: "/insights", label: "Insights" },
  { href: "/engagement", label: "Picks" },
  { href: "/resources", label: "Resources" },
  { href: "/sre-intel", label: "SRE Intel ✦" },
];

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        {/* Custom cursor: small warm diamond, scales on hover */}
        <div className="cursor-dot" id="nk-cursor" />

        <nav className="nav">
          <Link href="/" className="nav-logo">Neeraja K.</Link>
          <ul className="nav-links">
            {NAV_LINKS.map((l) => (
              <li key={l.href}>
                <Link href={l.href}>{l.label}</Link>
              </li>
            ))}
          </ul>
          <a className="nav-cta" href="/resume.pdf" target="_blank" rel="noopener noreferrer">
            Resume ↗
          </a>
        </nav>

        {children}

        <footer>
          <span>© 2025 Neeraja Khanapure</span>
          <span>Made with ☀️ · SRE · Platform · DevOps</span>
        </footer>

        <script
          dangerouslySetInnerHTML={{
            __html: `
(function() {
  var dot = document.getElementById('nk-cursor');
  if (!dot) return;
  var mx = 0, my = 0;

  document.addEventListener('mousemove', function(e) {
    mx = e.clientX; my = e.clientY;
    dot.style.transform = 'translate(' + (mx - 5) + 'px,' + (my - 5) + 'px)';
  });

  var sel = 'a,button,[onclick],.skill-card,.article-card,.signal-card,.contact-link,.sug-btn,.content-tile';
  document.addEventListener('mouseover', function(e) {
    if (e.target && e.target.closest && e.target.closest(sel)) dot.classList.add('hovered');
  });
  document.addEventListener('mouseout', function(e) {
    if (e.target && e.target.closest && e.target.closest(sel)) dot.classList.remove('hovered');
  });
  document.addEventListener('mouseleave', function() { dot.style.opacity='0'; });
  document.addEventListener('mouseenter', function() { dot.style.opacity='1'; });
})();
`,
          }}
        />
      </body>
    </html>
  );
}
