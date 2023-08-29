import { configureStore } from '@reduxjs/toolkit';

import viewReducer from '../features/views/viewSlice';

export default configureStore({
  reducer: {
    view: viewReducer
  }
});