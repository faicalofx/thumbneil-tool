
// Fix: Import only the correct GoogleGenAI and Type from @google/genai
import { GoogleGenAI, Type } from "@google/genai";
import { AnalysisResult } from "../types";

export const analyzeThumbnails = async (
  imageA: string, // base64
  imageB: string, // base64
  titleA: string,
  titleB: string
): Promise<AnalysisResult> => {
  // Fix: The API key must be obtained exclusively from the environment variable process.env.API_KEY.
  // Fix: Use the named parameter format for initializing the GoogleGenAI instance.
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
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
    // Fix: Use ai.models.generateContent directly with model name and content.
    // Fix: Select gemini-3-flash-preview for general content analysis tasks.
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: {
        parts: [
          { text: prompt },
          { inlineData: { mimeType: "image/png", data: imageA.split(',')[1] } },
          { inlineData: { mimeType: "image/png", data: imageB.split(',')[1] } }
        ]
      },
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

    // Fix: Access response text using the .text property (not a method).
    const jsonStr = response.text?.trim() || '{}';
    return JSON.parse(jsonStr) as AnalysisResult;
  } catch (error: any) {
    console.error("Analysis failed:", error);
    throw error;
  }
};
