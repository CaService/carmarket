// import { useState } from "react";
import { API_BASE_URL, fetchConfig, handleApiResponse } from "../config/api";
import { useState } from "react";
import { CardAuth } from "./Navbar"; // Importa CardAuth da Navbar
// import CardSignInSelector from "./CardSignInSelector";
import Container from "./Container";
import Button from "./Button";
import { useNavigate } from "react-router-dom";
import { Dialog, DialogBody, DialogFooter } from "@material-tailwind/react";
// import { InfoCircledIcon } from "@radix-ui/react-icons";
// import Toggle from "./Toggle";

const CardSignIn = () => {
  const navigate = useNavigate();
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
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [showValidationDialog, setShowValidationDialog] = useState(false);
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  const [missingFields, setMissingFields] = useState([]);

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

  const validateForm = () => {
    const missing = [];
    Object.entries(formData).forEach(([key, value]) => {
      if (!value || value.trim() === "") {
        missing.push(key.replace(/_/g, " ").toUpperCase());
      }
    });
    return missing;
  };

  const handleSuccessDialogClose = () => {
    setShowSuccessDialog(false);
    navigate("/");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const missing = validateForm();

    if (missing.length > 0) {
      setMissingFields(missing);
      setShowValidationDialog(true);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${API_BASE_URL}/users/user_create.php`, {
        method: "POST",
        ...fetchConfig,
        body: JSON.stringify(formData),
      });

      const data = await handleApiResponse(response);

      if (data.status === "success") {
        // Invio email di notifica all'amministrazione
        try {
          await fetch(`${API_BASE_URL}/users/signup_email.php`, {
            method: "POST",
            ...fetchConfig,
            body: JSON.stringify(formData),
          });
        } catch (emailError) {
          console.error(
            "Errore nell'invio dell'email di notifica:",
            emailError
          );
        }

        setSuccess(true);
        setShowSuccessDialog(true);
      }
    } catch (error) {
      console.error("Errore durante la registrazione:", error);
      setError(error.message);
    } finally {
      setLoading(false);
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
          <h1 className="text-3xl font-medium text-teal-500 mb-16 opacity-80 font-chillax">
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
                    className="border-b text-xs border-black rounded px-3 py-2 text-gray-800
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
                    className="border-b text-xs border-black rounded px-3 py-2 text-gray-800
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
                    className="border-b text-xs border-black rounded px-3 py-2 text-gray-800
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
                    className="border-b text-xs border-black rounded px-3 py-2 text-gray-800
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
                    className="border-b text-xs border-black rounded px-3 py-2 text-gray-800
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
                    className="border-b text-xs border-black rounded px-3 py-2 text-gray-800
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
                    className="border-b text-xs border-black rounded px-3 py-2 text-gray-800
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
                    className="border-b text-xs border-black rounded px-3 py-2 text-gray-800
                           focus:outline-none focus:ring-2"
                    placeholder="Inserisci la tua password (max 15 caratteri)"
                  />
                </div>
              </div>
            </div>

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

        {/* Dialog per campi mancanti */}
        <Dialog
          open={showValidationDialog}
          handler={() => setShowValidationDialog(false)}
          className="relative z-50"
        >
          <DialogBody className="relative bg-white rounded-lg p-6 z-10">
            <div className="text-center">
              <h4 className="text-xl font-bold text-red-500 mb-4">
                Attenzione!
              </h4>
              <p className="mb-4">Per favore compila tutti i campi</p>
            </div>
            <DialogFooter className="flex justify-center pt-4">
              <Button onClick={() => setShowValidationDialog(false)}>
                Ho capito
              </Button>
            </DialogFooter>
          </DialogBody>
        </Dialog>

        {/* Dialog per registrazione completata */}
        <Dialog
          open={showSuccessDialog}
          handler={handleSuccessDialogClose}
          className="relative z-50"
        >
          <DialogBody className="relative bg-white rounded-lg p-6 z-10">
            <div className="text-center">
              <h4 className="text-xl font-bold text-green-500 mb-4">
                Registrazione Completata!
              </h4>
              <p className="mb-4">
                La registrazione è avvenuta con successo. Ora puoi effettuare il
                login.
              </p>
            </div>
            <DialogFooter className="flex justify-center pt-4">
              <Button onClick={handleSuccessDialogClose}>Ho capito</Button>
            </DialogFooter>
          </DialogBody>
        </Dialog>
      </Container>
    </div>
  );
};

export default CardSignIn;
