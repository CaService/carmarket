import { useState } from "react";
import { useSelector } from "react-redux";
import MessagePopup from "./MessagePopup";

const ContactForm = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const userEmail = useSelector((state) => state.auth.user?.email);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [popupMessage, setPopupMessage] = useState("");
  const [isPopupVisible, setIsPopupVisible] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isAuthenticated) {
      setPopupMessage(
        "Per favore, effettua il login o registrati per inviare un messaggio."
      );
      setIsPopupVisible(true);
      return;
    }

    try {
      const response = await fetch(
        "http://localhost/carmarket/server/api/send_email.php",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ ...formData, email: userEmail }),
        }
      );

      if (response.ok) {
        setPopupMessage("Messaggio inviato con successo!");
        setFormData({ name: "", email: "", message: "" });
      } else {
        setPopupMessage("Errore nell'invio del messaggio");
      }
    } catch (error) {
      console.error("Errore:", error);
      setPopupMessage("Errore nell'invio del messaggio");
    } finally {
      setIsPopupVisible(true);
    }
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white space-y-4 shadow-lg rounded-lg p-8"
      >
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Nome
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Messaggio
          </label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            rows="4"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-md shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 cursor-pointer"
        >
          Invia
        </button>
      </form>
      {isPopupVisible && (
        <MessagePopup
          message={popupMessage}
          onClose={() => setIsPopupVisible(false)}
        />
      )}
    </>
  );
};

export default ContactForm;
