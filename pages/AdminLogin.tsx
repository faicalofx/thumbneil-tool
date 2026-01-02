
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

interface AdminLoginProps {
  onLogin: () => void;
}

const AdminLogin: React.FC<AdminLoginProps> = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === 'admin' && password === '01010112') {
      localStorage.setItem('admin_session', 'true');
      onLogin();
    } else {
      setError('Invalid credentials. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center px-4">
      <div className="max-w-md w-full glass p-8 rounded-[32px] border-white/10 shadow-2xl">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center font-bold text-white text-3xl shadow-lg shadow-blue-600/20 mx-auto mb-4">S</div>
          <h1 className="text-2xl font-black">Admin Access</h1>
          <p className="text-gray-500 text-sm mt-2">Enter credentials to manage StatStream AI</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">Username</label>
            <input 
              required 
              type="text" 
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full bg-gray-900 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-blue-500 transition-all text-white" 
              placeholder="Username"
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">Password</label>
            <input 
              required 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-gray-900 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-blue-500 transition-all text-white" 
              placeholder="••••••••"
            />
          </div>

          {error && <p className="text-red-400 text-xs font-medium animate-pulse">{error}</p>}

          <button className="w-full bg-blue-600 py-4 rounded-xl font-bold hover:bg-blue-700 transition-all active:scale-95 shadow-lg shadow-blue-600/10">
            Authorize Session
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-white/5 text-center">
          <Link to="/" className="text-xs text-gray-600 hover:text-gray-400 transition-colors">Return to Homepage</Link>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
