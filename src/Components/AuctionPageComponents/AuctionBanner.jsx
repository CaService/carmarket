import { useState } from "react";
// import Flag from "react-world-flags";
// import { ClockIcon } from "@radix-ui/react-icons";
// import { ShareIcon } from "@heroicons/react/24/outline";
import Container from "../Container";

const AuctionBanner = () => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="bg-white shadow-md mt-0.25 pt-14">
      <Container>
        {/* <div className="max-w-7xl mx-auto px-4 py-6 border-b-2 border-gray-200">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 md:gap-0">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 overflow-hidden rounded-full">
                  <Flag
                    code="IT"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                </div>
                <span className="font-bold text-[#072534] font-chillax">
                  ASTA
                </span>
              </div>
              <span className="text-[#072534] font-medium font-chillax text-sm md:text-base">
                VEICOLO ASTA IN ITALIA - 134793
              </span>
            </div>

            <div className="flex items-center">
              <div className="hidden md:block w-0.5 h-24 bg-gray-200 mx-6 self-center"></div>

              <div className="w-full md:w-76">
                <div className="flex items-center justify-between pb-4 md:pb-8 ml-0 md:ml-2">
                  <span
                    className="px-2 py-0.5 text-xs font-semibold rounded-full"
                    style={{ backgroundColor: "#22c55e", color: "white" }}
                  >
                    APERTA
                  </span>
                  <span className="text-xs md:text-sm text-[#072534] font-['Source_Sans_Pro']">
                    Fine: 15 apr 2025 10h00
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div> */}
      </Container>
      <div className="flex bg-[#0f3549] p-4 mt-4 text-white items-center justify-center font-['Source_Sans_Pro'] text-sm md:text-base text-center">
        Vetture usate Asta in vendita in Italia: Selezione di veicoli usati per
        professionisti del settore.
      </div>
    </div>
  );
};

export default AuctionBanner;
