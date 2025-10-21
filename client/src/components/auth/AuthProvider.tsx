import {
  createContext,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";

//TODO: Improve context types to reflect auth table and also world state table
type User = { id: string | number ; username: string };
type AuthContextType = {
  user: User | null;
  isAuthenticated: boolean;
  signIn: (name: string) => Promise<void>;
  signOut: () => Promise<void>;
  register: (name: string) => Promise<string>;
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
    // stubbed: pretend an auth flow succeeded
    // const demoUser = next ?? { id: "u_123", name: "Demo Player" };
    // setUser(demoUser);
    // localStorage.setItem(STORAGE_KEY, JSON.stringify(demoUser));

    // Trying to connect to backend
      const res = await fetch(`${BASE_URL}/auth/login`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name }),
    });

    if (!res.ok) {
      const data = await res.json();
      throw new Error(data.error || "Failed to login");
    }

    const user = await res.json();
    setUser(user);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
    console.log("the user is here ... ", user)
    return user
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

    if (!res.ok) {
      const data = await res.json();
      throw new Error(data.error || "Failed to register");
    }

    const user = await res.json();
    setUser(user);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
    return JSON.stringify(user);
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
