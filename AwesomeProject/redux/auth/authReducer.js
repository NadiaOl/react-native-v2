import { createSlice } from "@reduxjs/toolkit";

export const state = {
    userId: null,
    nickName: null,
    stateChange: false,
};

export const authSlice = createSlice({
    name: "auth",
    initialState: state,
    reducers: {
        updateUserProfile: (state, { payload }) => ({
            
            ...state,
            userId: payload.userId,
            name: payload.name,
            stateChange: payload.stateChange,
        }),
        authStateChange: (state, { payload }) => ({
            ... state,
            stateChange: payload.stateChange,
        }),
        authSignOut: (state) => ({state}),
    },
    
    });

console.log('authSlice', authSlice)