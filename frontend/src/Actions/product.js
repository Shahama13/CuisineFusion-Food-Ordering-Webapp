import axios from "axios"
import { adminProductSuccess, allProductFailure, productFailure, allProductRequest, allProductSuccess, productDetailsFailure, productDetailsRequest, productDetailsSuccess, reviewFailure, reviewRequest, reviewSuccess, productRequest, productSuccess, removeRequest, removeSuccess, removeFailure } from "../Reducers/product"
import toast from "react-hot-toast"

export const getProduct = (keyword = "", currentPage = 1, price = [0, 5000], category, ratings = 0) => async (dispatch) => {
    try {
        dispatch(allProductRequest())
        let link = `/api/v1/products?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&ratings[gte]=${ratings}`
        if (category) {
            link = `/api/v1/products?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&category=${category}&ratings[gte]=${ratings}`
        }

        const { data } = await axios(link)
        dispatch(allProductSuccess({
            // productCount: data.productCount,
            products: data.products,
            resultPerPage: data.resultPerPage,
            filteredProductCount: data.filteredProductCount,
        }))
    } catch (error) {
        dispatch(allProductFailure({
            error: error.response.data.message
        }))
    }
}

export const getProductDetails = (id) => async (dispatch) => {
    try {
        dispatch(productDetailsRequest())
        const { data } = await axios.get(`/api/v1/product/${id}`)
        dispatch(productDetailsSuccess({
            product: data.product
        }))
    } catch (error) {
        dispatch(productDetailsFailure({
            error: error.response.data.message
        }))
    }
}

export const addReview = (rating, comment, productId) => async (dispatch) => {
    try {
        dispatch(reviewRequest())
        const { data } = await axios.post("/api/v1/review", {
            rating, comment, productId
        })
        dispatch(reviewSuccess(data.successs))
    } catch (error) {
        dispatch(reviewFailure(
            error.response.data.message
        ))
    }
}

export const getAllAdminProducts = () => async (dispatch) => {
    try {
        dispatch(allProductRequest())
        const { data } = await axios.get("/api/v1/all-products")
        dispatch(adminProductSuccess(data.products))
    } catch (error) {
        dispatch(allProductFailure({
            error: error.response.data.message
        }))
    }
}

export const newProduct = (name, price, description, category, images) => async (dispatch) => {
    try {
        dispatch(productRequest())
        await axios.post("/api/v1/admin/product/new", { name, price, description, category, images })
        dispatch(productSuccess())
    } catch (error) {
        dispatch(productFailure(
            error.response.data.message
        ))
    }
}

export const deleteProduct = (id) => async (dispatch) => {
    try {
        dispatch(removeRequest())
        const { data } = await axios.delete(`/api/v1/admin/product/${id}`)
        dispatch(removeSuccess(data.successs))
        toast.success(data.message)
    } catch (error) {
        dispatch(removeFailure(
            error.response.data.message
        ))
    }
}

export const updateProduct = (name, price, description, category, id, images = null) => async (dispatch) => {
    try {
        dispatch(productRequest())
        if (images !== null) {
            await axios.put(`/api/v1/admin/product/${id}`, { name, price, description, category, images })
        }
        else {
            await axios.put(`/api/v1/admin/product/${id}`, { name, price, description, category })
        }
        dispatch(productSuccess())
    } catch (error) {
        dispatch(productFailure(
            error.response.data.message
        ))
    }
}

