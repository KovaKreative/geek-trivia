import { createSlice } from '@reduxjs/toolkit';

export const quizSlice = createSlice({
  name: 'quiz',
  initialState: {
    categories: {},
    currentRound: 0,
    questions: [],
    buttonData: {}
  },
  reducers: {
    setCategories: (state, action) => {
      state.categories = action.payload;
    },
    chooseCategory: (state, action) => {
      state.categories[action.payload.id].selected = action.payload.selected;
    },
    setQuiz: (state, action) => {
      state.questions = action.payload.map(q => { return{...q, result: null} });
    },
    setButtons: (state, action) => {
      state.buttonData = {...action.payload};
    },
    selectAnswer: (state, action) => {
      for(const id in state.buttonData) {
        if(state.buttonData[id].id === action.payload) {
          state.questions[state.currentRound].result = state.buttonData[id].text;
          state.buttonData[id].state = "chosen";
          continue;
        }
        state.buttonData[id].state = "active";
      }
    },
    nextQuestion: (state) => {
      state.currentRound++;
    }
  }
});

export const { setCategories, chooseCategory, setQuiz, setButtons, selectAnswer, nextQuestion } = quizSlice.actions;
export default quizSlice.reducer;