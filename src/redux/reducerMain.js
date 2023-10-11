import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  tasks: [],
};

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addTask: (state, action) => {
      state.tasks.push(action.payload);
    },
    removeTask: (state, action) => {
      state.tasks = state.tasks.filter(task => task.id !== action.payload);
    },

    editTask: (state, action) => {
      const updatedTask = action.payload;
      const existingTask = state.tasks.find(task => task.id === updatedTask.id);

      if (existingTask) {
        state.tasks = state.tasks.filter(task => task.id !== updatedTask.id);
        state.tasks.push(updatedTask);
      }
    },

    completeTask: (state, action) => {
        const taskId = action.payload;
        const taskToUpdate = state.tasks.find(task => task.id === taskId);
  
        if (taskToUpdate) {
          taskToUpdate.completed = !taskToUpdate.completed;
        }
      },
  },
});


// Экспорт action creators
export const { addTask, removeTask, editTask, completeTask } = tasksSlice.actions;

// Экспорт редюсера
export default tasksSlice.reducer;
