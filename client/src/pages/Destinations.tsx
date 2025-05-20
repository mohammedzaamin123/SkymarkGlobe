import { motion } from "framer-motion";

const Destinations = () => {
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
      className="min-h-screen py-12 px-4 sm:px-6 lg:px-8"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <div className="max-w-7xl mx-auto">
        <motion.h2 variants={itemVariants} className="text-3xl font-bold mb-8">Popular Study Destinations</motion.h2>
        
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={containerVariants}
        >
          {/* Destination 1: USA */}
          <motion.div 
            className="bg-dark-lighter rounded-xl overflow-hidden shadow-lg transition-transform hover:scale-[1.02]"
            variants={itemVariants}
          >
            <div className="h-48 overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=500" 
                alt="University campus in the USA"
                className="w-full h-full object-cover transition-transform hover:scale-110 duration-500"
              />
            </div>
            <div className="p-6">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-xl font-bold">United States</h3>
                <span className="bg-primary/20 text-primary px-2 py-1 rounded text-xs">Top Choice</span>
              </div>
              <p className="text-gray-400 mb-4">Home to world-renowned universities like Harvard, MIT, and Stanford, offering diverse programs and research opportunities.</p>
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="bg-dark px-2 py-1 rounded-full text-xs text-gray-400">Ivy League</span>
                <span className="bg-dark px-2 py-1 rounded-full text-xs text-gray-400">Liberal Arts</span>
                <span className="bg-dark px-2 py-1 rounded-full text-xs text-gray-400">STEM Focus</span>
              </div>
              <a href="#" className="text-primary hover:text-primary/80 font-medium flex items-center gap-1">
                Explore Universities
                <i className="fas fa-arrow-right text-sm"></i>
              </a>
            </div>
          </motion.div>
          
          {/* Destination 2: UK */}
          <motion.div 
            className="bg-dark-lighter rounded-xl overflow-hidden shadow-lg transition-transform hover:scale-[1.02]"
            variants={itemVariants}
          >
            <div className="h-48 overflow-hidden">
              <img 
                src="https://pixabay.com/get/gb85598cefae33cd2056830adcfaab4bd1529d7fb5b65b1647ed95ba612de175c45017608a1ace616c266459324c1721d69d467f12c45ff062df1a762eba6f5df_1280.jpg" 
                alt="Historic university building in the UK"
                className="w-full h-full object-cover transition-transform hover:scale-110 duration-500"
              />
            </div>
            <div className="p-6">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-xl font-bold">United Kingdom</h3>
                <span className="bg-secondary/20 text-secondary px-2 py-1 rounded text-xs">Popular</span>
              </div>
              <p className="text-gray-400 mb-4">Known for Oxford, Cambridge, and London universities with prestigious history and cutting-edge research facilities.</p>
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="bg-dark px-2 py-1 rounded-full text-xs text-gray-400">Russell Group</span>
                <span className="bg-dark px-2 py-1 rounded-full text-xs text-gray-400">Research</span>
                <span className="bg-dark px-2 py-1 rounded-full text-xs text-gray-400">3-Year Degrees</span>
              </div>
              <a href="#" className="text-primary hover:text-primary/80 font-medium flex items-center gap-1">
                Explore Universities
                <i className="fas fa-arrow-right text-sm"></i>
              </a>
            </div>
          </motion.div>
          
          {/* Destination 3: Australia */}
          <motion.div 
            className="bg-dark-lighter rounded-xl overflow-hidden shadow-lg transition-transform hover:scale-[1.02]"
            variants={itemVariants}
          >
            <div className="h-48 overflow-hidden">
              <img 
                src="https://pixabay.com/get/g4a4011345c01d336d7d295935e042bd6a43437221803faa50d6e75c66df9e91ef3868475d6366c55db15faecb7d82d63c09211892009a4bd07d2d61d2e22e6e8_1280.jpg" 
                alt="Modern university campus in Australia"
                className="w-full h-full object-cover transition-transform hover:scale-110 duration-500"
              />
            </div>
            <div className="p-6">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-xl font-bold">Australia</h3>
                <span className="bg-accent/20 text-accent px-2 py-1 rounded text-xs">Work Options</span>
              </div>
              <p className="text-gray-400 mb-4">Offering high quality education at universities like Melbourne, Sydney, and UNSW with excellent post-grad work permits.</p>
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="bg-dark px-2 py-1 rounded-full text-xs text-gray-400">Group of Eight</span>
                <span className="bg-dark px-2 py-1 rounded-full text-xs text-gray-400">Work Rights</span>
                <span className="bg-dark px-2 py-1 rounded-full text-xs text-gray-400">PR Pathway</span>
              </div>
              <a href="#" className="text-primary hover:text-primary/80 font-medium flex items-center gap-1">
                Explore Universities
                <i className="fas fa-arrow-right text-sm"></i>
              </a>
            </div>
          </motion.div>
          
          {/* Destination 4: Germany */}
          <motion.div 
            className="bg-dark-lighter rounded-xl overflow-hidden shadow-lg transition-transform hover:scale-[1.02]"
            variants={itemVariants}
          >
            <div className="h-48 overflow-hidden">
              <img 
                src="https://pixabay.com/get/g2703cb25145e1791f4b8a509168e04836d6fac5b35189eead039310c329fdbaee9536274f6a06c073466f3a0722d33211bf5d9a5ea47111c8cb9d4898ba2ffb0_1280.jpg" 
                alt="German university building"
                className="w-full h-full object-cover transition-transform hover:scale-110 duration-500"
              />
            </div>
            <div className="p-6">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-xl font-bold">Germany</h3>
                <span className="bg-primary/20 text-primary px-2 py-1 rounded text-xs">Tuition-Free</span>
              </div>
              <p className="text-gray-400 mb-4">Renowned for free or low-cost education at TU Munich, Heidelberg, and Humboldt University with strong industry connections.</p>
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="bg-dark px-2 py-1 rounded-full text-xs text-gray-400">No Tuition</span>
                <span className="bg-dark px-2 py-1 rounded-full text-xs text-gray-400">Engineering</span>
                <span className="bg-dark px-2 py-1 rounded-full text-xs text-gray-400">Research</span>
              </div>
              <a href="#" className="text-primary hover:text-primary/80 font-medium flex items-center gap-1">
                Explore Universities
                <i className="fas fa-arrow-right text-sm"></i>
              </a>
            </div>
          </motion.div>
          
          {/* Destination 5: Canada */}
          <motion.div 
            className="bg-dark-lighter rounded-xl overflow-hidden shadow-lg transition-transform hover:scale-[1.02]"
            variants={itemVariants}
          >
            <div className="h-48 overflow-hidden">
              <img 
                src="https://pixabay.com/get/g84e1a29bbab130ebb8178dbe868a7bc0389b0ef400675f905d869dedefd9fc7a19876533851b1052c3c69c1236c4e491e8995289d54f486c6ce98af549542745_1280.jpg" 
                alt="Canadian university campus"
                className="w-full h-full object-cover transition-transform hover:scale-110 duration-500"
              />
            </div>
            <div className="p-6">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-xl font-bold">Canada</h3>
                <span className="bg-secondary/20 text-secondary px-2 py-1 rounded text-xs">Immigration</span>
              </div>
              <p className="text-gray-400 mb-4">Home to Toronto, UBC, and McGill universities with excellent immigration pathways and welcoming communities.</p>
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="bg-dark px-2 py-1 rounded-full text-xs text-gray-400">Work Permit</span>
                <span className="bg-dark px-2 py-1 rounded-full text-xs text-gray-400">PR Options</span>
                <span className="bg-dark px-2 py-1 rounded-full text-xs text-gray-400">Co-op Programs</span>
              </div>
              <a href="#" className="text-primary hover:text-primary/80 font-medium flex items-center gap-1">
                Explore Universities
                <i className="fas fa-arrow-right text-sm"></i>
              </a>
            </div>
          </motion.div>
          
          {/* Destination 6: Japan */}
          <motion.div 
            className="bg-dark-lighter rounded-xl overflow-hidden shadow-lg transition-transform hover:scale-[1.02]"
            variants={itemVariants}
          >
            <div className="h-48 overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1493780474015-ba834fd0ce2f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=500" 
                alt="Japanese university campus"
                className="w-full h-full object-cover transition-transform hover:scale-110 duration-500"
              />
            </div>
            <div className="p-6">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-xl font-bold">Japan</h3>
                <span className="bg-accent/20 text-accent px-2 py-1 rounded text-xs">Scholarships</span>
              </div>
              <p className="text-gray-400 mb-4">Study at Tokyo, Kyoto, or Osaka University with MEXT scholarship opportunities and unique cultural experiences.</p>
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="bg-dark px-2 py-1 rounded-full text-xs text-gray-400">MEXT</span>
                <span className="bg-dark px-2 py-1 rounded-full text-xs text-gray-400">English Programs</span>
                <span className="bg-dark px-2 py-1 rounded-full text-xs text-gray-400">Technology</span>
              </div>
              <a href="#" className="text-primary hover:text-primary/80 font-medium flex items-center gap-1">
                Explore Universities
                <i className="fas fa-arrow-right text-sm"></i>
              </a>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default Destinations;
