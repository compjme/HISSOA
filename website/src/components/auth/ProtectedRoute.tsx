import { useState, type ReactNode } from "react";
import { useAuth } from "../../context/AuthContext";

type ProtectedRouteProps = {
  children: ReactNode;
};

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { user, loading, loginWithEmail, authError } = useAuth();
  const [email, setEmail] = useState("");

  if (loading) return <p>Loading...</p>;

  // If user is logged in -> allow access
  if (user) {
    return <>{children}</>;
  }

  // If NOT logged in -> show login UI
  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>Sign in required</h2>
      <p>Please enter your Brooklyn College email.</p>

      <input
        type="email"
        placeholder="yourname@cuny.edu"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={{ padding: "10px", width: "280px", marginRight: "10px" }}
      />

      <button onClick={() => loginWithEmail(email)}>Send sign-in link</button>

      {authError && (
        <p style={{ marginTop: "15px", color: "crimson" }}>{authError}</p>
      )}
    </div>
  );
}
