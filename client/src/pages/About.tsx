import { motion } from "framer-motion";

const About = () => {
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
      <div className="max-w-7xl mx-auto">
        <motion.h2 variants={itemVariants} className="text-3xl font-bold mb-8">About Skymark</motion.h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <motion.div variants={itemVariants}>
            <h3 className="text-2xl font-semibold mb-4">Our Mission</h3>
            <p className="text-gray-300 mb-6">Skymark was founded with a simple mission: to democratize access to quality international education information for students worldwide.</p>
            <p className="text-gray-300 mb-6">We believe that every student deserves the opportunity to explore global education opportunities, regardless of their background or resources.</p>
            <h3 className="text-2xl font-semibold mb-4">How We Help</h3>
            <ul className="space-y-3 text-gray-300">
              <li className="flex items-start">
                <i className="fas fa-check-circle text-primary mt-1 mr-2"></i>
                <span>Personalized university recommendations based on your profile</span>
              </li>
              <li className="flex items-start">
                <i className="fas fa-check-circle text-primary mt-1 mr-2"></i>
                <span>Step-by-step guidance through application processes</span>
              </li>
              <li className="flex items-start">
                <i className="fas fa-check-circle text-primary mt-1 mr-2"></i>
                <span>Scholarship and funding opportunities tailored to you</span>
              </li>
              <li className="flex items-start">
                <i className="fas fa-check-circle text-primary mt-1 mr-2"></i>
                <span>Visa application assistance and documentation requirements</span>
              </li>
              <li className="flex items-start">
                <i className="fas fa-check-circle text-primary mt-1 mr-2"></i>
                <span>Cultural adaptation and pre-departure preparation</span>
              </li>
            </ul>
          </motion.div>
          
          <motion.div variants={itemVariants}>
            <img 
              src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600" 
              alt="Diverse international students studying together"
              className="rounded-xl shadow-lg w-full h-auto"
            />
          </motion.div>
        </div>
        
        <motion.div variants={itemVariants} className="mt-20">
          <h3 className="text-2xl font-semibold mb-8 text-center">Our Team</h3>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <motion.div variants={itemVariants} className="text-center">
              <div className="w-24 h-24 rounded-full bg-primary/20 mx-auto flex items-center justify-center mb-4">
                <span className="text-xl font-bold text-primary">JD</span>
              </div>
              <h4 className="font-medium">Jamie Davis</h4>
              <p className="text-sm text-gray-400">Founder & CEO</p>
            </motion.div>
            
            <motion.div variants={itemVariants} className="text-center">
              <div className="w-24 h-24 rounded-full bg-secondary/20 mx-auto flex items-center justify-center mb-4">
                <span className="text-xl font-bold text-secondary">RK</span>
              </div>
              <h4 className="font-medium">Raj Kumar</h4>
              <p className="text-sm text-gray-400">Education Specialist</p>
            </motion.div>
            
            <motion.div variants={itemVariants} className="text-center">
              <div className="w-24 h-24 rounded-full bg-accent/20 mx-auto flex items-center justify-center mb-4">
                <span className="text-xl font-bold text-accent">EL</span>
              </div>
              <h4 className="font-medium">Elena Lopez</h4>
              <p className="text-sm text-gray-400">AI Developer</p>
            </motion.div>
            
            <motion.div variants={itemVariants} className="text-center">
              <div className="w-24 h-24 rounded-full bg-primary/20 mx-auto flex items-center justify-center mb-4">
                <span className="text-xl font-bold text-primary">TW</span>
              </div>
              <h4 className="font-medium">Tina Wang</h4>
              <p className="text-sm text-gray-400">Global Partnerships</p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default About;
