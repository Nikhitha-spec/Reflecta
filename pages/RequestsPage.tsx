import React, { useState } from 'react';
import { useAppContext } from '../contexts/AppContext';
import { Connection, ConnectionRequest } from '../types';
import Button from '../components/Button';
import Card from '../components/Card';
import { Check, X, Send, Clock, MessageSquare, UserX } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

type Tab = 'received' | 'sent' | 'connections';

const tabs: { id: Tab; label: string; icon: React.ReactNode }[] = [
    { id: 'received', label: 'Received', icon: <Check size={18} /> },
    { id: 'sent', label: 'Sent', icon: <Send size={18} /> },
    { id: 'connections', label: 'Connections', icon: <MessageSquare size={18} /> },
];

const RequestsPage: React.FC = () => {
    const { currentUser } = useAuth();
    const { connectionRequests, sentRequests, connections, acceptRequest, rejectRequest, removeConnection, cancelSentRequest } = useAppContext();
    const [activeTab, setActiveTab] = useState<Tab>('received');

    const renderContent = () => {
        switch (activeTab) {
            case 'received':
                return (
                    <div className="space-y-4">
                        {connectionRequests.length > 0 ? (
                            connectionRequests.map(req => (
                                <Card key={req.id} className="flex flex-col sm:flex-row items-center justify-between gap-4">
                                    <div className="flex items-center gap-4 w-full sm:w-auto">
                                        <img src={req.profilePic} alt="profile" className="w-14 h-14 rounded-full object-cover flex-shrink-0" />
                                        <div className="flex-grow">
                                            <p className="font-semibold text-charcoal-grey dark:text-dark-text">@{req.fromUser}</p>
                                            <p className="text-sm text-gray-500 dark:text-dark-subtext">Sent {req.timestamp}</p>
                                            <p className="text-sm text-gray-600 dark:text-dark-subtext mt-1">Feeling: <span className="font-medium">{req.emotion}</span></p>
                                        </div>
                                    </div>
                                    <div className="flex space-x-2 flex-shrink-0">
                                        <Button onClick={() => acceptRequest(req.id)} icon={<Check size={18} />} className="px-4 py-2 text-sm">Accept</Button>
                                        <Button onClick={() => rejectRequest(req.id)} variant="secondary" icon={<X size={18} />} className="px-4 py-2 text-sm">Reject</Button>
                                    </div>
                                </Card>
                            ))
                        ) : (
                            <Card><p className="text-gray-500 dark:text-dark-subtext text-center">You have no new connection requests.</p></Card>
                        )}
                    </div>
                );
            case 'sent':
                return (
                    <div className="space-y-4">
                        {sentRequests.length > 0 ? (
                             sentRequests.map(req => (
                                <Card key={req.id} className="flex items-center justify-between gap-4">
                                     <div className="flex items-center gap-4">
                                        <img src={req.profilePic} alt="profile" className="w-14 h-14 rounded-full object-cover flex-shrink-0" />
                                        <div>
                                            <p className="font-semibold text-charcoal-grey dark:text-dark-text">@{req.toUser}</p>
                                            <p className="text-sm text-gray-500 dark:text-dark-subtext">Sent {req.timestamp}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center space-x-2 flex-shrink-0">
                                        <Button
                                            onClick={() => cancelSentRequest(req.id)}
                                            variant="secondary"
                                            icon={<X size={18} />}
                                            className="px-4 py-2 text-sm !text-red-500 !border-red-500 hover:!bg-red-500/10"
                                        >
                                            Cancel
                                        </Button>
                                    </div>
                                </Card>
                            ))
                        ) : (
                           <Card>
                                <p className="text-gray-500 dark:text-dark-subtext text-center">You haven't sent any requests yet. <Link to="/connect" className="text-primary font-semibold hover:underline">Explore connections</Link> to find others.</p>
                            </Card>
                        )}
                    </div>
                );
            case 'connections':
                 return (
                    <div className="space-y-4">
                        {connections.length > 0 ? (
                            connections.map(conn => {
                                const otherUserIndex = conn.users.findIndex(u => u !== currentUser?.username);
                                const otherUsername = conn.users[otherUserIndex];
                                const otherUserPic = conn.profilePics[otherUserIndex];

                                return (
                                    <Card key={conn.id} className="flex flex-col sm:flex-row items-center justify-between gap-4">
                                        <div className="flex items-center gap-4 w-full sm:w-auto">
                                            <img src={otherUserPic} alt={otherUsername} className="w-14 h-14 rounded-full object-cover flex-shrink-0" />
                                            <div className="flex-grow">
                                                <p className="font-semibold text-charcoal-grey dark:text-dark-text">@{otherUsername}</p>
                                                <p className="text-sm text-gray-500 dark:text-dark-subtext">Connected since {new Date(conn.timestamp).toLocaleDateString()}</p>
                                            </div>
                                        </div>
                                        <div className="flex space-x-2 flex-shrink-0">
                                            <Link to={`/chat/${otherUsername}`}>
                                                <Button icon={<MessageSquare size={18} />} className="px-4 py-2 text-sm">Chat</Button>
                                            </Link>
                                            <Button onClick={() => removeConnection(conn.id)} variant="secondary" icon={<UserX size={18} />} className="px-4 py-2 text-sm !text-red-500 !border-red-500 hover:!bg-red-500/10">Remove</Button>
                                        </div>
                                    </Card>
                                );
                            })
                        ) : (
                           <Card><p className="text-gray-500 dark:text-dark-subtext text-center">You haven't made any connections yet. Accept a request to start chatting!</p></Card>
                        )}
                    </div>
                );
            default:
                return null;
        }
    };

    const getCount = (tab: Tab) => {
        switch (tab) {
            case 'received': return connectionRequests.length;
            case 'sent': return sentRequests.length;
            case 'connections': return connections.length;
            default: return 0;
        }
    }

    return (
        <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl font-bold text-charcoal-grey dark:text-dark-text mb-2">Connections</h1>
            <p className="text-lg text-gray-600 dark:text-dark-subtext mb-8">Manage your incoming, outgoing, and active connections.</p>
            
            <div className="mb-6 border-b border-gray-200 dark:border-slate-700">
                <nav className="-mb-px flex space-x-6" aria-label="Tabs">
                    {tabs.map(tab => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`
                                ${activeTab === tab.id
                                    ? 'border-primary text-primary font-semibold'
                                    : 'border-transparent text-gray-500 dark:text-dark-subtext hover:text-gray-700 dark:hover:text-dark-text hover:border-gray-300 dark:hover:border-slate-600'
                                }
                                whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-200 flex items-center space-x-2
                            `}
                        >
                            {tab.icon}
                            <span>{tab.label}</span>
                            <span className={`
                                ${activeTab === tab.id ? 'bg-primary text-white' : 'bg-gray-200 dark:bg-slate-700 text-gray-600 dark:text-dark-subtext'}
                                ml-2 py-0.5 px-2 rounded-full text-xs font-medium
                            `}>
                                {getCount(tab.id)}
                            </span>
                        </button>
                    ))}
                </nav>
            </div>
            
            <div>{renderContent()}</div>
        </div>
    );
};

export default RequestsPage;