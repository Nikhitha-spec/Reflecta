import React from 'react';

const EMOJIS = ['❤️', '👍', '😂', '😢', '😮', '🙏'];

interface EmojiPickerProps {
  onSelect: (emoji: string) => void;
  positionClasses: string;
}

const EmojiPicker: React.FC<EmojiPickerProps> = ({ onSelect, positionClasses }) => {
  return (
    <div className={`absolute bg-white dark:bg-dark-card shadow-xl rounded-full p-2 flex space-x-1 border dark:border-slate-600 z-20 ${positionClasses}`}>
      {EMOJIS.map(emoji => (
        <button
          key={emoji}
          onClick={(e) => {
            e.stopPropagation();
            onSelect(emoji);
          }}
          className="text-2xl hover:scale-125 transition-transform duration-150"
          aria-label={`React with ${emoji}`}
        >
          {emoji}
        </button>
      ))}
    </div>
  );
};

export default EmojiPicker;