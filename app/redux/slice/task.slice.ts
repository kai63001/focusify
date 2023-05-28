import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface TaskState {
  tasks: any[];
  selectedTask: any;
  selectedTaskData: any;
  checkedId: any[];
  showOnTask: {
    showTodoList: boolean;
    showDoneList: boolean;
  };
  openDropdown: boolean;
}

interface Task {
  //all any
}

const initialState: TaskState = {
  tasks: [],
  selectedTask: "",
  selectedTaskData: {},
  checkedId: [],
  showOnTask: {
    showTodoList: true,
    showDoneList: false,
  },
  openDropdown: false,
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
    removeTaskById: (state, action: PayloadAction<number>) => {
      state.tasks = state.tasks.filter((task) => task.$id !== action.payload);
    },
    setTasks: (state, action: PayloadAction<any>) => {
      state.tasks = action.payload;
    },
    selectTaskList: (state, action: PayloadAction<any>) => {
      state.selectedTask = action.payload;
    },
    setSelectedTaskData: (state, action: PayloadAction<any>) => {
      state.selectedTaskData = action.payload;
    },
    setCheckedId: (state, action: PayloadAction<any>) => {
      state.checkedId.push(action.payload);
    },
    removeCheckedId: (state, action: PayloadAction<any>) => {
      //remove checked id from array by finding index
      const index = state.checkedId.indexOf(action.payload);
      if (index > -1) {
        state.checkedId.splice(index, 1);
      }
    },
    setShowTodoList: (state, action: PayloadAction<any>) => {
      state.showOnTask.showTodoList = action.payload;
    },
    setShowDoneList: (state, action: PayloadAction<any>) => {
      state.showOnTask.showDoneList = action.payload;
    },
    setOpenDropdown: (state, action: PayloadAction<any>) => {
      state.openDropdown = action.payload;
    },
  },
});

export const {
  addTask,
  removeTask,
  setTasks,
  selectTaskList,
  setSelectedTaskData,
  setCheckedId,
  removeCheckedId,
  removeTaskById,
  setShowTodoList,
  setShowDoneList,
  setOpenDropdown,
} = taskSlice.actions;

export default taskSlice.reducer;
