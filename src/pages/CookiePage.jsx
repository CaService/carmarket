import Container from "../Components/Container";
import Navbar from "../Components/Navbar";
import CookiePageBody from "../Components/CookiePageBody";
import Footer from "../Components/Footer";
import { Helmet } from "react-helmet-async";

const CookiePage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>Informativa Cookie - Ayvens Italia</title>
      </Helmet>
      <Container>
        <Navbar />
        <div className="flex-1">
          <CookiePageBody />
        </div>
      </Container>
      <Footer />
    </div>
  );
};

export default CookiePage;
