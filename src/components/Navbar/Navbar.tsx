import { Link } from "react-router-dom";
import NavButton from "./NavButton";

function Navbar() {
  return (
    <div className="w-full h-14 px-7 lg:px-28 flex justify-between items-center border-b-2 bg-white border-gray-200">
      <Link to="/">
        <div className="text-2xl font-bold text-gray-900">AlgoDaily</div>
      </Link>
      <div className="flex justify-between items-center gap-1 font-medium text-lg">
        <NavButton text="Login" link="/login" filled={false} />
        <NavButton text="Signup" link="/signup" filled={true} />
      </div>
    </div>
  );
}

export default Navbar;
