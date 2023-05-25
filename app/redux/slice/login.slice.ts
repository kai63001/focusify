'use client';

import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export interface LoginState {
    openModal: boolean;
}

const initialState: LoginState = {
    openModal: false
}

export const loginSlice = createSlice({
    name: 'login',
    initialState,
    reducers: {
        setLoginModal: (state, action:PayloadAction<LoginState>) => {
            state.openModal = action.payload.openModal;
            console.log('loginSlice: setLoginModal: state: ', state)
        }
    }
})

export const { setLoginModal } = loginSlice.actions;

export default loginSlice.reducer;