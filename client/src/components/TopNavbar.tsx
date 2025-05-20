import { useState } from "react";
import { Link, useLocation } from "wouter";
import { useAuthStore } from "../store/authStore";
import { motion } from "framer-motion";

const TopNavbar = () => {
  const [location] = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, setShowLoginModal, setShowSignupModal, logout } = useAuthStore();

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <nav className="bg-gradient-to-r from-primary/90 to-primary text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo and brand */}
          <div className="flex items-center">
            <Link href="/">
              <span className="text-2xl font-bold text-white flex items-center cursor-pointer">
                <i className="fas fa-globe-americas text-white mr-2"></i>
                Skymark
              </span>
            </Link>
          </div>
          
          {/* Desktop Navigation Links */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-4">
              <Link href="/">
                <span className={`px-3 py-2 rounded-md text-sm font-medium cursor-pointer ${location === '/' ? 'bg-white/20 text-white' : 'text-white/80 hover:bg-white/10 hover:text-white'}`}>
                  Home
                </span>
              </Link>
              <Link href="/chat">
                <span className={`px-3 py-2 rounded-md text-sm font-medium cursor-pointer ${location === '/chat' ? 'bg-white/20 text-white' : 'text-white/80 hover:bg-white/10 hover:text-white'}`}>
                  Chat
                </span>
              </Link>
              <Link href="/destinations">
                <span className={`px-3 py-2 rounded-md text-sm font-medium cursor-pointer ${location === '/destinations' ? 'bg-white/20 text-white' : 'text-white/80 hover:bg-white/10 hover:text-white'}`}>
                  Destinations
                </span>
              </Link>
              <Link href="/about">
                <span className={`px-3 py-2 rounded-md text-sm font-medium cursor-pointer ${location === '/about' ? 'bg-white/20 text-white' : 'text-white/80 hover:bg-white/10 hover:text-white'}`}>
                  About Us
                </span>
              </Link>
              <Link href="/faq">
                <span className={`px-3 py-2 rounded-md text-sm font-medium cursor-pointer ${location === '/faq' ? 'bg-white/20 text-white' : 'text-white/80 hover:bg-white/10 hover:text-white'}`}>
                  FAQs
                </span>
              </Link>
              <Link href="/contact">
                <span className={`px-3 py-2 rounded-md text-sm font-medium cursor-pointer ${location === '/contact' ? 'bg-white/20 text-white' : 'text-white/80 hover:bg-white/10 hover:text-white'}`}>
                  Contact
                </span>
              </Link>
            </div>
          </div>
          
          {/* User profile/login section */}
          <div className="hidden md:block">
            {user ? (
              <div className="flex items-center">
                <div className="text-sm mr-4">
                  <span className="text-white/80">Hi, </span>
                  <span className="font-medium text-white">{user.displayName || user.username}</span>
                </div>
                <div className="relative group">
                  <button className="flex items-center">
                    <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                      {user.photoURL ? (
                        <img src={user.photoURL} alt={user.displayName || user.username} className="w-8 h-8 rounded-full" />
                      ) : (
                        <span className="text-sm font-bold text-white">
                          {user.displayName?.charAt(0) || user.username.charAt(0) || user.email.charAt(0) || 'U'}
                        </span>
                      )}
                    </div>
                  </button>
                  <div className="absolute right-0 w-48 mt-2 py-2 bg-dark-lighter border border-gray-700 rounded-lg shadow-xl hidden group-hover:block">
                    <button 
                      className="block px-4 py-2 text-sm text-gray-300 hover:bg-dark w-full text-left"
                      onClick={logout}
                    >
                      <i className="fas fa-sign-out-alt mr-2"></i> Sign out
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex space-x-3">
                <button 
                  className="px-4 py-1.5 border border-white/70 rounded-full hover:bg-white/10 text-sm font-medium transition-colors"
                  onClick={() => setShowLoginModal(true)}
                >
                  Log In
                </button>
                <button 
                  className="px-4 py-1.5 bg-white text-primary rounded-full hover:bg-white/90 text-sm font-medium transition-colors"
                  onClick={() => setShowSignupModal(true)}
                >
                  Sign Up
                </button>
              </div>
            )}
          </div>
          
          {/* Mobile menu button */}
          <div className="md:hidden">
            <button 
              className="bg-white/20 rounded-full p-2"
              onClick={toggleMobileMenu}
            >
              <i className={`fas ${mobileMenuOpen ? 'fa-times' : 'fa-bars'} text-white`}></i>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <motion.div 
        className={`md:hidden ${mobileMenuOpen ? 'block' : 'hidden'}`}
        initial={{ height: 0, opacity: 0 }}
        animate={{ height: mobileMenuOpen ? 'auto' : 0, opacity: mobileMenuOpen ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-primary/90 border-t border-white/10">
          <Link href="/">
            <span 
              onClick={closeMobileMenu}
              className={`block px-3 py-2 rounded-md text-base font-medium cursor-pointer ${location === '/' ? 'bg-white/20 text-white' : 'text-white/80 hover:bg-white/10 hover:text-white'}`}
            >
              Home
            </span>
          </Link>
          <Link href="/chat">
            <span 
              onClick={closeMobileMenu}
              className={`block px-3 py-2 rounded-md text-base font-medium cursor-pointer ${location === '/chat' ? 'bg-white/20 text-white' : 'text-white/80 hover:bg-white/10 hover:text-white'}`}
            >
              Chat
            </span>
          </Link>
          <Link href="/destinations">
            <span 
              onClick={closeMobileMenu}
              className={`block px-3 py-2 rounded-md text-base font-medium cursor-pointer ${location === '/destinations' ? 'bg-white/20 text-white' : 'text-white/80 hover:bg-white/10 hover:text-white'}`}
            >
              Destinations
            </span>
          </Link>
          <Link href="/about">
            <span 
              onClick={closeMobileMenu}
              className={`block px-3 py-2 rounded-md text-base font-medium cursor-pointer ${location === '/about' ? 'bg-white/20 text-white' : 'text-white/80 hover:bg-white/10 hover:text-white'}`}
            >
              About Us
            </span>
          </Link>
          <Link href="/faq">
            <span 
              onClick={closeMobileMenu}
              className={`block px-3 py-2 rounded-md text-base font-medium cursor-pointer ${location === '/faq' ? 'bg-white/20 text-white' : 'text-white/80 hover:bg-white/10 hover:text-white'}`}
            >
              FAQs
            </span>
          </Link>
          <Link href="/contact">
            <span 
              onClick={closeMobileMenu}
              className={`block px-3 py-2 rounded-md text-base font-medium cursor-pointer ${location === '/contact' ? 'bg-white/20 text-white' : 'text-white/80 hover:bg-white/10 hover:text-white'}`}
            >
              Contact
            </span>
          </Link>
          
          {user ? (
            <>
              <div className="border-t border-white/10 pt-3 mt-3">
                <div className="flex items-center px-3">
                  <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center mr-3">
                    {user.photoURL ? (
                      <img src={user.photoURL} alt={user.displayName || user.username} className="w-8 h-8 rounded-full" />
                    ) : (
                      <span className="text-sm font-bold text-white">
                        {user.displayName?.charAt(0) || user.username.charAt(0) || user.email.charAt(0) || 'U'}
                      </span>
                    )}
                  </div>
                  <div className="text-sm">
                    <p className="font-medium text-white">{user.displayName || user.username}</p>
                    <p className="text-white/70 text-xs">{user.email}</p>
                  </div>
                </div>
                <button 
                  className="mt-3 w-full px-3 py-2 bg-white/10 rounded-md text-white text-base font-medium"
                  onClick={() => {
                    logout();
                    closeMobileMenu();
                  }}
                >
                  <i className="fas fa-sign-out-alt mr-2"></i> Sign out
                </button>
              </div>
            </>
          ) : (
            <div className="flex space-x-3 px-3 mt-4 border-t border-white/10 pt-4">
              <button 
                className="flex-1 py-2 border border-white/70 rounded-md hover:bg-white/10 text-sm font-medium transition-colors text-white"
                onClick={() => {
                  setShowLoginModal(true);
                  closeMobileMenu();
                }}
              >
                Log In
              </button>
              <button 
                className="flex-1 py-2 bg-white text-primary rounded-md hover:bg-white/90 text-sm font-medium transition-colors"
                onClick={() => {
                  setShowSignupModal(true);
                  closeMobileMenu();
                }}
              >
                Sign Up
              </button>
            </div>
          )}
        </div>
      </motion.div>
    </nav>
  );
};

export default TopNavbar;