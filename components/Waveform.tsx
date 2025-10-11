
import React, { useEffect, useState } from 'react';

interface WaveformProps {
  isRecording: boolean;
}

const Waveform: React.FC<WaveformProps> = ({ isRecording }) => {
  const [barHeights, setBarHeights] = useState<number[]>(Array(30).fill(5));

  useEffect(() => {
    let interval: number;
    if (isRecording) {
      interval = window.setInterval(() => {
        setBarHeights(Array(30).fill(0).map(() => Math.floor(Math.random() * 50) + 5));
      }, 100);
    } else {
      setBarHeights(Array(30).fill(5));
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [isRecording]);

  return (
    <div className="flex items-center justify-center space-x-1 h-20">
      {barHeights.map((height, index) => (
        <div
          key={index}
          className="w-1.5 bg-gradient-to-b from-primary to-accent rounded-full transition-all duration-100"
          style={{ height: `${height}px` }}
        />
      ))}
    </div>
  );
};

export default Waveform;
