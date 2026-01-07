
import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { User } from '../App';

interface ExamQuizProps {
  user: User | null;
}

interface Question {
  id: number;
  text: string;
  options: { id: string; text: string }[];
  correctIds: string[];
  type: 'simplu' | 'multiplu';
}

const DB_QUESTIONS: Question[] = [
  {
    id: 1,
    text: "Axul sagital al corpului:",
    options: [
      { id: 'a', text: "este orizontal și corespunde lățimii corpului" },
      { id: 'b', text: "este planul care merge paralel cu fruntea și trece prin axul longitudinal al corpului" },
      { id: 'c', text: "este un plan anteroposterior și corespunde axului grosimii corpului" },
      { id: 'd', text: "împarte corpul într-o parte superioară (cranială) și una inferioară (caudală)" },
      { id: 'e', text: "este orizontal și are un pol stâng și un pol drept" }
    ],
    correctIds: ['c'],
    type: 'simplu'
  },
  {
    id: 2,
    text: "Următoarele afirmații referitoare la membrana celulară sunt adevărate, cu excepția:",
    options: [
      { id: 'a', text: "proteinele sunt uniform distribuite la nivelul membranei celulare" },
      { id: 'b', text: "fosfolipidele formează un bistrat în cadrul structurii membranei celulare" },
      { id: 'c', text: "glicoproteinele sunt atașate pe fața externă a membranei celulare" },
      { id: 'd', text: "glicoproteinele de pe fața externă a membranei celulare sunt încărcate pozitiv" },
      { id: 'e', text: "membrana celulară are un model structural denumit modelul mozaicului fluid" }
    ],
    correctIds: ['a', 'd'],
    type: 'multiplu'
  },
  {
    id: 3,
    text: "Ergastoplasma este:",
    options: [
      { id: 'a', text: "formă diferențiată a reticulului endoplasmatic" },
      { id: 'b', text: "un sistem membranar format din vezicule si cisterne alungite cu rol în excreția unor substanțe celulare" },
      { id: 'c', text: "corpusculi sferici ce conțin enzime hidrolitice" },
      { id: 'd', text: "un sistem canalicular ce prezintă pe suprafața externă a peretelui membranos ribozomi" },
      { id: 'e', text: "un sistem canalicular în interiorul căruia au loc procese enzimatice care realizează fosforilarea oxidativă" }
    ],
    correctIds: ['a', 'd'],
    type: 'multiplu'
  },
  {
    id: 4,
    text: "Ribozomii:",
    options: [
      { id: 'a', text: "sunt corpusculi sferici ce conțin enzime hidrolitice" },
      { id: 'b', text: "reprezintă un sistem canalicular ce prezintă pe suprafața externă a peretelui membranos ribozomi" },
      { id: 'c', text: "reprezintă un sistem canalicular în interiorul căruia au loc procese enzimatice care realizează fosforilarea oxidativă" },
      { id: 'd', text: "sunt organite bogate în ribonucleoproteine de forma unor granule ovale sau rotunde" },
      { id: 'e', text: "sunt structuri intracitoplasmatice la nivelul cărora au loc sinteze proteice" }
    ],
    correctIds: ['d', 'e'],
    type: 'multiplu'
  },
  {
    id: 5,
    text: "Lizozomii:",
    options: [
      { id: 'a', text: "sunt corpusculi sferici intracitoplasmatici ce conțin enzime hidrolitice cu rol important în celulele fagocitare" },
      { id: 'b', text: "reprezintă un sistem canalicular ce prezintă pe suprafața externă a peretelui membranos ribozomi" },
      { id: 'c', text: "reprezintă un sistem canalicular în interiorul căruia au loc procese enzimatice care realizează fosforilarea oxidativă" },
      { id: 'd', text: "sunt organite bogate în ribonucleoproteine de forma unor granule ovale sau rotunde" },
      { id: 'e', text: "sunt structuri intracitoplasmatice la nivelul cărora au loc sinteze proteice" }
    ],
    correctIds: ['a'],
    type: 'simplu'
  },
  {
    id: 6,
    text: "Aparatul Golgi:",
    options: [
      { id: 'a', text: "reprezintă o formă diferențiată a reticulului endoplasmatic" },
      { id: 'b', text: "este un sistem membranar situat în apropierea nucleului format din micro- și macrovezicule și cisterne alungite cu rol în excreția unor substanțe celulare" },
      { id: 'c', text: "este format din corpusculi sferici ce conțin enzime hidrolitice" },
      { id: 'd', text: "este alcătuit dintr-un sistem canalicular ce prezintă pe suprafața externă a peretelui membranos ribozomi" },
      { id: 'e', text: "un sistem canalicular în interiorul căruia au loc procese enzimatice care realizează fosforilarea oxidativă" }
    ],
    correctIds: ['b'],
    type: 'simplu'
  },
  {
    id: 7,
    text: "Miofibrilele:",
    options: [
      { id: 'a', text: "sunt echivalenți ai ergastoplasmei" },
      { id: 'b', text: "sunt corpusculi sferici din citoplasma fibrelor musculare" },
      { id: 'c', text: "sunt elemente contractile din sarcoplasma fibrelor musculare" },
      { id: 'd', text: "sunt organite cu rol în diviziunea celulară" },
      { id: 'e', text: "conțin enzime hidrolitice" }
    ],
    correctIds: ['c'],
    type: 'simplu'
  },
  {
    id: 8,
    text: "Osmoza:",
    options: [
      { id: 'a', text: "asigură deplasarea moleculelor și a ionilor împotriva gradienților de concentrație" },
      { id: 'b', text: "reprezintă difuziunea netă a apei printr-o membrană semipermeabilă" },
      { id: 'c', text: "reprezintă un mecanism de transport care nu utilizează proteine transportoare" },
      { id: 'd', text: "este un transport pasiv care nu necesită consum energetic din partea celulei" },
      { id: 'e', text: "este un mecanism de transport activ care se produce cu consum de energie din partea celulei" }
    ],
    correctIds: ['b', 'c', 'd'],
    type: 'multiplu'
  },
  {
    id: 9,
    text: "Potențialul membranar de repaus are o valoare medie de:",
    options: [
      { id: 'a', text: "-25 mV până la -45 mV" },
      { id: 'b', text: "-65 mV până la -85 mV" },
      { id: 'c', text: "-50 mV până la -55 mV" },
      { id: 'd', text: "-85 mV până la -95 mV" },
      { id: 'e', text: "-35 mV până la -55 mV" }
    ],
    correctIds: ['b'],
    type: 'simplu'
  },
  {
    id: 10,
    text: "Presiunea osmotică:",
    options: [
      { id: 'a', text: "reprezintă forța care asigură deplasarea moleculelor în sensul osmozei" },
      { id: 'b', text: "reprezintă forța care trebuie aplicată unei soluții pentru a preveni osmoza" },
      { id: 'c', text: "este direct proporțională cu numărul de particule dizolvate în soluție" },
      { id: 'd', text: "este invers proporțională cu numărul de particule dizolvate în soluție" },
      { id: 'e', text: "utilizează proteine transportoare" }
    ],
    correctIds: ['b', 'c'],
    type: 'multiplu'
  },
  {
    id: 11,
    text: "Epiderma este un țesut:",
    options: [
      { id: 'a', text: "pluristratificat" },
      { id: 'b', text: "unistratificat" },
      { id: 'c', text: "pavimentos necheratinizat" },
      { id: 'd', text: "pavimentos cheratinizat" },
      { id: 'e', text: "cilindric ciliat" }
    ],
    correctIds: ['a', 'd'],
    type: 'multiplu'
  },
  {
    id: 12,
    text: "Țesut cartilaginos întâlnim la:",
    options: [
      { id: 'a', text: "cartilajele costale" },
      { id: 'b', text: "diafizele oaselor lungi" },
      { id: 'c', text: "epiglotă" },
      { id: 'd', text: "meniscurile articulare" },
      { id: 'e', text: "ganglionii limfatici" }
    ],
    correctIds: ['a', 'c', 'd'],
    type: 'multiplu'
  },
  {
    id: 13,
    text: "Dimensiunea unei hematii este de:",
    options: [
      { id: 'a', text: "7,5 microni" },
      { id: 'b', text: "8 microni" },
      { id: 'c', text: "7 microni" },
      { id: 'd', text: "8,5 microni" },
      { id: 'e', text: "6,5 microni" }
    ],
    correctIds: ['a'],
    type: 'simplu'
  },
  {
    id: 14,
    text: "Care dintre afirmațiile referitoare la aparatul Golgi sunt adevarate:",
    options: [
      { id: 'a', text: "este sediul sintezei proteice" },
      { id: 'b', text: "are rol în sinteza de proteine" },
      { id: 'c', text: "are rol în diviziunea celulară" },
      { id: 'd', text: "rol în excreția unor substanțe celulare" },
      { id: 'e', text: "rol în metabolismul glicogenului" }
    ],
    correctIds: ['d'],
    type: 'simplu'
  },
  {
    id: 15,
    text: "Epiteliul de tip reticulat se găsește în:",
    options: [
      { id: 'a', text: "rinichi" },
      { id: 'b', text: "cartilaje costale" },
      { id: 'c', text: "splină" },
      { id: 'd', text: "tiroidă" },
      { id: 'e', text: "ganglioni limfatici" }
    ],
    correctIds: ['c', 'e'],
    type: 'multiplu'
  },
  {
    id: 16,
    text: "Neuronii pseudounipolari:",
    options: [
      { id: 'a', text: "au aspect globulos, cu o singură prelungire" },
      { id: 'b', text: "au formă stelată și numeroase prelungiri dendritice" },
      { id: 'c', text: "se află în ganglionul spinal și au o prelungire care se divide în „T”" },
      { id: 'd', text: "au formă rotundă, ovală sau fusiformă, iar cele două prelungiri pornesc de la polii opuși ai celulei" },
      { id: 'e', text: "neuronii din ganglionii spiral Corti și vestibular Scarpa, din retină și din mucoasa olfactivă" }
    ],
    correctIds: ['c'],
    type: 'simplu'
  },
  {
    id: 17,
    text: "Media dimensiunilor celulelor este de:",
    options: [
      { id: 'a', text: "20-30 µ" },
      { id: 'b', text: "10 µ" },
      { id: 'c', text: "100 µ" },
      { id: 'd', text: "7 µ" },
      { id: 'e', text: "40-50 µ" }
    ],
    correctIds: ['a'],
    type: 'simplu'
  },
  {
    id: 18,
    text: "Fosfolipidele din membrana celulară:",
    options: [
      { id: 'a', text: "realizează funcțiile specializate ale membranei" },
      { id: 'b', text: "asigură mecanismele de transport transmembranar" },
      { id: 'c', text: "porțiunea lor hidrofilă formează un bistrat, în interiorul căruia se află porțiunea hidrofobă" },
      { id: 'd', text: "sunt atașate pe fața externă și sunt puternic încărcate negativ" },
      { id: 'e', text: "se pot afla pe fața externă sau internă a membranei, precum și transmembranar" }
    ],
    correctIds: ['c'],
    type: 'simplu'
  },
  {
    id: 19,
    text: "Organitele comune ale citoplasmei sunt, cu excepția:",
    options: [
      { id: 'a', text: "reticul endoplasmatic" },
      { id: 'b', text: "ribozomi" },
      { id: 'c', text: "neurofibrile" },
      { id: 'd', text: "mitocondrii" },
      { id: 'e', text: "centrozom" }
    ],
    correctIds: ['c'],
    type: 'simplu'
  },
  {
    id: 20,
    text: "Are rol în diviziunea celulară:",
    options: [
      { id: 'a', text: "centrozomul" },
      { id: 'b', text: "reticulul endoplasmatic" },
      { id: 'c', text: "aparatul Golgi" },
      { id: 'd', text: "nucleul" },
      { id: 'e', text: "citoplasma" }
    ],
    correctIds: ['a'],
    type: 'simplu'
  }
];

const ExamQuiz: React.FC<ExamQuizProps> = ({ user }) => {
  const navigate = useNavigate();
  const { id: centerId } = useParams();
  
  const [currentIdx, setCurrentIdx] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string[]>>({});
  const [isFinished, setIsFinished] = useState(false);
  const [score, setScore] = useState(0);

  const quizConfig = useMemo(() => {
    const config = sessionStorage.getItem('quiz_config');
    return config ? JSON.parse(config) : { numQuestions: 10, isSingleOnly: true };
  }, []);

  const filteredQuestions = useMemo(() => {
    let qs = [...DB_QUESTIONS];
    if (quizConfig.isSingleOnly) {
      qs = qs.filter(q => q.type === 'simplu');
    }
    // Limităm la numărul cerut sau la maximul disponibil
    return qs.slice(0, Math.min(quizConfig.numQuestions, qs.length));
  }, [quizConfig]);

  useEffect(() => {
    if (!user) navigate('/login');
    if (filteredQuestions.length === 0) {
      alert("Nu există suficiente grile pentru această configurație momentan.");
      navigate(`/grile/${centerId}`);
    }
  }, [user, navigate, filteredQuestions, centerId]);

  const handleOptionClick = (optionId: string) => {
    const q = filteredQuestions[currentIdx];
    const currentSelected = answers[q.id] || [];

    if (q.type === 'simplu') {
      setAnswers({ ...answers, [q.id]: [optionId] });
    } else {
      if (currentSelected.includes(optionId)) {
        setAnswers({ ...answers, [q.id]: currentSelected.filter(id => id !== optionId) });
      } else {
        setAnswers({ ...answers, [q.id]: [...currentSelected, optionId] });
      }
    }
  };

  const calculateScore = () => {
    let totalScore = 0;
    
    filteredQuestions.forEach(q => {
      const userAns = answers[q.id] || [];
      const correctAns = q.correctIds;

      if (q.type === 'simplu') {
        if (userAns.length === 1 && userAns[0] === correctAns[0]) {
          totalScore += 1;
        }
      } else {
        let correctChoices = 0;
        ['a', 'b', 'c', 'd', 'e'].forEach(opt => {
          const shouldBeIn = correctAns.includes(opt);
          const isIn = userAns.includes(opt);
          if (shouldBeIn === isIn) {
            correctChoices += 1;
          }
        });
        totalScore += (correctChoices / 5);
      }
    });

    const percentage = (totalScore / filteredQuestions.length) * 100;
    setScore(Math.round(percentage));
    setIsFinished(true);
  };

  if (!user || filteredQuestions.length === 0) return null;

  const currentQuestion = filteredQuestions[currentIdx];
  const userSelected = answers[currentQuestion.id] || [];

  if (isFinished) {
    return (
      <div className="min-h-screen bg-[#F8F9FA] flex items-center justify-center p-6">
        <div className="max-w-md w-full bg-white rounded-[48px] p-12 text-center shadow-2xl animate-zoom">
           <div className="w-24 h-24 bg-blue-50 rounded-full flex items-center justify-center text-blue-600 mx-auto mb-8">
              <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" strokeWidth="2"/></svg>
           </div>
           <h2 className="text-3xl font-bold text-slate-900 mb-2">Test Finalizat!</h2>
           <p className="text-gray-500 mb-8 font-medium">Rezultatul tău este:</p>
           
           <div className="text-7xl font-black text-blue-600 mb-4">{score}%</div>
           <p className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-10">Punctaj total</p>

           <div className="flex flex-col gap-4">
              <button 
                onClick={() => navigate(`/grile/${centerId}`)}
                className="w-full py-4 bg-black text-white rounded-2xl font-bold hover:scale-105 transition-transform"
              >
                Încearcă din nou
              </button>
              <Link 
                to="/cursuri"
                className="text-sm font-bold text-gray-400 hover:text-black transition-colors"
              >
                Înapoi la Cursuri și Grile
              </Link>
           </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8F9FA] flex flex-col">
      <div className="bg-white border-b px-8 py-6 flex items-center justify-between shadow-sm z-50">
        <div className="flex items-center gap-6">
          <button onClick={() => navigate(`/grile/${centerId}`)} className="p-2 hover:bg-gray-50 rounded-full text-gray-400 hover:text-black transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M6 18L18 6M6 6l12 12" strokeWidth="3"/></svg>
          </button>
          <div>
             <h1 className="text-sm font-bold text-slate-800 tracking-tight">Grile Admitere Sibiu</h1>
             <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Sesiune de antrenament</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
           <div className="hidden md:flex items-center gap-2 bg-blue-50 px-4 py-2 rounded-full border border-blue-100">
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
              <span className="text-xs font-bold text-blue-600">Întrebarea {currentIdx + 1} din {filteredQuestions.length}</span>
           </div>
           <button 
             onClick={calculateScore}
             className="bg-[#72f68b] text-black px-6 py-2.5 rounded-full text-xs font-bold shadow-sm hover:scale-105 transition-transform"
           >
             Finalizează Testul
           </button>
        </div>
      </div>

      <main className="flex-1 flex flex-col items-center justify-center p-6 lg:p-12 relative overflow-hidden">
        <div className="max-w-3xl w-full animate-fade-up">
           <div className="bg-white rounded-[48px] shadow-2xl border border-gray-100 p-10 lg:p-16 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-8">
                 <span className={`text-[9px] font-bold uppercase tracking-[0.2em] px-3 py-1.5 rounded-full ${
                    currentQuestion.type === 'simplu' ? 'bg-emerald-50 text-emerald-600' : 'bg-purple-50 text-purple-600'
                 }`}>
                    {currentQuestion.type === 'simplu' ? 'Complement Simplu' : 'Complement Multiplu'}
                 </span>
              </div>

              <div className="mb-12">
                 <p className="text-xs font-bold text-gray-300 uppercase tracking-widest mb-4">Întrebarea {currentIdx + 1}</p>
                 <h2 className="text-2xl lg:text-3xl font-bold text-slate-900 leading-tight">
                    {currentQuestion.text}
                 </h2>
              </div>

              <div className="space-y-4">
                 {currentQuestion.options.map((opt) => {
                    const isSelected = userSelected.includes(opt.id);
                    return (
                       <button
                         key={opt.id}
                         onClick={() => handleOptionClick(opt.id)}
                         className={`w-full text-left p-6 rounded-3xl border-2 transition-all flex items-center gap-6 group ${
                           isSelected 
                           ? 'border-blue-500 bg-blue-50/50 shadow-md ring-4 ring-blue-50' 
                           : 'border-gray-50 bg-gray-50 hover:border-blue-200'
                         }`}
                       >
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm transition-all ${
                             isSelected ? 'bg-blue-600 text-white' : 'bg-white text-slate-400 group-hover:text-blue-500'
                          }`}>
                             {opt.id.toUpperCase()}
                          </div>
                          <span className={`flex-1 text-lg ${isSelected ? 'text-blue-900 font-semibold' : 'text-slate-600'}`}>
                             {opt.text}
                          </span>
                       </button>
                    );
                 })}
              </div>
           </div>

           <div className="mt-12 flex items-center justify-between px-4">
              <button 
                onClick={() => setCurrentIdx(prev => Math.max(0, prev - 1))}
                disabled={currentIdx === 0}
                className="flex items-center gap-3 text-slate-400 hover:text-black font-bold text-sm disabled:opacity-30 disabled:cursor-not-allowed transition-all"
              >
                 <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M15 19l-7-7 7-7" strokeWidth="2.5"/></svg>
                 Prev
              </button>

              <div className="flex gap-2">
                 {filteredQuestions.map((_, i) => (
                    <div key={i} className={`w-2 h-2 rounded-full transition-all ${i === currentIdx ? 'w-8 bg-blue-500' : 'bg-gray-200'}`}></div>
                 ))}
              </div>

              <button 
                onClick={() => currentIdx < filteredQuestions.length - 1 ? setCurrentIdx(currentIdx + 1) : calculateScore()}
                className="flex items-center gap-3 text-slate-400 hover:text-blue-600 font-bold text-sm transition-all"
              >
                 {currentIdx === filteredQuestions.length - 1 ? 'Finalizează' : 'Next'}
                 <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M9 5l7 7-7 7" strokeWidth="2.5"/></svg>
              </button>
           </div>
        </div>
      </main>
    </div>
  );
};

export default ExamQuiz;
