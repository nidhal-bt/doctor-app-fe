# Tasks

## Active Tasks

### Auth Guard
- [ ] Add auth guard for protected routes (middleware or layout-level redirect for unauthenticated users)
- [ ] Role-based redirect on login (doctor → /doctor, patient → /patient, secretary → /secretary)

---

## Completed This Session ✅

- Restructured `messages/{en,fr,ar}/auth.json` to domain-grouped nested keys (`login.form.email.label.text`)
- Added translation key naming convention to `CLAUDE.md`
- Refactored `login-form.tsx` to use `InputForm` (react-hook-form) and updated all translation keys
- Added `type` prop to `input-form.tsx` for password field support
- Created `src/features/auth/actions/login-action.ts` — first server action; sets httpOnly `token` cookie and redirects
- Converted `login/page.tsx` to Server Component; wired `loginAction` as `onSubmit`
- Added Zod validation schema to `login-form.tsx` (`useLoginSchema` hook + `zodResolver`); validation error messages translated in all 3 locales
- Added sonner toast notifications to `onSubmit` — `toast.error` on 401, `toast.success` on 200; toast messages translated in all 3 locales under `login.toast.*`
- Fixed TypeScript errors in `src/lib/api/` — corrected `validate` generic signature and replaced deprecated `ZodSchema` with `ZodType` (Zod v4)
- Moved File Naming + Translation rules into `ARCHITECTURE.md`; cleaned `CLAUDE.md`
