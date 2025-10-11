import React from 'react';

interface ReactionsDisplayProps {
  reactions: { [emoji:string]: string[] };
}

const ReactionsDisplay: React.FC<ReactionsDisplayProps> = ({ reactions }) => {
  const reactionEntries = Object.entries(reactions).filter(([, users]) => users.length > 0);

  if (reactionEntries.length === 0) {
    return null;
  }

  return (
    <div className="absolute -bottom-4 right-2 flex space-x-1 z-10">
      {reactionEntries.map(([emoji, users]) => (
        <div key={emoji} className="bg-background/80 dark:bg-dark-card/80 backdrop-blur-sm rounded-full px-2 py-0.5 text-xs flex items-center shadow border border-gray-200/50 dark:border-slate-700/50">
          <span>{emoji}</span>
          <span className="ml-1 font-semibold text-charcoal-grey dark:text-dark-text">{users.length}</span>
        </div>
      ))}
    </div>
  );
};

export default ReactionsDisplay;