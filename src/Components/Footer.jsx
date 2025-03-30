import Flag from "react-world-flags";
import Container from "./Container";

const Footer = () => {
  return (
    <footer className="bg-[#072534] text-white text-sm pt-10 pb-5 ">
      <Container>
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-start mb-8">
            <div className="flex items-center">
              <img
                src="/images/logo-desktop-ayvens-white.svg"
                alt="Ayvens Logo"
                className="h-24"
              />
            </div>

            <div className="grid grid-cols-2 md:grid-cols-2 gap-8">
              <div>
                <h2 className="text-white text-xl font-medium mb-4">
                  Chi Siamo
                </h2>
                <ul className="space-y-1 font-medium font-['Source_Sans_Pro'] text-base">
                  <li>
                    <a href="#" className="font-medium">
                      La società
                    </a>
                  </li>
                  <li>
                    <a href="#" className="font-medium">
                      Come funziona
                    </a>
                  </li>
                </ul>
              </div>

              <div>
                <h2 className="text-white font-medium mb-4 text-xl">
                  Help Center
                </h2>
                <ul className="space-y-1 font-medium font-['Source_Sans_Pro'] text-base">
                  <li>
                    <a href="#" className="">
                      FAQ
                    </a>
                  </li>
                  <li>
                    <a href="#" className="">
                      Contattaci
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="border-t border-white pt-4 flex flex-col md:flex-row items-center justify-between">
            <p className="mb-2 md:mb-0 font-['Source_Sans_Pro']">
              Copyright © 2025 Ayvens Carmarket. All Rights Reserved.
            </p>
            <ul className="flex space-x-24 font-medium font-['Source_Sans_Pro'] text-sm">
              <li>
                <a href="#" className="">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="">
                  Cookie Policy
                </a>
              </li>
              <li>
                <a href="#" className="">
                  Note Legali
                </a>
              </li>
              <li>
                <a href="#" className="">
                  Impostazioni Cookie
                </a>
              </li>
            </ul>
          </div>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
