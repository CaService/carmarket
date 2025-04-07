import { useState, useEffect } from "react";
import Navbar from "../Components/Navbar";
import Hero from "../Components/Hero";
import CardAuction from "../Components/CardAuction";
import Footer from "../Components/Footer";
import { Helmet } from "react-helmet-async";

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
      <Helmet>
        <title>Homepage - Ayvens Italia</title>
      </Helmet>
      <Navbar />
      <Navbar />
      <Hero />
      <CardAuction vehicles={vehicles} />
      <Footer />
    </>
  );
};

export default Homepage;
