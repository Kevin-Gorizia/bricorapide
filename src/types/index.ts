// Types pour l'application BricoRapide améliorée

export type ServiceType = "meuble" | "douche" | "cuisine";

export interface User {
  id: string;
  email: string;
  nom: string;
  role: "client" | "admin";
  createdAt: string;
}

export interface Reservation {
  id: string;
  nomClient: string;
  emailClient: string;
  service: ServiceType;
  surface?: number;
  distanceKm: number;
  amountCents: number;
  acompteCents: number;
  status: "pending" | "confirmed" | "completed" | "cancelled";
  stripePaymentIntentId?: string;
  createdAt: string;
  scheduledDate?: string;
}

export interface BookingFormData {
  nom: string;
  email: string;
  telephone: string;
  service: ServiceType;
  surface: number;
  distanceKm: number;
  adresse: string;
  description: string;
  datePreferee: string;
}

export interface PricingCalculation {
  basePriceCents: number;
  distancePriceCents: number;
  totalCents: number;
  acompteCents: number;
}

export interface ApiError {
  message: string;
  code?: string;
  details?: Record<string, unknown>;
}

export interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
  isAuthenticated: boolean;
}

export interface NotificationContextType {
  showSuccess: (message: string) => void;
  showError: (message: string) => void;
  showInfo: (message: string) => void;
  showWarning: (message: string) => void;
}
