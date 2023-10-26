import { createSlice } from "@reduxjs/toolkit";

const profileSlice = createSlice({
    name: "profile",
    initialState: {},
    reducers: {
        updateProfileRequest: (state) => {
            state.loading = true;
        },
        updateProfileSuccess: (state, action) => {
            state.loading = false;
            state.isUpdated = action.payload.isUpdated;
        },
        updateProfileFail: (state, action) => {
            state.loading = false;
            state.error = action.payload.error
        },
        updateProfileReset: (state) => {
            state.isUpdated = false
        },
        updatePasswordRequest: (state) => {
            state.loading = true;
        },
        updatePasswordSuccess: (state, action) => {
            state.loading = false;
            state.isUpdated = action.payload.isUpdated;
        },
        updatePasswordFail: (state, action) => {
            state.loading = false;
            state.error = action.payload.error
        },
        updatePasswordReset: (state) => {
            state.isUpdated = false
        },
        forgotPasswordRequest: (state) => {
            state.loading = true;
            state.error = null;
        },
        forgotPasswordSuccess: (state) => {
            state.loading = false;
        },
        forgotPasswordFail: (state, action) => {
            state.loading = false;
            state.error = action.payload.error
        },
        resetPasswordRequest: (state) => {
            state.loading = true;
            state.error = null;
        },
        resetPasswordSuccess: (state) => {
            state.loading = false;
        },
        resetPasswordFail: (state, action) => {
            state.loading = false;
            state.error = action.payload.error
        },
        clearError: (state) => {
            state.error = null
        }
    }
})

export default profileSlice.reducer
export const { forgotPasswordRequest,resetPasswordRequest,resetPasswordSuccess,resetPasswordFail, forgotPasswordSuccess, forgotPasswordFail, updateProfileRequest, updatePasswordReset, updatePasswordRequest, updatePasswordSuccess, updatePasswordFail, clearError, updateProfileReset, updateProfileSuccess, updateProfileFail } = profileSlice.actions