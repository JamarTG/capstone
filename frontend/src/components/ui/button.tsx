import { ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  variant: "primary" | "secondary";
}

const Button: React.FC<ButtonProps> = ({ children, variant }) => {
  const primaryClasses =
    "flex justify-center items-center gap-2 rounded-md bg-slate-800 py-1 px-2 mt-3 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none w-32";
  const secondaryClasses =
    "flex justify-center items-center gap-2 rounded-md border text-slate-800 py-1 px-2 mt-3 border-slate-800 text-center text-sm transition-all shadow-md hover:shadow-lg focus:shadow-none hover:bg-slate-200 active:bg-slate-200 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none w-32";

  const classes = variant === "primary" ? primaryClasses : secondaryClasses;

  return (
    <button
      type="button"
      className={classes}
    >
      {children}
    </button>
  );
};

export default Button;
