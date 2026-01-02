
import React from 'react';

const HeatmapSimulation: React.FC = () => {
  return (
    <div className="relative w-full h-full bg-gray-900 overflow-hidden group">
      {/* Base Thumbnail Mockup */}
      <div className="absolute inset-0 flex items-center justify-center p-4">
        <div className="w-full h-full bg-gray-800 rounded-xl border border-white/5 flex items-center justify-center relative">
          <div className="text-4xl">🎮</div>
          <div className="absolute bottom-4 left-4 right-4 h-4 bg-gray-700 rounded-full w-2/3"></div>
          <div className="absolute top-4 right-4 w-12 h-12 rounded-full bg-gray-700"></div>
        </div>
      </div>

      {/* Heatmap Overlays (Simulating Focal Points) */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Primary Focal Point (Face/Subject) */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-red-500/40 blur-[40px] rounded-full animate-pulse"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 bg-orange-400/50 blur-[20px] rounded-full"></div>
        
        {/* Secondary Focal Point (Text/Hook) */}
        <div className="absolute bottom-1/4 left-1/3 w-32 h-20 bg-yellow-500/30 blur-[30px] rounded-full animate-bounce [animation-duration:3s]"></div>
        
        {/* Eye Path (Saccades) */}
        <svg className="absolute inset-0 w-full h-full opacity-30" viewBox="0 0 400 225">
          <path 
            d="M 50 50 L 200 110 L 120 160 L 300 180" 
            fill="none" 
            stroke="#60a5fa" 
            strokeWidth="2" 
            strokeDasharray="4 4"
            className="animate-[dash_5s_linear_infinite]"
          />
          <circle cx="50" cy="50" r="3" fill="#60a5fa" />
          <circle cx="200" cy="110" r="3" fill="#60a5fa" />
          <circle cx="120" cy="160" r="3" fill="#60a5fa" />
          <circle cx="300" cy="180" r="3" fill="#60a5fa" />
        </svg>
      </div>

      {/* Scanning Line */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-500/10 to-transparent h-1 w-full top-0 animate-[scan_4s_linear_infinite]"></div>

      {/* Stats Overlay */}
      <div className="absolute top-4 left-4 glass p-2 rounded-lg border-white/10 scale-75 origin-top-left">
        <div className="text-[10px] text-gray-500 font-mono">DWELL_TIME</div>
        <div className="text-xs font-bold text-blue-400">142ms</div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes scan {
          0% { top: -10%; }
          100% { top: 110%; }
        }
        @keyframes dash {
          to { stroke-dashoffset: -20; }
        }
      `}} />

      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-black/40 backdrop-blur-sm">
        <div className="text-white text-sm font-bold bg-blue-600 px-4 py-2 rounded-full shadow-xl">
          Live Eye-Tracking Simulation
        </div>
      </div>
    </div>
  );
};

const HowItWorks: React.FC = () => {
  return (
    <div className="pt-32 pb-20 max-w-5xl mx-auto px-4">
      <div className="text-center mb-16 space-y-4">
        <h1 className="text-5xl font-black">The Science of <span className="text-blue-500">The Click</span></h1>
        <p className="text-gray-400 text-xl max-w-2xl mx-auto">Why 200 milliseconds determines the fate of your video.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-8 space-y-12">
          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-white">1. Eye-Tracking & Focal Points</h2>
            <p className="text-gray-400 leading-relaxed">
              When a user scrolls through a YouTube feed, their eyes don't read; they scan. StatStream AI simulates <strong>Saccadic movements</strong> to identify where the eye lands first. If your focal point isn't clear within 100ms, the viewer has already scrolled past.
            </p>
            <div className="aspect-video bg-gray-900 rounded-3xl border border-white/5 overflow-hidden shadow-2xl relative">
              <HeatmapSimulation />
              <div className="absolute bottom-4 right-4 bg-black/60 backdrop-blur px-3 py-1 rounded text-[10px] uppercase tracking-tighter text-gray-400 font-mono border border-white/5">
                Visual Simulation: Heatmap Data Visualization
              </div>
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-white">2. Semantic Satiation & Saturation</h2>
            <p className="text-gray-400 leading-relaxed">
              Color theory plays a vital role. In 2026, "YouTube Red" text actually has lower engagement because of visual fatigue. We analyze your thumbnail's palette against the standard YouTube UI background to ensure maximum <strong>pop</strong>.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-white">3. The Curiosity Gap Algorithm</h2>
            <p className="text-gray-400 leading-relaxed">
              Our AI evaluates the "story" being told. A winning thumbnail presents a problem or a curiosity that can only be solved by clicking. We measure the delta between the thumbnail's promise and the title's delivery.
            </p>
          </section>
        </div>

        <div className="lg:col-span-4 space-y-6">
          <div className="p-6 glass rounded-2xl border-white/10 sticky top-24">
            <h3 className="font-bold text-lg mb-4">CTR Checklist</h3>
            <ul className="space-y-3 text-sm text-gray-400">
              <li className="flex items-center"><span className="text-green-500 mr-2">✓</span> High brightness on faces</li>
              <li className="flex items-center"><span className="text-green-500 mr-2">✓</span> Rule of thirds alignment</li>
              <li className="flex items-center"><span className="text-green-500 mr-2">✓</span> Title under 50 characters</li>
              <li className="flex items-center"><span className="text-green-500 mr-2">✓</span> No overlapping UI elements</li>
              <li className="flex items-center"><span className="text-green-500 mr-2">✓</span> Mobile-first text size</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;
