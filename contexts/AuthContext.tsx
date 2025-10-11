import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User } from '../types';
import { useNavigate } from 'react-router-dom';

interface AuthContextType {
  currentUser: User | null;
  login: (username: string, email: string) => void;
  logout: () => void;
  register: (username: string, email: string) => void;
  updateProfilePicture: (dataUrl: string) => void;
  updateProfile: (username: string, email: string, status: string) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const defaultProfilePic = 'https://images.pexels.com/photos/18059128/pexels-photo-18059128/free-photo-of-a-woman-with-colorful-hair-and-a-black-jacket.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2';

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem('reflectaUser');
    if (storedUser) {
      setCurrentUser(JSON.parse(storedUser));
    }
  }, []);

  const login = (username: string, email: string) => {
    const user: User = { 
      username, 
      email, 
      profilePic: localStorage.getItem(`${username}-pic`) || defaultProfilePic,
      status: 'Available to connect' 
    };
    localStorage.setItem('reflectaUser', JSON.stringify(user));
    setCurrentUser(user);
    navigate('/home');
  };

  const register = (username: string, email: string) => {
    const user: User = { 
        username, 
        email, 
        profilePic: defaultProfilePic,
        status: 'Just joined! Looking to connect.'
    };
    localStorage.setItem('reflectaUser', JSON.stringify(user));
    localStorage.setItem(`${username}-pic`, defaultProfilePic);
    setCurrentUser(user);
    navigate('/home');
  };
  
  const logout = () => {
    localStorage.removeItem('reflectaUser');
    setCurrentUser(null);
    navigate('/login');
  };

  const updateProfilePicture = (dataUrl: string) => {
    if (currentUser) {
      const updatedUser = { ...currentUser, profilePic: dataUrl };
      setCurrentUser(updatedUser);
      localStorage.setItem('reflectaUser', JSON.stringify(updatedUser));
      localStorage.setItem(`${currentUser.username}-pic`, dataUrl);
    }
  };

  const updateProfile = (username: string, email: string, status: string) => {
    if (currentUser) {
      const updatedUser = { ...currentUser, username, email, status };
      setCurrentUser(updatedUser);
      localStorage.setItem('reflectaUser', JSON.stringify(updatedUser));
    }
  };

  return (
    <AuthContext.Provider value={{ currentUser, login, logout, register, updateProfilePicture, updateProfile }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};