import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./pages/Homepage";
import SignUpPage from "./pages/SignUpPage";
import AdminPage from "./pages/AdminPage";
import AuctionPage from "./pages/AuctionPage";
import ContactPage from "./pages/ContactPage";
const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/auction" element={<AuctionPage />} />
        <Route path="/contact" element={<ContactPage />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
