import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

export interface Label {
  id: string;
  name: string;
  color: string;
}

interface LabelsState {
  labels: Label[];
}

const initialState: LabelsState = {
  labels: [],
};

const labelSlice = createSlice({
  name: 'labels',
  initialState,
  reducers: {
    addLabel: (
      state,
      action: PayloadAction<{ name: string; color: string }>,
    ) => {
      const newLabel: Label = {
        id: Date.now().toString(),
        name: action.payload.name,
        color: action.payload.color,
      };
      state.labels.push(newLabel);
    },
    updateLabel: (
      state,
      action: PayloadAction<{ id: string; name: string; color: string }>,
    ) => {
      const label = state.labels.find(l => l.id === action.payload.id);
      if (label) {
        label.name = action.payload.name;
        label.color = action.payload.color;
      }
    },
    deleteLabel: (state, action: PayloadAction<string>) => {
      state.labels = state.labels.filter(label => label.id !== action.payload);
    },
  },
});

export const { addLabel, updateLabel, deleteLabel } = labelSlice.actions;

export const selectLabels = (state: RootState) => state.labels.labels;

export default labelSlice.reducer;
