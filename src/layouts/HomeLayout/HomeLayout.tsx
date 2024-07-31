import { Outlet } from "react-router-dom";
import { Footer, Navbar } from "./../../components";

export default function Layout() {
  return (
    <div className="relative min-h-screen">
      <Navbar isAuthPage={false} />
      <div className="pb-20">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}
