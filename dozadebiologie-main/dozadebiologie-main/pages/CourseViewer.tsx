
import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { User } from '../App';

interface CourseViewerProps {
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

const CourseViewer: React.FC<CourseViewerProps> = ({ user }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  // Protecție: Redirecționare dacă nu e logat
  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  const lessons = [
    { title: "1. Introducere în Celulă", videoId: "pKhEAryIiDI" },
    { title: "2. Structura Membranei", videoId: "7X8vP7o6XoI" },
    { title: "3. Organite Celulare", videoId: "8O6vL9o9XoI" },
    { title: "4. Metabolismul Energetic", videoId: "9P7vM1o1XoI" },
    { title: "5. Diviziunea Celulară", videoId: "0Q6vR2o2XoI" },
  ];

  const [currentLessonIndex, setCurrentLessonIndex] = useState(0);
  const [notes, setNotes] = useState("");
  
  // Încărcare notițe din localStorage când se schimbă lecția sau utilizatorul
  useEffect(() => {
    if (id && user) {
      // Cheia include acum email-ul userului pentru a separa notițele între conturi diferite
      const storageKey = `course_notes_${user.email}_${id}_${currentLessonIndex}`;
      const savedNotes = localStorage.getItem(storageKey);
      setNotes(savedNotes || "");
    }
  }, [currentLessonIndex, id, user]);

  const handleNotesChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newNotes = e.target.value;
    setNotes(newNotes);
    if (id && user) {
      const storageKey = `course_notes_${user.email}_${id}_${currentLessonIndex}`;
      localStorage.setItem(storageKey, newNotes);
    }
  };
  
  const currentLesson = lessons[currentLessonIndex];
  const progress = ((currentLessonIndex + 1) / lessons.length) * 100;

  const nextLesson = () => {
    if (currentLessonIndex < lessons.length - 1) {
      setCurrentLessonIndex(currentLessonIndex + 1);
    }
  };

  const prevLesson = () => {
    if (currentLessonIndex > 0) {
      setCurrentLessonIndex(currentLessonIndex - 1);
    }
  };

  if (!user) return null; // Evităm flash de conținut înainte de redirect

  return (
    <div className="flex flex-col h-screen bg-[#F8F9FA]">
      {/* Header / Top Navigation */}
      <div className="bg-white border-b px-8 py-4 flex items-center justify-between shadow-sm z-50">
        <div className="flex items-center gap-6">
          <Link to="/cursuri" className="flex items-center gap-4 group">
            <svg className="w-4 h-4 text-gray-400 group-hover:text-black transition-colors" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
              <path d="M15 19l-7-7 7-7" />
            </svg>
            <div className="flex items-center gap-2">
                <DnaLogo />
                <span className="font-bold text-xl text-slate-800 tracking-tight">dozadebiologie</span>
            </div>
          </Link>
        </div>
        
        <div className="flex items-center gap-4">
           {user.picture ? (
             <img src={user.picture} alt={user.name} className="w-9 h-9 rounded-full border border-gray-100" />
           ) : (
             <div className="w-9 h-9 rounded-full bg-[#E8F0FE] flex items-center justify-center text-blue-600 text-xs font-bold border border-blue-100 shadow-sm">
                {user.initials}
             </div>
           )}
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Left Sidebar */}
        <aside className="w-72 bg-white border-r overflow-y-auto hidden md:block shadow-[1px_0_0_rgba(0,0,0,0.05)]">
          <div className="p-8 pb-4">
            <h3 className="font-bold text-slate-900 text-lg">Programa Cursului</h3>
          </div>
          <div className="px-4 py-2">
            {lessons.map((lesson, index) => (
              <button
                key={index}
                onClick={() => setCurrentLessonIndex(index)}
                className={`w-full text-left px-5 py-4 rounded-xl mb-2 transition-all duration-200 ${
                  currentLessonIndex === index 
                  ? 'bg-[#E8F0FE] text-blue-600 font-semibold border-none' 
                  : 'text-gray-500 hover:bg-gray-50 hover:text-slate-800'
                }`}
              >
                <div className="text-sm truncate">{lesson.title}</div>
              </button>
            ))}
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 flex flex-col p-6 lg:p-12 overflow-y-auto bg-white/50">
          <div className="max-w-6xl mx-auto w-full flex flex-col lg:flex-row gap-10">
            <div className="flex-[2] flex flex-col gap-8">
              <h1 className="text-3xl font-bold text-slate-900 tracking-tight animate-fade-up">
                {currentLesson.title}
              </h1>

              <div className="relative group animate-zoom delay-100">
                <div className="aspect-video w-full bg-black rounded-[40px] overflow-hidden shadow-2xl border-8 border-white ring-1 ring-gray-100">
                  <iframe
                    key={currentLesson.videoId}
                    className="w-full h-full border-0"
                    src={`https://www.youtube-nocookie.com/embed/${currentLesson.videoId}?autoplay=0&rel=0&modestbranding=1`}
                    title={currentLesson.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  ></iframe>
                </div>
              </div>

              <div className="bg-[#EBEEF0] p-4 md:pl-12 md:pr-4 rounded-[40px] flex flex-col md:flex-row items-center justify-between gap-6 md:gap-12 shadow-sm border border-gray-100 animate-fade-up delay-200">
                <div className="flex-1 w-full flex flex-col px-4 md:px-0">
                  <div className="flex justify-between items-center text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2 px-1">
                    <span>Bara de progres</span>
                    <span className="text-blue-500 font-bold">{Math.round(progress)}%</span>
                  </div>
                  <div className="h-2 w-full bg-white rounded-full overflow-hidden shadow-inner">
                    <div 
                      className="h-full bg-[#72f68b] transition-all duration-1000 ease-in-out"
                      style={{ width: `${progress}%` }}
                    ></div>
                  </div>
                </div>

                <div className="flex items-center gap-3 w-full md:w-auto px-4 md:px-0">
                  <button 
                    onClick={prevLesson}
                    disabled={currentLessonIndex === 0}
                    className="flex-1 md:flex-none px-6 py-5 bg-white text-black border border-gray-200 rounded-[32px] font-bold text-sm hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                  >
                    În urmă
                  </button>
                  <button 
                    onClick={nextLesson}
                    disabled={currentLessonIndex === lessons.length - 1}
                    className="flex-1 md:flex-none px-10 py-5 bg-black text-white rounded-[32px] font-bold text-sm hover:bg-gray-800 disabled:bg-gray-200 transition-all"
                  >
                    Următorul
                  </button>
                </div>
              </div>
            </div>

            {/* Sidebar Notițe */}
            <div className="lg:w-96 w-full animate-fade-right delay-300">
              <div className="bg-white rounded-[40px] h-full min-h-[550px] flex flex-col border border-gray-200 shadow-xl relative overflow-hidden group hover:border-blue-100 transition-colors">
                <div className="p-8 pb-5 flex items-center gap-3 border-b border-gray-50">
                  <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse"></div>
                  <h3 className="font-bold text-[11px] text-slate-900 uppercase tracking-[0.2em]">Notițele mele</h3>
                </div>
                <div className="flex-1 relative">
                  <textarea
                    className="w-full h-full p-8 text-black text-lg leading-relaxed border-none focus:ring-0 resize-none bg-transparent placeholder:text-gray-300 placeholder:italic font-medium"
                    placeholder="Scrie aici observațiile tale pentru această lecție..."
                    value={notes}
                    onChange={handleNotesChange}
                  ></textarea>
                  
                  {/* Indicator de salvare */}
                  <div className="absolute bottom-6 right-8 text-[10px] font-bold text-gray-300 uppercase tracking-widest pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity">
                    Salvat automat
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default CourseViewer;
