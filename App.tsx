
import React, { useEffect, useState } from 'react';
import { HashRouter as Router, Routes, Route, Link, useLocation, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import About from './pages/About';
import HowItWorks from './pages/HowItWorks';
import Blog from './pages/Blog';
import Contact from './pages/Contact';
import AdminDashboard from './pages/AdminDashboard';
import Legal from './pages/Legal';
import AdminLogin from './pages/AdminLogin';

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const ProtectedAdminRoute = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    const auth = localStorage.getItem('admin_session') === 'true';
    setIsAuthenticated(auth);
  }, []);

  if (isAuthenticated === null) return null; // Wait for storage check

  if (!isAuthenticated) {
    return <AdminLogin onLogin={() => setIsAuthenticated(true)} />;
  }

  return <AdminDashboard />;
};

const App: React.FC = () => {
  return (
    <Router>
      <ScrollToTop />
      <div className="min-h-screen">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/how-it-works" element={<HowItWorks />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/admin" element={<ProtectedAdminRoute />} />
          <Route path="/privacy" element={<Legal title="Privacy Policy" type="privacy" />} />
          <Route path="/terms" element={<Legal title="Terms of Service" type="terms" />} />
          <Route path="/cookies" element={<Legal title="Cookie Policy" type="cookies" />} />
          <Route path="/refund" element={<Legal title="Refund Policy" type="refund" />} />
        </Routes>

        <footer className="glass border-t border-white/5 py-12 px-4 mt-20 overflow-hidden relative">
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 relative z-10">
            <div className="space-y-6">
              <Link to="/" className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center font-bold text-white shadow-lg">S</div>
                <span className="text-xl font-bold tracking-tight">StatStream <span className="text-blue-500">AI</span></span>
              </Link>
              <p className="text-sm text-gray-500 leading-relaxed">
                The leading CTR optimization platform for creators who care about technical precision and data-backed growth.
              </p>
              <div className="flex space-x-4">
                <a href="https://x.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 glass rounded-full flex items-center justify-center hover:bg-white/10 transition-colors">𝕏</a>
                <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 glass rounded-full flex items-center justify-center hover:bg-white/10 transition-colors">📺</a>
                <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 glass rounded-full flex items-center justify-center hover:bg-white/10 transition-colors">🎵</a>
              </div>
            </div>

            <div>
              <h4 className="font-bold mb-6 text-sm uppercase tracking-widest text-gray-400">Product</h4>
              <ul className="space-y-3 text-sm text-gray-500">
                <li><Link to="/" className="hover:text-blue-400 transition-colors">Simulator</Link></li>
                <li><Link to="/contact" className="hover:text-blue-400 transition-colors">API Access</Link></li>
                <li><Link to="/contact" className="hover:text-blue-400 transition-colors">Enterprise</Link></li>
                <li><a href="#" className="hover:text-blue-400 transition-colors opacity-50 cursor-not-allowed">Chrome Extension (Coming Soon)</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-6 text-sm uppercase tracking-widest text-gray-400">Resources</h4>
              <ul className="space-y-3 text-sm text-gray-500">
                <li><Link to="/blog" className="hover:text-blue-400 transition-colors">CTR Best Practices</Link></li>
                <li><Link to="/how-it-works" className="hover:text-blue-400 transition-colors">Documentation</Link></li>
                <li><Link to="/contact" className="hover:text-blue-400 transition-colors">Support</Link></li>
                <li><Link to="/about" className="hover:text-blue-400 transition-colors">About Us</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-6 text-sm uppercase tracking-widest text-gray-400">Legal</h4>
              <ul className="space-y-3 text-sm text-gray-500">
                <li><Link to="/privacy" className="hover:text-blue-400 transition-colors">Privacy Policy</Link></li>
                <li><Link to="/terms" className="hover:text-blue-400 transition-colors">Terms of Service</Link></li>
                <li><Link to="/cookies" className="hover:text-blue-400 transition-colors">Cookie Policy</Link></li>
                <li><Link to="/refund" className="hover:text-blue-400 transition-colors">Refund Policy</Link></li>
              </ul>
            </div>
          </div>
          <div className="max-w-7xl mx-auto pt-12 mt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center text-xs text-gray-600 gap-4">
            <p>© 2025 StatStream AI. All rights reserved.</p>
            <p className="flex items-center">
              Designed for Creators with <span className="text-red-500 mx-1">❤️</span> in San Francisco
            </p>
          </div>
        </footer>
      </div>
    </Router>
  );
};

export default App;
