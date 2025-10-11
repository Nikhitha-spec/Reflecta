import React, { useState, useEffect } from 'react';
import Card from '../components/Card';
import BreathingExercise from '../components/BreathingExercise';
import { BrainCircuit, RefreshCw, Loader2 } from 'lucide-react';
import { WELLNESS_AFFIRMATIONS, MENTAL_HEALTH_CAMPAIGNS } from '../constants';
import Button from '../components/Button';
import { GoogleGenAI } from '@google/genai';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });

const WellnessHubPage: React.FC = () => {
  const [affirmation, setAffirmation] = useState('');
  const [stressInput, setStressInput] = useState('');
  const [stressSuggestions, setStressSuggestions] = useState<string[]>([]);
  const [isLoadingSuggestions, setIsLoadingSuggestions] = useState(false);
  const [suggestionError, setSuggestionError] = useState('');

  const getNewAffirmation = () => {
    let newAffirmation = affirmation;
    while (newAffirmation === affirmation) {
        newAffirmation = WELLNESS_AFFIRMATIONS[Math.floor(Math.random() * WELLNESS_AFFIRMATIONS.length)];
    }
    setAffirmation(newAffirmation);
  };

  useEffect(() => {
    getNewAffirmation();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleGetSuggestions = async () => {
    if (!stressInput.trim()) {
        setSuggestionError("Please describe what's causing your stress.");
        return;
    }
    setIsLoadingSuggestions(true);
    setSuggestionError('');
    setStressSuggestions([]);

    try {
        const prompt = `I am feeling stressed because of the following situation: "${stressInput}". Please provide 3 short, practical, and actionable suggestions to help me manage this specific stress. Format the response as a numbered list.`;
        
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
        });

        const text = response.text;
        const suggestions = text.split('\n').filter(line => line.match(/^\d+\./)).map(line => line.replace(/^\d+\.\s*/, ''));
        
        if (suggestions.length === 0 && text) {
           setStressSuggestions([text]); // Fallback if parsing fails but we have text
        } else {
           setStressSuggestions(suggestions);
        }

    } catch (e) {
        console.error(e);
        setSuggestionError("Sorry, we couldn't get suggestions right now. Please try again later.");
    } finally {
        setIsLoadingSuggestions(false);
    }
  };


  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-charcoal-grey dark:text-dark-text text-center mb-2">Wellness Hub</h1>
      <p className="text-lg text-gray-600 dark:text-dark-subtext text-center mb-12">Tools and resources to support your mental well-being.</p>

      <div className="space-y-16">
        <div className="grid md:grid-cols-2 gap-8">
            <section>
                <h2 className="text-2xl font-bold text-charcoal-grey dark:text-dark-text mb-6">Guided Breathing</h2>
                <Card className="flex flex-col items-center justify-center p-8 h-full">
                    <p className="text-center text-gray-600 dark:text-dark-subtext mb-6">
                        Center yourself. Follow the guide to regulate your breathing and find a moment of peace.
                    </p>
                    <BreathingExercise />
                </Card>
            </section>

             <section>
                <h2 className="text-2xl font-bold text-charcoal-grey dark:text-dark-text mb-6">Positive Affirmation</h2>
                <Card className="flex flex-col items-center justify-between p-8 h-full">
                    <div className="flex-grow flex items-center">
                        <p className="text-center text-xl font-semibold text-gray-700 dark:text-dark-subtext italic">
                            "{affirmation}"
                        </p>
                    </div>
                    <Button onClick={getNewAffirmation} icon={<RefreshCw size={18}/>} variant="secondary" className="mt-6">
                        New Affirmation
                    </Button>
                </Card>
            </section>
        </div>

        <section>
            <h2 className="text-2xl font-bold text-charcoal-grey dark:text-dark-text mb-6">Personalized Stress Relief</h2>
            <Card className="p-8">
                <div className="flex items-start space-x-6">
                     <div className="flex-shrink-0 bg-primary/10 p-4 rounded-lg">
                        <BrainCircuit size={32} className="text-primary" />
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold dark:text-dark-text">Feeling Stressed?</h3>
                        <p className="mt-1 text-sm text-gray-600 dark:text-dark-subtext">Describe what's on your mind, and our AI assistant will provide some tailored suggestions to help you cope.</p>
                    </div>
                </div>
                <div className="mt-6">
                     <textarea
                        value={stressInput}
                        onChange={(e) => setStressInput(e.target.value)}
                        placeholder="e.g., I have a big presentation at work tomorrow and I'm nervous..."
                        className="w-full h-24 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-transparent dark:border-slate-600 dark:placeholder-gray-400"
                        disabled={isLoadingSuggestions}
                    />
                    <div className="mt-4 flex justify-end">
                        <Button onClick={handleGetSuggestions} disabled={isLoadingSuggestions}>
                            {isLoadingSuggestions ? (
                                <>
                                    <Loader2 className="animate-spin mr-2" size={20} />
                                    Getting Suggestions...
                                </>
                            ) : (
                                "Get Suggestions"
                            )}
                        </Button>
                    </div>
                </div>

                {suggestionError && <p className="mt-4 text-center text-red-500">{suggestionError}</p>}
                
                {stressSuggestions.length > 0 && (
                    <div className="mt-6 border-t dark:border-slate-700 pt-6">
                        <h4 className="font-semibold text-md dark:text-dark-text mb-3">Here are a few ideas:</h4>
                        <ul className="list-disc list-inside space-y-2 text-sm text-gray-700 dark:text-dark-subtext">
                            {stressSuggestions.map((suggestion, index) => (
                                <li key={index}>{suggestion}</li>
                            ))}
                        </ul>
                    </div>
                )}
            </Card>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-charcoal-grey dark:text-dark-text mb-6">Global Mental Health Campaigns</h2>
          <div className="grid md:grid-cols-1 gap-6">
            {MENTAL_HEALTH_CAMPAIGNS.map((campaign, index) => (
              <a href={campaign.link} key={index} target="_blank" rel="noopener noreferrer" className="block hover:scale-[1.02] transition-transform duration-200">
                <Card className="flex items-start space-x-6 h-full p-6">
                  <div className="flex-shrink-0 bg-primary/10 p-4 rounded-lg">
                    {campaign.icon}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold dark:text-dark-text">{campaign.name}</h3>
                    <p className="mt-1 text-sm text-gray-600 dark:text-dark-subtext">{campaign.description}</p>
                  </div>
                </Card>
              </a>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default WellnessHubPage;