// --- Small helper that shows Sign in / Sign out and handles redirect-after-signin
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "./AuthProvider";

export default function AuthButtons() {
  const { isAuthenticated, user, signIn, signOut, register } = useAuth();
  const navigate = useNavigate();

  // Local state for the entered name
  const [name, setName] = useState("");

  const handleSignIn = async () => {
    console.log("Attempting to sign in with name:", name);
    if (!name.trim()) {
      alert("Please enter your name before signing in.");
      return;
    }

    try {
      await signIn(name);
      navigate("/game", { replace: true });
    } catch (error: any) {
      console.error("Sign in failed:", error);
      alert(error.message || "Sign-in failed. Please try again.");
    }
  };

  const handleRegister = async () => {
    if (!name.trim()) {
      alert("Please enter your name before registering.");
      return;
    }

    try {
      const user = await register(name);

      console.log("Parsed user:", user);

      setName(user.username);
      navigate("/game", { replace: true });
    } catch (error: any) {
      console.error("Registration failed:", error);
      alert(error.message || "Registration failed. Please try again.");
    }
  };

  // console.log("The name of the user is ... ", name);

  return isAuthenticated ? (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%",
      }}
    >
      <p style={{ textAlign: "left", margin: 0 }}>
        Signed in as <strong>{user?.username}</strong>
      </p>
      <div style={{ display: "flex", gap: "0.5rem" }}>
        <button>Save</button>
        <button onClick={signOut}>Sign out</button>
      </div>
    </div>
  ) : (
    <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Enter your name"
      />
      <button onClick={handleSignIn}>Sign in</button>
      <button onClick={handleRegister}>Register</button>
    </div>
  );
}
