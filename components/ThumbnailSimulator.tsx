
import React, { useState, useRef } from 'react';
import { analyzeThumbnails } from '../services/geminiService';
import { AnalysisResult } from '../types';

const ThumbnailSimulator: React.FC = () => {
  const [imageA, setImageA] = useState<string | null>(null);
  const [imageB, setImageB] = useState<string | null>(null);
  const [titleA, setTitleA] = useState('');
  const [titleB, setTitleB] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);

  const fileInputA = useRef<HTMLInputElement>(null);
  const fileInputB = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, setImg: (val: string) => void) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setImg(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleAnalyze = async () => {
    if (!imageA || !imageB || !titleA || !titleB) {
      alert("Please upload both images and provide titles for analysis.");
      return;
    }
    setLoading(true);
    try {
      const res = await analyzeThumbnails(imageA, imageB, titleA, titleB);
      setResult(res);
    } catch (err) {
      alert("Analysis failed. Please check your API key or connection.");
    } finally {
      setLoading(false);
    }
  };

  const Card = ({ label, img, setImg, title, setTitle, inputRef, score, ctr }: any) => (
    <div className="flex flex-col space-y-4 p-6 glass rounded-2xl border-white/5 relative overflow-hidden">
      {ctr && (
        <div className="absolute top-4 right-4 flex flex-col items-end">
          <div className="text-2xl font-black text-white">{score}</div>
          <div className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Score</div>
        </div>
      )}
      
      <div className="flex justify-between items-center">
        <h3 className="font-bold text-lg text-gray-400">Version {label}</h3>
      </div>
      
      <div 
        onClick={() => inputRef.current?.click()}
        className="aspect-video bg-gray-900 rounded-xl overflow-hidden border-2 border-dashed border-gray-800 hover:border-blue-500 cursor-pointer transition-all flex items-center justify-center group relative"
      >
        {img ? (
          <>
            <img src={img} alt={`Thumbnail ${label}`} className="w-full h-full object-cover" />
            {ctr && (
              <div className="absolute bottom-3 left-3 px-3 py-1 bg-black/80 backdrop-blur-md rounded-lg border border-white/10 shadow-xl">
                <span className="text-xs text-gray-400 mr-1">Est. CTR</span>
                <span className={`font-black ${ctr > 8 ? 'text-green-400' : ctr > 5 ? 'text-yellow-400' : 'text-red-400'}`}>{ctr}%</span>
              </div>
            )}
          </>
        ) : (
          <div className="text-center">
            <div className="text-4xl mb-2 group-hover:scale-110 transition-transform">🖼️</div>
            <p className="text-sm text-gray-500">Upload Thumbnail {label}</p>
          </div>
        )}
      </div>
      <input 
        type="file" 
        ref={inputRef} 
        className="hidden" 
        accept="image/*" 
        onChange={(e) => handleFileChange(e, setImg)} 
      />

      <input 
        type="text"
        placeholder={`Enter Title for ${label}...`}
        className="bg-gray-800/50 border border-gray-700 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-blue-500 transition-all"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
    </div>
  );

  return (
    <div className="w-full max-w-6xl mx-auto space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card 
          label="A" 
          img={imageA} 
          setImg={setImageA} 
          title={titleA} 
          setTitle={setTitleA} 
          inputRef={fileInputA} 
          score={result?.scoreA} 
          ctr={result?.ctrEstimateA}
        />
        <Card 
          label="B" 
          img={imageB} 
          setImg={setImageB} 
          title={titleB} 
          setTitle={setTitleB} 
          inputRef={fileInputB} 
          score={result?.scoreB} 
          ctr={result?.ctrEstimateB}
        />
      </div>

      <div className="flex flex-col items-center">
        <button
          onClick={handleAnalyze}
          disabled={loading}
          className={`px-12 py-4 rounded-full font-bold text-lg shadow-2xl transition-all ${
            loading 
            ? 'bg-gray-700 cursor-not-allowed opacity-50' 
            : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:scale-105 active:scale-95 shadow-blue-500/20'
          }`}
        >
          {loading ? (
            <span className="flex items-center space-x-2">
              <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <span>Analyzing Pixels...</span>
            </span>
          ) : 'Predict Winner'}
        </button>
      </div>

      {result && (
        <div className="mt-12 p-8 glass rounded-3xl animate-in fade-in slide-in-from-bottom-4 duration-700">
          <div className="flex flex-col md:flex-row gap-8 items-start">
            <div className="flex-1 space-y-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <h2 className="text-3xl font-black mb-2">
                    Winner: <span className="gradient-text">Version {result.winner}</span>
                  </h2>
                  <p className="text-gray-400 leading-relaxed text-lg">
                    {result.reasoning}
                  </p>
                </div>
                <div className="flex space-x-4">
                  <div className="text-center p-4 glass rounded-2xl min-w-[100px] border-blue-500/20 bg-blue-500/5">
                    <div className="text-3xl font-black text-blue-400">{Math.max(result.ctrEstimateA, result.ctrEstimateB)}%</div>
                    <div className="text-[10px] font-bold text-gray-500 uppercase">Max Predicted CTR</div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-4 bg-green-500/5 rounded-xl border border-green-500/10">
                  <h4 className="font-bold text-green-400 mb-3 flex items-center justify-between">
                    <span>Fixes for A</span>
                    <span className="text-xs bg-green-500/10 px-2 py-0.5 rounded">{result.ctrEstimateA}% CTR</span>
                  </h4>
                  <ul className="space-y-2">
                    {result.improvementsA.map((imp, idx) => (
                      <li key={idx} className="text-sm text-gray-300 flex items-start">
                        <span className="mr-2">⚡</span> {imp}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="p-4 bg-purple-500/5 rounded-xl border border-purple-500/10">
                  <h4 className="font-bold text-purple-400 mb-3 flex items-center justify-between">
                    <span>Fixes for B</span>
                    <span className="text-xs bg-purple-500/10 px-2 py-0.5 rounded">{result.ctrEstimateB}% CTR</span>
                  </h4>
                  <ul className="space-y-2">
                    {result.improvementsB.map((imp, idx) => (
                      <li key={idx} className="text-sm text-gray-300 flex items-start">
                        <span className="mr-2">✨</span> {imp}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            <div className="w-full md:w-80 p-6 bg-blue-600/5 rounded-2xl border border-blue-500/10">
              <h4 className="font-bold text-blue-400 mb-4 flex items-center">
                <span className="mr-2">👁️</span> Eye Tracking Focus
              </h4>
              <p className="text-sm text-gray-400 italic">
                {result.eyeTrackingNotes}
              </p>
              <div className="mt-6 pt-6 border-t border-white/5">
                <div className="flex justify-between text-xs text-gray-500 mb-2">
                  <span>AI Confidence</span>
                  <span>92%</span>
                </div>
                <div className="h-1 bg-gray-800 rounded-full overflow-hidden">
                  <div className="h-full bg-blue-500 w-[92%]"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ThumbnailSimulator;
