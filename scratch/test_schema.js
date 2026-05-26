const { z } = require("zod");

// Replicate Step 1 schemas exactly
const step1Schema = z.object({
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
  site: z.string()
    .url("Insira uma URL válida ou deixe em branco")
    .optional()
    .or(z.literal("")),
  cargo: z.string()
    .min(1, "Qual é o seu cargo ou função?"),
  comoConheceu: z.string()
    .min(1, "Selecione como nos conheceu"),
});

// Test Cases
const testInputs = [
  // 1. Perfect valid case with blank site
  {
    nome: "Marina Nasser",
    email: "marina@example.com",
    whatsapp: "(11) 99999-9999",
    empresa: "Mug Studio",
    site: "",
    cargo: "Designer",
    comoConheceu: "Instagram"
  },
  // 2. Mismatch URL (no protocol)
  {
    nome: "Marina Nasser",
    email: "marina@example.com",
    whatsapp: "(11) 99999-9999",
    empresa: "Mug Studio",
    site: "www.google.com",
    cargo: "Designer",
    comoConheceu: "Instagram"
  },
  // 3. Short WhatsApp
  {
    nome: "Marina Nasser",
    email: "marina@example.com",
    whatsapp: "(11) 9999-999",
    empresa: "Mug Studio",
    site: "",
    cargo: "Designer",
    comoConheceu: "Instagram"
  }
];

testInputs.forEach((input, index) => {
  const result = step1Schema.safeParse(input);
  console.log(`\nTest Case ${index + 1}:`, input.site ? `Site is "${input.site}"` : "Site is blank", input.whatsapp.length < 14 ? "WhatsApp is short" : "WhatsApp is OK");
  if (result.success) {
    console.log("Success! Validation passed.");
  } else {
    console.log("Failed! Errors:", result.error.flatten().fieldErrors);
  }
});
