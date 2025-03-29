import { ClockIcon } from "@radix-ui/react-icons";
import Flag from "react-world-flags";
import { Link } from "react-router-dom";
import Container from "../Container";
import { useSelector } from "react-redux";
import ayvensLogo from "../../assets/Ayvens.svg";
import bannerImage from "../../assets/banner-1680px.jpg";
import logoWhite from "../../assets/logo-desktop-ayvens-white.svg";

const CarCard = () => {
  const { isAuthenticated } = useSelector((state) => state.auth);

  return (
    <Container>
      <div className="w-full mx-auto pr-6 bg-white rounded-lg shadow-md overflow-hidden mt-8">
        <div className="flex">
          {/* Immagine Auto */}
          <div className="relative w-96">
            <img
              src={ayvensLogo}
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
                <span className="font-bold text-xl">1.</span>
                <h2 className="text-teal-700 text-xl font-bold">
                  AUDI AUDI A3 30 TDI S tronic Business S.Back Hatchback 5-door
                  (Euro 6D)
                </h2>
              </div>

              <div className="flex items-center gap-2 text-blue-600 mb-4">
                <ClockIcon className="w-5 h-5" />
                <span>Termina tra 2 giorno(i) 10 ora(e) 44 minuto(i)</span>
              </div>
              <div className="flex gap-4 text-gray-700 text-sm">
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
                  <button className="inline-block bg-[#072534] w-90 text-center px-8 py-3 mt-16 text-white cursor-pointer rounded-full font-semibold transition duration-300 hover:bg-white hover:text-[#072534] hover:border hover:border-[#072534]">
                    ACQUISTA
                  </button>
                </div>
              ) : (
                <Link
                  to="/signup"
                  className="inline-block bg-[#73d2d2] w-90 text-center px-8 py-3 mt-20 cursor-pointer rounded-full font-semibold transition duration-300 hover:bg-white hover:border hover:border-[#072534]"
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
            <button className="text-center flex-1 p-4 font-semibold cursor-pointer text-gray-700">
              <span className="ml-20 underline-animation">DETTAGLI</span>
            </button>
            <span className="ml-4 text-4xl">+</span>
            <button className="text-center flex-1 p-4 font-semibold cursor-pointer text-gray-700">
              <span className="ml-20 underline-animation">SCARICA PDF</span>
            </button>
            <span className="ml-4 text-4xl">+</span>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default CarCard;
