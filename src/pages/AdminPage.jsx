import { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import AdminNavbar from "../Components/AdminComponents/AdminNavbar";
import Sidebar from "../Components/AdminComponents/Sidebar";
import AdminCard from "../Components/AdminComponents/AdminCard";
import CardAuctionCopy from "../Components/AdminComponents/CardAuctionCopy";
import UsersTable from "../Components/AdminComponents/UsersTable";
import VehiclesTable from "../Components/AdminComponents/VehiclesTable";
import VehicleForm from "../Components/AdminComponents/VehicleForm";

const AdminPage = () => {
  const [vehicles, setVehicles] = useState([]);
  const [currentView, setCurrentView] = useState("vehicles"); // 'vehicles', 'users', 'cardForm', 'vehiclesTable'

  const handleDataParsed = (data) => {
    setVehicles(data);
  };

  const handleVehicleSubmit = (formData) => {
    // Aggiungi il nuovo veicolo all'array esistente
    const newVehicle = {
      ...formData,
      id: Date.now(), // Genera un ID unico
    };
    setVehicles((prev) => [...prev, newVehicle]);

    // Salva nel localStorage
    const savedData = localStorage.getItem("cardAuctionData");
    const existingData = savedData ? JSON.parse(savedData) : { vehicles: [] };
    existingData.vehicles = [...existingData.vehicles, newVehicle];
    localStorage.setItem("cardAuctionData", JSON.stringify(existingData));
  };

  const renderContent = () => {
    switch (currentView) {
      case "cardForm":
        return <VehicleForm onSubmit={handleVehicleSubmit} />;
      case "vehicles":
        return (
          <>
            <AdminCard onDataParsed={handleDataParsed} />
            <CardAuctionCopy vehicles={vehicles} />
          </>
        );
      case "vehiclesTable":
        return <VehiclesTable />;
      case "users":
        return <UsersTable />;
      default:
        return null;
    }
  };

  return (
    <>
      <Helmet>
        <title>Admin Dashboard - CarMarket</title>
      </Helmet>
      <div className="min-h-screen flex flex-col bg-gray-100">
        <AdminNavbar />
        <div className="flex flex-1 overflow-hidden">
          <Sidebar onViewChange={setCurrentView} />
          <main className="flex-1 overflow-y-auto p-4">{renderContent()}</main>
        </div>
      </div>
    </>
  );
};

export default AdminPage;
