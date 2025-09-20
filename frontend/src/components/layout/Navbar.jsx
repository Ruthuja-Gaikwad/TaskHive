import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ViewBoardsIcon,
  PlusIcon,
  MenuIcon,
  XIcon
} from '@heroicons/react/outline';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const menuItems = [
    { name: 'Boards', path: '/', icon: ViewBoardsIcon },
    { name: 'Create Board', path: '/create', icon: PlusIcon },
  ];

  const navVariants = {
    open: { opacity: 1, x: 0 },
    closed: { opacity: 0, x: "-100%" },
  };

  return (
    <>
      {/* Mobile menu button */}
      <div className="fixed top-4 left-4 z-50 md:hidden">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 rounded-lg bg-white shadow-lg"
        >
          {isOpen ? (
            <XIcon className="w-6 h-6 text-gray-600" />
          ) : (
            <MenuIcon className="w-6 h-6 text-gray-600" />
          )}
        </button>
      </div>

      {/* Sidebar */}
      <motion.nav
        initial="closed"
        animate={isOpen ? "open" : "closed"}
        variants={navVariants}
        transition={{ duration: 0.3 }}
        className={`fixed top-0 left-0 h-full bg-white shadow-xl z-40 w-64 transform 
          ${isOpen ? 'translate-x-0' : '-translate-x-full'} 
          md:translate-x-0 transition-transform duration-300 ease-in-out`}
      >
        {/* Logo */}
        <div className="p-6">
          <Link to="/" className="flex items-center space-x-3">
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="w-10 h-10 bg-gradient-to-r from-primary-400 to-primary-600 rounded-lg flex items-center justify-center"
            >
              <span className="text-white text-xl font-bold">TH</span>
            </motion.div>
            <span className="text-2xl font-bold bg-gradient-to-r from-primary-600 to-primary-400 bg-clip-text text-transparent">
              TaskHive
            </span>
          </Link>
        </div>

        {/* Menu Items */}
        <div className="mt-6 px-4">
          {menuItems.map((item) => (
            <motion.div
              key={item.name}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Link
                to={item.path}
                className={`flex items-center space-x-3 px-4 py-3 rounded-xl mb-2 transition-all
                  ${location.pathname === item.path
                    ? 'bg-primary-50 text-primary-600'
                    : 'text-gray-600 hover:bg-gray-50'
                  }`}
              >
                <item.icon className="w-6 h-6" />
                <span className="font-medium">{item.name}</span>
              </Link>
            </motion.div>
          ))}
        </div>
      </motion.nav>

      {/* Backdrop */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
        />
      )}
    </>
  );
};

export default Navbar;