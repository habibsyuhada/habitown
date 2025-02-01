import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { DailyTask } from '../../types/dailyTask';
import { RootState } from '../store';

interface DailyTasksState {
  tasks: DailyTask[];
}

const initialState: DailyTasksState = {
  tasks: [],
};

const dailyTasksSlice = createSlice({
  name: 'dailyTasks',
  initialState,
  reducers: {
    addDailyTask: (
      state,
      action: PayloadAction<{ title: string; difficulty: DailyTask['difficulty'] }>,
    ) => {
      const newTask: DailyTask = {
        id: Date.now().toString(),
        title: action.payload.title,
        difficulty: action.payload.difficulty,
        completed: false,
        streak: 0,
        createdAt: new Date().toISOString(),
      };
      state.tasks.push(newTask);
    },
    updateDailyTask: (
      state,
      action: PayloadAction<{ id: string; title: string; difficulty: DailyTask['difficulty'] }>,
    ) => {
      const task = state.tasks.find(t => t.id === action.payload.id);
      if (task) {
        task.title = action.payload.title;
        task.difficulty = action.payload.difficulty;
      }
    },
    toggleDailyTask: (state, action: PayloadAction<string>) => {
      const task = state.tasks.find(t => t.id === action.payload);
      if (task) {
        task.completed = !task.completed;
        if (task.completed) {
          task.streak += 1;
        }
      }
    },
    deleteDailyTask: (state, action: PayloadAction<string>) => {
      state.tasks = state.tasks.filter(task => task.id !== action.payload);
    },
  },
});

export const { addDailyTask, updateDailyTask, toggleDailyTask, deleteDailyTask } = dailyTasksSlice.actions;

// Selectors
export const selectDailyTasks = (state: RootState) => state.dailyTasks.tasks;
export const selectDailyTaskById = (state: RootState, taskId: string) =>
  state.dailyTasks.tasks.find(task => task.id === taskId);

export default dailyTasksSlice.reducer;
