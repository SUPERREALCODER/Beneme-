
import { GoogleGenAI, Type } from "@google/genai";
import { BrainwaveMetrics } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export async function getPersonalizedInsight(metrics: BrainwaveMetrics): Promise<string> {
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: `Based on current bio-metrics: Focus Score ${metrics.focusScore}/100 and Calm Score ${metrics.calmScore}/100. Provide a single, poetic, encouraging sentence of wellness advice. Keep it under 15 words. Avoid clinical jargon.`,
    config: {
      temperature: 0.7,
      topP: 0.95,
    }
  });
  return response.text || "Your inner garden is thriving in its own time.";
}

export async function getBioMusicRecommendation(metrics: BrainwaveMetrics): Promise<{ tempo: string, instrument: string, mood: string }> {
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: `Generate audio parameters for bio-adaptive ambient music. Bio-metrics: Focus ${metrics.focusScore}, Calm ${metrics.calmScore}.`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          tempo: { type: Type.STRING },
          instrument: { type: Type.STRING },
          mood: { type: Type.STRING }
        },
        required: ["tempo", "instrument", "mood"]
      }
    }
  });
  
  try {
    return JSON.parse(response.text);
  } catch (e) {
    return { tempo: "slow", instrument: "piano", mood: "serene" };
  }
}

export async function generatePathway(goal: string, metrics: BrainwaveMetrics): Promise<any> {
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: `Design a personalized stress relief pathway for the goal: "${goal}". Current user metrics: Focus ${metrics.focusScore}, Calm ${metrics.calmScore}. 
    Suggest a sequence of 3 steps. Each step must have: id, type (music, meditation, or breathing), title, duration (number in minutes), and intensity (Soft, Medium, or Deep).`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          name: { type: Type.STRING },
          steps: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                id: { type: Type.STRING },
                type: { type: Type.STRING },
                title: { type: Type.STRING },
                duration: { type: Type.NUMBER },
                intensity: { type: Type.STRING }
              },
              required: ["id", "type", "title", "duration", "intensity"]
            }
          }
        },
        required: ["name", "steps"]
      }
    }
  });
  
  try {
    return JSON.parse(response.text);
  } catch (e) {
    return null;
  }
}
