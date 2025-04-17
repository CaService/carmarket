const isDevelopment = process.env.NODE_ENV === "development";

export const API_BASE_URL = isDevelopment
  ? "http://localhost/carmarket/server/api"
  : "https://carmarket-ayvens.com/repositories/carmarket/server/api";

// Configurazione comune per le chiamate fetch
export const fetchConfig = {
  credentials: "include",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
};
