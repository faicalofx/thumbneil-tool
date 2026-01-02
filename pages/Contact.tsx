
import React, { useState } from 'react';

const Contact: React.FC = () => {
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => setSent(false), 5000);
  };

  return (
    <div className="pt-32 pb-20 max-w-5xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-16">
      <div className="space-y-8">
        <div>
          <h1 className="text-5xl font-black mb-4">Get in Touch</h1>
          <p className="text-gray-400 text-lg">Have questions about our Pro plans or need a custom API integration? We're here to help.</p>
        </div>

        <div className="space-y-6">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 glass rounded-xl flex items-center justify-center text-xl">📧</div>
            <div>
              <p className="text-sm text-gray-500">Email Support</p>
              <p className="font-bold">support@statstream.ai</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 glass rounded-xl flex items-center justify-center text-xl">💬</div>
            <div>
              <p className="text-sm text-gray-500">Discord Community</p>
              <p className="font-bold">discord.gg/statstream</p>
            </div>
          </div>
        </div>
      </div>

      <div className="glass p-8 rounded-[32px] border-white/10 relative">
        {sent ? (
          <div className="h-full flex flex-col items-center justify-center text-center space-y-4 animate-in fade-in zoom-in">
            <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center text-4xl">✅</div>
            <h3 className="text-2xl font-bold">Message Sent!</h3>
            <p className="text-gray-400">We'll get back to you within 24 hours.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">First Name</label>
                <input required type="text" className="w-full bg-gray-800/50 border border-gray-700 rounded-xl px-4 py-3 focus:outline-none focus:border-blue-500" />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">Last Name</label>
                <input required type="text" className="w-full bg-gray-800/50 border border-gray-700 rounded-xl px-4 py-3 focus:outline-none focus:border-blue-500" />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">Email Address</label>
              <input required type="email" className="w-full bg-gray-800/50 border border-gray-700 rounded-xl px-4 py-3 focus:outline-none focus:border-blue-500" />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">Message</label>
              <textarea required rows={4} className="w-full bg-gray-800/50 border border-gray-700 rounded-xl px-4 py-3 focus:outline-none focus:border-blue-500 resize-none"></textarea>
            </div>
            <button className="w-full bg-blue-600 py-4 rounded-xl font-bold hover:bg-blue-700 transition-all mt-4">
              Send Message
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default Contact;
