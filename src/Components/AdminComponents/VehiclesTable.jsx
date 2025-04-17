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
import { API_BASE_URL, fetchConfig } from "../../config/api";

const VehiclesTable = () => {
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch(
          `${API_BASE_URL}/vehicles/get_vehicles.php`,
          {
            method: "GET",
            headers: fetchConfig.headers,
            credentials: fetchConfig.credentials,
          }
        );

        const responseText = await response.text();
        console.log("Risposta dal server (get_vehicles):", responseText);

        let data;
        try {
          data = JSON.parse(responseText);
        } catch (parseError) {
          console.error("Errore parsing JSON:", parseError);
          throw new Error(
            `Risposta non JSON dal server: ${responseText.substring(0, 100)}...`
          );
        }

        if (!response.ok) {
          throw new Error(data.message || `Errore HTTP: ${response.status}`);
        }

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
        setError(null);

        const response = await fetch(
          `${API_BASE_URL}/vehicles/delete_vehicle.php?id=${id}`,
          {
            method: "DELETE",
            headers: fetchConfig.headers,
            credentials: fetchConfig.credentials,
          }
        );

        const responseText = await response.text();
        console.log("Risposta eliminazione:", responseText);

        let result;
        try {
          result = JSON.parse(responseText);
        } catch (parseError) {
          console.error("Errore nel parsing della risposta:", parseError);
          throw new Error(
            `Risposta non valida dal server: ${responseText.substring(
              0,
              100
            )}...`
          );
        }

        if (!response.ok) {
          throw new Error(result.message || `Errore HTTP: ${response.status}`);
        }

        if (result.status === "success") {
          setVehicles(vehicles.filter((vehicle) => vehicle.id !== id));

          alert("Veicolo eliminato con successo!");
        } else {
          throw new Error(result.message || "Errore durante l'eliminazione");
        }
      } catch (error) {
        console.error("Errore durante l'eliminazione:", error);
        setError(error.message || "Errore durante l'eliminazione del veicolo");
        alert("Errore durante l'eliminazione del veicolo: " + error.message);
      } finally {
        setLoading(false);
      }
    }
  };

  if (loading) {
    return (
      <AdminContainer>
        <div className="flex justify-center items-center h-96">
          <Spinner className="h-12 w-12" />
          <span className="ml-4 text-lg">Caricamento...</span>
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
          <Button
            color="blue"
            size="sm"
            onClick={() => setRefreshTrigger((t) => t + 1)}
            className="ml-4"
          >
            Riprova
          </Button>
        </div>
      </AdminContainer>
    );
  }

  return (
    <AdminContainer>
      <Card className="w-full overflow-auto p-4">
        <div className="flex justify-between items-center mb-4">
          <Typography variant="h5" color="blue-gray">
            Tabella Veicoli ({vehicles.length})
          </Typography>
          <Button
            color="blue"
            size="sm"
            onClick={() => setRefreshTrigger((prev) => prev + 1)}
            className="flex items-center gap-1 cursor-pointer"
            disabled={loading}
          >
            {loading ? <Spinner className="h-4 w-4" /> : "Aggiorna"}
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
                      Nessun veicolo disponibile nel database.
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
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = "/placeholder.png";
                        }}
                      />
                    </td>
                    <td className="p-4 max-w-xs truncate">
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                        title={vehicle.title}
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
                        €{" "}
                        {Number(vehicle.price).toLocaleString("it-IT", {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        })}
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
                            : vehicle.specs.fuel === "Elettrico"
                            ? "green"
                            : vehicle.specs.fuel === "Ibrido"
                            ? "teal"
                            : "gray"
                        }
                        value={vehicle.specs.fuel || "N/D"}
                        className="w-fit capitalize"
                      />
                    </td>
                    <td className="p-4">
                      <div className="flex flex-col sm:flex-row gap-2">
                        <Link
                          to={`/auction#vehicle-${vehicle.id}`}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Button
                            color="light-blue"
                            size="sm"
                            className="cursor-pointer w-full sm:w-auto"
                          >
                            Visualizza
                          </Button>
                        </Link>
                        <Button
                          color="red"
                          size="sm"
                          className="cursor-pointer w-full sm:w-auto"
                          onClick={() => handleDeleteVehicle(vehicle.id)}
                          disabled={loading}
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
