
import { GoogleGenAI, Type } from "@google/genai";
import { AnalysisResult } from "../types";

export const analyzeThumbnails = async (
  imageA: string, // base64
  imageB: string, // base64
  titleA: string,
  titleB: string
): Promise<AnalysisResult> => {
  // Always initialize right before the call to pick up the latest API key from the environment/dialog
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
  
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
    
    // Check for "Requested entity was not found" error to help user debug key selection
    if (error?.message?.includes("Requested entity was not found")) {
      console.warn("API Key might be invalid or missing billing. Consider re-linking in Admin.");
    }
    
    throw error;
  }
};
