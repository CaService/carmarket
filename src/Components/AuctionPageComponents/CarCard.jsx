import { ClockIcon } from "@radix-ui/react-icons";
import Flag from "react-world-flags";
import { Link } from "react-router-dom";
import Container from "../Container";
import { useSelector } from "react-redux";
import { useState } from "react";

const CarCard = () => {
  const [showDetails, setShowDetails] = useState(false);
  const { isAuthenticated } = useSelector((state) => state.auth);

  const toggleDetails = () => {
    setShowDetails(!showDetails);
  };

  return (
    <Container>
      <div className="w-full mx-auto pr-6 bg-white rounded-lg shadow-md overflow-hidden mt-8">
        <div className="flex">
          {/* Immagine Auto */}
          <div className="relative w-96">
            <img
              src="/images/Ayvens.svg"
              alt="Ayvens"
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-2 left-2 bg-white rounded-full w-8 h-8 flex items-center justify-center">
              <span className="text-sm font-medium">24</span>
            </div>
          </div>

          {/* Contenuto */}
          <div className="flex p-6">
            <div className="flex-col">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-10 overflow-hidden rounded-full">
                  <Flag
                    code="IT"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                </div>
                <span className="font-bold text-xl font-chillax">1.</span>
                <h2 className="text-teal-700 text-xl font-bold font-chillax">
                  AUDI AUDI A3 30 TDI S tronic Business S.Back Hatchback 5-door
                  (Euro 6D)
                </h2>
              </div>

              <div className="flex items-center gap-2 text-blue-600 mb-4">
                <ClockIcon className="w-5 h-5" />
                <span>Termina tra 2 giorno(i) 10 ora(e) 44 minuto(i)</span>
              </div>
              <div className="flex gap-4 text-gray-700 text-sm font-['Source_Sans_Pro']">
                <span>103.940 Chilometri | 10/11/2021</span>
                <span>Diesel | Automatico</span>
              </div>
            </div>

            <div className="mt-4">
              {isAuthenticated ? (
                <div className="text-center">
                  <p className="text-xl font-bold text-gray-800 mb-4">
                    PREZZO €
                  </p>
                  <button className="inline-block bg-[#072534] w-90 text-center px-8 py-3 mt-16 text-white cursor-pointer rounded-full font-semibold transition duration-300 hover:bg-white hover:text-[#072534] hover:border hover:border-[#072534] font-chillax">
                    ACQUISTA
                  </button>
                </div>
              ) : (
                <Link
                  to="/signup"
                  className="inline-block bg-[#73d2d2] w-90 text-center px-8 py-3 mt-20 cursor-pointer rounded-full font-semibold transition duration-300 hover:bg-white hover:border hover:border-[#072534] font-chillax"
                >
                  REGISTRATI
                </Link>
              )}
            </div>
          </div>
        </div>

        {/* Accordion Buttons */}
        <div className="">
          <div className="flex">
            <button
              onClick={toggleDetails}
              className="text-center flex-1 p-4 pb-8 font-semibold cursor-pointer text-[#072534] underline-animation"
            >
              DETTAGLI {showDetails ? "-" : "+"}
            </button>
            <button className="text-center flex-1 p-4 pb-8 font-semibold cursor-pointer text-[#072534] underline-animation">
              SCARICA PDF +
            </button>
          </div>

          {/* Dropdown Details */}
          {showDetails && (
            <div className="px-6 pb-6 mb-6 ml-6 mt-6 border-t border-gray-100 bg-gray-100 rounded-lg">
              <div className="flex mt-4">
                {/* Colonna Labels */}
                <div className="w-1/2 space-y-4 pr-4">
                  <p className="text-[#072534] font-['Source_Sans_Pro']">
                    VERSIONE
                  </p>
                  <p className="text-[#072534] font-['Source_Sans_Pro']">
                    CARROZZERIA
                  </p>
                  <p className="text-[#072534] font-['Source_Sans_Pro']">
                    PORTE
                  </p>
                  <p className="text-[#072534] font-['Source_Sans_Pro']">
                    POSTI
                  </p>
                  <p className="text-[#072534] font-['Source_Sans_Pro']">
                    CATEGORIA
                  </p>
                  <p className="text-[#072534] font-['Source_Sans_Pro']">
                    COLORE ESTERNO
                  </p>
                  <p className="text-[#072534] font-['Source_Sans_Pro']">
                    COLORE INTERNO
                  </p>
                  <p className="text-[#072534] font-['Source_Sans_Pro']">
                    ANNO MODELLO
                  </p>
                  <p className="text-[#072534] font-['Source_Sans_Pro']">
                    CHILOMETRAGGIO
                  </p>
                  <p className="text-[#072534] font-['Source_Sans_Pro']">
                    CAMBIO
                  </p>
                  <p className="text-[#072534] font-['Source_Sans_Pro']">
                    TIPO CARBURANTE
                  </p>
                  <p className="text-[#072534] font-['Source_Sans_Pro']">
                    POTENZA MOTORE (DIN)
                  </p>
                  <p className="text-[#072534] font-['Source_Sans_Pro']">
                    POTENZA (KW)
                  </p>
                  <p className="text-[#072534] font-['Source_Sans_Pro']">
                    CILINDRATA MOTORE
                  </p>
                  <p className="text-[#072534] font-['Source_Sans_Pro']">
                    POTENZA FISCALE
                  </p>
                </div>

                {/* Colonna Valori */}
                <div className="w-1/2 space-y-4 text-right">
                  <p className="text-[#072534] font-['Source_Sans_Pro']">
                    2.0 TDI
                  </p>
                  <p className="text-[#072534] font-['Source_Sans_Pro']">
                    Berlina
                  </p>
                  <p className="text-[#072534] font-['Source_Sans_Pro']">5</p>
                  <p className="text-[#072534] font-['Source_Sans_Pro']">5</p>
                  <p className="text-[#072534] font-['Source_Sans_Pro']">
                    AUTO
                  </p>
                  <p className="text-[#072534] font-['Source_Sans_Pro']">
                    GRIGIO MOONLIGHT METALLIZZATO
                  </p>
                  <p className="text-[#072534] font-['Source_Sans_Pro']">
                    Tessuto nero
                  </p>
                  <p className="text-[#072534] font-['Source_Sans_Pro']">
                    2022
                  </p>
                  <p className="text-[#072534] font-['Source_Sans_Pro']">
                    125.139 Km
                  </p>
                  <p className="text-[#072534] font-['Source_Sans_Pro']">
                    Automatico
                  </p>
                  <p className="text-[#072534] font-['Source_Sans_Pro']">
                    Diesel
                  </p>
                  <p className="text-[#072534] font-['Source_Sans_Pro']">190</p>
                  <p className="text-[#072534] font-['Source_Sans_Pro']">140</p>
                  <p className="text-[#072534] font-['Source_Sans_Pro']">
                    2143
                  </p>
                  <p className="text-[#072534] font-['Source_Sans_Pro']">21</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </Container>
  );
};

export default CarCard;
