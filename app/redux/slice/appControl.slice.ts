"use client";

import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface AppControlState {
  appTodoList: boolean;
}

const initialState: AppControlState = {
  appTodoList: false,
};

export const appControlSlice = createSlice({
  name: "appControl",
  initialState,
  reducers: {
    //toDolist custom
    setAppTodoList: (state, action: PayloadAction<any>) => {
      state.appTodoList = action.payload;
    },
  },
});

export const { setAppTodoList } =
  appControlSlice.actions;

export default appControlSlice.reducer;
