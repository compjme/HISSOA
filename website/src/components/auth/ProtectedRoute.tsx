import { useState, type ReactNode } from "react";
import { useAuth } from "../../context/AuthContext";

type ProtectedRouteProps = {
  children: ReactNode;
};

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
    return <>{children}</>; // TEMP DEV BYPASS: remove this line when testing auth again
  const { user, loading, loginWithEmail, authError } = useAuth();
  const [email, setEmail] = useState("");

  if (loading) return <p>Loading...</p>;

  if (!user) {
    return (
      <div style={{ textAlign: "center", marginTop: "50px" }}>
        <h2>Sign in required</h2>
        <p>Please enter your Brooklyn College email.</p>

        <input
          type="email"
          placeholder="yourname@bcmail.cuny.edu"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{ padding: "10px", width: "280px", marginRight: "10px" }}
        />

        <button onClick={() => loginWithEmail(email)}>Send sign-in link</button>

        {authError && <p style={{ marginTop: "15px" }}>{authError}</p>}
      </div>
    );
  }

  return <>{children}</>;
}