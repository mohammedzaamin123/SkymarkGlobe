import { users, type User, type InsertUser, type Message, type InsertMessage, type Chat, type InsertChat, type ChatMessage, type InsertChatMessage } from "@shared/schema";

// modify the interface with any CRUD methods
// you might need

export interface IStorage {
  // User methods
  getUser(id: number): Promise<User | undefined>;
  getUserByUid(uid: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Message methods
  getMessage(id: number): Promise<Message | undefined>;
  getMessagesByUser(userId: string): Promise<Message[]>;
  createMessage(message: InsertMessage): Promise<Message>;
  
  // Chat methods
  getChat(id: number): Promise<Chat | undefined>;
  getChatsByUser(userId: string): Promise<Chat[]>;
  createChat(chat: InsertChat): Promise<Chat>;
  
  // Chat message methods
  getChatMessages(chatId: number): Promise<Message[]>;
  addMessageToChat(chatMessage: InsertChatMessage): Promise<ChatMessage>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private messages: Map<number, Message>;
  private chats: Map<number, Chat>;
  private chatMessages: Map<number, ChatMessage>;
  
  private userId: number;
  private messageId: number;
  private chatId: number;
  private chatMessageId: number;

  constructor() {
    this.users = new Map();
    this.messages = new Map();
    this.chats = new Map();
    this.chatMessages = new Map();
    
    this.userId = 1;
    this.messageId = 1;
    this.chatId = 1;
    this.chatMessageId = 1;
  }

  // User methods
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUid(uid: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(user => user.uid === uid);
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.userId++;
    const now = new Date();
    const user: User = { ...insertUser, id, createdAt: now };
    this.users.set(id, user);
    return user;
  }

  // Message methods
  async getMessage(id: number): Promise<Message | undefined> {
    return this.messages.get(id);
  }

  async getMessagesByUser(userId: string): Promise<Message[]> {
    return Array.from(this.messages.values())
      .filter(message => message.userId === userId)
      .sort((a, b) => a.timestamp.getTime() - b.timestamp.getTime());
  }

  async createMessage(insertMessage: InsertMessage): Promise<Message> {
    const id = this.messageId++;
    const now = new Date();
    const message: Message = { ...insertMessage, id, timestamp: now };
    this.messages.set(id, message);
    return message;
  }

  // Chat methods
  async getChat(id: number): Promise<Chat | undefined> {
    return this.chats.get(id);
  }

  async getChatsByUser(userId: string): Promise<Chat[]> {
    return Array.from(this.chats.values())
      .filter(chat => chat.userId === userId)
      .sort((a, b) => b.updatedAt.getTime() - a.updatedAt.getTime());
  }

  async createChat(insertChat: InsertChat): Promise<Chat> {
    const id = this.chatId++;
    const now = new Date();
    const chat: Chat = { ...insertChat, id, createdAt: now, updatedAt: now };
    this.chats.set(id, chat);
    return chat;
  }

  // Chat message methods
  async getChatMessages(chatId: number): Promise<Message[]> {
    const chatMessageEntries = Array.from(this.chatMessages.values())
      .filter(cm => cm.chatId === chatId)
      .sort((a, b) => a.order - b.order);

    const messages: Message[] = [];
    for (const entry of chatMessageEntries) {
      const message = await this.getMessage(entry.messageId);
      if (message) messages.push(message);
    }

    return messages;
  }

  async addMessageToChat(insertChatMessage: InsertChatMessage): Promise<ChatMessage> {
    const id = this.chatMessageId++;
    const chatMessage: ChatMessage = { ...insertChatMessage, id };
    this.chatMessages.set(id, chatMessage);
    
    // Update chat updatedAt timestamp
    const chat = await this.getChat(insertChatMessage.chatId);
    if (chat) {
      chat.updatedAt = new Date();
      this.chats.set(chat.id, chat);
    }
    
    return chatMessage;
  }
}

export const storage = new MemStorage();
