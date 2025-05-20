import { useState } from "react";
import { Link } from "wouter";

const MobileHeader = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    const sidebar = document.getElementById('sidebar');
    if (sidebar) {
      sidebar.classList.toggle('hidden');
      sidebar.classList.toggle('flex');
      setIsSidebarOpen(!isSidebarOpen);
    }
  };

  return (
    <header className="md:hidden bg-gradient-to-r from-primary/90 to-primary p-4 flex justify-between items-center shadow-lg">
      <div className="flex items-center">
        <Link href="/">
          <span className="text-2xl font-bold text-white flex items-center cursor-pointer">
            <i className="fas fa-globe-americas text-white mr-2"></i>
            Skymark
          </span>
        </Link>
      </div>
      <button 
        id="mobile-menu-button" 
        className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center text-white focus:outline-none focus:ring-2 focus:ring-white/50"
        onClick={toggleSidebar}
        aria-label="Toggle menu"
      >
        <i className={`fas ${isSidebarOpen ? 'fa-times' : 'fa-bars'} text-lg`}></i>
      </button>
    </header>
  );
};

export default MobileHeader;
