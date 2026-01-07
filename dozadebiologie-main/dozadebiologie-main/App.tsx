
import React, { useState, useEffect } from 'react';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Videos from './pages/Videos';
import Teachers from './pages/Teachers';
import Contact from './pages/Contact';
import CourseViewer from './pages/CourseViewer';
import MaterialViewer from './pages/MaterialViewer';
import Terms from './pages/Terms';
import Login from './pages/Login';
import Account from './pages/Account';
import Flashcards from './pages/Flashcards';
import FlashcardChapter from './pages/FlashcardChapter';
import Surprise from './pages/Surprise';
import ExamSelect from './pages/ExamSelect';
import ExamQuiz from './pages/ExamQuiz';
import Navbar from './components/Navbar';

export interface User {
  name: string;
  email: string;
  initials: string;
  picture?: string;
}

const App: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  
  useEffect(() => {
    const savedUser = localStorage.getItem('eduvia_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const login = (userData: User) => {
    setUser(userData);
    localStorage.setItem('eduvia_user', JSON.stringify(userData));
    navigate('/');
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('eduvia_user');
    navigate('/');
  };

  const updateUser = (newName: string) => {
    if (user) {
      const updatedUser = { ...user, name: newName };
      setUser(updatedUser);
      localStorage.setItem('eduvia_user', JSON.stringify(updatedUser));
    }
  };

  const deleteAccount = () => {
    if (window.confirm("Ești sigur că vrei să ștergi contul? Toate datele tale vor fi eliminate definitiv.")) {
      setUser(null);
      localStorage.removeItem('eduvia_user');
      navigate('/');
    }
  };

  const isCourseViewer = location.pathname.startsWith('/cursuri/');
  const isMaterialViewer = location.pathname.startsWith('/materiale/');
  const isFlashcardViewer = location.pathname.startsWith('/flashcards/');
  const isQuizMode = location.pathname.includes('/test');
  const isSurprisePage = location.pathname === '/surpriza';
  const isLoginPage = location.pathname === '/login';

  return (
    <div className="min-h-screen bg-white text-gray-900">
      {user && !isCourseViewer && !isMaterialViewer && !isFlashcardViewer && !isQuizMode && !isSurprisePage && !isLoginPage && (
        <button 
          onClick={() => navigate('/cont')}
          className="fixed top-4 right-4 lg:top-8 lg:right-10 z-[1100] w-10 h-10 lg:w-12 lg:h-12 rounded-full overflow-hidden border-2 border-white shadow-xl hover:scale-110 transition-transform animate-fade-down"
        >
          {user.picture ? (
            <img src={user.picture} alt={user.name} className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full bg-[#E8F0FE] flex items-center justify-center text-blue-600 font-bold text-xs lg:text-base">
              {user.initials}
            </div>
          )}
        </button>
      )}

      {!isCourseViewer && !isMaterialViewer && !isFlashcardViewer && !isQuizMode && !isSurprisePage && !isLoginPage && <Navbar user={user} />}
      
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/despre" element={<About />} />
          <Route path="/flashcards" element={<Flashcards user={user} />} />
          <Route path="/flashcards/:id" element={<FlashcardChapter user={user} />} />
          <Route path="/cursuri" element={<Videos user={user} />} />
          <Route path="/cursuri/:id" element={<CourseViewer user={user} />} />
          <Route path="/materiale/:id" element={<MaterialViewer user={user} />} />
          <Route path="/grile/:id" element={<ExamSelect user={user} />} />
          <Route path="/grile/:id/test" element={<ExamQuiz user={user} />} />
          <Route path="/profesori" element={<Teachers />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/termeni" element={<Terms />} />
          <Route path="/surpriza" element={<Surprise />} />
          <Route path="/login" element={<Login onLogin={login} />} />
          <Route path="/cont" element={<Account user={user} onLogout={logout} onUpdateName={updateUser} onDeleteAccount={deleteAccount} />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </main>
    </div>
  );
};

export default App;
