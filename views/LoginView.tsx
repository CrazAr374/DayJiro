
import React, { useState } from 'react';
import { STYLES } from '../constants';

interface LoginViewProps {
  onLogin: (email: string, password: string, apiKey: string) => void;
}

const LoginView: React.FC<LoginViewProps> = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [apiKey, setApiKey] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && password && apiKey) {
      onLogin(email, password, apiKey);
    } else {
      alert("Fill all fields.");
    }
  };

  return (
    <div className="py-8 space-y-8">
      <h2 className="text-4xl font-black tracking-tighter uppercase italic">IDENTITY CHECK</h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className={STYLES.label}>Email Address</label>
          <input 
            type="email" 
            className={STYLES.input} 
            placeholder="jiro@mastery.com" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div>
          <label className={STYLES.label}>Password</label>
          <input 
            type="password" 
            className={STYLES.input} 
            placeholder="Choose a password" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div>
          <label className={STYLES.label}>Gemini API Key</label>
          <input 
            type="password" 
            className={STYLES.input} 
            placeholder="AIza..." 
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
          />
          <p className="mt-2 text-xs font-bold text-gray-500 uppercase">Your key stays local. We don't save it on servers.</p>
        </div>

        <button type="submit" className={STYLES.buttonPrimary + " w-full"}>
          ENTER DOJO
        </button>
      </form>

      <div className={`${STYLES.card} bg-[#FFD700] text-sm`}>
        <p className="font-black uppercase tracking-tight">Requirement:</p>
        <p className="font-medium mt-1">You need a free Gemini API key to generate roadmaps. Get one at <a href="https://aistudio.google.com/app/apikey" target="_blank" className="underline">Google AI Studio</a>.</p>
      </div>
    </div>
  );
};

export default LoginView;
