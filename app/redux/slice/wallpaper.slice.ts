"use client";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface WallpaperState {
  wallpaperUrl: string;
  type: string;
  myWallpaper: {
    id: string;
    url: string;
    type: string;
  };
}

const initialState: WallpaperState = {
  wallpaperUrl: "",
  type: "",
  myWallpaper: {
    id: "",
    url: "",
    type: "",
  },
};

export const wallpaperSlice = createSlice({
  name: "wallpaper",
  initialState,
  reducers: {
    setWallpaper: (state, action: PayloadAction<any>) => {
      state.wallpaperUrl = action.payload.url;
      state.type = action.payload.type;
    },
    setMyWallpaper: (state, action: PayloadAction<any>) => {
      state.myWallpaper.url = action.payload.url;
      state.myWallpaper.type = action.payload.type;
      state.myWallpaper.id = action.payload.id;
    },
  },
});

export const { setWallpaper, setMyWallpaper } = wallpaperSlice.actions;

export default wallpaperSlice.reducer;
