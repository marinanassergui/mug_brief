import { BriefingData } from "../schemas/briefingSchema";

interface EmailTemplates {
  html: string;
  text: string;
}

/**
 * Formats the briefing responses into clean HTML and plain text templates.
 */
export function formatEmail(data: BriefingData, timestamp: string): EmailTemplates {
  const formattedDate = new Date(timestamp).toLocaleString("pt-BR", {
    timeZone: "America/Sao_Paulo",
    dateStyle: "medium",
    timeStyle: "short",
  });

  const tomDeVozList = data.tomDeVoz ? data.tomDeVoz.join(", ") : "";
  const setorExibido = data.setor === "Outro" && data.setorOutro ? `Outro (${data.setorOutro})` : data.setor;

  // HTML inline-styled Template
  const html = `
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Mug Studio Briefing</title>
</head>
<body style="margin: 0; padding: 0; background-color: #FFFFFF; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #000000; -webkit-font-smoothing: antialiased;">
  <table border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: #FFFFFF;">
    <tr>
      <td align="left" style="padding: 40px 24px;">
        <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px; margin: 0 auto; text-align: left;">
          
          <!-- CABEÇALHO -->
          <tr>
            <td style="padding-bottom: 24px;">
              <span style="font-size: 11px; font-weight: 600; letter-spacing: 0.2em; text-transform: uppercase; color: rgba(0,0,0,0.5); display: block; margin-bottom: 6px;">MUG STUDIO</span>
              <h1 style="font-size: 28px; font-weight: 800; line-height: 1.0; margin: 0; text-transform: uppercase; letter-spacing: -0.01em;">NOVO BRIEFING RECEBIDO</h1>
              <span style="font-size: 13px; color: rgba(0,0,0,0.5); display: block; margin-top: 8px;">Recebido em ${formattedDate}</span>
            </td>
          </tr>
          
          <!-- DIVISÓRIA -->
          <tr>
            <td style="border-bottom: 1px solid rgba(0,0,0,0.2); padding-bottom: 12px;"></td>
          </tr>

          <!-- RESUMO EXECUTIVO -->
          <tr>
            <td style="padding: 32px 0 24px 0;">
              <h2 style="font-size: 11px; font-weight: 600; letter-spacing: 0.15em; text-transform: uppercase; color: rgba(0,0,0,0.5); margin: 0 0 16px 0;">RESUMO EXECUTIVO</h2>
              <table border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: #F8F8F8; padding: 24px; border: 1px solid rgba(0,0,0,0.1);">
                <tr>
                  <td style="padding-bottom: 12px; font-size: 14px; font-weight: 700;" width="35%">Cliente:</td>
                  <td style="padding-bottom: 12px; font-size: 14px; font-weight: 400;">${data.nome} (${data.cargo})</td>
                </tr>
                <tr>
                  <td style="padding-bottom: 12px; font-size: 14px; font-weight: 700;">Empresa/Projeto:</td>
                  <td style="padding-bottom: 12px; font-size: 14px; font-weight: 400;">${data.empresa}</td>
                </tr>
                <tr>
                  <td style="padding-bottom: 12px; font-size: 14px; font-weight: 700;">E-mail:</td>
                  <td style="padding-bottom: 12px; font-size: 14px; font-weight: 400;"><a href="mailto:${data.email}" style="color: #000000; text-decoration: underline;">${data.email}</a></td>
                </tr>
                <tr>
                  <td style="padding-bottom: 12px; font-size: 14px; font-weight: 700;">WhatsApp:</td>
                  <td style="padding-bottom: 12px; font-size: 14px; font-weight: 400;"><a href="https://wa.me/${data.whatsapp.replace(/\D/g, "")}" style="color: #000000; text-decoration: underline;">${data.whatsapp}</a></td>
                </tr>
                <tr>
                  <td style="font-size: 14px; font-weight: 700;">Tipo de LP:</td>
                  <td style="font-size: 14px; font-weight: 400;">${data.tipoLP}</td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- DIVISÓRIA -->
          <tr>
            <td style="border-bottom: 1px solid rgba(0,0,0,0.1); padding-bottom: 12px;"></td>
          </tr>

          <!-- ETAPA 1 -->
          <tr>
            <td style="padding: 32px 0 16px 0;">
              <span style="font-size: 11px; font-weight: 600; letter-spacing: 0.15em; text-transform: uppercase; color: rgba(0,0,0,0.5); display: block; margin-bottom: 16px;">01 — IDENTIFICAÇÃO</span>
              <p style="margin: 0 0 4px 0; font-size: 13px; font-weight: 700; color: #000000;">Nome Completo</p>
              <p style="margin: 0 0 16px 0; font-size: 15px; font-weight: 400; line-height: 1.4; color: rgba(0,0,0,0.8);">${data.nome}</p>
              
              <p style="margin: 0 0 4px 0; font-size: 13px; font-weight: 700; color: #000000;">E-mail comercial</p>
              <p style="margin: 0 0 16px 0; font-size: 15px; font-weight: 400; line-height: 1.4; color: rgba(0,0,0,0.8);">${data.email}</p>
              
              <p style="margin: 0 0 4px 0; font-size: 13px; font-weight: 700; color: #000000;">WhatsApp</p>
              <p style="margin: 0 0 16px 0; font-size: 15px; font-weight: 400; line-height: 1.4; color: rgba(0,0,0,0.8);">${data.whatsapp}</p>
              
              <p style="margin: 0 0 4px 0; font-size: 13px; font-weight: 700; color: #000000;">Empresa ou projeto</p>
              <p style="margin: 0 0 16px 0; font-size: 15px; font-weight: 400; line-height: 1.4; color: rgba(0,0,0,0.8);">${data.empresa}</p>
              
              <p style="margin: 0 0 4px 0; font-size: 13px; font-weight: 700; color: #000000;">Site atual</p>
              <p style="margin: 0 0 16px 0; font-size: 15px; font-weight: 400; line-height: 1.4; color: rgba(0,0,0,0.8);">${data.site ? `<a href="${data.site}" style="color: #000000; text-decoration: underline;">${data.site}</a>` : "Não informado"}</p>
              
              <p style="margin: 0 0 4px 0; font-size: 13px; font-weight: 700; color: #000000;">Cargo / função</p>
              <p style="margin: 0 0 16px 0; font-size: 15px; font-weight: 400; line-height: 1.4; color: rgba(0,0,0,0.8);">${data.cargo}</p>
              
              <p style="margin: 0 0 4px 0; font-size: 13px; font-weight: 700; color: #000000;">Como conheceu o Mug?</p>
              <p style="margin: 0 0 16px 0; font-size: 15px; font-weight: 400; line-height: 1.4; color: rgba(0,0,0,0.8);">${data.comoConheceu}</p>
            </td>
          </tr>

          <!-- DIVISÓRIA -->
          <tr>
            <td style="border-bottom: 1px solid rgba(0,0,0,0.1); padding-bottom: 12px;"></td>
          </tr>

          <!-- ETAPA 2 -->
          <tr>
            <td style="padding: 32px 0 16px 0;">
              <span style="font-size: 11px; font-weight: 600; letter-spacing: 0.15em; text-transform: uppercase; color: rgba(0,0,0,0.5); display: block; margin-bottom: 16px;">02 — PRODUTO</span>
              <p style="margin: 0 0 4px 0; font-size: 13px; font-weight: 700; color: #000000;">O que sua empresa/produto faz? (Uma frase)</p>
              <p style="margin: 0 0 16px 0; font-size: 15px; font-weight: 400; line-height: 1.4; color: rgba(0,0,0,0.8);">${data.descricaoCurta}</p>
              
              <p style="margin: 0 0 4px 0; font-size: 13px; font-weight: 700; color: #000000;">Quem é o cliente ideal? (2-3 frases)</p>
              <p style="margin: 0 0 16px 0; font-size: 15px; font-weight: 400; line-height: 1.4; color: rgba(0,0,0,0.8);">${data.clienteIdeal}</p>
              
              <p style="margin: 0 0 4px 0; font-size: 13px; font-weight: 700; color: #000000;">Qual é o seu principal diferencial?</p>
              <p style="margin: 0 0 16px 0; font-size: 15px; font-weight: 400; line-height: 1.4; color: rgba(0,0,0,0.8);">${data.diferencial}</p>
              
              <p style="margin: 0 0 4px 0; font-size: 13px; font-weight: 700; color: #000000;">Estágio do produto/empresa</p>
              <p style="margin: 0 0 16px 0; font-size: 15px; font-weight: 400; line-height: 1.4; color: rgba(0,0,0,0.8);">${data.estagio}</p>
              
              <p style="margin: 0 0 4px 0; font-size: 13px; font-weight: 700; color: #000000;">Setor comercial</p>
              <p style="margin: 0 0 16px 0; font-size: 15px; font-weight: 400; line-height: 1.4; color: rgba(0,0,0,0.8);">${setorExibido}</p>
            </td>
          </tr>

          <!-- DIVISÓRIA -->
          <tr>
            <td style="border-bottom: 1px solid rgba(0,0,0,0.1); padding-bottom: 12px;"></td>
          </tr>

          <!-- ETAPA 3 -->
          <tr>
            <td style="padding: 32px 0 16px 0;">
              <span style="font-size: 11px; font-weight: 600; letter-spacing: 0.15em; text-transform: uppercase; color: rgba(0,0,0,0.5); display: block; margin-bottom: 16px;">03 — PROJETO</span>
              <p style="margin: 0 0 4px 0; font-size: 13px; font-weight: 700; color: #000000;">Tipo de landing page</p>
              <p style="margin: 0 0 16px 0; font-size: 15px; font-weight: 400; line-height: 1.4; color: rgba(0,0,0,0.8);">${data.tipoLP}</p>
              
              <p style="margin: 0 0 4px 0; font-size: 13px; font-weight: 700; color: #000000;">Objetivo principal da LP</p>
              <p style="margin: 0 0 16px 0; font-size: 15px; font-weight: 400; line-height: 1.4; color: rgba(0,0,0,0.8);">${data.objetivoPrincipal}</p>
              
              <p style="margin: 0 0 4px 0; font-size: 13px; font-weight: 700; color: #000000;">Métrica de sucesso</p>
              <p style="margin: 0 0 16px 0; font-size: 15px; font-weight: 400; line-height: 1.4; color: rgba(0,0,0,0.8);">${data.metricaSucesso}</p>
              
              <p style="margin: 0 0 4px 0; font-size: 13px; font-weight: 700; color: #000000;">Tem LP atual? Qual o link?</p>
              <p style="margin: 0 0 16px 0; font-size: 15px; font-weight: 400; line-height: 1.4; color: rgba(0,0,0,0.8);">${data.siteLPAtual ? `<a href="${data.siteLPAtual}" style="color: #000000; text-decoration: underline;">${data.siteLPAtual}</a>` : "Não possui"}</p>
              
              <p style="margin: 0 0 4px 0; font-size: 13px; font-weight: 700; color: #000000;">O que NÃO está funcionando na LP atual?</p>
              <p style="margin: 0 0 16px 0; font-size: 15px; font-weight: 400; line-height: 1.4; color: rgba(0,0,0,0.8);">${data.problemasLPAtual || "Não informado / Sem problemas"}</p>
              
              <p style="margin: 0 0 4px 0; font-size: 13px; font-weight: 700; color: #000000;">Textos/Copywriter pronto?</p>
              <p style="margin: 0 0 16px 0; font-size: 15px; font-weight: 400; line-height: 1.4; color: rgba(0,0,0,0.8);">${data.estadoCopy}</p>
            </td>
          </tr>

          <!-- DIVISÓRIA -->
          <tr>
            <td style="border-bottom: 1px solid rgba(0,0,0,0.1); padding-bottom: 12px;"></td>
          </tr>

          <!-- ETAPA 4 -->
          <tr>
            <td style="padding: 32px 0 16px 0;">
              <span style="font-size: 11px; font-weight: 600; letter-spacing: 0.15em; text-transform: uppercase; color: rgba(0,0,0,0.5); display: block; margin-bottom: 16px;">04 — REFERÊNCIAS E ESTILO</span>
              <p style="margin: 0 0 4px 0; font-size: 13px; font-weight: 700; color: #000000;">Referências de LPs que admira</p>
              <ul style="margin: 0 0 16px 0; padding-left: 20px; font-size: 15px; font-weight: 400; line-height: 1.4; color: rgba(0,0,0,0.8);">
                ${data.ref1 ? `<li><a href="${data.ref1}" style="color: #000000; text-decoration: underline;">${data.ref1}</a></li>` : ""}
                ${data.ref2 ? `<li><a href="${data.ref2}" style="color: #000000; text-decoration: underline;">${data.ref2}</a></li>` : ""}
                ${data.ref3 ? `<li><a href="${data.ref3}" style="color: #000000; text-decoration: underline;">${data.ref3}</a></li>` : ""}
                ${!data.ref1 && !data.ref2 && !data.ref3 ? "<li>Nenhuma referência enviada</li>" : ""}
              </ul>
              
              <p style="margin: 0 0 4px 0; font-size: 13px; font-weight: 700; color: #000000;">Por que gosta dessas referências?</p>
              <p style="margin: 0 0 16px 0; font-size: 15px; font-weight: 400; line-height: 1.4; color: rgba(0,0,0,0.8);">${data.refMotivo || "Não informado"}</p>
              
              <p style="margin: 0 0 4px 0; font-size: 13px; font-weight: 700; color: #000000;">Identidade visual definida (logo, cores, fontes)?</p>
              <p style="margin: 0 0 16px 0; font-size: 15px; font-weight: 400; line-height: 1.4; color: rgba(0,0,0,0.8);">${data.identidadeVisual}</p>
              
              <p style="margin: 0 0 4px 0; font-size: 13px; font-weight: 700; color: #000000;">Pasta do Brand book ou Drive</p>
              <p style="margin: 0 0 16px 0; font-size: 15px; font-weight: 400; line-height: 1.4; color: rgba(0,0,0,0.8);">${data.brandbookDrive ? `<a href="${data.brandbookDrive}" style="color: #000000; text-decoration: underline;">${data.brandbookDrive}</a>` : "Não fornecido"}</p>
              
              <p style="margin: 0 0 4px 0; font-size: 13px; font-weight: 700; color: #000000;">Tom de voz da marca</p>
              <p style="margin: 0 0 16px 0; font-size: 15px; font-weight: 400; line-height: 1.4; color: rgba(0,0,0,0.8);">${tomDeVozList || "Nenhum selecionado"}</p>
              
              <p style="margin: 0 0 4px 0; font-size: 13px; font-weight: 700; color: #000000;">Estilo visual que você NÃO quer?</p>
              <p style="margin: 0 0 16px 0; font-size: 15px; font-weight: 400; line-height: 1.4; color: rgba(0,0,0,0.8);">${data.estiloEvitar || "Não informado"}</p>
            </td>
          </tr>

          <!-- DIVISÓRIA -->
          <tr>
            <td style="border-bottom: 1px solid #000000; padding-bottom: 12px;"></td>
          </tr>

          <!-- RODAPÉ -->
          <tr>
            <td style="padding-top: 32px; font-size: 12px; line-height: 1.5; color: rgba(0,0,0,0.5);">
              <p style="margin: 0 0 8px 0; font-weight: 600; color: #000000;">Para responder ao cliente, basta dar "Reply/Responder" diretamente neste e-mail.</p>
              <p style="margin: 0;">Enviado por briefing-mug em <a href="https://mugstudio.com.br" style="color: rgba(0,0,0,0.5); text-decoration: underline;">mugstudio.com.br</a></p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `.trim();

  // Plain-Text Fallback Template
  const text = `
MUG STUDIO · NOVO BRIEFING RECEBIDO
Recebido em: ${formattedDate}
--------------------------------------------------

RESUMO EXECUTIVO:
- Cliente: ${data.nome} (${data.cargo})
- Empresa: ${data.empresa}
- E-mail: ${data.email}
- WhatsApp: ${data.whatsapp}
- Tipo de LP: ${data.tipoLP}

==================================================
01 — IDENTIFICAÇÃO
==================================================
- Nome Completo: ${data.nome}
- E-mail comercial: ${data.email}
- WhatsApp: ${data.whatsapp}
- Empresa ou projeto: ${data.empresa}
- Site atual: ${data.site || "Não informado"}
- Cargo / função: ${data.cargo}
- Como conheceu o Mug?: ${data.comoConheceu}

==================================================
02 — PRODUTO
==================================================
- O que o produto faz?: ${data.descricaoCurta}
- Cliente ideal (2-3 frases): ${data.clienteIdeal}
- Principal diferencial: ${data.diferencial}
- Estágio da empresa: ${data.estagio}
- Setor: ${setorExibido}

==================================================
03 — PROJETO
==================================================
- Tipo de Landing Page: ${data.tipoLP}
- Objetivo principal da LP: ${data.objetivoPrincipal}
- Métrica de sucesso: ${data.metricaSucesso}
- Link da LP atual (se houver): ${data.siteLPAtual || "Não possui"}
- O que não está funcionando na LP atual: ${data.problemasLPAtual || "Sem problemas"}
- Textos / Copy prontos?: ${data.estadoCopy}

==================================================
04 — REFERÊNCIAS E ESTILO
==================================================
- Referência 1: ${data.ref1 || "-"}
- Referência 2: ${data.ref2 || "-"}
- Referência 3: ${data.ref3 || "-"}
- Por que gosta delas: ${data.refMotivo || "Não informado"}
- Identidade visual definida: ${data.identidadeVisual}
- Pasta brandbook/Drive: ${data.brandbookDrive || "Não fornecido"}
- Tom de voz selecionados: ${tomDeVozList || "Nenhum"}
- Estilo a evitar: ${data.estiloEvitar || "Não informado"}

--------------------------------------------------
Para responder ao cliente, basta dar reply/responder a este e-mail.
Enviado por Mug Studio briefing wizard (https://mugstudio.com.br).
  `.trim();

  return { html, text };
}
