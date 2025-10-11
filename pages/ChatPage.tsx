import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ChatMessage, Connection } from '../types';
import Button from '../components/Button';
import EmojiPicker from '../components/EmojiPicker';
import ReactionsDisplay from '../components/ReactionsDisplay';
import { useAuth } from '../contexts/AuthContext';
import { useAppContext } from '../contexts/AppContext';
import { Send, ShieldAlert, AlertCircle, CheckCheck, SmilePlus, MoreVertical, UserX } from 'lucide-react';

// Simple profanity filter
const badWords = ['offensive', 'inappropriate', 'badword', 'hate'];
const filterOffensiveContent = (text: string) => {
    let filteredText = text;
    badWords.forEach(word => {
        const regex = new RegExp(`\\b${word}\\b`, 'gi');
        filteredText = filteredText.replace(regex, '*'.repeat(word.length));
    });
    return filteredText;
};
const containsBadWord = (text: string) => {
    const regex = new RegExp(`\\b(${badWords.join('|')})\\b`, 'gi');
    return regex.test(text);
};

const mockMessages: ChatMessage[] = [
    { id: '1', sender: 'OtherUser', text: 'Hey, thanks for accepting my request. Had to deal with some offensive people earlier.', timestamp: '10:30 AM', status: 'read', reactions: { '👍': ['OtherUser'] } },
    { id: '2', sender: 'CurrentUser', text: 'Of course! It feels good to know I\'m not alone in feeling this way.', timestamp: '10:31 AM', status: 'read', reactions: { '❤️': ['OtherUser'] } },
];

const ChatPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const { currentUser } = useAuth();
    const { connections, removeConnection } = useAppContext();
    const navigate = useNavigate();

    const [messages, setMessages] = useState<ChatMessage[]>(mockMessages);
    const [newMessage, setNewMessage] = useState('');
    const [warning, setWarning] = useState('');
    const [pickerOpenFor, setPickerOpenFor] = useState<string | null>(null);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const messagesEndRef = useRef<null | HTMLDivElement>(null);

    const connection = connections.find(c => c.users.includes(currentUser?.username || '') && c.users.includes(id || ''));

    useEffect(() => {
        // If there's no valid connection, redirect the user.
        if (!connection) {
            navigate('/chat');
        }
    }, [connection, navigate]);


    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(scrollToBottom, [messages]);
    
    // Simulate receiving a message & reading sent messages
    useEffect(() => {
        const receiveTimer = setTimeout(() => {
            if (messages.length < 4) {
                 setMessages(prev => [...prev, {id: '3', sender: id || 'OtherUser', text: `It's been a tough week. Just felt overwhelmed, you know?`, timestamp: '10:32 AM', status: 'read'}]);
            }
        }, 3000);

        const readTimer = setTimeout(() => {
            setMessages(prevMessages => prevMessages.map(msg => 
                msg.sender === 'CurrentUser' && msg.status === 'sent' ? { ...msg, status: 'read' } : msg
            ));
        }, 1500);

        return () => {
            clearTimeout(receiveTimer);
            clearTimeout(readTimer);
        };
    }, [messages, id]);

    const handleAddReaction = (messageId: string, emoji: string) => {
        if (!currentUser) return;
        setMessages(prevMessages => 
            prevMessages.map(msg => {
                if (msg.id === messageId) {
                    const newReactions = { ...(msg.reactions || {}) };
                    if (!newReactions[emoji]) newReactions[emoji] = [];
                    
                    const userHasReacted = newReactions[emoji].includes(currentUser.username);
                    if (userHasReacted) {
                        newReactions[emoji] = newReactions[emoji].filter(u => u !== currentUser.username);
                    } else {
                        newReactions[emoji].push(currentUser.username);
                    }

                    if (newReactions[emoji].length === 0) delete newReactions[emoji];
                    
                    return { ...msg, reactions: newReactions };
                }
                return msg;
            })
        );
        setPickerOpenFor(null);
    };

    const handleSendMessage = (e: React.FormEvent) => {
        e.preventDefault();
        if (newMessage.trim() && currentUser) {
            if (containsBadWord(newMessage)) {
                setWarning('Your message was modified to remove offensive language.');
                setTimeout(() => setWarning(''), 3000);
            } else if (warning) {
                setWarning('');
            }
            
            const filteredText = filterOffensiveContent(newMessage);
            const message: ChatMessage = {
                id: (messages.length + 1).toString(),
                sender: 'CurrentUser',
                text: filteredText,
                timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                status: 'sent',
            };
            setMessages([...messages, message]);
            setNewMessage('');
        }
    };

     const handleRemoveConnection = () => {
        if (connection && window.confirm(`Are you sure you want to remove your connection with @${id}? This action cannot be undone.`)) {
            removeConnection(connection.id);
            navigate('/chat'); // Redirect to main chat page after removal
        }
        setIsMenuOpen(false);
    };

    if (!connection) {
        return <div className="text-center p-8">Connection not found. Redirecting...</div>;
    }

    return (
        <div className="max-w-2xl mx-auto h-full flex flex-col">
            <div className="flex justify-between items-center mb-4 text-center">
                <div className="w-8"></div> {/* Spacer */}
                <h1 className="text-2xl font-bold text-charcoal-grey dark:text-dark-text">Chat with @{id}</h1>
                <div className="relative">
                    <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-slate-700 transition-colors" aria-label="Chat options">
                        <MoreVertical size={20} />
                    </button>
                    {isMenuOpen && (
                        <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-dark-card rounded-md shadow-lg py-1 z-10 border dark:border-slate-600">
                            <button
                                onClick={handleRemoveConnection}
                                className="flex items-center w-full px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors"
                            >
                                <UserX size={16} className="mr-2" />
                                Remove Connection
                            </button>
                        </div>
                    )}
                </div>
            </div>
            <div className="bg-yellow-100 dark:bg-yellow-900/30 border-l-4 border-yellow-500 text-yellow-700 dark:text-yellow-300 p-3 mb-4 rounded-md text-sm flex items-start space-x-2">
                <ShieldAlert size={20} className="flex-shrink-0 mt-0.5" />
                <p>Reflecta is a safe emotional space. For emergencies, please contact verified helplines. Report or block users for inappropriate behavior.</p>
            </div>
            <div className="flex-grow bg-white dark:bg-dark-card/50 rounded-lg shadow-inner border dark:border-slate-700 p-4 overflow-y-auto space-y-4">
                {messages.map(msg => (
                     <div key={msg.id} className={`flex items-end group ${msg.sender === 'CurrentUser' ? 'justify-end' : 'justify-start'}`}>
                        <div className={`flex items-center gap-2 ${msg.sender === 'CurrentUser' ? 'flex-row-reverse' : 'flex-row'}`}>
                            <div className="relative">
                                <div className={`max-w-xs md:max-w-md p-3 ${
                                    msg.sender === 'CurrentUser' 
                                        ? 'bg-gradient-to-r from-primary to-accent text-white rounded-t-2xl rounded-l-2xl' 
                                        : 'bg-slate-200 dark:bg-slate-700 text-charcoal-grey dark:text-dark-text rounded-t-2xl rounded-r-2xl'
                                }`}>
                                    <p>{filterOffensiveContent(msg.text)}</p>
                                    <div className={`text-xs mt-1 flex items-center justify-end space-x-1 ${msg.sender === 'CurrentUser' ? 'text-blue-100' : 'text-gray-500 dark:text-dark-subtext'}`}>
                                        <span>{msg.timestamp}</span>
                                        {msg.sender === 'CurrentUser' && (
                                            <CheckCheck size={16} className={msg.status === 'read' ? 'text-blue-400' : 'text-gray-400 dark:text-slate-500'} />
                                        )}
                                    </div>
                                </div>
                                {msg.reactions && <ReactionsDisplay reactions={msg.reactions} />}
                            </div>
                            <div className="relative self-center">
                                <button
                                    onClick={() => setPickerOpenFor(pickerOpenFor === msg.id ? null : msg.id)}
                                    className="text-gray-400 p-1 rounded-full hover:bg-gray-200 dark:hover:bg-slate-600 opacity-0 group-hover:opacity-100 transition-opacity"
                                    aria-label="Add reaction"
                                >
                                    <SmilePlus size={18} />
                                </button>
                                {pickerOpenFor === msg.id && (
                                    <EmojiPicker 
                                        onSelect={(emoji) => handleAddReaction(msg.id, emoji)}
                                        positionClasses={msg.sender === 'CurrentUser' ? 'right-0 bottom-full mb-2' : 'left-0 bottom-full mb-2'}
                                    />
                                )}
                            </div>
                        </div>
                    </div>
                ))}
                <div ref={messagesEndRef} />
            </div>
            <form onSubmit={handleSendMessage} className="mt-4">
                <div className="flex space-x-2">
                    <input
                        type="text"
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        placeholder="Type your message..."
                        className="flex-grow border rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary bg-transparent dark:border-slate-600 dark:placeholder-gray-400"
                    />
                    <Button type="submit" className="px-4 py-2" icon={<Send size={20} />}>Send</Button>
                </div>
                 {warning && (
                    <div className="mt-2 text-sm text-red-600 flex items-center space-x-1">
                        <AlertCircle size={16} />
                        <span>{warning}</span>
                    </div>
                )}
            </form>
        </div>
    );
};

export default ChatPage;