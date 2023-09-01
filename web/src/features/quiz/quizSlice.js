import { createSlice } from '@reduxjs/toolkit';

export const quizSlice = createSlice({
  name: 'quiz',
  initialState: {
    categories: [],
    category: null,
    currentRound: 0,
    questions: []
  },
  reducers: {
    setCategories: (state, action) => {
      state.categories = action.payload;
    },
    setCategory: (state, action) => {
      state.category = action.payload;
    },
    nextRound: (state) => {
      state.currentRound++;
    }
  }
});

export const { setCategories, setCategory, nextRound } = quizSlice.actions;
export default quizSlice.reducer;