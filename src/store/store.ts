import { configureStore } from '@reduxjs/toolkit';
import dailyTasksReducer from './slices/dailyTasksSlice';
import labelReducer from './slices/labelSlice';

export const store = configureStore({
  reducer: {
    dailyTasks: dailyTasksReducer,
    labels: labelReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
