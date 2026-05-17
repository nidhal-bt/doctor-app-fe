"use client"

import Link from "next/link"
import { useTranslations } from "next-intl"
import { useAuth } from "@/src/context/auth-context"
import { Button } from "@/src/components/ui/button"
import { APP_ROUTES } from "@/src/constants/routes"

export function UserMenu() {
  const t = useTranslations("auth")
  const { user, isAuthenticated, logout } = useAuth();
  console.log('user', user, isAuthenticated)

  if (!isAuthenticated) {
    return (
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="sm" render={<Link href={APP_ROUTES.AUTH_SIGN_IN} />}>
          {t("login.form.button.submit.text")}
        </Button>
        <Button size="sm" render={<Link href={APP_ROUTES.AUTH_REGISTER} />}>
          {t("register.form.button.submit.text")}
        </Button>
      </div>
    )
  }

  return (
    <div className="flex items-center gap-3">
      <span className="text-sm font-medium">
        {user!.firstName} {user!.lastName}
      </span>
      <Button variant="outline" size="sm" onClick={logout}>
        {t("logout.button.text")}
      </Button>
    </div>
  )
}
