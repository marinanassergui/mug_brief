import React from "react";

interface ProgressBarProps {
  step: number;
}

export function ProgressBar({ step }: ProgressBarProps) {
  // Map step to percentage for 4 steps:
  // Step 1 -> 0%, Step 2 -> 25%, Step 3 -> 50%, Step 4 -> 75%
  const percentage = Math.min(Math.max(Math.round(((step - 1) / 4) * 100), 0), 100);

  return (
    <div className="w-full bg-[#FFFFFF] sticky top-0 z-40 border-b border-black/5">
      <div className="max-w-[720px] mx-auto w-full flex items-center justify-between py-4 px-6 md:px-8 select-none">
        <span className="text-label-micro text-foreground-secondary">
          ETAPA {step} DE 4
        </span>
        <span className="text-label-micro text-foreground-secondary font-mono">
          {percentage}% COMPLETO
        </span>
      </div>
      <div className="w-full h-[1px] bg-black/20 relative">
        <div
          className="absolute left-0 top-0 h-[1.5px] bg-foreground-primary transition-all duration-600 ease-in-out"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
