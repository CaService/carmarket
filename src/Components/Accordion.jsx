import { useState } from "react";

const Accordion = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="w-full shadow-md bg-gray-200 mb-2 cursor-pointer">
      <button
        className="w-full px-6 py-4 flex justify-between items-center text-left cursor-pointer text-gray-700"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="font-chillax text-navy-700 text-lg font-medium text-gray-700">
          {title}
        </span>
        <svg
          className={`w-6 h-6 transform transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>
      <div
        className={`px-6 transition-all duration-300 ease-in-out ${
          isOpen
            ? "opacity-100 visible py-4 text-gray-700"
            : "opacity-0 invisible h-0 text-gray-700"
        }`}
      >
        {children}
      </div>
    </div>
  );
};

export default Accordion;
