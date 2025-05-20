import OpenAI from "openai";

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || "sk-demo", // Will be replaced with actual key in env
});

// System prompt for the AI assistant
const SYSTEM_PROMPT = `
You are GlobeMate, a friendly and knowledgeable study abroad assistant. You help students navigate 
the complexities of international education, providing accurate and helpful information on:

1. University selection and application processes
2. Visa requirements and application procedures
3. Scholarship opportunities and financial planning
4. Housing and accommodation options
5. Cultural adaptation and preparation

Keep your responses friendly, concise, and informative. When you don't know something specific, 
acknowledge this and suggest reliable sources where the student might find more information.

Always maintain a supportive tone and encourage students to explore their options. Remember that
studying abroad is a life-changing experience, so express enthusiasm about the opportunities it presents.
`;

/**
 * Generates a chat response using the OpenAI API
 * @param message - The user's message
 * @returns The AI assistant's response
 */
export async function generateChatResponse(message: string): Promise<string> {
  try {
    // the newest OpenAI model is "gpt-4o" which was released May 13, 2024. do not change this unless explicitly requested by the user
    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        { role: "user", content: message }
      ],
      temperature: 0.7,
      max_tokens: 500
    });

    return response.choices[0].message.content || "I'm sorry, I couldn't generate a response. Please try again.";
  } catch (error) {
    console.error("Error generating chat response:", error);
    throw new Error("Failed to generate response from AI assistant");
  }
}
