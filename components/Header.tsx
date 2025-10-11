
import React, { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { NAV_LINKS } from '../constants';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';
import { LogOut, Sun, Moon, Menu, X } from 'lucide-react';
import Logo from './Logo';

const Header: React.FC = () => {
  const { currentUser, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const NavContent = ({ isMobile = false }: { isMobile?: boolean }) => (
    <>
      {NAV_LINKS.map((link) => (
        <NavLink
          key={link.name}
          to={link.path}
          onClick={() => setIsMenuOpen(false)}
          className={({ isActive }) =>
            `flex items-center space-x-2 transition-colors duration-200 hover:text-primary ${
              isActive ? 'text-primary font-semibold' : 'text-charcoal-grey dark:text-dark-text font-medium'
            } ${isMobile ? 'text-2xl py-3' : 'text-xs'}`
          }
        >
          {React.cloneElement(link.icon, { size: isMobile ? 24 : 18 })}
          <span>{link.name}</span>
        </NavLink>
      ))}
    </>
  );

  return (
    <>
      <header className="sticky top-0 bg-background/80 dark:bg-dark-background/80 backdrop-blur-sm shadow-sm dark:shadow-md dark:shadow-slate-900/50 z-50">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center py-4">
            
            {/* Left Side: Logo on mobile, Nav on desktop */}
            <div className="flex items-center">
              {/* Logo: Visible only on small screens */}
              <Link to="/home" onClick={() => setIsMenuOpen(false)} className="md:hidden">
                <Logo className="h-10" />
              </Link>
              
              {/* Desktop Navigation */}
              <nav className="hidden md:flex items-center space-x-8">
                <NavContent />
              </nav>
            </div>

            {/* Right Side: Desktop controls or Mobile menu button */}
            <div className="flex items-center">
              {/* Desktop Controls */}
              <div className="hidden md:flex items-center space-x-4">
                <button
                  onClick={toggleTheme}
                  className="p-2 rounded-full text-charcoal-grey dark:text-dark-text bg-gray-200/80 dark:bg-dark-card hover:bg-gray-300/80 dark:hover:bg-slate-600 transition-colors duration-200"
                  aria-label="Toggle theme"
                >
                  {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
                </button>
                {currentUser ? (
                  <NavLink
                    to="/profile"
                    className={({ isActive }) =>
                      `flex items-center space-x-2 font-medium transition-colors duration-200 hover:text-primary text-xs ${
                        isActive ? 'text-primary' : 'text-charcoal-grey dark:text-dark-text'
                      }`
                    }
                  >
                    <img src={currentUser.profilePic} alt="profile" className="w-9 h-9 rounded-full object-cover border-2 border-secondary hover:border-primary transition" />
                    <span className="hidden sm:inline">@{currentUser.username}</span>
                  </NavLink>
                ) : (
                  <div className="flex items-center space-x-2">
                    <Link to="/login" className="px-4 py-2 rounded-full text-charcoal-grey dark:text-dark-text font-medium hover:bg-gray-200/80 dark:hover:bg-dark-card transition-colors duration-200 text-xs">
                        Login
                    </Link>
                    <Link to="/register" className="px-4 py-2 rounded-full font-semibold bg-gradient-to-r from-primary to-accent text-white hover:scale-105 transition-transform duration-200 ease-in-out shadow-md text-xs">
                        Register
                    </Link>
                  </div>
                )}
              </div>

              {/* Mobile Menu Button */}
              <div className="md:hidden">
                <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="p-2" aria-label="Open menu">
                  {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 z-40 bg-background/95 dark:bg-dark-background/95 backdrop-blur-lg md:hidden transition-opacity duration-300 ease-in-out ${
          isMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className="container mx-auto px-4 pt-24 flex flex-col h-full">
          <nav className="flex flex-col items-center space-y-6 text-center">
            <NavContent isMobile />
          </nav>
          <div className="mt-auto pb-16 flex flex-col items-center space-y-6">
            <button
              onClick={toggleTheme}
              className="p-3 rounded-full text-charcoal-grey dark:text-dark-text bg-gray-200/80 dark:bg-dark-card"
              aria-label="Toggle theme"
            >
              {theme === 'light' ? <Moon size={24} /> : <Sun size={24} />}
            </button>
            {currentUser ? (
              <div className="flex flex-col items-center space-y-4">
                <NavLink
                  to="/profile"
                  onClick={() => setIsMenuOpen(false)}
                  className="flex items-center space-x-3"
                >
                   <img src={currentUser.profilePic} alt="profile" className="w-12 h-12 rounded-full object-cover border-2 border-secondary" />
                   <span className="text-xl font-semibold">@{currentUser.username}</span>
                </NavLink>
              </div>
            ) : (
              <div className="flex flex-col items-center space-y-4 w-full max-w-xs">
                <Link to="/login" onClick={() => setIsMenuOpen(false)} className="w-full text-center px-4 py-3 rounded-full text-charcoal-grey dark:text-dark-text font-medium bg-gray-200/80 dark:bg-dark-card text-lg">
                    Login
                </Link>
                <Link to="/register" onClick={() => setIsMenuOpen(false)} className="w-full text-center px-4 py-3 rounded-full font-semibold bg-gradient-to-r from-primary to-accent text-white shadow-md text-lg">
                    Register
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
