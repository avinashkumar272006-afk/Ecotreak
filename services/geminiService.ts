import { GoogleGenAI, Type, Schema } from "@google/genai";
import { TripItinerary, ActivityCategory } from "../types";

const apiKey = process.env.API_KEY || '';

const ai = new GoogleGenAI({ apiKey });

const itinerarySchema: Schema = {
  type: Type.OBJECT,
  properties: {
    city: { type: Type.STRING, description: "The name of the city" },
    summary: { type: Type.STRING, description: "A inspiring summary of the sustainable trip" },
    sustainabilityScore: { type: Type.INTEGER, description: "A score from 80-100 representing how eco-friendly this trip is" },
    carbonSavedKg: { type: Type.NUMBER, description: "Estimated kg of CO2 saved compared to a standard tourist trip" },
    days: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          dayNumber: { type: Type.INTEGER },
          theme: { type: Type.STRING, description: "Theme for the day, e.g., 'Artisan Roots' or 'Green Spaces'" },
          activities: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                time: { type: Type.STRING, description: "e.g., '09:00 AM'" },
                title: { type: Type.STRING },
                description: { type: Type.STRING },
                category: {
                  type: Type.STRING,
                  enum: [
                    ActivityCategory.Transport,
                    ActivityCategory.Workshop,
                    ActivityCategory.Food,
                    ActivityCategory.Accommodation,
                    ActivityCategory.Nature,
                    ActivityCategory.Culture
                  ]
                },
                sustainabilityTip: { type: Type.STRING, description: "Why this is sustainable" },
                locationName: { type: Type.STRING, description: "The specific name of the place for searching" }
              },
              required: ["time", "title", "description", "category", "sustainabilityTip", "locationName"]
            }
          }
        },
        required: ["dayNumber", "theme", "activities"]
      }
    }
  },
  required: ["city", "summary", "days", "sustainabilityScore", "carbonSavedKg"]
};

export const generateItinerary = async (city: string): Promise<TripItinerary> => {
  const model = "gemini-2.5-flash";
  
  const prompt = `Create a detailed 3-day sustainable travel itinerary for ${city}.
  
  Constraints:
  1. Focus strictly on carbon-neutral transportation (walking, biking, electric public transit).
  2. Include visits to local artisanal workshops (pottery, weaving, cooking, etc.) to support the local economy.
  3. Select certified eco-friendly accommodations and farm-to-table restaurants.
  4. The tone should be inspiring, positive, and educational.
  5. Ensure the places mentioned are real and specific to ${city}.
  `;

  try {
    const response = await ai.models.generateContent({
      model,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: itinerarySchema,
        systemInstruction: "You are a world-class sustainable travel expert. You value low-impact tourism, community support, and authentic local experiences.",
      }
    });

    const text = response.text;
    if (!text) throw new Error("No response from AI");
    
    return JSON.parse(text) as TripItinerary;
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw error;
  }
};
