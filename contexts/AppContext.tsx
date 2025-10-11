import React, { createContext, useContext, useState, ReactNode } from 'react';
import { ConnectionRequest, Emotion, RequestStatus, Connection } from '../types';
import { useAuth } from './AuthContext';
import { POTENTIAL_CONNECTIONS, defaultProfilePic } from '../constants';

interface AppContextType {
  connectionRequests: ConnectionRequest[];
  sentRequests: ConnectionRequest[];
  connections: Connection[];
  sendConnectionRequest: (toUser: string, emotion: Emotion, profilePic?: string) => void;
  acceptRequest: (requestId: string) => void;
  rejectRequest: (requestId: string) => void;
  removeConnection: (connectionId: string) => void;
  cancelSentRequest: (requestId: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const wanderer = POTENTIAL_CONNECTIONS.find(p => p.name === 'Wanderer');
const rockClimber = POTENTIAL_CONNECTIONS.find(p => p.name === 'RockClimber');

const MOCK_INCOMING_REQUESTS: ConnectionRequest[] = [
    { 
        id: 'req1', 
        fromUser: 'Wanderer', 
        toUser: 'CurrentUser', 
        status: RequestStatus.Pending, 
        timestamp: '2 hours ago', 
        emotion: Emotion.Lonely,
        profilePic: wanderer?.profilePic
    },
    { 
        id: 'req2', 
        fromUser: 'RockClimber', 
        toUser: 'CurrentUser', 
        status: RequestStatus.Pending, 
        timestamp: '1 day ago', 
        emotion: Emotion.Stressed,
        profilePic: rockClimber?.profilePic
    },
];


export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { currentUser } = useAuth();
  const [connectionRequests, setConnectionRequests] = useState<ConnectionRequest[]>(MOCK_INCOMING_REQUESTS);
  const [sentRequests, setSentRequests] = useState<ConnectionRequest[]>([]);
  const [connections, setConnections] = useState<Connection[]>([]);

  const sendConnectionRequest = (toUser: string, emotion: Emotion, profilePic?: string) => {
    if (!currentUser) return;
    // Prevent sending a request to someone you are already connected with
    const isConnected = connections.some(c => c.users.includes(toUser));
    if (isConnected) return;

    const newRequest: ConnectionRequest = {
      id: `sent_${new Date().getTime()}`,
      fromUser: currentUser.username,
      toUser,
      status: RequestStatus.Pending,
      timestamp: new Date().toLocaleDateString(),
      emotion,
      profilePic: currentUser.profilePic, // The sender's pic
    };
    setSentRequests(prev => [...prev, newRequest]);
  };

  const acceptRequest = (requestId: string) => {
    const request = connectionRequests.find(req => req.id === requestId);
    if (!request || !currentUser) return;
    
    const otherUser = POTENTIAL_CONNECTIONS.find(u => u.name === request.fromUser);

    const newConnection: Connection = {
        id: request.id,
        users: [currentUser.username, request.fromUser],
        profilePics: [currentUser.profilePic, otherUser?.profilePic || defaultProfilePic],
        timestamp: new Date().toISOString(),
        emotion: request.emotion,
    };

    setConnections(prev => [...prev, newConnection]);
    setConnectionRequests(prev => prev.filter(req => req.id !== requestId));
  };
  
  const rejectRequest = (requestId: string) => {
    setConnectionRequests(prev => prev.filter(req => req.id !== requestId));
  };

  const removeConnection = (connectionId: string) => {
    if (!currentUser) return;
    
    const connectionToRemove = connections.find(conn => conn.id === connectionId);
    if (!connectionToRemove) return;

    // Find the other user in the connection
    const otherUserIndex = connectionToRemove.users.findIndex(u => u !== currentUser.username);
    const otherUsername = connectionToRemove.users[otherUserIndex];
    const otherUserPic = connectionToRemove.profilePics[otherUserIndex];
    
    // Re-create it as a new incoming request
    const newRequest: ConnectionRequest = {
        id: connectionToRemove.id, // Reuse ID for simplicity, could be new
        fromUser: otherUsername,
        toUser: currentUser.username,
        status: RequestStatus.Pending,
        timestamp: new Date().toLocaleString(),
        emotion: connectionToRemove.emotion,
        profilePic: otherUserPic,
    };
    setConnectionRequests(prev => [newRequest, ...prev]);
    setConnections(prev => prev.filter(conn => conn.id !== connectionId));
  };

  const cancelSentRequest = (requestId: string) => {
    setSentRequests(prev => prev.filter(req => req.id !== requestId));
  };


  return (
    <AppContext.Provider value={{ connectionRequests, sentRequests, connections, sendConnectionRequest, acceptRequest, rejectRequest, removeConnection, cancelSentRequest }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};