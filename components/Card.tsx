import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

const Card: React.FC<CardProps> = ({ children, className = '' }) => {
  return (
    <div className={`bg-white dark:bg-dark-card rounded-xl shadow-md dark:shadow-lg dark:shadow-slate-900/50 p-6 hover:shadow-lg transition-shadow duration-300 border border-transparent dark:border-slate-700 ${className}`}>
      {children}
    </div>
  );
};

export default Card;