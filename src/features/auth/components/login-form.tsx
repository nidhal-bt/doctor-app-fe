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
import { InputForm } from "@/src/components/input-form";
import { toast } from "sonner";

function useLoginSchema() {
  const t = useTranslations("auth");
  return z.object({
    email: z
      .string()
      .min(1, t("login.form.email.error.required.text"))
      .email(t("login.form.email.error.invalid.text")),
    password: z
      .string()
      .min(1, t("login.form.password.error.required.text"))
      .min(8, t("login.form.password.error.minLength.text")),
  });
}

type LoginFormData = z.infer<ReturnType<typeof useLoginSchema>>;

interface LoginFormProps {
  onLogin: (data: LoginFormData) => Promise<{ success: boolean; message?: string; statusCode?: number }>;
}

export function LoginForm({ onLogin }: LoginFormProps) {
  const t = useTranslations("auth");
  const schema = useLoginSchema();
  const form = useForm<LoginFormData>({
    resolver: zodResolver(schema),
    defaultValues: { email: "", password: "" },
  });

  const onSubmit = async (data: LoginFormData) => {
    const result = await onLogin(data);

    if (!result.success) {
      toast.error(t("login.toast.error.unauthorized.text"));
      return;
    }

    toast.success(t("login.toast.success.text"));
  };

  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle className="text-lg">{t("login.form.title.text")}</CardTitle>
        <CardDescription>{t("login.form.subtitle.text")}</CardDescription>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent className="flex flex-col gap-4 mb-6">
            <InputForm
              control={form.control}
              name="email"
              type="email"
              label={t("login.form.email.label.text")}
              placeholder={t("login.form.email.placeholder.text")}
            />
            <InputForm
              control={form.control}
              name="password"
              type="password"
              label={t("login.form.password.label.text")}
              placeholder={t("login.form.password.placeholder.text")}
            />
          </CardContent>
          <CardFooter>
            <Button type="submit" className="w-full">
              {t("login.form.button.submit.text")}
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}
