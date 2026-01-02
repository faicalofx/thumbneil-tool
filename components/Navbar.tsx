
import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar: React.FC = () => {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith('/admin');

  if (isAdmin) return null;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center font-bold text-white shadow-lg shadow-blue-500/20">S</div>
            <span className="text-xl font-bold tracking-tight">StatStream <span className="text-blue-500">AI</span></span>
          </Link>
          
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-sm font-medium text-gray-300 hover:text-white transition-colors">Simulator</Link>
            <Link to="/how-it-works" className="text-sm font-medium text-gray-300 hover:text-white transition-colors">How it Works</Link>
            <Link to="/blog" className="text-sm font-medium text-gray-300 hover:text-white transition-colors">CTR Blog</Link>
            <Link to="/about" className="text-sm font-medium text-gray-300 hover:text-white transition-colors">About</Link>
            <Link to="/contact" className="text-sm font-medium text-gray-300 hover:text-white transition-colors">Contact</Link>
          </div>

          <div className="flex items-center space-x-4">
            <Link to="/admin" className="text-xs px-3 py-1 rounded bg-gray-800 text-gray-400 hover:text-white transition-all">
              Admin
            </Link>
            <Link to="/contact" className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-full text-sm font-semibold transition-all shadow-lg shadow-blue-600/20">
              Get Pro
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
