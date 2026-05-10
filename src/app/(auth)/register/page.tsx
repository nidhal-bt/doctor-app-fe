import { SignupForm } from "@/src/features/auth/components/signup-form";
import { signupAction } from "@/src/features/auth/actions/signup-action";

export default function RegisterPage() {
  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <SignupForm onSignup={signupAction} />
    </div>
  );
}
