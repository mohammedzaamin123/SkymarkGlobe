import { Link } from "wouter";
import { motion } from "framer-motion";

const Home = () => {
  return (
    <section className="min-h-screen overflow-x-hidden">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-dark-lighter">
        {/* Hero Background with Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-dark to-transparent opacity-90"></div>
        <div 
          className="absolute inset-0 bg-cover bg-center" 
          style={{ backgroundImage: `url('https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1920&h=1080')`, filter: 'brightness(0.4)' }}
        ></div>
        
        <div className="relative max-w-7xl mx-auto px-4 py-24 sm:py-32 sm:px-6 lg:px-8 flex flex-col items-start justify-center min-h-[70vh]">
          <motion.h1 
            className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Your AI Guide to <span className="text-primary">Studying Abroad</span>
          </motion.h1>
          <motion.p 
            className="text-xl md:text-2xl text-gray-300 mb-8 max-w-2xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Skymark helps you navigate your international education journey with personalized guidance from our AI assistant.
          </motion.p>
          <motion.div 
            className="flex flex-wrap gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Link href="/chat">
              <a className="px-6 py-3 bg-primary hover:bg-primary/90 text-white font-medium rounded-lg shadow-lg transition-colors">
                Start Chatting
              </a>
            </Link>
            <Link href="/about">
              <a className="px-6 py-3 bg-transparent border-2 border-white hover:bg-white/10 text-white font-medium rounded-lg transition-colors">
                Learn More
              </a>
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <motion.h2 
          className="text-3xl font-bold text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          How Skymark Helps You
        </motion.h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <motion.div 
            className="bg-dark-lighter p-6 rounded-xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center mb-4">
              <i className="fas fa-university text-primary text-xl"></i>
            </div>
            <h3 className="text-xl font-semibold mb-2">University Selection</h3>
            <p className="text-gray-400">Get personalized university recommendations based on your interests, budget, and academic background.</p>
          </motion.div>
          
          <motion.div 
            className="bg-dark-lighter p-6 rounded-xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="w-12 h-12 bg-secondary/20 rounded-lg flex items-center justify-center mb-4">
              <i className="fas fa-passport text-secondary text-xl"></i>
            </div>
            <h3 className="text-xl font-semibold mb-2">Visa Guidance</h3>
            <p className="text-gray-400">Navigate complex visa requirements with step-by-step assistance for your destination country.</p>
          </motion.div>
          
          <motion.div 
            className="bg-dark-lighter p-6 rounded-xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <div className="w-12 h-12 bg-accent/20 rounded-lg flex items-center justify-center mb-4">
              <i className="fas fa-dollar-sign text-accent text-xl"></i>
            </div>
            <h3 className="text-xl font-semibold mb-2">Financial Planning</h3>
            <p className="text-gray-400">Explore scholarships, estimate living costs, and plan your study abroad budget effectively.</p>
          </motion.div>
        </div>
      </div>

      {/* Testimonials */}
      <div className="bg-dark-lighter py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2 
            className="text-3xl font-bold text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            What Students Say
          </motion.h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <motion.div 
              className="bg-dark p-6 rounded-xl"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <div className="flex items-center mb-4">
                <div className="text-yellow-400 flex">
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                </div>
              </div>
              <p className="text-gray-300 mb-4">"Skymark helped me find the perfect university in Germany. The visa guidance was spot on and saved me so much time!"</p>
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-primary/30 flex items-center justify-center">
                  <span className="text-sm font-semibold">AK</span>
                </div>
                <div className="ml-3">
                  <p className="font-medium">Aisha K.</p>
                  <p className="text-sm text-gray-400">Student, Berlin</p>
                </div>
              </div>
            </motion.div>
            
            <motion.div 
              className="bg-dark p-6 rounded-xl"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="flex items-center mb-4">
                <div className="text-yellow-400 flex">
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star-half-alt"></i>
                </div>
              </div>
              <p className="text-gray-300 mb-4">"The scholarship recommendations were a game-changer. I'm now studying in Canada with 50% of my tuition covered!"</p>
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-secondary/30 flex items-center justify-center">
                  <span className="text-sm font-semibold">DT</span>
                </div>
                <div className="ml-3">
                  <p className="font-medium">David T.</p>
                  <p className="text-sm text-gray-400">Student, Toronto</p>
                </div>
              </div>
            </motion.div>
            
            <motion.div 
              className="bg-dark p-6 rounded-xl"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <div className="flex items-center mb-4">
                <div className="text-yellow-400 flex">
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                </div>
              </div>
              <p className="text-gray-300 mb-4">"As a first-gen student, the application process was overwhelming. Skymark made it easy to understand each step."</p>
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-accent/30 flex items-center justify-center">
                  <span className="text-sm font-semibold">MP</span>
                </div>
                <div className="ml-3">
                  <p className="font-medium">Maria P.</p>
                  <p className="text-sm text-gray-400">Student, Barcelona</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-dark-lighter py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center mb-4">
                <i className="fas fa-globe-americas text-primary mr-2"></i>
                <span className="text-xl font-bold">Skymark</span>
              </div>
              <p className="text-gray-400 mb-4">Your AI-powered companion for navigating the study abroad journey.</p>
              <p className="text-gray-400 text-sm">© {new Date().getFullYear()} Skymark. All rights reserved.</p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Resources</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-primary transition-colors">University Database</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Scholarship Guide</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Visa Requirements</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Student Stories</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">About</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-primary transition-colors">Our Team</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Partners</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Press Kit</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-primary transition-colors">Terms of Service</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Cookie Policy</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Data Processing</a></li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </section>
  );
};

export default Home;
