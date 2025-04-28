// Configurazione corretta per produzione
export const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ||
  "https://www.carmarket-ayvens.com/server/api";

// Configurazione comune per le chiamate fetch
export const fetchConfig = {
  credentials: "include",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  mode: "cors",
};

// Configurazione per upload file
export const uploadConfig = {
  credentials: "include",
  headers: {
    Accept: "application/json",
  },
  mode: "cors",
};

// Helper per gestire le risposte
export const handleApiResponse = async (response) => {
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({
      message: "Errore nella richiesta",
    }));
    throw new Error(errorData.message || "Errore nella richiesta");
  }
  return response.json();
};
