import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";
import type { Session, User } from "@supabase/supabase-js";
import type { Profile } from "../types/profile";

type AuthContextType = {
  user: User | null;
  session: Session | null;
  profile: Profile | null;
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

async function getOrCreateProfile(user: User): Promise<Profile | null> {
  const email = user.email ?? "";
  const fullName =
    user.user_metadata?.full_name ||
    user.user_metadata?.name ||
    null;

  const { data: existingProfile, error: selectError } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single();

  if (existingProfile && !selectError) {
    return existingProfile;
  }

  const { data: newProfile, error: insertError } = await supabase
    .from("profiles")
    .insert({
      id: user.id,
      email,
      full_name: fullName,
      role: "undergraduate",
    })
    .select()
    .single();

  if (insertError) {
    console.error("Error creating profile:", insertError.message);
    return null;
  }

  return newProfile;
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [authError, setAuthError] = useState("");

  async function loginWithEmail(email: string) {
    setAuthError("");
// TEMP: allow any email while testing auth
//    if (!isAllowedEmail(email)) {
//      setAuthError("Please use your Brooklyn College email.");
//      return;
//    }

    const { error } = await supabase.auth.signInWithOtp({
        email,
        options: {
            shouldCreateUser: true,
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
    setProfile(null);
    await supabase.auth.signOut();
  }

  async function handleSession(currentSession: Session | null) {
    const currentUser = currentSession?.user ?? null;
    const email = currentUser?.email;

    if (currentUser && !isAllowedEmail(email)) {
      await supabase.auth.signOut();
      setSession(null);
      setUser(null);
      setProfile(null);
      setAuthError("Please sign in with your Brooklyn College email.");
      return;
    }

    setSession(currentSession);
    setUser(currentUser);

    if (currentUser) {
      const profileData = await getOrCreateProfile(currentUser);
      setProfile(profileData);
    } else {
      setProfile(null);
    }
  }

  useEffect(() => {
  const getSession = async () => {
    const { data } = await supabase.auth.getSession();
    setUser(data.session?.user ?? null);
    setLoading(false);
  };

  getSession();

  const { data: listener } = supabase.auth.onAuthStateChange(
    (_event, session) => {
      setUser(session?.user ?? null);
    }
  );

  return () => {
    listener.subscription.unsubscribe();
  };
}, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        session,
        profile,
        loading,
        authError,
        loginWithEmail,
        logout,
      }}
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