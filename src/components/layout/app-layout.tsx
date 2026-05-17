import React from "react";
import { Logo } from "./components/logo";
import { NavList } from "./components/nav-list";
import { UserMenu } from "./components/user-menu";

interface AppLayoutProps {
  children: React.ReactNode;
}

export default function AppLayout({ children }: AppLayoutProps) {
  return (
    <div>
      <nav className="hidden lg:flex w-full items-center justify-between px-6 py-4 border-b">
        <Logo />
        <NavList />
        <UserMenu />
      </nav>
      {children}
      <nav className="lg:hidden absolute z-10 bottom-6">app-layout mobile </nav>
    </div>
  );
}
