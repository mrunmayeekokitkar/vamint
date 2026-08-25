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
    primary: "bg-mustard-600 hover:bg-mustard-500 text-bg-primary shadow-sm hover:shadow-[0_0_15px_rgba(222,184,135,0.25)] border border-transparent",
    secondary: "bg-mustard-600/5 hover:bg-mustard-600/10 text-mustard-600 border border-mustard-600/30 hover:border-mustard-600",
    ghost: "bg-transparent hover:bg-bg-surface-raised text-text-secondary hover:text-text-primary",
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
