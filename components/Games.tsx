
import React, { useState } from 'react';
import BackButton from './BackButton';
import TicTacToe from './TicTacToe';

const GameMenu: React.FC<{ onSelect: (game: string) => void }> = ({ onSelect }) => (
    <div className="flex flex-col items-center justify-center h-full text-white">
        <h2 className="text-3xl font-bold mb-8">Les Jeux (Games)</h2>
        <div className="flex flex-col gap-4 w-full max-w-xs">
            <button onClick={() => onSelect('tictactoe')} className="p-4 bg-white/10 rounded-lg hover:bg-white/20 transition">
                X & O (Tic Tac Toe)
            </button>
            <button className="p-4 bg-white/20 rounded-lg cursor-not-allowed opacity-50">
                Guess the Song (Coming Soon)
            </button>
            <button className="p-4 bg-white/20 rounded-lg cursor-not-allowed opacity-50">
                Two Truths, One Lie (Coming Soon)
            </button>
        </div>
    </div>
);

const Games: React.FC<{ setCurrentView: (view: any) => void }> = ({ setCurrentView }) => {
  const [activeGame, setActiveGame] = useState<string | null>(null);

  const renderGame = () => {
    switch (activeGame) {
      case 'tictactoe':
        return <TicTacToe onBack={() => setActiveGame(null)} />;
      default:
        return <GameMenu onSelect={setActiveGame} />;
    }
  };

  return (
    <div className="h-full w-full max-w-4xl mx-auto p-4 relative">
      <BackButton onClick={() => setCurrentView(0)} />
      {renderGame()}
    </div>
  );
};

export default Games;
