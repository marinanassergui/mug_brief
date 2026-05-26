import React from "react";

interface DividerProps {
  className?: string;
}

export function Divider({ className = "" }: DividerProps) {
  return (
    <div 
      className={`h-[1px] bg-black/20 w-full ${className}`} 
      aria-hidden="true" 
    />
  );
}
