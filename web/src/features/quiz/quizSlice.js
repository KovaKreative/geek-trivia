import { createSlice } from '@reduxjs/toolkit';

export const quizSlice = createSlice({
  name: 'quiz',
  initialState: {
    categories: [],
    categoriesChosen: [],
    currentRound: 0,
    questions: []
  },
  reducers: {
    setCategories: (state, action) => {
      state.categories = action.payload;
    },
    chooseCategories: (state, action) => {
      state.category = action.payload;
    },
    nextRound: (state) => {
      state.currentRound++;
    }
  }
});

export const { setCategories, chooseCategories, nextRound } = quizSlice.actions;
export default quizSlice.reducer;