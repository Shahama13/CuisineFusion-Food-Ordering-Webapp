import axios from "axios"
import { createOrderFailure, createOrderRequest, createOrderSuccess } from "../Reducers/order"
import { clearCart } from "../Reducers/cart"

export const createOrder = (order) => async (dispatch) => {
    try {
        dispatch(createOrderRequest())
        const { data } = await axios.post("/api/v1/order/new", order)
        dispatch(createOrderSuccess(data.order))
        sessionStorage.setItem("orderInfo",{})
        localStorage.setItem("cartItems",[])
        dispatch(clearCart())
    } catch (error) {
        dispatch(createOrderFailure(error.response.data.message))
    }
}