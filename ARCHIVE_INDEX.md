# Archive Index

- [9. Signup Flow & Form Component Library](ARCHIVE.md#9-signup-flow--form-component-library--2026-05-10) — Icons, PasswordInput, PhoneInput, form/ wrappers, signup form + action + API, register translations
- [8. API Layer](ARCHIVE.md#8-api-layer--2026-05-09) — FetchClient + ApiEndpoint + validate + ApiError; ZodType fix; transform enforces camelCase at API boundary
- [7. Login Form Validation & Toast Notifications](ARCHIVE.md#7-login-form-validation--toast-notifications--2026-05-06) — Zod schema via useLoginSchema hook + zodResolver; sonner toasts on success/401; all messages translated in EN/AR/FR
- [6. Login Form, Translations & Server Action](ARCHIVE.md#6-login-form-translations--server-action--2026-05-05) — auth.json restructured to field-first dot-path keys; LoginForm uses InputForm+RHF; loginAction server action sets httpOnly cookie
- [1. Common Components (shadcn/ui)](ARCHIVE.md#1-common-components-shadcnui--2026-04-26) — 9 CLI components + Spinner + Modal re-export; fixed components.json aliases for @/src/ path
- [2. Theme Context](ARCHIVE.md#2-theme-context--2026-04-26) — next-themes wrapper with class strategy; useTheme re-exported from ThemeContext; wired in layout.tsx
- [3. Language Context](ARCHIVE.md#3-language-context-next-intl--2026-05-03) — next-intl v4 cookie-based i18n; 3 locales × 6 namespaces; RTL via isRTL(); LanguageSwitcher with js-cookie
- [4. Auth Context](ARCHIVE.md#4-auth-context--2026-05-04) — AuthProvider with server-side initialUser hydration; useAuth hook; getServerUser() server utility; logout via js-cookie
- [5. Env Config](ARCHIVE.md#5-env-config-zod-validation--2026-05-04) — src/config/env.ts; Zod schema for NEXT_PUBLIC_API_URL; throws at startup on invalid config
