import { useState } from 'react';
import { motion } from "framer-motion";
import { useToast } from '@/hooks/use-toast';

const Contact = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Form validation
    if (!name || !email || !subject || !message) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive"
      });
      return;
    }
    
    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast({
        title: "Error",
        description: "Please enter a valid email address",
        variant: "destructive"
      });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // In a real application, this would be a call to your API
      // await apiRequest('POST', '/api/contact', { name, email, subject, message });
      
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      toast({
        title: "Success",
        description: "Your message has been sent! We'll get back to you soon."
      });
      
      // Clear form
      setName('');
      setEmail('');
      setSubject('');
      setMessage('');
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send message. Please try again later.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
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
      className="py-12 px-4 sm:px-6 lg:px-8 min-h-screen"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <div className="max-w-4xl mx-auto">
        <motion.h2 variants={itemVariants} className="text-3xl font-bold mb-8 text-center">Get in Touch</motion.h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <motion.div variants={itemVariants}>
            <h3 className="text-xl font-semibold mb-4">Contact Information</h3>
            <p className="text-gray-300 mb-6">Have questions or need assistance? Our team is here to help you navigate your study abroad journey.</p>
            
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center mr-3 flex-shrink-0">
                  <i className="fas fa-envelope text-primary"></i>
                </div>
                <div>
                  <p className="font-medium">Email Us</p>
                  <a href="mailto:support@skymark.ai" className="text-gray-400 hover:text-primary transition-colors">support@skymark.ai</a>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="w-10 h-10 rounded-full bg-secondary/20 flex items-center justify-center mr-3 flex-shrink-0">
                  <i className="fas fa-phone-alt text-secondary"></i>
                </div>
                <div>
                  <p className="font-medium">Call Us</p>
                  <p className="text-gray-400">+1 (800) 123-4567</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center mr-3 flex-shrink-0">
                  <i className="fas fa-map-marker-alt text-accent"></i>
                </div>
                <div>
                  <p className="font-medium">Office Location</p>
                  <p className="text-gray-400">123 Education Ave, Suite 456<br />San Francisco, CA 94105</p>
                </div>
              </div>
            </div>
            
            <div className="mt-8">
              <h4 className="font-medium mb-3">Follow Us</h4>
              <div className="flex space-x-4">
                <a href="#" className="w-10 h-10 rounded-full bg-dark-lighter flex items-center justify-center hover:bg-primary transition-colors">
                  <i className="fab fa-twitter text-white"></i>
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-dark-lighter flex items-center justify-center hover:bg-primary transition-colors">
                  <i className="fab fa-facebook-f text-white"></i>
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-dark-lighter flex items-center justify-center hover:bg-primary transition-colors">
                  <i className="fab fa-instagram text-white"></i>
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-dark-lighter flex items-center justify-center hover:bg-primary transition-colors">
                  <i className="fab fa-linkedin-in text-white"></i>
                </a>
              </div>
            </div>
          </motion.div>
          
          <motion.div variants={itemVariants}>
            <h3 className="text-xl font-semibold mb-4">Send Us a Message</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-1">Name</label>
                <input 
                  type="text" 
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-dark border border-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                  disabled={isSubmitting}
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-1">Email</label>
                <input 
                  type="email" 
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-dark border border-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                  disabled={isSubmitting}
                />
              </div>
              
              <div>
                <label htmlFor="subject" className="block text-sm font-medium mb-1">Subject</label>
                <input 
                  type="text" 
                  id="subject"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full bg-dark border border-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                  disabled={isSubmitting}
                />
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-1">Message</label>
                <textarea 
                  id="message"
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full bg-dark border border-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                  disabled={isSubmitting}
                ></textarea>
              </div>
              
              <button 
                type="submit" 
                className="w-full bg-primary hover:bg-primary/90 text-white py-2 rounded-lg transition-colors flex items-center justify-center"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <><i className="fas fa-spinner fa-spin mr-2"></i> Sending...</>
                ) : (
                  "Send Message"
                )}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};

export default Contact;
