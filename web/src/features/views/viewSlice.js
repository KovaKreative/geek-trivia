import { createSlice } from '@reduxjs/toolkit';

const p = {
  HOME: "HOME",
  QUIZ: "QUIZ",
  RESULT: "RESULT",
  NOTFOUND: "NOTFOUND"
};

Object.freeze(p);

export const viewSlice = createSlice({
  name: 'view',
  initialState: {
    page: p.HOME
  },
  reducers: {
    goHome: (state) => {
      state.page = p.HOME;
    },
    goToResults: (state, action) => {
      state.page = p.RESULT;
    },
    goTo: (state, action) => {
      state.page = p.hasOwnProperty(action.payload) ? p[action.payload] : p.NOTFOUND;
    }
  }
});

export const { goHome, goToResults, goTo } = viewSlice.actions;
export default viewSlice.reducer;