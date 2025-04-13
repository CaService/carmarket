import { Helmet } from "react-helmet-async";
import Navbar from "../components/Navbar";
import PrivacyBody from "../Components/PrivacyBody";
import Footer from "../Components/Footer";

const PrivacyPage = () => {
  return (
    <>
      <Helmet>
        <title>Informativa sulla Privacy - Ayvens Italia</title>
      </Helmet>
      <Navbar />
      <PrivacyBody />
      <Footer />
    </>
  );
};

export default PrivacyPage;
