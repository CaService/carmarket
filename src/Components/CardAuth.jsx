import { useState } from "react";
import { Cross1Icon, EyeOpenIcon, EyeClosedIcon } from "@radix-ui/react-icons";
import axios from "axios";
import { useDispatch } from "react-redux";
import {
  loginStart,
  loginSuccess,
  loginFailure,
} from "../store/slices/authSlice";
import { useNavigate } from "react-router-dom";
import { API_BASE_URL, fetchConfig } from "../config/api";

const CardAuth = ({ onClose, fromSignUp = false }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const isFormValid = formData.email !== "" && formData.password !== "";

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Reset error quando l'utente inizia a digitare
    if (error) setError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(loginStart());

    try {
      const response = await fetch(`${API_BASE_URL}/users/user_login.php`, {
        method: "POST",
        ...fetchConfig,
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        if (data.status === "success") {
          dispatch(loginSuccess(data.user));
          onClose();
          if (fromSignUp) {
            navigate("/");
          }
        } else {
          throw new Error(data.message || "Errore durante il login");
        }
      } else {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    } catch (error) {
      console.error("Errore durante il login:", error);
      dispatch(
        loginFailure(
          error.message ||
            "Errore durante il login. Verifica le tue credenziali."
        )
      );
    }
  };

  return (
    <div className="max-w-md w-100 bg-white p-10 rounded-lg shadow-md relative">
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-black z-10"
      >
        <Cross1Icon className="cursor-pointer w-6 h-6" />
      </button>
      <h2 className="text-2xl font-semibold mb-6">Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder="Inserisci la tua email"
          value={formData.email}
          onChange={handleChange}
          className="w-full p-3 mb-6 border border-gray-300 rounded-lg"
          required
        />
        <div className="relative mb-4">
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Inserisci la tua password"
            value={formData.password}
            onChange={handleChange}
            className="w-full p-3 mb-4 border border-gray-300 rounded-lg"
            required
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

        {error && (
          <div className="text-red-500 text-sm mb-4 text-center">{error}</div>
        )}

        <a
          href="#"
          className="text-sm text-blue-600 hover:underline mb-6 block"
        >
          Password dimenticata?
        </a>

        <button
          type="submit"
          className={`w-full p-4 text-white rounded-full font-semibold ${
            isFormValid && !loading
              ? "bg-cyan-950 cursor-pointer hover:bg-white hover:text-cyan-950 border border-cyan-950"
              : "bg-gray-300 cursor-not-allowed"
          }`}
          disabled={!isFormValid || loading}
        >
          {loading ? (
            <div className="flex items-center justify-center">
              <div className="w-5 h-5 border-2 border-white rounded-full animate-spin border-t-transparent"></div>
              <span className="ml-2">Login in corso...</span>
            </div>
          ) : (
            "Login"
          )}
        </button>
      </form>
    </div>
  );
};

export default CardAuth;
