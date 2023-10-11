import { configureStore } from '@reduxjs/toolkit';
import tasksReducer from './reducerMain';

const store = configureStore({
  reducer: {
    tasks: tasksReducer,
  },
});

export default store;

