import { configureStore } from "@reduxjs/toolkit";
import productSlice, { createProductSlice, newReviewSlice, productDetailsSlice, removeProductSlice } from "./Reducers/product"
import userSlice from "./Reducers/user"
import profileSlice from "./Reducers/profile"
import cartSlice from "./Reducers/cart"
import orderSlice, { adminOrderSlice } from "./Reducers/order"

const store = configureStore({
    reducer: {
        products: productSlice,
        productDetails:productDetailsSlice.reducer,
        user:userSlice,
        profile:profileSlice,
        cart:cartSlice,
        order: orderSlice,
        createProduct:createProductSlice.reducer,
        review: newReviewSlice.reducer,
        removeProduct: removeProductSlice.reducer,
        adminOrder: adminOrderSlice.reducer,
    }
})
export default store;