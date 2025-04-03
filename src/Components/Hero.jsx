import FeaturesBanner from "./FeaturesBanner";

const Hero = () => {
  return (
    <>
      <div className="z-10 relative pt-18">
        <h1 className="absolute top-[40%] left-[8%] font-medium text-[#0A2A3B] text-[25px] md:text-[clamp(30px,3.2vw,48px)] leading-tight font-chillax">
          <span className="bg-[#FFD100] px-6 py-0.5 rounded-[50px]">
            Better
          </span>{" "}
          cars, everywhere.
        </h1>
        <img
          src="/images/banner-1680px.jpg"
          alt="Banner"
          className="w-full h-[120px] md:h-full object-cover"
          onError={(e) => {
            console.error("Errore caricamento banner:", e.target.src);
            // Fallback temporaneo
            e.target.src = "https://placehold.co/1680x400";
          }}
        />
      </div>
      {/* Features */}
      <FeaturesBanner />
    </>
  );
};

export default Hero;
