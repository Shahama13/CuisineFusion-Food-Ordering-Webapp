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

export const adminOrderSlice = createSlice({
    name: "adminOrder",
    initialState: {},
    reducers: {
        allOrderRequest: (state) => {
            state.loading = true
        },
        allOrderSuccess: (state, action) => {
            state.loading = false;
            state.allOrders = action.payload.orders;
            state.totalAmount = action.payload.totalAmount;
        },
        allOrderFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload
        },
        clearOrderError: (state) => {
            state.error = null
        },

        deleteSuccess: (state) => {
            state.loading = false;
            state.success = true;
        },

        successReset: (state) => {
            state.success = false;
        },

        updateSuccess: (state) => {
            state.loading = false;
            state.success = true;
        },

        getAllUserSuccess:(state,action)=>{
            state.allUsers=action.payload;
            state.loading=false;
        }

    }
})

export const { allOrderRequest, deleteSuccess, getAllUserSuccess, successReset, updateSuccess, clearOrderError, allOrderSuccess, allOrderFailure } = adminOrderSlice.actions

export default orderSlice.reducer
export const { myOrderRequest, myOrderSuccess, myOrderFailure, orderDetailsRequest, orderDetailsSuccess, orderDetailsFailure,
    clearErrors, createOrderRequest, createOrderSuccess, createOrderFailure
} = orderSlice.actions