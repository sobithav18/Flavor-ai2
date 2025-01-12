import { model } from "@/lib/groq";
import { recipeSchema } from "@/lib/schemas";
import { generateObject } from "ai";
import { NextResponse } from "next/server";

/**
 * API Route: POST /api/generate-recipe
 * Generates a recipe based on user preferences using Groq AI
 * 
 * Request body should include:
 * - cuisine (optional): Preferred cuisine type
 * - dishType (optional): Type of dish
 * - spiceLevel (optional): Desired spice level
 * - dietaryRestrictions (optional): Array of dietary restrictions
 * - userPrompt: User's specific requirements/preferences
 * 
 * Returns a structured recipe object following the recipeSchema
 */
export async function POST(req) {
  try {
    const body = await req.json();

    // Default values if not provided in request
    const cuisine = "Indian";
    const dishType = "Curry";
    const spiceLevel = "Mild";

    // Construct AI prompt with user preferences
    const prompt = `Generate a ${body.cuisine ?? cuisine} recipe for ${
      body.dishType ?? dishType
    } (with ${body.spiceLevel ?? spiceLevel} spice level if applicable).
      
      ${
        body.dietaryRestrictions
          ? `Dietary Restrictions - ${body.dietaryRestrictions.join(", ")}`
          : ""
      }
      
      ${body.userPrompt}
      
      Give a simple name of 2-3 words to the recipe.`;

    // Generate recipe using AI model
    const result = await generateObject({
      model,
      schema: recipeSchema,
      prompt,
    });

    return NextResponse.json(result.object);
  } catch (error) {
    console.error("Error generating recipe:", error);
    return NextResponse.json({ error: "Failed to generate recipe." });
  }
}
