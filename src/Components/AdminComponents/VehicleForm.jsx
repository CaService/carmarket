import { useState } from "react";
import {
  Card,
  Input,
  Button,
  Typography,
  Textarea,
  Select,
  Option,
} from "@material-tailwind/react";

const VehicleForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    title: "",
    price: "",
    year: "",
    mileage: "",
    location: "",
    description: "",
    imageUrl: "",
    fuel: "", // Diesel o altro
    transmission: "", // Automatico o manuale
    registrationDate: "", // Data immatricolazione
    countryCode: "IT", // Codice paese
    auctionNumber: "", // Numero asta
  });
  // Stato separato per il file PDF
  const [pdfFile, setPdfFile] = useState(null);

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    // Gestione specifica per l'input file
    if (name === "pdfFile" && type === "file") {
      if (files.length > 0) {
        setPdfFile(files[0]); // Memorizza l'oggetto File
      } else {
        setPdfFile(null);
      }
      // Gestione per gli altri input
    } else if (type !== "file") {
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

    // Utilizzo di FormData per l'upload del file
    const data = new FormData();
    data.append("title", formData.title);
    data.append("price", formData.price);
    data.append("year", formData.year);
    data.append("imageUrl", formData.imageUrl);
    data.append("location", formData.location);
    data.append("description", formData.description);
    data.append("mileage", formData.mileage);
    data.append("registrationDate", formData.registrationDate);
    data.append("fuel", formData.fuel);
    data.append("transmission", formData.transmission);
    data.append("countryCode", formData.countryCode);
    data.append("auctionNumber", formData.auctionNumber);

    // Aggiungi il file PDF se selezionato
    if (!pdfFile) {
      alert("Per favore, seleziona un file PDF.");
      return;
    }
    data.append("pdfFile", pdfFile, pdfFile.name);

    try {
      console.log("Invio FormData...");

      // Utilizzo URL ASSOLUTO che punta al server Apache/XAMPP
      const response = await fetch(
        `${API_BASE_URL}/vehicles/vehicle_create.php`,
        {
          method: "POST",
          body: data,
        }
      );

      const responseText = await response.text();
      console.log("Risposta grezza:", responseText);

      let result;
      try {
        result = JSON.parse(responseText);
      } catch (parseError) {
        console.error("Errore nel parsing della risposta:", parseError);
        throw new Error(`Risposta non valida dal server: ${responseText}`);
      }

      if (!response.ok) {
        throw new Error(
          result?.message || `Errore HTTP! Status: ${response.status}`
        );
      }

      console.log("Risposta API:", result);

      // Assicurati che il backend restituisca l'URL del PDF salvato (es. in result.pdfUrl)
      if (result.status === "success" && result.pdfUrl) {
        const savedData = localStorage.getItem("cardAuctionData");
        const existingData = savedData
          ? JSON.parse(savedData)
          : { vehicles: [] };

        // Crea l'oggetto da salvare usando l'URL del PDF restituito dal server
        const vehicleDataToSave = {
          title: formData.title,
          price: formData.price,
          year: formData.year,
          imageUrl: formData.imageUrl,
          location: formData.location,
          description: formData.description,
          specs: {
            mileage: formData.mileage,
            registrationDate: formData.registrationDate,
            fuel: formData.fuel,
            transmission: formData.transmission,
          },
          pdf: {
            url: result.pdfUrl, // Usa l'URL dal server
          },
          countryCode: formData.countryCode,
          auctionNumber: formData.auctionNumber,
          id: result.vehicle_id,
        };

        existingData.vehicles.push(vehicleDataToSave);
        localStorage.setItem("cardAuctionData", JSON.stringify(existingData));

        onSubmit(vehicleDataToSave); // Passa i dati finali al parent

        // Reset del form e dello stato del file
        setFormData({
          title: "",
          price: "",
          year: "",
          mileage: "",
          location: "",
          description: "",
          imageUrl: "",
          fuel: "",
          transmission: "",
          registrationDate: "",
          countryCode: "IT",
          auctionNumber: "",
        });
        setPdfFile(null);
        e.target.reset(); // Resetta il form per pulire l'input file

        alert("Veicolo aggiunto con successo!");
      } else {
        throw new Error(
          result.message ||
            "Errore durante il salvataggio o URL PDF mancante dalla risposta."
        );
      }
    } catch (error) {
      console.error("Errore completo:", error);
      console.error("Stack trace:", error.stack);
      alert(`Errore durante il salvataggio del veicolo: ${error.message}`);
    }
  };

  return (
    <Card className="w-full max-w-[800px] mx-auto p-6 bg-white shadow-lg">
      <Typography variant="h4" color="blue-gray" className="mb-6">
        Inserisci Nuovo Veicolo
      </Typography>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            type="text"
            label="Titolo Veicolo"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
          <Input
            type="number"
            label="Prezzo"
            name="price"
            value={formData.price}
            onChange={handleChange}
            required
          />
          <Input
            type="number"
            label="Anno"
            name="year"
            value={formData.year}
            onChange={handleChange}
            required
          />
          <Input
            type="number"
            label="Chilometraggio"
            name="mileage"
            value={formData.mileage}
            onChange={handleChange}
            required
          />
          <Input
            type="text"
            label="Località"
            name="location"
            value={formData.location}
            onChange={handleChange}
            required
          />
          <Select
            label="Carburante"
            name="fuel"
            value={formData.fuel}
            onChange={(value) => handleSelectChange("fuel", value)}
            required
          >
            <Option value="Diesel">Diesel</Option>
            <Option value="Benzina">Benzina</Option>
            <Option value="Ibrido">Ibrido</Option>
            <Option value="Elettrico">Elettrico</Option>
          </Select>
          <Select
            label="Trasmissione"
            name="transmission"
            value={formData.transmission}
            onChange={(value) => handleSelectChange("transmission", value)}
            required
          >
            <Option value="Automatico">Automatico</Option>
            <Option value="Manuale">Manuale</Option>
          </Select>
          <Input
            type="date"
            label="Data Immatricolazione"
            name="registrationDate"
            value={formData.registrationDate}
            onChange={handleChange}
            required
          />
          <Input
            type="text"
            label="Numero Asta"
            name="auctionNumber"
            value={formData.auctionNumber}
            onChange={handleChange}
            required
          />
          <Input
            type="url"
            label="URL Immagine"
            name="imageUrl"
            value={formData.imageUrl}
            onChange={handleChange}
            required
          />
          <Input
            type="file"
            label="File PDF"
            name="pdfFile"
            accept=".pdf"
            onChange={handleChange}
            required
          />
        </div>
        <Textarea
          label="Descrizione"
          name="description"
          value={formData.description}
          onChange={handleChange}
          required
        />
        <Button type="submit" className="mt-6 cursor-pointer" fullWidth>
          Aggiungi Veicolo
        </Button>
      </form>
    </Card>
  );
};

export default VehicleForm;
