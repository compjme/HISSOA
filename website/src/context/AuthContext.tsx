import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";
import type { Session, User } from "@supabase/supabase-js";

type AuthContextType = {
  user: User | null;
  session: Session | null;
  loading: boolean;
  authError: string;
  loginWithEmail: (email: string) => Promise<void>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | null>(null);

function isAllowedEmail(email: string | undefined) {
  return (
    email?.endsWith("@brooklyn.cuny.edu") ||
    email?.endsWith("@stu-mail.brooklyn.cuny.edu") ||
    email?.endsWith("@bcmail.cuny.edu")
  );
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [authError, setAuthError] = useState("");

  async function loginWithEmail(email: string) {
    setAuthError("");

    if (!isAllowedEmail(email)) {
      setAuthError("Please use your Brooklyn College email.");
      return;
    }

    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: `${window.location.origin}/scheduling`,
      },
    });

    if (error) {
      setAuthError(error.message);
    } else {
      setAuthError("Check your email for the sign-in link.");
    }
  }

  async function logout() {
    setAuthError("");
    await supabase.auth.signOut();
  }

  async function handleSession(currentSession: Session | null) {
    const currentUser = currentSession?.user ?? null;
    const email = currentUser?.email;

    if (currentUser && !isAllowedEmail(email)) {
      await supabase.auth.signOut();
      setSession(null);
      setUser(null);
      setAuthError("Please sign in with your Brooklyn College email.");
      return;
    }

    setSession(currentSession);
    setUser(currentUser);
  }

  useEffect(() => {
    supabase.auth.getSession().then(async ({ data }) => {
      await handleSession(data.session);
      setLoading(false);
    });

    const { data: listener } = supabase.auth.onAuthStateChange(
      async (_event, currentSession) => {
        await handleSession(currentSession);
        setLoading(false);
      }
    );

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, session, loading, authError, loginWithEmail, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }

  return context;
}