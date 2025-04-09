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
    pdfUrl: "", // URL del PDF
    countryCode: "IT", // Codice paese
    auctionNumber: "", // Numero asta
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formattedData = {
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
        url: formData.pdfUrl,
      },
      countryCode: formData.countryCode,
      auctionNumber: formData.auctionNumber,
    };

    try {
      console.log("Invio dati:", formattedData);

      const response = await fetch(
        "http://localhost/carmarket/server/api/vehicles/vehicle_create.php",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify(formattedData),
        }
      );

      // Log della risposta grezza
      const responseText = await response.text();
      console.log("Risposta grezza:", responseText);

      // Prova a parsare la risposta come JSON
      let result;
      try {
        result = JSON.parse(responseText);
      } catch (parseError) {
        console.error("Errore nel parsing della risposta:", parseError);
        throw new Error("Risposta non valida dal server");
      }

      if (!response.ok) {
        throw new Error(
          result.message || `HTTP error! status: ${response.status}`
        );
      }

      console.log("Risposta API:", result);

      if (result.status === "success") {
        const savedData = localStorage.getItem("cardAuctionData");
        const existingData = savedData
          ? JSON.parse(savedData)
          : { vehicles: [] };
        existingData.vehicles.push({ ...formattedData, id: result.vehicle_id });
        localStorage.setItem("cardAuctionData", JSON.stringify(existingData));

        onSubmit(formattedData);

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
          pdfUrl: "",
          countryCode: "IT",
          auctionNumber: "",
        });

        alert("Veicolo aggiunto con successo!");
      } else {
        throw new Error(result.message || "Errore durante il salvataggio");
      }
    } catch (error) {
      console.error("Errore completo:", error);
      console.error("Stack trace:", error.stack);
      alert("Errore durante il salvataggio del veicolo: " + error.message);
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
            onChange={(value) =>
              handleChange({ target: { name: "fuel", value } })
            }
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
            onChange={(value) =>
              handleChange({ target: { name: "transmission", value } })
            }
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
            type="url"
            label="URL PDF"
            name="pdfUrl"
            value={formData.pdfUrl}
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
