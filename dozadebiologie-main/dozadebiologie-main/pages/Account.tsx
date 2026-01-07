
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { User } from '../App';

interface AccountProps {
  user: User | null;
  onLogout: () => void;
  onUpdateName: (newName: string) => void;
  onDeleteAccount: () => void;
}

const Account: React.FC<AccountProps> = ({ user, onLogout, onUpdateName, onDeleteAccount }) => {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [tempName, setTempName] = useState(user?.name || "");

  if (!user) {
    navigate('/login');
    return null;
  }

  const handleSave = () => {
    if (tempName.trim()) {
      onUpdateName(tempName);
      setIsEditing(false);
    }
  };

  return (
    <div className="pt-32 pb-20 px-6 max-w-4xl mx-auto">
      <div className="bg-[#EBEEF0] rounded-[56px] p-8 md:p-12 shadow-sm border border-gray-100 animate-fade-up">
        {/* Profile Header */}
        <div className="flex flex-col md:flex-row items-center gap-8 mb-16">
          <div className="w-32 h-32 rounded-full overflow-hidden bg-white border-4 border-white shadow-xl flex items-center justify-center animate-zoom">
            {user.picture ? (
              <img src={user.picture} alt={user.name} className="w-full h-full object-cover" />
            ) : (
              <span className="text-4xl font-bold text-blue-600">{user.initials}</span>
            )}
          </div>
          <div className="text-center md:text-left flex-1">
            {isEditing ? (
              <div className="flex flex-col md:flex-row items-center gap-3">
                <input 
                  type="text" 
                  value={tempName} 
                  onChange={(e) => setTempName(e.target.value)}
                  className="text-2xl font-bold text-slate-900 border-b-2 border-blue-500 bg-transparent outline-none py-1 w-full max-w-xs"
                />
                <button 
                  onClick={handleSave}
                  className="bg-blue-500 text-white px-6 py-2 rounded-full text-sm font-bold hover:bg-blue-600 transition-colors"
                >
                  Salvează
                </button>
              </div>
            ) : (
              <div className="flex flex-col md:flex-row items-center gap-4">
                <h1 className="text-4xl font-bold text-slate-900">{user.name}</h1>
                <button 
                  onClick={() => setIsEditing(true)}
                  className="text-xs font-bold text-blue-500 hover:underline uppercase tracking-widest"
                >
                  Editează nume
                </button>
              </div>
            )}
            <p className="text-gray-500 text-lg mt-1">{user.email}</p>
          </div>
        </div>

        {/* Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <div className="bg-white p-8 rounded-[40px] shadow-sm animate-fade-up delay-100">
            <h3 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-4">Securitate Cont</h3>
            <p className="text-sm text-gray-600 mb-6">Autentificat prin Google. Datele tale sunt protejate și sincronizate.</p>
            <button 
              onClick={onLogout}
              className="text-sm font-bold text-blue-600 hover:text-blue-700"
            >
              Ieși din cont &rarr;
            </button>
          </div>

          <div className="bg-white p-8 rounded-[40px] shadow-sm animate-fade-up delay-200">
            <h3 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-4">Zona Periculoasă</h3>
            <p className="text-sm text-gray-600 mb-6">Ștergerea contului este ireversibilă.</p>
            <button 
              onClick={onDeleteAccount}
              className="text-sm font-bold text-red-500 hover:text-red-700"
            >
              Șterge definitiv contul
            </button>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex flex-col md:flex-row gap-6 items-center justify-between border-t border-gray-200 pt-10">
          <Link to="/" className="text-slate-500 font-semibold hover:text-black transition-colors">
            &larr; Înapoi la platformă
          </Link>
          
          <div className="text-gray-400 text-xs italic">
            ID Utilizator: {user.email.split('@')[0]}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Account;
