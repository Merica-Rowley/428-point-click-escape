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
    <div>
      <p>
        Signed in as <strong>{user?.name}</strong>
      </p>
      <button onClick={() => signOut()}>Sign out</button>
    </div>
  ) : (
    <button onClick={handleSignIn}>Sign in</button>
  );
}
