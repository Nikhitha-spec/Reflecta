import React, { useState } from 'react';
import { JournalEntry } from '../types';
import { Heart } from 'lucide-react';

const emotionColors: { [key: string]: string } = {
  Happy: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-300',
  Sad: 'bg-slate-100 text-slate-800 dark:bg-slate-700/50 dark:text-slate-300',
  Anxious: 'bg-purple-100 text-purple-800 dark:bg-purple-900/50 dark:text-purple-300',
  Stressed: 'bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-300',
  Grateful: 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300',
  Lonely: 'bg-gray-100 text-gray-800 dark:bg-gray-700/50 dark:text-gray-300',
  Overwhelmed: 'bg-orange-100 text-orange-800 dark:bg-orange-900/50 dark:text-orange-300',
};

interface JournalCardProps {
  entry: JournalEntry;
}

const JournalCard: React.FC<JournalCardProps> = ({ entry }) => {
    const [reacted, setReacted] = useState(false);
    const [reactionCount, setReactionCount] = useState(entry.reactions);

    const handleReaction = () => {
        if (reacted) {
            setReactionCount(prev => prev - 1);
        } else {
            setReactionCount(prev => prev + 1);
        }
        setReacted(!reacted);
    }

  return (
    <div className="bg-white dark:bg-dark-card rounded-lg shadow-sm p-6 border border-gray-200/80 dark:border-slate-700">
      <div className="flex justify-between items-start mb-2">
        <div>
            <p className="font-semibold text-charcoal-grey dark:text-dark-text">@{entry.author}</p>
            <p className="text-xs text-gray-500 dark:text-dark-subtext">{entry.timestamp}</p>
        </div>
        <span className={`px-3 py-1 text-sm font-medium rounded-full ${emotionColors[entry.emotion] || 'bg-gray-100 dark:bg-gray-700'}`}>
          {entry.emotion}
        </span>
      </div>
      <p className="text-gray-700 dark:text-dark-subtext leading-relaxed my-4">{entry.content}</p>
      <div className="flex items-center justify-end">
        <button onClick={handleReaction} className="flex items-center space-x-2 text-gray-500 dark:text-dark-subtext hover:text-red-500 transition-colors duration-200">
          <Heart size={20} className={`${reacted ? 'fill-current text-red-500' : ''}`} />
          <span>{reactionCount}</span>
        </button>
      </div>
    </div>
  );
};

export default JournalCard;