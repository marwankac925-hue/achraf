
import { GoogleGenAI, Type } from "@google/genai";
import { RelationshipTip } from '../types';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });

export const getRelationshipTips = async (): Promise<RelationshipTip[]> => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: "Generate 5 actionable and romantic tips for a couple to improve their relationship. Your response should be nothing but a JSON array of objects. Each object must have a 'title' (string) and a 'description' (string).",
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              title: { type: Type.STRING },
              description: { type: Type.STRING },
            },
            required: ["title", "description"],
          },
        },
      },
    });

    const jsonText = response.text.trim();
    const tips = JSON.parse(jsonText);
    return tips;

  } catch (error) {
    console.error("Error fetching relationship tips:", error);
    throw new Error("Failed to generate tips. Please try again.");
  }
};
