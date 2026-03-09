import { NavLink } from "react-router-dom";
import "./Navbar.css";

const links = [
  { path: "/", label: "Home" },
  { path: "/events", label: "Events" },
  { path: "/scheduling", label: "Scheduling" },
  { path: "/community", label: "Community" },
  { path: "/resources", label: "Resources" },
  { path: "/faq", label: "FAQ" },
];

const linkStyle = ({ isActive }: { isActive: boolean }) => ({
  fontWeight: isActive ? "700" : "400",
  textDecoration: isActive ? "underline" : "none",
});
//cleans up the navigation bar so that it adds styling when active (navlink>link)
export default function Navbar() {
  return (
    <nav className="navbar">
      {links.map((link) => (
        <NavLink key={link.path} to={link.path} style={linkStyle}>
          {link.label}
        </NavLink>
      ))}
    </nav>
  );
}