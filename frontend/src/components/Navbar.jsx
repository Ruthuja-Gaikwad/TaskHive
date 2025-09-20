import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo and Brand */}
          <div className="flex">
            <Link to="/boards" className="flex items-center">
              <span className="text-2xl font-bold text-indigo-600">TaskHive</span>
            </Link>
          </div>

          {/* Navigation Links */}
          <div className="hidden sm:flex sm:items-center">
            <Link
              to="/boards"
              className={`px-3 py-2 rounded-md text-sm font-medium ${
                isActive('/boards')
                  ? 'bg-indigo-100 text-indigo-700'
                  : 'text-gray-700 hover:text-gray-900 hover:bg-gray-50'
              }`}
            >
              Boards
            </Link>
            <Link
              to="/tasks"
              className={`ml-4 px-3 py-2 rounded-md text-sm font-medium ${
                isActive('/tasks')
                  ? 'bg-indigo-100 text-indigo-700'
                  : 'text-gray-700 hover:text-gray-900 hover:bg-gray-50'
              }`}
            >
              Tasks
            </Link>
          </div>
        </div>
      </div>

      {/* Mobile Menu - Hidden by default, shown when menu button is clicked */}
      <div className="sm:hidden">
        <div className="px-2 pt-2 pb-3 space-y-1">
          <Link
            to="/boards"
            className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
          >
            Boards
          </Link>
          <Link
            to="/tasks"
            className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
          >
            Tasks
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;