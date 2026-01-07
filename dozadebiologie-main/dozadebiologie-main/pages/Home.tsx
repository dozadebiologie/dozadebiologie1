
import React from 'react';
import { Link } from 'react-router-dom';

const DnaLogo = ({ size = 40 }: { size?: number }) => (
  <img 
    src="https://dozadebiologie.wordpress.com/wp-content/uploads/2023/02/2.profil.png" 
    alt="dozadebiologie logo" 
    style={{ width: size, height: size }}
    className="object-contain"
  />
);

const Home: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <div className="flex flex-col lg:flex-row flex-1 min-h-screen">
        {/* Left Side */}
        <div className="lg:w-1/2 p-10 pt-32 lg:pt-20 lg:p-20 flex flex-col justify-center items-start bg-white relative z-10">
          <div className="mb-20 animate-fade-down">
            <Link to="/" className="flex items-center gap-2 group">
               <div className="h-12 w-auto flex items-center gap-3">
                  <DnaLogo />
                  <span className="text-3xl font-bold tracking-tight text-slate-900 group-hover:text-black transition-colors">dozadebiologie</span>
               </div>
            </Link>
          </div>

          <div className="max-w-xl">
            <h1 className="text-5xl lg:text-6xl font-normal leading-[1.1] mb-8 text-slate-900 animate-fade-up delay-100">
              Drumul tău spre<br />medicină începe acum.
            </h1>
            <p className="text-gray-500 text-lg mb-10 leading-relaxed animate-fade-up delay-200">
              Găsește cei mai buni profesori de biologie și chimie. Pregătește-te structurat, înțelege materia în profunzime și transformă-ți visul în realitate.
            </p>
            
            <div className="flex flex-wrap gap-4 items-center animate-fade-up delay-300">
              <Link
                to="/contact"
                className="inline-block bg-[#72f68b] text-black px-10 py-4 rounded-full font-bold text-sm hover:scale-105 transition-transform shadow-md"
              >
                Începe acum
              </Link>
              
              <Link
                to="/surpriza"
                className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-8 py-4 rounded-full font-bold text-sm hover:scale-105 transition-all shadow-lg shadow-purple-200 animate-pulse active:scale-95"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5 2a1 1 0 011 1v1h1a1 1 0 010 2H6v1a1 1 0 11-2 0V6H3a1 1 0 010-2h1V3a1 1 0 011-1zm0 10a1 1 0 011 1v1h1a1 1 0 110 2H6v1a1 1 0 11-2 0v-1H3a1 1 0 110-2h1v-1a1 1 0 011-1zM12 2a1 1 0 01.967.744L14.146 7.2 17.5 9.134a1 1 0 010 1.732l-3.354 1.935-1.18 4.455a1 1 0 01-1.933 0L9.854 12.8 6.5 10.866a1 1 0 010-1.732l3.354-1.935 1.18-4.455A1 1 0 0112 2z" clipRule="evenodd" />
                </svg>
                Surpriza
              </Link>
            </div>
          </div>
        </div>

        {/* Right Side - Image Static */}
        <div className="hidden lg:block lg:w-1/2 bg-black relative overflow-hidden">
          <div 
            className="absolute inset-0 bg-cover bg-center animate-zoom"
            style={{ 
              backgroundImage: `url('https://img.freepik.com/free-photo/medical-students-are-hallway-talking_1157-31517.jpg')` 
            }}
          >
          </div>
        </div>
      </div>

      {/* Footer Section */}
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

export default Home;
