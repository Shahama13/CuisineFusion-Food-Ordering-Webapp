import { createSlice } from "@reduxjs/toolkit";

const orderSlice = createSlice({
    name: "order",
    initialState: {},
    reducers: {
        createOrderRequest: (state, action) => {
            state.loading = true
        },
        createOrderSuccess: (state, action) => {
            state.loading = false;
            state.order = action.payload
        },
        createOrderFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload
        },
        clearErrors:(state,action)=>{
            state.error= null
        }
    }
})

export default orderSlice.reducer
export const {
    clearErrors,  createOrderRequest, createOrderSuccess, createOrderFailure
} = orderSlice.actions