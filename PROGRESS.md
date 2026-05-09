# Progress

**Last Updated:** 2026-05-09

## Completed This Session
- Restructured `messages/{en,fr,ar}/auth.json` from flat camelCase keys to domain-grouped nested structure
- Convention established: `{domain}.{form}.{field}.{type}.text` (e.g. `login.form.email.label.text`)
- Added translation naming rule to `CLAUDE.md`
- Refactored `src/features/auth/components/login-form.tsx` — replaced `useState` inputs with `InputForm` (react-hook-form + shadcn Form), updated all translation keys
- Added `type` prop to `src/components/input-form.tsx` for password field support
- Created `src/features/auth/actions/login-action.ts` — first server action; calls `loginApi`, sets httpOnly `token` cookie, redirects to `/`
- Converted `src/app/(auth)/login/page.tsx` to Server Component; passes `loginAction` as `onSubmit` prop
- Added Zod schema to `login-form.tsx` via `useLoginSchema` hook + `zodResolver`; validation error messages in EN/AR/FR under `login.form.{field}.error.*`
- Wired sonner toasts in `onSubmit`: `toast.error` on failure (401), `toast.success` on success; translated in all 3 locales under `login.toast.*`
- Fixed TypeScript errors in `src/lib/api/` — `validate` generic was `T extends ZodSchema` (returns schema type, not output); corrected to `S extends ZodType` + `z.infer<S>`; replaced deprecated `ZodSchema` with `ZodType` in both `api-validator.ts` and `api-endpoint.ts`
- Moved File Naming + Translation key rules from `CLAUDE.md` into `ARCHITECTURE.md`; added full API Layer section to `ARCHITECTURE.md`

## What's Done

| Task | Status |
|------|--------|
| Common Components (shadcn/ui) | ✅ Done |
| Theme Context | ✅ Done |
| Language Context (next-intl, cookie-based, RTL) | ✅ Done |
| Auth Context | ✅ Done |
| Env Config (Zod validation) | ✅ Done |
| Login Page (form + server action + cookie) | ✅ Done |
| API Layer (fetch client + endpoint pattern) | ✅ Done |

## Current Task — Auth Guard

**Approach:** Middleware or layout-level server redirect for unauthenticated users. Role-based redirect on login so each role lands on its own dashboard.

### Steps
- [ ] Add auth guard for protected routes
- [ ] Role-based redirect on login

## Next Task
Auth Guard + Role-based redirect on login
