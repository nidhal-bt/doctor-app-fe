# Archive

## 9. Signup Flow & Form Component Library — 2026-05-10

**What was built:**
- `src/components/icons.tsx` — centralized lucide-react icon map; provides `Icons.view` (Eye) and `Icons.hide` (EyeOff) used by PasswordInput; follows shadcn icon pattern
- `src/components/password-input.tsx` — forwardRef wrapper around `Input` with show/hide toggle button; imports `InputProps` from `ui/input`; toggle disabled when field is empty or disabled
- `src/components/ui/input.tsx` — added `export type InputProps = React.ComponentProps<"input">` so consumers can import the type directly
- `src/components/form/` — new directory grouping all react-hook-form field wrappers; `input-form.tsx` moved here (was at root), relative imports corrected to `../ui/*`
- `src/components/form/password-input-form.tsx` — `FormField` wrapper for `PasswordInput`; same props shape as `InputForm` minus `type`
- `src/components/form/phone-input-form.tsx` — `FormField` wrapper for `PhoneInput`; passes `field.onChange` directly (RPNInput.Value is a string, compatible with react-hook-form)
- `src/components/phone-input.tsx` — full country-selector phone input using `react-phone-number-input`; country dropdown built from shadcn `Command` + `Popover` + `ScrollArea`; renders flags via `react-phone-number-input/flags`
- shadcn components added: `command`, `scroll-area` (popover already existed)
- `src/features/auth/api/signup-api.ts` — `ApiEndpoint` for POST `/auth/register`; body schema includes firstName, lastName, email, password, phone
- `src/features/auth/actions/signup-action.ts` — server action; calls `signupApi.execute()`, sets httpOnly `token` cookie, redirects to `/`
- `src/features/auth/components/signup-form.tsx` — Zod schema via `useSignupSchema` hook; `refine` checks `confirmPassword === password`; uses `InputForm`, `PasswordInputForm`, `PhoneInputForm`
- `src/app/(auth)/register/page.tsx` — Server Component passing `signupAction` as `onSignup` prop
- Updated `messages/{en,fr,ar}/auth.json` with all `register.*` translation keys (labels, placeholders, errors, toasts)
- Updated `login-form.tsx` and `signup-form.tsx` to use `PasswordInputForm` for password fields

**Key decisions:**
- All form-field wrappers live in `src/components/form/` — colocates them, separates from raw UI primitives in `ui/`
- `tsconfig.json` maps `@/*` → `./` (repo root), so all imports use `@/src/components/...` — enforced consistently across all new files
- `PhoneInputForm` passes `field.onChange` directly without wrapping — `RPNInput.Value` is a branded string, compatible with react-hook-form's `onChange` which accepts any value
- `confirmPassword` is stripped before calling `signupApi` via destructuring (`const { confirmPassword: _, ...apiData } = data`) — never sent to the server
- Icons centralized in `icons.tsx` following shadcn convention — one import for all icon usage across the app

## 8. API Layer — 2026-05-09

**What was built:**
- `src/lib/api/fetch-client.ts` — `FetchClient.request()` raw fetch wrapper; builds URL with query params, sets `Content-Type: application/json`, throws `ApiError` on non-2xx
- `src/lib/api/api-error.ts` — `ApiError extends Error` with `statusCode`, `message`, `path`
- `src/lib/api/api-validator.ts` — `validate<S extends ZodType>(data, schema, label): z.infer<S>`; logs in non-production, throws on failure
- `src/lib/api/api-endpoint.ts` — `ApiEndpoint<TResponse, TOutput, TBody>` class; `execute()` validates body before send, validates response after, runs `transform` to convert raw → output type
- Pattern established: define `bodySchema` + `responseSchema` (Zod) + `transform` once per endpoint; call `execute()` anywhere with full type safety

**Fixed during this session:**
- `validate` generic was `T extends ZodSchema` making `schema: ZodSchema<T>` require a schema-of-schemas and `return result.data` typed as `ZodSchema` not the parsed value; corrected to `S extends ZodType` + `: z.infer<S>`
- Replaced deprecated `ZodSchema` (Zod v3 name) with `ZodType` throughout, since project uses Zod v4

**Key decisions:**
- `FetchClient.request()` returns `Promise<unknown>` intentionally — the caller always passes the result to `validate()`, so `unknown` is the right boundary type
- `transform` is required on every endpoint, not optional — it forces explicit snake_case → camelCase mapping at the API boundary so domain types are always camelCase
- `bodySchema` is optional to support GET endpoints (no body), but when present the body is validated client-side before the request is sent

## 7. Login Form Validation & Toast Notifications — 2026-05-06

**What was built:**
- Added Zod schema to `src/features/auth/components/login-form.tsx` via a `useLoginSchema` hook; the hook calls `useTranslations("auth")` so error messages are localized at runtime
- `LoginFormData` type is now inferred from the schema via `z.infer<...>` — type and validation stay in sync automatically
- Wired `zodResolver(schema)` into `useForm` — validation runs on submit, then on change after first attempt
- Added validation error translation keys to all three locales under `login.form.{field}.error.{rule}.text`:
  - email: `required`, `invalid`
  - password: `required`, `minLength` (8 chars)
- Updated `onSubmit` to use sonner toasts: `toast.error` on failure with early `return`, `toast.success` on success
- Added toast translation keys to all three locales under `login.toast.success.text` and `login.toast.error.unauthorized.text`

**Key decisions:**
- Schema built inside a hook (`useLoginSchema`) rather than as a module-level constant so `useTranslations` can run inside it — Zod `min`/`email` messages are passed at schema-construction time
- `login.toast.*` sits alongside `login.form.*` in the JSON so future toasts (e.g. account-locked, network error) can be added without restructuring
- Early `return` after `toast.error` is the guard — no risk of success toast firing on the same render

## 6. Login Form, Translations & Server Action — 2026-05-05

**What was built:**
- Restructured `messages/{en,fr,ar}/auth.json` from flat camelCase keys to domain-grouped nested structure; convention: `{domain}.{form}.{field}.{type}.text` (e.g. `login.form.email.label.text` — field name before type)
- Added translation key naming rule to `CLAUDE.md` with good/bad examples
- Refactored `src/features/auth/components/login-form.tsx` — replaced manual `useState` inputs with `InputForm` (react-hook-form + shadcn `Form`); updated all translation keys to new convention
- Added `type?: React.HTMLInputTypeAttribute` prop to `src/components/input-form.tsx` so password fields render correctly
- Created `src/features/auth/actions/login-action.ts` — first server action; calls `loginApi.execute()`, sets `token` as httpOnly cookie via `next/headers` (`sameSite: lax`, `secure` in production), then `redirect("/")`
- Converted `src/app/(auth)/login/page.tsx` from `"use client"` to a Server Component; passes `loginAction` directly as `onSubmit` prop to `LoginForm`
- Widened `LoginFormProps.onSubmit` type to `Promise<void> | void` to accept async server actions

**Key decisions:**
- Translation keys group by field first, then by type — `login.form.email.label.text` not `login.form.label.email.text` — so label and placeholder for the same field live under the same node
- Server action instead of client-side fetch: token is set httpOnly server-side, never touches client JS; matches how `getServerUser()` reads it
- Page as Server Component passing server action as prop — supported natively by Next.js App Router
- `onSubmit` type widened to `Promise<void> | void` rather than just `Promise<void>` so sync stubs still work in tests

**Bug noted (not fixed):** `src/features/auth/api/login-api.ts:32` — `token_type` is set to `raw.access_token` instead of `raw.token_type` (copy-paste error); not blocking since only `access_token` is used.

## 5. Env Config (Zod validation) — 2026-05-04

Added centralized environment variable validation via Zod in `src/config/`.

**What was built:**
- `src/config/env.ts` — Zod schema for `NEXT_PUBLIC_API_URL`; uses `safeParse` and throws a formatted error at module-load time if any var is missing or invalid
- `.env.local` — local dev defaults (`NEXT_PUBLIC_API_URL=http://localhost:8000/api`); already gitignored by Next.js
- `src/lib/auth.ts` updated — replaced `process.env.API_URL` with `env.NEXT_PUBLIC_API_URL` from the new config
- Added `zod` 4.4.3 as a direct dependency (was previously only a transitive dep of shadcn/ui)

**Key decisions:**
- No `"use client"` directive on `env.ts` — `NEXT_PUBLIC_` vars are inlined by Next.js at build time so the file works identically on server and client
- Module-level throw means misconfigured deployments fail immediately at startup/build rather than at request time
- `safeParse` + manual `JSON.stringify` gives a readable error instead of a raw Zod stack trace
- Keeping a single schema file for all env vars; add new vars here as they're needed

## 4. Auth Context — 2026-05-04

Added authentication context with server-side user hydration.

**What was built:**
- `src/types/user.ts` — `Role` union (`doctor | patient | secretary`) + `User` interface
- `src/context/AuthContext.tsx` — `AuthProvider` accepts `initialUser` from the server, holds user state, exposes `logout` (clears js-cookie token + redirects to `/`); `useAuth` hook with guard
- `src/lib/auth.ts` — `getServerUser()` server-only utility: reads `token` httpOnly cookie, calls `/auth/me`, returns `User | null`
- Wired `AuthProvider` into `src/app/layout.tsx` with `initialUser` from `getServerUser()`

**Key decisions:**
- Server-side user hydration via `getServerUser()` avoids a client-side loading flash on first render; the context just holds the already-fetched user
- `initialUser` prop pattern keeps `AuthProvider` a pure client component with no async logic inside
- Token managed exclusively by the API (httpOnly cookie) — the client only removes it on logout via `js-cookie`; no token parsing in the frontend
- `login` / `register` actions will live in the auth pages and call the API directly; context only needs to hold state and expose `logout`

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

## 3. Language Context (next-intl) — 2026-05-03

Added full i18n support using `next-intl` v4 with cookie-based locale switching and RTL for Arabic.

**What was built:**
- `src/i18n/config.ts` — `locales` array (`en`, `fr`, `ar`), `defaultLocale`, `isRTL()` helper
- `src/i18n/request.ts` — `getRequestConfig` reads `locale` cookie, validates it, then dynamically imports each namespace JSON for that locale
- `messages/{en,fr,ar}/{common,auth,nav,doctor,patient,secretary}.json` — namespaced message files (6 namespaces × 3 locales)
- `src/components/LanguageSwitcher.tsx` — client component; writes `locale` cookie via `js-cookie`, calls `router.refresh()` to trigger server re-render with new locale
- Updated `src/app/layout.tsx` — calls `getLocale()` + `getMessages()` server-side, sets `lang` and `dir` on `<html>`, wraps tree with `NextIntlClientProvider`
- `next.config.ts` — wrapped with `createNextIntlPlugin("./src/i18n/request.ts")`

**Key decisions:**
- Cookie-based locale (no URL prefix) — avoids URL changes and simplifies navigation
- `dir` set on `<html>` server-side from `isRTL(locale)` — no client flash for RTL
- Messages split by namespace (not one big file per locale) to allow tree-shaking and easier maintenance
- `js-cookie` used in the switcher for a clean one-liner; locale validated in `request.ts` against the `locales` array to prevent invalid values

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
