import React, { useState } from 'react';
import { Heart, Lock } from 'lucide-react';

interface UnlockGateProps {
  prompt: string;
  expectedAnswer: string;
  onUnlock: () => void;
  title: string;
}

const UnlockGate: React.FC<UnlockGateProps> = ({ prompt, expectedAnswer, onUnlock, title }) => {
  const [input, setInput] = useState('');
  const [error, setError] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Normalize string: remove punctuation, lowercase, trim
    const normalizedInput = input.toLowerCase().replace(/[^a-z0-9]/g, '');
    const normalizedExpected = expectedAnswer.toLowerCase().replace(/[^a-z0-9]/g, '');

    if (normalizedInput.includes(normalizedExpected)) {
      onUnlock();
    } else {
      setError(true);
      setTimeout(() => setError(false), 1000);
    }
  };

  return (
    <div className="min-h-[50vh] flex flex-col items-center justify-center p-8 text-center glass-card rounded-3xl mx-4 my-8 shadow-xl border-2 border-rose-200">
      <div className="bg-rose-100 p-4 rounded-full mb-4 animate-bounce">
        <Lock className="w-8 h-8 text-rose-500" />
      </div>
      <h3 className="text-2xl font-heading text-rose-600 mb-2">{title}</h3>
      <p className="text-gray-600 mb-6 font-medium text-lg max-w-md">{prompt}</p>
      
      <form onSubmit={handleSubmit} className="w-full max-w-sm relative">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type here..."
          className={`w-full px-6 py-3 rounded-full border-2 focus:outline-none transition-all duration-300 text-center text-rose-600 font-bold placeholder-rose-300
            ${error ? 'border-red-400 bg-red-50 animate-wiggle' : 'border-rose-300 focus:border-rose-500 bg-white'}`}
        />
        <button
          type="submit"
          className="mt-4 px-8 py-2 bg-rose-500 hover:bg-rose-600 text-white rounded-full font-bold shadow-md transition-transform hover:scale-105 flex items-center gap-2 mx-auto"
        >
          <span>Unlock My Heart</span>
          <Heart size={16} fill="currentColor" />
        </button>
      </form>
      
      {error && (
        <p className="text-rose-500 mt-2 text-sm font-bold animate-pulse">
          Hmm... that doesn't sound right! Try again, precious!
        </p>
      )}
    </div>
  );
};

export default UnlockGate;