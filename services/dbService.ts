
import { User, Roadmap, Streak } from '../types';

/**
 * PRODUCTION NOTE:
 * In a real Next.js project, this would interface with Firebase Firestore.
 * For this environment, we use localStorage to ensure "User session persistence".
 */

const STORAGE_KEYS = {
  USER: 'dayjiro_user',
  ROADMAP: 'dayjiro_roadmap',
  STREAK: 'dayjiro_streak',
};

export const dbService = {
  saveUser: (user: User) => {
    localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
  },
  getUser: (): User | null => {
    const data = localStorage.getItem(STORAGE_KEYS.USER);
    return data ? JSON.parse(data) : null;
  },
  clearAuth: () => {
    localStorage.removeItem(STORAGE_KEYS.USER);
    localStorage.removeItem(STORAGE_KEYS.ROADMAP);
    localStorage.removeItem(STORAGE_KEYS.STREAK);
  },
  saveRoadmap: (roadmap: Roadmap) => {
    localStorage.setItem(STORAGE_KEYS.ROADMAP, JSON.stringify(roadmap));
  },
  getRoadmap: (): Roadmap | null => {
    const data = localStorage.getItem(STORAGE_KEYS.ROADMAP);
    return data ? JSON.parse(data) : null;
  },
  saveStreak: (streak: Streak) => {
    localStorage.setItem(STORAGE_KEYS.STREAK, JSON.stringify(streak));
  },
  getStreak: (): Streak => {
    const data = localStorage.getItem(STORAGE_KEYS.STREAK);
    return data ? JSON.parse(data) : { currentCount: 0, bestCount: 0, lastCompletedDate: null };
  },
};
