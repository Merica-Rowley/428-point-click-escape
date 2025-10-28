import { useMemo, useState, type ReactNode } from "react";
// NOTES FROM ETHAN: PLEASE INCLUDE CREATE CONTEXT IN IMPORTS

import {
  type AuthContextType,
  type User,
  STORAGE_KEY,
  AuthContext,
} from "./AuthHelper";

// Notes from Ethan: UNCOMMENT BELOW TO STUB OUT AUTHENTICATION
// type User = { id: string | number ; username: string };
// type AuthContextType = {
//   user: User | null;
//   isAuthenticated: boolean;
//   signIn: (name: string) => Promise<void>;
//   signOut: () => Promise<void>;
//   register: (name: string) => Promise<string>;
// };

// const AuthContext = createContext<AuthContextType | undefined>(undefined);
// const STORAGE_KEY = "demo_auth_user";
// const BASE_URL = "https://four28-point-click-escape.onrender.com";

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
  
  // NOTES FROM ETHAN: PLEASE UNCOMMENT THIS CODE FOR SIGN IN TO WORK WITH THE SERVER

  // const res = await fetch(`${BASE_URL}/auth/login`, {
  //   method: "POST",
  //   headers: { "Content-Type": "application/json" },
  //   body: JSON.stringify({ name }),
  // });

  // const data = await res.json();

  // console.log("Response data:", data);

  // if (!res.ok) {
  //   throw new Error(data.error || "Failed to login");
  // }

  // setUser(data);
  // localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  // console.log("The user is here ...", data);

  // return data;
  };

  const signOut = async () => {
    setUser(null);
    localStorage.removeItem(STORAGE_KEY);
  };

  const register = async (name: string) => {

    // NOTES FROM ETHAN: PLEASE UNCOMMENT THIS CODE FOR REGISTER TO WORK WITH THE SERVER
    // const res = await fetch(`${BASE_URL}/auth/register`, {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" }, <3 
    //   body: JSON.stringify({ name }),
    // });

    // if (!res.ok) {
    //   const data = await res.json();
    //   throw new Error(data.error || "Failed to register");
    // }

    // const user = await res.json();
    // setUser(user);
    // localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
    // return JSON.stringify(user);
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

// NOTES FROM ETHAN: PLEASE UNCOMMENT THIS HOOK TO USE AUTH CONTEXT
// export function useAuth(): AuthContextType {
//   const ctx = useContext(AuthContext);
//   if (!ctx) throw new Error("useAuth must be used within <AuthProvider>");
//   return ctx;
// }
