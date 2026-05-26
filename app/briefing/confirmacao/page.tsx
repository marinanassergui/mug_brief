"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState, Suspense } from "react";
import { motion } from "framer-motion";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Divider } from "@/components/ui/Divider";

function ConfirmationContent() {
  const searchParams = useSearchParams();
  const email = searchParams?.get("email") || "seu e-mail comercial";
  const timeParam = searchParams?.get("time");
  
  const [formattedTime, setFormattedTime] = useState("");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const date = timeParam ? new Date(Number(timeParam)) : new Date();
    setFormattedTime(
      date.toLocaleString("pt-BR", {
        timeZone: "America/Sao_Paulo",
        dateStyle: "short",
        timeStyle: "short",
      }).replace(",", " ·")
    );
  }, [timeParam]);

  if (!mounted) {
    return null;
  }

  const headline = "Briefing recebido.";
  const words = headline.split(" ");

  return (
    <div className="min-h-screen bg-[#FFFFFF] flex flex-col justify-between font-sans">
      
      {/* Content Area */}
      <div className="flex-1 flex flex-col justify-center px-6 md:px-12 py-12 max-w-[720px] mx-auto w-full">
        <div className="flex flex-col gap-6 text-left">
          <Eyebrow>COMPLETO</Eyebrow>
          
          {/* Word-by-word fade-in animation */}
          <h1 className="text-h1 text-foreground-primary flex flex-wrap">
            {words.map((word, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{
                  duration: 0.4,
                  delay: i * 0.08,
                  ease: [0.215, 0.610, 0.355, 1.000],
                }}
                className="inline-block mr-4"
              >
                {word}
              </motion.span>
            ))}
          </h1>
          
          <p className="text-body text-foreground-secondary max-w-[480px]">
            A gente vai ler com calma e responder em até 24 horas no e-mail <strong className="text-foreground-primary font-medium">{email}</strong>.
          </p>
        </div>
      </div>

      {/* Editorial Footer */}
      <div className="px-6 md:px-12 py-8 max-w-[720px] mx-auto w-full text-left">
        <Divider className="mb-6" />
        <div className="flex flex-col gap-4">
          <span className="text-label-micro text-foreground-tertiary select-none">
            ENVIADO EM · {formattedTime} | TEMPO DE RESPOSTA · ATÉ 24H
          </span>
          <div>
            <a
              href="https://mugstudio.com.br"
              className="text-[13px] font-medium tracking-[0.15em] uppercase hover:underline inline-block select-none text-foreground-primary"
            >
              Voltar pro site →
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ConfirmationPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#FFFFFF] flex flex-col justify-center px-6">
        <span className="text-label-micro text-foreground-tertiary">CARREGANDO...</span>
      </div>
    }>
      <ConfirmationContent />
    </Suspense>
  );
}
