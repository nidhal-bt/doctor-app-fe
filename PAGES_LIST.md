# Doctor Booking Platform — Pages List

## 🌐 Public Pages

| Page | Route | Description |
|------|-------|-------------|
| Home | `/` | Hero section, how it works, featured doctors, stats, testimonials, footer |
| Doctors Listing | `/doctors` | Browse & filter all doctors (specialty, city, gender, language, rating) |
| Nearby Doctors | `/doctors/nearby` | Map view with geolocation-based doctor search |
| Doctor Profile | `/dr-[slug]` | Doctor portfolio: photo, bio, diplomas, experience, address + booking form |
| About | `/about` | Platform mission, how it helps patients & doctors |
| Contact | `/contact` | Contact form, email, phone, FAQ section |
| Privacy Policy | `/privacy-policy` | Privacy policy |
| Terms of Service | `/terms-of-service` | Terms of service |

---

## 🔐 Auth Pages

| Page | Route | Description |
|------|-------|-------------|
| Login | `/login` | Shared login for patients, doctors, and secretaries |
| Register | `/register` | Account registration |
| Forgot Password | `/forgot-password` | Password recovery |

---

## 🧑‍💼 Patient Dashboard

| Page | Route | Description |
|------|-------|-------------|
| Dashboard | `/patient/dashboard` | Overview and summary |
| Appointments | `/patient/appointments` | Appointment history, status tracking |
| Profile | `/patient/profile` | Edit personal information |
| Payment History | `/patient/payment-history` | Past payments and invoices |

---

## 👨‍⚕️ Doctor Dashboard

| Page | Route | Description |
|------|-------|-------------|
| Dashboard | `/doctor/dashboard` | Analytics & overview |
| Edit Profile | `/doctor/profile/edit` | CMS to manage public profile page |
| Appointments | `/doctor/appointments` | Accept, decline, reschedule appointments |
| Availability | `/doctor/availability` | Set working hours and schedule |
| Secretaries | `/doctor/secretaries` | Manage assigned secretaries |
| Patients | `/doctor/patients` | View patient records |

---

## 🗂️ Secretary Dashboard

| Page | Route | Description |
|------|-------|-------------|
| Dashboard | `/secretary/dashboard` | Overview |
| Appointments | `/secretary/appointments` | Manage appointments on behalf of doctor |
| Patients | `/secretary/patients` | Patient list and details |

---

## ⚙️ Admin (Future)

| Page | Route | Description |
|------|-------|-------------|
| Admin Panel | `/admin/*` | Platform-level management (to be defined) |

---

## 📊 Summary

| Section | Count |
|---------|-------|
| Public Pages | 8 |
| Auth Pages | 3 |
| Patient Dashboard | 4 |
| Doctor Dashboard | 6 |
| Secretary Dashboard | 3 |
| Admin (future) | 1+ |
| **Total** | **25+** |

---

> **Design Priority for Balsamiq:**
> Start with the core patient-facing flow first:
> 1. Home page
> 2. Doctors Listing
> 3. Doctor Profile + Booking Form
> 4. Auth (Login / Register)
> 5. Patient Dashboard (Appointments)
> 6. Doctor Dashboard (Appointments management)
