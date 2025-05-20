import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuthStore } from "../store/authStore";
import { login, register } from "../lib/authService";
import { useToast } from "@/hooks/use-toast";

const AuthModals = () => {
  const { 
    showLoginModal, 
    showSignupModal, 
    setShowLoginModal, 
    setShowSignupModal 
  } = useAuthStore();
  
  // Login form state
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  
  // Signup form state
  const [name, setName] = useState("");
  const [signupEmail, setSignupEmail] = useState("");
  const [signupPassword, setSignupPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  
  // Loading states
  const [isLoginLoading, setIsLoginLoading] = useState(false);
  const [isSignupLoading, setIsSignupLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  
  const { toast } = useToast();

  useEffect(() => {
    // Close modals on ESC key
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setShowLoginModal(false);
        setShowSignupModal(false);
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [setShowLoginModal, setShowSignupModal]);

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!loginEmail || !loginPassword) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive"
      });
      return;
    }
    
    setIsLoginLoading(true);
    try {
      const result = await login({ email: loginEmail, password: loginPassword });
      const { user, token } = result;
      
      // Update auth store with user and token
      useAuthStore.getState().setAuthData(user, token);
      
      setShowLoginModal(false);
      toast({
        title: "Success",
        description: "You have been logged in successfully"
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to log in",
        variant: "destructive"
      });
    } finally {
      setIsLoginLoading(false);
    }
  };

  const handleSignupSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !signupEmail || !signupPassword || !confirmPassword) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive"
      });
      return;
    }
    
    if (!agreeToTerms) {
      toast({
        title: "Error",
        description: "You must agree to the Terms of Service and Privacy Policy",
        variant: "destructive"
      });
      return;
    }
    
    if (signupPassword !== confirmPassword) {
      toast({
        title: "Error",
        description: "Passwords do not match",
        variant: "destructive"
      });
      return;
    }
    
    setIsSignupLoading(true);
    try {
      const result = await register({
        username: name,
        email: signupEmail,
        password: signupPassword,
        displayName: name
      });
      
      const { user, token } = result;
      
      // Update auth store with user and token
      useAuthStore.getState().setAuthData(user, token);
      
      setShowSignupModal(false);
      toast({
        title: "Success",
        description: "Account created successfully"
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to create account",
        variant: "destructive"
      });
    } finally {
      setIsSignupLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setIsGoogleLoading(true);
    try {
      // Note: Google sign-in is not implemented with MongoDB
      // This is a placeholder for future implementation
      toast({
        title: "Info",
        description: "Google sign-in is not available with MongoDB authentication."
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to log in with Google",
        variant: "destructive"
      });
    } finally {
      setIsGoogleLoading(false);
    }
  };

  const switchToSignup = () => {
    setShowLoginModal(false);
    setShowSignupModal(true);
  };

  const switchToLogin = () => {
    setShowSignupModal(false);
    setShowLoginModal(true);
  };

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.2 } },
    exit: { opacity: 0, scale: 0.9, transition: { duration: 0.2 } }
  };

  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.2 } },
    exit: { opacity: 0, transition: { duration: 0.2 } }
  };

  return (
    <>
      {/* Login Modal */}
      <AnimatePresence>
        {showLoginModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center">
            <motion.div 
              className="absolute inset-0 bg-black bg-opacity-50"
              variants={overlayVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              onClick={() => setShowLoginModal(false)}
            />
            <motion.div 
              className="relative bg-dark-lighter w-full max-w-md p-6 rounded-xl shadow-xl"
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <button 
                className="absolute top-4 right-4 text-gray-400 hover:text-white"
                onClick={() => setShowLoginModal(false)}
              >
                <i className="fas fa-times"></i>
              </button>
              
              <h2 className="text-2xl font-bold mb-6 text-center text-white">
                <span className="bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">Log In to Skymark</span>
              </h2>
              
              <form onSubmit={handleLoginSubmit} className="space-y-4">
                <div>
                  <label htmlFor="login-email" className="block text-sm font-medium mb-1">Email</label>
                  <input 
                    type="email" 
                    id="login-email" 
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    className="w-full bg-dark border border-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
                
                <div>
                  <label htmlFor="login-password" className="block text-sm font-medium mb-1">Password</label>
                  <input 
                    type="password" 
                    id="login-password" 
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    className="w-full bg-dark border border-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <input 
                      type="checkbox" 
                      id="remember-me" 
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="h-4 w-4 text-primary focus:ring-primary border-gray-700 rounded"
                    />
                    <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-400">Remember me</label>
                  </div>
                  <a href="#" className="text-sm text-primary hover:text-primary/80">Forgot password?</a>
                </div>
                
                <button 
                  type="submit" 
                  className="w-full bg-gradient-to-r from-primary/90 to-primary text-white font-medium py-3 rounded-full transition-all shadow-lg hover:shadow-primary/20 flex items-center justify-center"
                  disabled={isLoginLoading}
                >
                  {isLoginLoading ? (
                    <><i className="fas fa-spinner fa-spin mr-2"></i> Logging in...</>
                  ) : (
                    "Log In"
                  )}
                </button>
              </form>
              
              <div className="mt-6">
                <div className="relative flex items-center justify-center mb-4">
                  <div className="border-t border-gray-700 flex-grow"></div>
                  <span className="mx-4 text-xs text-gray-500 uppercase">Or continue with</span>
                  <div className="border-t border-gray-700 flex-grow"></div>
                </div>
                <button 
                  onClick={handleGoogleSignIn} 
                  className="w-full border border-gray-700 bg-dark/50 text-white py-3 rounded-full transition-all hover:bg-dark flex items-center justify-center"
                  disabled={isGoogleLoading}
                >
                  {isGoogleLoading ? (
                    <><i className="fas fa-spinner fa-spin mr-2"></i> Connecting...</>
                  ) : (
                    <><i className="fab fa-google mr-2 text-red-500"></i> Sign in with Google</>
                  )}
                </button>
              </div>
              
              <div className="mt-6 text-center">
                <p className="text-gray-400">
                  Don't have an account? {" "}
                  <button onClick={switchToSignup} className="text-primary hover:text-primary/80">
                    Sign up
                  </button>
                </p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Signup Modal */}
      <AnimatePresence>
        {showSignupModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center">
            <motion.div 
              className="absolute inset-0 bg-black bg-opacity-50"
              variants={overlayVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              onClick={() => setShowSignupModal(false)}
            />
            <motion.div 
              className="relative bg-dark-lighter w-full max-w-md p-6 rounded-xl shadow-xl"
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <button 
                className="absolute top-4 right-4 text-gray-400 hover:text-white"
                onClick={() => setShowSignupModal(false)}
              >
                <i className="fas fa-times"></i>
              </button>
              
              <h2 className="text-2xl font-bold mb-6 text-center text-white">
                <span className="bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">Create Your Skymark Account</span>
              </h2>
              
              <form onSubmit={handleSignupSubmit} className="space-y-4">
                <div>
                  <label htmlFor="signup-name" className="block text-sm font-medium mb-1">Full Name</label>
                  <input 
                    type="text" 
                    id="signup-name" 
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-dark border border-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
                
                <div>
                  <label htmlFor="signup-email" className="block text-sm font-medium mb-1">Email</label>
                  <input 
                    type="email" 
                    id="signup-email" 
                    value={signupEmail}
                    onChange={(e) => setSignupEmail(e.target.value)}
                    className="w-full bg-dark border border-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
                
                <div>
                  <label htmlFor="signup-password" className="block text-sm font-medium mb-1">Password</label>
                  <input 
                    type="password" 
                    id="signup-password" 
                    value={signupPassword}
                    onChange={(e) => setSignupPassword(e.target.value)}
                    className="w-full bg-dark border border-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
                
                <div>
                  <label htmlFor="signup-confirm-password" className="block text-sm font-medium mb-1">Confirm Password</label>
                  <input 
                    type="password" 
                    id="signup-confirm-password" 
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full bg-dark border border-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
                
                <div className="flex items-center">
                  <input 
                    type="checkbox" 
                    id="terms" 
                    checked={agreeToTerms}
                    onChange={(e) => setAgreeToTerms(e.target.checked)}
                    className="h-4 w-4 text-primary focus:ring-primary border-gray-700 rounded"
                  />
                  <label htmlFor="terms" className="ml-2 block text-sm text-gray-400">
                    I agree to the <a href="#" className="text-primary hover:text-primary/80">Terms of Service</a> and <a href="#" className="text-primary hover:text-primary/80">Privacy Policy</a>
                  </label>
                </div>
                
                <button 
                  type="submit" 
                  className="w-full bg-gradient-to-r from-primary/90 to-primary text-white font-medium py-3 rounded-full transition-all shadow-lg hover:shadow-primary/20 flex items-center justify-center"
                  disabled={isSignupLoading}
                >
                  {isSignupLoading ? (
                    <><i className="fas fa-spinner fa-spin mr-2"></i> Creating account...</>
                  ) : (
                    "Create Account"
                  )}
                </button>
              </form>
              
              <div className="mt-6">
                <div className="relative flex items-center justify-center mb-4">
                  <div className="border-t border-gray-700 flex-grow"></div>
                  <span className="mx-4 text-xs text-gray-500 uppercase">Or continue with</span>
                  <div className="border-t border-gray-700 flex-grow"></div>
                </div>
                <button 
                  onClick={handleGoogleSignIn} 
                  className="w-full border border-gray-700 bg-dark/50 text-white py-3 rounded-full transition-all hover:bg-dark flex items-center justify-center"
                  disabled={isGoogleLoading}
                >
                  {isGoogleLoading ? (
                    <><i className="fas fa-spinner fa-spin mr-2"></i> Connecting...</>
                  ) : (
                    <><i className="fab fa-google mr-2 text-red-500"></i> Sign up with Google</>
                  )}
                </button>
              </div>
              
              <div className="mt-6 text-center">
                <p className="text-gray-400">
                  Already have an account? {" "}
                  <button onClick={switchToLogin} className="text-primary hover:text-primary/80">
                    Log in
                  </button>
                </p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

export default AuthModals;
