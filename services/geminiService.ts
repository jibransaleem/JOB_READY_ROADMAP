
import { GoogleGenAI, Type } from "@google/genai";

export class GeminiService {
  private ai: GoogleGenAI;

  constructor() {
    this.ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
  }

  async explainConcept(concept: string) {
    try {
      const response = await this.ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `Explain the AI/ML concept "${concept}" in the context of being a Senior AI Engineer in 2026. Focus on practical production use cases, performance implications, and current best practices. Keep it concise but deeply technical. Use markdown.`,
        config: {
          thinkingConfig: { thinkingBudget: 0 }
        }
      });
      return response.text || "I couldn't generate an explanation for that.";
    } catch (error) {
      console.error("Gemini Error:", error);
      return "An error occurred while fetching the explanation.";
    }
  }

  async suggestStudyPlan(moduleTitle: string, skills: string[]) {
    try {
      const response = await this.ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `Create a 4-week intensive study plan for the module "${moduleTitle}" which covers: ${skills.join(', ')}. Include specific libraries to use, sample exercises, and one advanced project idea. Return as a clean markdown guide.`,
        config: {
          responseMimeType: "text/plain"
        }
      });
      return response.text || "Study plan generation failed.";
    } catch (error) {
      console.error("Gemini Error:", error);
      return "Failed to generate study plan.";
    }
  }
}

export const gemini = new GeminiService();
