"use client";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface MusicState {
  musicPlaying: string;
  listMusic: any[];
}

const initialState: MusicState = {
  musicPlaying: "",
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
  },
});

export const { setMusicPlaying, setListMusic } = noteSlice.actions;

export default noteSlice.reducer;
