import Navbar from "../Components/Navbar";
import CardSignIn from "../Components/CardSignIn";
import FeaturesBanner from "../Components/FeaturesBanner";
import Footer from "../Components/Footer";
const SignUpPage = () => {
  return (
    <>
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
