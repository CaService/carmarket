import Navbar from "../Components/Navbar";
import AuctionBanner from "../Components/AuctionPageComponents/AuctionBanner";
import CarCard from "../Components/AuctionPageComponents/CarCard";
import Footer from "../Components/Footer";
const AuctionPage = () => {
  const numberOfCars = 10; // Numero preso dallo span in CardAuction

  return (
    <>
      <Navbar />
      <AuctionBanner />
      <div className="space-y-4">
        {Array.from({ length: numberOfCars }).map((_, index) => (
          <CarCard key={index} />
        ))}
      </div>
      <div className="mt-10">
        <Footer />
      </div>
    </>
  );
};

export default AuctionPage;
