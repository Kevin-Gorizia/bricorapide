/* eslint-disable react-refresh/only-export-components */
import type { ReactNode } from "react";
import toast, { Toaster } from "react-hot-toast";
import type { NotificationContextType } from "../types";
import { createContext } from "react";
export const NotificationContext = createContext<
  NotificationContextType | undefined
>(undefined);

interface NotificationProviderProps {
  children: ReactNode;
}

export function NotificationProvider({ children }: NotificationProviderProps) {
  const showSuccess = (message: string) => {
    toast.success(message, {
      duration: 4000,
      position: "top-right",
      style: {
        background: "#10B981",
        color: "#fff",
      },
    });
  };

  const showError = (message: string) => {
    toast.error(message, {
      duration: 5000,
      position: "top-right",
      style: {
        background: "#EF4444",
        color: "#fff",
      },
    });
  };

  const showInfo = (message: string) => {
    toast(message, {
      duration: 4000,
      position: "top-right",
      icon: "ℹ️",
      style: {
        background: "#3B82F6",
        color: "#fff",
      },
    });
  };

  const showWarning = (message: string) => {
    toast(message, {
      duration: 4000,
      position: "top-right",
      icon: "⚠️",
      style: {
        background: "#F59E0B",
        color: "#fff",
      },
    });
  };

  const value: NotificationContextType = {
    showSuccess,
    showError,
    showInfo,
    showWarning,
  };

  return (
    <NotificationContext.Provider value={value}>
      {children}
      <Toaster />
    </NotificationContext.Provider>
  );
}

// useNotification hook has been moved to a separate file for Fast Refresh compatibility.
