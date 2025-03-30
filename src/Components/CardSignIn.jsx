// import { useState } from "react";
import axios from "axios";
import { useState } from "react";
import { CardAuth } from "./Navbar"; // Importa CardAuth da Navbar
import { API_BASE_URL } from "../config/api";

// import CardSignInSelector from "./CardSignInSelector";
import Container from "./Container";
import Button from "./Button";
// import { InfoCircledIcon } from "@radix-ui/react-icons";
// import Toggle from "./Toggle";

const CardSignIn = () => {
  const [formData, setFormData] = useState({
    country: "",
    company_name: "",
    vat_number: "",
    address: "",
    postal_code: "",
    city: "",
    email: "",
    password: "",
  });

  const [showLoginModal, setShowLoginModal] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Validazione lunghezza password
    if (name === "password" && value.length > 15) {
      alert("La password non può superare i 15 caratteri");
      return;
    }

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      console.log("Dati form da inviare:", formData); // Log dei dati prima dell'invio

      const response = await fetch("/api/users/user_create.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      console.log("Risposta completa:", response); // Log della risposta completa
      console.log("Dati risposta:", response.data); // Log dei dati della risposta

      if (response.data.status === "success") {
        alert("Registrazione completata con successo!");
        // Pulizia del form dopo il successo
        setFormData({
          country: "",
          company_name: "",
          vat_number: "",
          address: "",
          postal_code: "",
          city: "",
          email: "",
          password: "",
        });
      }
    } catch (error) {
      console.error("Errore durante la registrazione:", error);
      const errorMessage =
        error.response?.data?.message || "Errore durante la registrazione";
      alert(errorMessage);
    }
  };

  const handleLoginClick = (e) => {
    e.preventDefault();
    setShowLoginModal(true);
  };

  const handleCloseLogin = () => {
    setShowLoginModal(false);
  };

  return (
    <div className="flex flex-col justify-center mt-16 pt-18">
      <Container>
        <div className="flex flex-col justify-center items-center">
          <h1 className="text-3xl font-medium text-teal-500 mb-16 opacity-80">
            Iscriviti per acquistare l&apos;usato Ayvens
          </h1>
        </div>
        <div className="max-w-2xl mx-auto bg-white p-8 shadow-lg rounded-lg">
          <form onSubmit={handleSubmit} className="flex flex-col space-y-6">
            <div>
              <h3 className="text-lg font-medium text-gray-800 mb-8">
                Società
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div className="flex flex-col">
                  <label
                    htmlFor="country"
                    className="mb-1 font-semibold text-gray-700"
                  >
                    Paese
                  </label>
                  <select
                    id="country"
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                    className="border-b text-xs border-black rounded px-3 py-2 
                           focus:outline-none focus:ring-2"
                  >
                    <option value="">Seleziona il Paese</option>
                    <option value="it">Italia</option>
                    <option value="fr">Francia</option>
                    <option value="de">Germania</option>
                  </select>
                </div>

                <div className="flex flex-col">
                  <label
                    htmlFor="societa"
                    className="mb-1 font-semibold text-gray-700"
                  >
                    Società
                  </label>
                  <input
                    type="text"
                    id="societa"
                    name="company_name"
                    value={formData.company_name}
                    onChange={handleChange}
                    className="border-b text-xs border-black rounded px-3 py-2
                           focus:outline-none focus:ring-2"
                    placeholder="Ragione sociale"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div className="flex flex-col">
                  <label
                    htmlFor="iva"
                    className="mb-1 font-semibold text-gray-700"
                  >
                    N. IVA
                  </label>
                  <input
                    type="text"
                    id="iva"
                    name="vat_number"
                    value={formData.vat_number}
                    onChange={handleChange}
                    className="border-b text-xs border-black rounded px-3 py-2
                           focus:outline-none focus:ring-2"
                    placeholder="Es. 12345678901"
                  />
                </div>

                <div className="flex flex-col">
                  <label
                    htmlFor="indirizzo"
                    className="mb-1 font-semibold text-gray-700"
                  >
                    Indirizzo
                  </label>
                  <input
                    type="text"
                    id="indirizzo"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    className="border-b text-xs border-black rounded px-3 py-2
                           focus:outline-none focus:ring-2"
                    placeholder="Es. Via Roma 1"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex flex-col">
                  <label
                    htmlFor="cap"
                    className="mb-1 font-semibold text-gray-700"
                  >
                    Codice Postale
                  </label>
                  <input
                    type="text"
                    id="cap"
                    name="postal_code"
                    value={formData.postal_code}
                    onChange={handleChange}
                    className="border-b text-xs border-black rounded px-3 py-2
                           focus:outline-none focus:ring-2"
                    placeholder="Es. 00100"
                  />
                </div>

                <div className="flex flex-col">
                  <label
                    htmlFor="citta"
                    className="mb-1 font-semibold text-gray-700"
                  >
                    Città
                  </label>
                  <input
                    type="text"
                    id="citta"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    className="border-b text-xs border-black rounded px-3 py-2
                           focus:outline-none focus:ring-2"
                    placeholder="Es. Roma"
                  />
                </div>
                <div className="flex flex-col">
                  <label
                    htmlFor="email"
                    className="mb-1 font-semibold text-gray-700"
                  >
                    Email
                  </label>
                  <input
                    type="text"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="border-b text-xs border-black rounded px-3 py-2
                           focus:outline-none focus:ring-2"
                    placeholder="Es. myemail@example.com"
                  />
                </div>
                <div className="flex flex-col">
                  <label
                    htmlFor="password"
                    className="mb-1 font-semibold text-gray-700"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    maxLength={15}
                    value={formData.password}
                    onChange={handleChange}
                    className="border-b text-xs border-black rounded px-3 py-2
                           focus:outline-none focus:ring-2"
                    placeholder="Inserisci la tua password (max 15 caratteri)"
                  />
                </div>
              </div>
            </div>

            {/* <div className="flex flex-col md:flex-row md:items-center md:space-x-4">
              <div>
                <span className="font-semibold text-gray-700 mb-2 md:mb-0">
                  Sono il rappresentante legale della mia società
                </span>
                <div className="flex items-center space-x-8 mt-4">
                  <span>No</span>
                  <Toggle
                    checked={isRepresentative}
                    onChange={handleToggleChange}
                  />
                  <span>Si</span>
                </div>
              </div>

              <a
                href="#"
                className="flex items-center mt-2 md:mt-0 text-sm text-teal-600 hover:underline whitespace-nowrap"
              >
                <InfoCircledIcon className="w-6 h-6 mr-2" />
                Chi è il legale rappresentante della società?
              </a>
            </div> */}
            <div className="flex justify-center mt-4">
              <Button type="submit">REGISTRATI</Button>
            </div>

            <div className="flex justify-center mt-4">
              <a
                href="#"
                className="text-sm text-blue-600 hover:underline"
                onClick={handleLoginClick}
              >
                Se hai già un account, accedi
              </a>
            </div>
          </form>
        </div>

        {showLoginModal && (
          <div
            className="z-50 fixed inset-0 flex items-center justify-center"
            style={{ backgroundColor: "rgba(0, 0, 0, 0.25)" }}
          >
            <div className="relative">
              <CardAuth onClose={handleCloseLogin} fromSignUp={true} />
            </div>
          </div>
        )}

        {/* <div className="max-w-2xl mx-auto mt-8">
          <CardSignInSelector />
        </div> */}
      </Container>
    </div>
  );
};

export default CardSignIn;
