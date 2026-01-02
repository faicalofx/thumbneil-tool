
import React, { useState, useEffect } from 'react';
import { SiteSettings, Post } from '../types';
import { DEFAULT_SETTINGS, DEFAULT_POSTS } from '../constants';
import { GoogleGenAI } from "@google/genai";

interface ApiLog {
  id: string;
  action: string;
  status: 'SUCCESS' | 'ERROR';
  timestamp: string;
}

const AdminDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'content' | 'posts' | 'leads' | 'connection'>('connection');
  const [settings, setSettings] = useState<SiteSettings>(DEFAULT_SETTINGS);
  const [posts, setPosts] = useState<Post[]>(DEFAULT_POSTS);
  const [saved, setSaved] = useState(false);
  const [isApiKeySelected, setIsApiKeySelected] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState<'idle' | 'testing' | 'success' | 'error'>('idle');
  const [apiLogs, setApiLogs] = useState<ApiLog[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem('statstream_settings');
    if (stored) setSettings(JSON.parse(stored));
    
    const checkKey = async () => {
      if (window.aistudio?.hasSelectedApiKey) {
        const hasKey = await window.aistudio.hasSelectedApiKey();
        setIsApiKeySelected(hasKey);
      }
    };
    checkKey();
    
    // Load some mock logs for the "Project Working" visual
    setApiLogs([
      { id: '1', action: 'Thumbnail Analysis', status: 'SUCCESS', timestamp: '2 mins ago' },
      { id: '2', action: 'Eye-Tracking Simulation', status: 'SUCCESS', timestamp: '15 mins ago' },
      { id: '3', action: 'CTR Prediction', status: 'ERROR', timestamp: '1 hour ago' },
    ]);
  }, []);

  const handleSave = () => {
    localStorage.setItem('statstream_settings', JSON.stringify(settings));
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleLogout = () => {
    localStorage.removeItem('admin_session');
    window.location.reload();
  };

  const handleConfigureKey = async () => {
    if (window.aistudio?.openSelectKey) {
      await window.aistudio.openSelectKey();
      setIsApiKeySelected(true);
    } else {
      alert("API Key selection is only available in supported AI Studio environments.");
    }
  };

  const testConnection = async () => {
    setConnectionStatus('testing');
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: 'ping health check',
      });
      if (response.text) {
        setConnectionStatus('success');
        setApiLogs([{ id: Date.now().toString(), action: 'System Health Check', status: 'SUCCESS', timestamp: 'Just now' }, ...apiLogs]);
      }
    } catch (error) {
      console.error(error);
      setConnectionStatus('error');
      setApiLogs([{ id: Date.now().toString(), action: 'System Health Check', status: 'ERROR', timestamp: 'Just now' }, ...apiLogs]);
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 flex text-gray-200">
      {/* Sidebar */}
      <div className="w-64 border-r border-white/5 p-6 space-y-8 flex-shrink-0 bg-gray-900/50">
        <div className="flex items-center space-x-2 mb-10">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center font-bold text-white shadow-lg">S</div>
          <span className="font-bold tracking-tight">Admin <span className="text-blue-500 font-black">STATION</span></span>
        </div>
        
        <nav className="space-y-2">
          <button 
            onClick={() => setActiveTab('connection')}
            className={`w-full text-left px-4 py-3 rounded-xl transition-all flex items-center space-x-3 ${activeTab === 'connection' ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20' : 'text-gray-400 hover:bg-white/5'}`}
          >
            <span className="text-lg">🔌</span>
            <span className="font-medium">API & Connection</span>
          </button>
          <button 
            onClick={() => setActiveTab('content')}
            className={`w-full text-left px-4 py-3 rounded-xl transition-all flex items-center space-x-3 ${activeTab === 'content' ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20' : 'text-gray-400 hover:bg-white/5'}`}
          >
            <span className="text-lg">🏠</span>
            <span className="font-medium">Site Content</span>
          </button>
          <button 
            onClick={() => setActiveTab('posts')}
            className={`w-full text-left px-4 py-3 rounded-xl transition-all flex items-center space-x-3 ${activeTab === 'posts' ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20' : 'text-gray-400 hover:bg-white/5'}`}
          >
            <span className="text-lg">📝</span>
            <span className="font-medium">Blog Posts</span>
          </button>
          <button 
            onClick={() => setActiveTab('leads')}
            className={`w-full text-left px-4 py-3 rounded-xl transition-all flex items-center space-x-3 ${activeTab === 'leads' ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20' : 'text-gray-400 hover:bg-white/5'}`}
          >
            <span className="text-lg">📥</span>
            <span className="font-medium">Submissions</span>
          </button>
        </nav>

        <div className="pt-10 border-t border-white/5">
          <button 
            onClick={handleLogout}
            className="text-xs text-gray-600 hover:text-red-400 transition-colors flex items-center group"
          >
            <span className="mr-2 group-hover:rotate-12 transition-transform">🚪</span> Logout Securely
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-10 overflow-y-auto">
        <div className="flex justify-between items-center mb-10">
          <div>
            <h2 className="text-3xl font-black capitalize">
              {activeTab === 'connection' ? 'System Infrastructure' : activeTab + ' Management'}
            </h2>
            <p className="text-gray-500 text-sm">Real-time control over StatStream AI engines and content.</p>
          </div>
          <div className="flex items-center space-x-4">
            <a href="/" target="_blank" className="text-sm font-bold text-gray-500 hover:text-white transition-colors bg-white/5 px-4 py-2 rounded-lg">View Live Site ↗</a>
            {activeTab !== 'connection' && (
              <button 
                onClick={handleSave}
                className="bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded-lg font-bold transition-all shadow-lg shadow-blue-600/20 active:scale-95"
              >
                {saved ? 'Changes Saved' : 'Update Content'}
              </button>
            )}
          </div>
        </div>

        {activeTab === 'connection' && (
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
            {/* Connection Control Card */}
            <div className="xl:col-span-2 space-y-8">
              <div className="glass p-8 rounded-[32px] border-white/10 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/10 blur-3xl -z-10"></div>
                
                <div className="flex items-center justify-between mb-10">
                  <div className="flex items-center space-x-4">
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-2xl ${isApiKeySelected ? 'bg-green-500/10 text-green-400' : 'bg-red-500/10 text-red-400'}`}>
                      {isApiKeySelected ? '✅' : '⚠️'}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold">GenAI Project Connection</h3>
                      <p className="text-sm text-gray-500">Google Gemini 3.0 Pro Integration</p>
                    </div>
                  </div>
                  <div className={`px-4 py-1.5 rounded-full text-xs font-black flex items-center space-x-2 border ${isApiKeySelected ? 'bg-green-500/5 text-green-400 border-green-500/20' : 'bg-red-500/5 text-red-400 border-red-500/20'}`}>
                    <span className={`w-2 h-2 rounded-full ${isApiKeySelected ? 'bg-green-400 animate-pulse' : 'bg-red-400'}`}></span>
                    <span>{isApiKeySelected ? 'STATUS: ACTIVE' : 'STATUS: DISCONNECTED'}</span>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="p-6 bg-gray-950/50 border border-white/5 rounded-2xl">
                    <div className="flex justify-between items-center mb-4">
                      <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">Selected API Key</label>
                      <span className="text-[10px] bg-blue-600/10 text-blue-400 px-2 py-0.5 rounded uppercase font-black">Managed by Platform</span>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="flex-1 bg-black/40 rounded-xl px-4 py-3 font-mono text-sm text-gray-500 border border-white/5">
                        {isApiKeySelected ? '••••••••••••••••••••••••••••••••' : 'No key selected. Click configure to link.'}
                      </div>
                      <button 
                        onClick={handleConfigureKey}
                        className="bg-white text-black px-6 py-3 rounded-xl font-black text-sm hover:scale-105 transition-all shadow-xl shadow-white/5 active:scale-95"
                      >
                        {isApiKeySelected ? 'Change Key' : 'Configure Connection'}
                      </button>
                    </div>
                  </div>

                  <div className="pt-6 flex items-center justify-between">
                    <button 
                      onClick={testConnection}
                      disabled={connectionStatus === 'testing' || !isApiKeySelected}
                      className={`text-sm font-bold flex items-center px-4 py-2 rounded-lg transition-all ${
                        connectionStatus === 'testing' ? 'text-gray-500' : 'text-blue-400 hover:bg-blue-400/10'
                      }`}
                    >
                      <span className="mr-2">⚡</span>
                      {connectionStatus === 'testing' ? 'Running Diagnostics...' : 'Test Project Health'}
                    </button>
                    
                    <div className="flex items-center space-x-4">
                       {connectionStatus === 'success' && <span className="text-xs text-green-400 font-black animate-in fade-in zoom-in uppercase">✓ Project Working Correctly</span>}
                       {connectionStatus === 'error' && <span className="text-xs text-red-400 font-black animate-in fade-in zoom-in uppercase">✕ Project Failure: Check Billing</span>}
                       <a href="https://ai.google.dev/gemini-api/docs/billing" target="_blank" className="text-xs text-gray-600 hover:text-white transition-colors">Billing Docs ↗</a>
                    </div>
                  </div>
                </div>
              </div>

              {/* API Traffic Log */}
              <div className="glass p-8 rounded-[32px] border-white/10">
                <h3 className="text-lg font-bold mb-6 flex items-center">
                  <span className="mr-2">📡</span> Recent Traffic & Logs
                </h3>
                <div className="space-y-3">
                  {apiLogs.map(log => (
                    <div key={log.id} className="flex items-center justify-between p-4 bg-black/40 rounded-xl border border-white/5 group hover:border-blue-500/30 transition-all">
                      <div className="flex items-center space-x-4">
                        <div className={`w-2 h-2 rounded-full ${log.status === 'SUCCESS' ? 'bg-green-500' : 'bg-red-500'}`}></div>
                        <div>
                          <p className="text-sm font-bold">{log.action}</p>
                          <p className="text-[10px] text-gray-600 uppercase font-mono">{log.timestamp}</p>
                        </div>
                      </div>
                      <span className={`text-[10px] font-black px-2 py-0.5 rounded ${log.status === 'SUCCESS' ? 'bg-green-500/10 text-green-400' : 'bg-red-500/10 text-red-400'}`}>
                        {log.status}
                      </span>
                    </div>
                  ))}
                  {apiLogs.length === 0 && <p className="text-center text-gray-600 py-10 text-sm">No activity recorded yet.</p>}
                </div>
              </div>
            </div>

            {/* Sidebar Stats */}
            <div className="space-y-8">
              <div className="glass p-6 rounded-[24px] border-white/5 bg-blue-600/5">
                <h4 className="text-xs font-black text-blue-500 uppercase tracking-widest mb-4">Project Overview</h4>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-gray-400">Total API Calls</span>
                    <span className="font-mono text-sm font-bold">1,492</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-gray-400">Avg Response Time</span>
                    <span className="font-mono text-sm font-bold">1.2s</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-gray-400">Success Rate</span>
                    <span className="font-mono text-sm font-bold text-green-400">99.8%</span>
                  </div>
                </div>
              </div>

              <div className="glass p-6 rounded-[24px] border-white/5">
                <h4 className="text-xs font-black text-gray-500 uppercase tracking-widest mb-4">Optimization Tips</h4>
                <ul className="text-xs text-gray-500 space-y-3">
                  <li className="flex items-start">
                    <span className="mr-2 text-blue-500">✦</span>
                    Use Gemini 3 Pro for high-precision thumbnail analysis.
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2 text-blue-500">✦</span>
                    Keep images under 4MB for faster processing.
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2 text-blue-500">✦</span>
                    Check your Google Cloud usage regularly to avoid throttling.
                  </li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'content' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-6 glass p-8 rounded-3xl border-white/5">
              <h3 className="text-xl font-bold mb-4">Hero Section Branding</h3>
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">Main Headline</label>
                  <input 
                    className="w-full bg-black/60 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-blue-500 text-white font-medium" 
                    value={settings.heroHeadline}
                    onChange={e => setSettings({...settings, heroHeadline: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">Value Proposition</label>
                  <textarea 
                    rows={4}
                    className="w-full bg-black/60 border border-white/10 rounded-xl px-4 py-3 focus:outline-none resize-none focus:border-blue-500 text-gray-300 leading-relaxed" 
                    value={settings.heroSubline}
                    onChange={e => setSettings({...settings, heroSubline: e.target.value})}
                  />
                </div>
              </div>
            </div>

            <div className="space-y-6 glass p-8 rounded-3xl border-white/5">
              <h3 className="text-xl font-bold mb-4">Feature Toggles</h3>
              <div className="space-y-4">
                {[
                  { label: 'Hero Visibility', key: 'showHero', desc: 'Main intro and simulator' },
                  { label: 'Analysis Features', key: 'showFeatures', desc: 'The 3-column feature grid' },
                  { label: 'Testimonials', key: 'showSocialProof', desc: 'Trust indicators' },
                  { label: 'FAQ Block', key: 'showFAQ', desc: 'Frequently asked questions' }
                ].map(item => (
                  <div key={item.label} className="flex justify-between items-center p-4 bg-gray-950/40 rounded-xl border border-white/5 hover:border-white/10 transition-colors">
                    <div>
                      <p className="font-bold text-sm">{item.label}</p>
                      <p className="text-[10px] text-gray-600 uppercase font-bold tracking-tighter">{item.desc}</p>
                    </div>
                    <button 
                      onClick={() => setSettings({...settings, [item.key as any]: !((settings as any)[item.key])})}
                      className={`w-12 h-6 rounded-full transition-all relative ${((settings as any)[item.key]) ? 'bg-blue-600 shadow-lg shadow-blue-600/30' : 'bg-gray-800'}`}
                    >
                      <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all duration-300 ${((settings as any)[item.key]) ? 'right-1' : 'left-1'}`}></div>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'posts' && (
          <div className="space-y-4">
            {posts.map(post => (
              <div key={post.id} className="glass p-6 rounded-2xl border-white/5 flex items-center justify-between group hover:border-blue-500/20 transition-all">
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-12 bg-gray-800 rounded-lg overflow-hidden border border-white/5">
                    <img src={post.image} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <h4 className="font-bold group-hover:text-blue-400 transition-colors">{post.title}</h4>
                    <p className="text-xs text-gray-500">{post.category} • {post.date} • By {post.author}</p>
                  </div>
                </div>
                <div className="flex space-x-2 opacity-0 group-hover:opacity-100 transition-all transform translate-x-4 group-hover:translate-x-0">
                  <button className="px-4 py-2 hover:bg-blue-500/20 rounded-lg text-blue-400 text-sm font-bold">Edit</button>
                  <button className="px-4 py-2 hover:bg-red-500/20 rounded-lg text-red-400 text-sm font-bold">Delete</button>
                </div>
              </div>
            ))}
            <button className="w-full py-10 border-2 border-dashed border-white/5 rounded-2xl text-gray-600 hover:border-blue-500/30 hover:text-blue-500 transition-all flex flex-col items-center justify-center space-y-2 group">
              <span className="text-3xl group-hover:scale-125 transition-transform">➕</span>
              <span className="font-bold">Create New Masterclass Post</span>
            </button>
          </div>
        )}

        {activeTab === 'leads' && (
          <div className="glass rounded-[32px] overflow-hidden border-white/10">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-white/10 bg-white/5">
                  <th className="px-8 py-6 text-xs font-black text-gray-500 uppercase tracking-widest">Received</th>
                  <th className="px-8 py-6 text-xs font-black text-gray-500 uppercase tracking-widest">Sender</th>
                  <th className="px-8 py-6 text-xs font-black text-gray-500 uppercase tracking-widest">Email</th>
                  <th className="px-8 py-6 text-xs font-black text-gray-500 uppercase tracking-widest">Inquiry Content</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {[1, 2, 3].map(i => (
                  <tr key={i} className="hover:bg-white/5 transition-colors">
                    <td className="px-8 py-6 text-sm text-gray-500 font-mono italic">OCT {24 + i}, 2025</td>
                    <td className="px-8 py-6 text-sm font-bold text-white">Client Alpha {i}</td>
                    <td className="px-8 py-6 text-sm text-blue-400 font-medium">contact_{i}@creator.net</td>
                    <td className="px-8 py-6 text-sm text-gray-400 leading-relaxed truncate max-w-xs">Interested in bulk processing 500+ thumbnails per month for our agency.</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
