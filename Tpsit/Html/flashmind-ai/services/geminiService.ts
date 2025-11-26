import { GoogleGenAI, Type, Schema } from "@google/genai";
import { Flashcard } from "../types";

// Schema definition for Flashcards
const flashcardSchema: Schema = {
  type: Type.ARRAY,
  items: {
    type: Type.OBJECT,
    properties: {
      question: {
        type: Type.STRING,
        description: "La domanda della flashcard. Deve essere chiara e concisa.",
      },
      answer: {
        type: Type.STRING,
        description: "La risposta corretta. Sintetica e precisa.",
      },
    },
    required: ["question", "answer"],
  },
};

export const generateFlashcards = async (text: string): Promise<Flashcard[]> => {
  if (!process.env.API_KEY) {
    throw new Error("API Key mancante");
  }

  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `Sei un esperto insegnante. Analizza il seguente testo estratto da un documento di studio.
      Crea una lista di 10-15 flashcard (Domanda e Risposta) che catturino i concetti fondamentali, le definizioni e i punti chiave.
      Usa la lingua Italiana.
      
      TESTO:
      ${text.substring(0, 30000)}`, // Limit input length to avoid huge context usage
      config: {
        responseMimeType: "application/json",
        responseSchema: flashcardSchema,
        temperature: 0.7,
      },
    });

    const rawJSON = response.text;
    if (!rawJSON) throw new Error("Nessuna risposta generata dall'AI");

    const parsedData = JSON.parse(rawJSON) as Omit<Flashcard, 'id'>[];
    
    // Add IDs locally
    return parsedData.map((card, index) => ({
      ...card,
      id: `card-${index}-${Date.now()}`
    }));

  } catch (error) {
    console.error("Gemini API Error:", error);
    throw new Error("Errore durante la generazione delle flashcard. Riprova più tardi.");
  }
};