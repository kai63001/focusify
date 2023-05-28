"use client";

import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface AppControlState {
  appTodoList: boolean;
  appNote: boolean;
}

const initialState: AppControlState = {
  appTodoList: false,
  appNote: false,
};

export const appControlSlice = createSlice({
  name: "appControl",
  initialState,
  reducers: {
    //toDolist custom
    setAppTodoList: (state, action: PayloadAction<any>) => {
      state.appTodoList = action.payload;
    },
    setAppNote: (state, action: PayloadAction<any>) => {
      state.appNote = action.payload;
    },
  },
});

export const { setAppTodoList, setAppNote } = appControlSlice.actions;

export default appControlSlice.reducer;
