"use client";

import { useTheme } from "@/src/context/ThemeContext";
import { Moon, Sun } from "lucide-react";
import { LanguageSwitcher } from "@/src/components/LanguageSwitcher";
import { useTranslations } from "next-intl";

export default function Home() {
  const { theme, setTheme } = useTheme();
  const t = useTranslations("nav");

  return (
    <div>
        {t("home")}
      <LanguageSwitcher />
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
