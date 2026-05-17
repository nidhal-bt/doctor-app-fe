import AppLayout from "@/src/components/layout/app-layout";

export default async function PublicLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <AppLayout>{children}</AppLayout>;
}
