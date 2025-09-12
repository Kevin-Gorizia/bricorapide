import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import type { User, AuthContextType } from "../types";
import api from "../lib/api";
import { useNotification } from "./NotificationContext";

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
      // L'utilisateur n'est pas authentifié
      setUser(null);
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
    } catch (error: any) {
      const message = error.response?.data?.message || "Erreur de connexion";
      showError(message);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      await api.post("/auth/logout");
      setUser(null);
      showSuccess("Déconnexion réussie");
    } catch (error) {
      // Même en cas d'erreur, on déconnecte l'utilisateur côté client
      setUser(null);
      showError("Erreur lors de la déconnexion");
    }
  };

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
