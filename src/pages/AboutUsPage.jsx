import Navbar from "../Components/Navbar";
import AboutUsBody from "../Components/AboutUsBody";
import Footer from "../Components/Footer";
import { Helmet } from "react-helmet-async";

const AboutUsPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>Chi siamo | Ayvens Italia</title>
      </Helmet>
      <Navbar />
      {/* <figure class="sc-1ys36s8-3 igiGUp">
        <img
          alt=""
          src="/-/media/ayvens/public/shared/images/hero/branded-hero-images/hero-about-us.jpg?iar=0&amp;rev=-1&amp;mw=480&amp;io=transform%3Afill%2Cwidth%3A480"
          sizes="(max-width: 479.9px) 480px, (max-width: 739.9px) 740px, (max-width: 959.9px) 960px, (max-width: 1277.9px) 1278px, (max-width: 1599.9px) 1600px"
          srcset="/-/media/ayvens/public/shared/images/hero/branded-hero-images/hero-about-us.jpg?iar=0&amp;rev=-1&amp;mw=480&amp;io=transform%3Afill%2Cwidth%3A480 480w, /-/media/ayvens/public/shared/images/hero/branded-hero-images/hero-about-us.jpg?iar=0&amp;rev=-1&amp;mw=740&amp;io=transform%3Afill%2Cwidth%3A740 740w, /-/media/ayvens/public/shared/images/hero/branded-hero-images/hero-about-us.jpg?iar=0&amp;rev=-1&amp;mw=960&amp;io=transform%3Afill%2Cwidth%3A960 960w, /-/media/ayvens/public/shared/images/hero/branded-hero-images/hero-about-us.jpg?iar=0&amp;rev=-1&amp;mw=1278&amp;io=transform%3Afill%2Cwidth%3A1278 1278w, /-/media/ayvens/public/shared/images/hero/branded-hero-images/hero-about-us.jpg?iar=0&amp;rev=-1&amp;mw=1480&amp;io=transform%3Afill%2Cwidth%3A1480 1480w, /-/media/ayvens/public/shared/images/hero/branded-hero-images/hero-about-us.jpg?iar=0&amp;rev=-1&amp;mw=1600&amp;io=transform%3Afill%2Cwidth%3A1600 1600w, /-/media/ayvens/public/shared/images/hero/branded-hero-images/hero-about-us.jpg?iar=0&amp;rev=-1&amp;mw=1920&amp;io=transform%3Afill%2Cwidth%3A1920 1920w"
          loading="eager"
          class="sc-1893p0a-0 jVxZLy"
        ></img>
      </figure> */}
      <main className="flex-grow">
        <AboutUsBody />
      </main>
      <Footer />
    </div>
  );
};

export default AboutUsPage;
