import React, { useState, useMemo } from 'react';
import { Emotion } from '../types';
import { EMOTION_OPTIONS, POTENTIAL_CONNECTIONS } from '../constants';
import Button from '../components/Button';
import { Send, CheckCircle } from 'lucide-react';
import { useAppContext } from '../contexts/AppContext';
import { useAuth } from '../contexts/AuthContext';

const emotionColors: { [key: string]: string } = {
  Happy: 'border-yellow-300 bg-yellow-50 dark:bg-yellow-900/20 dark:border-yellow-500/30',
  Sad: 'border-slate-300 bg-slate-50 dark:bg-slate-700/20 dark:border-slate-500/30',
  Anxious: 'border-purple-300 bg-purple-50 dark:bg-purple-900/20 dark:border-purple-500/30',
  Stressed: 'border-red-300 bg-red-50 dark:bg-red-900/20 dark:border-red-500/30',
  Grateful: 'border-green-300 bg-green-50 dark:bg-green-900/20 dark:border-green-500/30',
  Lonely: 'border-gray-300 bg-gray-50 dark:bg-gray-700/20 dark:border-gray-500/30',
  Overwhelmed: 'border-orange-300 bg-orange-50 dark:bg-orange-900/20 dark:border-orange-500/30',
};

const emotionTagColors: { [key: string]: string } = {
    Happy: 'bg-yellow-200 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-300',
    Sad: 'bg-slate-200 text-slate-800 dark:bg-slate-600/50 dark:text-slate-300',
    Anxious: 'bg-purple-200 text-purple-800 dark:bg-purple-900/50 dark:text-purple-300',
    Stressed: 'bg-red-200 text-red-800 dark:bg-red-900/50 dark:text-red-300',
    Grateful: 'bg-green-200 text-green-800 dark:bg-green-900/50 dark:text-green-300',
    Lonely: 'bg-gray-300 text-gray-800 dark:bg-gray-600/50 dark:text-gray-300',
    Overwhelmed: 'bg-orange-200 text-orange-800 dark:bg-orange-900/50 dark:text-orange-300',
};


const ConnectionsPage: React.FC = () => {
    const { currentUser } = useAuth();
    const { sendConnectionRequest, sentRequests, connections } = useAppContext();
    const [filter, setFilter] = useState<Emotion | 'All'>('All');
    
    const isRequestSent = (userId: string) => sentRequests.some(req => req.toUser === userId);
    
    const isConnected = (username: string) => {
        if (!currentUser) return false;
        return connections.some(conn => 
            conn.users.includes(currentUser.username) && conn.users.includes(username)
        );
    };

    const filteredConnections = useMemo(() => {
        if (filter === 'All') return POTENTIAL_CONNECTIONS.filter(c => c.name !== currentUser?.username);
        return POTENTIAL_CONNECTIONS.filter(c => c.emotion === filter && c.name !== currentUser?.username);
    }, [filter, currentUser]);

  return (
    <div className="max-w-5xl mx-auto">
      <h1 className="text-4xl font-bold text-charcoal-grey dark:text-dark-text mb-2">Explore Connections</h1>
      <p className="text-lg text-gray-600 dark:text-dark-subtext mb-8">Find others who are feeling the same way. You are not alone.</p>

      <div className="mb-8 flex flex-wrap gap-2">
        <button onClick={() => setFilter('All')} className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${filter === 'All' ? 'bg-primary text-white' : 'bg-white dark:bg-dark-card text-charcoal-grey dark:text-dark-text hover:bg-gray-100 dark:hover:bg-slate-600'}`}>All</button>
        {EMOTION_OPTIONS.map(emotion => (
            <button key={emotion} onClick={() => setFilter(emotion)} className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${filter === emotion ? 'bg-primary text-white' : 'bg-white dark:bg-dark-card text-charcoal-grey dark:text-dark-text hover:bg-gray-100 dark:hover:bg-slate-600'}`}>
                {emotion}
            </button>
        ))}
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredConnections.map(user => {
            const sent = isRequestSent(user.name);
            const connected = isConnected(user.name);
            
            return (
                <div key={user.id} className={`p-6 rounded-lg shadow-sm border-2 ${emotionColors[user.emotion]} flex flex-col justify-between`}>
                    <div>
                        <div className="flex items-start gap-4">
                             <img src={user.profilePic} alt={user.name} className="w-16 h-16 rounded-full object-cover flex-shrink-0 border-2 border-white/50" />
                            <div className="flex-grow">
                                <p className="font-bold text-lg text-charcoal-grey dark:text-dark-text">@{user.name}</p>
                                <span className={`mt-1 inline-block px-3 py-1 text-xs font-semibold rounded-full ${emotionTagColors[user.emotion]}`}>Feeling {user.emotion}</span>
                            </div>
                        </div>
                        <p className="text-gray-700 dark:text-dark-subtext italic mt-4">"{user.snippet}"</p>
                    </div>
                    <div className="mt-6">
                        {connected ? (
                            <div className="flex items-center justify-center w-full px-6 py-3 font-semibold rounded-full shadow-lg bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300">
                                <CheckCircle size={18} className="mr-2" />
                                <span>Connected</span>
                            </div>
                        ) : (
                             <Button 
                                icon={<Send size={18} />} 
                                onClick={() => sendConnectionRequest(user.name, user.emotion)}
                                disabled={sent}
                                className={`w-full ${sent ? 'bg-gray-300 dark:bg-slate-600 text-gray-500 dark:text-dark-subtext cursor-not-allowed' : ''}`}
                            >
                                {sent ? 'Request Sent' : 'Send Request'}
                            </Button>
                        )}
                    </div>
                </div>
            )
        })}
      </div>
    </div>
  );
};

export default ConnectionsPage;