# Archive

## 1. Common Components (shadcn/ui) — 2026-04-26

Added all 9 common UI components via the shadcn CLI plus 2 manual files.

**Components added to `src/components/ui/`:**
- button, input, dialog, sonner, card, badge, avatar, select, skeleton (via CLI)
- `spinner.tsx` — manual, uses `lucide-react` `Loader2` with `animate-spin`
- `modal.tsx` — re-export of dialog with `Modal*` aliases to match PROJECT.md naming

**Key decisions:**
- Fixed `components.json` aliases from `@/components` → `@/src/components` (and same for lib, hooks, ui) because `tsconfig.json` maps `@/*` → `./` (repo root), so without `src/` the CLI would write to non-existent root-level dirs
- `modal.tsx` is a zero-cost re-export of `dialog.tsx` — `Dialog` is the source of truth, `Modal` is an alias
- `Toaster` (sonner) wired into `src/app/layout.tsx` as the global toast provider

## 2. Theme Context — 2026-04-26

Added `src/context/ThemeContext.tsx` with light / dark / system support and localStorage persistence.

**What was built:**
- `ThemeProvider` — thin wrapper around `next-themes` `ThemeProvider` with fixed app config (`attribute="class"`, `defaultTheme="system"`, `enableSystem`, `disableTransitionOnChange`)
- `useTheme` — re-export of `next-themes` `useTheme` so all consumers import from `@/src/context/ThemeContext`
- Wired `ThemeProvider` into `src/app/layout.tsx`, wrapping `{children}` and `<Toaster />`
- Added `suppressHydrationWarning` to `<html>` to silence next-themes SSR class mismatch warning

**Key decisions:**
- Used `next-themes` directly (already installed) instead of rolling custom localStorage logic — it handles SSR hydration, system preference, and persistence out of the box
- `attribute="class"` matches the `.dark` class strategy already in `globals.css`
- Wrapper pattern keeps callers isolated from next-themes internals; config lives in one place
