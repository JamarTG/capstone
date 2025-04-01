import { ReactNode } from "react";

interface CardProps {
  className?: string;
  children?: ReactNode;
  style?: React.CSSProperties;
  onClick?: () => void;
  animateOnHover?: boolean;
}

const Card: React.FC<CardProps> = ({ children, className, style, onClick, animateOnHover = false }) => {
  return (
    <div
      onClick={onClick}
      style={style}
      className={`relative ${animateOnHover ? "transition-transform hover:scale-105" : ""} ${className}`}
    >
      {children}
    </div>
  );
};

export default Card;


