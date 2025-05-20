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
    <header className="md:hidden bg-dark-lighter p-4 flex justify-between items-center shadow-lg">
      <div className="flex items-center">
        <Link href="/">
          <span className="text-2xl font-bold text-white flex items-center cursor-pointer">
            <i className="fas fa-globe-americas text-primary mr-2"></i>
            Skymark
          </span>
        </Link>
      </div>
      <button 
        id="mobile-menu-button" 
        className="text-white focus:outline-none"
        onClick={toggleSidebar}
        aria-label="Toggle menu"
      >
        <i className={`fas ${isSidebarOpen ? 'fa-times' : 'fa-bars'} text-xl`}></i>
      </button>
    </header>
  );
};

export default MobileHeader;
