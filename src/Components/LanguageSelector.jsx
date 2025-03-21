import Flag from "react-world-flags";
import { ChevronDownIcon } from "@radix-ui/react-icons";

const LanguageSelector = () => {
  return (
    <button className="flex items-center px-3 py-2 rounded-full cursor-pointer">
      <div className="flex items-center gap-1">
        <div className="w-4 h-4 overflow-hidden rounded-full">
          <Flag
            code="IT"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
        </div>
        <div className="text-[#0f3549] font-medium">|</div>
        <span className="text-[#0f3549] font-medium">IT</span>
        <ChevronDownIcon className="w-4 h-4 text-[#0f3549] scale-100" />
      </div>
    </button>
  );
};

export default LanguageSelector;
