import axios from "axios"
import { allOrderFailure, allOrderRequest, allOrderSuccess, createOrderFailure, createOrderRequest, createOrderSuccess, deleteSuccess, myOrderFailure, myOrderRequest, myOrderSuccess, orderDetailsFailure, orderDetailsRequest, orderDetailsSuccess, updateSuccess } from "../Reducers/order"
import { clearCart } from "../Reducers/cart"
import toast from "react-hot-toast"

export const createOrder = (order) => async (dispatch) => {
    try {
        dispatch(createOrderRequest())
        const { data } = await axios.post("/api/v1/order/new", order)
        dispatch(createOrderSuccess(data.order))
        sessionStorage.setItem("orderInfo", {})
        localStorage.setItem("cartItems", [])
        dispatch(clearCart())
    } catch (error) {
        dispatch(createOrderFailure(error.response.data.message))
    }
}

export const getMyOrders = () => async (dispatch) => {
    try {
        dispatch(myOrderRequest())
        const { data } = await axios.get("/api/v1/orders")
        dispatch(myOrderSuccess(data.orders))
    } catch (error) {
        dispatch(myOrderFailure(error.response.data.message))
    }
}

export const getOrderDetails = (id) => async (dispatch) => {
    try {
        dispatch(orderDetailsRequest())
        const { data } = await axios.get(`/api/v1/order/${id}`)
        dispatch(orderDetailsSuccess(data.order))
    } catch (error) {
        dispatch(orderDetailsFailure(error.response.data.message))
    }
}

export const getAllOrders = () => async (dispatch) => {
    try {
        dispatch(allOrderRequest())
        const { data } = await axios.get("/api/v1/admin/orders")
        dispatch(allOrderSuccess(data))
    } catch (error) {
        dispatch(allOrderFailure(error.response.data.message))
    }
}

export const updateOrder = (id, status) => async (dispatch) => {
    try {
        dispatch(allOrderRequest())
        const { data } = await axios.put(`/api/v1/admin/order/${id}`, {
            status
        })
        dispatch(updateSuccess())
        toast.success(data.message)
    } catch (error) {
        dispatch(allOrderFailure(error.response.data.message))
    }
}
export const deleteOrders = (id) => async (dispatch) => {
    try {
        dispatch(allOrderRequest())
        const { data } = await axios.delete(`/api/v1/admin/order/${id}`)
        dispatch(deleteSuccess())
        toast.success(data.message)
    } catch (error) {
        dispatch(allOrderFailure(error.response.data.message))
    }
}


