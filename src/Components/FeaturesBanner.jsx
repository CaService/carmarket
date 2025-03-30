import {
  HandIcon,
  CheckCircledIcon,
  StarFilledIcon,
} from "@radix-ui/react-icons";
import Container from "./Container";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import React from "react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

const FeaturesBanner = () => {
  const features = [
    {
      icon: <HandIcon className="w-12 h-12 text-[#0A2A3B]" />,
      title: "Fate affari sicuri",
      description:
        "Auto di occasione da 3 a 6 anni (o meno!) valutati con storia di manutenzione.",
    },
    {
      icon: <CheckCircledIcon className="w-12 h-12 text-[#0A2A3B]" />,
      title: "Acquista senza confini",
      description:
        "La principale piattaforma globale di auto usate che copre 40 Paesi.",
    },
    {
      icon: <StarFilledIcon className="w-12 h-12 text-[#0A2A3B]" />,
      title: "Fai la tua scelta",
      description:
        "Migliaia di auto in vendita ogni giorno, compresi i marchi più diffusi.",
    },
  ];

  return (
    <div className="bg-white shadow-xs">
      <Container>
        {/* Vista Desktop */}
        <div className="hidden md:flex max-w-7x mx-auto py-8 px-8 flex-row items-center gap-8">
          {features.map((feature, index) => (
            <React.Fragment key={index}>
              <div className="flex flex-col items-center text-center flex-1">
                {feature.icon}
                <h2 className="mt-4 text-2xl font-semibold text-[#0A2A3B]">
                  {feature.title}
                </h2>
                <p className="mt-1 text-sm text-gray-600 font-['Source_Sans_Pro']">
                  {feature.description}
                </p>
              </div>
              {index < features.length - 1 && (
                <div className="divider bg-black h-50"></div>
              )}
            </React.Fragment>
          ))}
        </div>

        {/* Carosello Mobile */}
        <div className="md:hidden py-8">
          <Swiper
            modules={[Pagination]}
            spaceBetween={30}
            slidesPerView={1}
            pagination={{
              clickable: true,
            }}
            className="swiper-container pb-16"
          >
            {features.map((feature, index) => (
              <SwiperSlide key={index}>
                <div className="flex flex-col items-center text-center px-4 pb-8">
                  {feature.icon}
                  <h2 className="mt-4 text-2xl font-semibold text-[#0A2A3B]">
                    {feature.title}
                  </h2>
                  <p className="mt-1 text-sm text-gray-600 font-['Source_Sans_Pro']">
                    {feature.description}
                  </p>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </Container>
    </div>
  );
};

export default FeaturesBanner;
