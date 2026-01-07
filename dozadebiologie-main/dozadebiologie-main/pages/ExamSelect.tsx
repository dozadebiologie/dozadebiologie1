
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { User } from '../App';

interface ExamSelectProps {
  user: User | null;
}

const chapters = [
  "1. Segmentele corpului uman, planuri și axe anatomice",
  "2. Celula",
  "3. Țesuturile",
  "4. Sistemul nervos",
  "5. Analizatorii",
  "6. Glande endocrine",
  "7. Sistemul osos și muscular",
  "8. Digestia și absorbția",
  "9. Circulația",
  "10. Respirația",
  "11. Excreția",
  "12. Metabolismul",
  "13. Funcția de reproducere"
];

const ExamSelect: React.FC<ExamSelectProps> = ({ user }) => {
  const navigate = useNavigate();
  const { id: centerId } = useParams();
  
  const [selectedChapter, setSelectedChapter] = useState(0);
  const [numQuestions, setNumQuestions] = useState(10);
  const [isSingleOnly, setIsSingleOnly] = useState(true);

  useEffect(() => {
    if (!user) navigate('/login');
  }, [user, navigate]);

  const handleStartTest = () => {
    // Salvăm setările în sessionStorage pentru a fi citite de pagina de test
    sessionStorage.setItem('quiz_config', JSON.stringify({
      chapterIndex: selectedChapter,
      numQuestions,
      isSingleOnly,
      centerId
    }));
    navigate(`/grile/${centerId}/test`);
  };

  if (!user) return null;

  return (
    <div className="pt-32 pb-20 px-6 max-w-6xl mx-auto min-h-screen">
      <div className="mb-12 animate-fade-down">
         <Link to="/cursuri" className="text-gray-400 hover:text-black transition-colors font-bold text-xs uppercase tracking-widest flex items-center gap-2 mb-6">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M15 19l-7-7 7-7" strokeWidth="2.5"/></svg>
            Înapoi la Cursuri și Grile
         </Link>
         <h1 className="text-4xl font-bold text-slate-900 tracking-tight">Grile Admitere - ULB Sibiu</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        {/* Partea Stângă: Selecție Capitol */}
        <div className="lg:col-span-8 bg-white rounded-[40px] shadow-sm border border-gray-100 p-8 lg:p-12 animate-fade-left">
          <h2 className="text-xl font-bold text-slate-800 mb-8 border-b pb-4">Alege un capitol</h2>
          <div className="space-y-3 max-h-[60vh] overflow-y-auto pr-4 custom-scrollbar">
             {chapters.map((chapter, index) => {
               const isActive = index === 0; // Momentan doar capitolul 1 e activ
               return (
                 <button
                   key={index}
                   onClick={() => isActive && setSelectedChapter(index)}
                   className={`w-full text-left p-5 rounded-2xl border-2 transition-all flex items-center justify-between ${
                     selectedChapter === index 
                     ? 'border-blue-500 bg-blue-50 text-blue-700 font-bold' 
                     : isActive 
                        ? 'border-gray-50 bg-gray-50 hover:border-blue-200 text-slate-700' 
                        : 'border-gray-50 bg-gray-50/50 text-gray-400 cursor-not-allowed grayscale'
                   }`}
                 >
                   <span className="flex-1">{chapter}</span>
                   {!isActive && (
                      <span className="text-[9px] bg-gray-200 text-gray-500 px-3 py-1 rounded-full font-bold uppercase tracking-widest">În curând</span>
                   )}
                   {selectedChapter === index && (
                      <svg className="w-5 h-5 text-blue-500" fill="currentColor" viewBox="0 0 20 20"><path d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"/></svg>
                   )}
                 </button>
               )
             })}
          </div>
        </div>

        {/* Partea Dreaptă: Configurație */}
        <div className="lg:col-span-4 space-y-8 animate-fade-right">
          
          <div className="bg-white rounded-[40px] shadow-sm border border-gray-100 p-8 lg:p-10">
             <h2 className="text-xl font-bold text-slate-800 mb-8">Setări Test</h2>
             
             <div className="mb-10">
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Număr grile</label>
                <div className="grid grid-cols-2 gap-4">
                   {[10, 20].map(n => (
                     <button
                       key={n}
                       onClick={() => setNumQuestions(n)}
                       className={`py-4 rounded-2xl font-bold transition-all border-2 ${
                         numQuestions === n 
                         ? 'bg-blue-600 text-white border-blue-600 shadow-lg shadow-blue-100' 
                         : 'bg-white text-slate-700 border-gray-100 hover:border-blue-200'
                       }`}
                     >
                       {n}
                     </button>
                   ))}
                </div>
             </div>

             <div className="mb-10">
                <label className="flex items-center gap-4 cursor-pointer group">
                   <div className="relative">
                      <input 
                        type="checkbox" 
                        checked={isSingleOnly} 
                        onChange={() => setIsSingleOnly(!isSingleOnly)}
                        className="sr-only peer"
                      />
                      <div className="w-14 h-7 bg-gray-200 rounded-full peer-checked:bg-[#72f68b] transition-colors"></div>
                      <div className="absolute left-1 top-1 w-5 h-5 bg-white rounded-full transition-all peer-checked:translate-x-7 shadow-sm"></div>
                   </div>
                   <div className="flex-1">
                      <p className="text-sm font-bold text-slate-800">Doar complement simplu?</p>
                      <p className="text-[10px] text-gray-400 font-medium">Dacă nu e bifat, grilele sunt mixte.</p>
                   </div>
                </label>
             </div>

             <button 
               onClick={handleStartTest}
               className="w-full py-5 bg-black text-white rounded-[24px] font-bold shadow-xl hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-3 group"
             >
               <span>Începe testul</span>
               <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M14 5l7 7m0 0l-7 7m7-7H3" strokeWidth="2.5"/></svg>
             </button>
          </div>

          <div className="p-8 bg-blue-50 rounded-[32px] border border-blue-100">
             <h4 className="text-sm font-bold text-blue-800 mb-3 flex items-center gap-2">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"/></svg>
                Info Punctaj
             </h4>
             <p className="text-xs text-blue-600/80 leading-relaxed">
                La complementul multiplu se acordă <strong>punctaj intermediar</strong> pentru fiecare variantă identificată corect (A-E). Un răspuns complet corect oferă 1 punct.
             </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExamSelect;
