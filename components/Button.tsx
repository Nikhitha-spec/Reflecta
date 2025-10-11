import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  icon?: React.ReactNode;
  variant?: 'primary' | 'secondary';
  className?: string;
}

const Button: React.FC<ButtonProps> = ({ children, icon, variant = 'primary', className = '', ...props }) => {
  // Base classes for all buttons, including focus ring and transitions
  const baseClasses = "px-6 py-3 font-semibold rounded-full shadow-md transform transition-all duration-300 ease-in-out flex items-center justify-center space-x-2 focus:outline-none focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-dark-card";

  // Variant-specific classes for colors and hover effects
  const variantClasses = {
    primary: 'bg-gradient-to-r from-primary to-accent text-white hover:shadow-xl hover:-translate-y-0.5 focus:ring-accent',
    secondary: 'bg-white text-primary border-2 border-primary hover:bg-primary/10 hover:scale-105 focus:ring-primary dark:bg-dark-card dark:text-dark-text dark:border-primary dark:hover:bg-primary/20',
  };

  return (
    <button className={`${baseClasses} ${variantClasses[variant]} ${className}`} {...props}>
      {icon}
      <span>{children}</span>
    </button>
  );
};

export default Button;