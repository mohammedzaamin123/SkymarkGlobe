import { pgTable, text, serial, integer, boolean, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// User model
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  uid: text("uid").notNull().unique(), // Firebase UID
  username: text("username").notNull(),
  email: text("email").notNull(),
  createdAt: timestamp("created_at").defaultNow()
});

// Message model
export const messages = pgTable("messages", {
  id: serial("id").primaryKey(),
  userId: text("user_id").notNull(), // Firebase UID
  content: text("content").notNull(),
  role: text("role").notNull(), // 'user' or 'assistant'
  timestamp: timestamp("timestamp").defaultNow()
});

// Chat model - for organizing messages
export const chats = pgTable("chats", {
  id: serial("id").primaryKey(),
  userId: text("user_id").notNull(),
  title: text("title").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow()
});

// Chat message association
export const chatMessages = pgTable("chat_messages", {
  id: serial("id").primaryKey(),
  chatId: integer("chat_id").notNull(),
  messageId: integer("message_id").notNull(),
  order: integer("order").notNull()
});

// Insert schemas
export const insertUserSchema = createInsertSchema(users).pick({
  uid: true,
  username: true,
  email: true
});

export const insertMessageSchema = createInsertSchema(messages).pick({
  userId: true,
  content: true,
  role: true
});

export const insertChatSchema = createInsertSchema(chats).pick({
  userId: true,
  title: true
});

export const insertChatMessageSchema = createInsertSchema(chatMessages).pick({
  chatId: true,
  messageId: true,
  order: true
});

// Types
export type InsertUser = z.infer<typeof insertUserSchema>;
export type InsertMessage = z.infer<typeof insertMessageSchema>;
export type InsertChat = z.infer<typeof insertChatSchema>;
export type InsertChatMessage = z.infer<typeof insertChatMessageSchema>;

export type User = typeof users.$inferSelect;
export type Message = typeof messages.$inferSelect;
export type Chat = typeof chats.$inferSelect;
export type ChatMessage = typeof chatMessages.$inferSelect;

// API request/response schemas
export const askRequestSchema = z.object({
  message: z.string().min(1, "Message is required"),
  userId: z.string().optional()
});

export const askResponseSchema = z.object({
  reply: z.string()
});

export type AskRequest = z.infer<typeof askRequestSchema>;
export type AskResponse = z.infer<typeof askResponseSchema>;
