import { useState, useEffect } from "react";
import {
  Card,
  Typography,
  Button,
  Spinner,
  Chip,
} from "@material-tailwind/react";
import AdminContainer from "./AdimnContainer";
import { Link } from "react-router-dom";

const VehiclesTable = () => {
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `${API_BASE_URL}/vehicles/get_vehicles.php`
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        if (data.status === "success") {
          setVehicles(data.vehicles);
        } else {
          throw new Error(data.message || "Errore nel recupero dei veicoli");
        }
      } catch (error) {
        console.error("Errore nel caricamento dei veicoli:", error);
        setError(error.message || "Errore durante il caricamento dei veicoli");
      } finally {
        setLoading(false);
      }
    };

    fetchVehicles();
  }, [refreshTrigger]);

  const handleDeleteVehicle = async (id) => {
    if (window.confirm("Sei sicuro di voler eliminare questo veicolo?")) {
      try {
        setLoading(true);

        const response = await fetch(
          `http://localhost/carmarket/server/api/vehicles/delete_vehicle.php?id=${id}`,
          {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
            },
          }
        );

        const responseText = await response.text();
        console.log("Risposta eliminazione:", responseText);

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

        if (result.status === "success") {
          setVehicles(vehicles.filter((vehicle) => vehicle.id !== id));

          const savedData = localStorage.getItem("cardAuctionData");
          if (savedData) {
            const existingData = JSON.parse(savedData);
            if (existingData.vehicles) {
              existingData.vehicles = existingData.vehicles.filter(
                (v) => v.id !== id
              );
              localStorage.setItem(
                "cardAuctionData",
                JSON.stringify(existingData)
              );
            }
          }

          alert("Veicolo eliminato con successo!");
        } else {
          throw new Error(result.message || "Errore durante l'eliminazione");
        }
      } catch (error) {
        console.error("Errore durante l'eliminazione:", error);
        alert("Errore durante l'eliminazione del veicolo: " + error.message);
      } finally {
        setLoading(false);
        setRefreshTrigger((prev) => prev + 1);
      }
    }
  };

  if (loading) {
    return (
      <AdminContainer>
        <div className="flex justify-center items-center h-96">
          <Spinner className="h-12 w-12" />
          <span className="ml-4 text-lg">Caricamento veicoli...</span>
        </div>
      </AdminContainer>
    );
  }

  if (error) {
    return (
      <AdminContainer>
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded relative mb-4">
          <strong className="font-bold">Errore!</strong>
          <span className="block sm:inline"> {error}</span>
        </div>
      </AdminContainer>
    );
  }

  return (
    <AdminContainer>
      <Card className="w-full overflow-auto p-4">
        <div className="flex justify-between items-center mb-4">
          <Typography variant="h5" color="blue-gray">
            Tabella Veicoli
          </Typography>
          <Button
            color="blue"
            size="sm"
            onClick={() => setRefreshTrigger((prev) => prev + 1)}
            className="flex items-center gap-1 cursor-pointer"
          >
            Aggiorna
          </Button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-max table-auto text-left">
            <thead>
              <tr>
                <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-bold leading-none opacity-70"
                  >
                    ID
                  </Typography>
                </th>
                <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-bold leading-none opacity-70"
                  >
                    Immagine
                  </Typography>
                </th>
                <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-bold leading-none opacity-70"
                  >
                    Titolo
                  </Typography>
                </th>
                <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-bold leading-none opacity-70"
                  >
                    Prezzo
                  </Typography>
                </th>
                <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-bold leading-none opacity-70"
                  >
                    Anno
                  </Typography>
                </th>
                <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-bold leading-none opacity-70"
                  >
                    Carburante
                  </Typography>
                </th>
                <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-bold leading-none opacity-70"
                  >
                    Azioni
                  </Typography>
                </th>
              </tr>
            </thead>
            <tbody>
              {vehicles.length === 0 ? (
                <tr>
                  <td colSpan="7" className="p-4 text-center">
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      Nessun veicolo disponibile
                    </Typography>
                  </td>
                </tr>
              ) : (
                vehicles.map((vehicle, index) => (
                  <tr
                    key={vehicle.id}
                    className={index % 2 === 0 ? "bg-blue-gray-50/50" : ""}
                  >
                    <td className="p-4">
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {vehicle.id}
                      </Typography>
                    </td>
                    <td className="p-4">
                      <img
                        src={vehicle.imageUrl}
                        alt={vehicle.title}
                        className="h-12 w-20 object-cover rounded"
                      />
                    </td>
                    <td className="p-4">
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {vehicle.title}
                      </Typography>
                    </td>
                    <td className="p-4">
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        € {vehicle.price}
                      </Typography>
                    </td>
                    <td className="p-4">
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {vehicle.year}
                      </Typography>
                    </td>
                    <td className="p-4">
                      <Chip
                        variant="gradient"
                        color={
                          vehicle.specs.fuel === "Diesel"
                            ? "blue"
                            : vehicle.specs.fuel === "Benzina"
                            ? "red"
                            : "green"
                        }
                        value={vehicle.specs.fuel || "N/D"}
                        className="w-fit"
                      />
                    </td>
                    <td className="p-4">
                      <div className="flex gap-2">
                        <Link to={`/auction`} target="_blank">
                          <Button
                            color="blue"
                            size="sm"
                            className="cursor-pointer"
                          >
                            Visualizza
                          </Button>
                        </Link>
                        <Button
                          color="red"
                          size="sm"
                          className="cursor-pointer"
                          onClick={() => handleDeleteVehicle(vehicle.id)}
                        >
                          Elimina
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </Card>
    </AdminContainer>
  );
};

export default VehiclesTable;
