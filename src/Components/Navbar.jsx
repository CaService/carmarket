import { useState, useEffect } from "react";
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

const Navbar = () => {
  const [showAuth, setShowAuth] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Controlla se l'utente è loggato al caricamento
    const userData = localStorage.getItem("user");
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  const handleLoginClick = () => {
    setShowAuth(true);
    setIsMenuOpen(false);
  };

  const handleCloseAuth = () => {
    setShowAuth(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    window.location.reload();
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Componente UserMenu
  const UserMenu = () => (
    <Menu>
      <MenuHandler>
        <Avatar
          src="https://docs.material-tailwind.com/img/face-2.jpg"
          alt="avatar"
          className="cursor-pointer w-10 h-10"
        />
      </MenuHandler>
      {user ? (
        <MenuList className="p-2">
          <MenuItem className="flex flex-col items-start gap-1 p-2">
            <span className="text-sm font-semibold text-gray-900">
              {user.company_name}
            </span>
            <span className="text-xs text-gray-600">{user.email}</span>
          </MenuItem>
          <hr className="my-2" />
          <MenuItem
            onClick={handleLogout}
            className="text-red-500 hover:text-red-700 text-sm"
          >
            Logout
          </MenuItem>
        </MenuList>
      ) : null}
    </Menu>
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
            <div className="flex items-center gap-18">
              <Link to="/">
                <img
                  src="src/assets/Ayvens.svg"
                  alt="Ayvens"
                  className="w-26.5 h-26.5"
                />
              </Link>
              <div className="hidden md:flex items-center gap-10">
                <a
                  href="/"
                  className="underline-animation text-black font-medium hover:text-cyan-800 font-['Source_Sans_Pro']"
                >
                  Veicoli
                </a>
                <a
                  href="/"
                  className="underline-animation text-black font-medium hover:text-cyan-800 font-['Source_Sans_Pro']"
                >
                  Vendite
                </a>
              </div>
            </div>

            {/* Buttons Desktop */}
            <div className="hidden md:flex items-center gap-4">
              {user ? (
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
          </div>

          {/* Menu Mobile */}
          {isMenuOpen && (
            <div className="md:hidden absolute top-[72px] left-0 right-0 bg-white shadow-lg z-50">
              <div className="flex flex-col p-4 space-y-4">
                <a
                  href="/"
                  className="text-black font-medium hover:text-cyan-800 font-['Source_Sans_Pro']"
                >
                  Veicoli
                </a>
                <a
                  href="/"
                  className="text-black font-medium hover:text-cyan-800 font-['Source_Sans_Pro']"
                >
                  Vendite
                </a>
                <div className="flex flex-col gap-3 pt-4 border-t">
                  {user ? (
                    <>
                      <div className="flex items-center gap-3 p-2">
                        <Avatar
                          src="https://docs.material-tailwind.com/img/face-2.jpg"
                          alt="avatar"
                          className="w-10 h-10"
                        />
                        <div className="flex flex-col">
                          <span className="text-sm font-semibold text-gray-900">
                            {user.company_name}
                          </span>
                          <span className="text-xs text-gray-600">
                            {user.email}
                          </span>
                        </div>
                      </div>
                      <Button
                        variant="secondary"
                        onClick={handleLogout}
                        className="w-full text-red-500 hover:text-red-700"
                      >
                        Logout
                      </Button>
                    </>
                  ) : (
                    <>
                      <Link to="/signup" className="w-full">
                        <Button variant="primary" className="w-full">
                          Registrati
                        </Button>
                      </Link>
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
            <button className="absolute top-2 right-2 text-white">X</button>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
