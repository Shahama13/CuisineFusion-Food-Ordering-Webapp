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
            state.resultPerPage = action.payload.resultPerPage;
            state.filteredProductCount = action.payload.filteredProductCount;
        },
        adminProductSuccess: (state, action) => {
            state.adminProducts = action.payload
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

export const newReviewSlice = createSlice({
    name: "review",
    initialState: {},
    reducers: {
        reviewRequest: (state) => {
            state.loading = true;
        },
        reviewSuccess: (state, action) => {
            state.loading = false;
            state.success = action.payload;
        },
        reviewFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        reviewReset: (state) => {
            state.loading = false;
            state.success = false
        },
        clearReviewError: (state) => {
            state.error = null;
        },
    }
})

export const createProductSlice = createSlice({
    name: "createProduct",
    initialState: {},
    reducers: {
        productRequest: (state) => {
            state.loading = true;
        },
        productSuccess: (state, action) => {
            state.loading = false;
            state.success = true;
        },
        productFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        productReset: (state) => {
            state.success = false
        },
        clearproductError: (state) => {
            state.error = null;
        },
    }
})

export const removeProductSlice = createSlice({
    name: "removeProduct",
    initialState: {},
    reducers: {
        removeRequest: (state) => {
            state.loading = true;
        },
        removeSuccess: (state, action) => {
            state.loading = false;
            state.success = action.payload;
        },
        removeFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        removeReset: (state) => {
            state.success = false
        },
        clearremoveError: (state) => {
            state.error = null;
        },
    }
})

export const {removeRequest,removeSuccess,removeFailure,removeReset,clearremoveError } = removeProductSlice.actions

export const { productRequest, productSuccess, productReset, productFailure, clearproductError } = createProductSlice.actions

export default productSlice.reducer;

export const { allProductRequest, adminProductSuccess, allProductSuccess, allProductFailure, clearErrors } = productSlice.actions;

export const { productDetailsRequest, productDetailsSuccess, productDetailsFailure, clearError } = productDetailsSlice.actions

export const { reviewRequest, reviewSuccess, reviewFailure, reviewReset, clearReviewError } = newReviewSlice.actions
