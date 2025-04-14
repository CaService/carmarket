import { Helmet } from "react-helmet-async";
import Navbar from "../components/Navbar";
import PrivacyBody from "../Components/PrivacyBody";
import Footer from "../Components/Footer";

const PrivacyPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>Informativa sulla Privacy - Ayvens Italia</title>
      </Helmet>
      <Navbar />
      <main className="flex-grow">
        <PrivacyBody />
      </main>
      <Footer />
    </div>
  );
};

export default PrivacyPage;
