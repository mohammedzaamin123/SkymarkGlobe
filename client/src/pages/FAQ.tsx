import { useState } from "react";
import { motion } from "framer-motion";

interface FAQItem {
  question: string;
  answer: string;
}

const FAQ = () => {
  const faqs: FAQItem[] = [
    {
      question: "How does Skymark's AI chatbot work?",
      answer: "Skymark utilizes OpenAI's advanced GPT-4 model, trained specifically on study abroad information. The AI chatbot can answer questions about universities, application processes, scholarships, visa requirements, and more. It's continuously learning and improving based on user interactions."
    },
    {
      question: "Is the information provided by Skymark up-to-date?",
      answer: "We regularly update our AI's knowledge base with the latest information on university programs, admission requirements, visa policies, and scholarship opportunities. However, we always recommend verifying critical information directly with the respective institutions or official government websites."
    },
    {
      question: "Is Skymark free to use?",
      answer: "Skymark offers a free tier that provides access to basic information and limited chatbot interactions. For more personalized guidance, document reviews, and unlimited chat support, we offer affordable subscription plans designed specifically for students."
    },
    {
      question: "How accurate are the university recommendations?",
      answer: "Our AI analyzes multiple factors including your academic background, budget, career goals, and personal preferences to recommend suitable universities. The more information you provide, the more tailored the recommendations will be. Our system has been trained on successful student placements across thousands of institutions worldwide."
    },
    {
      question: "Can Skymark help with scholarship applications?",
      answer: "Yes! Skymark can help identify scholarships you're eligible for based on your profile, explain application requirements, and provide guidance on preparing compelling scholarship applications. Premium subscribers can also get feedback on their scholarship essays and application materials."
    },
    {
      question: "Does Skymark offer human advisor support?",
      answer: "While we primarily operate through our AI system, premium subscribers can schedule consultations with our education specialists for more complex situations that require human expertise. Our team includes former admissions officers and international education consultants."
    }
  ];

  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { duration: 0.4 }
    }
  };

  return (
    <motion.section 
      className="py-12 px-4 sm:px-6 lg:px-8 bg-dark-lighter min-h-screen"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <div className="max-w-4xl mx-auto">
        <motion.h2 variants={itemVariants} className="text-3xl font-bold mb-12 text-center">Frequently Asked Questions</motion.h2>
        
        <motion.div variants={containerVariants} className="space-y-6">
          {faqs.map((faq, index) => (
            <motion.div 
              key={index} 
              className="bg-dark rounded-lg overflow-hidden"
              variants={itemVariants}
            >
              <button 
                className="faq-toggle w-full flex justify-between items-center p-4 text-left font-medium focus:outline-none"
                onClick={() => toggleFAQ(index)}
              >
                <span>{faq.question}</span>
                <i className={`fas fa-chevron-down text-gray-400 transition-transform ${openIndex === index ? 'rotate-180' : ''}`}></i>
              </button>
              <div className={`p-4 pt-0 text-gray-300 ${openIndex === index ? 'block' : 'hidden'}`}>
                <p>{faq.answer}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
};

export default FAQ;
