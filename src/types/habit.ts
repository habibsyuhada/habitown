export type Difficulty = 'trivial' | 'easy' | 'medium' | 'hard';

export interface Habit {
  id: string;
  title: string;
  description?: string;
  difficulty: Difficulty;
  type: 'daily' | 'todo';
  completed: boolean;
  streak: number;
  createdAt: string;
  completedAt?: string;
  tags?: string[];
}

export interface HabitStats {
  level: number;
  experience: number;
  health: number;
  gold: number;
}
