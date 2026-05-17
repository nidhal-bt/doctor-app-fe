import DashboardLayout from "@/src/components/layout/dashboard-layout";
import React from "react";

export default async function DLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <DashboardLayout navigation={<div>doctor navigation</div>}>
      <div>Doctor layout</div>
      {children}
    </DashboardLayout>
  );
}
