
export interface User {
  uid: string;
  email: string;
  displayName?: string;
  onboardingComplete: boolean;
  targetRole?: string;
  skill?: string;
  duration?: number;
  apiKey?: string;
}

export interface Task {
  id: string;
  text: string;
  completed: boolean;
}

export interface RoadmapDay {
  day: number;
  title: string;
  tasks: Task[];
  completedAt?: string | null; // ISO string if all tasks finished
}

export interface Roadmap {
  id: string;
  userId: string;
  skill: string;
  targetRole?: string;
  duration: number;
  days: RoadmapDay[];
  createdAt: string;
  currentDay: number;
}

export interface Streak {
  currentCount: number;
  bestCount: number;
  lastCompletedDate: string | null;
}

export interface AuthState {
  user: User | null;
  loading: boolean;
}
