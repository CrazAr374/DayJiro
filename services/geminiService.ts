
import { RoadmapDay } from "../types";

export const generateRoadmap = async (
  apiKey: string,
  skill: string,
  duration: number,
  role?: string
): Promise<RoadmapDay[]> => {
  // Lazy-load the @google/genai package to avoid bundling Node-only code
  try {
    const genai = await import('@google/genai');
    const { GoogleGenAI, Type } = genai as any;

    const ai = new GoogleGenAI({ apiKey });

    const prompt = `
    Generate a highly actionable, daily learning roadmap for the skill: "${skill}".
    Target Goal/Role: "${role || 'General Mastery'}".
    Duration: ${duration} days.
    
    Each day must have a catchy title and exactly 3 to 5 clear, actionable tasks.
    Avoid vague descriptions. Be specific.
  `;

    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            days: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  day: { type: Type.NUMBER },
                  title: { type: Type.STRING },
                  tasks: {
                    type: Type.ARRAY,
                    items: { type: Type.STRING }
                  }
                },
                required: ["day", "title", "tasks"]
              }
            }
          },
          required: ["days"]
        }
      }
    });

    const rawJson = JSON.parse(response.text);

    return rawJson.days.map((d: any) => ({
      day: d.day,
      title: d.title,
      tasks: d.tasks.map((t: string, idx: number) => ({
        id: `day-${d.day}-task-${idx}`,
        text: t,
        completed: false
      }))
    }));
  } catch (err) {
    console.error('generateRoadmap error', err);
    // Return a safe fallback (empty roadmap days) to avoid crashing the UI
    return Array.from({ length: duration }, (_, i) => ({
      day: i + 1,
      title: `Day ${i + 1}`,
      tasks: [{ id: `day-${i + 1}-task-0`, text: 'Error generating task. Retry later.', completed: false }]
    }));
  }
};
