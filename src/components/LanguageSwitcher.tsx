"use client";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { useLocale } from "next-intl";

const LANGUAGES = [
  { code: "en", label: "English" },
  { code: "fr", label: "Français" },
  { code: "ar", label: "العربية" },
];

export function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();

  function handleChange(e: React.ChangeEvent<HTMLSelectElement>) {
    Cookies.set("locale", e.target.value, { expires: 365 });
    router.refresh();
  }

  return (
    <select value={locale} onChange={handleChange} aria-label="Select language">
      {LANGUAGES.map(({ code, label }) => (
        <option key={code} value={code}>
          {label}
        </option>
      ))}
    </select>
  );
}
