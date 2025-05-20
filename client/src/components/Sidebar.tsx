import { Link, useLocation } from "wouter";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useAuthStore } from "../store/authStore";

const Sidebar = () => {
  const [location] = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const { user, setShowLoginModal, setShowSignupModal, logout } = useAuthStore();

  useEffect(() => {
    // Close sidebar on mobile when location changes
    setIsOpen(false);
  }, [location]);

  // Close sidebar on ESC key
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, []);

  // Handle click outside to close sidebar on mobile
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const sidebar = document.getElementById('sidebar');
      const mobileMenuButton = document.getElementById('mobile-menu-button');
      
      if (isOpen && sidebar && !sidebar.contains(e.target as Node) && 
          mobileMenuButton && !mobileMenuButton.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  const sidebarVariants = {
    open: { x: 0, transition: { duration: 0.3 } },
    closed: { x: '-100%', transition: { duration: 0.3 } }
  };

  return (
    <motion.aside
      id="sidebar"
      className={`bg-dark-lighter w-full md:w-64 flex-col p-4 shadow-lg md:relative fixed inset-0 z-50 md:flex ${isOpen ? 'flex' : 'hidden'}`}
      variants={sidebarVariants}
      initial={false}
      animate={isOpen ? 'open' : 'closed'}
    >
      <div className="flex items-center justify-between mb-8 mt-2">
        <Link href="/">
          <a className="text-2xl font-bold text-white flex items-center">
            <i className="fas fa-globe-americas text-primary mr-2"></i>
            Skymark
          </a>
        </Link>
        <button 
          className="md:hidden text-white focus:outline-none"
          onClick={() => setIsOpen(false)}
        >
          <i className="fas fa-times text-xl"></i>
        </button>
      </div>

      <nav className="space-y-2 flex-grow">
        <Link href="/">
          <span className={`flex items-center p-3 rounded-lg transition-colors cursor-pointer ${location === '/' ? 'text-white bg-primary hover:bg-primary/80' : 'text-gray-300 hover:bg-dark hover:text-white'}`}>
            <i className="fas fa-home w-6"></i>
            <span>Home</span>
          </span>
        </Link>
        <Link href="/chat">
          <span className={`flex items-center p-3 rounded-lg transition-colors cursor-pointer ${location === '/chat' ? 'text-white bg-primary hover:bg-primary/80' : 'text-gray-300 hover:bg-dark hover:text-white'}`}>
            <i className="fas fa-comment-alt w-6"></i>
            <span>Chat</span>
          </span>
        </Link>
        <Link href="/destinations">
          <span className={`flex items-center p-3 rounded-lg transition-colors cursor-pointer ${location === '/destinations' ? 'text-white bg-primary hover:bg-primary/80' : 'text-gray-300 hover:bg-dark hover:text-white'}`}>
            <i className="fas fa-map-marked-alt w-6"></i>
            <span>Destinations</span>
          </span>
        </Link>
        <Link href="/about">
          <span className={`flex items-center p-3 rounded-lg transition-colors cursor-pointer ${location === '/about' ? 'text-white bg-primary hover:bg-primary/80' : 'text-gray-300 hover:bg-dark hover:text-white'}`}>
            <i className="fas fa-info-circle w-6"></i>
            <span>About Us</span>
          </span>
        </Link>
        <Link href="/faq">
          <span className={`flex items-center p-3 rounded-lg transition-colors cursor-pointer ${location === '/faq' ? 'text-white bg-primary hover:bg-primary/80' : 'text-gray-300 hover:bg-dark hover:text-white'}`}>
            <i className="fas fa-question-circle w-6"></i>
            <span>FAQs</span>
          </span>
        </Link>
        <Link href="/contact">
          <span className={`flex items-center p-3 rounded-lg transition-colors cursor-pointer ${location === '/contact' ? 'text-white bg-primary hover:bg-primary/80' : 'text-gray-300 hover:bg-dark hover:text-white'}`}>
            <i className="fas fa-envelope w-6"></i>
            <span>Contact</span>
          </span>
        </Link>
      </nav>

      <div className="mt-auto border-t border-gray-700 pt-4">
        {user ? (
          <div className="flex items-center p-2 rounded-lg">
            <div className="w-8 h-8 rounded-full bg-primary/30 flex items-center justify-center mr-2">
              {user.photoURL ? (
                <img src={user.photoURL} alt={user.displayName || user.username} className="w-8 h-8 rounded-full" />
              ) : (
                <span className="text-white text-sm font-bold">
                  {user.displayName?.charAt(0) || user.username.charAt(0) || user.email.charAt(0) || 'U'}
                </span>
              )}
            </div>
            <div className="flex-grow">
              <p className="text-sm font-semibold">{user.displayName || user.username}</p>
              <p className="text-xs text-gray-400">{user.email}</p>
            </div>
            <button 
              className="text-gray-400 hover:text-white"
              onClick={logout}
            >
              <i className="fas fa-sign-out-alt"></i>
            </button>
          </div>
        ) : (
          <div className="space-y-2">
            <button 
              className="w-full bg-transparent border border-primary text-primary hover:bg-primary hover:text-white p-2 rounded-lg transition-colors"
              onClick={() => setShowLoginModal(true)}
            >
              Log In
            </button>
            <button 
              className="w-full bg-primary text-white hover:bg-primary/90 p-2 rounded-lg transition-colors"
              onClick={() => setShowSignupModal(true)}
            >
              Sign Up
            </button>
          </div>
        )}
      </div>
    </motion.aside>
  );
};

export default Sidebar;
