import { ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  onClick?: () => void;
  variant: "primary" | "secondary";
  className?: string;
  type?: "submit" | "reset" | "button" | undefined;
  size?: "sm" | "md" | "lg";
}

const Button: React.FC<ButtonProps> = ({ children, variant, onClick, className = "", type = undefined, size = "md" }) => {
  const baseClasses =
    "flex justify-center items-center gap-1 cursor-pointer transition-all text-lg px-2 py-2 rounded-lg border-b-[4px] hover:brightness-110 hover:-translate-y-[1px] hover:border-b-[6px] active:border-b-[2px] active:brightness-90 active:translate-y-[2px]";
  const variantClasses = variant === "primary" ? "bg-blue-500 text-white border-blue-600" : "bg-slate-200 text-black border-gray-600";
  const sizeClasses = size === "sm" ? "w-12 h-10" : size === "lg" ? "w-32 h-12" : "w-24 h-10";

  return (
    <button
      onClick={onClick}
      className={`${baseClasses} ${variantClasses} ${sizeClasses} ${className}`}
      type={type}
    >
      {children}
    </button>
  );
};

export default Button;
