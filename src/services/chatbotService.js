import OpenAI from "openai";
import dotenv from "dotenv";

dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function generateBotResponse(contact, userMessage) {
  try {
    const botName = contact.name || "Contacto";
    const fullName = `${contact.name || ""} ${contact.lastname || ""}`.trim();

    const prompt = `
    Sos ${fullName}, una persona real agregada como contacto en WhatsApp.
    Respondé los mensajes como si fueras esa persona, de forma simple y natural.
    No digas que sos una IA, ni menciones modelos.
    Mensaje del usuario: "${userMessage}"
    Tu respuesta (una sola oración o dos, estilo WhatsApp):
    `;

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: "Respondé como una persona normal." },
        { role: "user", content: prompt },
      ],
      max_tokens: 60,
      temperature: 0.8,
    });

    return completion.choices[0].message.content.trim();
  } catch (error) {
    console.error("Error IA:", error);
    return "Uy, se me colgó el celu 😅.";
  }
}
