"use client";
import { LoginForm } from "@/src/features/auth/components/login-form";
import { loginAction } from "@/src/features/auth/actions/login-action";
import { useRouter } from "next/navigation";
import { APP_ROUTES } from "@/src/constants/routes";

export default function LoginPage() {
  const router = useRouter();
  const onSuccess = () => {
    router.push(APP_ROUTES.HOME);
  }

  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <LoginForm onLogin={loginAction} onSuccess={onSuccess} />
    </div>
  );
}

