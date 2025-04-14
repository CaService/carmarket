import { Helmet } from "react-helmet-async";
import Navbar from "../components/Navbar";
import PrivacyBody from "../Components/PrivacyBody";
import Footer from "../Components/Footer";

const PrivacyPage = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Helmet>
        <title>Informativa sulla Privacy - Ayvens Italia</title>
      </Helmet>
      <Navbar />
      <div className="flex-1">
        <PrivacyBody />
      </div>
      <Footer />
    </div>
  );
};

export default PrivacyPage;
