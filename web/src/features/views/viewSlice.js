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
    goTo: (state, action) => {
      state.page = p.hasOwnProperty(action.payload) ? p[action.payload] : p.NOTFOUND;
    }
  }
});

export const { goHome, goTo } = viewSlice.actions;
export default viewSlice.reducer;