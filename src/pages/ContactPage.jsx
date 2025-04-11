import ContactForm from "../components/ContactForm";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import { Helmet } from "react-helmet-async";

const ContactPage = () => {
  return (
    <>
      <Navbar />
      <Helmet>
        <title>Contattaci - Ayvens Italia</title>
      </Helmet>
      <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="text-4xl font-bold pb-10 font-chillax text-teal-500">
          CONTATTACI
        </h1>
        <ContactForm />
      </div>
      <Footer />
    </>
  );
};

export default ContactPage;
