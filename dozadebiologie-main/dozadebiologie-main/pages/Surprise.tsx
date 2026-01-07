
import React from 'react';
import { Link } from 'react-router-dom';

const Surprise: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Background Glows */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-[120px] animate-pulse"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-[120px] animate-pulse delay-700"></div>

      <div className="z-10 w-full max-w-md flex flex-col items-center animate-zoom">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-white mb-2 tracking-tight">Te iubesc tare soție! ❤️</h1>
          
        </div>

        {/* YouTube Short Container */}
        <div className="relative w-full aspect-[9/16] bg-black rounded-[32px] overflow-hidden shadow-[0_0_50px_rgba(168,85,247,0.4)] border-4 border-white/10">
          <iframe
            className="w-full h-full"
            src="https://www.youtube.com/embed/2S52dhBwd6g?autoplay=1&modestbranding=1&rel=0"
            title="Surpriza dozadebiologie"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          ></iframe>
        </div>

        <Link 
          to="/" 
          className="mt-12 group flex items-center gap-3 text-white/50 hover:text-white transition-all font-bold text-xs uppercase tracking-[0.3em]"
        >
          <svg className="w-4 h-4 transform group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Înapoi la studiu
        </Link>
      </div>
    </div>
  );
};

export default Surprise;
