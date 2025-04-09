import { ClockIcon } from "@radix-ui/react-icons";
import Flag from "react-world-flags";
import { Link } from "react-router-dom";
import Container from "../Container";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import DocViewer, { DocViewerRenderers } from "@cyntler/react-doc-viewer";
import "@cyntler/react-doc-viewer/dist/index.css";

const CarCard = ({ vehicleData = {} }) => {
  const [showDetails, setShowDetails] = useState(false);
  const [pdfError, setPdfError] = useState(null);
  const { isAuthenticated } = useSelector((state) => state.auth);

  // Destructuring con valori di default
  const {
    title = "",
    price = "",
    imageUrl = "/images/Ayvens.svg", // Immagine di default
    specs = {
      mileage: "",
      registrationDate: new Date(),
      fuel: "",
      transmission: "",
    },
    pdf = { url: "" },
    auctionNumber = "1",
  } = vehicleData || {};

  const pdfUrl = pdf?.url || "";

  const docs = [
    {
      uri: pdfUrl,
      fileType: "pdf",
    },
  ];

  useEffect(() => {
    fetch(pdfUrl)
      .then((response) => {
        if (!response.ok) {
          setPdfError("PDF non disponibile al momento");
          console.error("PDF non trovato:", response.status);
        }
      })
      .catch((error) => {
        setPdfError("Errore nel caricamento del PDF");
        console.error("Errore nel caricamento del PDF:", error);
      });
  }, [pdfUrl]);

  const toggleDetails = () => {
    setShowDetails(!showDetails);
  };

  const handlePdfDownload = (e) => {
    e.preventDefault();
    e.stopPropagation();

    fetch(pdfUrl)
      .then((response) => {
        if (!response.ok) throw new Error("PDF non trovato");
        window.open(pdfUrl, "_blank");
      })
      .catch((error) => {
        console.error("Errore nel caricamento del PDF:", error);
        setPdfError("PDF non disponibile al momento");
      });
  };

  return (
    <Container>
      <div className="w-full mx-auto pr-0 md:pr-6 bg-white rounded-lg shadow-md overflow-hidden mt-8">
        <div className="flex flex-col md:flex md:flex-row">
          {/* Immagine Auto */}
          <div className="relative w-full md:w-96">
            <img
              src={imageUrl}
              alt={title}
              className="w-full h-[160px] md:h-full object-fit"
            />
            <div className="absolute bottom-2 left-2 bg-white rounded-full w-8 h-8 flex items-center justify-center">
              <span className="text-sm font-medium text-[#072534]">
                {auctionNumber}
              </span>
            </div>
          </div>

          {/* Contenuto */}
          <div className="flex flex-col md:flex-row p-4 md:p-6 w-full">
            <div className="flex-col w-full">
              <div className="flex flex-col md:flex-row md:items-center gap-2 mb-4">
                <div className="flex items-center gap-2 mb-2 md:mb-0 justify-center md:justify-start">
                  <div className="w-8 md:w-10 overflow-hidden rounded-full">
                    <Flag
                      code="IT"
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                    />
                  </div>
                  <span className="font-bold text-xl text-[#072534] font-chillax">
                    1.
                  </span>
                </div>
                <h2 className="text-teal-700 text-xl font-bold font-chillax text-center md:text-left">
                  {title}
                </h2>
              </div>

              <div className="flex items-center gap-2 text-blue-600 mb-4 justify-center md:justify-start">
                <span className="text-center md:text-left text-xs md:text-base">
                  Auto disponibile
                </span>
              </div>
              <div className="flex flex-col md:flex-row gap-2 text-gray-700 text-sm font-['Source_Sans_Pro'] text-center md:text-left">
                <span>
                  {specs.mileage} Chilometri |{" "}
                  {new Date(specs.registrationDate).toLocaleDateString()}
                </span>
                <span>
                  {specs.fuel} | {specs.transmission}
                </span>
              </div>

              <div className="mt-6 md:mt-4 block md:hidden">
                {isAuthenticated ? (
                  <button className="w-full bg-[#072534] text-center px-8 py-3 text-white cursor-pointer rounded-full font-semibold transition duration-300 hover:bg-white hover:text-[#072534] hover:border hover:border-[#072534] font-chillax">
                    ACQUISTA
                  </button>
                ) : (
                  <Link
                    to="/signup"
                    className="block w-full text-center bg-[#73d2d2] text-white px-8 py-3 cursor-pointer rounded-full font-semibold transition duration-300 hover:bg-white hover:border hover:border-[#072534] font-chillax"
                  >
                    REGISTRATI
                  </Link>
                )}
              </div>
            </div>

            <div className="hidden md:block mt-4">
              {isAuthenticated ? (
                <div className="text-center">
                  <p className="text-xl font-bold text-gray-800 mb-4">
                    PREZZO €
                  </p>
                  <button className="inline-block bg-[#072534] text-center px-8 py-3 mt-16 text-white cursor-pointer rounded-full font-semibold transition duration-300 hover:bg-white hover:text-[#072534] hover:border hover:border-[#072534] font-chillax">
                    ACQUISTA
                  </button>
                </div>
              ) : (
                <Link
                  to="/signup"
                  className="inline-block bg-[#73d2d2] text-center px-8 py-3 mt-20 cursor-pointer rounded-full font-semibold transition duration-300 hover:bg-white hover:border hover:border-[#072534] font-chillax"
                >
                  REGISTRATI
                </Link>
              )}
            </div>
          </div>
        </div>

        {/* Accordion Buttons */}
        <div className="border-t border-gray-100">
          <div className="flex">
            <button
              onClick={toggleDetails}
              className="text-center flex-1 p-4 pb-8 font-semibold cursor-pointer text-[#072534] underline-animation"
            >
              DETTAGLI {showDetails ? "-" : "+"}
            </button>
            <button
              onClick={handlePdfDownload}
              className="text-center flex-1 p-4 pb-8 font-semibold cursor-pointer text-[#072534] underline-animation"
            >
              SCARICA PDF +
            </button>
          </div>

          {/* Dropdown Details con PDF */}
          {showDetails && (
            <div className="px-6 pb-6 pt-6 mb-6 ml-6 mt-6 border-t border-gray-100 bg-gray-100 rounded-lg">
              <div className="flex justify-center">
                <div className="w-full max-w-3xl">
                  {pdfError ? (
                    <div className="text-center py-4">
                      <p className="text-red-600 mb-4">{pdfError}</p>
                      <button
                        onClick={handlePdfDownload}
                        className="px-4 py-2 bg-[#072534] text-white rounded-full"
                      >
                        Scarica PDF
                      </button>
                    </div>
                  ) : (
                    <div className="pdf-viewer-container">
                      <DocViewer
                        documents={docs}
                        pluginRenderers={DocViewerRenderers}
                        config={{
                          header: {
                            disableHeader: false,
                            disableFileName: true,
                          },
                          pdfZoom: {
                            defaultZoom: 1,
                            zoomJump: 0.2,
                          },
                          pdfVerticalScrollByDefault: true,
                        }}
                        theme={{
                          primary: "#ffffff",
                          secondary: "#ffffff",
                          tertiary: "#73d2d2",
                          textPrimary: "#ffffff",
                          textSecondary: "#ffffff",
                          textTertiary: "#ffffff",
                        }}
                      />
                    </div>
                  )}
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
