import { ReactNode } from "react";

interface CardProps {
  className?: string;
  children?: ReactNode;
  onClick?: () => void;
  animateOnHover?: boolean;
}

const Card: React.FC<CardProps> = ({ children, className, onClick, animateOnHover = false }) => {
  return (
    <div
      onClick={onClick}
      className={`relative flex flex-col justify-center items-center my-2  w-full transform transition-transform ${animateOnHover ? "hover:scale-105" : ""} ${className}`}
    >
      {children}
    </div>
  );
};

export default Card;
