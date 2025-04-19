import Navbar from "../Components/Navbar";
import CardSignIn from "../Components/CardSignIn";
import FeaturesBanner from "../Components/FeaturesBanner";
import Footer from "../Components/Footer";
import { Helmet } from "react-helmet-async";

const SignUpPage = () => {
  return (
    <>
      <Helmet>
        <title>SignUp - Ayvens Italia</title>
      </Helmet>
      <Navbar />
      <CardSignIn />
      <div className="mt-3">
        <FeaturesBanner />
      </div>
      <div className="mt-4">
        <Footer />
      </div>
    </>
  );
};

export default SignUpPage;
