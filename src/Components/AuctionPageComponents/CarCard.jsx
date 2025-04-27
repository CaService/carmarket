import Flag from "react-world-flags";
import { Link } from "react-router-dom";
import Container from "../Container";
import { useSelector } from "react-redux";
import { useState, useRef } from "react";
import "@cyntler/react-doc-viewer/dist/index.css";
import { API_BASE_URL, fetchConfig, handleApiResponse } from "../../config/api";
import PurchaseConfirmationEmail from "../PurchaseConfirmationEmail";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";

const CarCard = ({ vehicleData = {} }) => {
  const [showDetails, setShowDetails] = useState(false);
  const [pdfError, setPdfError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);
  const emailRef = useRef(null);

  // Destructuring con valori di default
  const {
    title = "",
    price = "",
    imageUrl = "/images/Ayvens.svg",
    specs = {
      mileage: "",
      registrationDate: new Date(),
      fuel: "",
      transmission: "",
      year: "",
    },
    pdf = { url: "" },
    auctionNumber = "1",
    vehicle = { id: "" },
    description = "",
    location = "",
    countryCode = "IT",
  } = vehicleData || {};

  const pdfUrl = pdf?.url || "";
  const correctedPdfUrl = pdfUrl.startsWith("http") ? pdfUrl : `${pdfUrl}`;

  const docs = [
    {
      uri: correctedPdfUrl,
      fileType: "pdf",
    },
  ];

  const toggleDetails = () => {
    setShowDetails(!showDetails);
  };

  const handlePdfDownload = (e) => {
    e.preventDefault();
    e.stopPropagation();

    // Verifica che ci sia un URL del PDF
    if (!correctedPdfUrl) {
      setPdfError("PDF non disponibile");
      return;
    }

    console.log("Tentativo download PDF da:", correctedPdfUrl); // Per debug
    window.open(correctedPdfUrl, "_blank");
  };

  const generatePDF = async () => {
    try {
      // Creiamo un elemento temporaneo con stili base
      const tempDiv = document.createElement("div");
      tempDiv.style.width = "600px";
      tempDiv.style.padding = "20px";
      tempDiv.style.backgroundColor = "#FFFFFF";
      tempDiv.style.color = "#000000";
      tempDiv.style.fontFamily = "Arial, sans-serif";

      // Aggiungiamo il contenuto
      tempDiv.innerHTML = `
        <div style="text-align: center; margin-bottom: 20px;">
          <h1 style="color: #000000; margin-bottom: 20px;">Conferma ordine</h1>
          <div style="font-size: 48px; margin-bottom: 20px;">✓</div>
        </div>
        
        <div style="margin-bottom: 20px;">
          <p>Congratulazioni! Acquisto completato.</p>
          
          <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
            <tr style="background-color: #000000; color: #FFFFFF;">
              <th style="padding: 10px; text-align: left;">Articolo</th>
              <th style="padding: 10px; text-align: left;">Prezzo</th>
            </tr>
            <tr>
              <td style="padding: 10px; border: 1px solid #000000;">1 x ${title}</td>
              <td style="padding: 10px; border: 1px solid #000000;">€ ${price},00</td>
            </tr>
          </table>
          
          <div style="margin: 10px 0;">
            <strong>Importo totale</strong>
            <span style="float: right;">€ ${price},00</span>
          </div>
          
          <div style="margin: 10px 0;">
            <span>Incluso 22% IVA su € ${price}</span>
            <span style="float: right;">€ ${parseFloat(price) * 0.22}</span>
          </div>
          
          <div style="margin: 20px 0;">
            <p><strong>Ordine #${auctionNumber}</strong></p>
            <p><strong>Metodo di pagamento:</strong><br>Bonifico bancario.</p>
            <p>Congratulazioni, avete concluso l'acquisto con successo.</p>
            <p style="color: #0000FF;">Riceverete comunicazione via e-mail con la fattura proforma per procedere al saldo</p>
          </div>
          
          <div style="display: flex; justify-content: space-between; margin-top: 30px;">
            <div style="width: 48%;">
              <h3>Estremi di pagamento</h3>
              <p>
                Adriano Tuzzi<br>
                Ayvens s.r.l.<br>
                VIA CIVIDALE 356 60<br>
                33100 UDINE UD<br>
                Italia
              </p>
              <p>
                Email: noreply@carmarket-ayvens.com<br>
                Telefono: +391234567890<br>
                P.IVA/C.F.: 0123456789<br>
                Codice Fiscale: IT00605220326
              </p>
            </div>
            
            <div style="width: 48%;">
              <h3>Indirizzo di spedizione</h3>
              <p>
                maurizio ballarin<br>
                aerrecar s.r.l.<br>
                VIA SAN FRANCESCO D'ASSISI 60<br>
                34133 TRIESTE TS<br>
                Italia
              </p>
            </div>
          </div>
        </div>
      `;

      document.body.appendChild(tempDiv);

      const canvas = await html2canvas(tempDiv, {
        scale: 2,
        useCORS: true,
        logging: false,
        backgroundColor: "#FFFFFF",
      });

      document.body.removeChild(tempDiv);

      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
      });

      const imgWidth = 210;
      const pageHeight = 297;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;
      let position = 0;

      pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      return pdf;
    } catch (error) {
      console.error("Errore nella generazione del PDF:", error);
      throw error;
    }
  };

  const handlePurchase = async () => {
    try {
      setLoading(true);

      // Genera e scarica il PDF
      const pdf = await generatePDF();
      pdf.save(`ordine_${auctionNumber}.pdf`);

      // Invia la richiesta di conferma acquisto
      const response = await fetch(
        `${API_BASE_URL}/orders/confirm_purchase.php`,
        {
          method: "POST",
          ...fetchConfig,
          body: JSON.stringify({
            userEmail: user.email,
            auctionNumber: auctionNumber,
            vehicleTitle: title,
            vehiclePrice: price,
            vehicleId: vehicle.id,
            userId: user.id,
          }),
        }
      );

      const data = await handleApiResponse(response);

      if (data.status === "success") {
        setSuccess(true);
        alert("Acquisto confermato! Riceverai un'email di conferma.");
        setShowModal(false);
      }
    } catch (error) {
      setError(error.message);
      console.error("Errore durante la conferma dell'acquisto:", error);
      alert(
        "Si è verificato un errore durante la conferma dell'acquisto. Riprova più tardi."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      {/* MODAL POPUP */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white rounded-lg shadow-lg p-8 max-w-4xl w-full overflow-y-auto max-h-[90vh]">
            <h2 className="text-4xl font-bold text-teal-600 mb-4 text-center">
              CONFERMA ACQUISTO
            </h2>
            <p className="text-gray-700 text-center mb-6 italic">
              Cliccando conferma accetti l&apos;ordine e scarichi questo
              proforma, a breve riceverai la mail contenente la fattura
              dell&apos;acquisto.
            </p>
            <div className="mb-8" ref={emailRef}>
              <PurchaseConfirmationEmail
                vehicleTitle={title}
                vehiclePrice={parseFloat(price)}
                auctionNumber={auctionNumber}
              />
            </div>
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
                      code={countryCode}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                    />
                  </div>
                  <span className="font-bold text-xl text-[#072534] font-chillax">
                    {auctionNumber}.
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
                  {new Date(specs.registrationDate).toLocaleDateString(
                    "it-IT",
                    {
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric",
                    }
                  )}
                </span>
                <span>
                  {specs.fuel} | {specs.transmission}
                </span>
              </div>

              <div className="mt-6 md:mt-4 block md:hidden">
                {isAuthenticated ? (
                  <button
                    className="w-full bg-[#072534] text-center px-8 py-3 text-white cursor-pointer rounded-full font-semibold transition duration-300 hover:bg-white hover:text-[#072534] border border-transparent hover:border-[#072534] font-chillax"
                    onClick={() => setShowModal(true)}
                  >
                    ACQUISTA
                  </button>
                ) : (
                  <Link
                    to="/signup"
                    className="block w-full text-center bg-[#73d2d2] text-white px-8 py-3 cursor-pointer rounded-full font-semibold transition duration-300 hover:bg-white hover:border-[#072534] border border-transparent font-chillax"
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
                    className="inline-block bg-[#072534] text-center px-8 py-3 mt-8 text-white cursor-pointer rounded-full font-semibold transition duration-300 hover:bg-white hover:text-[#072534] border border-transparent hover:border-[#072534] font-chillax"
                    onClick={() => setShowModal(true)}
                  >
                    ACQUISTA
                  </button>
                </div>
              ) : (
                <Link
                  to="/signup"
                  className="inline-block bg-[#73d2d2] text-center px-8 py-3 cursor-pointer rounded-full font-semibold transition duration-300 hover:bg-white hover:border-[#072534] border border-transparent font-chillax"
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

          {/* Dropdown Details con tabella delle caratteristiche */}
          {showDetails && (
            <div className="px-4 md:px-6 pb-6 bg-gray-100 border-t border-gray-200 w-full">
              <div className="w-full">
                <div className="divide-y divide-gray-200 mt-4">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between py-3">
                    <span className="font-medium text-gray-700 mb-1 md:mb-0">
                      ANNO
                    </span>
                    <span className="text-gray-600 md:text-right">
                      {specs.year || "N/D"}
                    </span>
                  </div>
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between py-3">
                    <span className="font-medium text-gray-700 mb-1 md:mb-0">
                      CHILOMETRAGGIO
                    </span>
                    <span className="text-gray-600 md:text-right">
                      {specs.mileage || "N/D"} Chilometri
                    </span>
                  </div>
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between py-3">
                    <span className="font-medium text-gray-700 mb-1 md:mb-0">
                      CARBURANTE
                    </span>
                    <span className="text-gray-600 md:text-right">
                      {specs.fuel || "N/D"}
                    </span>
                  </div>
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between py-3">
                    <span className="font-medium text-gray-700 mb-1 md:mb-0">
                      CAMBIO
                    </span>
                    <span className="text-gray-600 md:text-right">
                      {specs.transmission || "N/D"}
                    </span>
                  </div>
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between py-3">
                    <span className="font-medium text-gray-700 mb-1 md:mb-0">
                      DATA IMMATRICOLAZIONE
                    </span>
                    <span className="text-gray-600 md:text-right">
                      {specs.registrationDate
                        ? new Date(specs.registrationDate).toLocaleDateString(
                            "it-IT",
                            {
                              day: "2-digit",
                              month: "2-digit",
                              year: "numeric",
                            }
                          )
                        : "N/D"}
                    </span>
                  </div>
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between py-3">
                    <span className="font-medium text-gray-700 mb-1 md:mb-0">
                      LOCALITÀ
                    </span>
                    <span className="text-gray-600 md:text-right">
                      {location || "N/D"}
                    </span>
                  </div>
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between py-3">
                    <span className="font-medium text-gray-700 mb-1 md:mb-0">
                      PAESE
                    </span>
                    <span className="text-gray-600 md:text-right">
                      {countryCode || "IT"}
                    </span>
                  </div>
                  {description && (
                    <div className="py-3">
                      <span className="font-medium text-gray-700 block mb-2">
                        DESCRIZIONE
                      </span>
                      <p className="text-gray-600">{description}</p>
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
