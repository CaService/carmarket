import ResetPasswordForm from "../Components/ResetPasswordForm";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import { Helmet } from "react-helmet-async";

const ResetPasswordPage = () => {
  return (
    <>
      <Navbar />
      <Helmet>
        <title>Ripristina Password - Ayvens Italia</title>
      </Helmet>
      <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="text-4xl font-bold pb-10 font-chillax text-teal-500">
          NUOVA PASSWORD
        </h1>
        <ResetPasswordForm />
      </div>
      <Footer />
    </>
  );
};

export default ResetPasswordPage;
