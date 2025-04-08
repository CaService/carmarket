import { Helmet } from "react-helmet-async";
import Navbar from "../Components/Navbar";
import AuctionBanner from "../Components/AuctionPageComponents/AuctionBanner";
import CarCard from "../Components/AuctionPageComponents/CarCard";
import Footer from "../Components/Footer";
import { useState, useEffect } from "react";

const AuctionPage = () => {
  const [vehicles, setVehicles] = useState([]);

  useEffect(() => {
    // Recupera i dati dal localStorage
    const savedData = localStorage.getItem("cardAuctionData");
    if (savedData) {
      const parsedData = JSON.parse(savedData);
      setVehicles(parsedData.vehicles || []);
    }
  }, []);

  return (
    <>
      <Helmet>
        <title>Offerte - Ayvens Italia</title>
      </Helmet>
      <Navbar />
      <AuctionBanner />
      <div className="space-y-4">
        {vehicles.length > 0 ? (
          vehicles.map((vehicle, index) => (
            <CarCard key={index} vehicleData={vehicle} />
          ))
        ) : (
          // Mostra un CarCard di esempio o un messaggio
          <CarCard
            vehicleData={{
              title: "AUDI A3 30 TDI S tronic Business S.Back",
              price: "25000",
              imageUrl: "/images/Ayvens.svg",
              specs: {
                mileage: "103.940",
                registrationDate: "2021-11-10",
                fuel: "Diesel",
                transmission: "Automatico",
              },
              pdf: { url: "" },
              endDate: Date.now() + 86400000, // 24 ore da ora
              auctionNumber: "1",
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
