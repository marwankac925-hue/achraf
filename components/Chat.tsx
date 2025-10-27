
import React, { useState, useRef, useEffect } from 'react';
import { ChatMessage } from '../types';
import { useAudioRecorder } from '../hooks/useAudioRecorder';
import BackButton from './BackButton';

interface ChatProps {
  title: string;
  placeholder: string;
  setCurrentView: (view: any) => void;
}

const Chat: React.FC<ChatProps> = ({ title, placeholder, setCurrentView }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputText, setInputText] = useState('');
  const [currentUser, setCurrentUser] = useState<'Achraf' | 'Sara'>('Achraf');
  const { isRecording, audioURL, startRecording, stopRecording, setAudioURL } = useAudioRecorder();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(scrollToBottom, [messages]);

  useEffect(() => {
    if (audioURL) {
      const newMessage: ChatMessage = {
        id: Date.now(),
        sender: currentUser,
        type: 'audio',
        content: audioURL,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, newMessage]);
      setAudioURL(null); // Reset audio URL after sending
    }
  }, [audioURL, currentUser, setAudioURL]);

  const handleSendText = () => {
    if (inputText.trim()) {
      const newMessage: ChatMessage = {
        id: Date.now(),
        sender: currentUser,
        type: 'text',
        content: inputText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, newMessage]);
      setInputText('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSendText();
    }
  };

  return (
    <div className="flex flex-col h-full w-full max-w-4xl mx-auto p-4 text-white">
      <BackButton onClick={() => setCurrentView(0)} />
      <div className="text-center mb-4 pt-8">
        <h2 className="text-3xl font-bold">{title}</h2>
        <button onClick={() => setCurrentUser(currentUser === 'Achraf' ? 'Sara' : 'Achraf')} className="mt-2 text-sm text-pink-300">
          Logged in as {currentUser}. Switch?
        </button>
      </div>

      <div className="flex-1 overflow-y-auto mb-4 p-4 bg-black/30 rounded-lg">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex ${msg.sender === currentUser ? 'justify-end' : 'justify-start'} mb-4`}>
            <div className={`max-w-xs md:max-w-md p-3 rounded-xl ${msg.sender === currentUser ? 'bg-pink-600' : 'bg-gray-700'}`}>
              <p className="font-bold text-sm mb-1">{msg.sender}</p>
              {msg.type === 'text' ? (
                <p className="text-white break-words">{msg.content}</p>
              ) : (
                <audio controls src={msg.content} className="w-full"></audio>
              )}
              <p className="text-xs text-gray-300 mt-1 text-right">{msg.timestamp}</p>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <div className="flex items-center gap-2 p-2 bg-black/50 rounded-lg">
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder={placeholder}
          className="flex-1 bg-transparent border-none focus:ring-0 text-white placeholder-gray-400"
        />
        <button onClick={handleSendText} className="text-pink-300 text-2xl hover:text-pink-100 transition">
          <i className="fas fa-paper-plane"></i>
        </button>
        <button
          onClick={isRecording ? stopRecording : startRecording}
          className={`text-2xl transition ${isRecording ? 'text-red-500 animate-pulse' : 'text-pink-300 hover:text-pink-100'}`}
        >
          <i className="fas fa-microphone"></i>
        </button>
      </div>
    </div>
  );
};

export default Chat;
