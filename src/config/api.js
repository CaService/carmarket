const isDevelopment = import.meta.env.DEV;

export const API_BASE_URL = isDevelopment
  ? "/api"
  : "https://f0ab-82-84-9-104.ngrok-free.app/carmarket/server/api";

export const fetchConfig = {
  credentials: "include",
  headers: {
    "Content-Type": "application/json",
  },
};
