import { ReactNode } from "react";
import clsx from "clsx";

interface ButtonProps {
  children: ReactNode;
  onClick?: () => void;
  variant?: "primary" | "secondary";
  className?: string;
  type?: "submit" | "reset" | "button";
  size?: "sm" | "md" | "lg";
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = "primary",
  onClick,
  className = "",
  type = "button",
  size = "md",
}) => {
  const baseStyles =
    "cursor-pointer font-semibold rounded-lg transition duration-300 flex justify-center items-center";
  
  const variantStyles = {
    primary: "bg-slate-600 text-white hover:bg-slate-700",
    secondary: "bg-gray-200 text-gray-800 hover:bg-gray-300",
  };

  const sizeStyles = {
    sm: "px-3 py-1 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-6 py-3 text-lg",
  };

  return (
    <button
      onClick={onClick}
      className={clsx(baseStyles, variantStyles[variant], sizeStyles[size], className)}
      type={type}
    >
      {children}
    </button>
  );
};

export default Button;
