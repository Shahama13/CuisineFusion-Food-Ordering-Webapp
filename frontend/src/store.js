import { configureStore } from "@reduxjs/toolkit";
import productSlice, { productDetailsSlice } from "./Reducers/product"

const store = configureStore({
    reducer: {
        products: productSlice,
        productDetails:productDetailsSlice.reducer
    }
})
export default store;