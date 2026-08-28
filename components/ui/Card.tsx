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
        hoverGlow
          ? "hover:border-yellow-500/50 hover:shadow-[0_0_20px_rgba(244,202,48,0.10)] hover:-translate-y-0.5"
          : ""
      } ${className}`}
    >
      {children}
    </div>
  );
}