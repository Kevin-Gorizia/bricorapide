import React, { ButtonHTMLAttributes, ReactNode } from "react";
import { motion } from "framer-motion";
import LoadingSpinner from "./LoadingSpinner";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  isLoading?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  children: ReactNode;
}

const variantClasses = {
  primary:
    "bg-orange-500 hover:bg-orange-600 text-white shadow-md hover:shadow-lg",
  secondary:
    "bg-gray-600 hover:bg-gray-700 text-white shadow-md hover:shadow-lg",
  outline:
    "border-2 border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white",
  ghost: "text-orange-500 hover:bg-orange-50",
};

const sizeClasses = {
  sm: "px-3 py-1.5 text-sm",
  md: "px-4 py-2 text-base",
  lg: "px-6 py-3 text-lg",
};

export default function Button({
  variant = "primary",
  size = "md",
  isLoading = false,
  leftIcon,
  rightIcon,
  children,
  disabled,
  className = "",
  ...props
}: ButtonProps) {
  const isDisabled = disabled || isLoading;

  return (
    <motion.button
      whileHover={!isDisabled ? { scale: 1.02 } : {}}
      whileTap={!isDisabled ? { scale: 0.98 } : {}}
      className={`
        inline-flex items-center justify-center gap-2 
        font-medium rounded-lg transition-all duration-200
        focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2
        disabled:opacity-50 disabled:cursor-not-allowed
        ${variantClasses[variant]}
        ${sizeClasses[size]}
        ${className}
      `}
      disabled={isDisabled}
      aria-busy={isLoading}
      {...props}
    >
      {isLoading ? (
        <LoadingSpinner
          size="sm"
          color={variant === "primary" ? "white" : "primary"}
        />
      ) : (
        leftIcon
      )}

      <span>{children}</span>

      {!isLoading && rightIcon}
    </motion.button>
  );
}
