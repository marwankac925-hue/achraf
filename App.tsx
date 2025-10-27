
import React, { useState } from 'react';
import Home from './components/Home';
import Chat from './components/Chat';
import Diary from './components/Diary';
import Ideas from './components/Ideas';
import Games from './components/Games';
import { View } from './types';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<View>(View.HOME);

  const renderView = () => {
    switch (currentView) {
      case View.SOLVE_PROBLEMS:
        return <Chat title="حل مشاكل (Solve Problems)" placeholder="Let's talk it out..." setCurrentView={setCurrentView} />;
      case View.DIARY:
        return <Diary setCurrentView={setCurrentView} />;
      case View.IDEAS:
        return <Ideas setCurrentView={setCurrentView} />;
      case View.GAMES:
        return <Games setCurrentView={setCurrentView} />;
      case View.NIGHT_CHAT:
        return <Chat title="La Nuit Blanche" placeholder="What are we doing when we meet?" setCurrentView={setCurrentView} />;
      case View.HOME:
      default:
        return <Home setCurrentView={setCurrentView} />;
    }
  };

  return (
    <main className="relative h-screen w-screen overflow-hidden bg-gradient-to-br from-gray-900 via-purple-900 to-pink-900 font-sans">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20"></div>
        <div className="relative h-full w-full flex items-center justify-center">
          {renderView()}
        </div>
    </main>
  );
};

export default App;
