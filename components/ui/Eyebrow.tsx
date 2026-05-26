import React from "react";

interface EyebrowProps {
  children: React.ReactNode;
  className?: string;
}

export function Eyebrow({ children, className = "" }: EyebrowProps) {
  return (
    <span className={`block text-label-micro text-foreground-tertiary select-none ${className}`}>
      {children}
    </span>
  );
}
