
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
  const [manualApiKey, setManualApiKey] = useState('');
  const [connectionStatus, setConnectionStatus] = useState<'idle' | 'testing' | 'success' | 'error'>('idle');
  const [apiLogs, setApiLogs] = useState<ApiLog[]>([]);

  // Netlify ENV Key check
  const envKeyExists = !!process.env.API_KEY;

  useEffect(() => {
    // Load settings
    const storedSettings = localStorage.getItem('statstream_settings');
    if (storedSettings) setSettings(JSON.parse(storedSettings));
    
    // Load manual API key
    const storedKey = localStorage.getItem('manual_api_key');
    if (storedKey) setManualApiKey(storedKey);
    
    // Initial logs
    setApiLogs([
      { id: '1', action: 'System Initialization', status: 'SUCCESS', timestamp: 'Online' },
    ]);
  }, []);

  const handleSaveSettings = () => {
    localStorage.setItem('statstream_settings', JSON.stringify(settings));
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleSaveKey = () => {
    localStorage.setItem('manual_api_key', manualApiKey);
    alert("API Key updated and saved locally.");
  };

  const handleClearKey = () => {
    localStorage.removeItem('manual_api_key');
    setManualApiKey('');
    alert("API Key cleared.");
  };

  const handleLogout = () => {
    localStorage.removeItem('admin_session');
    window.location.reload();
  };

  const testConnection = async () => {
    setConnectionStatus('testing');
    try {
      const keyToUse = manualApiKey || process.env.API_KEY || '';
      const ai = new GoogleGenAI({ apiKey: keyToUse });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: 'ping',
      });
      if (response.text) {
        setConnectionStatus('success');
        setApiLogs([{ id: Date.now().toString(), action: 'Health Check', status: 'SUCCESS', timestamp: 'Just now' }, ...apiLogs]);
      }
    } catch (error) {
      console.error(error);
      setConnectionStatus('error');
      setApiLogs([{ id: Date.now().toString(), action: 'Health Check', status: 'ERROR', timestamp: 'Just now' }, ...apiLogs]);
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 flex text-gray-200">
      {/* Sidebar */}
      <div className="w-64 border-r border-white/5 p-6 space-y-8 flex-shrink-0 bg-gray-900/50">
        <div className="flex items-center space-x-2 mb-10">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center font-bold text-white shadow-lg">S</div>
          <span className="font-bold tracking-tight">Admin <span className="text-blue-500 font-black">CENTER</span></span>
        </div>
        
        <nav className="space-y-2">
          <button 
            onClick={() => setActiveTab('connection')}
            className={`w-full text-left px-4 py-3 rounded-xl transition-all flex items-center space-x-3 ${activeTab === 'connection' ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20' : 'text-gray-400 hover:bg-white/5'}`}
          >
            <span className="text-lg">🔌</span>
            <span className="font-medium text-sm">API Connection</span>
          </button>
          <button 
            onClick={() => setActiveTab('content')}
            className={`w-full text-left px-4 py-3 rounded-xl transition-all flex items-center space-x-3 ${activeTab === 'content' ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20' : 'text-gray-400 hover:bg-white/5'}`}
          >
            <span className="text-lg">🏠</span>
            <span className="font-medium text-sm">Site CMS</span>
          </button>
          <button 
            onClick={() => setActiveTab('posts')}
            className={`w-full text-left px-4 py-3 rounded-xl transition-all flex items-center space-x-3 ${activeTab === 'posts' ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20' : 'text-gray-400 hover:bg-white/5'}`}
          >
            <span className="text-lg">📝</span>
            <span className="font-medium text-sm">Blog Posts</span>
          </button>
          <button 
            onClick={() => setActiveTab('leads')}
            className={`w-full text-left px-4 py-3 rounded-xl transition-all flex items-center space-x-3 ${activeTab === 'leads' ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20' : 'text-gray-400 hover:bg-white/5'}`}
          >
            <span className="text-lg">📥</span>
            <span className="font-medium text-sm">Leads</span>
          </button>
        </nav>

        <div className="pt-10 border-t border-white/5">
          <button 
            onClick={handleLogout}
            className="text-xs text-gray-600 hover:text-red-400 transition-colors flex items-center group"
          >
            <span className="mr-2">🚪</span> Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-10 overflow-y-auto">
        <div className="flex justify-between items-center mb-10">
          <div>
            <h2 className="text-3xl font-black capitalize">
              {activeTab === 'connection' ? 'API Infrastructure' : activeTab + ' Management'}
            </h2>
          </div>
          <div className="flex items-center space-x-4">
            <a href="/" target="_blank" className="text-xs font-bold text-gray-500 hover:text-white transition-colors bg-white/5 px-4 py-2 rounded-lg">View Live Site ↗</a>
            {activeTab !== 'connection' && (
              <button 
                onClick={handleSaveSettings}
                className="bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded-lg font-bold transition-all shadow-lg"
              >
                {saved ? 'Saved!' : 'Save Content'}
              </button>
            )}
          </div>
        </div>

        {activeTab === 'connection' && (
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
            <div className="xl:col-span-2 space-y-8">
              <div className="glass p-8 rounded-[32px] border-white/10 relative overflow-hidden">
                <div className="flex items-center justify-between mb-8">
                  <div>
                    <h3 className="text-xl font-bold">API Configuration</h3>
                    <p className="text-sm text-gray-500 mt-1">Manual entry overrides environment variables.</p>
                  </div>
                  <div className={`px-4 py-1.5 rounded-full text-[10px] font-black border ${envKeyExists || manualApiKey ? 'bg-green-500/10 text-green-400 border-green-500/20' : 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20'}`}>
                    {manualApiKey ? 'MANUAL KEY ACTIVE' : envKeyExists ? 'NETLIFY ENV ACTIVE' : 'PENDING SETUP'}
                  </div>
                </div>

                <div className="space-y-6">
                  {envKeyExists && !manualApiKey && (
                    <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-xl flex items-center space-x-3">
                      <span className="text-xl">🚀</span>
                      <p className="text-xs text-blue-400 font-medium">
                        Netlify Environment Variable <code className="bg-blue-900/40 px-1 rounded">API_KEY</code> detected. Application is ready.
                      </p>
                    </div>
                  )}

                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Manual Override Key</label>
                    <div className="flex space-x-2">
                      <input 
                        type="password"
                        placeholder="Paste Key (Overrides Env Vars)"
                        className="flex-1 bg-black/60 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-blue-500 text-white font-mono text-sm"
                        value={manualApiKey}
                        onChange={(e) => setManualApiKey(e.target.value)}
                      />
                      <button 
                        onClick={handleSaveKey}
                        className="bg-blue-600 hover:bg-blue-700 px-6 rounded-xl font-bold text-sm transition-all active:scale-95"
                      >
                        Save
                      </button>
                      <button 
                        onClick={handleClearKey}
                        className="bg-gray-800 hover:bg-red-600 px-4 rounded-xl font-bold text-sm transition-all"
                      >
                        🗑️
                      </button>
                    </div>
                  </div>

                  <div className="pt-6 border-t border-white/5 flex items-center justify-between">
                    <button 
                      onClick={testConnection}
                      disabled={connectionStatus === 'testing' || (!manualApiKey && !envKeyExists)}
                      className={`text-sm font-bold flex items-center px-4 py-2 rounded-lg transition-all ${
                        connectionStatus === 'testing' ? 'text-gray-600' : 'text-blue-400 hover:bg-blue-400/10'
                      }`}
                    >
                      <span className="mr-2">⚡</span>
                      {connectionStatus === 'testing' ? 'Testing...' : 'Test Project Health'}
                    </button>
                    
                    <div className="flex items-center space-x-4">
                       {connectionStatus === 'success' && <span className="text-xs text-green-400 font-black uppercase">✓ Project Working</span>}
                       {connectionStatus === 'error' && <span className="text-xs text-red-400 font-black uppercase">✕ Connection Failed</span>}
                       <a href="https://ai.google.dev/gemini-api/docs/api-key" target="_blank" className="text-xs text-gray-600 hover:text-white underline">Get Key ↗</a>
                    </div>
                  </div>
                </div>
              </div>

              <div className="glass p-8 rounded-[32px] border-white/10">
                <h3 className="text-lg font-bold mb-6 flex items-center">
                  <span className="mr-2">📡</span> Infrastructure Logs
                </h3>
                <div className="space-y-3">
                  {apiLogs.map(log => (
                    <div key={log.id} className="flex items-center justify-between p-4 bg-black/20 rounded-xl border border-white/5">
                      <div className="flex items-center space-x-4">
                        <div className={`w-2 h-2 rounded-full ${log.status === 'SUCCESS' ? 'bg-green-500' : 'bg-red-500'}`}></div>
                        <span className="text-sm font-medium">{log.action}</span>
                      </div>
                      <span className="text-[10px] text-gray-600 font-mono uppercase">{log.timestamp}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-8 text-sm">
              <div className="glass p-6 rounded-[24px] border-white/5">
                <h4 className="font-black text-gray-500 uppercase tracking-widest mb-4">Netlify Guide</h4>
                <div className="space-y-4 text-xs text-gray-400 leading-relaxed">
                  <p>1. Go to Netlify Dashboard > Site Settings.</p>
                  <p>2. Select <strong>Environment variables</strong>.</p>
                  <p>3. Add <code className="text-blue-400 font-mono">API_KEY</code> with your Gemini key.</p>
                  <p>4. Trigger a new deploy to activate.</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* CMS, Posts, and Leads tabs follow same structure as before */}
        {activeTab === 'content' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-6 glass p-8 rounded-3xl border-white/5">
              <h3 className="text-xl font-bold mb-4">Hero Content</h3>
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">Main Headline</label>
                  <input 
                    className="w-full bg-black/60 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-blue-500" 
                    value={settings.heroHeadline}
                    onChange={e => setSettings({...settings, heroHeadline: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">Sub-headline</label>
                  <textarea 
                    rows={4}
                    className="w-full bg-black/60 border border-white/10 rounded-xl px-4 py-3 focus:outline-none resize-none focus:border-blue-500" 
                    value={settings.heroSubline}
                    onChange={e => setSettings({...settings, heroSubline: e.target.value})}
                  />
                </div>
              </div>
            </div>

            <div className="space-y-6 glass p-8 rounded-3xl border-white/5">
              <h3 className="text-xl font-bold mb-4">Display Options</h3>
              <div className="space-y-4">
                {[
                  { label: 'Hero Section', key: 'showHero' },
                  { label: 'Features Grid', key: 'showFeatures' },
                  { label: 'Social Proof', key: 'showSocialProof' },
                  { label: 'FAQ Block', key: 'showFAQ' }
                ].map(item => (
                  <div key={item.label} className="flex justify-between items-center p-4 bg-gray-950/40 rounded-xl border border-white/5">
                    <span className="font-bold text-sm">{item.label}</span>
                    <button 
                      onClick={() => setSettings({...settings, [item.key as any]: !((settings as any)[item.key])})}
                      className={`w-12 h-6 rounded-full transition-all relative ${((settings as any)[item.key]) ? 'bg-blue-600' : 'bg-gray-800'}`}
                    >
                      <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${((settings as any)[item.key]) ? 'right-1' : 'left-1'}`}></div>
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
              <div key={post.id} className="glass p-6 rounded-2xl border-white/5 flex items-center justify-between group">
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-12 bg-gray-800 rounded-lg overflow-hidden">
                    <img src={post.image} className="w-full h-full object-cover" />
                  </div>
                  <h4 className="font-bold">{post.title}</h4>
                </div>
                <div className="flex space-x-2 opacity-0 group-hover:opacity-100 transition-all">
                  <button className="px-4 py-2 hover:bg-blue-500/20 rounded-lg text-blue-400 text-xs font-bold">Edit</button>
                </div>
              </div>
            ))}
            <button className="w-full py-10 border-2 border-dashed border-white/5 rounded-2xl text-gray-600 hover:text-blue-500 transition-all font-bold">
              + New Post
            </button>
          </div>
        )}

        {activeTab === 'leads' && (
          <div className="glass rounded-[32px] overflow-hidden border-white/10 text-sm">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-white/10 bg-white/5">
                  <th className="px-8 py-4 text-xs font-black text-gray-500 uppercase tracking-widest">Date</th>
                  <th className="px-8 py-4 text-xs font-black text-gray-500 uppercase tracking-widest">Email</th>
                  <th className="px-8 py-4 text-xs font-black text-gray-500 uppercase tracking-widest">Message</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {[1, 2].map(i => (
                  <tr key={i} className="hover:bg-white/5 transition-colors">
                    <td className="px-8 py-4 text-gray-500">Oct 24, 2025</td>
                    <td className="px-8 py-4 text-blue-400">user_{i}@example.com</td>
                    <td className="px-8 py-4 text-gray-400 truncate max-w-xs">Interested in Pro features.</td>
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
