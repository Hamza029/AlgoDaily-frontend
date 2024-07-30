import { NavLink } from "react-router-dom";
import NavButtonProps from "./NavButtonProps";

function NavButton({ children, link, filled }: NavButtonProps) {
  return (
    <NavLink
      to={link}
      className={`px-3 py-2 duration-300 ${!filled ? "text-gray-600 rounded-full hover:bg-gray-200 hover:text-gray-950" : "text-gray-200 bg-gray-800 rounded-3xl hover:bg-gray-700"}`}
    >
      {children}
    </NavLink>
  );
}

export default NavButton;
