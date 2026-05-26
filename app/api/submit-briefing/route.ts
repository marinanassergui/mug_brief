import { NextRequest, NextResponse } from "next/server";
import { briefingSchema } from "@/lib/schemas/briefingSchema";
import { sendBriefingEmail } from "@/lib/email/sendEmail";

/**
 * API route to receive, validate, and send the briefing form responses.
 * Endpoint: POST /api/submit-briefing
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // 1. Validate request body against full Zod schema
    const validation = briefingSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(
        {
          error: "Dados do formulário inválidos.",
          details: validation.error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    // 2. Trigger email dispatch via Resend
    const emailResult = await sendBriefingEmail(validation.data);

    // 3. Return Success
    return NextResponse.json(
      {
        success: true,
        message: "Briefing enviado com sucesso!",
        data: emailResult,
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("API error submitting briefing:", error);
    
    // Custom premium fallback error message requested by user
    return NextResponse.json(
      {
        error: "Algo deu errado. Tenta de novo ou manda direto pra hellomugstudio@gmail.com",
        details: error.message || "Erro desconhecido",
      },
      { status: 500 }
    );
  }
}
