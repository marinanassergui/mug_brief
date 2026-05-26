import { z } from "zod";

// Helper robusto para URLs opcionais que tolera URL válida, string vazia, null e undefined
const optionalUrl = z.string()
  .url("Insira uma URL válida ou deixe em branco")
  .optional()
  .or(z.literal(""))
  .or(z.null())
  .or(z.undefined());

// Helper robusto para Referências de URLs opcionais
const optionalRefUrl = z.string()
  .url("Insira uma URL de referência válida ou deixe em branco")
  .optional()
  .or(z.literal(""))
  .or(z.null())
  .or(z.undefined());

// Helper para strings normais opcionais tolerando null e undefined
const optionalString = z.string()
  .optional()
  .or(z.literal(""))
  .or(z.null())
  .or(z.undefined());

// ==========================================
// STAGE 1: IDENTIFICATION
// ==========================================
export const step1Schema = z.object({
  nome: z.string()
    .min(1, "Precisamos do seu nome pra começar")
    .min(3, "Digite seu nome completo"),
  email: z.string()
    .min(1, "Precisamos do seu e-mail pra começar")
    .email("Insira um e-mail válido"),
  whatsapp: z.string()
    .min(1, "Digite um número de WhatsApp")
    .min(14, "Digite um número de WhatsApp válido"),
  empresa: z.string()
    .min(1, "Qual o nome da empresa ou projeto?"),
  site: optionalUrl,
  cargo: z.string()
    .min(1, "Qual é o seu cargo ou função?"),
  comoConheceu: z.string()
    .min(1, "Selecione como nos conheceu"),
});

// ==========================================
// STAGE 2: PRODUCT
// ==========================================
export const step2BaseSchema = z.object({
  descricaoCurta: z.string()
    .min(1, "Explique o que seu produto faz em poucas palavras")
    .min(5, "A descrição deve ser mais detalhada")
    .max(200, "Limite máximo de 200 caracteres excedido"),
  clienteIdeal: z.string()
    .min(1, "Descreva quem é o seu cliente ideal")
    .min(10, "A descrição deve conter de 2 a 3 frases"),
  diferencial: z.string()
    .min(1, "Diga-nos qual o seu principal diferencial")
    .min(10, "Seja um pouco mais descritivo sobre o seu diferencial"),
  estagio: z.string()
    .min(1, "Selecione o estágio do produto"),
  setor: z.string()
    .min(1, "Selecione o setor da sua empresa"),
  setorOutro: optionalString,
});

export const step2Schema = step2BaseSchema.refine((data) => {
  if (data.setor === "Outro" && (!data.setorOutro || data.setorOutro.trim() === "")) {
    return false;
  }
  return true;
}, {
  message: "Por favor, especifique o setor",
  path: ["setorOutro"],
});

// ==========================================
// STAGE 3: PROJECT
// ==========================================
export const step3Schema = z.object({
  tipoLP: z.string()
    .min(1, "Selecione o tipo de landing page"),
  objetivoPrincipal: z.string()
    .min(1, "Precisamos saber o objetivo da landing page")
    .min(10, "Explique o objetivo com mais detalhes"),
  metricaSucesso: z.string()
    .min(1, "Nos informe a métrica de sucesso desejada")
    .min(5, "Descreva a métrica de sucesso com mais detalhes"),
  siteLPAtual: optionalUrl,
  problemasLPAtual: optionalString,
  estadoCopy: z.string()
    .min(1, "Nos diga qual o estado dos textos da LP"),
});

// ==========================================
// STAGE 4: REFERENCES & BRAND STYLE
// ==========================================
export const step4Schema = z.object({
  ref1: optionalRefUrl,
  ref2: optionalRefUrl,
  ref3: optionalRefUrl,
  refMotivo: optionalString,
  identidadeVisual: z.string()
    .min(1, "Nos diga qual o estado da sua identidade visual"),
  brandbookDrive: optionalUrl,
  tomDeVoz: z.array(z.string())
    .min(1, "Selecione pelo menos um tom de voz para a marca"),
  estiloEvitar: optionalString,
  concordo: z.boolean()
    .refine((val) => val === true, "Você precisa concordar em receber nosso retorno por e-mail"),
});

// ==========================================
// FULL MERGED SCHEMA & REFINEMENTS
// ==========================================
export const briefingSchema = z.object({
  ...step1Schema.shape,
  ...step2BaseSchema.shape,
  ...step3Schema.shape,
  ...step4Schema.shape,
}).refine((data) => {
  if (data.setor === "Outro" && (!data.setorOutro || data.setorOutro.trim() === "")) {
    return false;
  }
  return true;
}, {
  message: "Por favor, especifique o setor",
  path: ["setorOutro"],
});

export type BriefingData = z.infer<typeof briefingSchema>;
export type Step1Data = z.infer<typeof step1Schema>;
export type Step2Data = z.infer<typeof step2Schema>;
export type Step3Data = z.infer<typeof step3Schema>;
export type Step4Data = z.infer<typeof step4Schema>;
