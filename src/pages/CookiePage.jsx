import Container from "../Components/Container";
import Navbar from "../Components/Navbar";
import CookiePageBody from "../Components/CookiePageBody";
import Footer from "../Components/Footer";

const CookiePage = () => {
  return (
    <>
      <Container>
        <Navbar />
        <CookiePageBody />
      </Container>
      <Footer />
    </>
  );
};

export default CookiePage;
