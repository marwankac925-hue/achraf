
import React, { useState } from 'react';

const Square: React.FC<{ value: string | null; onClick: () => void }> = ({ value, onClick }) => {
  const symbolClass = value === 'X' ? 'text-red-400' : 'text-blue-400';
  return (
    <button
      className={`w-20 h-20 md:w-24 md:h-24 bg-white/10 rounded-lg flex items-center justify-center text-5xl font-bold ${symbolClass} transition-all duration-200 hover:bg-white/20`}
      onClick={onClick}
    >
      {value}
    </button>
  );
};

const TicTacToe: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const [board, setBoard] = useState<(string | null)[]>(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);

  const calculateWinner = (squares: (string | null)[]) => {
    const lines = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
      [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
      [0, 4, 8], [2, 4, 6],             // diagonals
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  };

  const winner = calculateWinner(board);
  const isDraw = !winner && board.every(square => square !== null);

  const handleClick = (i: number) => {
    if (winner || board[i]) return;
    const newBoard = board.slice();
    newBoard[i] = isXNext ? 'X' : 'O';
    setBoard(newBoard);
    setIsXNext(!isXNext);
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setIsXNext(true);
  };
  
  let status;
  if (winner) {
    status = `Winner: ${winner}`;
  } else if (isDraw) {
    status = "It's a Draw!";
  } else {
    status = `Next player: ${isXNext ? 'X' : 'O'}`;
  }

  return (
    <div className="flex flex-col items-center justify-center text-white h-full">
      <h3 className="text-3xl font-bold mb-4">X & O</h3>
      <div className="text-2xl mb-6">{status}</div>
      <div className="grid grid-cols-3 gap-3">
        {board.map((_, i) => (
          <Square key={i} value={board[i]} onClick={() => handleClick(i)} />
        ))}
      </div>
      <div className="mt-8 flex gap-4">
        <button onClick={resetGame} className="px-6 py-2 bg-pink-600 rounded-lg hover:bg-pink-700 transition">
          Reset Game
        </button>
        <button onClick={onBack} className="px-6 py-2 bg-gray-600 rounded-lg hover:bg-gray-700 transition">
          Back to Games
        </button>
      </div>
    </div>
  );
};

export default TicTacToe;
