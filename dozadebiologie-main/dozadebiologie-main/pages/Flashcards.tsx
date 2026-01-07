
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { User } from '../App';

interface FlashcardsProps {
  user: User | null;
}

const chapters = [
  "Celule, țesuturi, organe, sisteme de organe, organism",
  "Celula",
  "Țesuturile",
  "Sistemul nervos",
  "Analizatorii",
  "Glande endocrine",
  "Mișcarea - sistemul osos",
  "Mișcarea - sistemul muscular",
  "Digestia și absorbția",
  "Circulația",
  "Respirația",
  "Excreția",
  "Metabolismul",
  "Funcția de reproducere"
];

const Flashcards: React.FC<FlashcardsProps> = ({ user }) => {
  const navigate = useNavigate();

  const handleChapterClick = (index: number) => {
    if (index !== 0) return; // Doar capitolul 1 este activ
    
    if (!user) {
      navigate('/login');
    } else {
      navigate(`/flashcards/${index + 1}`);
    }
  };

  return (
    <div className="pt-32 pb-20 px-6 max-w-7xl mx-auto">
      <div className="mb-16 animate-fade-up">
        <h2 className="text-4xl lg:text-5xl font-bold mb-4 tracking-tight">Flashcarduri Interactive</h2>
        <p className="text-gray-500 max-w-2xl text-lg">
          Alege un capitol pentru a începe recapitularea prin metoda reamintirii active. Învață eficient și reține materia pe termen lung.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        {chapters.map((chapter, index) => {
          const isAvailable = index === 0;
          return (
            <div 
              key={index} 
              onClick={() => handleChapterClick(index)}
              className={`group relative block p-8 rounded-[32px] border transition-all animate-zoom overflow-hidden ${
                isAvailable 
                ? 'bg-white border-gray-100 cursor-pointer hover:shadow-xl hover:scale-[1.02]' 
                : 'bg-gray-50/50 border-gray-100 cursor-not-allowed opacity-80'
              }`}
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              {/* Overlay pentru utilizatori nelogați pe capitole disponibile */}
              {isAvailable && !user && (
                <div className="absolute inset-0 z-10 bg-black/40 backdrop-blur-[1px] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                   <span className="bg-white text-black px-6 py-3 rounded-full text-xs font-bold shadow-2xl transform scale-90 group-hover:scale-100 transition-transform">
                      Necesită Logare
                   </span>
                </div>
              )}

              <div className="flex flex-col h-full">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex gap-2">
                    <span className={`text-[10px] font-bold uppercase tracking-[0.2em] px-3 py-1.5 rounded-full ${
                        isAvailable ? 'bg-blue-50 text-blue-600' : 'bg-gray-100 text-gray-400'
                    }`}>
                      Capitolul {index + 1}
                    </span>
                    {!isAvailable && (
                        <span className="bg-amber-50 text-amber-600 text-[10px] font-bold uppercase tracking-[0.2em] px-3 py-1.5 rounded-full">
                            În curând
                        </span>
                    )}
                  </div>
                  {isAvailable && (
                    <div className="w-10 h-10 bg-[#72f68b]/10 rounded-full flex items-center justify-center text-[#2ecc71] opacity-0 group-hover:opacity-100 transition-opacity">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  )}
                </div>
                
                <h3 className={`text-xl font-bold leading-snug mb-8 flex-1 transition-colors ${
                    isAvailable ? 'text-slate-900 group-hover:text-blue-600' : 'text-gray-400'
                }`}>
                  {chapter}
                </h3>

                <div className={`flex items-center gap-2 text-sm font-bold transition-colors ${
                    isAvailable ? 'text-gray-400 group-hover:text-slate-900' : 'text-gray-300'
                }`}>
                  <span>
                    {!isAvailable ? 'Conținut indisponibil' : (user ? 'Începe capitolul' : 'Loghează-te pentru acces')}
                  </span>
                  {isAvailable && (
                    <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Flashcards;
