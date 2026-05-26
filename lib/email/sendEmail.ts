import { Resend } from "resend";
import { formatEmail } from "./formatEmail";
import { BriefingData } from "../schemas/briefingSchema";

const resendApiKey = process.env.RESEND_API_KEY;
const studioEmail = process.env.STUDIO_EMAIL || "hellomugstudio@gmail.com";
const fromEmail = process.env.FROM_EMAIL || "onboarding@resend.dev";

/**
 * Sends a briefing email to hellomugstudio@gmail.com via the Resend API.
 * Maps replyTo to the client's email so the studio can reply directly.
 */
export async function sendBriefingEmail(data: BriefingData) {
  if (!resendApiKey) {
    throw new Error("Missing RESEND_API_KEY environment variable. Configure it in .env.local");
  }

  const resend = new Resend(resendApiKey);
  const timestamp = new Date().toISOString();
  
  // Format HTML & Plain-text fallback templates
  const { html, text } = formatEmail(data, timestamp);

  const subject = `[BRIEFING] Novo briefing de ${data.nome} — ${data.empresa}`;

  // Execute Resend dispatch
  const response = await resend.emails.send({
    from: `Mug Studio Briefing <${fromEmail}>`,
    to: studioEmail,
    replyTo: data.email, // Allows replying directly from Gmail
    subject: subject,
    html: html,
    text: text,
  });

  if (response.error) {
    console.error("Resend API failed:", response.error);
    throw new Error(response.error.message || "Failed to send briefing email.");
  }

  return response.data;
}
