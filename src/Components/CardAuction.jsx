import { useState, useEffect } from "react";
import Flag from "react-world-flags";
import { ClockIcon } from "@radix-ui/react-icons";
import Container from "./Container";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCarSide } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const CardAuction = ({ vehicles = [] }) => {
  const [isOpen, setIsOpen] = useState(true);
  const [timeLeft, setTimeLeft] = useState("");

  // Modificare la endDate qui per far partire il count down
  useEffect(() => {
    const endDate = new Date("2025-04-15T10:00:00");
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

      setTimeLeft(`${hours}:${minutes}:${seconds}`);
    };

    const intervalId = setInterval(updateCountdown, 1000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="pb-20">
      <Container>
        <div className="mt-10 flex items-center gap-2">
          <FontAwesomeIcon icon={faCarSide} className="text-teal-700" />
          <span className="text-teal-700 text-lg font-['Source_Sans_Pro']">
            Vendita disponibile
          </span>
        </div>

        <div className="bg-white mt-8 rounded-lg shadow-md overflow-hidden">
          <div className="flex flex-col md:flex-row">
            <div className="p-6 border-b md:border-b-0 md:border-r border-gray-200 md:w-1/3">
              {/* Card asta */}
              <div>
                <div className="flex border-b border-gray-200 pb-4 items-center justify-between">
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
                    <h2 className="text-lg font-bold text-[#072534] font-chillax">
                      ASTA
                    </h2>
                  </div>
                  <div className="flex items-center">
                    <span className="text-sm font-medium text-[#072534] font-['Source_Sans_Pro']">
                      10
                    </span>
                    <FontAwesomeIcon
                      icon={faCarSide}
                      className="w-5 h-5 ml-2 "
                    />
                  </div>
                </div>

                <div className="mt-4">
                  <div className="flex items-center justify-between pb-2">
                    <span
                      className={`text-sm font-semibold ${
                        isOpen
                          ? "bg-green-600 text-white text-xs rounded-full px-1.5"
                          : "bg-red-600 text-white text-xs rounded-full px-1.5"
                      }`}
                    >
                      {isOpen ? "APERTA" : "CHIUSA"}
                    </span>
                    <p className="text-sm text-[#072534] font-['Source_Sans_Pro']">
                      Fine: 15 apr 2025 10h00
                    </p>
                  </div>
                  <div className="flex items-center justify-center mt-2 border text-blue-800 border-gray-200 rounded-full px-2 py-2">
                    <ClockIcon className="w-4 h-4 mr-1" />
                    <span className="text-sm font-medium text-[#072534] font-['Source_Sans_Pro']">
                      {timeLeft}
                    </span>
                  </div>
                  <p className="text-xs mt-4 border-t font-semibold border-gray-200 pt-4 pb-24 text-[#072534] font-chillax">
                    VEICOLO ASTA IN ITALIA - 12424
                  </p>
                </div>

                <div className="mt-4 flex justify-between gap-4">
                  <Link
                    to="/signup"
                    className="w-1/2 bg-[#73d2d2] text-center border border-[#73d2d2] px-3 py-3 rounded-full font-semibold transition duration-300 hover:bg-white hover:border hover:border-[#072534] flex items-center justify-center font-chillax"
                  >
                    REGISTRATI
                  </Link>
                  <Link
                    to="/auction"
                    className="w-1/2 bg-[#072534] border border-[#072534] text-white px-3 py-3 rounded-full font-semibold transition duration-300 hover:bg-white hover:border hover:border-[#072534] hover:text-[#072534] flex items-center justify-center font-chillax"
                  >
                    MOSTRA DI PIÙ
                  </Link>
                </div>
              </div>
            </div>

            <div className="p-6 md:w-2/3">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {vehicles.map((vehicle, index) => (
                  <div key={index} className="rounded-lg overflow-hidden">
                    <img
                      src={vehicle.image || "https://placehold.co/200x150"}
                      alt={vehicle.name}
                      className="w-full h-32 object-cover"
                    />
                    <div className="p-3">
                      <h4 className="text-lg font-semibold">{vehicle.name}</h4>
                      <span className="block text-xs font-medium">
                        {vehicle.km} Chilometri
                      </span>
                      <span className="block text-xs font-medium">
                        {vehicle.registration}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default CardAuction;
