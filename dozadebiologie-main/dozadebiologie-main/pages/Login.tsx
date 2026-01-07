
import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { User } from '../App';

interface LoginProps {
  onLogin: (user: User) => void;
}

// NOTĂ: Acest ID trebuie să fie creat în Google Cloud Console (https://console.cloud.google.com/)
// Trebuie să adăugați URL-ul curent al site-ului la "Authorized JavaScript Origins"
const GOOGLE_CLIENT_ID = "307114630478-bi9c64qthev5apihc4jjmid9lo27o38r.apps.googleusercontent.com"; 

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const googleBtnRef = useRef<HTMLDivElement>(null);
  const [error, setError] = useState<string | null>(null);

  const decodeJwt = (token: string) => {
    try {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
          return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      }).join(''));
      return JSON.parse(jsonPayload);
    } catch (e) {
      return null;
    }
  };

  const handleCallbackResponse = (response: any) => {
    const userObject = decodeJwt(response.credential);
    if (userObject) {
      const initials = userObject.name
        .split(' ')
        .map((n: string) => n[0])
        .join('')
        .toUpperCase();

      const realUser: User = {
        name: userObject.name,
        email: userObject.email,
        picture: userObject.picture,
        initials: initials
      };
      onLogin(realUser);
    } else {
      setError("Eroare la procesarea datelor de la Google.");
    }
  };

  // Metodă de urgență pentru testare dacă Google ID-ul este invalid pentru acest URL
  const handleDemoLogin = () => {
    const demoUser: User = {
      name: "Utilizator Test",
      email: "test@dozadebiologie.ro",
      initials: "UT",
      picture: "https://ui-avatars.com/api/?name=Utilizator+Test&background=3B82F6&color=fff"
    };
    onLogin(demoUser);
  };

  useEffect(() => {
    /* global google */
    const initGoogle = () => {
      if (typeof window !== 'undefined' && (window as any).google) {
        try {
          (window as any).google.accounts.id.initialize({
            client_id: GOOGLE_CLIENT_ID,
            callback: handleCallbackResponse,
            auto_select: false,
            cancel_on_tap_outside: true
          });

          (window as any).google.accounts.id.renderButton(
            googleBtnRef.current,
            { 
              theme: "outline", 
              size: "large", 
              width: "100%",
              text: "signup_with", 
              shape: "pill",
              logo_alignment: "left"
            }
          );
        } catch (e) {
          console.error("Google Auth Init Error:", e);
          setError("Serviciul Google Login nu a putut fi inițializat corect.");
        }
      }
    };

    const timer = setTimeout(initGoogle, 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-[#F8F9FA] flex items-center justify-center p-6 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-50 rounded-full blur-[120px] opacity-60"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-50 rounded-full blur-[120px] opacity-60"></div>

      <div className="max-w-md w-full bg-white rounded-[48px] p-10 lg:p-14 shadow-2xl border border-gray-100 relative z-10 animate-zoom">
        <div className="text-center mb-10">
          <Link to="/" className="inline-block mb-8 hover:scale-110 transition-transform">
            <img 
              src="https://dozadebiologie.wordpress.com/wp-content/uploads/2023/02/2.profil.png" 
              alt="dozadebiologie logo" 
              className="w-[60px] h-[60px] object-contain"
            />
          </Link>
          <h1 className="text-3xl font-bold text-slate-900 mb-3 tracking-tight">Ești gata?</h1>
          <p className="text-gray-500 leading-relaxed">Începe pregătirea ta pentru medicină folosind contul Google.</p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-100 rounded-2xl text-red-600 text-sm font-medium flex items-start gap-3 animate-fade-up">
            <svg className="w-5 h-5 mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div>
              <p>{error}</p>
              <p className="text-[11px] mt-1 opacity-80">Google cere ca acest URL să fie autorizat în consola de dezvoltator (Error 401).</p>
            </div>
          </div>
        )}

        <div className="mb-8">
          <div ref={googleBtnRef} className="w-full min-h-[50px]"></div>
        </div>

        <div className="relative mb-8">
          <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-100"></div></div>
          <div className="relative flex justify-center text-xs uppercase"><span className="bg-white px-4 text-gray-400 font-bold tracking-widest">sau</span></div>
        </div>

        <button 
          onClick={handleDemoLogin}
          className="w-full py-4 px-6 border border-gray-200 rounded-full text-sm font-bold text-gray-700 hover:bg-gray-50 hover:border-gray-300 transition-all active:scale-95 mb-10"
        >
          Testează Platforma (Demo)
        </button>

        <div className="text-center text-[11px] text-gray-400 px-4 leading-relaxed">
          Prin logare, confirmi că ai citit și ești de acord cu <Link to="/termeni" className="underline hover:text-blue-500 transition-colors">Termenii și Condițiile</Link> noastre.
        </div>
      </div>
    </div>
  );
};

export default Login;
