import { useState } from "react";
import { supabase } from "../../lib/supabaseClient";
import { useAuth } from "../../context/AuthContext";
import type { UserRole } from "../../types/profile";

const roles: UserRole[] = ["undergraduate", "graduate", "alumni", "staff"];

export default function RoleSelection() {
  const { user, profile } = useAuth();
  const [selectedRole, setSelectedRole] = useState<UserRole>(
    profile?.role || "undergraduate"
  );
  const [message, setMessage] = useState("");

  async function saveRole() {
    if (!user) return;

    const { error } = await supabase
    .from("profiles")
    .upsert({
      id: user.id,
      email: user.email,
      role: selectedRole,
  });

    if (error) {
      setMessage(error.message);
    } else {
      setMessage("Role saved successfully.");
    }
  }

  return (
    <div style={{ textAlign: "center", marginTop: "40px" }}>
      <h2>Select your role</h2>
      <p>This helps us personalize your experience.</p>

      <select
        value={selectedRole}
        onChange={(e) => setSelectedRole(e.target.value as UserRole)}
        style={{ padding: "10px", marginRight: "10px" }}
      >
        {roles.map((role) => (
          <option key={role} value={role}>
            {role}
          </option>
        ))}
      </select>

      <button onClick={saveRole}>Save role</button>

      {message && <p>{message}</p>}
    </div>
  );
}