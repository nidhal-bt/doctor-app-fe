# Progress

**Last Updated:** 2026-05-10

## Completed This Session
- Created `src/components/icons.tsx` — centralized lucide-react icon exports (Eye, EyeOff, Loader2, Sun, Moon, etc.)
- Created `src/components/password-input.tsx` — forwardRef input with show/hide toggle; uses Icons.hide / Icons.view
- Added `InputProps` type export to `src/components/ui/input.tsx`
- Moved `input-form.tsx` to `src/components/form/`; fixed relative imports (`../ui/form`, `../ui/input`)
- Created `src/components/form/password-input-form.tsx` — FormField wrapper for PasswordInput
- Created `src/components/form/phone-input-form.tsx` — FormField wrapper for PhoneInput
- Created `src/components/phone-input.tsx` — full phone number input with country selector (react-phone-number-input + shadcn command/popover/scroll-area)
- Added shadcn `command` and `scroll-area` components via CLI
- Created `src/features/auth/api/signup-api.ts` — ApiEndpoint for POST /auth/register
- Created `src/features/auth/actions/signup-action.ts` — server action; calls signupApi, sets token cookie, redirects
- Created `src/features/auth/components/signup-form.tsx` — Zod schema with refine (confirmPassword match), all 6 fields
- Created `src/app/(auth)/register/page.tsx` — Server Component wiring SignupForm + signupAction
- Added `register.*` translation keys to all 3 locales in `auth.json`
- Updated `login-form.tsx` and `signup-form.tsx` to use `PasswordInputForm` for password fields
- Updated `signup-form.tsx` to use `PhoneInputForm` for phone field

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
| Register Page (form + server action + cookie) | ✅ Done |
| Form Component Library (InputForm, PasswordInputForm, PhoneInputForm) | ✅ Done |

## Current Task — Auth Guard

**Approach:** Middleware or layout-level server redirect for unauthenticated users. Role-based redirect on login so each role lands on its own dashboard.

### Steps
- [ ] Add auth guard for protected routes
- [ ] Role-based redirect on login

## Next Task
Auth Guard + Role-based redirect on login
