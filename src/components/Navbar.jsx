import { useState } from "react";
import Logo from "src/assets/logo-nav.webp";

import { Link, useNavigate, useLocation } from "react-router-dom";
import Button from "./ui/Button";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const handleLogout = () => {
    localStorage.removeItem("token");

    navigate("/");
  };
  return (
    <>
      <nav className="flex items-center justify-between flex-wrap p-4 shadow-md">
        <div className="flex items-center flex-shrink-0 text-white mr-6 lg:mr-72">
          <img src={Logo} className="w-100 h-10 mr-2" alt="Logo" />
        </div>
        <div className="block lg:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center px-3 py-2 rounded text-black-500 hover:text-black-400"
          >
            <svg
              className={`fill-current h-3 w-3 ${isOpen ? "hidden" : "block"}`}
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
            </svg>
            <svg
              className={`fill-current h-3 w-3 ${isOpen ? "block" : "hidden"}`}
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M10 8.586L2.929 1.515 1.515 2.929 8.586 10l-7.071 7.071 1.414 1.414L10 11.414l7.071 7.071 1.414-1.414L11.414 10l7.071-7.071-1.414-1.414L10 8.586z" />
            </svg>
          </button>
        </div>
        <div
          className={`w-full block flex-grow lg:flex lg:items-center lg:w-auto ${
            isOpen ? "block" : "hidden"
          }`}
        >
          <div className="text-sm lg:flex-grow">
            <Link
              to="/blog"
              className={`block mt-4 lg:inline-block lg:mt-0 ${
                location.pathname === "/blog" ? "text-blue-500" : "text-black"
              } mr-4`}
            >
              Blog Post
            </Link>
            <Link
              to="/denom"
              className={`block mt-4 lg:inline-block lg:mt-0 ${
                location.pathname === "/denom"
                  ? "text-blue-500 text-bold"
                  : "text-black"
              } mr-4`}
            >
              Denom
            </Link>
          </div>

          <Button
            onClick={handleLogout}
            alt="avatar"
            className="border bg-gradient-to-r from-blue-500 to-blue-600 text-white"
          >
            Logout
          </Button>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
