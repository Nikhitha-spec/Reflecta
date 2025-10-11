import React, { useRef, useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import Card from '../components/Card';
import Button from '../components/Button';
import { Edit, Save, X, User, Mail, Users, Quote, LogOut } from 'lucide-react';
import { useAppContext } from '../contexts/AppContext';

const ProfilePage: React.FC = () => {
    const { currentUser, updateProfilePicture, updateProfile, logout } = useAuth();
    const { connections } = useAppContext();
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [isEditing, setIsEditing] = useState(false);
    const [editedUsername, setEditedUsername] = useState(currentUser?.username || '');
    const [editedEmail, setEditedEmail] = useState(currentUser?.email || '');
    const [editedStatus, setEditedStatus] = useState(currentUser?.status || '');

    const connectionCount = connections.length;

    useEffect(() => {
        if (currentUser) {
            setEditedUsername(currentUser.username);
            setEditedEmail(currentUser.email);
            setEditedStatus(currentUser.status || '');
        }
    }, [currentUser]);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                if (typeof reader.result === 'string') {
                    updateProfilePicture(reader.result);
                }
            };
            reader.readAsDataURL(file);
        }
    };

    const handleEditClick = () => {
        fileInputRef.current?.click();
    };

    const handleSaveChanges = () => {
        if (currentUser && (editedUsername !== currentUser.username || editedEmail !== currentUser.email || editedStatus !== currentUser.status)) {
            updateProfile(editedUsername, editedEmail, editedStatus);
        }
        setIsEditing(false);
    };

    const handleCancelEdit = () => {
        if (currentUser) {
            setEditedUsername(currentUser.username);
            setEditedEmail(currentUser.email);
            setEditedStatus(currentUser.status || '');
        }
        setIsEditing(false);
    };

    if (!currentUser) {
        return null; // ProtectedRoute will redirect
    }

    return (
        <div className="max-w-2xl mx-auto">
            <h1 className="text-4xl font-bold text-charcoal-grey dark:text-dark-text mb-8">My Profile</h1>
            <Card>
                <div className="flex flex-col items-center">
                    <div className="relative w-40 h-40 group">
                        <img
                            src={currentUser.profilePic}
                            alt="Profile"
                            className="w-full h-full rounded-full object-cover border-4 border-primary shadow-lg"
                        />
                        <button 
                            onClick={handleEditClick}
                            className="absolute inset-0 bg-black/50 rounded-full flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity"
                            aria-label="Change profile picture"
                        >
                            <Edit size={32} />
                        </button>
                    </div>
                    <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleFileChange}
                        accept="image/*"
                        className="hidden"
                    />

                    {!isEditing ? (
                        <div className="text-center mt-6 w-full">
                            <h2 className="text-3xl font-bold text-charcoal-grey dark:text-dark-text">@{currentUser.username}</h2>
                            <p className="mt-2 text-lg text-gray-500 dark:text-dark-subtext">{currentUser.email}</p>
                            <div className="mt-4 flex items-center justify-center space-x-3 text-gray-500 dark:text-dark-subtext italic">
                                <Quote size={18} className="transform -scale-x-100" />
                                <p>"{currentUser.status || 'No status set.'}"</p>
                                <Quote size={18} />
                            </div>
                             <div className="mt-4 flex items-center justify-center space-x-2 text-gray-600 dark:text-dark-subtext">
                                <Users size={20} />
                                <span className="font-medium">{connectionCount} Connections</span>
                            </div>
                            <div className="mt-8 border-t dark:border-slate-700 pt-6 flex justify-center space-x-4">
                                <Button onClick={() => setIsEditing(true)} icon={<Edit size={18}/>}>Edit Profile</Button>
                                <Button onClick={logout} variant="secondary" icon={<LogOut size={18}/>} className="!text-red-500 !border-red-500 hover:!bg-red-500/10">Logout</Button>
                            </div>
                        </div>
                    ) : (
                        <div className="w-full mt-6 space-y-4">
                            <div>
                                <label htmlFor="username" className="block text-sm font-medium text-gray-700 dark:text-dark-subtext">Username</label>
                                <div className="mt-1 relative rounded-md shadow-sm">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <User className="text-gray-400" size={20} />
                                    </div>
                                    <input
                                        type="text"
                                        id="username"
                                        value={editedUsername}
                                        onChange={(e) => setEditedUsername(e.target.value)}
                                        className="focus:ring-primary focus:border-primary block w-full pl-10 sm:text-sm border-gray-300 rounded-md py-2 dark:bg-slate-700 dark:border-slate-600 dark:placeholder-gray-400 dark:text-white"
                                    />
                                </div>
                            </div>
                             <div>
                                <label htmlFor="status" className="block text-sm font-medium text-gray-700 dark:text-dark-subtext">Status</label>
                                <div className="mt-1 relative rounded-md shadow-sm">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <Quote className="text-gray-400" size={20} />
                                    </div>
                                    <input
                                        type="text"
                                        id="status"
                                        value={editedStatus}
                                        onChange={(e) => setEditedStatus(e.target.value)}
                                        className="focus:ring-primary focus:border-primary block w-full pl-10 sm:text-sm border-gray-300 rounded-md py-2 dark:bg-slate-700 dark:border-slate-600 dark:placeholder-gray-400 dark:text-white"
                                        placeholder="What's on your mind?"
                                        maxLength={100}
                                    />
                                </div>
                            </div>
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-dark-subtext">Email</label>
                                 <div className="mt-1 relative rounded-md shadow-sm">
                                     <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <Mail className="text-gray-400" size={20} />
                                    </div>
                                    <input
                                        type="email"
                                        id="email"
                                        value={editedEmail}
                                        onChange={(e) => setEditedEmail(e.target.value)}
                                        className="focus:ring-primary focus:border-primary block w-full pl-10 sm:text-sm border-gray-300 rounded-md py-2 dark:bg-slate-700 dark:border-slate-600 dark:placeholder-gray-400 dark:text-white"
                                    />
                                </div>
                            </div>
                            <div className="flex justify-center space-x-4 pt-4 border-t dark:border-slate-700 mt-6">
                                <Button onClick={handleSaveChanges} icon={<Save size={18}/>}>Save Changes</Button>
                                <Button onClick={handleCancelEdit} variant="secondary" icon={<X size={18}/>}>Cancel</Button>
                            </div>
                        </div>
                    )}
                </div>
            </Card>
        </div>
    );
};

export default ProfilePage;