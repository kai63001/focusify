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

export const musicSlice = createSlice({
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
      if(action.payload === state.selectMusic){
        state.selectMusic = "pause";
        state.musicPlaying = "pause";
        return
      }
      state.selectMusic = action.payload;
    },
  },
});

export const { setMusicPlaying, setListMusic,setSelectMusic } = musicSlice.actions;

export default musicSlice.reducer;
