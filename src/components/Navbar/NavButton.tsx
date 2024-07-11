import { NavLink } from "react-router-dom";

interface NavButtonProps {
  link: string;
  filled: boolean;
  text: string;
}

function NavButton({ text, link, filled }: NavButtonProps) {
  return (
    <NavLink
      to={link}
      className={`px-3 py-1 duration-300 ${!filled ? "text-gray-600 rounded-full hover:bg-gray-200 hover:text-gray-950" : "text-gray-200 bg-gray-900 rounded-3xl hover:bg-gray-800"}`}
    >
      {text}
    </NavLink>
  );
}

export default NavButton;
