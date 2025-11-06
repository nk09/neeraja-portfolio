import "../styles/globals.css";
import { ThemeProvider } from "next-themes";
import { Analytics } from "@vercel/analytics/react";
import Link from "next/link";
import ThemeToggle from "../components/ThemeToggle";

export const metadata = {
  title: "Neeraja Khanapure — Portfolio",
  description: "Advanced, company-agnostic engineering projects and workflows.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html suppressHydrationWarning>
      <body className="min-h-screen">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <header className="w-full border-b border-gray-200 dark:border-gray-800">
            <div className="max-w-5xl mx-auto py-4 px-4 flex items-center justify-between">
              <Link href="/" className="font-semibold text-lg">
                Neeraja Khanapure
              </Link>
              <nav className="flex gap-4 items-center text-sm">
                <Link href="/projects">Projects</Link>
                <Link href="/workflows">Workflows</Link>
                <Link href="/resources">Resources</Link>
                <Link href="/about">About</Link>
                <ThemeToggle />
              </nav>
            </div>
          </header>
          <main className="max-w-5xl mx-auto px-4 py-10">{children}</main>
          <footer className="max-w-5xl mx-auto px-4 py-10 text-sm opacity-80">
            <p>© {new Date().getFullYear()} Neeraja Khanapure</p>
            <p>Analytics enabled. Contact form available on the About page.</p>
          </footer>
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  );
}
