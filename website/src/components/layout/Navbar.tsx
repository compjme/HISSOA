import { NavLink } from "react-router-dom";
import "./Navbar.css";
import ISSOLOGO from "../../assets/ISSOLOGO.png";

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

/*cleans up the navigation bar so that it adds styling when active (navlink>link)*/
export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-left">
        <NavLink to="/" className="navbar-logo-link">
          <img src={ISSOLOGO} alt="Company Logo" className="navbar-logo" />
        </NavLink>
      </div>

      {links.map((link) => (
        <NavLink key={link.path} to={link.path} style={linkStyle}>
          {link.label}
        </NavLink>
      ))}
    </nav>
  );
}
