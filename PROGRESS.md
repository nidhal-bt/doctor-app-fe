# Progress

**Last Updated:** 2026-05-03

## Completed This Session
- Added all shadcn/ui common components to `src/components/ui/`
- Fixed `components.json` aliases to use `@/src/` prefix (tsconfig maps `@/*` → repo root)
- Created `spinner.tsx` manually (Loader2 + animate-spin)
- Created `modal.tsx` as a re-export alias for dialog components
- Wired `<Toaster />` into root layout
- Created `src/context/ThemeContext.tsx` (next-themes wrapper, `useTheme` re-export)
- Wired `ThemeProvider` into root layout with `suppressHydrationWarning`
- Added `next-intl` v4.9.1 to `package.json` and wired plugin in `next.config.ts`
- Created `src/i18n/config.ts` (locales, defaultLocale, `isRTL` helper)
- Created `src/i18n/request.ts` (reads locale from cookie, loads namespaced messages)
- Created message files split by namespace: `messages/{en,fr,ar}/{common,auth,nav,doctor,patient,secretary}.json`
- Updated `src/app/layout.tsx` — reads locale + messages server-side, sets `lang`/`dir` on `<html>`, wraps with `NextIntlClientProvider`
- Created `src/components/LanguageSwitcher.tsx` (sets `locale` cookie via js-cookie, calls `router.refresh()`)

## What's Done

| Task | Status |
|------|--------|
| Common Components (shadcn/ui) | ✅ Done |
| Theme Context | ✅ Done |
| Language Context (next-intl, cookie-based, RTL) | ✅ Done |

## Current Task — Auth Context (`src/context/AuthContext.tsx`)

**Approach:** JWT-based auth stored in an httpOnly cookie (set by API). Context holds the decoded user + role. Auth guard redirects unauthenticated users. Role-based redirect on login.

### Steps
- [ ] Define `User` type and auth state shape
- [ ] Create `AuthContext` + `AuthProvider` (login, logout, register, token refresh)
- [ ] Persist auth token (httpOnly cookie via API route or localStorage fallback)
- [ ] Expose `useAuth` hook
- [ ] Wire `AuthProvider` into root layout
- [ ] Add auth guard for protected routes

## Next Task
Login page + Register page (Authentication flows)
