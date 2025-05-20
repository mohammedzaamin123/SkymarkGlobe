import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { generateChatResponse } from "./openai";
import { askRequestSchema, askResponseSchema } from "@shared/schema";
import { ZodError } from "zod";
import { fromZodError } from "zod-validation-error";

export async function registerRoutes(app: Express): Promise<Server> {
  // Chat API endpoint
  app.post("/api/ask", async (req, res) => {
    try {
      // Validate request body
      const parsedBody = askRequestSchema.parse(req.body);
      const { message, userId } = parsedBody;

      // Generate AI response
      const reply = await generateChatResponse(message);

      // Store message in DB if user is authenticated
      if (userId) {
        await storage.createMessage({
          userId,
          content: message,
          role: "user"
        });

        await storage.createMessage({
          userId,
          content: reply,
          role: "assistant"
        });
      }

      // Return response
      res.json(askResponseSchema.parse({ reply }));
    } catch (error) {
      console.error("Error in /api/ask:", error);
      
      if (error instanceof ZodError) {
        const validationError = fromZodError(error);
        return res.status(400).json({ message: validationError.message });
      }
      
      res.status(500).json({ message: "Failed to process request" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
