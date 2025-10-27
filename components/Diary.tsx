
import React, { useState, useEffect } from 'react';
import { DiaryEntry } from '../types';
import BackButton from './BackButton';

const Diary: React.FC<{ setCurrentView: (view: any) => void }> = ({ setCurrentView }) => {
  const [entries, setEntries] = useState<DiaryEntry[]>([]);
  const [newEntry, setNewEntry] = useState('');
  const [currentUser, setCurrentUser] = useState<'Achraf' | 'Sara'>('Achraf');

  useEffect(() => {
    const savedEntries = localStorage.getItem('diaryEntries');
    if (savedEntries) {
      setEntries(JSON.parse(savedEntries));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('diaryEntries', JSON.stringify(entries));
  }, [entries]);

  const handleSaveEntry = () => {
    if (newEntry.trim()) {
      const entry: DiaryEntry = {
        id: Date.now(),
        author: currentUser,
        content: newEntry,
        timestamp: new Date().toLocaleString(),
      };
      setEntries([entry, ...entries]);
      setNewEntry('');
    }
  };

  const filteredEntries = entries.filter(e => e.author === currentUser);

  return (
    <div className="flex flex-col h-full w-full max-w-4xl mx-auto p-4 text-white">
      <BackButton onClick={() => setCurrentView(0)} />
      <div className="text-center mb-6 pt-8">
        <h2 className="text-3xl font-bold">حكي و سرد (Story / Diary)</h2>
      </div>

      <div className="mb-4 flex justify-center gap-4">
        <button
          onClick={() => setCurrentUser('Achraf')}
          className={`px-4 py-2 rounded-lg ${currentUser === 'Achraf' ? 'bg-pink-600' : 'bg-white/10'}`}
        >
          Achraf's Diary
        </button>
        <button
          onClick={() => setCurrentUser('Sara')}
          className={`px-4 py-2 rounded-lg ${currentUser === 'Sara' ? 'bg-pink-600' : 'bg-white/10'}`}
        >
          Sara's Diary
        </button>
      </div>

      <div className="mb-6 p-4 bg-black/30 rounded-lg">
        <h3 className="text-xl mb-2">Dear Diary...</h3>
        <textarea
          value={newEntry}
          onChange={(e) => setNewEntry(e.target.value)}
          placeholder={`What's on your mind, ${currentUser}?`}
          className="w-full h-32 p-2 bg-white/10 rounded-md text-white placeholder-gray-400 focus:ring-pink-400 focus:border-pink-400"
        />
        <button onClick={handleSaveEntry} className="mt-2 px-6 py-2 bg-pink-600 rounded-lg hover:bg-pink-700 transition">
          Save Entry
        </button>
      </div>

      <div className="flex-1 overflow-y-auto space-y-4 p-4 bg-black/30 rounded-lg">
        <h3 className="text-xl mb-2">{currentUser}'s Entries</h3>
        {filteredEntries.length > 0 ? (
          filteredEntries.map(entry => (
            <div key={entry.id} className="bg-white/10 p-4 rounded-lg">
              <p className="text-gray-300 text-sm mb-2">{entry.timestamp}</p>
              <p className="whitespace-pre-wrap">{entry.content}</p>
            </div>
          ))
        ) : (
          <p className="text-gray-400">No entries yet.</p>
        )}
      </div>
    </div>
  );
};

export default Diary;
