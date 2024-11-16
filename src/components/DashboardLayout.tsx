import React from 'react';
import { Menu, BarChart3, Search, FileText, Settings, HelpCircle } from 'lucide-react';
import { motion } from 'framer-motion';

const DashboardLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(true);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar */}
      <motion.aside 
        className={`fixed top-0 left-0 h-full bg-white shadow-lg transition-all duration-300 z-50 ${
          isSidebarOpen ? 'w-64' : 'w-20'
        }`}
        initial={false}
        animate={{ width: isSidebarOpen ? 256 : 80 }}
      >
        <div className="p-4 flex items-center justify-between border-b">
          <motion.div 
            initial={false}
            animate={{ opacity: isSidebarOpen ? 1 : 0 }}
            className="flex items-center space-x-2"
          >
            <BarChart3 className="w-8 h-8 text-indigo-600" />
            {isSidebarOpen && <span className="font-bold text-xl">VyralWave</span>}
          </motion.div>
          <button 
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="p-2 rounded-lg hover:bg-gray-100"
          >
            <Menu className="w-6 h-6 text-gray-600" />
          </button>
        </div>
        
        <nav className="p-4">
          <ul className="space-y-2">
            {[
              { icon: Search, label: 'Analysis' },
              { icon: BarChart3, label: 'Dashboard' },
              { icon: FileText, label: 'Reports' },
              { icon: Settings, label: 'Settings' },
              { icon: HelpCircle, label: 'Help' },
            ].map((item, index) => (
              <li key={index}>
                <a
                  href="#"
                  className="flex items-center space-x-3 p-3 rounded-lg hover:bg-indigo-50 text-gray-700 hover:text-indigo-600 transition-colors"
                >
                  <item.icon className="w-6 h-6" />
                  {isSidebarOpen && <span>{item.label}</span>}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </motion.aside>

      {/* Main Content */}
      <main className={`transition-all duration-300 ${isSidebarOpen ? 'ml-64' : 'ml-20'}`}>
        <div className="p-8">
          {children}
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;