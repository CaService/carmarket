import FeaturesBanner from "./FeaturesBanner";

const Hero = () => {
  return (
    <>
      <div className="z-10 relative pt-18">
        <h1 className="absolute top-[28%] left-[8%] font-medium text-[#0A2A3B] text-[clamp(30px,3.2vw,48px)] leading-tight">
          <span className="bg-[#FFD100] px-6 py-0.5 rounded-[50px]">
            Better
          </span>{" "}
          cars, everywhere.
        </h1>
        <img src="src/assets/banner-1680px.jpg" className="w-full h-auto"></img>
      </div>
      {/* Features */}
      <FeaturesBanner />
    </>
  );
};

export default Hero;
