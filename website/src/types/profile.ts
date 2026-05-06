export type UserRole = "undergraduate" | "alumni" | "staff" | "graduate";

export type Profile = {
  id: string;
  email: string;
  full_name: string | null;
  role: UserRole;
  created_at: string;
};