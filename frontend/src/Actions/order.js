import axios from "axios"
import { createOrderFailure, createOrderRequest, createOrderSuccess, myOrderFailure, myOrderRequest, myOrderSuccess, orderDetailsFailure, orderDetailsRequest, orderDetailsSuccess } from "../Reducers/order"
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

export const getMyOrders=()=>async(dispatch)=>{
    try {
        dispatch(myOrderRequest())
        const { data } = await axios.get("/api/v1/orders/me")
        dispatch(myOrderSuccess(data.orders))
    } catch (error) {
        dispatch(myOrderFailure(error.response.data.message))
    }
}

export const getOrderDetails=(id)=>async(dispatch)=>{
    try {
        dispatch(orderDetailsRequest())
        const { data } = await axios.get(`/api/v1/order/${id}`)
        dispatch(orderDetailsSuccess(data.order))
    } catch (error) {
        dispatch(orderDetailsFailure(error.response.data.message))
    }
}