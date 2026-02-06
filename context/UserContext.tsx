import React, { createContext, useContext, useState, useEffect } from 'react';

// Types
export interface Task {
  id: string;
  title: string;
  points: number;
  category: 'Recycling' | 'Water' | 'Energy' | 'Transport' | 'Nature' | 'Food';
  completed: boolean;
  image?: string; // For potential photo evidence
}

export interface Badge {
  id: string;
  name: string;
  icon: string;
  description: string;
  unlocked: boolean;
}

export interface User {
  name: string;
  grade: string;
  group: string; // Community/School
  interests: string[];
  points: number;
  streak: number;
  badges: Badge[];
  level: 'Seed 🌱' | 'Sapling 🌿' | 'Tree 🌳' | 'Forest 🌲';
}

interface UserContextType {
  user: User;
  tasks: Task[];
  updateUser: (updates: Partial<User>) => void;
  completeTask: (taskId: string) => void;
  resetTasks: () => void;
  unlockBadge: (badgeId: string) => void;
}

// Initial Data
const INITIAL_TASKS: Task[] = [
  { id: '1', title: 'Recycle 3+ items', points: 10, category: 'Recycling', completed: false },
  { id: '2', title: 'Use a reusable bottle/cup', points: 5, category: 'Nature', completed: false },
  { id: '3', title: 'Turn off lights when leaving', points: 5, category: 'Energy', completed: false },
  { id: '4', title: 'Take a 5-minute shorter shower', points: 15, category: 'Water', completed: false },
  { id: '5', title: 'Walk/bike instead of car', points: 20, category: 'Transport', completed: false },
  { id: '6', title: 'Pick up 5 pieces of litter', points: 25, category: 'Nature', completed: false },
  { id: '7', title: 'Eat one plant-based meal', points: 15, category: 'Food', completed: false },
  { id: '8', title: 'Bring reusable bag shopping', points: 10, category: 'Nature', completed: false },
];

const INITIAL_BADGES: Badge[] = [
  { id: 'water-saver', name: 'Water Saver', icon: '💧', description: 'Save 100 gallons of water', unlocked: false },
  { id: 'zero-waste', name: 'Zero-Waste Hero', icon: '♻️', description: 'Complete 10 recycling tasks', unlocked: false },
  { id: 'energy-star', name: 'Energy Star', icon: '⚡', description: 'Save energy for 7 days straight', unlocked: false },
];

const INITIAL_USER: User = {
  name: 'Eco Warrior',
  grade: '10th',
  group: 'Green High School',
  interests: [],
  points: 0,
  streak: 0,
  badges: INITIAL_BADGES,
  level: 'Seed 🌱',
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User>(INITIAL_USER);
  const [tasks, setTasks] = useState<Task[]>(INITIAL_TASKS);

  const updateUser = (updates: Partial<User>) => {
    setUser((prev) => ({ ...prev, ...updates }));
  };

  const completeTask = (taskId: string) => {
    setTasks((prev) =>
      prev.map((t) => {
        if (t.id === taskId && !t.completed) {
          // Add points
          const newPoints = user.points + t.points;
          updateLevel(newPoints);
          return { ...t, completed: true };
        }
        return t;
      })
    );
  };

  const updateLevel = (points: number) => {
    let newLevel: User['level'] = user.level;
    if (points >= 500) newLevel = 'Forest 🌲';
    else if (points >= 200) newLevel = 'Tree 🌳';
    else if (points >= 50) newLevel = 'Sapling 🌿';
    
    setUser((prev) => ({ ...prev, points, level: newLevel }));
  };

  const resetTasks = () => {
    setTasks(INITIAL_TASKS);
  };

  const unlockBadge = (badgeId: string) => {
    setUser((prev) => ({
      ...prev,
      badges: prev.badges.map((b) => (b.id === badgeId ? { ...b, unlocked: true } : b)),
    }));
  };

  return (
    <UserContext.Provider value={{ user, tasks, updateUser, completeTask, resetTasks, unlockBadge }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
}
