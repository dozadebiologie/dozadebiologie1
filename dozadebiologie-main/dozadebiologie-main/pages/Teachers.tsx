
import React from 'react';
import { Link } from 'react-router-dom';

const Teachers: React.FC = () => {
  const staff = [
    {
      name: 'Dr. Barbulat Ștefan',
      role: 'Medic rezident neurolog',
      desc: 'Fondatorul Doza de Biologie. Pasionat de biologie, neuroștiințe și pedagogie medicală aplicată.',
      image: 'https://images.unsplash.com/photo-1767610220513-f15c21b53cdb?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      isRecruitment: false
    },
    {
      name: 'Vino în echipa noastră',
      role: 'Vrei să devii profesor de chimie?',
      desc: 'Căutăm colegi entuziaști și pasionați de chimie pentru a ne mări echipa. Dacă vrei să ajuți viitorii studenți, scrie-ne!',
      image: 'https://plus.unsplash.com/premium_photo-1758741334821-307c3aa284fc?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      isRecruitment: true
    }
  ];

  return (
    <div className="pt-32 pb-20 px-10 max-w-6xl mx-auto">
      <div className="text-center mb-20">
        <h2 className="text-5xl font-bold mb-6">Cunoaște profesorii tăi.</h2>
        <p className="text-gray-500 text-lg max-w-2xl mx-auto">
          O echipă dedicată care îmbină experiența clinică din spitale cu metode moderne de predare.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 justify-items-center">
        {staff.map((person, idx) => (
          <Link 
            key={idx} 
            to="/contact"
            className="block bg-white rounded-[32px] overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl hover:scale-[1.02] transition-all p-4 max-w-md w-full animate-zoom group"
          >
            <div className={`aspect-[4/5] overflow-hidden rounded-[24px] mb-8 relative ${person.isRecruitment ? 'bg-gray-50' : ''}`}>
              <img 
                src={person.image} 
                alt={person.name} 
                className={`w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 ${person.isRecruitment ? 'opacity-90' : ''}`}
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-300 flex items-center justify-center">
                <span className="bg-white/90 backdrop-blur px-6 py-2 rounded-full text-sm font-bold opacity-0 group-hover:opacity-100 transition-opacity translate-y-4 group-hover:translate-y-0 duration-300 shadow-lg text-slate-900">
                  {person.isRecruitment ? 'Aplică acum' : 'Contactează-mă'}
                </span>
              </div>
            </div>
            <div className="px-4 pb-4 text-center">
                <span className={`${person.isRecruitment ? 'text-purple-500' : 'text-blue-500'} text-sm font-semibold uppercase tracking-wider`}>
                  {person.role}
                </span>
                <h3 className="text-2xl font-bold mt-2 mb-4 group-hover:text-blue-600 transition-colors">{person.name}</h3>
                <p className="text-gray-600 leading-relaxed italic">
                  "{person.desc}"
                </p>
                <div className="mt-6 text-sm font-bold text-slate-400 group-hover:text-black transition-colors flex items-center justify-center gap-2">
                  {person.isRecruitment ? 'Trimite CV-ul' : 'Scrie-mi un mesaj'}
                  <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Teachers;
