
import React, { useState } from 'react';

const Contact: React.FC = () => {
  const [formState, setFormState] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const recipient = "dozadebiologie@gmail.com";
    const subject = encodeURIComponent(`Mesaj nou dozadebiologie - ${formState.name}`);
    const body = encodeURIComponent(`Nume: ${formState.name}\nEmail expeditor: ${formState.email}\n\nMesaj:\n${formState.message}`);
    window.location.href = `mailto:${recipient}?subject=${subject}&body=${body}`;
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <div className="pt-32 pb-20 px-10 max-w-6xl mx-auto flex flex-col lg:flex-row gap-20 items-center overflow-hidden">
      <div className="flex-1 animate-fade-left">
        <h2 className="text-5xl lg:text-6xl font-bold mb-8 text-slate-900 leading-tight">
          Salut! Spune-ne cu ce te putem ajuta.
        </h2>
        <p className="text-gray-500 text-lg mb-12 leading-relaxed max-w-lg">
          Ai întrebări despre cursuri, abonamente sau vrei doar să ne cunoști mai bine? Trimite-ne un mesaj și revenim la tine cât mai curând.
        </p>

        <div className="space-y-8">
          <div className="flex items-center gap-6 animate-fade-up delay-100">
            <div className="w-14 h-14 bg-blue-50 rounded-full flex items-center justify-center text-blue-500 shadow-sm">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <div>
              <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-1">Email</p>
              <p className="font-bold text-slate-800 text-lg">dozadebiologie@gmail.com</p>
            </div>
          </div>
          
          <div className="flex items-center gap-6 animate-fade-up delay-200">
            <div className="w-14 h-14 bg-green-50 rounded-full flex items-center justify-center text-green-500 shadow-sm">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <div>
              <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-1">Locație</p>
              <p className="font-bold text-slate-800 text-lg">Sibiu, România</p>
            </div>
          </div>

          {/* Discord Section */}
          <a 
            href="https://discord.gg/tFjz7pVs" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-6 animate-fade-up delay-300 group hover:scale-[1.02] transition-transform cursor-pointer"
          >
            <div className="w-14 h-14 bg-[#5865F2]/10 rounded-full flex items-center justify-center text-[#5865F2] shadow-sm group-hover:bg-[#5865F2] group-hover:text-white transition-all">
              <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037 19.736 19.736 0 0 0-4.885 1.515.069.069 0 0 0-.032.027C.533 9.048-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
              </svg>
            </div>
            <div>
              <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-1">Comunitate</p>
              <p className="font-bold text-slate-800 text-lg group-hover:text-[#5865F2] transition-colors">Join our Discord!</p>
              <span className="text-xs text-[#5865F2] font-semibold opacity-0 group-hover:opacity-100 transition-opacity">Alătură-te acum →</span>
            </div>
          </a>
        </div>
      </div>

      <div className="flex-1 w-full max-w-md animate-fade-right">
        <div className="bg-[#f9f9f9] p-8 lg:p-10 rounded-[48px] shadow-sm border border-gray-100 relative overflow-hidden">
          <div className="absolute -top-24 -right-24 w-48 h-48 bg-[#72f68b]/10 blur-[80px] rounded-full pointer-events-none"></div>
          
          <form onSubmit={handleSubmit} className="relative z-10 space-y-7">
            <div className="animate-fade-up delay-100">
              <label className="block text-sm font-bold text-slate-700 mb-3 px-2">Nume complet</label>
              <input type="text" required className="w-full px-7 py-5 rounded-[24px] bg-white border-none shadow-[0_2px_10px_rgba(0,0,0,0.02)] focus:ring-2 focus:ring-[#72f68b]/50 transition-all text-slate-800" placeholder="Ex: Andrei Popa" value={formState.name} onChange={e => setFormState({...formState, name: e.target.value})} />
            </div>
            <div className="animate-fade-up delay-200">
              <label className="block text-sm font-bold text-slate-700 mb-3 px-2">Adresa de email</label>
              <input type="email" required className="w-full px-7 py-5 rounded-[24px] bg-white border-none shadow-[0_2px_10px_rgba(0,0,0,0.02)] focus:ring-2 focus:ring-[#72f68b]/50 transition-all text-slate-800" placeholder="andrei@email.com" value={formState.email} onChange={e => setFormState({...formState, email: e.target.value})} />
            </div>
            <div className="animate-fade-up delay-300">
              <label className="block text-sm font-bold text-slate-700 mb-3 px-2">Mesaj</label>
              <textarea rows={5} required className="w-full px-7 py-5 rounded-[24px] bg-white border-none shadow-[0_2px_10px_rgba(0,0,0,0.02)] focus:ring-2 focus:ring-[#72f68b]/50 transition-all text-slate-800 resize-none" placeholder="Cum te putem ajuta?" value={formState.message} onChange={e => setFormState({...formState, message: e.target.value})} />
            </div>
            
            <button type="submit" className="w-full py-5 bg-[#72f68b] text-black font-bold rounded-[24px] hover:scale-[1.02] active:scale-95 transition-all shadow-md flex items-center justify-center gap-2 group animate-fade-up delay-400">
              <span>Trimite mesajul</span>
              <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </button>
            
            {submitted && <div className="text-center text-green-600 font-bold mt-4 text-sm animate-fade-up">Se deschide aplicația de email...</div>}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
