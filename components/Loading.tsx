import React from 'react';
import { Leaf } from 'lucide-react';

const Loading: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] w-full p-8 text-center animate-pulse">
      <div className="relative">
        <Leaf className="w-16 h-16 text-emerald-500 animate-bounce" />
        <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-8 h-1 bg-emerald-200 rounded-full opacity-50 blur-sm"></div>
      </div>
      <h3 className="mt-6 text-2xl font-semibold text-emerald-900">Curating your eco-journey...</h3>
      <p className="mt-2 text-emerald-700/80">Locating artisanal workshops and carbon-neutral paths.</p>
    </div>
  );
};

export default Loading;
