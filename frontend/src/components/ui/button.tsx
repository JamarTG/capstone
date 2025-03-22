import { ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  onClick?: () => void;
  variant: "primary" | "secondary";
  className?: string;
}

const Button: React.FC<ButtonProps> = ({ children, variant, onClick, className = "" }) => {
  const primaryClasses =
    "cursor-pointer flex justify-center items-center gap-2 rounded-md bg-slate-800 py-1 px-2 mt-3 border border-transparent text-center text-lg text-white transition-all hover:shadow-lg focus:bg-slate-700 focus:shadow-none active:bg-slate-700 active:shadow-none active:scale-95 hover:bg-slate-700 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none w-32";
  const secondaryClasses =
    "cursor-pointer flex justify-center items-center gap-2 rounded-md border text-slate-800 py-1 px-2 mt-3 border border-slate-200 text-center text-lg transition-all hover:shadow-lg focus:shadow-none hover:border-blue-300 active:bg-slate-200 active:scale-95 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none w-32";

  const classes = variant === "primary" ? primaryClasses : secondaryClasses;

  return (
    <button
      type="button"
      onClick={onClick}
      className={`${classes} ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
