import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface TaskState {
  tasks: any[];
}

interface Task {
  //all any
}

const initialState: TaskState = {
  tasks: [],
};

export const taskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {
    addTask: (state, action: PayloadAction<Task>) => {
      state.tasks.push(action.payload);
    },
    removeTask: (state, action: PayloadAction<number>) => {
      state.tasks.splice(action.payload, 1);
    },
    setTasks: (state, action: PayloadAction<any>) => {
      state.tasks = action.payload;
    },
  },
});

export const { addTask, removeTask, setTasks } = taskSlice.actions;

export default taskSlice.reducer;
