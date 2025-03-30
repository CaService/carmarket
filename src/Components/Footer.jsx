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

            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div>
                <h2 className="text-white text-xl font-medium mb-4">About</h2>
                <ul className="space-y-1 font-medium font-['Source_Sans_Pro'] text-base">
                  <li>
                    <a href="#" className="font-medium">
                      About us
                    </a>
                  </li>
                  <li>
                    <a href="#" className="font-medium">
                      How does it work
                    </a>
                  </li>
                  <li>
                    {/* <a href="#" className="font-medium">
                      Mobile app
                    </a> */}
                  </li>
                </ul>
              </div>

              <div>
                <h2 className="text-white font-medium mb-4 text-xl">
                  Sales types
                </h2>
                <ul className="space-y-1 font-medium font-['Source_Sans_Pro'] text-base">
                  <li>
                    <a href="#" className="">
                      Auction
                    </a>
                  </li>
                  <li>
                    <a href="#" className="">
                      Tender
                    </a>
                  </li>
                  <li>
                    <a href="#" className="">
                      Fixed price
                    </a>
                  </li>
                  <li>
                    <a href="#" className="">
                      See all sales types
                    </a>
                  </li>
                  <li>
                    <a href="#" className="">
                      All vehicles
                    </a>
                  </li>
                  <li>
                    <a href="#" className="">
                      Electric vehicles
                    </a>
                  </li>
                </ul>
              </div>

              <div>
                <h2 className="text-white font-medium mb-4 text-xl">
                  Help center
                </h2>
                <ul className="space-y-1 font-medium font-['Source_Sans_Pro'] text-base">
                  <li>
                    <a href="#" className="">
                      FAQ
                    </a>
                  </li>
                  <li>
                    <a href="#" className="">
                      Contact us
                    </a>
                  </li>
                </ul>
              </div>

              <div>
                <h2 className="text-white font-medium mb-4 text-xl">Marchi</h2>
                <ul className="space-y-1 font-medium font-['Source_Sans_Pro'] text-base">
                  <li>
                    <a href="#" className="">
                      Ford
                    </a>
                  </li>
                  <li>
                    <a href="#" className="">
                      Peugeot
                    </a>
                  </li>
                  <li>
                    <a href="#" className="">
                      Renault
                    </a>
                  </li>
                  <li>
                    <a href="#" className="">
                      Volkswagen
                    </a>
                  </li>
                  <li>
                    <a href="#" className="">
                      BMW
                    </a>
                  </li>
                  <li>
                    <a href="#" className="">
                      Vedi tutti i marchi
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="border-t border-white pt-4 flex flex-col md:flex-row items-center justify-between">
            <p className="mb-2 md:mb-0 font-['Source_Sans_Pro']">
              Copyright © 2025 Aayens Carmarket. All Rights Reserved.
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
                  Impostazioni Cookies
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
