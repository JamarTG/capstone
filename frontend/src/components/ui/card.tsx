import { ReactNode } from "react";

interface CardProps {
  className?: string;
  children?: ReactNode;
  onClick?: () => void
}

const Card: React.FC<CardProps> = ({ children, className, onClick}) => {
  return (
    <div
    onClick={onClick}
      className={`$relative flex flex-col my-6 bg-white border-2 border-b-4 border-slate-200 rounded-lg w-96 transform transition-transform hover:scale-105 perspective-1000 ${className}`}
    >
      {children}
    </div>
  );
};

export default Card;
