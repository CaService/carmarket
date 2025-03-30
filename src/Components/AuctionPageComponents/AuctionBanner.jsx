import { useState, useEffect } from "react";
import Flag from "react-world-flags";
import { ClockIcon } from "@radix-ui/react-icons";
import { ShareIcon } from "@heroicons/react/24/outline";
import Container from "../Container";
const AuctionBanner = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [timeLeft, setTimeLeft] = useState("");

  useEffect(() => {
    const endDate = new Date("2025-03-10T10:30:00"); // Data aggiornata come nell'immagine
    const updateCountdown = () => {
      const now = new Date();
      const difference = endDate - now;

      if (difference <= 0) {
        setIsOpen(false);
        setTimeLeft("00:00:00");
        return;
      }

      const hours = String(
        Math.floor((difference / (1000 * 60 * 60)) % 24)
      ).padStart(2, "0");
      const minutes = String(
        Math.floor((difference / (1000 * 60)) % 60)
      ).padStart(2, "0");
      const seconds = String(Math.floor((difference / 1000) % 60)).padStart(
        2,
        "0"
      );

      setTimeLeft(`${hours} ora(e) ${minutes} minuto(i) ${seconds} secondo(i)`);
    };

    const intervalId = setInterval(updateCountdown, 1000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="bg-white shadow-md mt-0.25 pt-18">
      <Container>
        <div className="max-w-7xl mx-auto px-4 py-6 border-b-2 border-gray-200">
          <div className="flex items-center justify-between">
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
              <span className="text-[#072534] font-medium font-chillax">
                VEICOLO ASTA IN ITALIA - 134793
              </span>
            </div>

            <div className="flex items-center">
              <div className="w-0.5 h-24 bg-gray-200 mx-6 self-center"></div>

              <div className="w-76">
                <div className="flex items-center justify-between pb-8 ml-2">
                  <span
                    className="px-2 py-0.5 text-xs font-semibold rounded-full"
                    style={{ backgroundColor: "#22c55e", color: "white" }}
                  >
                    APERTA
                  </span>
                  <span className="text-sm text-[#072534] font-['Source_Sans_Pro']">
                    Fine: 10 mar 2025 10h30
                  </span>
                </div>

                <div className="flex items-center justify-center gap-2 border border-gray-200 px-4 py-2 rounded-full">
                  <ClockIcon className="w-4 h-4 text-blue-800" />
                  <span className="text-sm text-blue-800 font-['Source_Sans_Pro']">
                    {timeLeft}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
      <div className="flex bg-[#0f3549] p-4 mt-4 text-white items-center justify-center font-['Source_Sans_Pro']">
        Vetture usate Asta in vendita in Italia: Selezione di veicoli usati per
        professionisti del settore.
      </div>
    </div>
  );
};

export default AuctionBanner;
