
import React, { useEffect } from 'react';
import ThumbnailSimulator from '../components/ThumbnailSimulator';
import { FAQS } from '../constants';
import { useLocation } from 'react-router-dom';

const Home: React.FC = () => {
  const location = useLocation();

  useEffect(() => {
    // If we land on home with a specific hash or from another page, ensure top
    if (!window.location.hash) {
      window.scrollTo(0, 0);
    }
  }, [location]);

  const scrollToSimulator = () => {
    const el = document.getElementById('simulator-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="pt-24 pb-20 overflow-x-hidden">
      {/* Hero */}
      <section className="relative px-4 py-20 text-center">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-blue-600/20 blur-[120px] -z-10 rounded-full"></div>
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-semibold mb-4">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
            </span>
            <span>Gemini-Powered CTR Prediction Engine</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-black tracking-tight leading-tight">
            Stop Guessing. <br />
            <span className="gradient-text">Master Your CTR.</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto font-medium">
            Upload your designs, simulate human visual focus, and predict which thumbnail will win the click before you ever hit publish.
          </p>
          <div className="pt-6">
            <button 
              onClick={scrollToSimulator}
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-full font-bold text-lg transition-all shadow-xl shadow-blue-600/20 active:scale-95 transform hover:-translate-y-1"
            >
              Start Analyzing Now
            </button>
          </div>
        </div>
      </section>

      {/* Simulator Section */}
      <section className="px-4 py-12 scroll-mt-24" id="simulator-section">
        <ThumbnailSimulator />
      </section>

      {/* Features */}
      <section className="max-w-7xl mx-auto px-4 py-32 grid grid-cols-1 md:grid-cols-3 gap-12">
        <div className="space-y-4">
          <div className="w-12 h-12 bg-blue-600/10 rounded-xl flex items-center justify-center text-2xl">⚡</div>
          <h3 className="text-xl font-bold">Clinical Precision</h3>
          <p className="text-gray-400">Analyzes color balance, focal weights, and text contrast with sub-pixel accuracy.</p>
        </div>
        <div className="space-y-4">
          <div className="w-12 h-12 bg-purple-600/10 rounded-xl flex items-center justify-center text-2xl">🧠</div>
          <h3 className="text-xl font-bold">Psychological Hooks</h3>
          <p className="text-gray-400">Understands human curiosity gaps and emotional triggers that drive intent.</p>
        </div>
        <div className="space-y-4">
          <div className="w-12 h-12 bg-pink-600/10 rounded-xl flex items-center justify-center text-2xl">📊</div>
          <h3 className="text-xl font-bold">Historical Data</h3>
          <p className="text-gray-400">Trained on 5M+ viral thumbnails across 40 niches to spot winning patterns.</p>
        </div>
      </section>

      {/* FAQ */}
      <section className="max-w-4xl mx-auto px-4 py-20">
        <h2 className="text-3xl font-bold mb-12 text-center">Frequently Asked Questions</h2>
        <div className="space-y-6">
          {FAQS.map((faq, i) => (
            <div key={i} className="p-6 glass rounded-2xl border-white/5">
              <h4 className="font-bold text-lg mb-2">{faq.question}</h4>
              <p className="text-gray-400">{faq.answer}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Block */}
      <section className="max-w-5xl mx-auto px-4 py-20">
        <div className="p-12 glass rounded-[40px] border-white/10 text-center relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/10 blur-[80px] -z-10 group-hover:bg-purple-500/20 transition-all duration-700"></div>
          <h2 className="text-4xl font-bold mb-6">Ready to explode your channel?</h2>
          <p className="text-gray-400 mb-8 max-w-xl mx-auto">Join 12,000+ creators who use StatStream to turn their ideas into clicks.</p>
          <button 
            onClick={scrollToSimulator}
            className="bg-white text-black px-10 py-4 rounded-full font-black text-lg hover:scale-105 transition-all shadow-xl shadow-white/5 active:scale-95"
          >
            Get Started for Free
          </button>
        </div>
      </section>
    </div>
  );
};

export default Home;
