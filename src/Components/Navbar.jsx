import { useState } from "react";
import Container from "./Container";
// import LanguageSelector from "./LanguageSelector";
import Button from "./Button";
import CardAuth from "./CardAuth";
import { Link } from "react-router-dom";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import {
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Avatar,
} from "@material-tailwind/react";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../store/slices/authSlice";

const Navbar = () => {
  const dispatch = useDispatch();
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const [showAuth, setShowAuth] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLoginClick = () => {
    setShowAuth(true);
    setIsMenuOpen(false);
  };

  const handleCloseAuth = () => {
    setShowAuth(false);
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Modifica il componente UserMenu per mostrare i dati inline
  const UserMenu = () => (
    <div className="flex items-center gap-4">
      <div className="flex flex-col">
        <span className="text-sm font-semibold text-gray-900">
          {user.company_name}
        </span>
        <span className="text-xs text-gray-600">{user.email}</span>
      </div>
      <Button variant="danger" onClick={handleLogout}>
        Logout
      </Button>
    </div>
  );

  return (
    <>
      {/* <div className="bg-cyan-950 text-white pt-2.5 pb-2.5">
        <div className="flex justify-center items-center text-sm font-['Source_Sans_Pro']">
          Le migliori auto elettriche usate al prezzo giusto.{" "}
          <a className="underline cursor-pointer">Approfittane ora.</a>
        </div>
      </div> */}
      <div className="fixed top-0 left-0 right-0 z-50 w-full bg-white flex items-center justify-between shadow-md h-18">
        <Container>
          <div className="w-full flex justify-between items-center py-4">
            {/* Logo e Menu Desktop */}
            <div className="w-full flex items-center justify-between md:justify-start md:gap-18">
              {/* Menu Hamburger */}
              <button
                className="md:hidden text-gray-700 p-2"
                onClick={toggleMenu}
              >
                {isMenuOpen ? (
                  <XMarkIcon className="h-6 w-6 cursor-pointer" />
                ) : (
                  <Bars3Icon className="h-6 w-6 cursor-pointer" />
                )}
              </button>

              {/* Logo - Centrato su mobile */}
              <Link
                to="/"
                className="absolute left-1/2 transform -translate-x-1/2 md:static md:transform-none"
              >
                <img
                  src="/images/Ayvens.svg"
                  alt="Ayvens"
                  className="w-26.5 h-26.5"
                />
              </Link>
              <div className="hidden md:flex items-center gap-8">
                <Link
                  to="/about"
                  className="underline-animation text-black font-medium hover:text-cyan-800 font-['Source_Sans_Pro'] whitespace-nowrap"
                >
                  Chi siamo
                </Link>
                <Link
                  to="/auction"
                  className="underline-animation text-black font-medium hover:text-cyan-800 font-['Source_Sans_Pro'] whitespace-nowrap"
                >
                  Veicoli
                </Link>
                <Link
                  to="/contact"
                  className="underline-animation text-black font-medium hover:text-cyan-800 font-['Source_Sans_Pro'] whitespace-nowrap"
                >
                  Contattaci
                </Link>
              </div>
            </div>

            {/* Buttons Desktop */}
            <div className="hidden md:flex items-center gap-4">
              {isAuthenticated ? (
                <UserMenu />
              ) : (
                <>
                  <Link to="/signup">
                    <Button variant="primary">Registrati</Button>
                  </Link>
                  <Button variant="secondary" onClick={handleLoginClick}>
                    Login
                  </Button>
                </>
              )}
            </div>
          </div>

          {/* Menu Mobile */}
          {isMenuOpen && (
            <div className="md:hidden absolute top-[72px] left-0 right-0 bg-white shadow-lg z-50">
              <div className="flex flex-col p-4 space-y-4">
                <Link
                  to="/about"
                  className="text-black font-medium hover:text-cyan-800 font-['Source_Sans_Pro']"
                >
                  Chi siamo
                </Link>
                <Link
                  to="/auction"
                  className="text-black font-medium hover:text-cyan-800 font-['Source_Sans_Pro']"
                >
                  Veicoli
                </Link>
                <Link
                  to="/contact"
                  className="text-black font-medium hover:text-cyan-800 font-['Source_Sans_Pro']"
                >
                  Contattaci
                </Link>
                <div className="flex flex-col gap-3 pt-4 border-t">
                  {isAuthenticated ? (
                    <UserMenu />
                  ) : (
                    <>
                      <Button
                        variant="primary"
                        className="w-full"
                        onClick={() => (window.location.href = "/signup")}
                      >
                        Registrati
                      </Button>
                      <Button
                        variant="secondary"
                        onClick={handleLoginClick}
                        className="w-full"
                      >
                        Login
                      </Button>
                    </>
                  )}
                </div>
              </div>
            </div>
          )}
        </Container>
      </div>
      {showAuth && (
        <div
          className="z-50 fixed inset-0 flex items-center justify-center"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.25)" }}
        >
          <div className="relative">
            <CardAuth onClose={handleCloseAuth} />
          </div>
        </div>
      )}
    </>
  );
};

export { Navbar as default, CardAuth };
