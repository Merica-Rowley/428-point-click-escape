import { useMemo, useState, useContext, createContext, type ReactNode } from "react";
// import { AuthContext, STORAGE_KEY, type User, type AuthContextType } from "./AuthHelper";
type User = { id: string | number ; username: string };
type AuthContextType = {
  user: User | null;
  isAuthenticated: boolean;
  signIn: (name: string) => Promise<void>;
  signOut: () => Promise<void>;
  register: (name: string) => Promise<User>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);
const STORAGE_KEY = "demo_auth_user";
const BASE_URL = "https://four28-point-click-escape.onrender.com";

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as User) : null;
  });

const signIn = async (name: string) => {
  const res = await fetch(`${BASE_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name }),
  });

  const data = await res.json();

  console.log("Response data:", data);

  if (!res.ok) {
    throw new Error(data.error || "Failed to login");
  }

  setUser(data);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  console.log("The user is here ...", data);

  return data;
};

  const signOut = async () => {
    setUser(null);
    localStorage.removeItem(STORAGE_KEY);
  };

  const register = async (name: string) => {
    const res = await fetch(`${BASE_URL}/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name }),
    });

    console.log("Register response: ", res);

    if (!res.ok) {
      const data = await res.json();
      throw new Error(data.error || "Failed to register");
    }

    const user = await res.json();
    console.log("Registered user:", user);
    setUser(user);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
    return user
  }

  const value = useMemo<AuthContextType>(
    () => ({
      user,
      isAuthenticated: !!user,
      signIn,
      signOut,
      register,
    }),
    [user]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextType {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within <AuthProvider>");
  return ctx;
}
