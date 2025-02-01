import { create } from 'zustand';
import { Habit, HabitStats } from '../types/habit';

interface HabitStore {
  habits: Habit[];
  stats: HabitStats;
  addHabit: (habit: Omit<Habit, 'id' | 'createdAt' | 'streak' | 'completed'>) => void;
  toggleHabit: (id: string) => void;
  deleteHabit: (id: string) => void;
}

const initialStats: HabitStats = {
  level: 1,
  experience: 0,
  health: 50,
  gold: 0,
};

export const useHabitStore = create<HabitStore>((set) => ({
  habits: [],
  stats: initialStats,
  addHabit: (habit) =>
    set((state) => ({
      habits: [
        ...state.habits,
        {
          ...habit,
          id: Math.random().toString(36).substring(7),
          createdAt: new Date().toISOString(),
          streak: 0,
          completed: false,
        },
      ],
    })),
  toggleHabit: (id) =>
    set((state) => {
      const habitIndex = state.habits.findIndex((h) => h.id === id);
      if (habitIndex === -1) return state;

      const habit = state.habits[habitIndex];
      const completed = !habit.completed;
      const now = new Date().toISOString();

      // Calculate rewards based on difficulty
      const rewards = {
        trivial: { exp: 5, gold: 1 },
        easy: { exp: 10, gold: 2 },
        medium: { exp: 15, gold: 3 },
        hard: { exp: 20, gold: 4 },
      };

      const { exp, gold } = rewards[habit.difficulty];

      // Update stats if completing the habit
      const stats = completed
        ? {
            ...state.stats,
            experience: state.stats.experience + exp,
            gold: state.stats.gold + gold,
          }
        : state.stats;

      // Level up if experience reaches 100
      if (stats.experience >= 100) {
        stats.level += 1;
        stats.experience -= 100;
      }

      return {
        habits: [
          ...state.habits.slice(0, habitIndex),
          {
            ...habit,
            completed,
            completedAt: completed ? now : undefined,
            streak: completed ? habit.streak + 1 : habit.streak,
          },
          ...state.habits.slice(habitIndex + 1),
        ],
        stats,
      };
    }),
  deleteHabit: (id) =>
    set((state) => ({
      habits: state.habits.filter((h) => h.id !== id),
    })),
}));
