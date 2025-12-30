
import React, { useState } from 'react';
import { STYLES } from '../constants';

interface OnboardingViewProps {
  onComplete: (skill: string, duration: number, role: string) => void;
}

const OnboardingView: React.FC<OnboardingViewProps> = ({ onComplete }) => {
  const [skill, setSkill] = useState('');
  const [role, setRole] = useState('');
  const [duration, setDuration] = useState(30);

  return (
    <div className="py-8 space-y-10">
      <div className="space-y-2">
        <h2 className="text-4xl font-black tracking-tighter">MAP YOUR FUTURE.</h2>
        <p className="font-bold text-gray-600">What are we mastering today?</p>
      </div>

      <div className="space-y-6">
        <div>
          <label className={STYLES.label}>The Skill / Topic</label>
          <input 
            className={STYLES.input} 
            placeholder="e.g. React Native, Chess, Stock Trading" 
            value={skill}
            onChange={(e) => setSkill(e.target.value)}
          />
        </div>

        <div>
          <label className={STYLES.label}>Target Goal (Optional)</label>
          <input 
            className={STYLES.input} 
            placeholder="e.g. Lead Engineer, Grandmaster" 
            value={role}
            onChange={(e) => setRole(e.target.value)}
          />
        </div>

        <div>
          <label className={STYLES.label}>Duration: {duration} Days</label>
          <input 
            type="range" 
            min="7" 
            max="100" 
            step="1"
            className="w-full h-4 bg-gray-200 border-2 border-black appearance-none cursor-pointer"
            value={duration}
            onChange={(e) => setDuration(parseInt(e.target.value))}
          />
          <div className="flex justify-between font-black text-xs mt-2 uppercase">
            <span>Sprint (7d)</span>
            <span>Mastery (100d)</span>
          </div>
        </div>

        <button 
          onClick={() => skill && onComplete(skill, duration, role)}
          className={STYLES.buttonPrimary + " w-full"}
          disabled={!skill}
        >
          GENERATE MISSION
        </button>
      </div>
    </div>
  );
};

export default OnboardingView;
