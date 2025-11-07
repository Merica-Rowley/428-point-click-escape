import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./AuthProvider";

type RequireAuthProps = { children?: React.ReactNode };

export default function RequireAuth({ children }: RequireAuthProps) {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  // We theoretically dont need to be worrying about outlet. Its for a sllightly different style of routing. But thats okay.
  return children ? <>{children}</> : <Outlet />;
}
