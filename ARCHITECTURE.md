# ARCHITECTURE.md

## Tech Stack

| Layer | Choice |
|-------|--------|
| Framework | Next.js (App Router) |
| Language | TypeScript (strict mode) |
| Styling | Tailwind CSS v4 (CSS-first config, no `tailwind.config.js`) |
| Fonts | Geist via `next/font/google` — CSS vars `--font-geist-sans` / `--font-geist-mono` |
| State | Context API (auth, theme, language) + Zustand (small client features) |
| Server state | TanStack Query (dashboard pages only) |
| HTTP client | Custom fetch client — `src/lib/api/` (see `.claude/API.md`) |
| Rendering | SSG, ISR, SSR, PPR, Streaming — chosen per page (see table below) |
| Path alias | `@/*` → repo root |

---

## Rendering Strategy

| Page | Strategy | Notes |
|------|----------|-------|
| Home / About / FAQ / Pricing | SSG | Static, rarely changes |
| Doctors listing | ISR | Revalidate every 5 min |
| Doctor profile | ISR + PPR | Static shell + dynamic availability slots |
| Auth pages | SSR | Minimal, no heavy data |
| Patient dashboard | SSR + React Query | Initial SSR, then client interactivity |
| Doctor dashboard | SSR + React Query | Initial SSR, then client interactivity |
| Secretary dashboard | SSR + React Query | Initial SSR, then client interactivity |

---

## Folder Structure

See `.claude/PROJECT.md` for the full annotated tree and feature folder examples.

Quick layout:

```
src/
├── app/          # Next.js routes (App Router)
├── components/   # ui/ · layout/ · shared/
├── features/     # auth/ · appointments/ · doctors/ · patients/ · secretaries/ · availability/
├── context/      # ThemeContext · LanguageContext · AuthContext
├── hooks/        # Shared custom hooks
├── lib/          # api/ (fetch client) · auth.ts
├── config/       # env.ts (Zod-validated env vars)
├── types/        # Shared TypeScript interfaces
└── constants/    # routes · enums · config
```

---

## Feature Folder Pattern

Each feature under `src/features/<name>/` is self-contained:

| Subfolder | Contents |
|-----------|----------|
| `api/` | `ApiEndpoint` instances — no React hooks |
| `hooks/` | `useQuery` / `useMutation` wrappers |
| `types/` | Feature-specific interfaces |
| `schemas/` | Zod validation schemas |
| `utils/` | Feature-specific helpers |

**Rule:** Server components call `api/` directly. Client components go through `hooks/`. Never import a hook in a server component.

---

## API Layer

All HTTP calls go through `src/lib/api/`. See `.claude/API.md` for usage examples.

| File | Role |
|------|------|
| `fetch-client.ts` | Raw `fetch` wrapper — builds URL + query params, sets headers, throws `ApiError` on non-2xx |
| `api-error.ts` | `ApiError extends Error` with `statusCode`, `message`, `path` |
| `api-validator.ts` | `validate<S>(data, schema, label)` — Zod-parses unknown data, throws on failure |
| `api-endpoint.ts` | `ApiEndpoint` class — ties schema + transform into a typed, callable endpoint |

### Rules

- `bodySchema` — optional; omit for GET. When present, body is Zod-validated before the request is sent.
- `responseSchema` — required; response is always validated after receiving.
- `transform` — required; maps raw response to domain type (rename snake_case → camelCase here).
- Errors surface as `ApiError`; catch them in server actions.

---

## Styling Rules

- Tailwind utility classes only — no CSS modules.
- Global theme tokens (`--background`, `--foreground`, etc.) live in `app/globals.css` under `@theme inline`.
- Dark mode via `prefers-color-scheme` — no JS toggle for base theme.
- Tailwind v4 configured via `@import "tailwindcss"` in `globals.css`; no `tailwind.config.js`.

---

## Component Rules

- Default to **Server Components**. Add `"use client"` only for event handlers, hooks, or browser APIs.
- Keep `"use client"` boundaries as deep in the tree as possible.

---

## File Naming

All file and folder names must be **lowercase with hyphens** (kebab-case).

- ✅ `login-form.tsx`, `auth-context.tsx`, `api-call.ts`
- ❌ `LoginForm.tsx`, `AuthContext.tsx`, `apiCall.ts`

---

## Translations

Pattern: `{domain}.{context}.{field}.{type}.text` — field name always before type.

- ✅ `login.form.email.label.text` · `login.form.email.placeholder.text`
- ❌ `login.form.label.email.text` — type must not precede field name

Message files: `messages/{locale}/{domain}.json` with nested objects matching the dot-path.
