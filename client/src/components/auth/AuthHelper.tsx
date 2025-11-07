import { createContext, useContext } from "react";

export type User = { id: string; name: string };
export type AuthContextType = {
  user: User | null;
  isAuthenticated: boolean;
  signIn: (next: User) => Promise<void>;
  signOut: () => Promise<void>;
  register: (name: string) => Promise<void>;
};

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);
export const STORAGE_KEY = "demo_auth_user";

export function useAuth(): AuthContextType {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within <AuthProvider>");
  return ctx;
}