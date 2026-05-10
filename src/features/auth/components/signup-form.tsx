"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { z } from "zod";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/src/components/ui/card";
import { Button } from "@/src/components/ui/button";
import { Form } from "@/src/components/ui/form";
import { InputForm } from "@/src/components/form/input-form";
import { PasswordInputForm } from "@/src/components/form/password-input-form";
import { PhoneInputForm } from "@/src/components/form/phone-input-form";
import { toast } from "sonner";

function useSignupSchema() {
  const t = useTranslations("auth");
  return z
    .object({
      firstName: z.string().min(1, t("register.form.firstName.error.required.text")),
      lastName: z.string().min(1, t("register.form.lastName.error.required.text")),
      email: z
        .string()
        .min(1, t("register.form.email.error.required.text"))
        .email(t("register.form.email.error.invalid.text")),
      password: z
        .string()
        .min(1, t("register.form.password.error.required.text"))
        .min(8, t("register.form.password.error.minLength.text")),
      confirmPassword: z
        .string()
        .min(1, t("register.form.confirmPassword.error.required.text")),
      phone: z.string().min(1, t("register.form.phone.error.required.text")),
    })
    .refine((data) => data.confirmPassword === data.password, {
      message: t("register.form.confirmPassword.error.mismatch.text"),
      path: ["confirmPassword"],
    });
}

type SignupFormData = z.infer<ReturnType<typeof useSignupSchema>>;

interface SignupFormProps {
  onSignup: (data: Omit<SignupFormData, "confirmPassword">) => Promise<{ success: boolean; message?: string; statusCode?: number }>;
}

export function SignupForm({ onSignup }: SignupFormProps) {
  const t = useTranslations("auth");
  const schema = useSignupSchema();
  const form = useForm<SignupFormData>({
    resolver: zodResolver(schema),
    defaultValues: { firstName: "", lastName: "", email: "", password: "", confirmPassword: "", phone: "" },
  });

  const onSubmit = async (data: SignupFormData) => {
    const { confirmPassword: _, ...apiData } = data;
    const result = await onSignup(apiData);

    if (!result.success) {
      toast.error(t("register.toast.error.generic.text"));
      return;
    }

    toast.success(t("register.toast.success.text"));
  };

  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle className="text-lg">{t("register.form.title.text")}</CardTitle>
        <CardDescription>{t("register.form.subtitle.text")}</CardDescription>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent className="flex flex-col gap-4 mb-6">
            <InputForm
              control={form.control}
              name="firstName"
              type="text"
              label={t("register.form.firstName.label.text")}
              placeholder={t("register.form.firstName.placeholder.text")}
            />
            <InputForm
              control={form.control}
              name="lastName"
              type="text"
              label={t("register.form.lastName.label.text")}
              placeholder={t("register.form.lastName.placeholder.text")}
            />
            <InputForm
              control={form.control}
              name="email"
              type="email"
              label={t("register.form.email.label.text")}
              placeholder={t("register.form.email.placeholder.text")}
            />
            <PasswordInputForm
              control={form.control}
              name="password"
              label={t("register.form.password.label.text")}
            />
            <PasswordInputForm
              control={form.control}
              name="confirmPassword"
              label={t("register.form.confirmPassword.label.text")}
            />
            <PhoneInputForm
              control={form.control}
              name="phone"
              label={t("register.form.phone.label.text")}
            />
          </CardContent>
          <CardFooter>
            <Button type="submit" className="w-full">
              {t("register.form.button.submit.text")}
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}
