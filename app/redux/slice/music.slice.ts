"use client";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface MusicState {
  musicPlaying: string;
  selectMusic: string;
  listMusic: any[];
}

const initialState: MusicState = {
  musicPlaying: "",
  selectMusic: "",
  listMusic: [],
};

export const noteSlice = createSlice({
  name: "music",
  initialState,
  reducers: {
    setMusicPlaying: (state, action: PayloadAction<any>) => {
      state.musicPlaying = action.payload;
    },
    setListMusic: (state, action: PayloadAction<any>) => {
      state.listMusic = action.payload;
    },
    setSelectMusic: (state, action: PayloadAction<any>) => {
      state.selectMusic = action.payload;
    },
  },
});

export const { setMusicPlaying, setListMusic,setSelectMusic } = noteSlice.actions;

export default noteSlice.reducer;
