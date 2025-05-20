import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { apiRequest } from "@/lib/queryClient";
import { useMutation } from "@tanstack/react-query";
import { useAuthStore } from "../store/authStore";
import { useChatStore } from "../store/chatStore";
import TypingIndicator from "./TypingIndicator";
import { useToast } from "@/hooks/use-toast";

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: number;
}

const ChatInterface = () => {
  const [inputMessage, setInputMessage] = useState("");
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const { user } = useAuthStore();
  const { messages, addMessage } = useChatStore();
  const { toast } = useToast();

  const scrollToBottom = () => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  };

  // Scroll to bottom when messages change
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessageMutation = useMutation({
    mutationFn: async (message: string) => {
      const response = await apiRequest('POST', '/api/ask', { message, userId: user?.uid });
      return response.json();
    },
    onSuccess: (data) => {
      addMessage({
        id: Date.now().toString(),
        role: 'assistant',
        content: data.reply,
        timestamp: Date.now()
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive"
      });
      console.error("Error sending message:", error);
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!inputMessage.trim()) return;
    
    // Add user message to chat
    const userMessage = {
      id: Date.now().toString(),
      role: 'user' as const,
      content: inputMessage,
      timestamp: Date.now()
    };
    
    addMessage(userMessage);
    
    // Clear input
    setInputMessage("");
    
    // Send message to API
    sendMessageMutation.mutate(inputMessage);
  };

  const messageVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
    exit: { opacity: 0, transition: { duration: 0.2 } }
  };

  return (
    <div className="flex flex-col h-full">
      <div className="bg-dark-lighter p-4 shadow-md">
        <h1 className="text-2xl font-bold text-center">Chat with GlobeMate</h1>
      </div>
      
      <div 
        className="flex-grow p-4 overflow-y-auto" 
        id="chat-messages"
        ref={chatContainerRef}
      >
        <AnimatePresence>
          {messages.length === 0 ? (
            <motion.div
              className="flex mb-4"
              variants={messageVariants}
              initial="hidden"
              animate="visible"
            >
              <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center mr-2 flex-shrink-0">
                <i className="fas fa-robot text-white text-sm"></i>
              </div>
              <div className="chat-bubble-ai bg-dark-lighter p-3 max-w-[80%] rounded-lg rounded-bl-sm">
                <p>Hi! I'm GlobeMate, your AI guide to studying abroad 🌍✈️ — where would you like to study?</p>
              </div>
            </motion.div>
          ) : (
            messages.map((message) => (
              <motion.div 
                key={message.id}
                className={`flex mb-4 ${message.role === 'user' ? 'justify-end' : ''}`}
                variants={messageVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
              >
                {message.role === 'assistant' && (
                  <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center mr-2 flex-shrink-0">
                    <i className="fas fa-robot text-white text-sm"></i>
                  </div>
                )}
                
                <div 
                  className={`p-3 max-w-[80%] break-words ${
                    message.role === 'user' 
                      ? 'chat-bubble-user bg-primary/80 rounded-lg rounded-br-sm' 
                      : 'chat-bubble-ai bg-dark-lighter rounded-lg rounded-bl-sm'
                  }`}
                >
                  <p className="whitespace-pre-wrap">{message.content}</p>
                </div>
                
                {message.role === 'user' && (
                  <div className="w-8 h-8 rounded-full bg-gray-600 flex items-center justify-center ml-2 flex-shrink-0">
                    <i className="fas fa-user text-white text-sm"></i>
                  </div>
                )}
              </motion.div>
            ))
          )}
        </AnimatePresence>
        
        {/* Typing Indicator */}
        {sendMessageMutation.isPending && (
          <div className="flex mb-4">
            <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center mr-2 flex-shrink-0">
              <i className="fas fa-robot text-white text-sm"></i>
            </div>
            <div className="chat-bubble-ai bg-dark-lighter p-3 rounded-lg rounded-bl-sm">
              <TypingIndicator />
            </div>
          </div>
        )}
      </div>
      
      <div className="p-4 bg-dark-lighter">
        <form onSubmit={handleSubmit} className="flex">
          <input 
            type="text" 
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            placeholder="Ask me anything about studying abroad..."
            className="flex-grow bg-dark border border-gray-700 rounded-l-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
            disabled={sendMessageMutation.isPending}
          />
          <button 
            type="submit" 
            className="bg-primary hover:bg-primary/90 text-white px-4 rounded-r-lg transition-colors"
            disabled={sendMessageMutation.isPending}
          >
            <i className="fas fa-paper-plane"></i>
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChatInterface;
