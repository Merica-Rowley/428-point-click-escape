import { useMemo, useState, type ReactNode } from "react";

import {
  type AuthContextType,
  type User,
  STORAGE_KEY,
  AuthContext,
} from "./AuthHelper";

//TODO: Improve context types to reflect auth table and also world state table
// type User = { id: string; name: string };
// type AuthContextType = {
//   user: User | null;
//   isAuthenticated: boolean;
//   signIn: (next: User) => Promise<void>;
//   signOut: () => Promise<void>;
//   register: (name: string) => Promise<void>;
// };

// const AuthContext = createContext<AuthContextType | undefined>(undefined);
// const STORAGE_KEY = "demo_auth_user";

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as User) : null;
  });

  const signIn = async (next: User) => {
    // stubbed: pretend an auth flow succeeded
    const demoUser = next ?? { id: "u_123", name: "Demo Player" };
    setUser(demoUser);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(demoUser));

    // Trying to connect to backend
    //   const res = await fetch(`http://localhost:3001/auth/login`, {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify({ name }),
    // });

    // if (!res.ok) {
    //   const data = await res.json();
    //   throw new Error(data.error || "Failed to login");
    // }

    // const user = await res.json();
    // setUser(user);
    // localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
  };

  const signOut = async () => {
    setUser(null);
    localStorage.removeItem(STORAGE_KEY);
  };

  const register = async (name: string) => {
    const res = await fetch(`http://localhost:3001/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name }),
    });

    if (!res.ok) {
      const data = await res.json();
      throw new Error(data.error || "Failed to register");
    }

    const user = await res.json();
    setUser(user);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
  };

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
