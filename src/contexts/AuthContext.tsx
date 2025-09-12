import { createContext, useContext, useEffect, useState } from "react";
import type { User, AuthContextType } from "../types";
import api from "../lib/api";
import type { ReactNode } from "react";

import { useNotification } from "./useNotification";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { showError, showSuccess } = useNotification();

  // Vérifier l'authentification au chargement
  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      setIsLoading(true);
      // Appel API pour vérifier l'authentification via cookie HttpOnly
      const response = await api.get("/auth/me");
      setUser(response.data.user);
    } catch (error) {
      console.error("Erreur capturée :", error);
      throw new Error("Problème !");
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (email: string, password: string) => {
    try {
      setIsLoading(true);
      const response = await api.post("/auth/login", { email, password });

      // Le token est maintenant stocké dans un cookie HttpOnly côté serveur
      setUser(response.data.user);
      showSuccess("Connexion réussie !");
    } catch (error: unknown) {
      let message = "Erreur de connexion";

      // Vérifie si error est un objet avec response.data.message
      if (typeof error === "object" && error !== null && "response" in error) {
        // TypeScript ne sait pas exactement, donc on cast
        const err = error as { response?: { data?: { message?: string } } };
        if (err.response?.data?.message) {
          message = err.response.data.message;
        }
      }

      showError(message);
      throw error; // tu peux toujours relancer si besoin
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      await api.post("/auth/logout");
      setUser(null);
      showSuccess("Déconnexion réussie");
    } catch (error: unknown) {
  // Même en cas d'erreur, on déconnecte l'utilisateur côté client
  setUser(null);
  let message = "Erreur lors de la déconnexion";

  if (typeof error === "object" && error !== null && "response" in error) {
    const err = error as { response?: { data?: { message?: string } } };
    if (err.response?.data?.message) {
      message = err.response.data.message;
    }
  }

  showError(message);
}

  const value: AuthContextType = {
    user,
    login,
    logout,
    isLoading,
    isAuthenticated: !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}


// Hook pour protéger les routes
export function useRequireAuth() {
  const { isAuthenticated, isLoading } = useAuth();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      // Rediriger vers la page de connexion
      window.location.href = "/login";
    }
  }, [isAuthenticated, isLoading]);

  return { isAuthenticated, isLoading };
}
