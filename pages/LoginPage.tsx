
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import Button from '../components/Button';
import { User, Lock, BookOpen, Mic, Users as CommunityIcon } from 'lucide-react';
import Logo from '../components/Logo';

const LoginPage: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState(''); // Mock password field
  const { login, currentUser } = useAuth();
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (currentUser) {
      navigate('/home');
    }
  }, [currentUser, navigate]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (username.trim()) {
      // In this mock, we use username to derive a mock email
      login(username, `${username}@reflecta.com`);
    } else {
      setError('Please enter a username.');
    }
  };

  const InfoPanel = () => (
    <div className="p-8 bg-primary/10 dark:bg-dark-card/50 rounded-l-xl hidden md:flex flex-col justify-center">
        <Logo to="/" className="h-14 mb-8" />
        <h2 className="text-3xl font-bold text-charcoal-grey dark:text-dark-text mb-6">
            A Safe Space to...
        </h2>
        <ul className="space-y-6">
            <li className="flex items-start space-x-4">
                <div className="p-2 bg-primary/20 rounded-full"><BookOpen className="text-primary" size={20} /></div>
                <div>
                    <h3 className="font-semibold dark:text-dark-text">Write Anonymously</h3>
                    <p className="text-sm text-gray-600 dark:text-dark-subtext">Express your thoughts freely and without judgment in your private, secure journal.</p>
                </div>
            </li>
            <li className="flex items-start space-x-4">
                <div className="p-2 bg-accent/20 rounded-full"><Mic className="text-accent" size={20} /></div>
                <div>
                    <h3 className="font-semibold dark:text-dark-text">Voice Your Thoughts</h3>
                    <p className="text-sm text-gray-600 dark:text-dark-subtext">Record voice notes to capture your feelings in the moment. Sometimes hearing your own voice brings clarity.</p>
                </div>
            </li>
            <li className="flex items-start space-x-4">
                <div className="p-2 bg-primary/20 rounded-full"><CommunityIcon className="text-primary" size={20} /></div>
                <div>
                    <h3 className="font-semibold dark:text-dark-text">Find a Supportive Community</h3>
                    <p className="text-sm text-gray-600 dark:text-dark-subtext">Connect with others who understand. Find support and share experiences in a safe, anonymous space.</p>
                </div>
            </li>
        </ul>
    </div>
  );

  return (
    <div className="flex items-center justify-center min-h-screen bg-background/80 dark:bg-dark-background/80 backdrop-blur-sm p-4">
      <div className="w-full max-w-4xl mx-auto bg-white dark:bg-dark-card rounded-xl shadow-md overflow-hidden grid md:grid-cols-2">
        <InfoPanel />
        <div className="p-8 md:p-12 flex flex-col justify-center">
            <div className="md:hidden text-center mb-8">
                <Logo to="/login" className="h-14 inline-block" />
            </div>
            <h1 className="text-4xl font-bold text-primary text-center md:text-left">Welcome Back</h1>
            <p className="text-gray-600 dark:text-dark-subtext mt-2 mb-6 text-center md:text-left">Sign in to continue your journey.</p>
            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="username" className="block text-sm font-medium text-gray-700 dark:text-dark-subtext">Username</label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <User className="text-gray-400" size={20} />
                    </div>
                    <input
                      id="username"
                      type="text"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      required
                      className="focus:ring-primary focus:border-primary block w-full pl-10 sm:text-sm border-gray-300 rounded-md py-2 dark:bg-slate-700 dark:border-slate-600 dark:placeholder-gray-400 dark:text-white"
                      placeholder="e.g., AquaSoul7"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="password"  className="block text-sm font-medium text-gray-700 dark:text-dark-subtext">Password</label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Lock className="text-gray-400" size={20} />
                    </div>
                    <input
                      id="password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className="focus:ring-primary focus:border-primary block w-full pl-10 sm:text-sm border-gray-300 rounded-md py-2 dark:bg-slate-700 dark:border-slate-600 dark:placeholder-gray-400 dark:text-white"
                      placeholder="••••••••"
                    />
                  </div>
                </div>
                {error && <p className="text-red-500 text-sm">{error}</p>}
                <div>
                  <Button type="submit" className="w-full">Login</Button>
                </div>
            </form>
            <p className="mt-6 text-center text-sm text-gray-600 dark:text-dark-subtext">
                Don't have an account?{' '}
                <Link to="/register" className="font-medium text-primary hover:text-accent">
                  Register here
                </Link>
            </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
