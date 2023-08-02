import { createSlice } from "@reduxjs/toolkit";

const productSlice = createSlice({
    name: "products",
    initialState: {},
    reducers: {
        allProductRequest: (state) => {
            state.loading = true;
            state.products = [];
        },
        allProductSuccess: (state, action) => {
            state.loading = false;
            state.products = action.payload.products;
            state.productCount = action.payload.productCount;
        },
        allProductFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload.error;
        },
        clearErrors: (state) => {
            state.error = null;
        },
    }
});

export const productDetailsSlice = createSlice({
    name: "productDetails",
    initialState: {},
    reducers: {
        productDetailsRequest: (state) => {
            state.loading = true;
        },
        productDetailsSuccess: (state, action) => {
            state.loading = false;
            state.product = action.payload.product;
        },
        productDetailsFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload.error;
        },
        clearError: (state) => {
            state.error = null;
        },
    }
})


export default productSlice.reducer;
export const { allProductRequest, allProductSuccess, allProductFailure, clearErrors } = productSlice.actions;

export const { productDetailsRequest, productDetailsSuccess, productDetailsFailure,clearError} = productDetailsSlice.actions

