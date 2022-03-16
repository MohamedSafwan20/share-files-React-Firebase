import { Link } from "react-router-dom";
import logo from "../../assets/logo.png";

const Navbar = () => {
  return (
    <nav className="flex justify-around items-center p-4">
      <div className="flex items-center gap-2">
        <img src={logo} alt="logo" className="w-[30px] h-[30px]" />
        <p className="text-[white] font-medium text-lg">Share Files</p>
      </div>
      <div className="space-x-4">
        <Link
          to="#"
          className="text-primaryVariant uppercase hover:text-[white] text-sm"
        >
          Signup
        </Link>
        <Link
          to="#"
          className="text-primaryVariant uppercase hover:text-[white] text-sm"
        >
          Login
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
