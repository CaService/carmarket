import { useState } from "react";
import {
  Card,
  Input,
  Button,
  Typography,
  Textarea,
  Select,
  Option,
  Spinner,
} from "@material-tailwind/react";
import AdminContainer from "./AdimnContainer";
import {
  API_BASE_URL,
  fetchConfig,
  uploadConfig,
  handleApiResponse,
} from "../../config/api";

const VehicleForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    title: "",
    price: "",
    year: "",
    mileage: "",
    location: "Italia",
    description: "",
    imageFile: null,
    fuel: "Diesel",
    transmission: "Manuale",
    registrationDate: "",
    countryCode: "IT",
    auctionNumber: "",
    pdf: null,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === "file") {
      if (files.length > 0) {
        if (name === "pdf") {
          setFormData((prev) => ({
            ...prev,
            pdf: files[0],
          }));
        } else if (name === "imageFile") {
          setFormData((prev) => ({
            ...prev,
            imageFile: files[0],
          }));
        }
      }
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  // Gestione del cambiamento per i componenti Select di Material Tailwind
  const handleSelectChange = (name, value) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const formDataObj = new FormData();

      // Aggiungi tutti i campi al FormData tranne i file
      Object.keys(formData).forEach((key) => {
        if (key !== "pdf" && key !== "imageFile") {
          formDataObj.append(key, formData[key]);
        }
      });

      // Aggiungi i file con i nomi corretti
      if (formData.pdf) {
        formDataObj.append("pdfFile", formData.pdf);
      }
      if (formData.imageFile) {
        formDataObj.append("imageFile", formData.imageFile);
      }

      const response = await fetch(
        `${API_BASE_URL}/vehicles/vehicle_create.php`,
        {
          method: "POST",
          body: formDataObj,
        }
      );

      // Verifica se la risposta è JSON valido
      const contentType = response.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        throw new Error("La risposta del server non è in formato JSON valido");
      }

      const data = await response.json();

      if (data.status === "error") {
        throw new Error(data.message);
      }

      if (data.status === "success") {
        const imageUrl = data.imageUrl;
        const pdfUrl = data.pdfUrl;

        setSuccess("Veicolo aggiunto con successo!");
        resetForm();

        if (onSubmit) {
          onSubmit({
            ...data,
            imageUrl,
            pdf: { url: pdfUrl },
            specs: {
              mileage: formData.mileage,
              registrationDate: formData.registrationDate,
              fuel: formData.fuel,
              transmission: formData.transmission,
            },
            vehicle: { id: data.vehicle_id },
          });
        }
      }
    } catch (error) {
      setError(
        error.message ||
          "Si è verificato un errore durante il caricamento del veicolo"
      );
      console.error("Errore durante il caricamento:", error);
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      title: "",
      price: "",
      year: "",
      mileage: "",
      location: "Italia",
      description: "",
      imageFile: null,
      fuel: "Diesel",
      transmission: "Manuale",
      registrationDate: "",
      countryCode: "IT",
      auctionNumber: "",
      pdf: null,
    });

    // Reset dei campi file usando gli ID dei campi
    const pdfInput = document.getElementById("pdf");
    const imageInput = document.getElementById("imageFile");
    if (pdfInput) pdfInput.value = "";
    if (imageInput) imageInput.value = "";
  };

  return (
    <AdminContainer>
      <Card color="transparent" shadow={false} className="p-4 md:p-8">
        <Typography variant="h4" color="blue-gray">
          Aggiungi Nuovo Veicolo
        </Typography>
        <Typography color="gray" className="mt-1 font-normal">
          Inserisci i dettagli del veicolo da aggiungere all'asta.
        </Typography>

        {error && (
          <div
            className="mt-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
            role="alert"
          >
            <strong className="font-bold">Errore!</strong>
            <span className="block sm:inline"> {error}</span>
          </div>
        )}
        {success && (
          <div
            className="mt-4 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative"
            role="alert"
          >
            <strong className="font-bold">Successo!</strong>
            <span className="block sm:inline"> {success}</span>
          </div>
        )}

        <form className="mt-8 mb-2 w-full" onSubmit={handleSubmit}>
          <div className="mb-4 grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input
              size="lg"
              label="Titolo"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
            />
            <Input
              size="lg"
              label="Prezzo (€)"
              name="price"
              type="number"
              step="0.01"
              value={formData.price}
              onChange={handleChange}
              required
            />
            <Input
              size="lg"
              label="Anno"
              name="year"
              type="number"
              value={formData.year}
              onChange={handleChange}
              required
            />
            <Input
              size="lg"
              label="Chilometraggio (km)"
              name="mileage"
              type="number"
              value={formData.mileage}
              onChange={handleChange}
              required
            />
            <Input
              size="lg"
              label="Località"
              name="location"
              value={formData.location}
              onChange={handleChange}
              required
            />
            <Input
              size="lg"
              label="Numero Asta"
              name="auctionNumber"
              value={formData.auctionNumber}
              onChange={handleChange}
              required
            />
            <Input
              size="lg"
              label="Codice Paese (es. IT)"
              name="countryCode"
              value={formData.countryCode}
              onChange={handleChange}
              required
              maxLength="2"
            />
            <Input
              size="lg"
              label="Data Immatricolazione"
              name="registrationDate"
              type="date"
              value={formData.registrationDate}
              onChange={handleChange}
              required
            />

            {/* Selettori per Carburante e Trasmissione */}
            <div>
              <label
                htmlFor="fuel"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Carburante
              </label>
              <select
                id="fuel"
                name="fuel"
                value={formData.fuel}
                onChange={(e) => handleSelectChange("fuel", e.target.value)}
                required
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md border"
              >
                <option>Diesel</option>
                <option>Benzina</option>
                <option>Elettrico</option>
                <option>Ibrido</option>
                <option>GPL</option>
                <option>Metano</option>
              </select>
            </div>

            <div>
              <label
                htmlFor="transmission"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Trasmissione
              </label>
              <select
                id="transmission"
                name="transmission"
                value={formData.transmission}
                onChange={(e) =>
                  handleSelectChange("transmission", e.target.value)
                }
                required
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md border"
              >
                <option>Manuale</option>
                <option>Automatico</option>
              </select>
            </div>

            {/* File Inputs */}
            <div>
              <label
                htmlFor="imageFile"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Immagine Veicolo
              </label>
              <input
                type="file"
                id="imageFile"
                name="imageFile"
                accept="image/*"
                onChange={handleChange}
                required
                className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
              />
            </div>

            <div>
              <label
                htmlFor="pdf"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Documento PDF
              </label>
              <input
                type="file"
                id="pdf"
                name="pdf"
                accept=".pdf"
                onChange={handleChange}
                required
                className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
              />
            </div>
          </div>

          <div className="mb-4">
            <Textarea
              size="lg"
              label="Descrizione"
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
            />
          </div>

          <Button type="submit" className="mt-6" fullWidth disabled={loading}>
            {loading ? (
              <Spinner className="h-4 w-4 mx-auto" />
            ) : (
              "Aggiungi Veicolo"
            )}
          </Button>
        </form>
      </Card>
    </AdminContainer>
  );
};

export default VehicleForm;
