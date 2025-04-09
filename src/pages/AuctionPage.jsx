import { Helmet } from "react-helmet-async";
import Navbar from "../Components/Navbar";
import AuctionBanner from "../Components/AuctionPageComponents/AuctionBanner";
import CarCard from "../Components/AuctionPageComponents/CarCard";
import Footer from "../Components/Footer";
import { useState, useEffect } from "react";

const AuctionPage = () => {
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Funzione per recuperare i veicoli dal database
    const fetchVehicles = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          "http://localhost/carmarket/server/api/vehicles/get_vehicles.php"
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
        setError("Impossibile caricare i veicoli dal database");
      } finally {
        setLoading(false);
      }
    };

    fetchVehicles();
  }, []);

  return (
    <>
      <Helmet>
        <title>Auto in vendita | CarMarket</title>
        <meta
          name="description"
          content="Esplora la nostra selezione di auto usate garantite"
        />
      </Helmet>
      <Navbar />
      <AuctionBanner />
      <div className="container mx-auto px-4 md:px-8 py-8">
        <h2 className="text-3xl font-bold text-center mb-8 text-[#072534] font-chillax">
          Auto in vendita
        </h2>

        {loading ? (
          <div className="text-center py-8">
            <p className="text-gray-600">Caricamento veicoli in corso...</p>
          </div>
        ) : error ? (
          <div className="text-center py-8">
            <p className="text-red-600">{error}</p>
          </div>
        ) : vehicles.length > 0 ? (
          vehicles.map((vehicle) => (
            <CarCard key={vehicle.id} vehicleData={vehicle} />
          ))
        ) : (
          <CarCard
            vehicleData={{
              title: "Nessun veicolo disponibile",
              price: "0",
              imageUrl: "/images/Ayvens.svg",
              specs: {
                mileage: "0",
                registrationDate: new Date().toISOString(),
                fuel: "N/A",
                transmission: "N/A",
              },
              pdf: { url: "" },
              auctionNumber: "0",
            }}
          />
        )}
      </div>
      <div className="mt-10">
        <Footer />
      </div>
    </>
  );
};

export default AuctionPage;
