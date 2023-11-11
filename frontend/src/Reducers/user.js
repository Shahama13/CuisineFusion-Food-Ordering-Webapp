import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: "user",
    initialState: {
        user: {},
    },
    reducers: {
        loginRequest: (state) => {
            state.loading = true;
            state.isAuthenticated = false;
        },
        loginSuccess: (state, action) => {
            state.loading = false;
            state.isAuthenticated = true;
            state.user = action.payload.user;
        },
        loginFail: (state, action) => {
            state.loading = false;
            state.isAuthenticated = false;
            state.user = null;
            state.error = action.payload.error
        },
        registerRequest: (state) => {
            state.loading = true;
            state.isAuthenticated = false;
        },
        registerSuccess: (state, action) => {
            state.loading = false;
            state.isAuthenticated = true;
            state.user = action.payload.user;
        },
        registerFail: (state, action) => {
            state.loading = false;
            state.isAuthenticated = false;
            state.user = null;
            state.error = action.payload.error
        },
        loadUserRequest: (state) => {
            state.loading = true;
            state.isAuthenticated = false;
        },
        loadUserSuccess: (state, action) => {
            state.loading = false;
            state.isAuthenticated = true;
            state.user = action.payload.user;
        },
        loadUserFail: (state, action) => {
            state.loading = false;
            state.isAuthenticated = false;
            state.user = null;
            state.error = action.payload.error
        },
        logoutSuccess: (state) => {
            state.loading = false;
            state.isAuthenticated = false;
            state.user = null;
        },
        logoutFail: (state, action) => {
            state.loading = false;
            state.error = action.payload.error
        },
        clearError: (state) => {
            state.error = null;
        },
    }
})

export const wishSlice=createSlice({
    name:"wishlist",
    initialState:{},
    reducers:{
        getRequest:(state)=>{
            state.loading=true
        },
        getSuccess:(state,action)=>{
            state.loading=false;
            state.wishlist=action.payload;
        },
        addRemoveSuccess:(state)=>{
            state.loading = false;
        },
        getFailure:(state,action)=>{
            state.loading = false;
            state.error = action.payload.error;
        },
        clear:(state)=>{
            state.error=null
        }
    }
})

export const { getRequest, getSuccess, addRemoveSuccess, getFailure, clear }= wishSlice.actions

export const { loginRequest, logoutSuccess, logoutFail, loadUserRequest, loadUserFail, loadUserSuccess, registerRequest, registerFail, registerSuccess, loginSuccess, loginFail, clearError } = userSlice.actions;
export default userSlice.reducer