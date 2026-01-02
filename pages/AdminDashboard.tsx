
import React, { useState, useEffect } from 'react';
import { SiteSettings, Post } from '../types';
import { DEFAULT_SETTINGS, DEFAULT_POSTS } from '../constants';

const AdminDashboard: React.FC = () => {
  // Fix: Removed 'connection' tab to comply with guidelines prohibiting API key management in UI.
  const [activeTab, setActiveTab] = useState<'content' | 'posts' | 'leads'>('content');
  const [settings, setSettings] = useState<SiteSettings>(DEFAULT_SETTINGS);
  const [posts, setPosts] = useState<Post[]>(DEFAULT_POSTS);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    // Load settings
    const storedSettings = localStorage.getItem('statstream_settings');
    if (storedSettings) setSettings(JSON.parse(storedSettings));
  }, []);

  const handleSaveSettings = () => {
    localStorage.setItem('statstream_settings', JSON.stringify(settings));
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleLogout = () => {
    localStorage.removeItem('admin_session');
    window.location.reload();
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
              {activeTab + ' Management'}
            </h2>
          </div>
          <div className="flex items-center space-x-4">
            <a href="/" target="_blank" className="text-xs font-bold text-gray-500 hover:text-white transition-colors bg-white/5 px-4 py-2 rounded-lg">View Live Site ↗</a>
            <button 
              onClick={handleSaveSettings}
              className="bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded-lg font-bold transition-all shadow-lg"
            >
              {saved ? 'Saved!' : 'Save Content'}
            </button>
          </div>
        </div>

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
