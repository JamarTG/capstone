import type { FC, ReactNode, CSSProperties } from "react";

interface CardProps {
  className?: string;
  children?: ReactNode;
  style?: CSSProperties;
  onClick?: VoidFunction;
  animateOnHover?: boolean;
}

const Card: FC<CardProps> = ({ children, className, style, onClick, animateOnHover = false }) => {
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


