# Progress

**Last Updated:** 2026-05-17

## What's Done

| Task | Status |
|------|--------|
| Common Components (shadcn/ui) | ✅ Done |
| Theme Context | ✅ Done |
| Language Context (next-intl, cookie-based, RTL) | ✅ Done |
| Auth Context (AuthProvider, useAuth, logout) | ✅ Done |
| Env Config (Zod validation) | ✅ Done |
| API Layer (FetchClient, ApiEndpoint, ApiValidator, ApiError) | ✅ Done |
| Login Page (form + Zod validation + server action + httpOnly cookie) | ✅ Done |
| Register Page (form + Zod validation + server action + httpOnly cookie) | ✅ Done |
| Form Component Library (InputForm, PasswordInputForm, PhoneInputForm) | ✅ Done |
| Sidebar Layout (SidebarLayout + DashboardLayout) | ✅ Done |
| User Types & Feature Structure (IUser, IUserRole enum) | ✅ Done |
| Routes Constants (APP_ROUTES) | ✅ Done |
| Current User API (GET /auth/me via ApiEndpoint) | ✅ Done |

## Current Task — Auth Guard

**Approach:** Store role in a readable cookie on login; middleware reads token + role cookies to enforce route protection and role-based redirects.

### Steps
- [ ] Store `role` as a readable (non-httpOnly) cookie in `loginAction` + `signupAction`
- [ ] Middleware: token cookie absent + `/d/*` route → redirect to `/login`
- [ ] Middleware: token cookie present + `/login` or `/register` → redirect to role dashboard
- [ ] Update matcher to cover `/d/:path*`, `/login`, `/register`
- [ ] `loginAction` redirect: doctor → `/d/dr`, patient → `/d/pt`, secretary → `/d/sc`
- [ ] `signupAction` redirect: same role-based redirect as login

## Next Task
Doctor Dashboard — navigation, layout, and first dashboard page for the doctor role
