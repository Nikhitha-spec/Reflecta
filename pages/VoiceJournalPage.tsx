import React, { useState, useEffect } from 'react';
// FIX: Corrected import to follow guidelines
import { GoogleGenAI, Type } from '@google/genai';
import { Mic, StopCircle, Save, Trash2, Loader2 } from 'lucide-react';
import useVoiceRecorder from '../hooks/useVoiceRecorder';
import { VoiceNote, Emotion } from '../types';
import Button from '../components/Button';
import Card from '../components/Card';
import Waveform from '../components/Waveform';

// FIX: Corrected initialization to follow guidelines
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });

const VoiceJournalPage: React.FC = () => {
  const { isRecording, startRecording, stopRecording, audioURL, recordedBlob } = useVoiceRecorder();
  const [voiceNotes, setVoiceNotes] = useState<VoiceNote[]>([]);
  const [transcribing, setTranscribing] = useState(false);
  const [transcription, setTranscription] = useState('');
  const [error, setError] = useState('');

  // Load voice notes from local storage on mount
  useEffect(() => {
    const savedNotes = localStorage.getItem('reflectaVoiceNotes');
    if (savedNotes) {
      setVoiceNotes(JSON.parse(savedNotes));
    }
  }, []);

  // Save voice notes to local storage whenever they change
  useEffect(() => {
    localStorage.setItem('reflectaVoiceNotes', JSON.stringify(voiceNotes));
  }, [voiceNotes]);

  const handleStartRecording = async () => {
    try {
      setTranscription('');
      setError('');
      await startRecording();
    } catch (err) {
      setError('Could not access microphone. Please check permissions.');
    }
  };

  const blobToBase64 = (blob: Blob): Promise<string> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(blob);
        reader.onloadend = () => {
            const base64data = (reader.result as string).split(',')[1];
            resolve(base64data);
        };
        reader.onerror = (error) => {
            reject(error);
        };
    });
  };

  const handleStopRecording = async () => {
      stopRecording();
  };

  useEffect(() => {
      const transcribeAudio = async () => {
        if (!recordedBlob) return;
        
        setTranscribing(true);
        setError('');
        try {
            const base64Data = await blobToBase64(recordedBlob);
            
            // FIX: Corrected API call to follow guidelines
            const response = await ai.models.generateContent({
                model: 'gemini-2.5-flash',
                contents: {
                    parts: [
                        { text: "Transcribe this audio. Also, analyze the sentiment and suggest one of the following emotion tags: Happy, Sad, Anxious, Stressed, Grateful, Lonely, Overwhelmed. Format the response as JSON with 'transcription' and 'emotion' keys." },
                        {
                            inlineData: {
                                data: base64Data,
                                mimeType: recordedBlob.type || 'audio/webm' // provide a fallback mimetype
                            }
                        }
                    ]
                },
                config: {
                    responseMimeType: "application/json",
                    responseSchema: {
                        type: Type.OBJECT,
                        properties: {
                            transcription: { type: Type.STRING },
                            emotion: { type: Type.STRING, enum: Object.values(Emotion) }
                        },
                        required: ["transcription", "emotion"]
                    }
                }
            });
            
            // FIX: Corrected response parsing to follow guidelines
            const responseText = response.text.trim();
            const parsed = JSON.parse(responseText);

            setTranscription(parsed.transcription);
            saveVoiceNote(parsed.emotion);
        } catch (e) {
            console.error(e);
            setError('Failed to transcribe audio. Please try again.');
            saveVoiceNote();
        } finally {
            setTranscribing(false);
        }
      };

      if (recordedBlob) {
          transcribeAudio();
      }
  }, [recordedBlob]);

  const saveVoiceNote = (emotion?: Emotion) => {
    if (audioURL) {
      const newNote: VoiceNote = {
        id: new Date().toISOString(),
        url: audioURL,
        timestamp: new Date().toLocaleString(),
        emotion: emotion,
      };
      setVoiceNotes(prev => [newNote, ...prev]);
    }
  };

  const deleteVoiceNote = (id: string) => {
    const noteToDelete = voiceNotes.find(note => note.id === id);
    if (noteToDelete) {
        URL.revokeObjectURL(noteToDelete.url);
    }
    setVoiceNotes(prev => prev.filter(note => note.id !== id));
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold text-charcoal-grey dark:text-dark-text mb-2">Voice Journal</h1>
      <p className="text-lg text-gray-600 dark:text-dark-subtext mb-8">Speak your mind freely. Your recordings are private.</p>
      
      <Card className="flex flex-col items-center justify-center p-8 mb-12">
        <Waveform isRecording={isRecording} />
        <div className="mt-6 flex items-center space-x-4">
          {!isRecording ? (
            <button onClick={handleStartRecording} className="w-20 h-20 bg-red-500 text-white rounded-full flex items-center justify-center shadow-lg hover:bg-red-600 transition-colors transform hover:scale-105" aria-label="Start recording">
              <Mic size={40} />
            </button>
          ) : (
            <button onClick={handleStopRecording} className="w-20 h-20 bg-gray-700 text-white rounded-full flex items-center justify-center shadow-lg hover:bg-gray-800 transition-colors transform hover:scale-105" aria-label="Stop recording">
              <StopCircle size={40} />
            </button>
          )}
        </div>
        {error && <p className="mt-4 text-red-500">{error}</p>}
        {(audioURL || transcribing) && (
            <div className="w-full mt-6 text-center">
                {transcribing ? (
                    <div className="flex items-center justify-center text-gray-600 dark:text-dark-subtext">
                        <Loader2 className="animate-spin mr-2" />
                        <span>Analyzing your note...</span>
                    </div>
                ) : (
                    <>
                        <audio src={audioURL} controls className="w-full mb-4" />
                        {transcription && (
                            <div className="bg-gray-100 dark:bg-slate-700 p-4 rounded-lg">
                                <h4 className="font-semibold text-left dark:text-dark-text">Transcription:</h4>
                                <p className="text-left italic dark:text-dark-subtext">"{transcription}"</p>
                            </div>
                        )}
                        <Button onClick={() => {}} className="mt-4" icon={<Save size={18}/>} disabled>Saved!</Button>
                    </>
                )}
            </div>
        )}
      </Card>

      <h2 className="text-3xl font-bold text-charcoal-grey dark:text-dark-text mb-6">My Voice Notes</h2>
      <div className="space-y-4">
        {voiceNotes.length > 0 ? voiceNotes.map(note => (
            <Card key={note.id} className="flex items-center justify-between">
              <div>
                <p className="font-semibold dark:text-dark-text">Recorded on {note.timestamp}</p>
                {note.emotion && <span className="text-sm bg-purple-100 text-purple-800 dark:bg-purple-900/50 dark:text-purple-300 px-2 py-0.5 rounded-full mt-1 inline-block">{note.emotion}</span>}
                 <audio src={note.url} controls className="mt-2" />
              </div>
              <button onClick={() => deleteVoiceNote(note.id)} className="text-gray-400 hover:text-red-500 p-2 rounded-full hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors" aria-label="Delete voice note">
                <Trash2 size={20} />
              </button>
            </Card>
        )) : (
            <p className="text-gray-500 dark:text-dark-subtext text-center">You haven't recorded any voice notes yet.</p>
        )}
      </div>
    </div>
  );
};

export default VoiceJournalPage;