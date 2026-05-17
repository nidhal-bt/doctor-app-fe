"use client";

import { createContext, useContext, useState } from "react";

import { useRouter } from "next/navigation";
import { IUser } from "../features/user/types/type";
import { logoutAction } from "../features/auth/actions/logout-action";

interface AuthContextValue {
  user: IUser | null;
  isAuthenticated: boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

interface AuthProviderProps {
  initialUser: IUser | null;
  children: React.ReactNode;
}

export function AuthProvider({ initialUser, children }: AuthProviderProps) {
  const [user, setUser] = useState<IUser | null>(initialUser);
  const router = useRouter();

  async function logout() {
    await logoutAction();
    setUser(null);
    router.push("/");
  }

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated: user !== null, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
