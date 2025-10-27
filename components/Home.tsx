
import React from 'react';
import { View } from '../types';

interface HomeProps {
  setCurrentView: (view: View) => void;
}

const navItems = [
  { view: View.SOLVE_PROBLEMS, icon: 'fa-heart-crack', text: 'حل مشاكل (Solve Problems)' },
  { view: View.DIARY, icon: 'fa-book-open', text: 'حكي و سرد (Story / Diary)' },
  { view: View.IDEAS, icon: 'fa-lightbulb', text: 'أفكار و حيل (Ideas & Tips)' },
  { view: View.GAMES, icon: 'fa-gamepad', text: 'Les Jeux (Games)' },
  { view: View.NIGHT_CHAT, icon: 'fa-moon', text: 'La Nuit Blanche' },
];

const Home: React.FC<HomeProps> = ({ setCurrentView }) => {
  return (
    <div className="flex flex-col items-center justify-center h-full text-white text-center p-4">
      <h1 className="text-6xl md:text-8xl font-extrabold mb-12 text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-red-400" style={{ fontFamily: "'Great Vibes', cursive" }}>
        Achraf & Sara
      </h1>
      <nav className="flex flex-col gap-6 w-full max-w-sm">
        {navItems.map((item) => (
          <button
            key={item.view}
            onClick={() => setCurrentView(item.view)}
            className="flex items-center justify-center gap-4 w-full p-4 bg-white/10 border border-white/20 rounded-xl text-lg hover:bg-white/20 backdrop-blur-sm transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            <i className={`fas ${item.icon} text-pink-300 w-6`}></i>
            <span className="flex-grow text-center">{item.text}</span>
          </button>
        ))}
      </nav>
    </div>
  );
};

export default Home;
