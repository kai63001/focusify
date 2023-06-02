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
  appPomodoro: {
    isShow: boolean;
    position: {
      x: number;
      y: number;
    };
    index: number;
  };
  appYoutube: {
    isShow: boolean;
    position: {
      x: number;
      y: number;
    };
    index: number;
  };
  appMusicInfo: {
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
  appPomodoro: {
    isShow: false,
    position: {
      x: 0,
      y: 0,
    },
    index: 20,
  },
  appYoutube: {
    isShow: false,
    position: {
      x: 0,
      y: 0,
    },
    index: 20,
  },
  appMusicInfo: {
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
    setOpenApp: (state: any, action: PayloadAction<any>) => {
      state[action.payload.app].isShow = action.payload.isShow;
      const maxZIndex = Math.max(
        ...Object.values(state).map((app: any) => app.index)
      );
      if (maxZIndex === -Infinity) {
        state[action.payload.app].index = 20;
        return;
      }
      state[action.payload.app].index = maxZIndex + 1;
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
    closeAllApp: (state: any) => {
      Object.values(state).forEach((app: any) => {
        app.isShow = false;
      });
    },
  },
});

export const { setOpenApp, setPosition, setIndex, closeAllApp } =
  appControlSlice.actions;

export default appControlSlice.reducer;
