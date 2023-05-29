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
    setPosition: (state: any, action: PayloadAction<any>) => {
      state[action.payload.app].position = action.payload.position;
    },
    setIndex: (state: any, action: PayloadAction<any>) => {
      // state[action.payload.app].index = action.payload.index;
      //caculate z-index
      const maxZIndex = Math.max(
        ...Object.values(state).map((app: any) => app.index)
      );
      if (maxZIndex === -Infinity) {
        state[action.payload.app].index = 20;
        return;
      }
      state[action.payload.app].index = maxZIndex + 1;
    },
  },
});

export const { setAppTodoList, setAppNote, setPosition, setIndex } =
  appControlSlice.actions;

export default appControlSlice.reducer;
