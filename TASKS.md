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
- Created `src/components/icons.tsx` — centralized lucide-react icon map
- Created `src/components/password-input.tsx` — forwardRef input with show/hide toggle
- Moved `input-form.tsx` → `src/components/form/input-form.tsx`; fixed relative imports
- Created `src/components/form/password-input-form.tsx` — FormField wrapper for PasswordInput
- Created `src/components/form/phone-input-form.tsx` — FormField wrapper for PhoneInput
- Created `src/components/phone-input.tsx` — country-selector phone input (react-phone-number-input)
- Added shadcn `command` and `scroll-area` components
- Created full signup flow: `signup-form.tsx`, `signup-api.ts`, `signup-action.ts`, `register/page.tsx`
- Added `register.*` translation keys to all 3 locales in `auth.json`
- Updated `login-form.tsx` to use `PasswordInputForm` for password field
- Updated `signup-form.tsx` to use `PasswordInputForm` + `PhoneInputForm`
