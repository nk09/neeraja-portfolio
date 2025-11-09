import "./globals.css";
import { Analytics } from "@vercel/analytics/react";
import React from "react";

export const metadata = {
  title: "Neeraja Khanapure | DevOps & AI Engineer",
  description: "Portfolio of Neeraja Khanapure — DevOps, SRE, AI workflows, and cloud projects.",
};

const ThemeScript = () => (
  <script dangerouslySetInnerHTML={{__html: `
    try {
      const saved = localStorage.getItem('theme');
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      const theme = saved || (prefersDark ? 'dark' : 'light');
      document.documentElement.classList.toggle('dark', theme === 'dark');
    } catch {}
  `}} />
);

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="h-full">
      <head>
        <ThemeScript />
      </head>
      <body className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 text-slate-100 antialiased">
        <div className="max-w-6xl mx-auto px-4 py-8">{children}</div>
        <Analytics />
      </body>
    </html>
  );
}
