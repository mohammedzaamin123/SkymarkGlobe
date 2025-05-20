import { Switch, Route, useLocation } from "wouter";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AnimatePresence } from "framer-motion";
import { useEffect } from "react";
import { useAuthStore } from "./store/authStore";
import { onAuthStateChanged } from "./lib/firebase";

// Pages
import Home from "@/pages/Home";
import Chat from "@/pages/Chat";
import Destinations from "@/pages/Destinations";
import About from "@/pages/About";
import FAQ from "@/pages/FAQ";
import Contact from "@/pages/Contact";
import NotFound from "@/pages/not-found";

// Components
import Sidebar from "./components/Sidebar";
import MobileHeader from "./components/MobileHeader";
import AuthModals from "./components/AuthModals";

function App() {
  const [location] = useLocation();
  const { setUser } = useAuthStore();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged((user) => {
      setUser(user ? {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName || user.email?.split('@')[0] || 'User',
        photoURL: user.photoURL
      } : null);
    });

    return () => unsubscribe();
  }, [setUser]);

  useEffect(() => {
    // Scroll to top when route changes
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <TooltipProvider>
      <div className="flex flex-col md:flex-row h-screen overflow-hidden bg-dark text-gray-100">
        <MobileHeader />
        <Sidebar />

        <main className="flex-grow overflow-y-auto bg-dark">
          <AnimatePresence mode="wait">
            <Switch>
              <Route path="/" component={Home} />
              <Route path="/chat" component={Chat} />
              <Route path="/destinations" component={Destinations} />
              <Route path="/about" component={About} />
              <Route path="/faq" component={FAQ} />
              <Route path="/contact" component={Contact} />
              <Route component={NotFound} />
            </Switch>
          </AnimatePresence>
        </main>

        <AuthModals />
        <Toaster />
      </div>
    </TooltipProvider>
  );
}

export default App;
