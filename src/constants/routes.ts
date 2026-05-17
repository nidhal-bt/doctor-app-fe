export const APP_ROUTES = {
  // Public
  HOME: "/",
  DOCTORS: "/doctors",
  DOCTOR_PROFILE: (slug: string) => `/doctors/${slug}`,
  ABOUT: "/about",
  FAQ: "/faq",
  PRICING: "/pricing",

  // Auth
  AUTH_SIGN_IN: "/login",
  AUTH_REGISTER: "/register",
  AUTH_FORGOT_PASSWORD: "/forgot-password",
  AUTH_RESET_PASSWORD: "/reset-password",
  AUTH_SECRETARY_REGISTER: "/secretary/register",

  // Doctor
  DOCTOR_DASHBOARD: "/d/dr",
  DOCTOR_APPOINTMENTS: "/d/dr/appts",
  DOCTOR_AVAILABILITY: "/d/dr/availability",
  DOCTOR_PATIENTS: "/d/dr/patients",
  DOCTOR_SECRETARIES: "/d/dr/secretaries",

  // Patient
  PATIENT_DASHBOARD: "/d/pt",
  PATIENT_APPOINTMENTS: "/d/pt/appts",
  PATIENT_BOOK: "/d/pt/book",

  // Secretary
  SECRETARY_DASHBOARD: "/d/sc",
  SECRETARY_APPOINTMENTS: "/d/sc/appts",
  SECRETARY_PATIENTS: "/d/sc/patients",

  // Shared dashboard
  PROFILE: "/d/profile",
  SETTINGS: "/d/settings",
  BILLING: "/d/billing",
} as const;