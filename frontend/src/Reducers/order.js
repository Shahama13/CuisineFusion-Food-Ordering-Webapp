import { createSlice } from "@reduxjs/toolkit";

const orderSlice = createSlice({
    name: "order",
    initialState: { myOrders: [], order: [], orderDetails: {} },
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
        clearErrors: (state) => {
            state.error = null
        },
        myOrderRequest: (state) => {
            state.loading = true;
        },
        myOrderSuccess: (state, action) => {
            state.loading = false;
            state.myOrders = action.payload
        },
        myOrderFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload
        },
        orderDetailsRequest: (state) => {
            state.orderLoading = true;
        },
        orderDetailsSuccess: (state, action) => {
            state.orderLoading = false;
            state.orderDetails = action.payload
        },
        orderDetailsFailure: (state, action) => {
            state.orderLoading = false;
            state.error = action.payload
        },

    }
})

export default orderSlice.reducer
export const { myOrderRequest, myOrderSuccess, myOrderFailure, orderDetailsRequest, orderDetailsSuccess, orderDetailsFailure,
    clearErrors, createOrderRequest, createOrderSuccess, createOrderFailure
} = orderSlice.actions