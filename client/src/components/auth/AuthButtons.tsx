// --- Small helper that shows Sign in / Sign out and handles redirect-after-signin
import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthProvider";

export default function AuthButtons() {
  const { isAuthenticated, user, signIn, signOut } = useAuth();
  const navigate = useNavigate();

  const handleSignIn = async () => {
    await signIn(user!);
    navigate("/game", { replace: true });
  };

  return isAuthenticated ? (
    <button onClick={() => signOut()}>Sign out</button>
  ) : (
    <button onClick={handleSignIn}>Sign in</button>
  );
}
