# Doctor Appointment Platform — Folder Structure 


## URL Map

```
# d = dashboard, dr = doctor, pt = patient, sc = secretary

/                       → Home
/doctors                → Doctors listing (public)
/doctors/dr-amira       → Doctor profile (public)
/about                  → About
/faq                    → FAQ
/pricing                → Pricing
/sign-in                → Sign in (full page)
/register               → Register (full page)
/forgot-password        → Forgot password
/reset-password         → Reset password
/secretary/register     → Secretary invitation register

/d/dr                   → Doctor dashboard
/d/dr/appts             → Doctor appointments
/d/dr/availability      → Doctor availability
/d/dr/patients          → Doctor patients
/d/dr/secretaries       → Doctor secretaries

/d/pt                   → Patient dashboard
/d/pt/appts             → Patient appointments
/d/pt/book              → Book appointment (doctor listing + filter)

/d/sc                   → Secretary dashboard
/d/sc/appts             → Secretary appointments
/d/sc/patients          → Secretary patients

/d/profile              → Profile (shared)
/d/settings             → Settings (shared)
/d/billing              → Billing (shared)
```

---

## Folder Structure

```
messages/                                   # Translation files (project root)
├── en/
│   ├── common.json
│   ├── auth.json
│   ├── nav.json
│   ├── doctor.json
│   ├── patient.json
│   └── secretary.json
├── fr/
│   └── (same files)
└── ar/
    └── (same files)

src/
├── app/
│   ├── layout.tsx                          # Root layout: AuthProvider + NextIntlClientProvider
│   ├── page.tsx                            # Redirect or root page
│   │
│   ├── @auth/                              # Parallel route for auth modals
│   │   ├── default.tsx                     # Returns null
│   │   ├── (.)sign-in/page.tsx             # Intercepted sign-in modal
│   │   ├── (.)register/page.tsx            # Intercepted register modal
│   │   └── (.)forgot-password/page.tsx     # Intercepted forgot password modal
│   │
│   ├── (public)/                           # Public pages — Navbar + Footer layout
│   │   ├── layout.tsx
│   │   ├── page.tsx                        # Home → /
│   │   ├── doctors/
│   │   │   ├── page.tsx                    # Doctors listing → /doctors
│   │   │   └── [slug]/page.tsx             # Doctor profile → /doctors/dr-amira
│   │   ├── about/page.tsx                  # About → /about
│   │   ├── faq/page.tsx                    # FAQ → /faq
│   │   └── pricing/page.tsx                # Pricing → /pricing
│   │
│   ├── (auth)/                             # Auth pages — Minimal centered layout
│   │   ├── layout.tsx
│   │   ├── sign-in/page.tsx                # → /sign-in
│   │   ├── register/page.tsx               # → /register
│   │   ├── forgot-password/page.tsx        # → /forgot-password
│   │   ├── reset-password/page.tsx         # → /reset-password
│   │   └── secretary/
│   │       └── register/page.tsx           # → /secretary/register
│   │
│   └── (dashboard)/                        # Dashboard — Shared sidebar + topbar layout
│       ├── layout.tsx
│       └── d/
│           ├── (doctor)/                   # Doctor role layout (fetches doctor data)
│           │   ├── layout.tsx
│           │   └── dr/
│           │       ├── page.tsx            # → /d/dr
│           │       ├── appts/page.tsx      # → /d/dr/appts
│           │       ├── availability/page.tsx # → /d/dr/availability
│           │       ├── patients/page.tsx   # → /d/dr/patients
│           │       └── secretaries/page.tsx # → /d/dr/secretaries
│           │
│           ├── (patient)/                  # Patient role layout (fetches patient data)
│           │   ├── layout.tsx
│           │   └── pt/
│           │       ├── page.tsx            # → /d/pt
│           │       ├── appts/page.tsx      # → /d/pt/appts
│           │       └── book/page.tsx       # → /d/pt/book
│           │
│           ├── (secretary)/                # Secretary role layout (fetches secretary data)
│           │   ├── layout.tsx
│           │   └── sc/
│           │       ├── page.tsx            # → /d/sc
│           │       ├── appts/page.tsx      # → /d/sc/appts
│           │       └── patients/page.tsx   # → /d/sc/patients
│           │
│           ├── profile/page.tsx            # → /d/profile (shared)
│           ├── settings/page.tsx           # → /d/settings (shared)
│           └── billing/page.tsx            # → /d/billing (shared)
│
├── components/
│   ├── ui/                                 # shadcn/ui components (auto-generated)
│   │   ├── button.tsx
│   │   ├── input.tsx
│   │   ├── modal.tsx
│   │   ├── card.tsx
│   │   ├── badge.tsx
│   │   ├── avatar.tsx
│   │   └── select.tsx
│   ├── layout/                             # Layout components
│   │   ├── Navbar.tsx
│   │   ├── Footer.tsx
│   │   ├── Sidebar.tsx
│   │   ├── Topbar.tsx
│   │   └── DashboardLayout.tsx
│   ├── shared/                             # Domain-aware reusable components
│   │   ├── DoctorCard.tsx
│   │   ├── AppointmentCard.tsx
│   │   ├── PatientCard.tsx
│   │   ├── DoctorFilter.tsx
│   │   └── StatusBadge.tsx
│   └── LanguageSwitcher.tsx
│
├── features/                               # Feature-based logic
│   ├── auth/
│   │   ├── api/
│   │   │   ├── login.ts
│   │   │   ├── register.ts
│   │   │   ├── forgot-password.ts
│   │   │   └── get-me.ts
│   │   ├── actions/
│   │   │   └── login-action.ts
│   │   └── hooks/
│   │       └── useAuth.ts
│   ├── appointments/
│   │   ├── api/
│   │   ├── hooks/
│   │   └── types/
│   ├── doctors/
│   │   ├── api/
│   │   │   ├── get-doctors.ts
│   │   │   ├── get-doctor-by-slug.ts
│   │   │   └── update-doctor-profile.ts
│   │   ├── hooks/
│   │   └── types/
│   ├── patients/
│   │   ├── api/
│   │   ├── hooks/
│   │   └── types/
│   ├── secretaries/
│   │   ├── api/
│   │   ├── hooks/
│   │   └── types/
│   └── availability/
│       ├── api/
│       ├── hooks/
│       └── types/
│
├── context/
│   ├── ThemeContext.tsx
│   └── AuthContext.tsx
│
├── i18n/
│   ├── config.ts                           # locales, defaultLocale, RTL config
│   ├── request.ts                          # getRequestConfig: reads cookie, loads messages
│   └── types.ts                            # Module augmentation for type-safe translations
│
├── hooks/                                  # Shared custom hooks
│   ├── useDebounce.ts
│   ├── useMediaQuery.ts
│   └── useClickOutside.ts
│
├── lib/                                    # Utilities and API setup
│   ├── api/
│   │   ├── api-endpoint.ts                 # ApiEndpoint class
│   │   ├── api-error.ts                    # ApiError class
│   │   ├── fetch-client.ts                 # FetchClient class
│   │   ├── validator.ts                    # validate function
│   │   └── paginated.ts                    # paginated() helper
│   ├── appEnv.ts                           # Zod-validated env variables
│   └── helpers.ts                          # Shared helper functions
│
├── types/                                  # Shared TypeScript types
│   ├── user.ts
│   ├── doctor.ts
│   ├── patient.ts
│   ├── appointment.ts
│   └── api.ts
│
├── constants/
│   ├── routes.ts                           # Route paths map
│   ├── enums.ts                            # Shared enums
│   ├── navigation.ts                       # Sidebar nav items per role
│   └── config.ts                           # App config values
│
└── styles/
    └── globals.css                         # Tailwind base + custom styles
```

---

## Rendering Strategy

| Page                | Method          | Notes                                     |
| ------------------- | --------------- | ----------------------------------------- |
| Home                | SSG             | Static, rarely changes                    |
| About / FAQ         | SSG             | Static content                            |
| Pricing             | SSG             | Static plans                              |
| Doctors listing     | ISR             | Revalidate every 5 min                    |
| Doctor profile      | ISR + PPR       | Static shell + dynamic availability slots |
| Auth pages          | SSR             | Minimal, no heavy data                    |
| Dashboard layouts   | SSR             | Fetch user + role data on server          |
| Dashboard pages     | SSR + React Query | Initial SSR, then client interactivity  |

---

## Sidebar Structure

```
Sidebar (shared component)
├── Top: roleSlot (prop)          → Different per role
│   - Doctor: name, specialty, office
│   - Patient: name, upcoming count
│   - Secretary: name, assigned doctor
│
├── Middle: navigation (prop)     → Hardcoded per role from constants/navigation.ts
│
├── Bottom: shared (internal)     → Same for all roles
│   - Profile       → /d/profile
│   - Settings      → /d/settings
│   - Billing       → /d/billing
│   - Logout        → clears auth
│   - User info     → from useAuth() context
```

---

## Function Naming Convention

```
# Page components: Role prefix + Page name + Page
PublicDoctorsPage        → (public)/doctors/page.tsx
DrDashboardPage          → (dashboard)/d/(doctor)/dr/page.tsx
DrApptsPage              → (dashboard)/d/(doctor)/dr/appts/page.tsx
PtDashboardPage          → (dashboard)/d/(patient)/pt/page.tsx
PtBookPage               → (dashboard)/d/(patient)/pt/book/page.tsx
ScDashboardPage          → (dashboard)/d/(secretary)/sc/page.tsx
```