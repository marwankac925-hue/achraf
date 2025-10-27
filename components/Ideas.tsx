
import React, { useState, useEffect, useCallback } from 'react';
import { getRelationshipTips } from '../services/geminiService';
import { RelationshipTip } from '../types';
import BackButton from './BackButton';

const Ideas: React.FC<{ setCurrentView: (view: any) => void }> = ({ setCurrentView }) => {
  const [tips, setTips] = useState<RelationshipTip[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTips = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const fetchedTips = await getRelationshipTips();
      setTips(fetchedTips);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTips();
  }, [fetchTips]);

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="flex flex-col items-center justify-center text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-pink-300"></div>
            <p className="mt-4 text-lg">Generating fresh ideas...</p>
        </div>
      );
    }
    if (error) {
      return (
        <div className="text-center text-red-400">
            <p>Oops! Something went wrong.</p>
            <p>{error}</p>
            <button onClick={fetchTips} className="mt-4 px-4 py-2 bg-pink-600 rounded-lg hover:bg-pink-700 transition">
                Try Again
            </button>
        </div>
      );
    }
    return (
      <div className="space-y-4">
        {tips.map((tip, index) => (
          <div key={index} className="bg-white/10 p-4 rounded-lg border border-white/20">
            <h3 className="text-xl font-bold text-pink-300 mb-2">{tip.title}</h3>
            <p>{tip.description}</p>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="flex flex-col h-full w-full max-w-4xl mx-auto p-4 text-white">
      <BackButton onClick={() => setCurrentView(0)} />
      <div className="text-center mb-6 pt-8">
        <h2 className="text-3xl font-bold">أفكار و حيل (Ideas & Tips)</h2>
      </div>
      <div className="flex-1 overflow-y-auto p-2">
        {renderContent()}
      </div>
       <div className="text-center mt-4">
        <button onClick={fetchTips} disabled={isLoading} className="px-6 py-2 bg-pink-600 rounded-lg hover:bg-pink-700 transition disabled:bg-gray-500">
          {isLoading ? 'Generating...' : 'Get New Tips'}
        </button>
      </div>
    </div>
  );
};

export default Ideas;
