import { motion } from "framer-motion";
import ChatInterface from "@/components/ChatInterface";

const Chat = () => {
  return (
    <motion.section 
      className="min-h-[calc(100vh-64px)] flex flex-col"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <ChatInterface />
    </motion.section>
  );
};

export default Chat;
