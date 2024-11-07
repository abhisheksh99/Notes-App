import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    currentUser: null,
    errorDispatch: null,
    loading: false
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
    }
});

export const { signInStart, signInSuccess, signInFailure } = userSlice.actions;

export default userSlice.reducer;