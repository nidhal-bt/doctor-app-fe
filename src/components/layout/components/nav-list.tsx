import { getTranslations } from "next-intl/server"
import Link from "next/link"
import { APP_ROUTES } from "@/src/constants/routes"

export async function NavList() {
  const tNav = await getTranslations("nav")
  const tDoctor = await getTranslations("doctor")

  const items = [
    { label: tNav("dashboard"),       href: APP_ROUTES.DOCTOR_DASHBOARD },
    { label: tDoctor("patients"),     href: APP_ROUTES.DOCTOR_PATIENTS },
    { label: tDoctor("appointments"), href: APP_ROUTES.DOCTOR_APPOINTMENTS },
    { label: tDoctor("availability"), href: APP_ROUTES.DOCTOR_AVAILABILITY },
  ]
  // items list:
  // home / home page for doctors
  // find a doctor
  // faq
  // about us
  // articles

  return (
    <nav>
      <ul className="flex gap-1">
        {items.map((item) => (
          <li key={item.href}>
            <Link
              href={item.href}
              className="flex items-center rounded-md px-3 py-2 text-sm font-medium text-foreground hover:bg-accent hover:text-accent-foreground"
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}
