import { NavLink } from "react-router-dom";

export default function Navbar() {
  return (
    <nav style={{ display: "flex", gap: "40px", padding: "12px" }}>
      <NavLink to="/">Home</NavLink>
      <NavLink to="/events">Events</NavLink>
      <NavLink to="/scheduling">Scheduling</NavLink>
      <NavLink to="/community">Community</NavLink>
      <NavLink to="/resources">Resources</NavLink>
      <NavLink to="/faq">FAQ</NavLink>
    </nav>
  );
}
