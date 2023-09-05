import { createSlice } from '@reduxjs/toolkit';

export const quizSlice = createSlice({
  name: 'quiz',
  initialState: {
    categories: {},
    currentRound: 0,
    questions: []
  },
  reducers: {
    setCategories: (state, action) => {
      state.categories = action.payload;
    },
    chooseCategory: (state, action) => {
      state.categories[action.payload.id].selected = action.payload.selected;
    },
    setQuiz: (state, action) => {
      state.questions = [...action.payload];
    },
    nextQuestion: (state) => {
      state.currentRound++;
    }
  }
});

export const { setCategories, chooseCategory, setQuiz, nextQuestion } = quizSlice.actions;
export default quizSlice.reducer;