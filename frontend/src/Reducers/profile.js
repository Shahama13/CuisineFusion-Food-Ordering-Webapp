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
        clearError: (state) => {
            state.error = null
        }
    }
})

export default profileSlice.reducer
export const { updateProfileRequest, clearError, updateProfileReset, updateProfileSuccess, updateProfileFail } = profileSlice.actions