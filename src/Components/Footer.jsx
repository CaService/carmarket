import Container from "./Container";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-[#072534] text-white text-sm pt-10 pb-5">
      <Container>
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-start mb-8">
            <div className="flex items-center justify-center w-full md:w-auto mb-8 md:mb-0">
              <img
                src="/images/logo-desktop-ayvens-white.svg"
                alt="Ayvens Logo"
                className="h-24"
              />
            </div>
          </div>

          <div className="border-t border-white pt-4 flex flex-col md:flex-row items-center justify-between">
            <p className="mb-4 md:mb-0 text-center md:text-left font-['Source_Sans_Pro']">
              Copyright © 2025 Ayvens Carmarket. All Rights Reserved.
            </p>
            <ul className="flex flex-col md:flex-row md:space-x-8 space-y-4 md:space-y-0 font-medium font-['Source_Sans_Pro'] text-sm text-center md:text-left">
              <li>
                <Link to="/privacy" className="">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/cookie" className="">
                  Cookie Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
