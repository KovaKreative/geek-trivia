import { configureStore } from '@reduxjs/toolkit';

import viewReducer from '../features/views/viewSlice';
import quizReducer from '../features/quiz/quizSlice';

export default configureStore({
  reducer: {
    view: viewReducer,
    quiz: quizReducer
  }
});