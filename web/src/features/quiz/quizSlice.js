import { createSlice } from '@reduxjs/toolkit';

export const viewSlice = createSlice({
  name: 'view',
  initialState: {
    category: null,
    currentRound: 0,
    questions: []
  },
  reducers: {
    setCategory: (state, action) => {
      state.category = action.payload;
    },
    nextRound: (state) => {
      state.currentRound++;
    }
  }
});

export const { setCategory, nextRound } = viewSlice.actions;
export default viewSlice.reducer;