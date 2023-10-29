import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name: "cart",
    initialState: {
        cartItems: localStorage.getItem("cartItems") ? JSON.parse(localStorage.getItem("cartItems")) : [],
        shippingInfo: localStorage.getItem("shippingInfo") ? JSON.parse(localStorage.getItem("shippingInfo")) : {},
    },
    reducers: {
        addToCart: (state, action) => {
            const item = action.payload
            const itemIndex = state.cartItems.findIndex((i) => i.product === item.product)

            if (itemIndex !== -1) {
                state.cartItems[itemIndex].quantity += item.quantity
            }
            else {
                state.cartItems = [...state.cartItems, item]
            }
        },
        removeItemsFromCart: (state, action) => {
            const itemIndex = state.cartItems.findIndex((i) => i.product === action.payload);
            if (itemIndex !== -1) {
                if (state.cartItems[itemIndex].quantity > 0) {
                    --state.cartItems[itemIndex].quantity;
                }
                if (state.cartItems[itemIndex].quantity === 0) {
                    state.cartItems.splice(itemIndex, 1);
                }
            }
            localStorage.setItem("cartItems", JSON.stringify(state.cartItems))
        },
        removeThisItem: (state, action) => {
            const itemIndex = state.cartItems.findIndex((i) => i.product === action.payload);
            if (itemIndex !== -1) {
                state.cartItems.splice(itemIndex, 1);
            }
            localStorage.setItem("cartItems", JSON.stringify(state.cartItems))
        },
        saveShippingInfo: (state, action) => {
            state.shippingInfo = action.payload
            localStorage.setItem("shippingInfo", JSON.stringify(state.shippingInfo))
        },
        clearCart: (state) => {
            state.cartItems = []
        }
    }
})

export default cartSlice.reducer
export const {
    addToCart, saveShippingInfo, clearCart, removeItemsFromCart, removeThisItem
} = cartSlice.actions