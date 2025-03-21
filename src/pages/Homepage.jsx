import { useState, useEffect } from "react";
import Navbar from "../Components/Navbar";
import Hero from "../Components/Hero";
import CardAuction from "../Components/CardAuction";
import Footer from "../Components/Footer";

const Homepage = () => {
  const [vehicles, setVehicles] = useState([]);

  useEffect(() => {
    const savedData = localStorage.getItem("cardAuctionData");
    if (savedData) {
      const parsedData = JSON.parse(savedData);
      setVehicles(parsedData.vehicles || []);
    }
  }, []);

  return (
    <>
      <Navbar />
      <Hero />
      <CardAuction vehicles={vehicles} />
      <Footer />
    </>
  );
};

export default Homepage;
