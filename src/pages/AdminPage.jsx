import { useState } from "react";
import AdminNavbar from "../Components/AdminComponents/AdminNavbar";
import Sidebar from "../Components/AdminComponents/Sidebar";
import AdminCard from "../Components/AdminComponents/AdminCard";
import CardAuctionCopy from "../Components/AdminComponents/CardAuctionCopy";
import UsersTable from "../Components/AdminComponents/UsersTable";

const AdminPage = () => {
  const [vehicles, setVehicles] = useState([]);
  const [currentView, setCurrentView] = useState("vehicles"); // 'vehicles' o 'users'

  const handleDataParsed = (data) => {
    setVehicles(data);
  };

  return (
    <div className="h-screen flex flex-col">
      <AdminNavbar />
      <div className="flex flex-1">
        <Sidebar onViewChange={setCurrentView} />
        <main className="flex-1 overflow-y-auto p-4">
          {currentView === "vehicles" ? (
            <>
              <AdminCard onDataParsed={handleDataParsed} />
              <CardAuctionCopy vehicles={vehicles} />
            </>
          ) : (
            <UsersTable />
          )}
        </main>
      </div>
    </div>
  );
};

export default AdminPage;
