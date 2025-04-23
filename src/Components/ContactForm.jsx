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
        "https://carmarket-ayvens.com/server/api/contact_email.php",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: formData.name,
            email: userEmail,
            message: formData.message,
          }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        setPopupMessage("Messaggio inviato con successo!");
        setFormData({ name: "", email: "", message: "" });
      } else {
        setPopupMessage(data.message || "Errore nell'invio del messaggio");
      }
    } catch (error) {
      console.error("Errore:", error);
      setPopupMessage("Errore nell'invio del messaggio");
    } finally {
      setIsPopupVisible(true);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-2xl bg-white space-y-4 shadow-lg rounded-lg p-8 font-chillax"
      >
        <p className="text-center text-teal-500 font-medium pb-8">
          Hai bisogno di più informazioni? Compila il form per essere
          ricontattato
        </p>
        <div>
          <label className="block text-sm font-semibold text-gray-700">
            Nome
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            required
            className="mt-1 block w-full border p-1 font-medium border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700">
            Email
          </label>
          <input
            type="email"
            name="email"
            value={userEmail}
            disabled
            className="mt-1 block w-full border p-1 font-medium border-gray-300 rounded-md shadow-sm bg-gray-100 sm:text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700">
            Messaggio
          </label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            required
            className="mt-1 block w-full border p-1 font-medium border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            rows="4"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-[#73d2d2] hover:bg-[#5cb9b9] text-gray-700 hover:text-white font-semibold py-2 px-4 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 cursor-pointer"
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
