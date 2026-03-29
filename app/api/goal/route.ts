import GeminiAI from "@/utils/database/aiAgent/gemini/gemini";
import { NextResponse } from "next/server";
import { z } from "zod";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { prompt } = body;

    if (!prompt) {
      return NextResponse.json(
        { error: "Prompt is required" },
        { status: 400 },
      );
    }

    const response = await GeminiAI.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `
              Supondo que você é um TECH LEAD.

              abaixo irei enviar um texto onde eu cito um objetivo/meta, nível e em quanto tempo tenho para alcançar essa meta, analise o texto e crie um plano de estudos baseado em semanas e retorne um json comforme o exemplo abaixo:

              OBJETO ESPERADO:
                {
                  title: string, // objetivo
                  level: Iniciante | Intermediário | Avançado,
                  weeks: number,
                  studyPlan:[
                    {
                      week:1,
                      tasks: [
                        {
                          title:"estudar java",
                          done: boolean
                        },
                        {
                          title:"estudar kotlin",
                          done: boolean
                        }
                      ]
                    }
                  ]
                }
              

              OBS: Não invente tópicos e informe apenas os relevantes, RETORNE APENAS O JSON VÁLIDO (parseável com JSON.parse), SEM NENHUM TEXTO EXPLICANDO O PLANO DE ESTUDOS.

              TEXTO:

              ${prompt}
              `,
    });
    const Goal = z.object({
      title: z.string(),
      level: z.enum(["Iniciante", "Intermediário", "Avançado"]),
      weeks: z.number(),
      studyPlan: z.array(
        z.object({
          week: z.number(),
          tasks: z.array(
            z.object({
              title: z.string(),
              done: z.boolean(),
            }),
          ),
        }),
      ),
    });

    const parsed = Goal.safeParse(JSON.parse(response.text!));
    if (!parsed.success) {
      console.error("Failed to parse response:", parsed.error);
      return NextResponse.json(
        { error: "Failed to generate study plan" },
        { status: 500 },
      );
    }
    console.log("Tipos conferem");

    return NextResponse.json(parsed.data);
  } catch (e) {
    console.error("Failed to parse request body:", e);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
