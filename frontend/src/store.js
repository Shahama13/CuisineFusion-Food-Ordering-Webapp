import { configureStore } from "@reduxjs/toolkit";
import productSlice, { newReviewSlice, productDetailsSlice } from "./Reducers/product"
import userSlice from "./Reducers/user"
import profileSlice from "./Reducers/profile"
import cartSlice from "./Reducers/cart"
import orderSlice from "./Reducers/order"

const store = configureStore({
    reducer: {
        products: productSlice,
        productDetails:productDetailsSlice.reducer,
        user:userSlice,
        profile:profileSlice,
        cart:cartSlice,
        order: orderSlice,
        review: newReviewSlice.reducer,
    }
})
export default store;