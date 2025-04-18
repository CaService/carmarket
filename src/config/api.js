// Configurazione corretta per produzione
export const API_BASE_URL = "https://carmarket-ayvens.com/carmarket/server/api";

// Configurazione comune per le chiamate fetch
export const fetchConfig = {
  credentials: "include",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
};

// Configurazione per upload file
export const uploadConfig = {
  credentials: "include",
  headers: {
    Accept: "application/json",
  },
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
