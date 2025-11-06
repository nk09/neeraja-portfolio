"use client";
import { useTheme } from "next-themes";
export default function ThemeToggle() {
  const { theme, setTheme, systemTheme } = useTheme();
  const current = theme === "system" ? systemTheme : theme;
  return (
    <button onClick={() => setTheme(current === "dark" ? "light" : "dark")}>
      {current === "dark" ? "☀️" : "🌙"}
    </button>
  );
}