import {
  createContext,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";

//TODO: Improve context types to reflect auth table and also world state table
type User = { id: string; name: string };
type AuthContextType = {
  user: User | null;
  isAuthenticated: boolean;
  signIn: (next?: User) => Promise<void>;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);
const STORAGE_KEY = "demo_auth_user";

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as User) : null;
  });

  const signIn = async (next?: User) => {
    // stubbed: pretend an auth flow succeeded
    const demoUser = next ?? { id: "u_123", name: "Demo Player" };
    setUser(demoUser);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(demoUser));
  };

  const signOut = async () => {
    setUser(null);
    localStorage.removeItem(STORAGE_KEY);
  };

  const value = useMemo<AuthContextType>(
    () => ({
      user,
      isAuthenticated: !!user,
      signIn,
      signOut,
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
