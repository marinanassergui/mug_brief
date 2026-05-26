import React from "react";
import { Button } from "../ui/Button";

interface NavigationButtonsProps {
  onBack?: () => void;
  isSubmitting?: boolean;
  isLastStep?: boolean;
  onNextClick?: () => void;
}

export function NavigationButtons({
  onBack,
  isSubmitting = false,
  isLastStep = false,
  onNextClick,
}: NavigationButtonsProps) {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-[#FFFFFF] border-t border-black/10 py-5 px-6 z-30 flex items-center justify-between md:relative md:border-t-0 md:p-0 md:bg-transparent md:mt-12 select-none">
      {onBack ? (
        <Button 
          variant="secondary" 
          onClick={onBack} 
          type="button"
        >
          ← VOLTAR
        </Button>
      ) : (
        <div aria-hidden="true" className="w-1" />
      )}

      {isLastStep ? (
        <Button
          type="submit"
          disabled={isSubmitting}
          className="min-w-[200px]"
        >
          {isSubmitting ? "ENVIANDO..." : "ENVIAR BRIEFING →"}
        </Button>
      ) : (
        <Button
          type="button"
          onClick={onNextClick}
          className="min-w-[160px]"
        >
          PRÓXIMO →
        </Button>
      )}
    </div>
  );
}
