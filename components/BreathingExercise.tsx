import React, { useState, useEffect } from 'react';

const PHASES = {
  inhale: { text: 'Breathe In', duration: 4000, scale: 'scale-150', transition: '4000ms' },
  hold: { text: 'Hold', duration: 4000, scale: 'scale-150', transition: '500ms' },
  exhale: { text: 'Breathe Out', duration: 6000, scale: 'scale-100', transition: '6000ms' },
};

const BreathingExercise: React.FC = () => {
  const [phase, setPhase] = useState<'inhale' | 'hold' | 'exhale'>('inhale');

  useEffect(() => {
    const runCycle = () => {
      setPhase('inhale');
      const inhaleTimer = setTimeout(() => {
        setPhase('hold');
        const holdTimer = setTimeout(() => {
          setPhase('exhale');
        }, PHASES.hold.duration);
        
        return () => clearTimeout(holdTimer);
      }, PHASES.inhale.duration);

      return () => clearTimeout(inhaleTimer);
    };

    runCycle(); // Initial run
    const cycleInterval = setInterval(runCycle, PHASES.inhale.duration + PHASES.hold.duration + PHASES.exhale.duration);

    return () => {
      clearInterval(cycleInterval);
    };
  }, []);

  const currentPhaseConfig = PHASES[phase];

  return (
    <div className="flex flex-col items-center justify-center p-4 text-center h-48">
      <div
        className={`w-32 h-32 rounded-full bg-primary/30 dark:bg-primary/50 flex items-center justify-center transform transition-transform ease-in-out ${currentPhaseConfig.scale}`}
        style={{ transitionDuration: currentPhaseConfig.transition }}
      >
        <p className="text-xl font-semibold text-charcoal-grey dark:text-dark-text z-10">
          {currentPhaseConfig.text}
        </p>
      </div>
    </div>
  );
};

export default BreathingExercise;