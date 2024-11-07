import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    currentUser: null,
    errorDispatch: null,
    loading: false,
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        signInStart: (state) => {
            state.loading = true;
            state.errorDispatch = null;
        },
        signInSuccess: (state, action) => {
            state.currentUser = action.payload;
            state.loading = false;
            state.errorDispatch = null;
        },
        signInFailure: (state, action) => {
            state.loading = false;
            state.errorDispatch = action.payload;
            state.currentUser = null;
        },
        signOutStart: (state) => {
            state.loading = true;
            state.errorDispatch = null;
        },
        signOutSuccess: (state) => {
            state.currentUser = null;
            state.loading = false;
            state.errorDispatch = null;
        },
        signOutFailure: (state, action) => {
            state.loading = false;
            state.errorDispatch = action.payload;
        },
        signUpStart: (state) => {
            state.loading = true;
            state.errorDispatch = null;
        },
        signUpSuccess: (state, action) => {
            state.currentUser = action.payload;
            state.loading = false;
            state.errorDispatch = null;
        },
        signUpFailure: (state, action) => {
            state.loading = false;
            state.errorDispatch = action.payload;
        },
    },
});

export const { 
    signInStart, signInSuccess, signInFailure, 
    signOutStart, signOutSuccess, signOutFailure,
    signUpStart, signUpSuccess, signUpFailure 
} = userSlice.actions;

export default userSlice.reducer;
