import React, { useState } from 'react';
import { Search, MapPin } from 'lucide-react';

interface HeroProps {
  onSearch: (city: string) => void;
  isLoading: boolean;
}

const Hero: React.FC<HeroProps> = ({ onSearch, isLoading }) => {
  const [input, setInput] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      onSearch(input.trim());
    }
  };

  return (
    <div className="relative w-full bg-emerald-900 text-white overflow-hidden rounded-3xl shadow-xl my-4 mx-auto max-w-6xl">
        {/* Abstract Nature Background */}
        <div className="absolute inset-0 opacity-20 pointer-events-none">
             <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                <path d="M0 100 C 20 0 50 0 100 100 Z" fill="#34d399" />
                <path d="M0 100 C 50 20 80 50 100 0 V 100 Z" fill="#064e3b" opacity="0.5"/>
             </svg>
        </div>

        <div className="relative z-10 px-6 py-16 md:py-24 flex flex-col items-center text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-4 tracking-tight">
                Travel <span className="text-emerald-300">Lightly</span>.
            </h1>
            <p className="text-emerald-100 max-w-2xl text-lg md:text-xl mb-8 font-light">
                Discover 3-day low-impact itineraries featuring local artisans, green transport, and eco-conscious stays.
            </p>

            <form onSubmit={handleSubmit} className="w-full max-w-lg relative group">
                <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                    <MapPin className="text-emerald-700 w-5 h-5" />
                </div>
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Where do you want to go?"
                    disabled={isLoading}
                    className="w-full pl-12 pr-14 py-4 rounded-full bg-white text-emerald-900 placeholder-emerald-900/40 outline-none focus:ring-4 focus:ring-emerald-500/30 transition-all shadow-lg text-lg"
                />
                <button 
                    type="submit" 
                    disabled={isLoading || !input.trim()}
                    className="absolute inset-y-1 right-1 bg-emerald-600 hover:bg-emerald-500 text-white p-3 rounded-full transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    <Search className="w-5 h-5" />
                </button>
            </form>

            <div className="mt-6 flex flex-wrap justify-center gap-3 text-sm text-emerald-200">
                <span className="px-3 py-1 bg-emerald-800/50 rounded-full backdrop-blur-sm border border-emerald-700">🌱 Carbon Neutral</span>
                <span className="px-3 py-1 bg-emerald-800/50 rounded-full backdrop-blur-sm border border-emerald-700">🎨 Support Local</span>
                <span className="px-3 py-1 bg-emerald-800/50 rounded-full backdrop-blur-sm border border-emerald-700">♻️ Zero Waste</span>
            </div>
        </div>
    </div>
  );
};

export default Hero;
