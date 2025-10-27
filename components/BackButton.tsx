
import React from 'react';

interface BackButtonProps {
  onClick: () => void;
}

const BackButton: React.FC<BackButtonProps> = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="absolute top-4 left-4 text-white text-2xl z-20 hover:text-pink-300 transition-colors"
      aria-label="Go back"
    >
      <i className="fas fa-arrow-left"></i>
    </button>
  );
};

export default BackButton;
