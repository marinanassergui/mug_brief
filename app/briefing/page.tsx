"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Button } from "@/components/ui/Button";
import { Divider } from "@/components/ui/Divider";
import { getDraft, clearDraft } from "@/lib/storage/localStorageHelpers";

export default function WelcomePage() {
  const router = useRouter();
  const [hasDraft, setHasDraft] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Avoid hydration mismatch by waiting for client mount
  useEffect(() => {
    setMounted(true);
    const draft = getDraft();
    if (draft && Object.keys(draft).length > 0) {
      setHasDraft(true);
    }
  }, []);

  const handleStartFresh = () => {
    clearDraft();
    setHasDraft(false);
    router.push("/briefing/etapa");
  };

  const handleContinue = () => {
    router.push("/briefing/etapa");
  };

  if (!mounted) {
    return null;
  }

  return (
    <div className="min-h-screen bg-[#FFFFFF] flex flex-col justify-between font-sans">
      
      {/* Recovery sutil banner at top */}
      {hasDraft && (
        <div className="w-full bg-foreground-primary text-white py-3.5 px-6 md:px-12 flex flex-col md:flex-row md:items-center md:justify-between gap-3 select-none">
          <span className="text-[13px] font-medium tracking-[0.05em]">
            Você tem um briefing em andamento. Continuar de onde parou?
          </span>
          <div className="flex items-center gap-4">
            <button
              onClick={handleContinue}
              className="text-[11px] font-bold tracking-[0.15em] uppercase hover:underline cursor-pointer"
            >
              CONTINUAR
            </button>
            <span className="opacity-30">|</span>
            <button
              onClick={handleStartFresh}
              className="text-[11px] font-bold tracking-[0.15em] uppercase opacity-75 hover:opacity-100 hover:underline cursor-pointer"
            >
              COMEÇAR DO ZERO
            </button>
          </div>
        </div>
      )}

      {/* Main welcoming copy block */}
      <div className="flex-1 flex flex-col justify-center px-6 md:px-12 py-12 max-w-[720px] mx-auto w-full">
        <div className="flex flex-col gap-6 text-left">
          <Eyebrow>BRIEFING / VOL.01</Eyebrow>
          <h1 className="text-h1 text-foreground-primary">
            Vamos começar pelo começo.
          </h1>
          <p className="text-body text-foreground-secondary max-w-[480px]">
            Esse briefing leva entre 10 e 15 minutos. Você pode pausar e voltar — seu progresso fica salvo no navegador.
          </p>
          <div className="pt-4">
            <Button onClick={handleContinue} className="w-full md:w-auto">
              COMEÇAR →
            </Button>
          </div>
        </div>
      </div>

      {/* Bottom Editorial Meta */}
      <div className="px-6 md:px-12 py-8 max-w-[720px] mx-auto w-full text-left">
        <Divider className="mb-6" />
        <span className="text-label-micro text-foreground-tertiary select-none">
          5 ETAPAS · ~12 MIN
        </span>
      </div>
    </div>
  );
}
