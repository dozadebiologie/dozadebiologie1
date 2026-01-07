
import React from 'react';
import { Link } from 'react-router-dom';

const DnaLogo = ({ size = 30 }: { size?: number }) => (
  <img 
    src="https://dozadebiologie.wordpress.com/wp-content/uploads/2023/02/2.profil.png" 
    alt="dozadebiologie logo" 
    style={{ width: size, height: size }}
    className="object-contain"
  />
);

const Terms: React.FC = () => {
  return (
    <div className="min-h-screen bg-white pb-20">
      {/* Mini Header for Navigation Back */}
      <div className="pt-10 px-10 max-w-7xl mx-auto flex justify-between items-center animate-fade-down">
        <Link to="/" className="flex items-center gap-2 group">
          <DnaLogo />
          <span className="text-xl font-bold text-slate-800 group-hover:text-black transition-colors tracking-tight">dozadebiologie</span>
        </Link>
      </div>

      {/* Main Content Area */}
      <article className="max-w-4xl mx-auto mt-20 px-6">
        <header className="mb-16 animate-fade-up">
          <h1 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-4">
            Termeni și condiții
          </h1>
          <p className="text-xl text-gray-400 font-medium">dozadebiologie.com</p>
        </header>

        <div className="space-y-12 text-slate-600 leading-relaxed text-lg">
          <section className="animate-fade-up delay-100">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">1. Informații generale</h2>
            <p>
              Acești Termeni și Condiții reglementează utilizarea platformei dozadebiologie.com („Platforma”).
              Prin accesarea și utilizarea platformei, ești de acord cu acești termeni. Dacă nu ești de acord, te rugăm să nu folosești platforma.
            </p>
          </section>

          <section className="animate-fade-up delay-200">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">2. Serviciile oferite</h2>
            <p>
              dozadebiologie.com oferă materiale educaționale online (texte, videoclipuri, teste, grile, flashcarduri și alte resurse).
            </p>
          </section>
          <section className="animate-fade-up delay-200">
            <h2 className="text-2xl font-bold text-slate-900 mb-4"> 3. Accesul și utilizarea conținutului</h2>
            <p>
              Materialele oferite sunt accesibile exclusiv online, prin autentificare în contul de utilizator. Conținutul nu poate fi descărcat, printat, copiat, redistribuit sau folosit în alt scop decât cel personal, educațional. Este strict interzisă partajarea contului sau accesul simultan de pe mai mult de 3 dispozitive decât este permis explicit. Platforma își rezervă dreptul de a suspenda conturile care fac obiectul unor suspiciuni rezonabile de fraudă (ex: utilizarea contului de către mai multe persoane, crearea mai multor conturi pentru acces gratuit etc.). Dacă se întâmplă ca un cont să fie suspendat, utilizatorul ne poate contacta prin pagina de contact pentru clarificări.
            </p>
          </section>
<section className="animate-fade-up delay-200">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">4. Prețuri, plăți, acces materiale.</h2>
            <p>
              Materialele oferite sunt accesibile exclusiv online, prin autentificare în contul de utilizator. Conținutul nu poate fi descărcat, printat, copiat, redistribuit sau folosit în alt scop decât cel personal, educațional. Este strict interzisă partajarea contului sau accesul simultan de pe mai mult de 3 dispozitive decât este permis explicit. Platforma își rezervă dreptul de a suspenda conturile care fac obiectul unor suspiciuni rezonabile de fraudă (ex: utilizarea contului de către mai multe persoane, crearea mai multor conturi pentru acces gratuit etc.). Dacă se întâmplă ca un cont să fie suspendat, utilizatorul ne poate contacta prin pagina de contact pentru clarificări.
            </p>
          </section>
          <section className="bg-red-50 p-8 rounded-3xl border border-red-100 animate-fade-up delay-300">
            <h2 className="text-2xl font-bold text-red-900 mb-4">5. Politica de rambursare</h2>
            <p className="text-red-800 font-bold mb-4 italic text-xl">Nu oferim returnarea banilor.</p>
            <p className="text-red-700 text-base">
              Prin achiziționarea unui pachet, utilizatorul este de acord că nu beneficiază de drept legal de retragere și că suma achitată nu poate fi rambursată.
            </p>
          </section>

          <section className="animate-fade-up delay-200">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">6. Limita răspunderii.</h2>
            <p>
              Site-ul nu garantează reușita la examenul de admitere și nu poate fi tras la răspundere pentru rezultatele obținute de utilizatori. Performanța la examen depinde exclusiv de efortul individual, de modul în care sunt utilizate materialele și de alți factori externi care nu țin de platformă. Platforma pune la dispoziție materiale educaționale cuprinzătoare și adaptate cerințelor examenului, însă rezultatul final depinde exclusiv de efortul individual al utilizatorului și de modul în care acesta folosește resursele. Deși materialele disponibile pe platformă sunt concepute special pentru a sprijini pregătirea examenului și acoperă tematica relevantă, utilizarea acestora nu garantează promovarea examenului sau obținerea unui punctaj minim. Succesul depinde de modul în care utilizatorul își organizează studiul și își valorifică resursele disponibile. Încurajăm utilizatorii să folosească și alte surse complementare de învățare, precum manuale, ghiduri oficiale și resurse suplimentare. Conținutul este creat de tutorii platformei și este actualizat periodic conform programei oficiale, însă pot exista situații în care anumite informații să nu fie la zi. Încurajăm utilizatorii să verifice periodic sursele oficiale de informare, cum ar fi site-urile facultăților de medicină, pentru a se asigura că dețin cele mai recente informații privind condițiile de admitere. Este responsabilitatea exclusivă a utilizatorului să verifice informațiile oficiale privind admiterea la facultate. Acestea includ, fără a se limita la: datele oficiale pentru simulările de admitere, calendarul oficial al examenului, tematica specifică pentru fiecare universitate și specializare, precum și lista manualelor și culegerilor oficiale recomandate pentru pregătire, conform cerințelor fiecărui centru universitar.
            </p>
          </section>
          
        </div>
        
        <div className="mt-20 pt-10 border-t border-gray-100 text-center animate-fade-up delay-500">
            <Link to="/" className="text-sm font-bold text-gray-400 hover:text-black transition-colors uppercase tracking-widest">
                Înapoi la pagina principală
            </Link>
        </div>
      </article>
    </div>
  );
};

export default Terms;
