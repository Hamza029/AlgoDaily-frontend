import { Outlet } from "react-router-dom";
import { Footer, Navbar } from "./../../components";

export default function Layout() {
  return (
    <div className="relative min-h-screen">
      <Navbar isAuthPage={true} />
      <div>
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}
