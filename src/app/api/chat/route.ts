import { NextRequest, NextResponse } from "next/server";
import Groq from "groq-sdk";
import { portfolioKnowledge } from "@/data/portfolioKnowledge";
import { getFallbackResponse } from "@/lib/fallbackResponse";

const SYSTEM_PROMPT = `You are a professional personal AI assistant and an enthusiastic advocate for Harish V. Your goal is to be **ultra-sharp, factual, and persuasive about Harish's talent**.

KNOWLEDGE BASE:
${JSON.stringify(portfolioKnowledge, null, 2)}

STRICT RULES:
- **Enthusiastic Advocate**: Frame Harish's skills and experience as strong talents. If asked about his performance or suitability for a role, provide a highly positive, encouraging response about his potential.
- **Conversational & Polite**: Handle greetings and thanks briefly and warmly. (e.g., "You're welcome! What else would you like to know about Harish's work?").
- **Ultra-Brevity**: Max **2 sentences** or **2-3 short bullets**. 
- **Factual Accuracy**: Do NOT invent metrics or achievement details. Be talented-looking but stick to the provided knowledge.
- **Invisible Data Source**: Never mention "the source," "context," or "data."
- **Direct & Seamless**: Answer immediately in the third person. Avoid intro filler.`;

export async function POST(req: NextRequest) {
  try {
    const { message } = await req.json();

    if (!message || typeof message !== "string") {
      return NextResponse.json({ error: "Invalid message" }, { status: 400 });
    }

    const apiKey = process.env.GROQ_API_KEY;

    if (!apiKey) {
      // No API key configured — use fallback silently
      return NextResponse.json({ reply: getFallbackResponse(message), source: "fallback" });
    }

    const groq = new Groq({ apiKey });

    const completion = await groq.chat.completions.create({
      model: "llama-3.1-8b-instant",
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        { role: "user", content: message },
      ],
      max_tokens: 512,
      temperature: 0.4,
    });

    const reply = completion.choices[0]?.message?.content?.trim();

    if (!reply) {
      return NextResponse.json({ reply: getFallbackResponse(message), source: "fallback" });
    }

    return NextResponse.json({ reply, source: "ai" });
  } catch (error) {
    console.error("[/api/chat] Error:", error);
    // Gracefully fall back to keyword engine
    try {
      const { message } = await req.clone().json();
      return NextResponse.json({ reply: getFallbackResponse(message), source: "fallback" });
    } catch {
      return NextResponse.json(
        { reply: "I'm having trouble connecting right now. Please try again shortly.", source: "error" },
        { status: 200 }
      );
    }
  }
}
