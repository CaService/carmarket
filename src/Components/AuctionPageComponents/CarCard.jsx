import { ClockIcon } from "@radix-ui/react-icons";
import Flag from "react-world-flags";
import { Link } from "react-router-dom";
import Container from "../Container";
import { useSelector } from "react-redux";
import { useState } from "react";
import DocViewer, { DocViewerRenderers } from "@cyntler/react-doc-viewer";
import "@cyntler/react-doc-viewer/dist/index.css";
import { API_BASE_URL, fetchConfig, handleApiResponse } from "../../config/api";

const CarCard = ({ vehicleData = {} }) => {
  const [showDetails, setShowDetails] = useState(false);
  const [pdfError, setPdfError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);

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
    vehicle = { id: "" },
  } = vehicleData || {};

  const pdfUrl = pdf?.url || "";

  const docs = [
    {
      uri: pdfUrl,
      fileType: "pdf",
    },
  ];

  const toggleDetails = () => {
    setShowDetails(!showDetails);
  };

  const handlePdfDownload = (e) => {
    e.preventDefault();
    e.stopPropagation();

    // Assicurati che pdfUrl sia un URL completo
    const fullPdfUrl = pdfUrl.startsWith("http")
      ? pdfUrl
      : `https://carmarket-ayvens.com/repositories/carmarket${pdfUrl}`;

    window.open(fullPdfUrl, "_blank");
  };

  const handlePurchase = async () => {
    try {
      setLoading(true);

      const response = await fetch(
        `${API_BASE_URL}/orders/confirm_purchase.php`,
        {
          method: "POST",
          ...fetchConfig,
          body: JSON.stringify({
            vehicleId: vehicle.id,
            userId: user.id,
          }),
        }
      );

      const data = await handleApiResponse(response);

      if (data.status === "success") {
        // Gestisci il successo
        setSuccess(true);
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      {/* MODAL POPUP */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full">
            <h2 className="text-4xl font-bold text-teal-600 mb-4 text-center">
              ATTENZIONE
            </h2>
            <p className="text-gray-800 text-center mb-8">
              Stai per confermare l&apos;ordine{" "}
              <span className="font-bold">#{auctionNumber}</span>.<br />
              Vuoi procedere con l&apos;acquisto?
            </p>
            <div className="flex justify-center gap-4">
              <button
                className="px-6 py-2 rounded-full bg-gray-200 text-gray-800 font-semibold hover:bg-gray-300 transition cursor-pointer"
                onClick={() => setShowModal(false)}
              >
                INDIETRO
              </button>
              <button
                className="px-6 py-2 rounded-full bg-[#072534] text-white font-semibold hover:bg-[#0f3549] transition cursor-pointer"
                onClick={handlePurchase}
              >
                CONFERMA
              </button>
            </div>
          </div>
        </div>
      )}
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
                  <button
                    className="w-full bg-[#072534] text-center px-8 py-3 text-white cursor-pointer rounded-full font-semibold transition duration-300 hover:bg-white hover:text-[#072534] hover:border hover:border-[#072534] font-chillax"
                    onClick={() => setShowModal(true)}
                  >
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
                  <p className="text-2xl font-bold text-[#072534] mb-4">
                    {price}
                  </p>
                  <button
                    className="inline-block bg-[#072534] text-center px-8 py-3 mt-8 text-white cursor-pointer rounded-full font-semibold transition duration-300 hover:bg-white hover:text-[#072534] hover:border hover:border-[#072534] font-chillax"
                    onClick={() => setShowModal(true)}
                  >
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
