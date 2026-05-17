import type { Metadata } from "next";

import "./globals.css";
import { Geist } from "next/font/google";
import { cn } from "@/src/lib/utils";
import { Toaster } from "@/src/components/ui/sonner";
import { ThemeProvider } from "@/src/context/theme-context";
import { AuthProvider } from "@/src/context/auth-context";
import { getServerUser } from "@/src/features/auth/server/get-server-user";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getLocale } from "next-intl/server";
import { isRTL } from "@/src/i18n/config";

const geist = Geist({ subsets: ['latin'], variable: '--font-sans' });

export const metadata: Metadata = {
  title: "Doctor App",
  description: "Doctor appointment management",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();
  const messages = await getMessages();
  const dir = isRTL(locale) ? "rtl" : "ltr";
  const user = await getServerUser();

  return (
    <html lang={locale} dir={dir} className={cn("font-sans", geist.variable)} suppressHydrationWarning>
      <body>
        <NextIntlClientProvider messages={messages}>
          <ThemeProvider>
            {/* TODO: we need to fix this line */}
            <AuthProvider initialUser={user?.success && user.user ? user.user : null}>
              {children}
              <Toaster />
            </AuthProvider>
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
