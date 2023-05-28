"use client";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface NoteState {
  selectedNote: string;
}

const initialState: NoteState = {
  selectedNote: "",
};

export const noteSlice = createSlice({
  name: "note",
  initialState,
  reducers: {
    setNoteModal: (state, action: PayloadAction<NoteState>) => {
      return action.payload;
    },
    setSelectNote: (state, action: PayloadAction<string>) => {
      state.selectedNote = action.payload;
    },
  },
});

export const { setNoteModal, setSelectNote } = noteSlice.actions;

export default noteSlice.reducer;
