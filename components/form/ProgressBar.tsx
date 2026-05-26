import React from "react";

interface ProgressBarProps {
  step: number;
}

export function ProgressBar({ step }: ProgressBarProps) {
  // Map step to percentage: Step 1 (0%), Step 2 (20%), Step 3 (40%), Step 4 (60%), Step 5 (80%), Step 6/Submit (100%)
  // Wait, let's make it intuitive: Step 1 is stage 1, Step 5 is stage 5.
  // Stage 1 -> 0%, Stage 2 -> 20%, Stage 3 -> 40%, Stage 4 -> 60%, Stage 5 -> 80% (or step - 1 / 5 * 100)
  const percentage = Math.min(Math.max(Math.round(((step - 1) / 5) * 100), 0), 100);

  return (
    <div className="w-full bg-[#FFFFFF] sticky top-0 z-40 border-b border-black/5">
      <div className="max-w-[720px] mx-auto w-full flex items-center justify-between py-4 px-6 md:px-8 select-none">
        <span className="text-label-micro text-foreground-secondary">
          ETAPA {step} DE 5
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
