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
      const response = await apiRequest('POST', '/api/ask', { message, userId: user?._id });
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
      <div className="bg-[#1a1a1a] p-4 shadow-md border-b border-gray-800">
        <h1 className="text-2xl font-bold mb-1 text-white flex items-center justify-center">
          <span className="bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">Chat with SkyMate</span>
          <i className="fas fa-robot ml-2 text-primary/80 text-xl"></i>
        </h1>
        <p className="text-center text-gray-400 text-sm">Your personal AI assistant for study abroad guidance</p>
      </div>
      
      <div 
        className="flex-grow p-4 overflow-y-auto bg-[#161616]"
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
              <div className="chat-bubble-ai bg-white/10 backdrop-blur-sm p-4 max-w-[80%] rounded-2xl rounded-bl-sm border border-gray-700/50 shadow-lg">
                <p>Hi! I'm SkyMate, your AI guide to studying abroad 🌍✈️ I can help you with university recommendations, visa requirements, scholarships, and more. Where are you thinking of studying?</p>
                <div className="text-xs text-gray-400 mt-1 text-right">
                  {new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                </div>
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
                  className={`p-4 max-w-[80%] break-words shadow-lg ${
                    message.role === 'user' 
                      ? 'chat-bubble-user bg-primary rounded-2xl rounded-br-sm text-white' 
                      : 'chat-bubble-ai bg-[#2a2a2a] rounded-2xl rounded-bl-sm border border-gray-700'
                  }`}
                >
                  <p className="whitespace-pre-wrap">{message.content}</p>
                  <div className="text-xs text-gray-400 mt-1 text-right">
                    {new Date(message.timestamp).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                  </div>
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
      
      <div className="p-4 bg-[#1a1a1a] border-t border-gray-800">
        <form onSubmit={handleSubmit} className="flex relative">
          <input 
            type="text" 
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            placeholder="Ask me anything about studying abroad..."
            className="flex-grow bg-[#2a2a2a] border border-gray-700 rounded-full px-6 py-3 pr-14 focus:outline-none focus:ring-2 focus:ring-primary shadow-lg text-gray-200"
            disabled={sendMessageMutation.isPending}
          />
          <button 
            type="submit" 
            className={`absolute right-1 top-1 h-10 w-10 flex items-center justify-center rounded-full transition-colors ${sendMessageMutation.isPending ? 'bg-gray-600' : 'bg-primary hover:bg-primary/80'} text-white`}
            disabled={sendMessageMutation.isPending}
          >
            {sendMessageMutation.isPending ? (
              <span className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full"></span>
            ) : (
              <i className="fas fa-paper-plane"></i>
            )}
          </button>
        </form>
        <div className="text-center text-xs text-gray-500 mt-2">
          Powered by AI • Ask about universities, visa requirements, scholarships, and more
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;
