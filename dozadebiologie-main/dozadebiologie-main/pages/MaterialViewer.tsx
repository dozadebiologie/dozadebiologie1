
import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { User } from '../App';

interface MaterialViewerProps {
  user: User | null;
}

const DnaLogo = ({ size = 24 }: { size?: number }) => (
  <img 
    src="https://dozadebiologie.wordpress.com/wp-content/uploads/2023/02/2.profil.png" 
    alt="dozadebiologie logo" 
    style={{ width: size, height: size }}
    className="object-contain"
  />
);

const MaterialViewer: React.FC<MaterialViewerProps> = ({ user }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [zoom, setZoom] = useState(100);
  const [activeSectionId, setActiveSectionId] = useState("sec-1-1");

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  // Restricții severe de securitate
  useEffect(() => {
    const prevent = (e: any) => e.preventDefault();
    document.addEventListener('contextmenu', prevent);
    document.addEventListener('copy', prevent);
    document.addEventListener('selectstart', prevent);
    document.addEventListener('dragstart', prevent);

    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && ['c', 'p', 's', 'u', 'a'].includes(e.key.toLowerCase())) e.preventDefault();
      if (e.key === 'F12' || (e.ctrlKey && e.shiftKey && e.key === 'I')) e.preventDefault();
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('contextmenu', prevent);
      document.removeEventListener('copy', prevent);
      document.removeEventListener('selectstart', prevent);
      document.removeEventListener('dragstart', prevent);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const chapters = [
    {
      id: "sec-1-1",
      title: "1.1. Segmentele corpului uman",
      content: (
        <div className="space-y-6 text-justify text-slate-800 leading-relaxed">
          <p>Ca formă de organizare, celulele din corpul omenesc se grupează și împreună cu țesuturile intră în alcătuirea organelor și mai departe a sistemelor de organe. Acestea din urmă sunt unități morfologice răspunzătoare de activitatea principalelor <strong>funcții ale organismului</strong>, cum ar fi cele de <strong>relație, nutriție și reproducere</strong>.</p>
          <p>La baza formării organelor stau grupări de celule și țesuturi care s-au diferențiat pentru îndeplinirea anumitor funcții. Organele funcționează în <strong>strânsă corelație</strong> unele cu altele (nu funcționează izolat).</p>
          <p>Din punct de vedere al alcătuirii, corpul uman poate fi împărțit în următoarele <strong>segmente</strong>: cap, gât, trunchi și membre.</p>
          
          <ul className="list-disc pl-8 space-y-1">
            <li><strong>Capul și gâtul</strong> constituie împreună extremitatea cefalică.</li>
            <li><strong>Capul</strong> are două părți: craniană (neurocraniu) și facială (viscerocraniu).</li>
            <li><strong>Gâtul</strong> face legătura între cap și trunchi.</li>
          </ul>

          <div className="flex flex-col items-center py-8">
            <img src="https://platform.ginamed.ro/content/image-upload/vedere_anterioara_cav_trunchi_corint.png?format=webp&quality=80&width=1024" alt="Figura 1.1" className="max-w-full rounded-lg shadow-sm border" />
            <p className="text-[10px] text-gray-400 font-bold mt-3 uppercase tracking-widest">Figura 1.1 Vedere anterioară a cavităților trunchiului</p>
          </div>

          <p><strong>Trunchiul</strong> se împarte în: torace, abdomen și pelvis. Mușchiul <strong>diafragm</strong> desparte toracele de abdomen, iar <strong>diafragma perineală</strong> limitează inferior pelvisul.</p>

          <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100">
            <h4 className="font-bold text-sm mb-4 uppercase tracking-wider text-slate-600">Subdiviziuni Abdominale</h4>
            <div className="grid grid-cols-2 gap-x-8 gap-y-2 text-sm">
              <div className="flex justify-between border-b pb-1"><span>Hipocondru drept</span><span className="font-bold text-blue-600">Ficat</span></div>
              <div className="flex justify-between border-b pb-1"><span>Epigastru</span><span className="font-bold text-blue-600">Stomac/Ficat</span></div>
              <div className="flex justify-between border-b pb-1"><span>Hipocondru stâng</span><span className="font-bold text-blue-600">Splină</span></div>
              <div className="flex justify-between border-b pb-1"><span>Periombilical</span><span className="font-bold text-blue-600">Intestin</span></div>
            </div>
          </div>

          <div className="flex flex-col items-center py-8">
            <img src="https://platform.ginamed.ro/content/image-upload/Subdiviziuni_cav_abd.png?format=webp&quality=80" alt="Figura 1.2" className="max-w-full rounded-lg shadow-sm border" />
            <p className="text-[10px] text-gray-400 font-bold mt-3 uppercase tracking-widest">Figura 1.2 Subdiviziunile cavității abdominale</p>
          </div>
        </div>
      )
    },
    {
      id: "sec-1-2",
      title: "1.2. Planuri și raporturi anatomice",
      content: (
        <div className="space-y-6 text-justify text-slate-800 leading-relaxed">
          <p>Corpul omenesc este alcătuit după principiul simetriei bilaterale, fiind un <strong>corp tridimensional</strong>, cu 3 axe și 3 planuri care se întretaie în unghi drept.</p>
          
          <div className="flex flex-col items-center py-8">
            <img src="https://platform.ginamed.ro/content/image-upload/planuri_si_axe_ale_corpului_corint.png?format=webp&quality=80&width=1024" alt="Figura 1.3" className="max-w-full rounded-lg shadow-sm border" />
            <p className="text-[10px] text-gray-400 font-bold mt-3 uppercase tracking-widest">Figura 1.3 Planuri și axe ale corpului uman</p>
          </div>

          <h4 className="text-lg font-bold text-slate-900 border-l-4 border-blue-500 pl-4 my-6">Axele Corpului</h4>
          <ul className="space-y-4">
            <li><strong>Axul longitudinal</strong>: Vertical, între creștetul capului și suprafața tălpilor (pol superior și inferior).</li>
            <li><strong>Axul sagital</strong>: Descrie grosimea corpului (pol anterior și posterior).</li>
            <li><strong>Axul transversal</strong>: Orizontal, caracterizează lățimea (pol stâng și drept).</li>
          </ul>

          <div className="flex flex-col items-center py-8">
            <img src="https://platform.ginamed.ro/content/image-upload/C1_-_Fig_2.jpg?format=webp&quality=80&width=1024" alt="Figura 1.4" className="max-w-full rounded-lg shadow-sm border" />
            <p className="text-[10px] text-gray-400 font-bold mt-3 uppercase tracking-widest">Figura 1.4 Dispunerea celor 3 axe</p>
          </div>

          <h4 className="text-lg font-bold text-slate-900 border-l-4 border-blue-500 pl-4 my-6">Planurile Corpului</h4>
          <p>Planurile sunt suprafețe care secționează corpul, fiind traversate de câte două dintre cele trei axe.</p>
          <ul className="space-y-4">
            <li><strong>Planul sagital</strong>: Trece prin axul sagital și cel longitudinal. Cel median este planul simetriei bilaterale.</li>
            <li><strong>Planul frontal</strong>: Paralel cu fruntea, împarte corpul în ventral și dorsal.</li>
            <li><strong>Planul transversal</strong>: Planul metameriei, împarte corpul în superior și inferior.</li>
          </ul>

          <div className="flex flex-col items-center py-8">
            <img src="https://platform.ginamed.ro/content/image-upload/C1_-_Fig_3.jpg?format=webp&quality=80" alt="Figura 1.5" className="max-w-full rounded-lg shadow-sm border" />
            <p className="text-[10px] text-gray-400 font-bold mt-3 uppercase tracking-widest">Figura 1.5 Dispunerea celor 3 planuri</p>
          </div>
        </div>
      )
    }
  ];

  if (!user) return null;

  return (
    <div className="flex flex-col h-screen bg-[#323639] select-none no-copy overflow-hidden">
      <style>{`
        .no-copy {
          -webkit-user-select: none !important;
          -moz-user-select: none !important;
          -ms-user-select: none !important;
          user-select: none !important;
        }
        .pdf-page {
          background: white;
          width: 100%;
          max-width: 800px;
          min-height: 1100px;
          margin: 40px auto;
          padding: 80px 60px;
          box-shadow: 0 10px 40px rgba(0,0,0,0.5);
          position: relative;
        }
        .custom-scrollbar::-webkit-scrollbar { width: 12px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: #323639; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #525659; border-radius: 10px; border: 3px solid #323639; }
        img { pointer-events: none !important; }
        @media print { body { display: none !important; } }
      `}</style>

      {/* PDF Viewer Header */}
      <header className="h-14 bg-[#202124] text-white flex items-center justify-between px-6 shadow-xl z-50">
        <div className="flex items-center gap-6">
          <Link to="/cursuri" className="p-2 hover:bg-white/10 rounded-full transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M15 19l-7-7 7-7" strokeWidth="3"/></svg>
          </Link>
          <div className="flex items-center gap-3">
            <DnaLogo size={20} />
            <h1 className="text-sm font-medium opacity-90 truncate max-w-[200px]">curs 1 test.pdf - Sinteză</h1>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 bg-[#292a2d] px-4 py-1.5 rounded-md border border-white/5">
            <button onClick={() => setZoom(Math.max(50, zoom - 10))} className="hover:text-blue-400 transition-colors">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M20 12H4" strokeWidth="2.5"/></svg>
            </button>
            <span className="text-[11px] font-bold w-12 text-center">{zoom}%</span>
            <button onClick={() => setZoom(Math.min(150, zoom + 10))} className="hover:text-blue-400 transition-colors">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M12 4v16m8-8H4" strokeWidth="2.5"/></svg>
            </button>
          </div>
          <div className="hidden md:flex items-center gap-2 text-xs font-bold text-blue-400 bg-blue-500/10 px-3 py-1.5 rounded-md">
            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C9.24 2 7 4.24 7 7v3H6c-1.1 0-2 .9-2 2v8c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2v-8c0-1.1-.9-2-2-2h-1V7c0-2.76-2.24-5-5-5z"/></svg>
            PROTEJAT
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="text-right hidden sm:block">
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{user.name}</p>
            <p className="text-[9px] text-white/50">{user.email}</p>
          </div>
          <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-[10px] font-bold">
            {user.initials}
          </div>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Navigation Sidebar */}
        <aside className="w-64 bg-[#202124] border-r border-white/5 flex flex-col hidden lg:flex">
          <div className="p-6 border-b border-white/5">
             <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Capitole Document</p>
          </div>
          <div className="flex-1 overflow-y-auto p-4 space-y-2 custom-scrollbar">
             {chapters.map((chap) => (
               <button
                 key={chap.id}
                 onClick={() => {
                   setActiveSectionId(chap.id);
                   document.getElementById(chap.id)?.scrollIntoView({ behavior: 'smooth' });
                 }}
                 className={`w-full text-left px-4 py-3 rounded-lg text-xs transition-all ${
                   activeSectionId === chap.id 
                   ? 'bg-blue-600/20 text-blue-400 font-bold border-l-2 border-blue-600' 
                   : 'text-gray-400 hover:text-white hover:bg-white/5'
                 }`}
               >
                 {chap.title}
               </button>
             ))}
          </div>
        </aside>

        {/* Content Viewer */}
        <main className="flex-1 overflow-y-auto bg-[#525659] custom-scrollbar p-6">
          <div 
            className="transition-all duration-300 origin-top flex flex-col items-center" 
            style={{ transform: `scale(${zoom / 100})`, width: '100%' }}
          >
            {chapters.map((chap, index) => (
              <section 
                key={chap.id} 
                id={chap.id} 
                className="pdf-page no-copy animate-fade-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Security Watermark */}
                <div className="absolute inset-0 pointer-events-none opacity-[0.02] flex flex-wrap gap-20 p-20 overflow-hidden text-[9px] font-bold text-blue-900 uppercase rotate-[-30deg]">
                  {Array(100).fill(`dozadebiologie • ${user.email} • `).join(' ')}
                </div>

                {/* Page Header Decorative */}
                <div className="flex justify-between items-center mb-12 border-b pb-4 border-gray-100 relative z-10">
                  <div className="flex items-center gap-2">
                    <DnaLogo size={14} />
                    <span className="text-[9px] font-bold text-gray-300 uppercase tracking-widest">Admitere Medicină • Sinteză Biologie</span>
                  </div>
                  <span className="text-[9px] font-bold text-gray-300 uppercase tracking-widest">Pagina {index + 1}</span>
                </div>

                {/* Title */}
                <h2 className="text-2xl font-bold text-slate-900 mb-10 tracking-tight relative z-10">{chap.title}</h2>
                
                {/* Content */}
                <div className="relative z-10">
                  {chap.content}
                </div>

                {/* Page Footer Decorative */}
                <div className="absolute bottom-10 left-15 right-15 border-t border-gray-50 pt-6 flex justify-between items-end relative z-10 w-[calc(100%-120px)]">
                   <div className="flex flex-col gap-1">
                      <p className="text-[8px] text-gray-300 font-bold uppercase tracking-widest">Proprietate intelectuală dozadebiologie.ro</p>
                      <p className="text-[9px] text-slate-800 font-bold">Document securizat pentru: {user.name}</p>
                   </div>
                   <div className="bg-gray-50 px-3 py-1 rounded text-[8px] font-bold text-gray-400">
                      ID: {user.email.split('@')[0].toUpperCase()}
                   </div>
                </div>
              </section>
            ))}

            {/* Final Footer */}
            <div className="py-20 text-center text-white/20 text-xs font-bold uppercase tracking-[0.5em]">
               Sfârșit document
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default MaterialViewer;
