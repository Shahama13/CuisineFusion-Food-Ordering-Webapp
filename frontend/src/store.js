import { configureStore } from "@reduxjs/toolkit";
import productSlice, { productDetailsSlice } from "./Reducers/product"
import userSlice from "./Reducers/user"
import profileSlice from "./Reducers/profile"

const store = configureStore({
    reducer: {
        products: productSlice,
        productDetails:productDetailsSlice.reducer,
        user:userSlice,
        profile:profileSlice,
    }
})
export default store;