import { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  className?: string;
  hoverGlow?: boolean;
}

export default function Card({
  children,
  className = "",
  hoverGlow = false,
}: CardProps) {
  return (
    <div
      className={`bg-bg-surface border border-border-subtle rounded-lg p-6 transition-all duration-300 ${
        hoverGlow ? "hover:border-mustard-500/40 hover:shadow-[0_0_20px_rgba(242,185,15,0.08)]" : ""
      } ${className}`}
    >
      {children}
    </div>
  );
}
