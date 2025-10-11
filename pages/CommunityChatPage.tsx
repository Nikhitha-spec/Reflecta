import React, { useState, useEffect, useRef, useMemo } from 'react';
import { ChatMessage } from '../types';
import Button from '../components/Button';
import EmojiPicker from '../components/EmojiPicker';
import ReactionsDisplay from '../components/ReactionsDisplay';
import { Send, Users, MessageSquare, CheckCheck, SmilePlus, AlertCircle } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useAppContext } from '../contexts/AppContext';
import { POTENTIAL_CONNECTIONS, defaultProfilePic } from '../constants';

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

const initialCommunityMessages: ChatMessage[] = [
    { id: '1', sender: 'AquaSoul7', text: 'Hello everyone! Hope you\'re all having a peaceful day.', timestamp: '11:00 AM', status: 'read', reactions: { '👋': ['StarGazer'] } },
    { id: '2', sender: 'StarGazer', text: 'Hey! Nice to see people here. It\'s a bit of a tough morning for me.', timestamp: '11:01 AM', status: 'read', reactions: { '❤️': ['AquaSoul7'] } },
    { id: '3', sender: 'Admin', text: 'Welcome to the community chat! Please remember to be kind and respectful.', timestamp: '11:02 AM', status: 'read' },
];

const CommunityChatPage: React.FC = () => {
    const { currentUser } = useAuth();
    const { connections } = useAppContext();
    const [activeChat, setActiveChat] = useState<string>('community'); // 'community' or a username
    const [messages, setMessages] = useState<{ [key: string]: ChatMessage[] }>({
        community: initialCommunityMessages
    });
    const [newMessage, setNewMessage] = useState('');
    const [warning, setWarning] = useState('');
    const [pickerOpenFor, setPickerOpenFor] = useState<string | null>(null);
    const messagesEndRef = useRef<null | HTMLDivElement>(null);

    const userAvatars = useMemo(() => {
        const map = new Map<string, string>();
        POTENTIAL_CONNECTIONS.forEach(user => {
            if (user.profilePic) {
                map.set(user.name, user.profilePic);
            }
        });
        return map;
    }, []);

    const connectedUsers = useMemo(() => {
        if (!currentUser) return [];
        return connections.map(conn => {
            const otherUsername = conn.users.find(u => u !== currentUser.username);
            const otherUserPic = conn.profilePics[conn.users.indexOf(otherUsername!)];
            return {
                id: conn.id,
                name: otherUsername!,
                profilePic: otherUserPic || defaultProfilePic
            };
        }).filter(user => user.name);
    }, [connections, currentUser]);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(scrollToBottom, [messages, activeChat]);

    // Effect to mark sent messages as "read" after a delay
    useEffect(() => {
        const readTimer = setTimeout(() => {
            const currentChatMessages = messages[activeChat] || [];
            const updatedMessages = currentChatMessages.map((msg): ChatMessage => 
                msg.sender === currentUser?.username && msg.status === 'sent' ? { ...msg, status: 'read' } : msg
            );

            if (JSON.stringify(updatedMessages) !== JSON.stringify(currentChatMessages)) {
                 setMessages(prev => ({
                    ...prev,
                    [activeChat]: updatedMessages,
                }));
            }
        }, 1500);

        return () => clearTimeout(readTimer);
    }, [messages, activeChat, currentUser]);

    const handleSelectChat = (chatId: string) => {
        setActiveChat(chatId);
        setPickerOpenFor(null);
        if (!messages[chatId]) {
            setMessages(prev => ({
                ...prev,
                [chatId]: [{
                    id: new Date().toISOString(),
                    sender: 'System',
                    text: `You are now chatting with @${chatId}. Say hello!`,
                    timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                    status: 'read'
                }]
            }));
        }
    };

    const handleAddReaction = (messageId: string, emoji: string) => {
        if (!currentUser) return;
        const currentChatMessages = messages[activeChat] || [];
        const updatedMessages = currentChatMessages.map(msg => {
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
        });

        setMessages(prev => ({ ...prev, [activeChat]: updatedMessages }));
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
                id: new Date().toISOString(),
                sender: currentUser.username,
                text: filteredText,
                timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                status: 'sent',
            };
            
            const currentChatMessages = messages[activeChat] || [];
            setMessages(prev => ({
                ...prev,
                [activeChat]: [...currentChatMessages, message]
            }));

            setNewMessage('');
        }
    };

    const currentChatMessages = messages[activeChat] || [];

    return (
        <div className="flex flex-col md:flex-row h-full gap-6">
            <div className="w-full md:w-1/3 lg:w-1/4 bg-white dark:bg-dark-card rounded-lg shadow-sm border dark:border-slate-700 p-4 flex flex-col">
                <h2 className="text-xl font-bold text-charcoal-grey dark:text-dark-text mb-4 border-b dark:border-slate-600 pb-2">Chats</h2>
                <ul className="space-y-2 overflow-y-auto">
                    <li
                        onClick={() => handleSelectChat('community')}
                        className={`p-3 rounded-lg cursor-pointer flex items-center space-x-3 transition-colors ${activeChat === 'community' ? 'bg-primary/20 text-primary font-semibold' : 'hover:bg-gray-100 dark:hover:bg-slate-700'}`}
                    >
                        <Users size={20} />
                        <span>Community</span>
                    </li>
                     {connectedUsers.map(user => (
                        <li
                            key={user.id}
                            onClick={() => handleSelectChat(user.name)}
                            className={`p-3 rounded-lg cursor-pointer flex items-center space-x-3 transition-colors group relative ${activeChat === user.name ? 'bg-primary/20 text-primary font-semibold' : 'hover:bg-gray-100 dark:hover:bg-slate-700'}`}
                        >
                           <img src={user.profilePic} alt={user.name} className="w-8 h-8 rounded-full object-cover flex-shrink-0" />
                           <span className="truncate">@{user.name}</span>
                        </li>
                     ))}
                </ul>
            </div>

            <div className="flex-grow flex flex-col bg-white dark:bg-dark-card rounded-lg shadow-inner border dark:border-slate-700">
                <div className="p-4 border-b dark:border-slate-700">
                    <h1 className="text-2xl font-bold text-charcoal-grey dark:text-dark-text text-center">
                        {activeChat === 'community' ? 'Community Chat' : `Chat with @${activeChat}`}
                    </h1>
                </div>

                <div className="flex-grow p-4 overflow-y-auto space-y-4">
                    {currentChatMessages.map((msg, index) => {
                        const isCurrentUser = msg.sender === currentUser?.username;
                        const isSystemMessage = msg.sender === 'System' || msg.sender === 'Admin';
                        const showAvatar = !isCurrentUser && !isSystemMessage && (index === 0 || currentChatMessages[index - 1].sender !== msg.sender);
                        
                        return (
                            <div key={msg.id} className={`flex items-start group ${isCurrentUser ? 'justify-end' : 'justify-start'}`}>
                               <div className={`flex items-end gap-2.5 ${isCurrentUser ? 'flex-row-reverse' : 'flex-row'}`}>
                                    <div className="w-8 flex-shrink-0">
                                      {!isCurrentUser && !isSystemMessage && showAvatar && (
                                        <img src={userAvatars.get(msg.sender) || defaultProfilePic} alt={msg.sender} className="w-8 h-8 rounded-full object-cover" />
                                      )}
                                    </div>
    
                                    <div className="relative">
                                        <div className={`max-w-xs md:max-w-md p-3 flex flex-col ${
                                            isSystemMessage
                                                ? 'bg-gray-100 dark:bg-slate-700 text-gray-600 dark:text-dark-subtext text-sm italic w-full text-center rounded-lg'
                                                : isCurrentUser
                                                    ? 'bg-gradient-to-r from-primary to-accent text-white rounded-t-2xl rounded-l-2xl'
                                                    : 'bg-slate-200 dark:bg-slate-700 text-charcoal-grey dark:text-dark-text rounded-t-2xl rounded-r-2xl'
                                        }`}>
                                            {!isCurrentUser && !isSystemMessage && <p className="font-bold text-xs text-accent">{msg.sender === 'Admin' ? 'Reflecta Team' : `@${msg.sender}`}</p>}
                                            <p className="mt-1">{filterOffensiveContent(msg.text)}</p>
                                            {!isSystemMessage && (
                                                <div className={`text-xs mt-1 flex items-center justify-end space-x-1 ${isCurrentUser ? 'text-blue-100' : 'text-gray-500 dark:text-dark-subtext'}`}>
                                                    <span>{msg.timestamp}</span>
                                                    {isCurrentUser && (
                                                        <CheckCheck size={16} className={msg.status === 'read' ? 'text-blue-400' : 'text-gray-400 dark:text-slate-500'} />
                                                    )}
                                                </div>
                                            )}
                                        </div>
                                        {msg.reactions && <ReactionsDisplay reactions={msg.reactions} />}
                                    </div>

                                    {!isSystemMessage && (
                                        <div className="relative self-center">
                                            <button
                                                onClick={() => setPickerOpenFor(pickerOpenFor === msg.id ? null : msg.id)}
                                                className="text-gray-400 dark:text-dark-subtext p-1 rounded-full hover:bg-gray-200 dark:hover:bg-slate-600 opacity-0 group-hover:opacity-100 transition-opacity"
                                                aria-label="Add reaction"
                                            >
                                                <SmilePlus size={18} />
                                            </button>
                                            {pickerOpenFor === msg.id && (
                                                <EmojiPicker 
                                                    onSelect={(emoji) => handleAddReaction(msg.id, emoji)}
                                                    positionClasses={isCurrentUser ? 'right-0 bottom-full mb-2' : 'left-0 bottom-full mb-2'}
                                                />
                                            )}
                                        </div>
                                    )}
                               </div>
                            </div>
                        )
                    })}
                    <div ref={messagesEndRef} />
                </div>
                
                {activeChat === 'community' && (
                     <div className="bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300 p-2 text-xs text-center mx-4 mb-2 rounded">
                        This is a public chat. Be mindful of what you share.
                    </div>
                )}
                
                <form onSubmit={handleSendMessage} className="p-4 border-t dark:border-slate-700">
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
        </div>
    );
};

export default CommunityChatPage;