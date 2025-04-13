import Container from "../Components/Container";
import Navbar from "../Components/Navbar";
import CookiePageBody from "../Components/CookiePageBody";
import Footer from "../Components/Footer";
import { Helmet } from "react-helmet-async";

const CookiePage = () => {
  return (
    <>
      <Helmet>
        <title>Informativa Cookie - Ayvens Italia</title>
      </Helmet>
      <Container>
        <Navbar />
        <CookiePageBody />
      </Container>
      <Footer />
    </>
  );
};

export default CookiePage;
