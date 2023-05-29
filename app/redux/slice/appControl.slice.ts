"use client";

import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface AppControlState {
  appTodoList: {
    isShow: boolean;
    position: {
      x: number;
      y: number;
    };
    index: number;
  };
  appNote: {
    isShow: boolean;
    position: {
      x: number;
      y: number;
    };
    index: number;
  };
}

const initialState: AppControlState = {
  appTodoList: {
    isShow: false,
    position: {
      x: 0,
      y: 0,
    },
    index: 20,
  },
  appNote: {
    isShow: false,
    position: {
      x: 0,
      y: 0,
    },
    index: 20,
  },
};

export const appControlSlice = createSlice({
  name: "appControl",
  initialState,
  reducers: {
    //toDolist custom
    setAppTodoList: (state, action: PayloadAction<any>) => {
      state.appTodoList.isShow = action.payload;
    },
    setAppNote: (state, action: PayloadAction<any>) => {
      state.appNote.isShow = action.payload;
    },
    setPosition: (state:any, action: PayloadAction<any>) => {

      state[action.payload.app].position = action.payload.position;
      console.log(action.payload)
      //update index more than every app
      //array to list
      let appList = Object.values(state);
      //sort by index
      // appList.sort((a, b) => {
      //   return a.index - b.index;
      // });
      console.log(appList);
    },
  },
});

export const { setAppTodoList, setAppNote,setPosition } = appControlSlice.actions;

export default appControlSlice.reducer;
