
import React, { useState, useEffect, useCallback } from 'react';
import { User, Roadmap, Streak, RoadmapDay } from './types';
import { dbService } from './services/dbService';
import { generateRoadmap } from './services/geminiService';
import { STYLES, Icons, COLORS } from './constants';
import { signInOrCreate, signOut as authSignOut, onAuthChange, sendSignInLink, isSignInLink, completeSignInFromLink } from './services/authService';

// --- Views ---
import LandingView from './views/LandingView';
import LoginView from './views/LoginView';
import OnboardingView from './views/OnboardingView';
import DashboardView from './views/DashboardView';
import RoadmapView from './views/RoadmapView';

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [roadmap, setRoadmap] = useState<Roadmap | null>(null);
  const [streak, setStreak] = useState<Streak>({ currentCount: 0, bestCount: 0, lastCompletedDate: null });
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState<'landing' | 'login' | 'onboarding' | 'dashboard' | 'roadmap'>('landing');

  // Initialization
  useEffect(() => {
    const savedUser = dbService.getUser();
    const savedRoadmap = dbService.getRoadmap();
    const savedStreak = dbService.getStreak();

    if (savedUser) {
      setUser(savedUser);
      if (savedRoadmap) {
        setRoadmap(savedRoadmap);
        setStreak(savedStreak);
        setView('dashboard');
      } else if (!savedUser.onboardingComplete) {
        setView('onboarding');
      } else {
        setView('onboarding'); // Fallback to setup
      }
    }

    // Listen for Firebase auth changes and sync local user state
    const unsub = onAuthChange((fbUser) => {
      if (fbUser) {
        const local = dbService.getUser();
        if (local && local.uid === fbUser.uid) {
          setUser(local);
          const savedRoadmap2 = dbService.getRoadmap();
          const savedStreak2 = dbService.getStreak();
          if (savedRoadmap2) setRoadmap(savedRoadmap2);
          if (savedStreak2) setStreak(savedStreak2);
          setView(local.onboardingComplete ? 'dashboard' : 'onboarding');
        }
      } else {
        // firebase signed out
      }
    });

    // If the app was opened via an email sign-in link, complete sign-in
    (async () => {
      try {
        if (isSignInLink(window.location.href)) {
          setLoading(true);
          const fbUser = await completeSignInFromLink(window.location.href);
          const existingLocal = dbService.getUser();
          let newUser: User;
          if (existingLocal && existingLocal.uid === fbUser.uid) {
            newUser = existingLocal;
          } else {
            newUser = { uid: fbUser.uid, email: fbUser.email || '', onboardingComplete: false };
            dbService.saveUser(newUser);
          }
          setUser(newUser);
          setView(newUser.onboardingComplete ? 'dashboard' : 'onboarding');
        }
      } catch (err) {
        console.error('Email link sign-in error', err);
      } finally {
        setLoading(false);
      }
    })();

    setLoading(false);
    return () => unsub();
  }, []);

  const handleStartCTA = async (email: string) => {
    if (!email) {
      alert('Please enter your email to get started');
      return;
    }
    try {
      setLoading(true);
      await sendSignInLink(email);
      alert('Sign-in link sent. Check your email to continue.');
    } catch (err) {
      console.error('sendSignInLink error', err);
      const msg = err instanceof Error ? err.message : String(err);
      alert(`Error sending sign-in link: ${msg}`);
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async (email: string, password: string, apiKey: string) => {
    try {
      setLoading(true);
      const fbUser = await signInOrCreate(email, password);
      const newUser: User = {
        uid: fbUser.uid,
        email: fbUser.email || email,
        apiKey,
        onboardingComplete: false
      };
      dbService.saveUser(newUser);
      setUser(newUser);
      setView('onboarding');
    } catch (err) {
      alert('Auth error.');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    authSignOut().catch(() => {});
    dbService.clearAuth();
    setUser(null);
    setRoadmap(null);
    setStreak({ currentCount: 0, bestCount: 0, lastCompletedDate: null });
    setView('landing');
  };

  const handleCompleteOnboarding = async (skill: string, duration: number, role: string, apiKey?: string) => {
    if (!user) return;
    if (apiKey) {
      user.apiKey = apiKey;
    }
    if (!user.apiKey) {
      alert('A Gemini API key is required to generate a roadmap.');
      return;
    }
    
    setLoading(true);
    try {
      const days = await generateRoadmap(user.apiKey, skill, duration, role);
      const newRoadmap: Roadmap = {
        id: Math.random().toString(36).substr(2, 9),
        userId: user.uid,
        skill,
        targetRole: role,
        duration,
        days,
        createdAt: new Date().toISOString(),
        currentDay: 1
      };
      
      const updatedUser = { ...user, skill, duration, targetRole: role, onboardingComplete: true };
      dbService.saveUser(updatedUser);
      dbService.saveRoadmap(newRoadmap);
      setUser(updatedUser);
      setRoadmap(newRoadmap);
      setView('dashboard');
    } catch (error) {
      alert("Error generating roadmap. Please check your API key.");
    } finally {
      setLoading(false);
    }
  };

  const updateRoadmap = (updated: Roadmap) => {
    setRoadmap(updated);
    dbService.saveRoadmap(updated);
    
    // Streak Logic check
    const today = new Date().toISOString().split('T')[0];
    const currentDayData = updated.days.find(d => d.day === updated.currentDay);
    
    if (currentDayData && currentDayData.tasks.every(t => t.completed)) {
      if (streak.lastCompletedDate !== today) {
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        const yesterdayStr = yesterday.toISOString().split('T')[0];
        
        let newCount = 1;
        if (streak.lastCompletedDate === yesterdayStr) {
          newCount = streak.currentCount + 1;
        }

        const newStreak = {
          currentCount: newCount,
          bestCount: Math.max(newCount, streak.bestCount),
          lastCompletedDate: today
        };
        setStreak(newStreak);
        dbService.saveStreak(newStreak);
      }
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-[#FDFDF5]">
        <div className="animate-bounce mb-4 text-black">
          <Icons.Streak />
        </div>
        <p className="font-black uppercase tracking-tighter text-2xl">Building your path</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl w-full mx-auto min-h-screen border-x-[3px] border-black bg-[#FDFDF5] px-4">
      <header className="sticky top-0 z-50 bg-[#FDFDF5] border-b-[3px] border-black px-6 py-4 flex justify-between items-center">
        <h1 
          className="font-black text-2xl tracking-tighter cursor-pointer"
          onClick={() => setView(user ? 'dashboard' : 'landing')}
        >
          DAYJIRO
        </h1>
        {user && (
          <button onClick={handleLogout} className="text-xs font-bold underline uppercase">Logout</button>
        )}
      </header>

      <main className="p-6">
        {view === 'landing' && <LandingView onStart={handleStartCTA} />}
        {view === 'login' && <LoginView onLogin={handleLogin} />}
        {view === 'onboarding' && <OnboardingView onComplete={handleCompleteOnboarding} />}
        {view === 'dashboard' && roadmap && (
          <DashboardView 
            roadmap={roadmap} 
            streak={streak} 
            onTaskToggle={(taskId) => {
              const updatedDays = roadmap.days.map(d => {
                if (d.day === roadmap.currentDay) {
                  return {
                    ...d,
                    tasks: d.tasks.map(t => t.id === taskId ? { ...t, completed: !t.completed } : t)
                  };
                }
                return d;
              });
              updateRoadmap({ ...roadmap, days: updatedDays });
            }}
            onViewFullRoadmap={() => setView('roadmap')}
          />
        )}
        {view === 'roadmap' && roadmap && (
          <RoadmapView 
            roadmap={roadmap} 
            onBack={() => setView('dashboard')}
            onDaySelect={(day) => updateRoadmap({ ...roadmap, currentDay: day })}
          />
        )}
      </main>
    </div>
  );
};

export default App;
