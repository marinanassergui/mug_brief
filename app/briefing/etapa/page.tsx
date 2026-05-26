"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

// Base UI & Form Components
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Divider } from "@/components/ui/Divider";
import { ProgressBar } from "@/components/form/ProgressBar";
import { NavigationButtons } from "@/components/form/NavigationButtons";
import { FormStep } from "@/components/form/FormStep";
import { Input } from "@/components/form/Input";
import { Textarea } from "@/components/form/Textarea";
import { RadioGroup } from "@/components/form/RadioGroup";
import { Select } from "@/components/form/Select";
import { MultiSelect } from "@/components/form/MultiSelect";

// Schema & Storage
import {
  briefingSchema,
  BriefingData,
} from "@/lib/schemas/briefingSchema";
import { getDraft, saveDraft, clearDraft } from "@/lib/storage/localStorageHelpers";

export default function BriefingWizardPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [mounted, setMounted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  // 1. Initialize react-hook-form with full schema resolver
  const methods = useForm<BriefingData>({
    resolver: zodResolver(briefingSchema),
    mode: "onBlur",
    defaultValues: {
      nome: "",
      email: "",
      whatsapp: "",
      empresa: "",
      site: "",
      cargo: "",
      comoConheceu: "",
      descricaoCurta: "",
      clienteIdeal: "",
      diferencial: "",
      estagio: "",
      setor: "",
      setorOutro: "",
      tipoLP: "",
      objetivoPrincipal: "",
      metricaSucesso: "",
      siteLPAtual: "",
      problemasLPAtual: "",
      estadoCopy: "",
      ref1: "",
      ref2: "",
      ref3: "",
      refMotivo: "",
      identidadeVisual: "",
      brandbookDrive: "",
      tomDeVoz: [],
      estiloEvitar: "",
      concordo: false,
    },
  });

  const {
    register,
    handleSubmit,
    trigger,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = methods;

  // 2. Draft recovery on mount
  useEffect(() => {
    setMounted(true);
    const draft = getDraft();
    if (draft) {
      reset(draft);
    }
  }, [reset]);

  // 3. Debounced saving on any form values change (500ms debounce)
  const watchedValues = watch();
  useEffect(() => {
    if (!mounted) return;
    const saveTimeout = setTimeout(() => {
      saveDraft(watchedValues);
    }, 500);

    return () => clearTimeout(saveTimeout);
  }, [watchedValues, mounted]);

  if (!mounted) {
    return null;
  }

  // 4. Define field subsets for step-specific validation
  const getStepFields = (currentStep: number): (keyof BriefingData)[] => {
    switch (currentStep) {
      case 1:
        return ["nome", "email", "whatsapp", "empresa", "site", "cargo", "comoConheceu"];
      case 2:
        return ["descricaoCurta", "clienteIdeal", "diferencial", "estagio", "setor", "setorOutro"];
      case 3:
        return ["tipoLP", "objetivoPrincipal", "metricaSucesso", "siteLPAtual", "problemasLPAtual", "estadoCopy"];
      case 4:
        return ["ref1", "ref2", "ref3", "refMotivo", "identidadeVisual", "brandbookDrive", "tomDeVoz", "estiloEvitar", "concordo"];
      default:
        return [];
    }
  };

  // 5. Navigation Handlers
  const handleNextStep = async () => {
    const fieldsToValidate = getStepFields(step);
    const isStepValid = await trigger(fieldsToValidate);

    if (isStepValid) {
      setSubmitError(null);
      setStep((prev) => Math.min(prev + 1, 4));
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleBackStep = () => {
    setSubmitError(null);
    if (step === 1) {
      router.push("/briefing");
    } else {
      setStep((prev) => Math.max(prev - 1, 1));
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  // Intercept Enter key inside inputs to advance stages seamlessly
  const handleKeyDown = (e: React.KeyboardEvent<HTMLFormElement>) => {
    if (e.key === "Enter") {
      const target = e.target as HTMLElement;
      if (target.tagName === "TEXTAREA" || target.getAttribute("type") === "checkbox" || target.tagName === "SELECT") {
        return;
      }
      
      if (step < 4) {
        e.preventDefault();
        handleNextStep();
      }
      // On step 4, let standard form submit happen naturally
    }
  };

  // 6. Submit handler
  const onSubmit = async (data: BriefingData) => {
    try {
      setSubmitError(null);
      const response = await fetch("/api/submit-briefing", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        let detailMsg = "";
        if (result.details) {
          if (typeof result.details === "string") {
            detailMsg = `: ${result.details}`;
          } else {
            detailMsg = `: ${JSON.stringify(result.details)}`;
          }
        }
        throw new Error((result.error || "Erro ao enviar briefing.") + detailMsg);
      }

      // Success: clear draft, and redirect to confirmation page
      clearDraft();
      router.push(`/briefing/confirmacao?email=${encodeURIComponent(data.email)}&time=${Date.now()}`);
    } catch (error: any) {
      setSubmitError(
        error.message || "Algo deu errado. Tenta de novo ou manda direto pra hellomugstudio@gmail.com"
      );
    }
  };

  // Watch sector value to render dynamic sektorOutro field
  const currentSetor = watch("setor");

  return (
    <div className="min-h-screen bg-[#FFFFFF] flex flex-col justify-between font-sans pb-28 md:pb-0">
      
      {/* Sticky Progress Bar at the absolute top */}
      <ProgressBar step={step} />

      {/* Main wizard body */}
      <div className="flex-1 flex flex-col justify-center px-6 md:px-12 py-12 max-w-[720px] mx-auto w-full">
        <FormProvider {...methods}>
          <form 
            onSubmit={handleSubmit(onSubmit)} 
            onKeyDown={handleKeyDown}
            className="w-full flex flex-col gap-8 text-left"
            noValidate
          >
            
            {/* Framer Motion Step container */}
            <FormStep step={step}>
              
              {/* STAGE 1: IDENTIFICATION */}
              {step === 1 && (
                <div className="flex flex-col gap-8 w-full">
                  <div className="flex flex-col gap-2">
                    <Eyebrow>01 — IDENTIFICAÇÃO</Eyebrow>
                    <h2 className="text-h2 text-foreground-primary">Quem é você?</h2>
                  </div>
                  
                  <div className="flex flex-col gap-6 w-full">
                    <Input
                      label="Nome completo"
                      required
                      registration={register("nome")}
                      error={errors.nome?.message}
                    />

                    <Input
                      label="E-mail comercial"
                      type="email"
                      required
                      registration={register("email")}
                      error={errors.email?.message}
                    />

                    <Input
                      label="WhatsApp"
                      type="tel"
                      required
                      maskType="whatsapp"
                      registration={register("whatsapp")}
                      error={errors.whatsapp?.message}
                      placeholder="(99) 99999-9999"
                    />

                    <Input
                      label="Empresa ou projeto"
                      required
                      registration={register("empresa")}
                      error={errors.empresa?.message}
                    />

                    <Input
                      label="Site atual (se houver)"
                      type="url"
                      registration={register("site")}
                      error={errors.site?.message}
                    />

                    <Input
                      label="Cargo / função"
                      required
                      registration={register("cargo")}
                      error={errors.cargo?.message}
                    />

                    <Select
                      label="Como conheceu o Mug?"
                      required
                      registration={register("comoConheceu")}
                      error={errors.comoConheceu?.message}
                      options={[
                        { value: "Instagram", label: "Instagram" },
                        { value: "LinkedIn", label: "LinkedIn" },
                        { value: "Indicação", label: "Indicação" },
                        { value: "Google", label: "Google" },
                        { value: "Outro", label: "Outro" },
                      ]}
                    />
                  </div>
                </div>
              )}

              {/* STAGE 2: PRODUCT */}
              {step === 2 && (
                <div className="flex flex-col gap-8 w-full">
                  <div className="flex flex-col gap-2">
                    <Eyebrow>02 — PRODUTO</Eyebrow>
                    <h2 className="text-h2 text-foreground-primary">Conta sobre o que vocês fazem.</h2>
                  </div>
                  
                  <div className="flex flex-col gap-6 w-full">
                    <Textarea
                      label="Em uma frase, o que sua empresa/produto faz?"
                      required
                      maxLength={200}
                      registration={register("descricaoCurta")}
                      error={errors.descricaoCurta?.message}
                    />

                    <Textarea
                      label="Quem é o cliente ideal? Descreva em 2-3 frases."
                      required
                      registration={register("clienteIdeal")}
                      error={errors.clienteIdeal?.message}
                    />

                    <Textarea
                      label="Qual é o principal diferencial?"
                      required
                      registration={register("diferencial")}
                      error={errors.diferencial?.message}
                    />

                    <RadioGroup
                      label="Estágio do produto/empresa"
                      error={errors.estagio?.message}
                      registration={register("estagio")}
                      value={watch("estagio")}
                      options={[
                        { value: "Ideação", label: "Ideação" },
                        { value: "MVP", label: "MVP" },
                        { value: "Operando há menos de 1 ano", label: "Operando há menos de 1 ano" },
                        { value: "Operando há mais de 1 ano", label: "Operando há mais de 1 ano" },
                        { value: "Empresa madura", label: "Empresa madura" },
                      ]}
                    />

                    <Select
                      label="Setor"
                      required
                      registration={register("setor")}
                      error={errors.setor?.message}
                      options={[
                        { value: "SaaS", label: "SaaS" },
                        { value: "Fintech", label: "Fintech" },
                        { value: "E-commerce", label: "E-commerce" },
                        { value: "Saúde", label: "Saúde" },
                        { value: "Educação", label: "Educação" },
                        { value: "Logística", label: "Logística" },
                        { value: "Serviços B2B", label: "Serviços B2B" },
                        { value: "Serviços B2C", label: "Serviços B2C" },
                        { value: "Infoproduto", label: "Infoproduto" },
                        { value: "Outro", label: "Outro" },
                      ]}
                    />

                    {/* Conditional Sector free-text field */}
                    {currentSetor === "Outro" && (
                      <Input
                        label="Especifique o setor"
                        required
                        registration={register("setorOutro")}
                        error={errors.setorOutro?.message}
                      />
                    )}
                  </div>
                </div>
              )}

              {/* STAGE 3: PROJECT */}
              {step === 3 && (
                <div className="flex flex-col gap-8 w-full">
                  <div className="flex flex-col gap-2">
                    <Eyebrow>03 — PROJETO</Eyebrow>
                    <h2 className="text-h2 text-foreground-primary">O que você precisa que essa LP faça?</h2>
                  </div>
                  
                  <div className="flex flex-col gap-6 w-full">
                    <RadioGroup
                      label="Tipo de landing page"
                      error={errors.tipoLP?.message}
                      registration={register("tipoLP")}
                      value={watch("tipoLP")}
                      options={[
                        { value: "Lançamento de produto", label: "Lançamento de produto" },
                        { value: "Captura de leads", label: "Captura de leads" },
                        { value: "Venda direta", label: "Venda direta" },
                        { value: "Página institucional", label: "Página institucional" },
                        { value: "Outro", label: "Outro" },
                      ]}
                    />

                    <Textarea
                      label="Objetivo principal"
                      required
                      placeholder="Ex: capturar 100 leads qualificados por mês pro time comercial"
                      registration={register("objetivoPrincipal")}
                      error={errors.objetivoPrincipal?.message}
                    />

                    <Textarea
                      label="Métrica de sucesso"
                      required
                      placeholder="Ex: taxa de conversão de visitante para lead acima de 5%"
                      registration={register("metricaSucesso")}
                      error={errors.metricaSucesso?.message}
                    />

                    <Input
                      label="Tem LP atual? Qual o link?"
                      type="url"
                      registration={register("siteLPAtual")}
                      error={errors.siteLPAtual?.message}
                    />

                    <Textarea
                      label="O que NÃO está funcionando na LP atual?"
                      registration={register("problemasLPAtual")}
                      error={errors.problemasLPAtual?.message}
                    />

                    <RadioGroup
                      label="Copy/texto pronto?"
                      error={errors.estadoCopy?.message}
                      registration={register("estadoCopy")}
                      value={watch("estadoCopy")}
                      options={[
                        { value: "Tenho tudo pronto", label: "Tenho tudo pronto" },
                        { value: "Tenho parte", label: "Tenho parte" },
                        { value: "Preciso de tudo", label: "Preciso de tudo" },
                      ]}
                    />
                  </div>
                </div>
              )}

              {/* STAGE 4: REFERENCES & BRAND STYLE (NOW THE LAST STAGE) */}
              {step === 4 && (
                <div className="flex flex-col gap-8 w-full">
                  <div className="flex flex-col gap-2">
                    <Eyebrow>04 — REFERÊNCIAS & ESTILO</Eyebrow>
                    <h2 className="text-h2 text-foreground-primary">Como você quer que pareça?</h2>
                  </div>
                  
                  <div className="flex flex-col gap-6 w-full">
                    <div className="flex flex-col gap-4">
                      <span className="text-[11px] font-medium tracking-[0.15em] uppercase text-foreground-tertiary select-none">
                        3 links de LPs que admira (opcionais)
                      </span>
                      <Input
                        label="Referência 1 (URL)"
                        type="url"
                        registration={register("ref1")}
                        error={errors.ref1?.message}
                      />
                      <Input
                        label="Referência 2 (URL)"
                        type="url"
                        registration={register("ref2")}
                        error={errors.ref2?.message}
                      />
                      <Input
                        label="Referência 3 (URL)"
                        type="url"
                        registration={register("ref3")}
                        error={errors.ref3?.message}
                      />
                    </div>

                    <Textarea
                      label="Por que gosta dessas referências?"
                      registration={register("refMotivo")}
                      error={errors.refMotivo?.message}
                    />

                    <RadioGroup
                      label="Tem identidade visual definida (logo, cores, fonte)?"
                      error={errors.identidadeVisual?.message}
                      registration={register("identidadeVisual")}
                      value={watch("identidadeVisual")}
                      options={[
                        { value: "Sim, completa", label: "Sim, completa" },
                        { value: "Parcial", label: "Parcial" },
                        { value: "Não, precisamos criar", label: "Não, precisamos criar" },
                      ]}
                    />

                    <Input
                      label="Link pro brand book ou pasta do Drive"
                      type="url"
                      registration={register("brandbookDrive")}
                      error={errors.brandbookDrive?.message}
                    />

                    <MultiSelect
                      label="Tom de voz da marca"
                      registration={register("tomDeVoz")}
                      values={watch("tomDeVoz")}
                      error={errors.tomDeVoz?.message}
                      options={[
                        { value: "Direto", label: "Direto" },
                        { value: "Provocador", label: "Provocador" },
                        { value: "Acolhedor", label: "Acolhedor" },
                        { value: "Técnico", label: "Técnico" },
                        { value: "Sofisticado", label: "Sofisticado" },
                        { value: "Descontraído", label: "Descontraído" },
                        { value: "Premium", label: "Premium" },
                        { value: "Acessível", label: "Acessível" },
                      ]}
                    />

                    <Textarea
                      label="Algum estilo visual que você NÃO quer?"
                      registration={register("estiloEvitar")}
                      error={errors.estiloEvitar?.message}
                    />

                    {/* Relocated terms agreement checkbox from Step 5 */}
                    <div className="flex flex-col gap-2 pt-4">
                      <label className="flex items-start gap-3 cursor-pointer select-none">
                        <input
                          type="checkbox"
                          {...register("concordo")}
                          className="sr-only"
                        />
                        <span className="text-[14px] font-mono tracking-normal pt-0.5 text-foreground-primary">
                          {watch("concordo") ? "[X]" : "[ ]"}
                        </span>
                        <span className="text-[14px] font-sans font-medium text-foreground-secondary leading-tight hover:text-foreground-primary transition-colors">
                          Concordo em receber retorno do Mug Studio no e-mail informado.
                        </span>
                      </label>
                      {errors.concordo && (
                        <span className="text-[12px] font-medium font-sans text-red-600 block select-none">
                          {errors.concordo.message}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* Error Callout */}
              {submitError && (
                <div className="p-4 border border-black bg-white flex flex-col gap-3">
                  <span className="text-[14px] font-medium font-sans text-foreground-primary leading-tight">
                    {submitError}
                  </span>
                  <div>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="text-[11px] font-bold tracking-[0.15em] uppercase hover:underline text-foreground-primary cursor-pointer"
                    >
                      TENTAR DE NOVO
                    </button>
                  </div>
                </div>
              )}

              {/* Navigation Back & Next controls */}
              <NavigationButtons
                onBack={handleBackStep}
                isSubmitting={isSubmitting}
                isLastStep={step === 4}
                onNextClick={handleNextStep}
              />
              
            </FormStep>

          </form>
        </FormProvider>
      </div>
      
    </div>
  );
}
