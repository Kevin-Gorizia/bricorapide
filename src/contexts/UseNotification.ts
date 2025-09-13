import { useContext } from "react";
import { NotificationContext } from "./NotificationContext";
import type { NotificationContextType } from "../types";

export const useNotification = (): NotificationContextType => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error("useNotification must be used within a NotificationProvider");
  }
  return context;
};
