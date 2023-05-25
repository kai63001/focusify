'use client';

import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export interface LoginState {
    openModal: boolean;
    name?: string;
}

const initialState: LoginState = {
    openModal: false,
    name: ''
}

export const loginSlice = createSlice({
    name: 'login',
    initialState,
    reducers: {
        setLoginModal: (state, action:PayloadAction<LoginState>) => {
            return action.payload
        }
    }
})

export const { setLoginModal } = loginSlice.actions;

export default loginSlice.reducer;
