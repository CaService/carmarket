import React from "react";

const MessagePopup = ({ message, onClose }) => {
  return (
    <div
      className="fixed inset-0 flex items-center justify-center z-50"
      style={{ backgroundColor: "rgba(0, 0, 0, 0.7)" }}
    >
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
        <p className="text-gray-800">{message}</p>
        <button
          onClick={onClose}
          className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 cursor-pointer"
        >
          Chiudi
        </button>
      </div>
    </div>
  );
};

export default MessagePopup;
