import axios, { AxiosError } from "axios";
import type { AxiosResponse } from "axios";

// Configuration de l'instance Axios
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:4000/api",
  timeout: 10000,
  withCredentials: true, // Important pour les cookies HttpOnly
  headers: {
    "Content-Type": "application/json",
  },
});

// Intercepteur de requête
api.interceptors.request.use(
  (config) => {
    // Ajouter des headers personnalisés si nécessaire
    config.headers["X-Requested-With"] = "XMLHttpRequest";

    // Log des requêtes en développement
    if (import.meta.env.DEV) {
      console.log(
        `🚀 ${config.method?.toUpperCase()} ${config.url}`,
        config.data
      );
    }

    return config;
  },
  (error) => {
    console.error("Erreur de configuration de la requête:", error);
    return Promise.reject(error);
  }
);

// Intercepteur de réponse
api.interceptors.response.use(
  (response: AxiosResponse) => {
    // Log des réponses en développement
    if (import.meta.env.DEV) {
      console.log(
        `✅ ${response.config.method?.toUpperCase()} ${response.config.url}`,
        response.data
      );
    }

    return response;
  },
  (error: AxiosError) => {
    // Gestion centralisée des erreurs
    if (import.meta.env.DEV) {
      console.error(
        `❌ ${error.config?.method?.toUpperCase()} ${error.config?.url}`,
        error.response?.data
      );
    }

    // Gestion des erreurs d'authentification
    if (error.response?.status === 401) {
      // Rediriger vers la page de connexion si non authentifié
      if (window.location.pathname !== "/login") {
        window.location.href = "/login";
      }
    }

    // Gestion des erreurs de serveur
    if (typeof error.response?.status === "number" && error.response.status >= 500) {
      console.error("Erreur serveur:", error.response.data);
      // Ici on pourrait afficher une notification globale d'erreur serveur
    }

    // Gestion des erreurs de réseau
    if (!error.response) {
      console.error("Erreur de réseau:", error.message);
      // Ici on pourrait afficher une notification de problème de connexion
    }

    return Promise.reject(error);
  }
);

// Types pour les réponses API
export interface ApiResponse<T = unknown> {
  success: boolean;
  data: T;
  message?: string;
}

export interface ApiError {
  message: string;
  code?: string;
  details?: Record<string, unknown>;
}

// Fonctions utilitaires pour les appels API
export const apiUtils = {
  // GET avec gestion d'erreur typée
  async get<T>(url: string): Promise<T> {
    const response = await api.get<ApiResponse<T>>(url);
    return response.data.data;
  },

  // POST avec gestion d'erreur typée
  async post<T>(url: string, data?: unknown): Promise<T> {
    const response = await api.post<ApiResponse<T>>(url, data);
    return response.data.data;
  },

  // PUT avec gestion d'erreur typée
  async put<T>(url: string, data?: unknown): Promise<T> {
    const response = await api.put<ApiResponse<T>>(url, data);
    return response.data.data;
  },

  // DELETE avec gestion d'erreur typée
  async delete<T>(url: string): Promise<T> {
    const response = await api.delete<ApiResponse<T>>(url);
    return response.data.data;
  },

  // Upload de fichier
  async uploadFile<T>(
    url: string,
    file: File,
    onProgress?: (progress: number) => void
  ): Promise<T> {
    const formData = new FormData();
    formData.append("file", file);

    const response = await api.post<ApiResponse<T>>(url, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      onUploadProgress: (progressEvent) => {
        if (onProgress && progressEvent.total) {
          const progress = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          onProgress(progress);
        }
      },
    });

    return response.data.data;
  },
};

export default api;
