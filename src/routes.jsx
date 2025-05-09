import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/Homepage";
import SignUpPage from "./pages/SignUpPage";
import AdminPage from "./pages/AdminPage";
import AuctionPage from "./pages/AuctionPage";
import ContactPage from "./pages/ContactPage";
import AboutUsPage from "./pages/AboutUsPage";
import CookiePage from "./pages/CookiePage";
import PrivacyPage from "./pages/PrivacyPage";
import ResetPasswordPage from "./pages/ResetPasswordPage";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/signup" element={<SignUpPage />} />
      <Route path="/admin" element={<AdminPage />} />
      <Route path="/auction" element={<AuctionPage />} />
      <Route path="/contact" element={<ContactPage />} />
      <Route path="/about" element={<AboutUsPage />} />
      <Route path="/cookie" element={<CookiePage />} />
      <Route path="/privacy" element={<PrivacyPage />} />
      <Route path="/reset-password" element={<ResetPasswordPage />} />
    </Routes>
  );
};

export default AppRoutes;
