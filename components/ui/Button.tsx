import { ButtonHTMLAttributes, ReactNode } from "react";
import Link from "next/link";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  href?: string;
}

export default function Button({
  children,
  variant = "primary",
  href,
  className = "",
  ...props
}: ButtonProps) {
  const baseStyle =
    "inline-flex items-center justify-center px-5 py-2.5 rounded-md font-sans text-sm font-semibold tracking-wide transition-all duration-200 cursor-pointer focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed";

  const variants = {
    primary:
      "bg-yellow-500 hover:bg-yellow-400 text-bg-primary shadow-sm hover:shadow-[0_0_20px_rgba(244,202,48,0.25)] border border-transparent",

    secondary:
      "bg-transparent hover:bg-yellow-500/10 text-yellow-500 border border-yellow-500/40 hover:border-yellow-500",

    ghost:
      "bg-transparent hover:bg-bg-surface-raised text-text-secondary hover:text-text-primary",
  };

  const combinedStyles = `${baseStyle} ${variants[variant]} ${className}`;

  if (href) {
    return (
      <Link href={href} className={combinedStyles}>
        {children}
      </Link>
    );
  }

  return (
    <button className={combinedStyles} {...props}>
      {children}
    </button>
  );
}