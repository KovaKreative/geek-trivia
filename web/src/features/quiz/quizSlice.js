import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  categories: {},
  currentRound: 0,
  questions: [],
  buttonData: {}
};

export const quizSlice = createSlice({
  name: 'quiz',
  initialState: { ...initialState },
  reducers: {
    setCategories: (state, action) => {
      state.categories = action.payload;
    },
    chooseCategory: (state, action) => {
      state.categories[action.payload.id].selected = action.payload.selected;
    },
    setQuiz: (state, action) => {
      state.questions = action.payload.map(q => { return { ...q, result: null }; });
    },
    setButtons: (state, action) => {
      state.buttonData = { ...action.payload };
    },
    selectAnswer: (state, action) => {
      for (const id in state.buttonData) {
        if (state.buttonData[id].id === action.payload) {
          state.questions[state.currentRound].result = state.buttonData[id].text;
          state.buttonData[id].state = "chosen";
          continue;
        }
        state.buttonData[id].state = "active";
      }
    },
    nextQuestion: (state) => {
      state.currentRound++;
    },
    resetQuiz: (state) => {
      state = { ...initialState };
    }
  }
});

export const { setCategories, chooseCategory, setQuiz, setButtons, selectAnswer, nextQuestion, resetQuiz } = quizSlice.actions;
export default quizSlice.reducer;