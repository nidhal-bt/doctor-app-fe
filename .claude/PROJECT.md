# Doctor Appointment Platform — Frontend Folder Structure

## Tech Stack

- **Framework:** Next.js (App Router)
- **Styling:** Tailwind CSS
- **Language:** TypeScript
- **State:** Context API (theme, language, auth) + Zustand (later, small features)
- **API:** Axios + TanStack Query (dashboards only)
- **Rendering:** SSG, ISR, SSR, PPR, Streaming

---

## Folder Structure

```
src/
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   ├── @auth/
│   │   ├── default.tsx
│   │   ├── (.)sign-in/page.tsx
│   │   ├── (.)register/page.tsx
│   │   └── (.)forgot-password/page.tsx
│   ├── (public)/
│   │   ├── layout.tsx
│   │   ├── page.tsx                    # Home
│   │   ├── doctors/page.tsx            # Doctors listing
│   │   ├── [slug]/page.tsx             # Doctor profile (ISR)
│   │   ├── about/page.tsx              # About (SSG)
│   │   ├── faq/page.tsx                # FAQ (SSG)
│   │   └── pricing/page.tsx            # Pricing plans (SSG)
│   ├── (auth)/
│   │   ├── layout.tsx                  # Minimal centered layout
│   │   ├── sign-in/page.tsx
│   │   ├── register/page.tsx
│   │   ├── forgot-password/page.tsx
│   │   ├── reset-password/page.tsx
│   │   └── secretary/
│   │       └── register/page.tsx
│   ├── (patient)/
│   │   ├── layout.tsx                  # Patient dashboard layout
│   │   ├── dashboard/page.tsx
│   │   ├── appointments/page.tsx
│   │   ├── profile/page.tsx
│   │   └── settings/page.tsx
│   ├── (doctor)/
│   │   ├── layout.tsx                  # Doctor dashboard layout
│   │   ├── dashboard/page.tsx
│   │   ├── appointments/page.tsx
│   │   ├── availability/page.tsx
│   │   ├── secretaries/page.tsx
│   │   ├── patients/page.tsx
│   │   └── profile/page.tsx
│   └── (secretary)/
│       ├── layout.tsx                  # Secretary dashboard layout
│       ├── dashboard/page.tsx
│       ├── appointments/page.tsx
│       └── patients/page.tsx
│
├── components/
│   ├── ui/                             # Generic reusable components
│   │   ├── Button.tsx
│   │   ├── Input.tsx
│   │   ├── Modal.tsx
│   │   ├── Card.tsx
│   │   ├── Badge.tsx
│   │   ├── Spinner.tsx
│   │   ├── Avatar.tsx
│   │   └── Select.tsx
│   ├── layout/                         # Layout components
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
├── features/                           # Feature-based logic (see example below)
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
├── lib/                                # Utilities and API setup
│   ├── axios.ts                        # Axios instance with interceptors
│   ├── queryClient.ts                  # TanStack Query client config
│   └── helpers.ts                      # Shared helper functions
│
├── types/                              # Shared TypeScript types
│   ├── user.ts
│   ├── doctor.ts
│   ├── patient.ts
│   ├── appointment.ts
│   └── api.ts                          # API response/error types
│
├── constants/
│   ├── routes.ts                       # Route paths map
│   ├── enums.ts                        # Shared enums
│   └── config.ts                       # App config values
│
└── styles/
    └── globals.css                     # Tailwind base + custom styles
```

---

## Feature Folder Example: `features/doctors/`

Each feature folder contains everything related to that domain's logic — API calls, hooks, types, and validation. This keeps things modular and easy to maintain.

```
src/features/doctors/
├── api/
│   ├── getDoctors.ts                   # Fetch doctors list (SSR/ISR)
│   ├── getDoctorBySlug.ts             # Fetch single doctor by slug (ISR)
│   ├── updateDoctorProfile.ts         # Update doctor profile (mutation)
│   └── getDoctorStats.ts             # Dashboard stats (client-side)
│
├── hooks/
│   ├── useDoctors.ts                  # useQuery wrapper for doctors list
│   ├── useDoctor.ts                   # useQuery wrapper for single doctor
│   ├── useUpdateProfile.ts           # useMutation wrapper for profile update
│   └── useDoctorStats.ts             # useQuery wrapper for dashboard stats
│
├── types/
│   └── index.ts                       # Doctor-specific types and interfaces
│
├── schemas/
│   └── updateProfile.schema.ts        # Zod validation for profile form
│
└── utils/
    └── formatDoctorData.ts            # Doctor-specific helper functions
```

### Example: `api/getDoctors.ts`

```typescript
// Used in server components for SSR/ISR
// No React Query needed here — pure server-side fetch

export async function getDoctors(params?: {
  specialty?: string;
  city?: string;
  page?: number;
}) {
  const res = await fetch(`${process.env.API_BASE_URL}/doctors`, {
    next: { revalidate: 300 }, // ISR: revalidate every 5 min
  });

  if (!res.ok) throw new Error("Failed to fetch doctors");

  return res.json();
}
```

### Example: `api/updateDoctorProfile.ts`

```typescript
// Used in client components via useMutation
// Doctor dashboard — needs auth token

import { axiosInstance } from "@/lib/axios";
import { UpdateDoctorProfileDto } from "../types";

export async function updateDoctorProfile(data: UpdateDoctorProfileDto) {
  const res = await axiosInstance.patch("/doctors/profile", data);
  return res.data;
}
```

### Example: `hooks/useDoctors.ts`

```typescript
// Client-side hook — only used in dashboard pages
// Public pages use server-side getDoctors() directly

import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "@/lib/axios";

export function useDoctors(filters?: { specialty?: string; city?: string }) {
  return useQuery({
    queryKey: ["doctors", filters],
    queryFn: async () => {
      const res = await axiosInstance.get("/doctors", { params: filters });
      return res.data;
    },
  });
}
```

### Example: `hooks/useUpdateProfile.ts`

```typescript
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateDoctorProfile } from "../api/updateDoctorProfile";

export function useUpdateProfile() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateDoctorProfile,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["doctor", "profile"] });
    },
  });
}
```

### Example: `types/index.ts`

```typescript
export interface Doctor {
  id: string;
  userId: string;
  specialty: string;
  bio: string;
  slug: string;
  isVerified: boolean;
  office: MedicalOffice;
  createdAt: string;
  updatedAt: string;
}

export interface MedicalOffice {
  id: string;
  name: string;
  address: string;
  phone: string;
  email: string;
}

export interface UpdateDoctorProfileDto {
  specialty?: string;
  bio?: string;
  slug?: string;
}
```

### Example: `schemas/updateProfile.schema.ts`

```typescript
import { z } from "zod";

export const updateProfileSchema = z.object({
  specialty: z.string().min(2).max(100).optional(),
  bio: z.string().max(500).optional(),
  slug: z
    .string()
    .min(3)
    .max(50)
    .regex(/^[a-z0-9-]+$/, "Slug must be lowercase with hyphens only")
    .optional(),
});

export type UpdateProfileFormData = z.infer<typeof updateProfileSchema>;
```

---

## Rendering Strategy Summary

| Page              | Method            | Notes                                     |
| ----------------- | ----------------- | ----------------------------------------- |
| Home              | SSG               | Static, rarely changes                    |
| About / FAQ       | SSG               | Static content                            |
| Pricing           | SSG               | Static plans                              |
| Doctors listing   | ISR               | Revalidate every 5 min                    |
| Doctor profile    | ISR + PPR         | Static shell + dynamic availability slots |
| Auth pages        | SSR               | Minimal, no heavy data                    |
| Patient dashboard | SSR + React Query | Initial SSR, then client interactivity    |
| Doctor dashboard  | SSR + React Query | Initial SSR, then client interactivity    |
| Secretary dashboard | SSR + React Query | Initial SSR, then client interactivity  |
