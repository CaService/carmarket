import { useState } from "react";
import { Cross1Icon, EyeOpenIcon, EyeClosedIcon } from "@radix-ui/react-icons";

const CardAuth = ({ onClose }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const isFormValid = username !== "" && password !== "";

  return (
    <div className="max-w-md w-100 bg-white p-10 rounded-lg shadow-md relative">
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-black z-10"
      >
        <Cross1Icon className="cursor-pointer w-6 h-6" />
      </button>
      <h2 className="text-2xl font-semibold mb-6">Login</h2>
      <input
        type="text"
        placeholder="Inserisci il tuo username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="w-full p-3 mb-6 border border-gray-300 rounded-lg"
      />
      <div className="relative mb-4">
        <input
          type={showPassword ? "text" : "password"}
          placeholder="Inserisci la tua password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-3 mb-4 border border-gray-300 rounded-lg"
        />
        <span
          className="absolute right-3 top-3 cursor-pointer"
          onClick={() => setShowPassword(!showPassword)}
        >
          {showPassword ? (
            <EyeOpenIcon className="w-6 h-6" />
          ) : (
            <EyeClosedIcon className="w-6 h-6" />
          )}
        </span>
      </div>
      <a href="#" className="text-sm text-blue-600 hover:underline mb-6 block">
        Password dimenticata?
      </a>
      <button
        className={`w-full p-4 text-white rounded-full font-semibold ${
          isFormValid
            ? "bg-cyan-950 cursor-pointer hover:bg-white hover:text-cyan-950 border border-cyan-950"
            : "bg-gray-300 cursor-not-allowed"
        } `}
        disabled={!isFormValid}
      >
        Login
      </button>
    </div>
  );
};

export default CardAuth;
