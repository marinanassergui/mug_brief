import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary";
  children: React.ReactNode;
}

export function Button({ variant = "primary", children, className = "", ...props }: ButtonProps) {
  if (variant === "secondary") {
    return (
      <button
        type="button"
        className={`text-[13px] font-medium tracking-[0.15em] uppercase underline underline-offset-4 bg-transparent text-foreground-primary hover:text-foreground-secondary transition-colors duration-200 cursor-pointer ${className}`}
        {...props}
      >
        {children}
      </button>
    );
  }

  return (
    <button
      className={`px-8 py-4 bg-foreground-primary text-white font-medium tracking-[0.15em] text-[13px] uppercase border border-foreground-primary transition-all duration-200 hover:bg-white hover:text-foreground-primary cursor-pointer inline-flex items-center justify-between gap-3 ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
