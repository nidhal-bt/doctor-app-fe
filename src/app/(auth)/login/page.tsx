import { LoginForm } from "@/src/features/auth/components/login-form";
import { loginAction } from "@/src/features/auth/actions/login-action";

export default function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <LoginForm onLogin={loginAction} />
    </div>
  );
}
