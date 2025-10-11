import React, { useState } from 'react';
import { JournalEntry, Emotion } from '../types';
import { MOCK_JOURNAL_ENTRIES, EMOTION_OPTIONS } from '../constants';
import Button from '../components/Button';
import Card from '../components/Card';
import JournalCard from '../components/JournalCard';
import { useAuth } from '../contexts/AuthContext';
import { BookPlus } from 'lucide-react';

const JournalPage: React.FC = () => {
    const { currentUser } = useAuth();
    const [entries, setEntries] = useState<JournalEntry[]>(MOCK_JOURNAL_ENTRIES);
    const [newEntry, setNewEntry] = useState('');
    const [selectedEmotion, setSelectedEmotion] = useState<Emotion>(Emotion.Happy);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!newEntry.trim() || !currentUser) return;

        const entry: JournalEntry = {
            id: new Date().toISOString(),
            author: currentUser.username,
            content: newEntry,
            emotion: selectedEmotion,
            timestamp: 'Just now',
            reactions: 0,
        };

        setEntries([entry, ...entries]);
        setNewEntry('');
    };

    return (
        <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl font-bold text-charcoal-grey dark:text-dark-text mb-2">My Journal</h1>
            <p className="text-lg text-gray-600 dark:text-dark-subtext mb-8">A private space to reflect and understand your feelings.</p>

            <Card className="mb-12">
                <form onSubmit={handleSubmit}>
                    <h2 className="text-2xl font-semibold text-charcoal-grey dark:text-dark-text mb-4">New Entry</h2>
                    <textarea
                        value={newEntry}
                        onChange={(e) => setNewEntry(e.target.value)}
                        placeholder="What's on your mind?..."
                        className="w-full h-32 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-transparent dark:border-slate-600 dark:placeholder-gray-400"
                        required
                    />
                    <div className="flex flex-col sm:flex-row justify-between items-center mt-4">
                        <div className="flex items-center space-x-2 mb-4 sm:mb-0">
                            <label htmlFor="emotion" className="font-medium dark:text-dark-subtext">I'm feeling:</label>
                            <select
                                id="emotion"
                                value={selectedEmotion}
                                onChange={(e) => setSelectedEmotion(e.target.value as Emotion)}
                                className="border rounded-lg px-3 py-2 focus:outline-none focus:ring-1 focus:ring-primary bg-white dark:bg-dark-card dark:border-slate-600"
                            >
                                {EMOTION_OPTIONS.map(emo => <option key={emo} value={emo}>{emo}</option>)}
                            </select>
                        </div>
                        <Button type="submit" icon={<BookPlus size={20}/>}>Add Entry</Button>
                    </div>
                </form>
            </Card>

            <div>
                <h2 className="text-3xl font-bold text-charcoal-grey dark:text-dark-text mb-6">Recent Entries</h2>
                <div className="space-y-6">
                    {entries.map(entry => (
                        <JournalCard key={entry.id} entry={entry} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default JournalPage;