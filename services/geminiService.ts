import { GoogleGenAI, Type } from "@google/genai";
import { AnalysisResult } from "../types";

export const analyzeThumbnails = async (
  imageA: string, // base64
  imageB: string, // base64
  titleA: string,
  titleB: string
): Promise<AnalysisResult> => {
  /**
   * TESTING OVERRIDE: 
   * For Netlify without a build step, hardcoding here is the most reliable way.
   */
  const HARDCODED_KEY = ""; // <--- PASTE YOUR KEY HERE FOR NETLIFY TESTING

  // Safe check for API Key
  const getApiKey = () => {
    if (HARDCODED_KEY) return HARDCODED_KEY;
    
    const manualKey = localStorage.getItem('manual_api_key');
    if (manualKey) return manualKey;

    // Browser shim check
    try {
      return (window as any).process?.env?.API_KEY;
    } catch (e) {
      return undefined;
    }
  };

  const apiKey = getApiKey();
  
  if (!apiKey) {
    throw new Error("Gemini API Key missing. Please hardcode it in services/geminiService.ts or use the Admin Dashboard Connection tab.");
  }

  const ai = new GoogleGenAI({ apiKey });
  
  const prompt = `
    Act as a world-class YouTube growth expert. Compare these two thumbnails (A and B) and their titles.
    
    Thumbnail A Title: "${titleA}"
    Thumbnail B Title: "${titleB}"
    
    Evaluate based on:
    1. Visual clarity and focal point.
    2. Emotional hook and curiosity gap.
    3. Readability of text (if any).
    4. Color theory and saturation for mobile viewers.
    5. Title-to-Thumbnail alignment.
    
    Tasks:
    - Provide a technical score out of 100 for each.
    - Provide a realistic estimated CTR percentage for each (as a number between 0 and 25). 
    - Identify the clear winner based on likely performance in a competitive feed.
    - Provide actionable improvements for both.
    - Include a brief section on simulated "eye-tracking" focus (e.g., where the eye lands first).
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: [
        {
          parts: [
            { text: prompt },
            { inlineData: { mimeType: "image/png", data: imageA.split(',')[1] } },
            { inlineData: { mimeType: "image/png", data: imageB.split(',')[1] } }
          ]
        }
      ],
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            scoreA: { type: Type.NUMBER },
            scoreB: { type: Type.NUMBER },
            ctrEstimateA: { type: Type.NUMBER, description: "Estimated CTR as a number between 0 and 25" },
            ctrEstimateB: { type: Type.NUMBER, description: "Estimated CTR as a number between 0 and 25" },
            winner: { type: Type.STRING, description: "Must be 'A', 'B', or 'DRAW'" },
            reasoning: { type: Type.STRING },
            improvementsA: { type: Type.ARRAY, items: { type: Type.STRING } },
            improvementsB: { type: Type.ARRAY, items: { type: Type.STRING } },
            eyeTrackingNotes: { type: Type.STRING }
          },
          required: ["scoreA", "scoreB", "ctrEstimateA", "ctrEstimateB", "winner", "reasoning", "improvementsA", "improvementsB", "eyeTrackingNotes"]
        }
      }
    });

    const result = JSON.parse(response.text || '{}');
    return result as AnalysisResult;
  } catch (error: any) {
    console.error("Analysis failed:", error);
    throw error;
  }
};