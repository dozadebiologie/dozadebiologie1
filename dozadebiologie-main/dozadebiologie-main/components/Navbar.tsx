
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { User } from '../App';

interface NavbarProps {
  user: User | null;
}

const Navbar: React.FC<NavbarProps> = ({ user }) => {
  const location = useLocation();

  const navLinks = [
    { name: 'Acasă', path: '/' },
    { name: 'Flashcarduri', path: '/flashcards' },
    { name: 'Cursuri și Grile', path: '/cursuri' },
    { name: 'Profesori', path: '/profesori' },
  ];

  return (
    <nav className={`fixed top-4 left-1/2 -translate-x-1/2 lg:translate-x-0 lg:left-auto lg:top-8 lg:right-10 z-[1000] flex items-center justify-center lg:justify-start gap-3 md:gap-5 px-4 md:px-7 py-3 rounded-full glass-nav shadow-lg transition-all hover:shadow-xl w-[94%] max-w-2xl lg:w-auto ${user ? 'lg:mr-24' : ''}`}>
      <div className="flex items-center gap-3 md:gap-5 overflow-x-auto no-scrollbar scroll-smooth">
        {navLinks.map((link) => (
          <Link
            key={link.path}
            to={link.path}
            className={`text-[11px] md:text-sm font-normal whitespace-nowrap transition-colors ${
              location.pathname === link.path ? 'text-blue-500 font-semibold' : 'text-gray-700 hover:text-black'
            }`}
          >
            {link.name}
          </Link>
        ))}
      </div>
      
      {!user && (
        <div className="flex items-center gap-2 border-l border-gray-200 pl-3 md:pl-5 ml-1">
          <Link
            to="/login"
            className="text-[11px] md:text-sm font-medium text-gray-600 hover:text-black transition-colors whitespace-nowrap"
          >
            Logare
          </Link>
          <Link
            to="/login"
            className="bg-[#72f68b] px-3 md:px-5 py-2 rounded-full text-[11px] md:text-sm font-bold text-black hover:scale-105 transition-transform whitespace-nowrap shadow-sm border border-[#5ee477]"
          >
            Înregistrare
          </Link>
        </div>
      )}
      
      {user && (
        <Link
          to="/cont"
          className="lg:hidden text-[11px] md:text-sm font-bold text-blue-500 hover:text-blue-600 transition-colors whitespace-nowrap"
        >
          {user.name.split(' ')[0]}
        </Link>
      )}
    </nav>
  );
};

// Fix: Add the missing default export for Navbar
export default Navbar;
