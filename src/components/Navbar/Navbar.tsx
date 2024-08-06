import { Link, NavLink } from "react-router-dom";
import NavButton from "./NavButton";
import { BUTTON_COLOR, ROUTES } from "../../config/constants";
import NavbarProps from "./NavbarProps";
import { House } from "lucide-react";
import { useContext, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext/AuthContext";
import Button from "../Button/Button";
import { motion } from "framer-motion";
import { IconUser, IconChevronDown, IconChevronUp } from "@tabler/icons-react";

function Navbar({ isAuthPage }: NavbarProps) {
  const { checkLoggedIn, setToken, currentUserId } = useContext(AuthContext);
  const [profileDropdown, setProfileDropdown] = useState<boolean>(false);

  const isLoggedIn = checkLoggedIn();

  const toggleProfileDropdown = () => {
    setProfileDropdown((prev) => !prev);
  };

  const Logout = () => {
    setProfileDropdown(() => false);
    setToken(() => null);
    window.location.reload();
  };

  return (
    <div className="w-full py-2 px-7 lg:px-28 flex justify-between items-center border-b-2 bg-white border-gray-200">
      <Link to={ROUTES.HOME}>
        <div className="text-2xl font-bold text-gray-900 font-logo">
          AlgoDaily
        </div>
      </Link>
      {isAuthPage && (
        <div className="flex justify-between items-center gap-1 font-medium text-lg">
          <NavButton link={ROUTES.HOME} filled={false}>
            <House />
          </NavButton>
        </div>
      )}
      {!isAuthPage && (
        <div className="flex justify-between items-center gap-1 font-medium text-lg">
          {isLoggedIn ? (
            <div className="relative">
              <Button
                color={BUTTON_COLOR.BLACK}
                handleClick={toggleProfileDropdown}
              >
                <span className="flex gap-1 items-center">
                  <IconUser />
                  {profileDropdown ? <IconChevronUp /> : <IconChevronDown />}
                </span>
              </Button>
              {profileDropdown && (
                <motion.div
                  className="h-24 w-32 flex flex-col justify-center bg-gray-100 rounded-lg shadow-2xl border-2 border-gray-700 absolute top-14 right-0"
                  initial={{ scaleY: 0, opacity: 0 }}
                  animate={{ scaleY: 1, opacity: 100 }}
                  exit={{ scaleY: 0, opacity: 0 }}
                >
                  <NavLink
                    to={`/profile/${currentUserId}`}
                    className="flex justify-center items-center h-full hover:bg-gray-300 hover:text-xl rounded-t-lg duration-200"
                    onClick={() => setProfileDropdown(false)}
                  >
                    Profile
                  </NavLink>
                  <div className="h-1 bg-gray-300"></div>
                  <button
                    onClick={Logout}
                    className="flex justify-center items-center h-full hover:bg-gray-300 hover:text-xl rounded-b-lg duration-200"
                  >
                    <span className="text-red-500">Logout</span>
                  </button>
                </motion.div>
              )}
            </div>
          ) : (
            <>
              <NavButton link={ROUTES.LOGIN} filled={false}>
                Login
              </NavButton>
              <NavButton link={ROUTES.SIGNUP} filled={true}>
                Signup
              </NavButton>
            </>
          )}
        </div>
      )}
    </div>
  );
}

export default Navbar;
