"use client";

import { useTheme } from "@/src/context/ThemeContext";
import { Moon, Sun } from "lucide-react";

export default function Home() {
  const { theme, setTheme } = useTheme();

  return (
    <div>
      home page
      <button
        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        className="rounded-full p-2 hover:bg-accent transition-colors"
        aria-label="Toggle theme"
      >
        {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
      </button>
    </div>
  );
}
