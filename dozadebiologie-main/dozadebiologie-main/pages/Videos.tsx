
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { User } from '../App';

interface VideosProps {
  user: User | null;
}

const Videos: React.FC<VideosProps> = ({ user }) => {
  const navigate = useNavigate();
  
  const videoCourses = [
    { 
      id: 'biologie-corint',
      title: 'Biologie - Corint', 
      image: 'https://edituracorint.ro/pub/media/catalog/product/cache/6675ff74a1d8426a9a906824e3cf45ba/m/a/manual_biologie_xi_cristescu_3.jpg' 
    },
  ];

  const textMaterials = [
    { 
      id: 'materiale-biologie-corint',
      title: 'Biologie - Corint', 
      image: 'https://edituracorint.ro/pub/media/catalog/product/cache/6675ff74a1d8426a9a906824e3cf45ba/m/a/manual_biologie_xi_cristescu_3.jpg' 
    },
  ];

  const examGrids = [
    {
      id: 'sibiu',
      title: 'Grile admitere Sibiu',
      image: 'https://editura.ulbsibiu.ro/wp-content/uploads/coperta%CC%86-biologie-decupata%CC%86-01.png'
    }
  ];

  const handleItemClick = (id: string) => {
    if (!user) {
      navigate('/login');
    } else {
      if (id === 'sibiu') {
        navigate(`/grile/${id}`);
      } else if (id.startsWith('materiale')) {
        navigate(`/materiale/${id}`);
      } else {
        navigate(`/cursuri/${id}`);
      }
    }
  };

  return (
    <div className="pt-32 pb-20 px-6 lg:px-10 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 relative">
        
        {/* Separator vertical pentru ecrane mari */}
        <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-px bg-gray-100 -translate-x-1/2"></div>

        {/* Secțiunea Cursuri Video */}
        <div className="animate-fade-left">
          <div className="mb-12">
            <h2 className="text-4xl font-bold mb-4 text-slate-900">Cursuri Video</h2>
            <p className="text-gray-500 leading-relaxed">
              Explicații clare, diagrame interactive și sinteze video create pentru a-ți ușura învățarea. Conectează-te pentru a accesa conținutul.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            {videoCourses.map((cat, index) => (
              <div 
                key={cat.id} 
                onClick={() => handleItemClick(cat.id)}
                className={`group cursor-pointer animate-zoom delay-${(index + 1) * 100}`}
              >
                <div className="relative overflow-hidden rounded-[32px] aspect-[4/3] mb-4 shadow-sm border border-gray-100 bg-white">
                  <img 
                    src={cat.image} 
                    alt={cat.title} 
                    className="w-full h-full object-contain p-4 transition-transform duration-500 group-hover:scale-110"
                  />
                  {!user && (
                    <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                       <span className="bg-white text-black px-4 py-2 rounded-full text-xs font-bold shadow-lg">Necesită Logare</span>
                    </div>
                  )}
                </div>
                <h3 className="text-xl font-bold mb-1 text-slate-800 group-hover:text-blue-500 transition-colors">{cat.title}</h3>
                <p className="text-gray-400 text-sm font-medium">
                  {user ? 'Vizualizează cursurile →' : 'Loghează-te pentru acces →'}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Secțiunea Materiale */}
        <div className="animate-fade-right">
          <div className="mb-12">
            <h2 className="text-4xl font-bold mb-4 text-slate-900">Materiale</h2>
            <p className="text-gray-500 leading-relaxed">
              Descarcă sinteze complete, diagrame detaliate și scheme recapitulative în format PDF, special concepute pentru a fixa noțiunile teoretice rapid și eficient.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            {textMaterials.map((cat, index) => (
              <div 
                key={cat.id} 
                onClick={() => handleItemClick(cat.id)}
                className={`group cursor-pointer animate-zoom delay-${(index + 1) * 100}`}
              >
                <div className="relative overflow-hidden rounded-[32px] aspect-[4/3] mb-4 shadow-sm border border-gray-100 bg-white">
                  <img 
                    src={cat.image} 
                    alt={cat.title} 
                    className="w-full h-full object-contain p-4 transition-transform duration-500 group-hover:scale-110 grayscale group-hover:grayscale-0 transition-all"
                  />
                  {!user && (
                    <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                       <span className="bg-white text-black px-4 py-2 rounded-full text-xs font-bold shadow-lg">Necesită Logare</span>
                    </div>
                  )}
                  <div className="absolute top-4 right-4 bg-blue-500 text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest shadow-sm">
                    Sinteză
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-1 text-slate-800 group-hover:text-blue-500 transition-colors">{cat.title}</h3>
                <p className="text-gray-400 text-sm font-medium">
                  {user ? 'Vizualizează sinteza →' : 'Loghează-te pentru acces →'}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Secțiunea Nouă: Grile Admitere */}
      <div className="mt-24 animate-fade-up delay-300">
        <div className="mb-12 flex flex-col items-center text-center">
          <h2 className="text-4xl font-bold mb-4 text-slate-900">Grile Admitere</h2>
          <p className="text-gray-500 leading-relaxed max-w-2xl">
            Exersează pe grilele oficiale și testează-ți cunoștințele în condiții reale de examen. Pregătire specifică pentru centrele universitare.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 justify-center">
          {examGrids.map((cat) => (
            <div 
              key={cat.id} 
              onClick={() => handleItemClick(cat.id)}
              className="group cursor-pointer animate-zoom"
            >
              <div className="relative overflow-hidden rounded-[32px] aspect-[3/4] mb-4 shadow-lg border border-gray-100 bg-white">
                <img 
                  src={cat.image} 
                  alt={cat.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                {!user && (
                  <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                     <span className="bg-white text-black px-4 py-2 rounded-full text-xs font-bold shadow-lg">Necesită Logare</span>
                  </div>
                )}
                <div className="absolute top-4 left-4 bg-[#72f68b] text-black text-[9px] font-extrabold px-3 py-1.5 rounded-full uppercase tracking-[0.2em] shadow-md border border-white/20">
                  Oficial Sibiu
                </div>
              </div>
              <h3 className="text-lg font-bold mb-1 text-slate-800 group-hover:text-blue-500 transition-colors text-center">{cat.title}</h3>
              <p className="text-gray-400 text-[11px] font-bold text-center uppercase tracking-widest">
                {user ? 'Alege Capitolul →' : 'Logare necesară'}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Secțiune de tip Promo / Call to action */}
      <div className="mt-32 p-12 bg-[#EBEEF0] rounded-[48px] flex flex-col md:flex-row items-center gap-12 animate-fade-up">
        <div className="flex-1">
          <h3 className="text-4xl font-bold mb-6 text-slate-900">Pregătire completă, fără compromisuri.</h3>
          <p className="text-gray-600 text-lg leading-relaxed mb-8">
            Îmbinăm învățarea vizuală prin clipuri video cu fixarea cunoștințelor prin scheme grafice și sinteze teoretice structurate.
          </p>
          <div className="flex gap-4">
             <div className="flex items-center gap-2 text-sm font-bold text-slate-800">
                <div className="w-2 h-2 bg-[#72f68b] rounded-full"></div>
                Peste 50 de PDF-uri
             </div>
             <div className="flex items-center gap-2 text-sm font-bold text-slate-800">
                <div className="w-2 h-2 bg-[#72f68b] rounded-full"></div>
                Update săptămânal
             </div>
          </div>
        </div>
        <div className="flex-1 w-full">
            <div className="bg-white p-6 rounded-[32px] shadow-2xl relative transform -rotate-1 animate-zoom">
                <div className="aspect-video bg-gray-100 rounded-2xl flex items-center justify-center overflow-hidden border border-gray-50">
                    <img src="https://images.unsplash.com/photo-1488190211105-8b0e65b80b4e?q=80&w=2070&auto=format&fit=crop" className="w-full h-full object-cover" alt="Learning materials" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none"></div>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Videos;
