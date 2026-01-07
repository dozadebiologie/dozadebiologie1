
import React, { useState, useEffect, useMemo } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { User } from '../App';

interface FlashcardChapterProps {
  user: User | null;
}

interface Flashcard {
  question: string;
  answer: string;
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

// Datele pentru capitolul 1 (singurele furnizate momentan)
const rawData = `Care sunt nivelele de organizare a corpului uman, începând de la celule?|Celule → Țesuturi → Organe → Sisteme de organe.
Care sunt principalele funcții ale organismului asigurate de sistemele de organe?|Funcțiile de relație (interacțiune cu mediul), nutriție și reproducere.
Cum funcționează organele în corpul uman?|Organele funcționează în strânsă corelație unele cu altele, nu izolat.
Care sunt cele patru segmente principale în care este împărțit corpul uman?|Cap, gât, trunchi și membre.
Ce constituie împreună extremitatea cefalică a corpului uman?|Capul și gâtul.
În câte părți este structurat capul și cum se numesc acestea?|Capul este structurat în două părți: cea craniană (neurocraniu sau cutia craniană) și cea facială (viscerocraniu sau fața).
Care este funcția principală a gâtului?|Gâtul face legătura între cap și trunchi.
Ce tipuri de componente se remarcă la nivelul gâtului?|Componente de natură somatică (oase, mușchi, articulații) și organe interne sau viscere (laringe, esofag, trahee, paratiroide, tiroida).
În ce trei diviziuni principale se împarte trunchiul?|Torace, abdomen și pelvis.
Ce rol au diviziunile trunchiului (torace, abdomen, pelvis)?|Ele delimitează la interior cavitățile cu același nume (cavitățile toracică, abdominală și pelviană) care adăpostesc organe interne (viscere).
Ce mușchi desparte cavitatea toracică de cea abdominală?|Mușchiul diafragm.
Cum este delimitată inferior cavitatea abdominală?|Cavitatea abdominală este delimitată inferior de cavitatea pelviană.
Ce mușchi limitează inferior cavitatea pelviană?|Diafragma perineală.
Ce structuri adăpostește cavitatea toracică, privită în plan frontal anterior?|Mediastinul, cavitățile pleurală și cavitatea pericardială.
Care sunt cele nouă subdiviziuni (regiuni) ale cavității abdominale?|Hipocondru drept, Epigastru, Hipocondru stâng, Abdomen lateral drept, Periombilical (mezogastru), Abdomen lateral stâng, Inghinal drept, Hipogastru, Inghinal stâng.
Ce organe se găsesc predominant în regiunea epigastrică a abdomenului?|Porțiunea de mijloc a ficatului, o parte din colonul transvers, vezica biliară și stomacul.
Ce organe se găsesc predominant în hipocondrul stâng?|O parte din lobul stâng al ficatului, stomacul, flexura colică stângă (flexura splenică).
Ce organe predomină în regiunea periombilicală (mezogastru)?|Colonul transvers și cea mai mare parte din intestinul subțire.
Unde se află o parte din lobul drept al ficatului în cavitatea abdominală?|În hipocondrul drept.
Care sunt cele trei segmente ale membrelor superioare?|Braț, antebraț și mână.
Care sunt cele trei segmente ale membrelor inferioare?|Coapsă, gambă și picior.
Prin ce structură se fixează membrele superioare la nivelul trunchiului?|Prin centura scapulară (centura pectorală).
Prin ce structură se fixează membrele inferioare la nivelul trunchiului?|Prin centura pelviană.
De ce se recurge la axe și planuri în descrierea anatomică a corpului uman?|Pentru precizarea poziției segmentelor corpului și a elementelor ce intraă în alcătuirea fiecărui organ.
Ce principiu de alcătuire are corpul omenesc și câte axe și planuri are?|Corpul omenesc este alcătuit după principiul simetriei bilaterale, fiind un corp tridimensional, cu 3 axe și 3 planuri.
Cum se întretaie axele corpului uman?|În unghi drept.
Descrie axul longitudinal al corpului uman, inclusiv polii săi. (Axul lungimii corpului)|Axul longitudinal este vertical, delimitat de polul superior (cranial) și polul inferior (caudal), fiind cuprins între creștetul capului și tălpile picioarelor.
Descrie axul sagital al corpului uman, inclusiv polii săi. (Axul anteroposterior)|Axul sagital este axul care descrie grosimea corpului, delimitat de polul anterior și polul posterior.
Descrie axul transversal al corpului uman, inclusiv polii săi. (Axul orizontal)|Axul transversal este orizontal, caracterizează lățimea corpului și prezintă un pol stâng și unul drept.
Câte axe traversează fiecare plan al corpului omenesc?|Câte două dintre cele trei axe menționate (longitudinal, sagital, transversal).
Ce axe traversează planul sagital?|Axul sagital și axul longitudinal.
Ce este planul medio-sagital și cum mai este denumit?|Este planul care împarte corpul în două jumătăți simetrice, trecând prin mijlocul acestuia; este numit și planul simetriei bilaterale.
Ce axe traversează planul frontal?|Axul longitudinal și axul transversal.
Cum împarte planul frontal corpul și cu ce structură este paralel?|Planul frontal este paralel cu fruntea și împarte corpul într o parte anterioară (ventrală) și una posterioară (dorsală).
Ce axe traversează planul transversal (orizontal)?|Axul sagital și axul transversal.
Cum mai este numit planul transversal (orizontal) și cum împarte corpul?|Este numit planul metameriei corpului și împarte corpul într o zonă superioară (cranială) și una inferioară (caudală).
Ce termen descrie, pentru membre, formațiunile mai apropiate de centuri (scapulară/pelviană)?|Proximal.
Ce termen descrie, pentru membre, formațiunile mai îndepărtate de centuri (scapulară/pelviană)?|Distal.
Ce termeni se folosesc pentru a descrie formațiunile de la nivelul palmei?|Volar sau palmar.
Ce termen se folosește pentru a descrie formațiunile de la nivelul tălpii piciorului?|Plantar.
Ce termen se folosește pentru a descrie formațiunile de pe suprafața superioară a labei piciorului?|Dorsal.
Ce termeni se folosesc pentru a descrie gradul de apropiere de suprafața corpului?|Superficial și profund.`;

const DnaLogo = ({ size = 24 }: { size?: number }) => (
  <img 
    src="https://dozadebiologie.wordpress.com/wp-content/uploads/2023/02/2.profil.png" 
    alt="dozadebiologie logo" 
    style={{ width: size, height: size }}
    className="object-contain"
  />
);

const FlashcardChapter: React.FC<FlashcardChapterProps> = ({ user }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isChapterOne = id === "1";

  // Parsing date (doar dacă e capitolul 1)
  const allFlashcards = useMemo(() => {
    if (!isChapterOne) return [];
    return rawData.split('\n').map(line => {
      const [q, a] = line.split('|');
      return { question: q, answer: a };
    });
  }, [isChapterOne]);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [learnedCount, setLearnedCount] = useState(0);
  const [scheduledCards, setScheduledCards] = useState<{ card: Flashcard, time: number }[]>([]);
  const [deck, setDeck] = useState<Flashcard[]>(allFlashcards);

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  // Sincronizare deck la montare/id change
  useEffect(() => {
    if (isChapterOne) {
      setDeck(allFlashcards);
      setCurrentIndex(0);
      setLearnedCount(0);
      setScheduledCards([]);
    }
  }, [id, allFlashcards, isChapterOne]);

  // Checker pentru cardurile programate (la 5 minute)
  useEffect(() => {
    if (!isChapterOne) return;
    const interval = setInterval(() => {
      const now = Date.now();
      const readyCards = scheduledCards.filter(sc => now >= sc.time);
      if (readyCards.length > 0) {
        setDeck(prev => [...prev, ...readyCards.map(rc => rc.card)]);
        setScheduledCards(prev => prev.filter(sc => now < sc.time));
      }
    }, 5000);
    return () => clearInterval(interval);
  }, [scheduledCards, isChapterOne]);

  const handleNext = () => {
    if (deck.length === 0) return;
    setIsFlipped(false);
    setCurrentIndex((prev) => (prev + 1) % deck.length);
  };

  const handlePrev = () => {
    if (deck.length === 0) return;
    setIsFlipped(false);
    setCurrentIndex((prev) => (prev - 1 + deck.length) % deck.length);
  };

  const handleLearned = (e: React.MouseEvent) => {
    e.stopPropagation();
    setLearnedCount(prev => prev + 1);
    const newDeck = deck.filter((_, i) => i !== currentIndex);
    if (newDeck.length === 0 && scheduledCards.length === 0) {
      alert("Felicitări! Ai terminat toate flashcardurile din acest capitol.");
      setDeck(allFlashcards);
      setCurrentIndex(0);
      setLearnedCount(0);
    } else {
      setDeck(newDeck);
      if (newDeck.length > 0) setCurrentIndex(prev => prev % newDeck.length);
    }
    setIsFlipped(false);
  };

  const handleForgot = (e: React.MouseEvent) => {
    e.stopPropagation();
    const currentCard = deck[currentIndex];
    const fiveMinutesLater = Date.now() + 5 * 60 * 1000;
    setScheduledCards(prev => [...prev, { card: currentCard, time: fiveMinutesLater }]);
    const newDeck = deck.filter((_, i) => i !== currentIndex);
    setDeck(newDeck);
    if (newDeck.length > 0) setCurrentIndex(prev => prev % newDeck.length);
    setIsFlipped(false);
  };

  const chapterIndex = id ? parseInt(id) - 1 : -1;
  const chapterTitle = chapters[chapterIndex] || "Capitol necunoscut";

  if (!user) return null;

  return (
    <div className="flex flex-col min-h-screen bg-[#F8F9FA]">
      <style>{`
        .perspective { perspective: 1000px; }
        .preserve-3d { transform-style: preserve-3d; }
        .backface-hidden { backface-visibility: hidden; }
        .flip-card-inner {
            transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .flipped { transform: rotateY(180deg); }
      `}</style>

      {/* Top Header */}
      <div className="bg-white border-b px-8 py-4 flex items-center justify-between shadow-sm z-50">
        <div className="flex items-center gap-6">
          <Link to="/flashcards" className="flex items-center gap-4 group">
            <svg className="w-4 h-4 text-gray-400 group-hover:text-black transition-colors" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
              <path d="M15 19l-7-7 7-7" />
            </svg>
            <div className="flex items-center gap-2">
                <DnaLogo />
                <span className="font-bold text-xl text-slate-800 tracking-tight">dozadebiologie</span>
            </div>
          </Link>
        </div>
        
        {isChapterOne && (
          <div className="flex items-center gap-4 text-xs font-bold text-gray-400 uppercase tracking-widest">
             Progres: {learnedCount} / {allFlashcards.length}
          </div>
        )}
      </div>

      {/* Content Area */}
      <main className="flex-1 flex flex-col items-center justify-center p-6 lg:p-12 relative overflow-hidden">
        
        {/* Decor Background */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-50/50 rounded-full blur-[120px] pointer-events-none"></div>

        <div className="max-w-4xl w-full text-center animate-fade-up relative z-10">
            <span className={`text-[10px] font-bold uppercase tracking-[0.2em] px-4 py-2 rounded-full mb-6 inline-block ${
                isChapterOne ? 'bg-blue-50 text-blue-600' : 'bg-amber-50 text-amber-600'
            }`}>
                Capitolul {id} {!isChapterOne && '- În curând'}
            </span>
            <h1 className="text-3xl lg:text-4xl font-bold text-slate-800 tracking-tight leading-tight mb-16 px-4">
                {chapterTitle}
            </h1>
            
            {isChapterOne ? (
                deck.length > 0 ? (
                    <div className="flex items-center justify-center gap-4 md:gap-12">
                        {/* Prev Button */}
                        <button 
                            onClick={handlePrev}
                            className="hidden md:flex w-14 h-14 bg-white rounded-full border border-blue-100 items-center justify-center text-blue-500 shadow-sm hover:shadow-md hover:scale-110 transition-all active:scale-90"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7" />
                            </svg>
                        </button>

                        {/* Main Card Container */}
                        <div className="flex-1 max-w-2xl perspective">
                            <div 
                                className={`relative h-[380px] w-full cursor-pointer flip-card-inner preserve-3d ${isFlipped ? 'flipped' : ''}`}
                                onClick={() => setIsFlipped(!isFlipped)}
                            >
                                {/* Front Side */}
                                <div className="absolute inset-0 bg-white p-10 md:p-16 rounded-[40px] shadow-2xl border border-blue-50 flex items-center justify-center backface-hidden">
                                    <p className="text-xl md:text-2xl font-semibold text-slate-800 leading-relaxed">
                                        {deck[currentIndex].question}
                                    </p>
                                </div>

                                {/* Back Side */}
                                <div className="absolute inset-0 bg-blue-50 p-10 md:p-16 rounded-[40px] shadow-2xl border border-blue-100 flex flex-col items-center justify-center backface-hidden [transform:rotateY(180deg)]">
                                    <p className="text-lg md:text-xl text-blue-900 leading-relaxed mb-10 overflow-y-auto max-h-[180px] no-scrollbar">
                                        {deck[currentIndex].answer}
                                    </p>
                                    
                                    <div className="flex items-center gap-4 w-full mt-auto">
                                        <button 
                                            onClick={handleLearned}
                                            className="flex-1 bg-[#2ecc71] text-white py-4 rounded-2xl font-bold text-sm hover:scale-[1.05] transition-transform shadow-lg shadow-green-100"
                                        >
                                            Am reținut
                                        </button>
                                        <button 
                                            onClick={handleForgot}
                                            className="flex-1 bg-[#e67e22] text-white py-4 rounded-2xl font-bold text-sm hover:scale-[1.05] transition-transform shadow-lg shadow-orange-100"
                                        >
                                            Am uitat
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Next Button */}
                        <button 
                            onClick={handleNext}
                            className="hidden md:flex w-14 h-14 bg-white rounded-full border border-blue-100 items-center justify-center text-blue-500 shadow-sm hover:shadow-md hover:scale-110 transition-all active:scale-90"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" />
                            </svg>
                        </button>
                    </div>
                ) : (
                    <div className="bg-white p-12 rounded-[40px] shadow-xl border border-gray-100">
                        <p className="text-gray-500 text-lg mb-6 italic">
                            Ai parcurs toate întrebările disponibile momentan.
                        </p>
                        {scheduledCards.length > 0 && (
                            <p className="text-blue-500 font-bold text-sm uppercase tracking-widest animate-pulse">
                                Așteptăm reintroducerea celor {scheduledCards.length} întrebări uitate...
                            </p>
                        )}
                    </div>
                )
            ) : (
                <div className="bg-white p-12 rounded-[40px] shadow-sm border border-gray-100 max-w-lg mx-auto">
                    <div className="w-20 h-20 bg-amber-50 rounded-full flex items-center justify-center text-amber-500 mx-auto mb-6">
                        <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </div>
                    <p className="text-gray-400 text-lg italic leading-relaxed">
                        Lucrăm la conținutul acestui capitol. Flashcardurile vor fi disponibile în curând!
                    </p>
                </div>
            )}

            <div className="mt-16 flex flex-col items-center gap-8">
                <Link 
                    to="/flashcards"
                    className="flex items-center gap-2 text-[10px] font-bold text-gray-400 hover:text-black transition-colors uppercase tracking-[0.2em]"
                >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                    Înapoi la listă
                </Link>
                
                {isChapterOne && deck.length > 0 && (
                  <div className="flex md:hidden items-center gap-6">
                      <button onClick={handlePrev} className="w-12 h-12 bg-white rounded-full shadow-sm flex items-center justify-center text-blue-500">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M15 19l-7-7 7-7" /></svg>
                      </button>
                      <button onClick={handleNext} className="w-12 h-12 bg-white rounded-full shadow-sm flex items-center justify-center text-blue-500">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M9 5l7 7-7 7" /></svg>
                      </button>
                  </div>
                )}
            </div>
        </div>
      </main>
    </div>
  );
};

export default FlashcardChapter;
