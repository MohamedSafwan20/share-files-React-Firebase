import { Link, useLocation } from "react-router-dom";
import logo from "../../assets/logo.png";
import RouterPath from "../../config/routes";

const Navbar = () => {
  const location = useLocation();

  return (
    <nav className="flex justify-around items-center p-4">
      <Link
        to={RouterPath.home}
        className="sm:flex sm:items-center sm:gap-2 hidden"
      >
        <img src={logo} alt="logo" className="w-[30px] h-[30px]" />
        <p className="text-[white] font-medium text-lg">Share Files</p>
      </Link>
      <div className="space-x-4">
        {location.pathname === RouterPath.home ? (
          <Link
            to={RouterPath.download}
            className="text-primaryVariant uppercase hover:text-[white] text-xs"
          >
            Download
          </Link>
        ) : location.pathname === RouterPath.download ? (
          <Link
            to={RouterPath.home}
            className="text-primaryVariant uppercase hover:text-[white] text-xs"
          >
            Upload
          </Link>
        ) : (
          <>
            <Link
              to={RouterPath.home}
              className="text-primaryVariant uppercase hover:text-[white] text-xs"
            >
              Upload
            </Link>
            <Link
              to={RouterPath.download}
              className="text-primaryVariant uppercase hover:text-[white] text-xs"
            >
              Download
            </Link>
          </>
        )}

        <Link
          to="#"
          className="text-primaryVariant uppercase hover:text-[white] text-xs"
        >
          Signup
        </Link>
        <Link
          to="#"
          className="text-primaryVariant uppercase hover:text-[white] text-xs"
        >
          Login
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
