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
| HTTP client | Axios with interceptors (`src/lib/axios.ts`) |
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

```
src/
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   ├── @auth/                          # Parallel route — modal auth intercepts
│   │   ├── default.tsx
│   │   ├── (.)sign-in/page.tsx
│   │   ├── (.)register/page.tsx
│   │   └── (.)forgot-password/page.tsx
│   ├── (public)/                       # Public marketing pages
│   │   ├── layout.tsx
│   │   ├── page.tsx                    # Home (SSG)
│   │   ├── doctors/page.tsx            # Doctors listing (ISR)
│   │   ├── [slug]/page.tsx             # Doctor profile (ISR + PPR)
│   │   ├── about/page.tsx
│   │   ├── faq/page.tsx
│   │   └── pricing/page.tsx
│   ├── (auth)/                         # Minimal centered layout
│   │   ├── layout.tsx
│   │   ├── sign-in/page.tsx
│   │   ├── register/page.tsx
│   │   ├── forgot-password/page.tsx
│   │   ├── reset-password/page.tsx
│   │   └── secretary/register/page.tsx
│   ├── (patient)/
│   │   ├── layout.tsx
│   │   ├── dashboard/page.tsx
│   │   ├── appointments/page.tsx
│   │   ├── profile/page.tsx
│   │   └── settings/page.tsx
│   ├── (doctor)/
│   │   ├── layout.tsx
│   │   ├── dashboard/page.tsx
│   │   ├── appointments/page.tsx
│   │   ├── availability/page.tsx
│   │   ├── secretaries/page.tsx
│   │   ├── patients/page.tsx
│   │   └── profile/page.tsx
│   └── (secretary)/
│       ├── layout.tsx
│       ├── dashboard/page.tsx
│       ├── appointments/page.tsx
│       └── patients/page.tsx
│
├── components/
│   ├── ui/                             # Generic reusable primitives
│   │   ├── Button.tsx
│   │   ├── Input.tsx
│   │   ├── Modal.tsx
│   │   ├── Card.tsx
│   │   ├── Badge.tsx
│   │   ├── Spinner.tsx
│   │   ├── Avatar.tsx
│   │   └── Select.tsx
│   ├── layout/                         # Layout chrome
│   │   ├── Navbar.tsx
│   │   ├── Footer.tsx
│   │   ├── Sidebar.tsx
│   │   └── Topbar.tsx
│   └── shared/                         # Domain-aware reusable components
│       ├── DoctorCard.tsx
│       ├── AppointmentCard.tsx
│       ├── PatientCard.tsx
│       └── StatusBadge.tsx
│
├── features/                           # Feature-based logic (see pattern below)
│   ├── auth/
│   ├── appointments/
│   ├── doctors/
│   ├── patients/
│   ├── secretaries/
│   └── availability/
│
├── context/
│   ├── ThemeContext.tsx
│   ├── LanguageContext.tsx
│   └── AuthContext.tsx
│
├── hooks/                              # Shared custom hooks
│   ├── useDebounce.ts
│   ├── useMediaQuery.ts
│   └── useClickOutside.ts
│
├── lib/
│   ├── axios.ts                        # Axios instance with interceptors
│   ├── queryClient.ts                  # TanStack Query client config
│   └── helpers.ts
│
├── types/
│   ├── user.ts
│   ├── doctor.ts
│   ├── patient.ts
│   ├── appointment.ts
│   └── api.ts                          # API response/error shapes
│
├── constants/
│   ├── routes.ts
│   ├── enums.ts
│   └── config.ts
│
└── styles/
    └── globals.css                     # Tailwind base + custom theme vars
```

---

## Feature Folder Pattern

Each feature under `src/features/<name>/` is self-contained:

```
src/features/doctors/
├── api/          # Pure fetch/axios calls (no React hooks)
├── hooks/        # useQuery / useMutation wrappers
├── types/        # Feature-specific interfaces
├── schemas/      # Zod validation schemas
└── utils/        # Feature-specific helpers
```

**Rule:** Server components call `api/` functions directly. Client components go through `hooks/`. Never import a hook in a server component.

---

## Styling Rules

- Tailwind utility classes are the primary approach — no CSS modules.
- Global theme tokens (`--background`, `--foreground`, etc.) live in `app/globals.css` under `@theme inline`.
- Dark mode is automatic via `prefers-color-scheme` — no JS toggle needed for base theme.
- Tailwind v4 is configured via `@import "tailwindcss"` in `globals.css`; there is **no** `tailwind.config.js`.

---

## Component Rules

- Default to **Server Components**. Add `"use client"` only when the component needs event handlers, hooks, or browser APIs.
- Keep `"use client"` boundaries as deep in the tree as possible to maximize server rendering.
