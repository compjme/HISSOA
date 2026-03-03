import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

export default function Layout() {
  return (
    <div>
      <Navbar />
      <main style={{ padding: "20px", minHeight: "70vh" }}>
        <Outlet />
      </main>
    </div>
  );
}
