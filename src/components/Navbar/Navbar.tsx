import { Link } from "react-router-dom";
import NavButton from "./NavButton";
import { ROUTES } from "../../config/constants";
import NavbarProps from "./NavbarProps";
import { House } from "lucide-react";

function Navbar({ isAuthPage }: NavbarProps) {
  return (
    <div className="w-full h-14 px-7 lg:px-28 flex justify-between items-center border-b-2 bg-white border-gray-200">
      <Link to={ROUTES.HOME}>
        <div className="text-2xl font-bold text-gray-900">AlgoDaily</div>
      </Link>
      {isAuthPage ? (
        <div className="flex justify-between items-center gap-1 font-medium text-lg">
          <NavButton link={ROUTES.HOME} filled={false}>
            <House />
          </NavButton>
        </div>
      ) : (
        <div className="flex justify-between items-center gap-1 font-medium text-lg">
          <NavButton link={ROUTES.LOGIN} filled={false}>
            Login
          </NavButton>
          <NavButton link={ROUTES.SIGNUP} filled={true}>
            Signup
          </NavButton>
        </div>
      )}
    </div>
  );
}

export default Navbar;
