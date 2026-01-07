
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

const About: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Top Left Logo Button - Adjusted top position for mobile */}
      <Link to="/" className="fixed top-24 lg:top-5 left-1/2 -translate-x-1/2 lg:left-10 lg:translate-x-0 z-[1000] flex items-center gap-2 group animate-fade-down">
        <div className="flex items-center gap-2">
            <DnaLogo />
            <span className="text-xl font-bold text-gray-800 group-hover:text-black transition-colors">dozadebiologie</span>
        </div>
      </Link>

      <div className="flex flex-col lg:flex-row flex-1">
        {/* Image Section - Static */}
        <div className="lg:w-1/2 h-[50vh] lg:h-auto bg-black relative overflow-hidden">
          <div 
            className="absolute inset-0 bg-cover bg-center animate-fade-left"
            style={{ 
              backgroundImage: `url('https://images.unsplash.com/photo-1622253692010-333f2da6031d?q=80&w=1200&auto=format&fit=crop')`,
              backgroundPosition: '50% 20%'
            }}
          >
            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent"></div>
          </div>
        </div>

        {/* Text Section */}
        <div className="lg:w-1/2 p-12 lg:p-24 pt-40 lg:pt-24 flex flex-col justify-center items-start">
          <div className="max-w-xl">
            <h1 className="text-5xl lg:text-6xl font-bold mb-12 tracking-tight text-gray-900 animate-fade-up delay-100">
              Despre dozadebiologie.
            </h1>
            
            <div className="space-y-8">
              <p className="text-xl text-gray-600 leading-relaxed font-normal animate-fade-up delay-200">
                dozadebiologie a fost fondată în ianuarie 2026 și este un startup educațional creat
                pentru a face pregătirea pentru admiterea la Medicină mai accesibilă.
              </p>

              <p className="text-xl text-gray-600 leading-relaxed font-normal animate-fade-up delay-300">
                Platforma oferă materiale text, video și flashcarduri pentru înțelegere reală,
                eliminând memorarea mecanică fără logică.
              </p>

              <p className="text-xl text-gray-600 leading-relaxed font-normal animate-fade-up delay-400">
                Proiectul aparține unui medic rezident neurolog și profesor de biologie, 
                unind rigoarea medicală cu experiența pedagogică.
              </p>
            </div>

            <div className="mt-14 animate-fade-up delay-500">
              <Link 
                to="/" 
                className="bg-black text-white px-10 py-4 rounded-lg font-bold text-sm hover:bg-gray-800 transition-all transform hover:scale-[1.02] active:scale-95 inline-block shadow-lg"
              >
                Începe acum
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Section - Identical to Home.tsx */}
      <footer className="bg-white py-20 px-10 border-t border-gray-50 relative z-10 animate-fade-up delay-400">
        <div className="max-w-7xl mx-auto flex flex-col items-center gap-12">
          
          {/* Footer Links */}
          <div className="flex flex-wrap justify-center gap-x-12 gap-y-4 text-slate-400 text-lg font-normal">
            <Link to="/termeni" className="hover:text-black transition-colors">Termeni și condiții</Link>
            <Link to="/confidentialitate" className="hover:text-black transition-colors">Confidențialitate</Link>
            <Link to="/despre" className="hover:text-black transition-colors">Despre noi</Link>
            <Link to="/contact" className="hover:text-black transition-colors">Contactează-ne</Link>
          </div>

          {/* SOL Logo Centrat */}
          <div className="flex items-center justify-center">
            <a href="https://ec.europa.eu/consumers/odr/main/index.cfm?event=main.home2.show&lng=RO" target="_blank" rel="noopener noreferrer" className="opacity-60 hover:opacity-100 transition-opacity">
               <img 
                 src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRachJfD3wqvzMyKH1skGNG2hAlp6RyKhm6YQ&s" 
                 alt="Soluționarea Online a Litigiilor" 
                 className="h-14 w-auto object-contain rounded-lg border border-slate-200"
               />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default About;
